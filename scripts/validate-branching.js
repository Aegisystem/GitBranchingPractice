import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const strictFinalValidation = process.env.BRANCHING_STRICT_FINAL !== "false";

const MENSAJES_PATH = "src/mensajes.js";
const EXPECTED_BRANCHES = ["feature/saludo", "feature/despedida", "feature/conflicto"];
const EXPECTED_MESSAGES = [
  "Saludo desde la rama feature/saludo",
  "Despedida desde la rama feature/despedida",
  "Mensaje escrito en la rama feature/conflicto",
  "Mensaje escrito directamente en main"
];

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

function ensureGitRepository() {
  if (git(["rev-parse", "--is-inside-work-tree"], { allowFailure: true }) !== "true") {
    throw new Error("Este script debe ejecutarse dentro de un repositorio Git.");
  }
}

function listBranches() {
  return git([
    "for-each-ref",
    "--format=%(refname:short)",
    "refs/heads",
    "refs/remotes/origin"
  ], { allowFailure: true })
    .split(/\r?\n/)
    .map((branch) => branch.trim())
    .filter(Boolean)
    .filter((branch) => branch !== "origin/HEAD");
}

function mainRef(branches) {
  if (branches.includes("origin/main")) {
    return "origin/main";
  }

  return branches.includes("main") ? "main" : "HEAD";
}

function readMensajes(ref) {
  const fromRef = git(["show", `${ref}:${MENSAJES_PATH}`], { allowFailure: true });
  if (fromRef) {
    return fromRef;
  }

  return existsSync(MENSAJES_PATH) ? readFileSync(MENSAJES_PATH, "utf8") : "";
}

function hasBranchEvidence(branches, name, historyText) {
  return branches.some((branch) => branch === name || branch === `origin/${name}`)
    || historyText.includes(name);
}

function main() {
  const failures = [];
  const warnings = [];

  ensureGitRepository();

  const branches = listBranches();
  const ref = mainRef(branches);
  const historyText = git(["log", "--all", "--decorate", "--pretty=%D%n%s", "-n", "500"], { allowFailure: true });
  const mensajes = readMensajes(ref);
  const mergeCommits = git(["log", ref, "--merges", "--format=%h %s", "-n", "50"], { allowFailure: true });

  console.log("Ramas detectadas:");
  for (const branch of branches) {
    console.log(`- ${branch}`);
  }
  console.log("");

  for (const branch of EXPECTED_BRANCHES) {
    if (hasBranchEvidence(branches, branch, historyText)) {
      console.log(`[OK] Hay registro de la rama ${branch}.`);
    } else if (strictFinalValidation) {
      failures.push(`No se encontró registro de la rama ${branch} ni en las ramas actuales ni en el historial.`);
    } else {
      warnings.push(`Todavía no hay registro de la rama ${branch}. Es normal en etapas tempranas.`);
    }
  }

  if (mergeCommits) {
    console.log(`[OK] main tiene commits de fusión:\n${mergeCommits.split(/\r?\n/).map((line) => `    ${line}`).join("\n")}`);
  } else if (strictFinalValidation) {
    failures.push("main no tiene ningún commit de fusión. Usa `git merge --no-ff` para dejar rastro de las integraciones.");
  } else {
    warnings.push("main aún no tiene commits de fusión.");
  }

  if (/^(<{7}|={7}|>{7})/m.test(mensajes)) {
    failures.push(`${MENSAJES_PATH} todavía tiene marcas de conflicto sin resolver.`);
  } else {
    console.log(`[OK] ${MENSAJES_PATH} no tiene marcas de conflicto.`);
  }

  for (const mensaje of EXPECTED_MESSAGES) {
    if (mensajes.includes(mensaje)) {
      console.log(`[OK] main conserva el mensaje "${mensaje}".`);
    } else if (strictFinalValidation) {
      failures.push(`main no contiene el mensaje "${mensaje}".`);
    } else {
      warnings.push(`main todavía no contiene el mensaje "${mensaje}".`);
    }
  }

  console.log("");
  for (const warning of warnings) {
    console.warn(`[AVISO] ${warning}`);
  }

  if (failures.length > 0) {
    console.error("");
    console.error("La validación de ramas y merges encontró problemas:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    console.error("");
    console.error("Revisa tus ramas, merges y el contenido de main antes de entregar la práctica.");
    process.exit(1);
  }

  console.log("");
  console.log(strictFinalValidation
    ? "Ramas y merges validados correctamente en modo final."
    : "Ramas y merges validados correctamente en modo progresivo.");
}

try {
  main();
} catch (error) {
  console.error("[ERROR] No se pudo validar el trabajo con ramas.");
  console.error(error.message);
  process.exit(1);
}
