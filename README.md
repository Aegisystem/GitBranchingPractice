# Práctica de Git: commits, push, ramas y merges

Esta es una práctica guiada. GitHub te irá creando **misiones** como *issues*: cada una explica qué hacer, por qué, y revisa sola si lo lograste. Cuando cumples una, se cierra y aparece la siguiente.

No necesitas instalar nada: solo Git y un editor de texto.

---

## 1. Prepara tu repositorio

1. Pulsa **Use this template > Create a new repository** para crear tu propia copia.
2. Clónala en tu computador y entra a la carpeta:

```bash
git clone https://github.com/TU_USUARIO/NOMBRE_DE_TU_REPO.git
```

3. Si es la primera vez que usas Git en este equipo, configúralo:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@ejemplo.com"
git config --global push.autoSetupRemote true
```

La tercera línea permite que `git push`, a secas, publique también las ramas nuevas.

4. Entra a la pestaña **Issues** de tu repositorio: ahí te espera la Misión 01.

Si no aparece después de unos minutos, ve a **Actions > Iniciar práctica > Run workflow**.

---

## 2. Los comandos que vas a usar

Toda la práctica se hace con estos seis:

| Comando | Qué hace |
| --- | --- |
| `git add .` | Marca todos tus cambios para incluirlos en el próximo commit. |
| `git commit -m "Mensaje"` | Guarda los cambios marcados en el historial **de tu computador**. |
| `git push` | Publica en GitHub los commits de la rama en la que estás. |
| `git checkout -b ramaNueva` | Crea una rama y te cambia a ella. |
| `git checkout rama` | Te cambia a una rama que ya existe. |
| `git merge rama` | Trae a tu rama actual el trabajo de otra rama. |

No necesitas ninguno más. Estos otros solo **miran** el repositorio, no lo modifican, y puedes usarlos cuando quieras:

| Comando de consulta | Qué muestra |
| --- | --- |
| `git status` | En qué rama estás y qué cambios tienes sin guardar. |
| `git log --oneline --graph --all` | El historial dibujado, con sus ramas y merges. |
| `git branch` | La lista de ramas, con un asterisco en la actual. |

**Regla que evita el 90% de los problemas: antes de hacer cualquier cosa, ejecuta `git status`.**

---

## 3. Los dos archivos que vas a editar

| Archivo | Para qué |
| --- | --- |
| `bitacora.md` | Anotas tu avance (misiones 1 y 2) y explicas lo aprendido (misión 10). |
| `mensajes.txt` | Una lista de líneas. Cada rama le agrega una, y así se provoca el conflicto de la misión 9. |

Se editan con cualquier editor de texto. No hay nada que instalar ni ejecutar.

---

## 4. Las 10 misiones

| # | Misión | Qué practicas |
| --- | --- | --- |
| 1 | Tu primer commit en `main` | `git add .`, `git commit -m`, `git push` |
| 2 | Publicar varios commits | commits pequeños y con mensaje claro |
| 3 | Crear la rama `feature/saludo` | `git checkout -b` |
| 4 | Commit dentro de la rama | que `main` no se entere: aislamiento |
| 5 | Fusionar `feature/saludo` en `main` | `git merge` (fast-forward) |
| 6 | Crear `feature/despedida` desde `main` | volver a `main` antes de ramificar |
| 7 | Commit y push en la segunda rama | repetir el ciclo |
| 8 | Fusionar y moverte entre ramas | `git merge` y `git checkout rama` |
| 9 | Provocar y resolver un conflicto | merge con commit de fusión |
| 10 | Explicar el flujo en tu bitácora | contar lo que entendiste |

Cada issue trae los pasos, un diagrama de cómo cambia tu historial y el criterio exacto por el que se cierra. **Léelos: son la práctica.** Esta guía solo es el mapa.

---

## 5. Cómo se corrige sola

Cada vez que publicas algo con `git push`, o creas una rama, un proceso automático revisa tu repositorio y comenta en el issue de la misión:

- una checklist de lo que ya cumples y lo que falta;
- el dibujo real de tu historial;
- si aún no cumples, el diagrama de adónde tienes que llegar.

Si todo está bien, cierra el issue y crea la siguiente misión.

Algunos puntos aparecen marcados como *(informativo)*: son observaciones para que aprendas, no te bloquean.

**No cierres los issues a mano.** Un workflow los reabre: el cierre lo da la validación.

¿Atascado? Ve a **Actions > Validar progreso de misiones > Run workflow** para forzar una revisión.

---

## 6. Copia los textos exactos

Las misiones 4, 7 y 9 piden agregar líneas concretas a `mensajes.txt`. La revisión automática busca ese texto literal, así que cópialo tal cual, con sus mayúsculas y acentos:

```text
Saludo desde la rama feature/saludo
Despedida desde la rama feature/despedida
Mensaje escrito en la rama feature/conflicto
Mensaje escrito directamente en main
```

---

## 7. Resolver un conflicto, en corto

Cuando dos ramas cambian la misma línea, Git no decide por ti y deja el archivo así:

```text
<<<<<<< HEAD
Lo que dice la rama en la que estás parado
=======
Lo que dice la rama que estás fusionando
>>>>>>> feature/conflicto
```

Para resolverlo:

1. Abre el archivo y decide qué debe quedar. En la misión 9: **las dos líneas**.
2. Borra las tres líneas de marcas: `<<<<<<<`, `=======` y `>>>>>>>`.
3. Guarda y cierra el merge con el ciclo de siempre:

```bash
git add .
git commit -m "Resuelve el conflicto conservando ambos mensajes"
git push
```

Si prefieres empezar el merge de cero, `git merge --abort` lo cancela y te deja como antes de intentarlo.

---

## 8. Errores frecuentes

| Lo que dice Git | Qué significa | Qué hacer |
| --- | --- | --- |
| `has no upstream branch` | Estás publicando una rama nueva y falta la configuración del paso 1. | `git config --global push.autoSetupRemote true` y repite `git push`. |
| `fatal: not a git repository` | No estás dentro de la carpeta del repositorio. | Entra a la carpeta que clonaste. |
| `Please tell me who you are` | Falta configurar tu identidad. | Ejecuta los `git config --global` del paso 1. |
| `nothing to commit, working tree clean` | No hay cambios que guardar. | Edita **y guarda** el archivo antes de `git add .`. |
| `Your local changes would be overwritten` | Quieres cambiar de rama con cambios sin guardar. | Haz `git add .` y `git commit -m "..."` antes del `git checkout`. |
| `CONFLICT (content): Merge conflict in ...` | Dos ramas cambiaron la misma línea. | Resuélvelo como se explica arriba. |
| `Already up to date` | Esa rama ya estaba integrada. | Nada que hacer: mira `git log --oneline --graph --all`. |

---

## 9. Sobre usar IA

Puedes apoyarte en un asistente de IA para **entender** conceptos y mensajes de error, no para que haga la práctica por ti. Lo que se evalúa es que ejecutes tú los comandos y sepas explicar qué hace cada uno. Pídele que te explique, no que te resuelva.
