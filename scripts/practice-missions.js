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
\`\`\`

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
git add docs/bitacora.md
git commit -m "Agrega mi nombre a la bitacora"
\`\`\`

- Publica el commit:

\`\`\`bash
git push origin main
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
git add docs/bitacora.md
git commit -m "Registra el avance de la mision 2"
\`\`\`

- Haz un segundo cambio distinto, por ejemplo mejorar la \`Descripción\` del \`README.md\`, y confírmalo:

\`\`\`bash
git add README.md
git commit -m "Mejora la descripcion del README"
\`\`\`

- Revisa tu historial local antes de publicar:

\`\`\`bash
git log --oneline
\`\`\`

- Publica los dos commits:

\`\`\`bash
git push origin main
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
- Asegúrate de partir de un \`main\` actualizado:

\`\`\`bash
git checkout main
git pull origin main
\`\`\`

- Crea la rama y muévete a ella en un solo comando:

\`\`\`bash
git checkout -b feature/saludo
\`\`\`

- Comprueba en qué rama estás:

\`\`\`bash
git branch
\`\`\`

- Publica la rama en GitHub y enlázala con su rama remota:

\`\`\`bash
git push -u origin feature/saludo
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

\`main\` quedó exactamente igual que antes. Compruébalo: \`git show main:src/mensajes.js\` no tiene tu mensaje, pero \`git show feature/saludo:src/mensajes.js\` sí. Eso es el aislamiento que dan las ramas.`,
    body: `## Objetivo
Modificar el proyecto desde la rama \`feature/saludo\` y publicar el cambio.

## Pasos sugeridos
- Confirma que estás en la rama correcta:

\`\`\`bash
git branch --show-current
\`\`\`

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
git add src/mensajes.js
git commit -m "Agrega mensaje de saludo"
git push
\`\`\`

- Verifica que \`main\` no cambió:

\`\`\`bash
git log --oneline main -3
\`\`\`

## Criterio de cierre
El workflow cerrará este issue cuando la rama \`feature/saludo\` contenga el mensaje de saludo publicado. Fíjate en que \`main\` todavía no lo tiene: ese es el aislamiento que dan las ramas.`
  },
  {
    id: 5,
    title: "Fusionar feature/saludo en main con git merge",
    summary: "Integrarás el trabajo de tu rama en `main` usando un merge y lo publicarás.",
    why: "El merge une dos líneas de trabajo conservando ambos historiales. Con `--no-ff` queda un commit de fusión que documenta cuándo y qué se integró.",
    diagram: `El merge vuelve a unir las dos líneas en una sola.

**Antes**

\`\`\`text
  o---o---E            (main)
           \\
            S          (feature/saludo)
\`\`\`

**Después de \`git merge --no-ff feature/saludo\`**

\`\`\`text
  o---o---E-------M    (main)
           \\     /
            S---'      (feature/saludo)
                       ^ M = commit de fusión: tiene DOS padres, E y S
\`\`\`

Sin \`--no-ff\`, como \`main\` no avanzó, Git haría un *fast-forward*: movería el nombre \`main\` hasta \`S\` y el historial quedaría en línea recta, sin rastro de que existió una rama.`,
    body: `## Objetivo
Integrar \`feature/saludo\` dentro de \`main\`.

## Pasos sugeridos
- Cambia a la rama que recibirá los cambios:

\`\`\`bash
git checkout main
git pull origin main
\`\`\`

- Fusiona la rama de trabajo:

\`\`\`bash
git merge --no-ff feature/saludo -m "Merge feature/saludo en main"
\`\`\`

- Revisa cómo quedó el historial:

\`\`\`bash
git log --oneline --graph -10
\`\`\`

- Publica el resultado:

\`\`\`bash
git push origin main
\`\`\`

## Qué significa --no-ff
Si \`main\` no avanzó desde que creaste la rama, Git puede hacer un *fast-forward*: mueve el puntero y no deja rastro de que hubo una rama. Con \`--no-ff\` fuerzas un commit de fusión, que hace visible la integración en el historial.

## Criterio de cierre
El workflow cerrará este issue cuando \`main\` contenga los commits de \`feature/saludo\` y el mensaje de saludo esté publicado en \`main\`.`
  },
  {
    id: 6,
    title: "Crear la rama feature/despedida desde main actualizado",
    summary: "Crearás una segunda rama, esta vez partiendo del `main` que ya tiene el merge anterior.",
    why: "Cada rama nueva debe nacer de un `main` actualizado; si parte de un estado viejo, arrastras trabajo repetido y aumentas el riesgo de conflictos.",
    diagram: `Lo importante de esta misión es **desde dónde** nace la rama.

**Correcto** — partiendo del \`main\` que ya tiene el merge

\`\`\`text
  o---E-------M   (main, feature/despedida)
       \\     /
        S---'
\`\`\`

**Incorrecto** — partiendo de un \`main\` desactualizado (sin \`git pull\`)

\`\`\`text
  o---E-------M          (main)
       \\     /
        S---'
       \\
        (feature/despedida)   <- nace atrás: no tiene el saludo
\`\`\`

Por eso la validación revisa que tu rama nueva ya contenga el mensaje de saludo: es la prueba de que naciste del \`main\` actualizado.`,
    body: `## Objetivo
Crear y publicar la rama \`feature/despedida\` a partir del \`main\` actualizado.

## Pasos sugeridos
- Actualiza \`main\` antes de ramificar:

\`\`\`bash
git checkout main
git pull origin main
\`\`\`

- Crea y publica la rama:

\`\`\`bash
git checkout -b feature/despedida
git push -u origin feature/despedida
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
  o---E-------M   (main, feature/despedida)
       \\     /
        S---'
\`\`\`

**Después de tu commit y push**

\`\`\`text
  o---E-------M        (main)
       \\     / \\
        S---'   D      (feature/despedida)
                       ^ D = "Agrega mensaje de despedida"
\`\`\`

\`main\` sigue sin cambiar. Ya tienes dos integraciones distintas en el historial: una cerrada (el saludo) y una abierta (la despedida).`,
    body: `## Objetivo
Agregar un mensaje nuevo desde \`feature/despedida\`.

## Pasos sugeridos
- Confirma la rama actual:

\`\`\`bash
git branch --show-current
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
git add src/mensajes.js
git commit -m "Agrega mensaje de despedida"
git push
\`\`\`

## Criterio de cierre
El workflow cerrará este issue cuando la rama \`feature/despedida\` contenga el mensaje de despedida publicado.`
  },
  {
    id: 8,
    title: "Fusionar feature/despedida y borrar la rama ya integrada",
    summary: "Integrarás la segunda rama en `main` y limpiarás las ramas que ya cumplieron su función.",
    why: "Una rama fusionada deja de aportar información y ensucia el repositorio. Borrarla después del merge mantiene claro qué trabajo sigue vivo.",
    diagram: `Borrar una rama fusionada **no borra sus commits**: solo quita la etiqueta. Los commits ya viven dentro de \`main\`.

**Antes**

\`\`\`text
  o---E-------M        (main)
       \\     / \\
        S---'   D      (feature/despedida)
\`\`\`

**Después del merge y del borrado**

\`\`\`text
  o---E-------M-------N   (main)
       \\     /       /
        S---'   D---'
                    ^ N = segundo commit de fusión
\`\`\`

El nombre \`feature/saludo\` desapareció, pero el commit S sigue ahí, dentro de la historia de \`main\`. Compruébalo con \`git log --oneline --graph main\`.`,
    body: `## Objetivo
Fusionar \`feature/despedida\` en \`main\` y eliminar las ramas ya integradas.

## Pasos sugeridos
- Integra la rama:

\`\`\`bash
git checkout main
git pull origin main
git merge --no-ff feature/despedida -m "Merge feature/despedida en main"
git push origin main
\`\`\`

- Revisa qué ramas ya están fusionadas:

\`\`\`bash
git branch --merged main
\`\`\`

- Borra la rama local y la remota:

\`\`\`bash
git branch -d feature/saludo
git push origin --delete feature/saludo
\`\`\`

- Comprueba el resultado:

\`\`\`bash
git branch -a
npm start
\`\`\`

## Criterio de cierre
El workflow cerrará este issue cuando \`main\` contenga los dos mensajes integrados y la rama remota \`feature/saludo\` ya no exista.`
  },
  {
    id: 9,
    title: "Provocar y resolver un conflicto de merge",
    summary: "Cambiarás la misma línea en dos ramas distintas y resolverás el conflicto al fusionar.",
    why: "Un conflicto no es un error: es Git avisando que dos cambios tocan lo mismo y que la decisión es humana. Saber resolverlo evita perder trabajo.",
    diagram: `El conflicto aparece porque las dos líneas modifican **la misma línea del mismo archivo**.

**Paso 1 y 2** — las dos ramas cambian la misma línea

\`\`\`text
  ...---N---X   (main)              X = "...directamente en main"
         \\
          Y     (feature/conflicto) Y = "...en la rama feature/conflicto"
\`\`\`

**Paso 3** — Git no puede decidir y se detiene

\`\`\`text
  ...---N---X---???   (merge detenido: MERGING)
         \\     /
          Y---'
\`\`\`

**Paso 4** — tú decides y cierras el merge

\`\`\`text
  ...---N---X-------F   (main)
         \\         /
          Y-------'     F = commit de fusión con TU resolución
\`\`\`

Git te deja el archivo con las dos versiones marcadas; el commit F guarda la decisión que tomaste. Si te enredas, \`git merge --abort\` te devuelve al estado del paso 2.`,
    body: `## Objetivo
Crear un conflicto real entre \`main\` y \`feature/conflicto\`, y resolverlo conservando ambos cambios.

## Paso 1: crear la rama y cambiar una línea
\`\`\`bash
git checkout main
git pull origin main
git checkout -b feature/conflicto
\`\`\`

En \`src/mensajes.js\`, reemplaza la línea \`"Mensaje inicial de la plantilla"\` por:

\`\`\`javascript
"${MENSAJE_CONFLICTO_RAMA}",
\`\`\`

\`\`\`bash
git add src/mensajes.js
git commit -m "Cambia el mensaje inicial desde la rama"
git push -u origin feature/conflicto
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
git add src/mensajes.js
git commit -m "Cambia el mensaje inicial desde main"
git push origin main
\`\`\`

## Paso 3: fusionar y ver el conflicto
\`\`\`bash
git merge --no-ff feature/conflicto -m "Merge feature/conflicto en main"
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
git add src/mensajes.js
git commit --no-edit
git push origin main
\`\`\`

\`--no-edit\` acepta el mensaje de fusión que Git ya preparó. Si escribes solo \`git commit\`, se abrirá un editor de texto en la terminal: si es \`vim\`, se sale escribiendo \`:wq\` y Enter.

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
  o---o---C---D---E-------M-------N---X-------F---R   (main)
                   \\     /       /     \\     /
                    S---'   D2--'       Y---'
\`\`\`

| Marca | Qué es |
| --- | --- |
| C, D, E | Tus primeros commits directos en \`main\` (misiones 1 y 2) |
| S | Commit hecho dentro de \`feature/saludo\` |
| M | Merge de \`feature/saludo\` |
| D2 | Commit hecho dentro de \`feature/despedida\` |
| N | Merge de \`feature/despedida\` |
| X / Y | Cambios en conflicto, en \`main\` y en \`feature/conflicto\` |
| F | Merge con el conflicto resuelto por ti |
| R | Este commit: el README documentado |

Ejecuta \`git log --oneline --graph\` y compara: deberías reconocer cada bifurcación.`,
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
  - qué hace \`git merge\` y por qué usaste \`--no-ff\`;
  - cómo resolviste el conflicto.
- Publica el cambio:

\`\`\`bash
git add README.md
git commit -m "Documenta el flujo de ramas y merges"
git push origin main
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
