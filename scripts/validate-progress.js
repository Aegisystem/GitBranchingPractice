import { execFileSync } from "node:child_process";
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import {
  closeIssue,
  createMissionIssue,
  findMissionIssue,
  getRepositoryFromEnv,
  getTokenFromEnv,
  GitHubApi,
  listAllIssues,
  reopenIssue,
  upsertIssueComment
} from "./github-api.js";
import {
  extractMissionId,
  getMissionById,
  getNextMission,
  MENSAJE_CONFLICTO_MAIN,
  MENSAJE_CONFLICTO_RAMA,
  MENSAJE_DESPEDIDA,
  MENSAJE_SALUDO,
  PRACTICE_MARKER
} from "./practice-missions.js";

const REQUIRED_SECTIONS = [
  { level: 1, text: "Nombre del Proyecto" },
  { level: 2, text: "Descripción" },
  { level: 2, text: "Instalación" },
  { level: 2, text: "Uso" },
  { level: 2, text: "Autores" },
  { level: 2, text: "Flujo de trabajo Git" }
];

const MENSAJES_PATH = "src/mensajes.js";
const BITACORA_PATH = "docs/bitacora.md";
const README_PATH = "README.md";

const BRANCH_SALUDO = "feature/saludo";
const BRANCH_DESPEDIDA = "feature/despedida";
const BRANCH_CONFLICTO = "feature/conflicto";

function git(args, options = {}) {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    }).trim();
  } catch (error) {
    if (options.allowFailure) {
      return "";
    }

    throw new Error(`No se pudo ejecutar git ${args.join(" ")}: ${error.stderr?.toString() || error.message}`);
  }
}

function gitSucceeds(args) {
  try {
    execFileSync("git", args, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function readEventPayload() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath || !existsSync(eventPath)) {
    return null;
  }

  return JSON.parse(readFileSync(eventPath, "utf8"));
}

function eventName() {
  return process.env.GITHUB_EVENT_NAME || "manual";
}

function currentRefName(payload) {
  return process.env.GITHUB_REF_NAME || payload?.ref || "";
}

export function listBranches() {
  const refs = git([
    "for-each-ref",
    "--format=%(refname:short)",
    "refs/heads",
    "refs/remotes/origin"
  ], { allowFailure: true });

  return refs
    .split(/\r?\n/)
    .map((branch) => branch.trim())
    .filter(Boolean)
    .filter((branch) => branch !== "origin/HEAD");
}

function remoteBranchExists(branches, name) {
  return branches.includes(`origin/${name}`);
}

function branchExists(branches, name) {
  return branches.includes(name) || remoteBranchExists(branches, name);
}

// Preferimos siempre la versión remota: es la que el estudiante realmente publicó.
function refFor(branches, name) {
  if (remoteBranchExists(branches, name)) {
    return `origin/${name}`;
  }

  return branches.includes(name) ? name : "";
}

function commitAt(ref) {
  if (!ref) {
    return "";
  }

  return git(["rev-parse", ref], { allowFailure: true });
}

function fileAtRef(ref, path) {
  if (!ref) {
    return "";
  }

  return git(["show", `${ref}:${path}`], { allowFailure: true });
}

function isAncestor(possibleAncestor, descendant) {
  if (!possibleAncestor || !descendant) {
    return false;
  }

  return gitSucceeds(["merge-base", "--is-ancestor", possibleAncestor, descendant]);
}

function mergeCommitJoins(targetRef, branchTip) {
  if (!targetRef || !branchTip) {
    return false;
  }

  const log = git(["log", targetRef, "--merges", "--format=%H %P", "-n", "200"], { allowFailure: true });

  return log
    .split(/\r?\n/)
    .filter(Boolean)
    .some((line) => line.split(/\s+/).slice(1).includes(branchTip));
}

function commitsSince(ref, isoDate, { noMerges = true } = {}) {
  if (!ref || !isoDate) {
    return [];
  }

  const args = ["log", ref, `--since=${isoDate}`, "--format=%H %s"];
  if (noMerges) {
    args.splice(3, 0, "--no-merges");
  }

  return git(args, { allowFailure: true })
    .split(/\r?\n/)
    .filter(Boolean);
}

function stripFencedCodeBlocks(markdown) {
  let insideFence = false;

  return markdown
    .split(/\r?\n/)
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        insideFence = !insideFence;
        return "";
      }

      return insideFence ? "" : line;
    })
    .join("\n");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasHeading(markdown, section) {
  const hashes = "#".repeat(section.level);
  const pattern = new RegExp(`^${hashes}\\s+${escapeRegExp(section.text)}\\s*#*\\s*$`, "im");
  return pattern.test(markdown);
}

