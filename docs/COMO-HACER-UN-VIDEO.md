# Cómo hacer un video 3D low-poly en este repo

Formato: documental vertical 1080x1920, 30 fps, 2:00-2:40, look neón. Una voz cuenta una historia real
y CADA frase se ilustra con un diorama 3D de primitivas, cámara siempre en movimiento, subtítulos palabra
por palabra. Ejemplo completo y aprobado: `videos/gta-vi/` (leé `parrafos.json`, `beats.ts` y `guion.md`).

Cada video vive en `videos/<slug>/`. NO se toca `src/` ni `scripts/` (son compartidos y otros videos se
están haciendo al mismo tiempo). Si falta un objeto 3D, se crea en `videos/<slug>/props.tsx` (ver abajo).

## Antes de elegir temas

Cuando se piden videos sin tema, se buscan primero las tendencias de ESE día (WebSearch, modo extendido, con la
fecha en la consulta) y los temas salen de ahí: no se reutilizan listas de días anteriores. Mirar también las
estadísticas que haya pasado el dueño del canal: al 25/11/2026 el reel que mejor rindió fue el de economía
argentina (recesión técnica): 77 envíos con 917 espectadores, 39 s de reproducción promedio y 0 comentarios.

## Después del render: Instagram por API

Radar de referencias, publicación y métricas: ver `docs/INSTAGRAM-API.md`. Lo mínimo:

```
python3 scripts/publicar.py <slug> --simular   # valida MP4, portada y descripción; no publica
python3 scripts/publicar.py <slug>             # publica, previo OK escrito
python3 scripts/radar.py                       # qué les reventó a las cuentas de referencia
python3 scripts/metricas.py                    # métricas propias a las 48 h y a los 7 días
```

`publicar.py` exige que `guion.md` tenga el bloque "## Descripción de Instagram" con cinco etiquetas y que la
portada esté en `instagram/portadas/<slug>.jpg` y subida al remoto.

## Archivos de un video

```
videos/<slug>/parrafos.json   guion: lista de párrafos, cada uno una lista de frases (1 frase = 1 plano)
videos/<slug>/beats.ts        storyboard: export const BEATS: BeatSpec[]  (ids b01, b02... en orden)
videos/<slug>/entry.ts        copiar el de gta-vi (si hay props propios: makeRoot(timing, BEATS, EXTRA))
videos/<slug>/guion.md        guion final con tiempos, hoja de datos con fuentes, 3 títulos/descripciones
videos/<slug>/timing.json, events.json, public/voz.wav, public/mix.wav   generados por los scripts
```

## Pasos (en este orden)

1. **Datos.** Verificar cada fecha, cifra y nombre con WebSearch en fuentes serias (Reuters, Bloomberg,
   CNBC, la empresa). Lo que no se puede confirmar no entra. Sin citas textuales inventadas. Si un dato
   viene solo de la empresa o es una estimación, el guion lo dice ("según X").
2. **Guion** (`parrafos.json`), reglas más abajo.
3. **Voz:** `python3 scripts/voice.py <slug>` (ElevenLabs, voz Juanma, una sola toma; la key la inyecta el
   proxy, no hace falta variable). Escribe `timing.json` con la duración real de cada plano.
4. **Storyboard** (`beats.ts`) usando los tiempos reales de `timing.json`.
5. **Stills:** `scripts/stills.sh <slug>` -> `out/<slug>/sheet0.jpg, sheet1.jpg...` (12 planos por hoja,
   a 85% de cada plano). ABRIR las hojas con Read y mirarlas. Corregir y repetir hasta que ningún plano falle.
   `scripts/stills.sh <slug> 5 9 0.4` renderiza solo los planos 5 a 9 al 40% del plano.
6. **Audio:** `npx tsx scripts/events.ts <slug> && python3 scripts/audio.py <slug>` (SFX sincronizados + música).
   Hay que volver a correrlo cada vez que cambian los `at` de beats.ts o la voz.
7. **Render:** `scripts/render.sh <slug>` -> `out/<slug>/<slug>.mp4` + hojas `out/<slug>/qc0.jpg...` (1 cuadro
   por segundo). Tarda ~25 min y hay un lock: si otro video está renderizando, espera su turno (correrlo con
   run_in_background y timeout largo). Mirar las hojas qc: no puede haber cuadros rotos ni planos vacíos.
