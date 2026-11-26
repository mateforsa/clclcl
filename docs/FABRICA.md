# La fábrica

Una capa de organización encima del pipeline de video. No cambia `scripts/` ni `src/`: decide qué video se hace, quién
hace cada paso y cuándo hay que esperar tu OK.

## Comandos (en el chat de Claude Code)

| Comando | Qué hace | Dónde se frena |
|---|---|---|
| `/fabrica hoy` | Busca noticias y efemérides del día, elige las mejores, escribe los guiones y los verifica | Antes de generar la voz |
| `/fabrica aprobar <slug>` | Destraba el freno en el que esté ese video | — |
| `/fabrica rechazar <slug> <motivo>` | Lo devuelve al agente anterior con tu motivo | — |
| `/fabrica seguir` | Produce lo aprobado: voz, planos, render, portada, revisión | Antes de marcarlo listo para subir |
| `/fabrica publicar <slug>` | Sube a Instagram un video que ya está en `listo` (con `prueba` al final, como reel de prueba) | — |
| `/fabrica estado` | Resumen en texto | — |

## Los seis agentes (`.claude/agents/`)

| Agente | Entra | Sale |
|---|---|---|
| buscador | la fecha de hoy | 8 candidatos, cada uno con 2 fuentes enlazadas |
| editor | los 8 candidatos | puntaje (sorpresa, vigencia, compartible, mostrable en 3D) y los elegidos en la cola |
| guionista | un slug en `idea` | `guion.md` + `parrafos.json`, 45–70 s |
| verificador | un slug en `guion` | cada dato con su enlace, o el guion de vuelta al guionista |
| productor | un slug en `voz` | MP4 + portada |
| revisor | un slug en `revision` | aprobado, o de vuelta al productor con el motivo |

## Etapas

`idea → guion → verificado → esperando_ok_voz → voz → render → revision → esperando_ok_final → listo → publicado`

- **Freno 1, `esperando_ok_voz`**: nada gasta créditos de ElevenLabs sin tu OK para ese video.
- **Freno 2, `esperando_ok_final`**: nada queda como "listo para subir" sin que lo hayas visto.
- Los frenos están en `fabrica/estado.py`: pasar a `voz` o a `listo` solo funciona con `aprobar`. Un agente que lo intente recibe un error.
- Rechazar en el freno 1 devuelve el video a `guion`; en el freno 2, a `render`. El motivo queda en la nota y en el log.

## Archivos

- `fabrica/config.json`: cuántos videos elige por día (`videos_por_dia`), tope diario (`tope_por_dia`), temas, y los créditos
  de ElevenLabs que te quedan (`creditos_elevenlabs_disponibles`). La clave guardada no tiene permiso para leer el saldo: si
  lo anotás ahí, la fábrica avisa cuando no alcanza; si queda en `null`, avisa que no lo puede saber y muestra cuántos
  caracteres va a gastar cada guion.
- `fabrica/estado.json`: la cola. Se modifica solo con `python3 fabrica/estado.py ...`.
- `fabrica/log/<slug>.log`: qué hizo cada agente con ese video, con hora.
- `fabrica/candidatos/<fecha>.md`: los 8 candidatos del día con sus puntajes.
- `fabrica/panel/panel.html`: el panel. Se regenera en cada cambio de estado (no está en git: `python3 fabrica/estado.py panel`).

## El panel

- **En claude.ai (recomendado)**: https://claude.ai/artifact/Q3ngPaTnysyghY75V3zgFZ — es privado, solo lo ve el dueño de la cuenta.
  Los botones Aprobar, Rechazar y Publicar le mandan la orden a la sesión de Claude de la fábrica, que la ejecuta y vuelve a
  publicar el panel con el estado nuevo. La primera vez pide permiso para que el panel le escriba a Claude. Publicar pide dos
  toques. Si la sesión de la fábrica no está disponible, el botón copia el comando para pegarlo en el chat.
- **En tu compu**: `python3 fabrica/servidor.py` y abrí `http://localhost:8787`. Se actualiza solo cada 5 segundos y los
  botones aprueban, rechazan y publican sin pasar por Claude.
- **Como archivo** (`fabrica/panel/panel.html`): los botones copian el comando.

El avance del render es una estimación por tiempo (unos 10 minutos por minuto de video): `render.sh` no informa progreso
y no se modifica.

## Dónde quedan los MP4

`out/` no está en git y el contenedor de la nube se borra cuando la sesión queda inactiva. Lo que persiste en el repo es
todo lo necesario para rehacer el video (`videos/<slug>/` con la voz ya generada, así que no se vuelven a gastar créditos)
y la portada (`instagram/portadas/`). Para recuperar un MP4: `scripts/render.sh <slug>` (unos 10 minutos).

Por eso el freno final importa: cuando un video llega a `esperando_ok_final`, Claude te manda el MP4 al chat. Bajalo o
publicalo en esa misma sesión.

## Programar `/fabrica hoy` a la madrugada

Una tarea programada de Claude Code en la nube que cada día abre una sesión nueva en este repo y corre `/fabrica hoy`.
Se frena sola en `esperando_ok_voz`: a la mañana encontrás los guiones verificados y aprobás desde el celular. No gasta
créditos de voz ni publica nada sin vos.