function sectionContent(markdown, headingText) {
  const lines = markdown.split(/\r?\n/);
  const headingPattern = new RegExp(`^##\\s+${escapeRegExp(headingText)}\\s*#*\\s*$`, "i");
  const start = lines.findIndex((line) => headingPattern.test(line));

  if (start === -1) {
    return "";
  }

  const collected = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    if (/^#{1,2}\s+/.test(lines[index])) {
      break;
    }
    collected.push(lines[index]);
  }

  return collected.join("\n").trim();
}

function contains(text, fragment) {
  return text.toLowerCase().includes(fragment.toLowerCase());
}

function hasConflictMarkers(text) {
  return /^(<{7}|={7}|>{7})/m.test(text);
}

function check(ok, text, fix = "", { soft = false } = {}) {
  return { ok, text, fix, soft };
}

function result({ mission, checks, passed }) {
  const computed = typeof passed === "boolean"
    ? passed
    : checks.filter((item) => !item.soft).every((item) => item.ok);

  return { mission, checks, passed: computed };
}

function validateReadmeStructure(markdown) {
  const cleanMarkdown = stripFencedCodeBlocks(markdown);

  return REQUIRED_SECTIONS.map((section) => {
    const marker = `${"#".repeat(section.level)} ${section.text}`;
    return check(
      hasHeading(cleanMarkdown, section),
      `${marker} existe`,
      `Agrega el encabezado exacto \`${marker}\`.`
    );
  });
}

function validateReadmeQuality(markdown) {
  const installation = sectionContent(markdown, "Instalación");
  const usage = sectionContent(markdown, "Uso");
  const authors = sectionContent(markdown, "Autores");
  const flow = sectionContent(markdown, "Flujo de trabajo Git");

  return [
    check(/node\.?js|node\s+20/i.test(installation), "Instalación menciona Node.js", "Indica que se necesita Node.js 20 o superior."),
    check(usage.length >= 40, "Uso explica cómo ejecutar el proyecto", "Describe qué hace el proyecto al ejecutarlo."),
    check(/\bnpm\s+(run\s+)?start\b|node\s+src\/app\.js/i.test(usage), "Uso incluye el comando para ejecutar el proyecto", "Agrega el comando `npm start`."),
    check(authors.length >= 10 && !/nombre del integrante|reemplazar/i.test(authors), "Autores identifica a personas reales", "Reemplaza el texto de ejemplo por nombres reales."),
    check(flow.length >= 120, "Flujo de trabajo Git tiene una explicación con tus palabras", "Explica el flujo con al menos un párrafo propio."),
    check(/\bcommit\b/i.test(flow), "Flujo de trabajo Git explica los commits", "Explica qué hace `git commit`."),
    check(/\bpush\b/i.test(flow), "Flujo de trabajo Git explica el push", "Explica qué hace `git push` y en qué se diferencia del commit."),
    check(/\brama|branch\b/i.test(flow), "Flujo de trabajo Git explica las ramas usadas", "Nombra las ramas feature/saludo, feature/despedida y feature/conflicto."),
    check(/\bmerge\b/i.test(flow), "Flujo de trabajo Git explica el merge", "Explica qué hace `git merge` y por qué usaste `--no-ff`."),
    check(/conflicto/i.test(flow), "Flujo de trabajo Git explica el conflicto resuelto", "Cuenta cómo apareció el conflicto y cómo lo resolviste.")
  ];
}

