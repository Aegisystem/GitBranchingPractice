# Instrucciones para estudiantes

## Qué vas a practicar

Esta práctica cubre cuatro operaciones básicas de Git, en este orden:

1. **Commit**: guardar un cambio en el historial local.
2. **Push**: publicar ese historial en GitHub.
3. **Ramas**: abrir una línea de trabajo paralela sin tocar `main`.
4. **Merge**: integrar esa línea de vuelta en `main`, incluso cuando hay conflictos.

No se usan Pull Requests, releases ni tags: eso pertenece a la práctica de Git Flow.

## Conceptos mínimos

| Comando | Qué hace |
| --- | --- |
| `git status` | Muestra en qué rama estás y qué cambios tienes sin guardar. |
| `git add <archivo>` | Marca un cambio para incluirlo en el próximo commit. |
| `git commit -m "mensaje"` | Guarda los cambios marcados en el historial **local**. |
| `git push origin <rama>` | Publica los commits locales en GitHub. |
| `git checkout -b <rama>` | Crea una rama y se cambia a ella. |
| `git branch --show-current` | Dice en qué rama estás parado. |
| `git merge --no-ff <rama>` | Integra otra rama en la rama actual dejando un commit de fusión. |
| `git log --oneline --graph` | Dibuja el historial y deja ver las ramas y los merges. |

Regla que evita el 90% de los problemas: **antes de hacer cualquier cosa, ejecuta `git status` y `git branch --show-current`.**

## Preparar el repositorio

1. Crea tu repositorio desde el template (botón **Use this template**) o haz **Fork**.
2. Clónalo:

```bash
git clone https://github.com/TU_USUARIO/NOMBRE_DEL_REPO.git
cd NOMBRE_DEL_REPO
git status
```

3. Configura tu identidad si es la primera vez que usas Git en este equipo:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@ejemplo.com"
```

4. Ejecuta el proyecto para ver qué imprime:

```bash
npm start
```

El proyecto no tiene dependencias externas: solo necesitas Node.js 20 o superior.

## Iniciar la práctica

Al crear el repositorio desde el template, el push inicial en `main` dispara el workflow **Iniciar práctica**, que crea la primera misión como issue.

Si el issue no aparece después de unos minutos:

1. Entra a la pestaña **Actions**.
2. Selecciona **Iniciar práctica**.
3. Haz clic en **Run workflow**.
4. Revisa la pestaña **Issues**.

## Cómo funciona el avance

Cada misión es un issue con objetivo, pasos sugeridos y criterio de cierre.

Cuando publicas cambios (push, creación o borrado de ramas), el workflow **Validar progreso de misiones** revisa el criterio y comenta el issue con:

- qué estás practicando;
- por qué importa;
- una checklist con lo que ya cumples y lo que falta.

Si todo cumple, cierra el issue y crea la siguiente misión automáticamente.

Algunos puntos de la checklist aparecen marcados como _(informativo)_: son observaciones para que aprendas, no bloquean el cierre.

**No cierres los issues manualmente.** El workflow **Proteger cierre de misiones** los reabre y te recuerda que el cierre lo hace la validación.

Si te quedas atascado en una misión, puedes forzar una revisión desde **Actions > Validar progreso de misiones > Run workflow**.

## Las 10 misiones

| # | Misión | Practica |
| --- | --- | --- |
| 1 | Primer commit en `main` | `add`, `commit`, `push` |
| 2 | Publicar varios commits | commits pequeños y descriptivos |
| 3 | Crear y publicar `feature/saludo` | `checkout -b`, `push -u` |
| 4 | Commits dentro de la rama | aislamiento del trabajo |
| 5 | Fusionar `feature/saludo` en `main` | `merge --no-ff` |
| 6 | Crear `feature/despedida` desde `main` actualizado | `pull` antes de ramificar |
| 7 | Commit y push en la segunda rama | repetición del ciclo |
| 8 | Fusionar y borrar la rama integrada | `branch -d`, `push origin --delete` |
| 9 | Provocar y resolver un conflicto | resolución de conflictos |
| 10 | Documentar el flujo en el README | comunicación técnica |

## Los mensajes exactos importan

Las misiones 4, 7 y 9 piden agregar textos exactos en `src/mensajes.js`. La validación automática busca esos textos literales, así que cópialos tal cual, respetando mayúsculas y acentos:

```text
Saludo desde la rama feature/saludo
Despedida desde la rama feature/despedida
Mensaje escrito en la rama feature/conflicto
Mensaje escrito directamente en main
```

## Resolver un conflicto, en corto

Cuando Git no puede decidir qué versión conservar, deja el archivo así:

```text
<<<<<<< HEAD
  "Versión que está en la rama donde estás parado",
=======
  "Versión que viene de la rama que fusionas",
>>>>>>> feature/conflicto
```

Para resolverlo:

1. Abre el archivo y decide qué debe quedar (en la misión 9: ambas líneas).
2. Borra las tres líneas de marcas: `<<<<<<<`, `=======` y `>>>>>>>`.
3. Comprueba que el proyecto sigue funcionando: `npm start`.
4. Cierra el merge:

```bash
git add src/mensajes.js
git commit
git push origin main
```

Si te enredas y quieres empezar el merge de nuevo:

```bash
git merge --abort
```

## Validar localmente antes de publicar

```bash
npm run validate:readme
npm run validate:branching
```

En local, ejecuta la validación de ramas en modo progresivo para que no te marque como error lo que todavía no has hecho:

```bash
BRANCHING_STRICT_FINAL=false npm run validate:branching
```

## Errores frecuentes

| Mensaje de Git | Qué significa | Qué hacer |
| --- | --- | --- |
| `Updates were rejected because the remote contains work...` | El remoto tiene commits que tú no tienes. | `git pull origin main` y vuelve a hacer push. |
| `fatal: not a git repository` | No estás dentro de la carpeta del repositorio. | `cd` a la carpeta clonada. |
| `Please tell me who you are` | Falta configurar tu identidad. | Ejecuta los `git config --global` de arriba. |
| `error: Your local changes would be overwritten` | Tienes cambios sin guardar y quieres cambiar de rama. | Haz commit de lo que sirve o descártalo. |
| `CONFLICT (content): Merge conflict in ...` | Dos ramas cambiaron la misma línea. | Resuelve el conflicto como se explica arriba. |
| `error: The branch 'x' is not fully merged` | Intentas borrar una rama sin fusionar. | Fusiónala primero, o usa `-D` si de verdad quieres descartarla. |

## Sobre usar IA en esta práctica

Puedes apoyarte en un asistente de IA para **entender** conceptos y errores, no para que haga la práctica por ti. El repositorio incluye un prompt en [`prompt-para-ia.md`](prompt-para-ia.md) que le indica al asistente comportarse como tutor: te explicará y te dará pistas, pero no ejecutará los commits, ramas ni merges en tu lugar.
