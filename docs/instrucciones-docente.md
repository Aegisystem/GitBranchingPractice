# Instrucciones para docentes

## Qué cubre esta práctica

Es la versión introductoria de la práctica de Git Flow. Cubre solo cuatro operaciones: **commit, push, creación de ramas y merge** (incluida la resolución de un conflicto). No incluye Pull Requests, releases, tags, `stash` ni hotfixes.

Sirve como paso previo a `GitFlowPractice`, o como práctica autónoma para un primer curso.

## Usar este repo como plantilla

1. Sube estos archivos a un repositorio de GitHub.
2. En **Settings > General**, activa **Template repository**.
3. Mantén GitHub Actions habilitado y permite issues.
4. En **Settings > Actions > General**, asegúrate de que el `GITHUB_TOKEN` tenga permisos de lectura y escritura.

No se requieren secretos externos ni dependencias de npm: los scripts usan solo Node.js 20 y la API de GitHub con el `GITHUB_TOKEN` que Actions genera en cada ejecución.

## El proyecto base

`src/app.js` imprime la lista de `src/mensajes.js`. Es intencionalmente mínimo: lo importante no es el código, sino que cada misión agregue una línea a un mismo archivo. Eso permite que la misión 9 genere un conflicto real y verificable, en lugar de simulado.

`docs/bitacora.md` sirve para los primeros commits, cuando el estudiante todavía no debe tocar código.

## La secuencia de misiones

| # | Misión | Criterio automático |
| --- | --- | --- |
| 1 | Primer commit en `main` | `docs/bitacora.md` en `main` tiene una línea real, sin el texto de ejemplo |
| 2 | Publicar varios commits | ≥ 2 commits nuevos en `main` desde que se creó la misión, con mensajes descriptivos |
| 3 | Crear `feature/saludo` | La rama existe en el remoto |
| 4 | Commits en la rama | `src/mensajes.js` de la rama contiene el mensaje de saludo |
| 5 | Merge de `feature/saludo` | Los commits están en `main` y el mensaje aparece allí |
| 6 | Crear `feature/despedida` | La rama existe y ya incluye el saludo (nació de `main` actualizado) |
| 7 | Commit en la segunda rama | La rama contiene el mensaje de despedida |
| 8 | Merge y limpieza | `main` tiene ambos mensajes y `origin/feature/saludo` ya no existe |
| 9 | Conflicto resuelto | `main` conserva los dos mensajes del conflicto y no quedan marcas `<<<<<<<` |
| 10 | README documentado | Estructura obligatoria + explicación de commit, push, ramas, merge y conflicto |

La misión 5 comprueba el uso de `--no-ff` como criterio **informativo**, no bloqueante: si el estudiante hace un fast-forward, la checklist se lo explica pero no lo deja atascado.

## Interpretar los workflows

- **Iniciar práctica**: `workflow_dispatch` y `push` a `main`. Crea la primera misión sin duplicarla si ya existe.
- **Validar progreso de misiones**: escucha `create`, `delete`, `push` a cualquier rama y ejecución manual. En cada ejecución revisa **todas las misiones abiertas**, no solo la que corresponde al evento: como los criterios miran el estado publicado del repositorio y no el evento que los disparó, un estudiante que cree la rama, haga commit y publique todo en un mismo push no se queda atascado. Al cerrar una misión crea la siguiente en el mismo job y la evalúa en cadena, por si el trabajo ya estaba adelantado.
- **Proteger cierre de misiones**: reabre issues cerrados manualmente y vuelve a cerrar los que ya tenían validación completada.
- **Validar README**: falla si faltan las secciones obligatorias.
- **Validar ramas y merges**: revisa evidencia de las tres ramas, commits de fusión, ausencia de marcas de conflicto y presencia de los mensajes esperados. En `push` corre en modo progresivo; en ejecución manual puedes elegir modo final.

Cuando un workflow cierra un issue con `GITHUB_TOKEN`, GitHub no dispara otro workflow por ese cierre. Por eso **Validar progreso de misiones** cierra la misión y crea la siguiente dentro del mismo job.

## Revisar el avance de un estudiante

Revisa en su repositorio:

- Issues creados y cerrados en orden, con los comentarios del workflow.
- Historial de `main`: `git log --oneline --graph --all`.
- Presencia de commits de fusión (evidencia de merges reales, no de ediciones directas).
- Que `feature/saludo` haya sido borrada y `feature/despedida` / `feature/conflicto` sigan visibles o registradas en el historial.
- Que `src/mensajes.js` en `main` tenga los cuatro mensajes y ninguna marca de conflicto.
- README final con estructura y explicación propia.

Ejecución manual de la validación final:

**Actions > Validar ramas y merges > Run workflow > modo: final**

Si un estudiante queda atascado, la vía normal es **Actions > Validar progreso de misiones > Run workflow**: revisa todas las misiones abiertas y avanza si el repositorio ya cumple. Como último recurso, `npm run create:next-issue` crea manualmente la misión siguiente a una dada:

```bash
CLOSED_MISSION=4 GITHUB_REPOSITORY=usuario/repo GITHUB_TOKEN=token npm run create:next-issue
```

## Modificar la práctica

La secuencia está en `scripts/practice-missions.js`:

1. Edita el arreglo `missions` conservando identificadores consecutivos.
2. Mantén objetivo, pasos y criterio de cierre en cada cuerpo.
3. Ajusta la validación correspondiente en `scripts/validate-progress.js` (`evaluateMission`) y el mapeo de eventos en `targetMissionIds`.
4. Si cambias los textos exactos de los mensajes, hazlo en las constantes `MENSAJE_*` de `scripts/practice-missions.js`: los cuerpos de los issues y las validaciones los toman de ahí. Recuerda actualizar también `scripts/validate-branching.js`.
5. Revisa la sintaxis antes de publicar:

```bash
node --check scripts/practice-missions.js
node --check scripts/validate-progress.js
node --check scripts/validate-branching.js
```

## Uso de IA por parte de los estudiantes

El repositorio incluye instrucciones para asistentes de IA en `docs/prompt-para-ia.md`, con copias de enganche en `AGENTS.md`, `CLAUDE.md` y `.github/copilot-instructions.md`. Esos archivos hacen que el asistente responda como tutor: explica conceptos, interpreta errores y da pistas, pero no ejecuta los commits, ramas ni merges por el estudiante.

Ten en cuenta el alcance real: son instrucciones que el asistente lee y normalmente respeta, no un bloqueo técnico. Un estudiante decidido puede ignorarlas. Por eso conviene complementarlas con evidencia del proceso: el historial de commits (fechas y tamaño de cada commit), los comentarios de los workflows y, si tu curso lo permite, una defensa oral breve sobre lo que hizo.

## Recomendación de evaluación

- 25% commits publicados con mensajes claros (misiones 1 y 2).
- 25% creación y uso correcto de ramas (misiones 3, 4, 6 y 7).
- 25% merges correctos y limpieza de ramas (misiones 5 y 8).
- 15% resolución del conflicto (misión 9).
- 10% README y explicación del flujo (misión 10).