export function evaluateMission(mission, issue, context) {
  const { branches } = context;
  const mainRef = refFor(branches, "main") || "origin/main";
  const mainMensajes = fileAtRef(mainRef, MENSAJES_PATH);

  switch (mission.id) {
    case 1: {
      const bitacora = fileAtRef(mainRef, BITACORA_PATH);
      const entries = bitacora
        .split(/\r?\n/)
        .filter((line) => /^\s*-\s+\S/.test(line))
        .filter((line) => !/nombre del estudiante/i.test(line));

      return result({
        mission,
        checks: [
          check(Boolean(bitacora), `${BITACORA_PATH} existe en main`, "No borres el archivo de bitácora."),
          check(entries.length >= 1, "La bitácora tiene una línea escrita por ti", "Reemplaza la línea de ejemplo por una con tu nombre y publícala con `git push origin main`."),
          check(entries.some((line) => line.trim().length >= 15), "La línea de la bitácora tiene contenido real", "Escribe nombre y qué hiciste, no solo un guion.")
        ]
      });
    }

    case 2: {
      const nuevos = commitsSince(mainRef, issue.created_at);

      return result({
        mission,
        checks: [
          check(nuevos.length >= 2, `Hay al menos 2 commits nuevos publicados en main (detectados: ${nuevos.length})`, "Haz dos commits separados y súbelos con `git push origin main`."),
          check(
            nuevos.every((line) => line.split(" ").slice(1).join(" ").trim().length >= 10),
            "Los mensajes de commit son descriptivos",
            "Evita mensajes como `x` o `cambios`: describe qué cambió."
          )
        ]
      });
    }

    case 3:
      return result({
        mission,
        checks: [
          check(remoteBranchExists(branches, BRANCH_SALUDO), `Existe la rama ${BRANCH_SALUDO} en GitHub`, `Crea la rama con \`git checkout -b ${BRANCH_SALUDO}\` y publícala con \`git push -u origin ${BRANCH_SALUDO}\`.`)
        ]
      });

    case 4: {
      const ref = refFor(branches, BRANCH_SALUDO);
      const mensajes = fileAtRef(ref, MENSAJES_PATH);

      return result({
        mission,
        checks: [
          check(Boolean(ref), `La rama ${BRANCH_SALUDO} está publicada`, `Publica la rama con \`git push -u origin ${BRANCH_SALUDO}\`.`),
          check(contains(mensajes, MENSAJE_SALUDO), `${MENSAJES_PATH} contiene "${MENSAJE_SALUDO}" en la rama`, "Agrega el mensaje exacto al arreglo, haz commit y push."),
          check(!hasConflictMarkers(mensajes), "El archivo no tiene marcas de conflicto", "Elimina las líneas `<<<<<<<`, `=======` y `>>>>>>>`."),
          check(!contains(mainMensajes, MENSAJE_SALUDO), "main todavía no tiene el mensaje: la rama aísla tu trabajo", "", { soft: true })
        ]
      });
    }

    case 5: {
      const ref = refFor(branches, BRANCH_SALUDO);
      const tip = commitAt(ref);
      const integrada = isAncestor(tip, mainRef) || contains(mainMensajes, MENSAJE_SALUDO);

      return result({
        mission,
        checks: [
          check(integrada, `Los commits de ${BRANCH_SALUDO} están en main`, `Fusiona con \`git merge --no-ff ${BRANCH_SALUDO}\` y publica con \`git push origin main\`.`),
          check(contains(mainMensajes, MENSAJE_SALUDO), `main contiene "${MENSAJE_SALUDO}"`, "Verifica que el merge se publicó en main."),
          check(!hasConflictMarkers(mainMensajes), "main no tiene marcas de conflicto", "Resuelve el conflicto antes de publicar."),
          check(mergeCommitJoins(mainRef, tip), "El merge dejó un commit de fusión (--no-ff)", "Si el merge fue fast-forward no queda rastro de la rama. Usa `--no-ff` en los siguientes merges.", { soft: true })
        ]
      });
    }

    case 6: {
      const ref = refFor(branches, BRANCH_DESPEDIDA);
      const mensajes = fileAtRef(ref, MENSAJES_PATH);

      return result({
        mission,
        checks: [
          check(remoteBranchExists(branches, BRANCH_DESPEDIDA), `Existe la rama ${BRANCH_DESPEDIDA} en GitHub`, `Crea la rama y publícala con \`git push -u origin ${BRANCH_DESPEDIDA}\`.`),
          check(contains(mensajes, MENSAJE_SALUDO), "La rama nació de un main actualizado", "Actualiza main con `git pull origin main` antes de crear la rama, o rehaz la rama desde main.")
        ]
      });
    }

    case 7: {
      const ref = refFor(branches, BRANCH_DESPEDIDA);
      const mensajes = fileAtRef(ref, MENSAJES_PATH);

      return result({
        mission,
        checks: [
          check(Boolean(ref), `La rama ${BRANCH_DESPEDIDA} está publicada`, `Publica la rama con \`git push -u origin ${BRANCH_DESPEDIDA}\`.`),
          check(contains(mensajes, MENSAJE_DESPEDIDA), `${MENSAJES_PATH} contiene "${MENSAJE_DESPEDIDA}" en la rama`, "Agrega el mensaje exacto, haz commit y push."),
          check(!hasConflictMarkers(mensajes), "El archivo no tiene marcas de conflicto", "Elimina las marcas de conflicto antes de publicar.")
        ]
      });
    }

    case 8: {
      const ref = refFor(branches, BRANCH_DESPEDIDA);
      const tip = commitAt(ref);
      const integrada = isAncestor(tip, mainRef) || contains(mainMensajes, MENSAJE_DESPEDIDA);

      return result({
        mission,
        checks: [
          check(integrada, `Los commits de ${BRANCH_DESPEDIDA} están en main`, `Fusiona con \`git merge --no-ff ${BRANCH_DESPEDIDA}\` y publica main.`),
          check(contains(mainMensajes, MENSAJE_SALUDO) && contains(mainMensajes, MENSAJE_DESPEDIDA), "main contiene los dos mensajes integrados", "Revisa que ambos merges estén publicados en main."),
          check(!remoteBranchExists(branches, BRANCH_SALUDO), `La rama remota ${BRANCH_SALUDO} ya fue eliminada`, `Bórrala con \`git push origin --delete ${BRANCH_SALUDO}\` una vez fusionada.`)
        ]
      });
    }

    case 9: {
      const ref = refFor(branches, BRANCH_CONFLICTO);
      const tip = commitAt(ref);
      const tieneRama = ref !== "" || contains(mainMensajes, MENSAJE_CONFLICTO_RAMA);

      return result({
        mission,
        checks: [
          check(tieneRama, `Existe o existió la rama ${BRANCH_CONFLICTO}`, `Crea la rama con \`git checkout -b ${BRANCH_CONFLICTO}\` y publícala.`),
          check(contains(mainMensajes, MENSAJE_CONFLICTO_MAIN), `main conserva "${MENSAJE_CONFLICTO_MAIN}"`, "Al resolver el conflicto debes conservar el cambio hecho en main."),
          check(contains(mainMensajes, MENSAJE_CONFLICTO_RAMA), `main conserva "${MENSAJE_CONFLICTO_RAMA}"`, "Al resolver el conflicto debes conservar también el cambio de la rama."),
          check(!hasConflictMarkers(mainMensajes), "No quedan marcas de conflicto en el archivo", "Borra `<<<<<<<`, `=======` y `>>>>>>>` antes de hacer commit."),
          check(isAncestor(tip, mainRef), `El merge de ${BRANCH_CONFLICTO} quedó registrado en el historial de main`, "Publica el merge resuelto con `git push origin main`.", { soft: !tip })
        ]
      });
    }

    case 10: {
      const readme = fileAtRef(mainRef, README_PATH);

      return result({
        mission,
        checks: [
          check(Boolean(readme), "README.md existe en main", "Publica el README en main."),
          ...validateReadmeStructure(readme),
          ...validateReadmeQuality(readme)
        ]
      });
    }

    default:
      return result({
        mission,
        checks: [
          check(false, "No hay una validación automática definida para esta misión", "Espera a que el docente ajuste la validación automática.")
        ]
      });
  }
}