8. **Portada:** crear `videos/<slug>/cover.json` y correr `scripts/cover.sh <slug>` -> `out/<slug>/portada.png`
   (tarda menos de un minuto). Abrirla con Read y corregir hasta que ningún texto se corte. Formato:
   ```json
   { "beat": "b03", "frac": 0.92,
     "overlay": { "kicker": "NVIDIA",
       "lines": [ { "t": "EL CEO SE FUE" }, { "t": "Y VOLVIÓ", "c": "yellow" }, { "t": "+US$ 952.000 M EN UN DÍA", "size": 72, "c": "cyan" } ] } }
   ```
   `beat` + `frac` eligen el cuadro 3D de fondo (el plano se muestra sin subtítulos ni carteles): elegir uno con
   un sujeto grande y claro en la mitad superior. `kicker` = etiqueta roja corta con el tema. `lines` = 2 o 3
   líneas: título gigante en mayúsculas (blanco por defecto; `c`: yellow | red | cyan) y una línea chica de dato.
   Tamaño por defecto 150: entran ~11 caracteres por línea; para líneas más largas bajar `size` (13 caracteres ≈ 128,
   24 caracteres ≈ 72). La cifra más fuerte va en amarillo. El título tiene que ser verdad según el video: nada
   que el propio guion desmienta. Ejemplos aprobados: `videos/*/cover.json`.
9. Escribir `guion.md`, que además del guion y las fuentes lleva una sección `## Descripción de Instagram` con el
   texto listo para copiar, en el formato de `instagram/descripciones.md`: gancho en la primera línea, tres datos
   del video, "Seguime para la próxima historia." y cinco etiquetas.

## Reglas del guion

- Español rioplatense (voseo). 330-400 palabras = 2:15-2:40. 28-36 frases.
- **Inicio: rotar.** Leer `instagram/hooks_used.json` y elegir de `instagram/playbook.md` (sección 1) un tipo de
  inicio distinto al de los dos videos anteriores. "Sos [X]" (segunda persona) se usa como máximo en 1 de cada 6
  videos; el resto del guion puede seguir en segunda persona si hay protagonista. Al terminar, agregar el video
  a `hooks_used.json` con el inicio y el cierre usados.
- **Cierre: no usar siempre "Seguime para la próxima historia".** Elegir un cierre con motivo concreto de las
  secciones 3 o 4 del playbook (continuación, pregunta de dos opciones, palabra clave), uno solo por video.
- Duración objetivo para alcance: 45 a 70 segundos (130 a 190 palabras), salvo que se pida un documental largo.
- Gancho en 3 golpes en los primeros 10 s: quién sos / qué pasó -> el dato enorme -> la contradicción.
  La primera frase arranca con el tema, sin saludo ni "hoy te cuento".
- Estructura: gancho -> cómo llegamos acá (hitos con fecha) -> capítulos numerados ("Problema uno: ...",
  cada cartel de capítulo es una frase propia y corta) -> giro o duda honesta -> cierre que vuelve a la
  imagen del gancho -> última frase: "Seguime para la próxima historia."
- Una metáfora visual que abre y cierra (en GTA VI: la torre de monedas de 2013 contra la de 2026).
- Frases cortas, una idea por frase, y cada frase tiene que poder DIBUJARSE con objetos.
- Re-gancho cada 20-30 s: una cifra, un "pero", un salto de fecha.
- Prohibido: metáforas de adorno, "no es X, es Y", preguntas retóricas en el medio (solo UNA pregunta
  central), "spoiler", "ojo al dato", listas de tres adjetivos, rayas y punto y coma.
- Personas reales: muñeco genérico + placa con nombre. Sin caras, sin logos (el nombre en texto plano).
  Nada de acusaciones que no estén en fuentes serias; si hay una investigación en curso se dice "investiga".

### Sintaxis de `parrafos.json`

`[dicho|mostrado]` = la voz dice lo de la izquierda y el subtítulo muestra lo de la derecha (1 solo token).
Usarlo SIEMPRE para:
- números y años: `[ochocientos millones|800 millones]`, `[dos mil veintiséis|2026]`, `[treinta y dos coma cinco|32,5]`
- nombres en inglés y siglas, escritos como suenan en castellano con tilde en la sílaba fuerte:
  `[Rókstar Guéims.|Rockstar Games.]`, `[Téik Tu,|Take-Two,]`, `[Iutúb|YouTube]`, `[ge te a seis|GTA VI]`,
  `[jáquer|hacker]`, `[pe ce.|PC.]`, `[si i ou|CEO]`, `[Envidia|Nvidia]`.
La puntuación va pegada dentro del grupo, de los dos lados.

## `beats.ts`

```ts
import type { BeatSpec } from '../../src/Beat';
import { C } from '../../src/kit/math';
export const BEATS: BeatSpec[] = [
  { id: 'b01', set: 'neon',                       // 'neon' (ciudad de noche) | 'room' (interior cálido) | 'void' (neón sin ciudad)
    cam: { from: [0.9, 2.6, 8.4], to: [0, 2.2, 6.9], look: [0, 0.75, 0], fov: 44 },   // opcional: lookTo, shift
    keywords: ['Rockstar', '800'],                // palabras del subtítulo con cajita azul
    actors: [ { type: 'person', pos: [0, 0, 0], p: { shirt: C.gold, pose: 'idle' }, out: 'GTA' }, ... ],
    overlays: [ { type: 'pill', text: '2013', at: '2013' }, ... ] },
];
```

