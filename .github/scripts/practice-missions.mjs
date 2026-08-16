export const PRACTICE_MARKER = "git-branching-practice";

export const MENSAJE_SALUDO = "Saludo desde la rama feature/saludo";
export const MENSAJE_DESPEDIDA = "Despedida desde la rama feature/despedida";
export const MENSAJE_CONFLICTO_RAMA = "Mensaje escrito en la rama feature/conflicto";
export const MENSAJE_CONFLICTO_MAIN = "Mensaje escrito directamente en main";

export const missions = [
  {
    id: 1,
    title: "Hacer tu primer commit en main",
    summary: "Registrarás tu nombre en la bitácora y lo guardarás en el historial con tu primer commit.",
    why: "Un commit es la unidad mínima del historial de Git: guarda un cambio con autor, fecha y mensaje para poder recuperarlo o revisarlo después.",
    diagram: `Cada \`o\` es un commit. El nombre entre paréntesis es la rama que apunta a ese commit.

**Antes**

\`\`\`text
  o---o---o   (main)
              ^ último commit de la plantilla
\`\`\`

**Después de esta misión**

\`\`\`text
  o---o---o---C   (main)
              ^ C = tu commit con tu nombre en la bitácora
\`\`\`

Tu commit se suma al final de la línea. Nada se reescribe: el historial solo crece.`,
    body: `## Objetivo
Crear tu primer commit propio sobre la rama \`main\`.

## Pasos
- Clona tu repositorio y entra a la carpeta.
- Si es la primera vez que usas Git en este equipo, configúralo:

\`\`\`bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@ejemplo.com"
git config --global push.autoSetupRemote true
\`\`\`

- Abre \`bitacora.md\` y reemplaza la línea de ejemplo por una con tu nombre:

\`\`\`text
- Ana Pérez - Clono el repositorio y empiezo la práctica - 2026-08-15
\`\`\`

- Guarda el archivo y mira qué cambió:

\`\`\`bash
git status
\`\`\`

- Guarda el cambio en el historial y publícalo:

\`\`\`bash
git add .
git commit -m "Agrega mi nombre a la bitacora"
git push
\`\`\`

## Criterio de cierre
El workflow cerrará este issue cuando \`bitacora.md\` esté publicado en \`main\` con una línea real en lugar del texto de ejemplo.`
  },
  {
    id: 2,
    title: "Publicar varios commits con git push",
    summary: "Harás dos commits pequeños y los subirás juntos a GitHub.",
    why: "El commit guarda el cambio en tu copia local; el push lo comparte con el remoto. Separar el trabajo en commits pequeños hace que el historial se pueda leer.",
    diagram: `Aquí se ve la diferencia entre tu repositorio local y el remoto (GitHub).

**Antes** — haces dos commits, pero GitHub todavía no los tiene

\`\`\`text
  local    o---o---C---D---E   (main)
  GitHub   o---o---C           (origin/main)
                       ^ D y E existen solo en tu equipo
\`\`\`

**Después del push**

\`\`\`text
  local    o---o---C---D---E   (main)
  GitHub   o---o---C---D---E   (origin/main)
\`\`\`

\`commit\` guarda; \`push\` publica. Son dos pasos distintos.`,
    body: `## Objetivo
Practicar el ciclo \`add\` → \`commit\` → \`push\` con más de un cambio.

## Pasos
- Trabaja en \`main\`.
- Agrega una línea nueva al \`## Registro\` de \`bitacora.md\` contando qué estás haciendo, guarda y confirma:

\`\`\`bash
git add .
git commit -m "Registra el avance de la mision 2"
\`\`\`

- Agrega **otra** línea distinta, guarda y haz un segundo commit:

\`\`\`bash
git add .
git commit -m "Anota una segunda nota en la bitacora"
\`\`\`

- Mira tu historial local: los dos commits ya están, pero todavía no en GitHub.

\`\`\`bash
git log --oneline
\`\`\`

- Publica los dos de una vez:

\`\`\`bash
git push
\`\`\`

## Criterio de cierre
El workflow cerrará este issue cuando detecte al menos dos commits nuevos publicados en \`main\` después de que se creó esta misión.`
  },
  {
    id: 3,
    title: "Crear y publicar la rama feature/saludo",
    summary: "Crearás tu primera rama de trabajo y la publicarás en GitHub.",
    why: "Una rama es una línea de trabajo paralela: te deja avanzar sin tocar `main`, que debe mantenerse estable.",
    diagram: `Crear una rama no copia archivos ni duplica el proyecto: solo crea un nombre nuevo que apunta al mismo commit.

**Antes**

\`\`\`text
  o---o---C---D---E   (main)
\`\`\`

**Después de \`git checkout -b feature/saludo\`**

\`\`\`text
  o---o---C---D---E   (main, feature/saludo)
                  ^ los dos nombres apuntan al MISMO commit
\`\`\`

Todavía no hay diferencia entre las dos ramas. La habrá en la próxima misión, cuando hagas un commit estando parado en \`feature/saludo\`.`,
    body: `## Objetivo
Crear la rama \`feature/saludo\` a partir de \`main\` y publicarla.

## Pasos
- Asegúrate de estar en \`main\`:

\`\`\`bash
git checkout main
\`\`\`

- Crea la rama y muévete a ella, todo en un comando:

\`\`\`bash
git checkout -b feature/saludo
\`\`\`

- Comprueba dónde estás. El asterisco marca tu rama actual:

\`\`\`bash
git branch
\`\`\`

- Publica la rama en GitHub:

\`\`\`bash
git push
\`\`\`

## Si el push te da un error
Si Git responde \`fatal: The current branch feature/saludo has no upstream branch\`, falta la configuración del principio. Actívala una sola vez y repite \`git push\`:

\`\`\`bash
git config --global push.autoSetupRemote true
\`\`\`

## Criterio de cierre
El workflow cerrará este issue cuando la rama \`feature/saludo\` exista en GitHub.`
  },
  {
    id: 4,
    title: "Hacer commits dentro de feature/saludo",
    summary: "Agregarás una línea al archivo de mensajes desde tu rama, sin tocar `main`.",
    why: "Trabajar dentro de la rama demuestra el aislamiento: `main` no cambia mientras tú experimentas.",
    diagram: `Aquí la rama deja de ser un simple nombre y el historial se separa en dos líneas.

**Antes**

\`\`\`text
  o---o---E   (main, feature/saludo)
\`\`\`

**Después de tu commit**

\`\`\`text
  o---o---E            (main)
           \\
            S          (feature/saludo)
                       ^ S = "Agrega mensaje de saludo"
\`\`\`

\`main\` quedó exactamente igual que antes: tu línea solo existe en \`feature/saludo\`. En la misión 8 te moverás entre las dos ramas y lo verás con tus propios ojos.`,
    body: `## Objetivo
Modificar \`mensajes.txt\` desde la rama \`feature/saludo\` y publicar el cambio.

## Pasos
- Confirma que estás en la rama correcta. La primera línea dirá \`On branch feature/saludo\`:

\`\`\`bash
git status
\`\`\`

- Abre \`mensajes.txt\` y agrega **al final** esta línea exacta:

\`\`\`text
${MENSAJE_SALUDO}
\`\`\`

- El archivo debe quedar así:

\`\`\`text
Mensaje inicial de la plantilla
${MENSAJE_SALUDO}
\`\`\`

- Guarda, confirma y publica:

\`\`\`bash
git add .
git commit -m "Agrega mensaje de saludo"
git push
\`\`\`

- Mira cómo se separaron las dos ramas:

\`\`\`bash
git log --oneline --graph --all
\`\`\`

## Criterio de cierre
El workflow cerrará este issue cuando la rama \`feature/saludo\` contenga el mensaje de saludo publicado. Fíjate en que \`main\` todavía no lo tiene: ese es el aislamiento que dan las ramas.`
  },
  {
    id: 5,
    title: "Fusionar feature/saludo en main con git merge",
    summary: "Integrarás el trabajo de tu rama en `main` usando un merge y lo publicarás.",
    why: "El merge lleva a `main` el trabajo que hiciste aparte. Es el paso que convierte tu experimento en parte del proyecto.",
    diagram: `El merge une las dos líneas. Como \`main\` no cambió desde que creaste la rama, Git no necesita inventar nada: solo adelanta el nombre \`main\` hasta tu commit.

**Antes**

\`\`\`text
  o---o---E            (main)
           \\
            S          (feature/saludo)
\`\`\`

**Después de \`git merge feature/saludo\`**

\`\`\`text
  o---o---E---S        (main, feature/saludo)
              ^ main avanzó hasta S; las dos ramas vuelven a coincidir
\`\`\`

A esto Git lo llama **fast-forward**: no hay nada que combinar, así que no crea un commit nuevo, solo mueve el puntero. Verás un merge distinto en la misión 9.`,
    body: `## Objetivo
Integrar \`feature/saludo\` dentro de \`main\`.

## Pasos
- Cambia a la rama que va a recibir los cambios:

\`\`\`bash
git checkout main
\`\`\`

- Abre \`mensajes.txt\`: verás que aquí todavía falta tu línea de saludo.
- Fusiona la rama de trabajo:

\`\`\`bash
git merge feature/saludo
\`\`\`

- Vuelve a abrir \`mensajes.txt\`: ahora sí está el saludo.
- Mira el historial y publica:

\`\`\`bash
git log --oneline --graph --all
git push
\`\`\`

## Qué dirá Git
La salida del merge dirá \`Fast-forward\`. Significa que \`main\` no había cambiado desde que creaste la rama, así que Git no tuvo que combinar nada: simplemente adelantó \`main\` hasta tu commit.

## Criterio de cierre
El workflow cerrará este issue cuando \`main\` contenga los commits de \`feature/saludo\` y el mensaje de saludo esté publicado en \`main\`.`
  },
  {
    id: 6,
    title: "Crear la rama feature/despedida desde main",
    summary: "Crearás una segunda rama, esta vez partiendo del `main` que ya tiene el saludo integrado.",
    why: "Cada rama nueva debe nacer del `main` más reciente; si parte de un estado viejo, arrastras trabajo repetido y aumentas el riesgo de conflictos.",
    diagram: `Lo importante de esta misión es **desde dónde** nace la rama.

**Correcto** — estando en \`main\`, que ya tiene el saludo integrado

\`\`\`text
  o---E---S   (main, feature/despedida)
          ^ la rama nueva arranca aquí, con el saludo ya dentro
\`\`\`

**Incorrecto** — creando la rama sin volver antes a \`main\`

\`\`\`text
  o---E---S        (main)
       \\
        (feature/despedida)   <- nace atrás: no tiene el saludo
\`\`\`

Por eso la validación revisa que tu rama nueva ya contenga el mensaje de saludo: es la prueba de que la creaste desde el \`main\` correcto.`,
    body: `## Objetivo
Crear y publicar la rama \`feature/despedida\` a partir de \`main\`.

## Pasos
- Vuelve a \`main\` antes de ramificar:

\`\`\`bash
git checkout main
\`\`\`

- Crea la rama y publícala:

\`\`\`bash
git checkout -b feature/despedida
git push
\`\`\`

- Abre \`mensajes.txt\`: debe tener ya el mensaje de saludo. Si no lo tiene, creaste la rama desde el sitio equivocado.

## Criterio de cierre
El workflow cerrará este issue cuando la rama \`feature/despedida\` exista en GitHub y contenga el saludo integrado en la misión 5.`
  },
  {
    id: 7,
    title: "Hacer commit y push en feature/despedida",
    summary: "Agregarás el mensaje de despedida desde la segunda rama y lo publicarás.",
    why: "Repetir el ciclo en una segunda rama consolida el hábito: una rama por tarea, commits pequeños y push frecuente.",
    diagram: `Mismo patrón de la misión 4, ahora sobre la segunda rama.

**Antes**

\`\`\`text
  o---E---S   (main, feature/despedida)
\`\`\`

**Después de tu commit y push**

\`\`\`text
  o---E---S        (main)
           \\
            D      (feature/despedida)
                   ^ D = "Agrega mensaje de despedida"
\`\`\`

\`main\` vuelve a quedarse quieto mientras tú trabajas. El saludo ya está dentro de \`main\`; la despedida todavía no.`,
    body: `## Objetivo
Agregar una línea nueva desde \`feature/despedida\`.

## Pasos
- Confirma en qué rama estás:

\`\`\`bash
git status
\`\`\`

- Abre \`mensajes.txt\` y agrega al final esta línea exacta:

\`\`\`text
${MENSAJE_DESPEDIDA}
\`\`\`

- El archivo debe quedar con tres líneas:

\`\`\`text
Mensaje inicial de la plantilla
${MENSAJE_SALUDO}
${MENSAJE_DESPEDIDA}
\`\`\`

- Guarda, confirma y publica:

\`\`\`bash
git add .
git commit -m "Agrega mensaje de despedida"
git push
\`\`\`

## Criterio de cierre
El workflow cerrará este issue cuando la rama \`feature/despedida\` contenga el mensaje de despedida publicado.`
  },
  {
    id: 8,
    title: "Fusionar feature/despedida y moverte entre ramas",
    summary: "Integrarás la segunda rama en `main` y usarás `git checkout` para ver con tus ojos qué contiene cada rama.",
    why: "Cambiar de rama reemplaza los archivos de tu carpeta por la versión de esa rama. Verlo en vivo es lo que hace que la idea de rama deje de ser abstracta.",
    diagram: `Segundo merge, otra vez fast-forward: \`main\` no cambió mientras trabajabas en la rama.

**Antes**

\`\`\`text
  o---E---S        (main)
           \\
            D      (feature/despedida)
\`\`\`

**Después de \`git merge feature/despedida\`**

\`\`\`text
  o---E---S---D   (main, feature/despedida)
              ^ main alcanzó a la rama; ambas apuntan al mismo commit
\`\`\`

Con \`git checkout feature/saludo\` volverás a ver el archivo como estaba en esa rama y con \`git checkout main\` volverás al estado actual. Los archivos de tu carpeta cambian solos.`,
    body: `## Objetivo
Fusionar \`feature/despedida\` en \`main\` y comprobar, moviéndote entre ramas, qué contiene cada una.

## Pasos
- Integra la rama:

\`\`\`bash
git checkout main
git merge feature/despedida
git push
\`\`\`

- Abre \`mensajes.txt\`: en \`main\` hay ahora **tres** líneas.
- Muévete a la primera rama:

\`\`\`bash
git checkout feature/saludo
\`\`\`

- Vuelve a abrir \`mensajes.txt\` **sin cerrar el editor**: ahora tiene **dos** líneas. Esa rama se quedó donde la dejaste, y Git ha reemplazado el contenido de tu carpeta.
- Regresa a \`main\` y compruébalo otra vez:

\`\`\`bash
git checkout main
\`\`\`

- Mira el historial completo:

\`\`\`bash
git log --oneline --graph --all
\`\`\`

## Criterio de cierre
El workflow cerrará este issue cuando \`main\` contenga los dos mensajes integrados, el de saludo y el de despedida.`
  },
  {
    id: 9,
    title: "Provocar y resolver un conflicto de merge",
    summary: "Cambiarás la misma línea en dos ramas distintas y resolverás el conflicto al fusionar.",
    why: "Un conflicto no es un error: es Git avisando que dos cambios tocan lo mismo y que la decisión es humana. Saber resolverlo evita perder trabajo.",
    diagram: `El conflicto aparece porque las dos líneas modifican **la misma línea del mismo archivo**.

**Paso 1 y 2** — las dos ramas cambian la misma línea

\`\`\`text
  ...---D---X   (main)              X = "...directamente en main"
         \\
          Y     (feature/conflicto) Y = "...en la rama feature/conflicto"
\`\`\`

**Paso 3** — Git no puede decidir y se detiene

\`\`\`text
  ...---D---X---???   (merge detenido a la mitad)
         \\     /
          Y---'
\`\`\`

**Paso 4** — tú decides y cierras el merge

\`\`\`text
  ...---D---X-------F   (main)
         \\         /
          Y-------'     F = commit de fusión con TU resolución
\`\`\`

Fíjate en la diferencia con las misiones 5 y 8: allí \`main\` no se había movido y el merge fue un simple *fast-forward*. Aquí las dos líneas avanzaron por separado, así que Git tiene que crear un commit nuevo —el commit de fusión— para juntarlas, y necesita que tú decidas qué queda.`,
    body: `## Objetivo
Crear un conflicto real entre \`main\` y \`feature/conflicto\`, y resolverlo conservando ambos cambios.

## Paso 1: crear la rama y cambiar la primera línea
\`\`\`bash
git checkout main
git checkout -b feature/conflicto
\`\`\`

En \`mensajes.txt\`, reemplaza la primera línea, \`Mensaje inicial de la plantilla\`, por:

\`\`\`text
${MENSAJE_CONFLICTO_RAMA}
\`\`\`

\`\`\`bash
git add .
git commit -m "Cambia el mensaje inicial desde la rama"
git push
\`\`\`

## Paso 2: cambiar esa misma línea en main
\`\`\`bash
git checkout main
\`\`\`

En \`mensajes.txt\`, reemplaza esa misma primera línea original por:

\`\`\`text
${MENSAJE_CONFLICTO_MAIN}
\`\`\`

\`\`\`bash
git add .
git commit -m "Cambia el mensaje inicial desde main"
git push
\`\`\`

## Paso 3: fusionar y ver el conflicto
\`\`\`bash
git merge feature/conflicto
\`\`\`

Git se detendrá y avisará \`CONFLICT\`. Revisa el estado:

\`\`\`bash
git status
\`\`\`

Abre \`mensajes.txt\`: verás las dos versiones marcadas.

\`\`\`text
<<<<<<< HEAD
${MENSAJE_CONFLICTO_MAIN}
=======
${MENSAJE_CONFLICTO_RAMA}
>>>>>>> feature/conflicto
\`\`\`

## Paso 4: resolver conservando ambos mensajes
Borra las tres líneas de marcas —\`<<<<<<<\`, \`=======\` y \`>>>>>>>\`— y deja los dos mensajes:

\`\`\`text
${MENSAJE_CONFLICTO_MAIN}
${MENSAJE_CONFLICTO_RAMA}
\`\`\`

Guarda y cierra el merge con el ciclo de siempre:

\`\`\`bash
git add .
git commit -m "Resuelve el conflicto conservando ambos mensajes"
git push
\`\`\`

Si escribes \`git commit\` sin \`-m\`, Git abrirá un editor en la terminal con un mensaje ya preparado: si es \`vim\`, se sale con \`:wq\` y Enter. Y si prefieres empezar el merge de cero, \`git merge --abort\` lo cancela.

## Criterio de cierre
El workflow cerrará este issue cuando \`main\` incluya los commits de \`feature/conflicto\`, contenga los dos mensajes del conflicto y no queden marcas de conflicto en el archivo.`
  },
  {
    id: 10,
    title: "Explicar el flujo en tu bitácora",
    summary: "Escribirás con tus palabras qué hiciste con commits, push, ramas y merges.",
    why: "Explicarlo es la prueba de que lo entendiste. Copiar comandos se puede hacer sin comprender nada; contarlo, no.",
    diagram: `Este es el historial completo que debes ser capaz de explicar:

\`\`\`text
  o---C---D---E---S---P---X-------F---R   (main)
                           \\     /
                            Y---'
\`\`\`

| Marca | Qué es |
| --- | --- |
| C, D, E | Tus primeros commits directos en \`main\` (misiones 1 y 2) |
| S | Commit hecho dentro de \`feature/saludo\`, integrado con un merge fast-forward |
| P | Commit hecho dentro de \`feature/despedida\`, integrado igual |
| X / Y | Los dos cambios en conflicto: \`X\` en \`main\`, \`Y\` en \`feature/conflicto\` |
| F | El único commit de fusión del historial: el conflicto que resolviste |
| R | Este commit: tu explicación en la bitácora |

Fíjate en que solo hay **una** bifurcación. Los merges de las misiones 5 y 8 fueron fast-forward y por eso el historial ahí es una línea recta. Ejecuta \`git log --oneline --graph --all\` y compáralo.`,
    body: `## Objetivo
Completar la sección \`## Lo que aprendí\` de \`bitacora.md\` con tu explicación del flujo.

## Pasos
- Asegúrate de estar en \`main\`:

\`\`\`bash
git checkout main
\`\`\`

- Borra la línea de ejemplo de \`## Lo que aprendí\` y escribe **con tus palabras** al menos un párrafo que responda:
  - ¿Qué hace \`git commit\` y qué hace \`git push\`? ¿En qué se diferencian?
  - ¿Para qué te sirvieron las ramas \`feature/saludo\`, \`feature/despedida\` y \`feature/conflicto\`?
  - ¿Qué hace \`git merge\`? ¿Qué diferencia notaste entre los merges de las misiones 5 y 8 y el de la misión 9?
  - ¿Por qué apareció el conflicto y cómo lo resolviste?
- Antes de escribir, mira tu propio historial: te ayudará a contarlo.

\`\`\`bash
git log --oneline --graph --all
\`\`\`

- Publica tu explicación:

\`\`\`bash
git add .
git commit -m "Explica el flujo de ramas y merges en la bitacora"
git push
\`\`\`

## Criterio de cierre
Esta es la última misión. El workflow la cerrará cuando \`bitacora.md\` explique, con tus palabras, commit, push, ramas, merge y el conflicto.`
  }
];