function feedbackMarker(missionId) {
  return `<!-- ${PRACTICE_MARKER}:auto-feedback:mission=${missionId} -->`;
}

function formatChecks(checks) {
  return checks
    .map((item) => {
      const box = item.ok ? "- [x]" : "- [ ]";
      const nota = item.soft ? " _(informativo)_" : "";
      const sugerencia = item.ok || !item.fix ? "" : `\n  Sugerencia: ${item.fix}`;
      return `${box} ${item.text}${nota}${sugerencia}`;
    })
    .join("\n");
}

// Dibuja el árbol real del repositorio para que el estudiante compare
// lo que tiene con lo que la misión espera.
function historyGraph() {
  const graph = git([
    "log",
    "--graph",
    "--oneline",
    "--decorate",
    "--all",
    "-n",
    "15"
  ], { allowFailure: true });

  return graph || "(todavía no hay historial que mostrar)";
}

export function formatFeedback(mission, validation, statusText) {
  const graph = historyGraph();

  const cierre = validation.passed
    ? `### Cómo quedó tu historial

\`\`\`text
${graph}
\`\`\`

Compáralo con el diagrama de la misión: cada bifurcación del dibujo debería tener su equivalente aquí.

La misión cumple los criterios. Se cierra y se prepara la siguiente.`
    : `### Cómo está tu historial ahora

\`\`\`text
${graph}
\`\`\`

### Adónde tiene que llegar
${mission.diagram}

Cuando publiques nuevos cambios, esta revisión se actualizará sola.`;

  return `## Seguimiento automático

**Estado:** ${statusText}

### Qué revisé
${formatChecks(validation.checks)}

${cierre}`;
}

function annotateWarnings(mission, validation) {
  for (const item of validation.checks.filter((entry) => !entry.ok && !entry.soft)) {
    const message = `${item.text}. ${item.fix}`.replace(/\r?\n/g, " ");
    console.log(`::warning title=Misión ${mission.id}::${message}`);
  }
}

