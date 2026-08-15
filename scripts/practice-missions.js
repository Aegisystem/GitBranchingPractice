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

## Pasos sugeridos
- Clona tu repositorio y entra a la carpeta.
- Configura tu identidad si es la primera vez que usas Git en este equipo:

\`\`\`bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@ejemplo.com"
git config --global push.autoSetupRemote true
\`\`\`

La última línea es la que hace que \`git push\` funcione siempre, incluso la primera vez que publicas una rama nueva.

- Edita \`docs/bitacora.md\` y reemplaza la línea de ejemplo por una línea real con tu nombre, por ejemplo:

\`\`\`text
- Ana Pérez - Clono el repositorio y empiezo la práctica - 2025-03-10
\`\`\`

- Revisa qué cambió:

\`\`\`bash
git status
git diff
\`\`\`

- Prepara y confirma el cambio:

\`\`\`bash
git add .
git commit -m "Agrega mi nombre a la bitacora"
\`\`\`

- Publica el commit:

\`\`\`bash
git push
\`\`\`

## Criterio de cierre
El workflow cerrará este issue cuando \`docs/bitacora.md\` esté publicado en \`main\` con una línea real en lugar del texto de ejemplo.`
  },
  {
    id: 2,
    title: "Publicar varios commits con git push",
    summary: "Harás al menos dos commits pequeños y los subirás al repositorio remoto.",
    why: "El commit guarda el cambio en tu copia local; el push lo comparte con el remoto. Separar el trabajo en commits pequeños hace que el historial se pueda leer y revertir.",
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

## Pasos sugeridos
- Trabaja en \`main\`.
- Haz un primer cambio pequeño, por ejemplo una línea nueva en \`docs/bitacora.md\`, y confírmalo:

\`\`\`bash
git add .
git commit -m "Registra el avance de la mision 2"
\`\`\`

- Haz un segundo cambio distinto, por ejemplo mejorar la \`Descripción\` del \`README.md\`, y confírmalo:

\`\`\`bash
git add .
git commit -m "Mejora la descripcion del README"
\`\`\`

- Revisa tu historial local antes de publicar:

\`\`\`bash
git log --oneline
\`\`\`

- Publica los dos commits:

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

Todavía no hay diferencia de contenido entre las dos ramas. La habrá en la próxima misión, cuando hagas un commit estando parado en \`feature/saludo\`.`,
    body: `## Objetivo
Crear la rama \`feature/saludo\` a partir de \`main\` y publicarla.

## Pasos sugeridos
- Asegúrate de estar en \`main\`:

\`\`\`bash
git checkout main
\`\`\`

- Crea la rama y muévete a ella en un solo comando:

\`\`\`bash
git checkout -b feature/saludo
\`\`\`

- Comprueba en qué rama estás:

\`\`\`bash
git branch
\`\`\`

- Publica la rama en GitHub:

\`\`\`bash
git push
\`\`\`

## Si el push te da un error
Si Git responde algo como \`fatal: The current branch feature/saludo has no upstream branch\`, es porque falta la configuración que hicimos al principio. Actívala una sola vez y repite \`git push\`:

\`\`\`bash
git config --global push.autoSetupRemote true
\`\`\`

## Criterio de cierre
El workflow cerrará este issue cuando la rama \`feature/saludo\` exista en GitHub.`
  },
  {
    id: 4,
    title: "Hacer commits dentro de feature/saludo",
    summary: "Agregarás un mensaje nuevo al proyecto desde tu rama, sin tocar `main`.",
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

\`main\` quedó exactamente igual que antes: tu mensaje solo existe en \`feature/saludo\`. En la misión 8 te moverás entre las dos ramas y lo verás con tus propios ojos.`,
    body: `## Objetivo
Modificar el proyecto desde la rama \`feature/saludo\` y publicar el cambio.

## Pasos sugeridos
- Confirma que estás en la rama correcta:

\`\`\`bash
git status
\`\`\`

La primera línea te dirá \`On branch feature/saludo\`.

- Edita \`src/mensajes.js\` y agrega esta línea exacta dentro del arreglo:

\`\`\`javascript
"${MENSAJE_SALUDO}",
\`\`\`

- El arreglo debe quedar parecido a esto:

\`\`\`javascript
export const mensajes = [
  "Mensaje inicial de la plantilla",
  "${MENSAJE_SALUDO}"
];
\`\`\`

- Prueba el proyecto localmente:

\`\`\`bash
npm start
\`\`\`

- Confirma y publica:

\`\`\`bash
git add .
git commit -m "Agrega mensaje de saludo"
git push
\`\`\`

- Verifica cómo se separaron las dos ramas:

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

A esto Git lo llama **fast-forward**: no hay nada que combinar, así que no crea un commit nuevo, solo mueve el puntero. Verás un merge distinto en la misión 9, cuando las dos ramas sí hayan cambiado la misma línea.`,
    body: `## Objetivo
Integrar \`feature/saludo\` dentro de \`main\`.

## Pasos sugeridos
- Cambia a la rama que recibirá los cambios:

\`\`\`bash
git checkout main
\`\`\`

- Fusiona la rama de trabajo:

\`\`\`bash
git merge feature/saludo
\`\`\`

- Revisa cómo quedó el historial:

\`\`\`bash
git log --oneline --graph -10
\`\`\`

- Comprueba que ahora \`main\` sí tiene el mensaje:

\`\`\`bash
npm start
\`\`\`

- Publica el resultado:

\`\`\`bash
git push
\`\`\`

## Qué dirá Git
La salida del merge dirá \`Fast-forward\`. Significa que \`main\` no había cambiado desde que creaste la rama, así que Git no tuvo que combinar nada: simplemente adelantó \`main\` hasta tu commit. Es el caso más simple y el más común cuando trabajas tú solo.

## Criterio de cierre
El workflow cerrará este issue cuando \`main\` contenga los commits de \`feature/saludo\` y el mensaje de saludo esté publicado en \`main\`.`
  },
  {
    id: 6,
    title: "Crear la rama feature/despedida desde main actualizado",
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

## Pasos sugeridos
- Vuelve a \`main\` antes de ramificar:

\`\`\`bash
git checkout main
\`\`\`

- Crea y publica la rama:

\`\`\`bash
git checkout -b feature/despedida
git push
\`\`\`

- Comprueba que la rama ya incluye el saludo integrado en la misión anterior:

\`\`\`bash
git log --oneline -5
\`\`\`

## Criterio de cierre
El workflow cerrará este issue cuando la rama \`feature/despedida\` exista en GitHub y parta de un \`main\` que ya incluye el merge anterior.`
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
Agregar un mensaje nuevo desde \`feature/despedida\`.

## Pasos sugeridos
- Confirma la rama actual:

\`\`\`bash
git status
\`\`\`

- Edita \`src/mensajes.js\` y agrega esta línea exacta al final del arreglo:

\`\`\`javascript
"${MENSAJE_DESPEDIDA}"
\`\`\`

- Revisa el cambio antes de confirmarlo:

\`\`\`bash
git diff
\`\`\`

- Confirma y publica:

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

Con \`git checkout feature/saludo\` volverás a ver el proyecto como estaba en esa rama (dos mensajes) y con \`git checkout main\` volverás al estado actual (tres mensajes). Los archivos de tu carpeta cambian solos.`,
    body: `## Objetivo
Fusionar \`feature/despedida\` en \`main\` y comprobar, moviéndote entre ramas, qué contiene cada una.

## Pasos sugeridos
- Integra la rama:

\`\`\`bash
git checkout main
git merge feature/despedida
git push
\`\`\`

- Comprueba que \`main\` ya tiene los tres mensajes:

\`\`\`bash
npm start
\`\`\`

- Muévete a la primera rama y vuelve a ejecutar el proyecto:

\`\`\`bash
git checkout feature/saludo
npm start
\`\`\`

Verás solo dos mensajes: esa rama se quedó donde la dejaste. Abre \`src/mensajes.js\` y compruébalo.

- Vuelve a \`main\`:

\`\`\`bash
git checkout main
npm start
\`\`\`

- Mira el historial completo:

\`\`\`bash
git log --oneline --graph
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

## Paso 1: crear la rama y cambiar una línea
\`\`\`bash
git checkout main
git checkout -b feature/conflicto
\`\`\`

En \`src/mensajes.js\`, reemplaza la línea \`"Mensaje inicial de la plantilla"\` por:

\`\`\`javascript
"${MENSAJE_CONFLICTO_RAMA}",
\`\`\`

\`\`\`bash
git add .
git commit -m "Cambia el mensaje inicial desde la rama"
git push
\`\`\`

## Paso 2: cambiar la misma línea en main
\`\`\`bash
git checkout main
\`\`\`

En \`src/mensajes.js\`, reemplaza esa misma línea original por:

\`\`\`javascript
"${MENSAJE_CONFLICTO_MAIN}",
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

Git se detendrá con un mensaje de conflicto. Revisa el estado:

\`\`\`bash
git status
\`\`\`

El archivo tendrá marcas como estas:

\`\`\`text
<<<<<<< HEAD
  "${MENSAJE_CONFLICTO_MAIN}",
=======
  "${MENSAJE_CONFLICTO_RAMA}",
>>>>>>> feature/conflicto
\`\`\`

## Paso 4: resolver conservando ambos mensajes
Borra las marcas \`<<<<<<<\`, \`=======\` y \`>>>>>>>\` y deja las dos líneas:

\`\`\`javascript
  "${MENSAJE_CONFLICTO_MAIN}",
  "${MENSAJE_CONFLICTO_RAMA}",
\`\`\`

Después cierra el merge:

\`\`\`bash
npm start
git add .
git commit -m "Resuelve el conflicto conservando ambos mensajes"
git push
\`\`\`

Usa \`git commit -m "..."\` como siempre. Si escribes \`git commit\` sin \`-m\`, Git abrirá un editor en la terminal con un mensaje ya preparado: si es \`vim\`, se sale escribiendo \`:wq\` y Enter.

## Criterio de cierre
El workflow cerrará este issue cuando \`main\` incluya los commits de \`feature/conflicto\`, contenga los dos mensajes del conflicto y no queden marcas de conflicto en el archivo.`
  },
  {
    id: 10,
    title: "Documentar el flujo de ramas en el README",
    summary: "Explicarás en el README cómo trabajaste con commits, push, ramas y merges.",
    why: "Documentar el flujo permite que otra persona repita el proceso y demuestra que entendiste lo que hiciste, no solo que copiaste comandos.",
    diagram: `Este es el historial completo que debes ser capaz de explicar con tus palabras:

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
| R | Este commit: el README documentado |

Fíjate en que solo hay **una** bifurcación dibujada. Los merges de las misiones 5 y 8 fueron fast-forward y por eso el historial ahí es una línea recta: no había dos versiones que combinar. Ejecuta \`git log --oneline --graph\` y compáralo.`,
    body: `## Objetivo
Dejar el \`README.md\` completo, con la estructura obligatoria y una explicación real del flujo de trabajo usado.

## Pasos sugeridos
- Trabaja en \`main\` con el repositorio actualizado.
- Asegúrate de que el \`README.md\` tenga estos encabezados exactos:

\`\`\`markdown
# Nombre del Proyecto
## Descripción
## Instalación
## Uso
## Autores
## Flujo de trabajo Git
\`\`\`

- En \`Instalación\`, indica que se necesita Node.js 20 o superior.
- En \`Uso\`, explica cómo ejecutar el proyecto con \`npm start\` y qué imprime.
- En \`Autores\`, borra el texto de la plantilla y escribe los nombres reales de integrantes, curso o grupo.
- **Borra la explicación que trae la plantilla en \`Flujo de trabajo Git\` y escribe la tuya.** La validación rechaza el texto original: lo que se evalúa es que expliques lo que hiciste tú.
- En \`Flujo de trabajo Git\`, explica con tus palabras:
  - qué hace \`git commit\` y qué hace \`git push\`;
  - para qué sirvieron las ramas \`feature/saludo\`, \`feature/despedida\` y \`feature/conflicto\`;
  - qué hace \`git merge\` y qué diferencia notaste entre los merges de las misiones 5 y 8 y el de la misión 9;
  - cómo resolviste el conflicto.
- Publica el cambio:

\`\`\`bash
git add .
git commit -m "Documenta el flujo de ramas y merges"
git push
\`\`\`

- Puedes revisar localmente antes de publicar:

\`\`\`bash
npm run validate:readme
npm run validate:branching
\`\`\`

## Criterio de cierre
Esta es la última misión. El workflow la cerrará cuando el README publicado en \`main\` tenga la estructura obligatoria y explique commits, push, ramas y merge.`
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
Cuando publiques cambios, el workflow **Validar progreso de misiones** revisará los criterios verificables. Si cumples, comentará el resultado, cerrará este issue y creará la siguiente misión. Si todavía falta algo, dejará una checklist con lo que debes corregir.

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
