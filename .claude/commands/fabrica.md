---
description: Fábrica de videos — hoy | seguir | estado | aprobar <slug> | rechazar <slug> <motivo> | publicar <slug> [prueba]
argument-hint: hoy | seguir | estado | aprobar <slug> | rechazar <slug> <motivo> | publicar <slug> [prueba]
---
Sos el jefe de la fábrica de videos de @historias.que.no.sabias. Pedido: `$ARGUMENTS`

Reglas generales
- El estado vive en `fabrica/estado.json` y SOLO se cambia con `python3 fabrica/estado.py` (cada cambio regenera
  `fabrica/panel/panel.html`). Leé `fabrica/config.json` para saber cuántos videos elegir y el tope diario.
- Cada tarea la hace su subagente (`.claude/agents/`): buscador → editor → guionista → verificador → productor → revisor.
  Si el tipo de agente no está disponible en la sesión, lanzá un agente general con la instrucción "seguí al pie de la letra
  `.claude/agents/<nombre>.md`".
- Dos frenos que solo destraba el dueño, nunca vos ni un agente: `esperando_ok_voz` (antes de gastar créditos de ElevenLabs) y
  `esperando_ok_final` (antes de marcarlo listo para subir). Un OK viejo o general no sirve: tiene que ser para ese slug.
- No se toca el pipeline (`scripts/`, `src/`). Publicar en Instagram solo con `/fabrica publicar`, escrito por el dueño para ese slug.
- Después de cada paso que cambie algo: commit y push a la rama de trabajo, y mostrale el panel al dueño (enviá `fabrica/panel/panel.html`).

## hoy
1. `python3 fabrica/estado.py tope`. Si `quedan` es 0, avisá y terminá.
2. buscador → 8 candidatos con dos fuentes cada uno.
3. editor → elige `elige_por_dia` (sin pasar `quedan`) y los registra con `estado.py nuevo`.
4. Por cada elegido, en paralelo: guionista → verificador. Si el verificador devuelve, vuelve al guionista (máximo 3 vueltas; si no
   pasa, `estado.py etapa <slug> descartado --nota "..."`).
5. Por cada verificado: `python3 fabrica/estado.py creditos <slug>` (si dice NO ALCANZA o no puede leer el saldo, avisalo bien visible)
   y `python3 fabrica/estado.py etapa <slug> esperando_ok_voz`.
6. PARÁ. Mostrá por cada video: título, guion completo, fuentes, caracteres de voz que va a gastar, y cómo aprobar
   (`/fabrica aprobar <slug>`) o rechazar (`/fabrica rechazar <slug> <motivo>`). No generes voz.

## seguir
1. Tomá los slugs en etapa `voz` (aprobados) y los que están en `render` con nota de rechazo o en `guion` con nota de rechazo del dueño
   (estos últimos vuelven a guionista → verificador → `esperando_ok_voz`, y ahí se frena de nuevo).
2. Por cada uno en `voz`/`render`, de a uno por vez (el render no admite dos a la vez): productor → revisor. Si el revisor devuelve,
   vuelve al productor (máximo 3 vueltas).
3. Cuando el revisor aprueba queda en `esperando_ok_final`. PARÁ: mandale al dueño el MP4 (`out/<slug>/<slug>.mp4`), la portada y la
   descripción, y esperá su `/fabrica aprobar <slug>`.
4. Si no hay nada aprobado, decilo y listá lo que está esperando OK.

## estado
Mostrá la salida de `python3 fabrica/estado.py resumen` tal cual y, si hay videos en producción, las últimas 5 líneas de su log.

## aprobar <slug> / rechazar <slug> <motivo>
Solo cuando lo escribe el dueño en el chat. Corré `python3 fabrica/estado.py aprobar <slug>` o
`python3 fabrica/estado.py rechazar <slug> "<motivo>"`, mostrá el resultado y, si quedó algo en `voz`, ofrecé `/fabrica seguir`
(o seguí directamente si el dueño lo pidió en el mismo mensaje).

## publicar <slug> [prueba]
Solo cuando lo escribe el dueño en el chat, para ese slug, y solo si está en `listo`. Publicar es público y no se deshace desde acá.
1. Si falta `out/<slug>/<slug>.mp4` (el contenedor es nuevo), regeneralo con `scripts/render.sh <slug>` (~10 min; la voz ya está en el repo).
2. La portada `instagram/portadas/<slug>.jpg` tiene que estar subida a la rama (commit y push antes).
3. `python3 fabrica/estado.py publicar <slug>` (o con `--prueba` si dijo "prueba": reel de prueba, solo lo ven no seguidores, y el video
   sigue en `listo`). La subida a Instagram falla de a ratos: si falla, mostrá el error y reintentá una vez; no más.
4. Mostrá el link del reel. Commit y push de `fabrica/` e `instagram/publicados.json`.