function appendStepSummary(mission, validation) {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryPath) {
    return;
  }

  const lines = [
    `## Misión ${mission.id}: ${mission.title}`,
    "",
    validation.passed ? "Estado: completada automáticamente." : "Estado: requiere ajustes.",
    "",
    formatChecks(validation.checks),
    ""
  ];

  try {
    appendFileSync(summaryPath, `${lines.join("\n")}\n`);
  } catch {
    // El resumen es útil, pero no debe romper la validación.
  }
}

function missionIdFromIssue(issue) {
  return extractMissionId(`${issue.title || ""}\n${issue.body || ""}`);
}

function targetMissionIds(payload, openIssues) {
  const event = eventName();

  if (event === "workflow_dispatch") {
    return openIssues.map(missionIdFromIssue).filter(Boolean);
  }

  if (event === "create" && payload?.ref_type === "branch") {
    const branchToMission = new Map([
      [BRANCH_SALUDO, 3],
      [BRANCH_DESPEDIDA, 6],
      [BRANCH_CONFLICTO, 9]
    ]);

    return branchToMission.has(payload.ref) ? [branchToMission.get(payload.ref)] : [];
  }

  if (event === "delete" && payload?.ref_type === "branch") {
    return [8];
  }

  if (event === "push") {
    const branch = currentRefName(payload).replace("refs/heads/", "");

    if (branch === "main") {
      return [1, 2, 5, 8, 9, 10];
    }
    if (branch === BRANCH_SALUDO) {
      return [4];
    }
    if (branch === BRANCH_DESPEDIDA) {
      return [7];
    }
    if (branch === BRANCH_CONFLICTO) {
      return [9];
    }
  }

  return [];
}

async function createNextMissionIfNeeded(api, issues, completedMission) {
  const nextMission = getNextMission(completedMission.id);
  if (!nextMission) {
    return null;
  }

  const duplicate = findMissionIssue(issues, nextMission);
  if (duplicate) {
    if (duplicate.state === "closed") {
      const reopened = await reopenIssue(api, duplicate.number);
      console.log(`La siguiente misión ya existía cerrada. Se reabrió el issue #${duplicate.number}.`);
      return reopened;
    }

    return duplicate;
  }

  const created = await createMissionIssue(api, nextMission);
  issues.push(created);
  return created;
}

async function processMission(context, issue, mission) {
  const validation = evaluateMission(mission, issue, context);
  const statusText = validation.passed ? "Completada" : "En progreso";

  appendStepSummary(mission, validation);

  await upsertIssueComment(
    context.api,
    issue.number,
    feedbackMarker(mission.id),
    formatFeedback(mission, validation, statusText)
  );

  if (!validation.passed) {
    annotateWarnings(mission, validation);
    return;
  }

  await closeIssue(context.api, issue.number);
  const nextIssue = await createNextMissionIfNeeded(context.api, context.issues, mission);

  if (nextIssue) {
    console.log(`Misión ${mission.id} cerrada. Siguiente issue: #${nextIssue.number}`);
  } else {
    console.log(`Misión ${mission.id} cerrada. No quedan más misiones.`);
  }
}

async function main() {
  const payload = readEventPayload();
  if (!payload) {
    console.log("No hay evento de GitHub Actions. No se valida progreso automático.");
    return;
  }

  const { owner, repo } = getRepositoryFromEnv();
  const api = new GitHubApi({ owner, repo, token: getTokenFromEnv() });
  const issues = await listAllIssues(api);
  const openMissionIssues = issues
    .filter((issue) => issue.state === "open")
    .filter((issue) => missionIdFromIssue(issue))
    .sort((a, b) => missionIdFromIssue(a) - missionIdFromIssue(b));

  const targets = new Set(targetMissionIds(payload, openMissionIssues));
  if (targets.size === 0) {
    console.log(`Evento ${eventName()} recibido, pero no corresponde a una misión automática.`);
    return;
  }

  const context = {
    api,
    payload,
    issues,
    branches: listBranches()
  };

  for (const issue of openMissionIssues) {
    const missionId = missionIdFromIssue(issue);
    if (!targets.has(missionId)) {
      continue;
    }

    const mission = getMissionById(missionId);
    if (!mission) {
      continue;
    }

    await processMission(context, issue, mission);
  }
}

// Solo se ejecuta cuando el script es invocado directamente; al importarlo
// desde una prueba, únicamente se exponen las funciones de validación.
if (process.argv[1] && process.argv[1].endsWith("validate-progress.js")) {
  main().catch((error) => {
    console.error("No se pudo validar el progreso de la práctica.");
    console.error(error.message);
    process.exit(1);
  });
}