**`at` / `out`**: un número (segundos desde el inicio del plano) o una palabra MOSTRADA del subtítulo de ese
plano (`'800'`, `'Rockstar'`; `'mayo#2'` = segunda aparición). Si la palabra no existe, el render falla y
dice cuál. Un actor sin `at` está desde el inicio. **Regla: algo aparece o cambia cada 1-2 s.**

**Actor**: `{ type, pos, rot, s (escala), at, out, enter: 'pop'|'drop'|'grow'|'none', move: {to, at, dur}, spin, bob, p }`.
Con `at` el default es `pop`. Para cambiar la pose de un muñeco: dos actores iguales, uno con `out: 'x'`
y otro con `at: 'x', enter: 'none'`.

Tipos del kit (`src/kit/Props.tsx`, leerlo para ver los props exactos):
`person` (shirt, pants, skin, hair, cap, pose: idle|walk|point|cheer|type|hold|sad|shrug|sit|sitType),
`crowd` (n, area [x,z], seed, pose, sc, face: Math.PI para mirar a cámara, stagger),
`coins` (n, dur, r; usar enter:'none'), `bars` (vals, colors, w, gap), `arrow` (len, color), `label`
(text, w, h, bg, color, border, size, weight: cartel 3D con texto), `gamebox`, `screen` (kind:
code|play|trailer|text|chat|off, text, stand), `phone`, `laptop`, `firestick`, `bed`, `desk`, `building`
(w, h, d, seed, color, sign), `car`, `console`, `pc`, `cross`, `check`, `ring` (aro en el piso), `globe`,
`server` (alarm), `calendar` (top, big, color), `clips` (n miniaturas que salen volando), `box` (size,
color, glow), `road`, `arch` (text).

**Overlays** (HTML encima, `src/kit/Overlays.tsx`):
- `{ type: 'pill', text, at, red?, out? }` píldora de fecha/lugar abajo (roja = mala noticia). Una visible por vez.
- `{ type: 'big', text, sub, at, red?, size?, count?: { to, pre, post, dec } }` cifra gigante con marco.
  `count` hace el conteo: `count: { to: 3790, pre: 'US$ ', post: ' M' }`.
- `{ type: 'chapter', n: 'PROBLEMA 1', title: 'EL ROBO', at: 0 }` cartel de capítulo a pantalla completa.
- `{ type: 'plate', name, role, at, out }` placa de nombre.
- `{ type: 'tag', text, at, x, y, color }` etiqueta suelta (x, y en % de pantalla).
- `{ type: 'photo', src: 'hilux.jpg', at, out, mode: 'card' | 'full', caption, credit, zoom: [1.04, 1.16], pan: [x, y] }`
  foto real con zoom y paneo lentos (sin IA). El archivo va en `videos/<slug>/public/fotos/`. `card` la muestra
  enmarcada en el centro, sobre la escena 3D; `full` ocupa la pantalla. Usar 2 a 4 por video, de 2 a 4 segundos,
  en el medio (donde cae la retención). Solo fotos propias, de prensa de la marca o de uso libre, con `credit`.
  Nunca fotos de personas animadas con IA.

### Props propios de un video

`videos/<slug>/props.tsx`: componentes `React.FC<{ t: number; tt: number; p: any }>` (t = segundos del
plano, tt = segundos desde que apareció). Se pueden importar `M`, `Label`, `Person`, `useTex` de
`../../src/kit/Props` y `C, eo, eio, lerp, pop, rnd` de `../../src/kit/math`. Exportar
`export const EXTRA = { nombre: Componente }` y en `entry.ts`: `makeRoot(timing, BEATS, EXTRA)`.
Toda animación es función pura de `t`/`tt`: prohibido `useFrame`, `Date.now()` y `Math.random()`.
Materiales planos (`<M c="#color" e="#emisivo" />`), solo cajas, cilindros, conos, esferas low-poly.

## Encuadre (lo que se aprendió con GTA VI)

- El cuadro vertical es angosto: a 8 unidades de distancia entran ~3,6 de ancho. Mantener todo en x entre
  -1,6 y 1,6. Cámara típica: `from` z 8-9, `to` z 7-8, altura 2,2-2,8, `look` y 1,2-1,7, fov 44-46.
- La cámara nunca está quieta, pero se mueve poco (5-10% del recorrido).
- Subtítulos arriba (13-22% de la pantalla): nada del 3D por encima de y≈3,3 cerca del centro.
- La cifra `big` ocupa del 66% al 76% y la píldora el 77-81%: lo importante del 3D va por encima de eso.
  En planos con `big`, lo que esté en el piso cerca de cámara (z > 1) queda tapado.
- El sujeto ocupa al menos un tercio del cuadro. Un plano no puede quedar vacío al empezar: poné algo sin `at`.
- Máximo 2 textos en pantalla además del subtítulo.
- Variar: no repetir el mismo encuadre ni el mismo objeto en planos seguidos. Alternar neon / room / void.
- Paleta: `C.cyan, C.magenta, C.gold, C.red, C.green, C.blue, C.white`, violetas `#2d1a6e`, `#241659`, oscuro `#15102b`.