export function missionNumber(id) {
  return String(id).padStart(2, "0");
}

export function missionMarker(id) {
  return `<!-- ${PRACTICE_MARKER}:mission=${id} -->`;
}

export function missionIssueTitle(mission) {
  return `[Misión ${missionNumber(mission.id)}] ${mission.title}`;
}

export function missionIssueBody(mission) {
  return `${missionMarker(mission.id)}

## Resumen rápido
- **Qué harás:** ${mission.summary}
- **Por qué importa:** ${mission.why}

## Cómo cambia tu historial
${mission.diagram}

${mission.body}

## Seguimiento automático
Cuando publiques cambios, el workflow **Validar progreso de misiones** revisará los criterios. Si cumples, comentará el resultado, cerrará este issue y creará la siguiente misión. Si todavía falta algo, dejará una checklist con lo que debes corregir.

No cierres este issue manualmente. Si se cierra desde la interfaz de GitHub, el workflow **Proteger cierre de misiones** lo reabrirá.

---
Práctica guiada de ramas y merges en Git. Identificador interno: misión ${mission.id}.`;
}

export function getMissionById(id) {
  return missions.find((mission) => mission.id === Number(id));
}

export function getNextMission(id) {
  return getMissionById(Number(id) + 1);
}

export function extractMissionId(text = "") {
  const markerMatch = text.match(/git-branching-practice:mission=(\d+)/i);
  if (markerMatch) {
    return Number(markerMatch[1]);
  }

  const titleMatch = text.match(/\[?Misi[oó]n\s+0?(\d+)\]?/i);
  if (titleMatch) {
    return Number(titleMatch[1]);
  }

  return null;
}
