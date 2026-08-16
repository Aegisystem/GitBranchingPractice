# Nombre del Proyecto

Git Branching Practice

## Descripción

Repositorio plantilla para una práctica guiada de Git centrada en cuatro operaciones: **commits, push, creación de ramas y merge** (incluida la resolución de un conflicto).

La práctica crea issues progresivos en GitHub. Cada issue explica una misión, y un workflow revisa el repositorio, comenta qué falta, cierra la misión cuando se cumple el criterio y crea la siguiente.

Es la versión introductoria de la práctica de Git Flow: aquí no hay Pull Requests, releases, tags ni hotfixes. Todo se resuelve con seis comandos: `git add .`, `git commit -m`, `git push`, `git checkout -b`, `git checkout` y `git merge`.

El proyecto base es un programa mínimo en Node.js que imprime una lista de mensajes. Cada misión agrega una línea a esa lista, y eso permite provocar un conflicto de merge real.

## Instalación

Necesitas Node.js 20 o superior. El proyecto no tiene dependencias externas, así que no hace falta `npm install`.

Para usarlo como estudiante:

1. Crea un repositorio desde este template (**Use this template**) o haz fork.
2. Clónalo en tu equipo.
3. Entra a la pestaña **Actions** y espera que se ejecute **Iniciar práctica**, o ejecútalo manualmente si el primer issue no aparece.

## Uso

Ejecuta el proyecto:

```bash
npm start
```

Salida esperada al inicio de la práctica:

```text
Práctica de ramas y merges en Git
---------------------------------
1. Mensaje inicial de la plantilla
---------------------------------
Total de mensajes: 1
```

A medida que completes las misiones, la lista crece con los mensajes que agregues desde cada rama.

Validaciones locales:

```bash
npm run validate:readme
BRANCHING_STRICT_FINAL=false npm run validate:branching
```

## Autores

- Plantilla para estudiantes de Ingeniería de Software.
- Docente responsable: ajustar según el curso.

## Flujo de trabajo Git

La práctica usa un flujo mínimo de dos niveles:

- `main`: rama estable donde se integra todo.
- `feature/saludo`: primera rama de trabajo, se fusiona con un merge fast-forward.
- `feature/despedida`: segunda rama, creada desde un `main` ya actualizado.
- `feature/conflicto`: rama que cambia la misma línea que `main` para provocar y resolver un conflicto.

Secuencia de las 10 misiones:

1. Hacer el primer commit en `main` y publicarlo.
2. Publicar varios commits pequeños con `git push`.
3. Crear y publicar `feature/saludo`.
4. Hacer commits dentro de la rama, sin tocar `main`.
5. Fusionar `feature/saludo` en `main` con `git merge`.
6. Crear `feature/despedida` desde un `main` actualizado.
7. Hacer commit y push en la segunda rama.
8. Fusionar la segunda rama y moverse entre ramas con `git checkout`.
9. Provocar un conflicto y resolverlo conservando ambos cambios.
10. Documentar el flujo en el README.

Los issues de misión no se cierran manualmente: el workflow **Validar progreso de misiones** los cierra al detectar que el criterio se cumplió, y **Proteger cierre de misiones** reabre los que se cierren desde la interfaz de GitHub.

## Documentación

- [Instrucciones para estudiantes](docs/instrucciones-estudiante.md)
- [Instrucciones para docentes](docs/instrucciones-docente.md)
