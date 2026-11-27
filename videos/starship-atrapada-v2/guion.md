# Palitos chinos para una mosca de 50 metros (versión 2 de starship-atrapada)

Video vertical 1080x1920, 30 fps, unos 0:55, 14 planos, sin carteles de capítulo. Voz: Juanma. Reel de prueba (solo no seguidores),
se publica el viernes 27/11/2026.

Por qué se rehace: el original (`videos/starship-atrapada/`) hizo 230 vistas en 28,6 h (0,27 veces la mediana), 19,3 s de
visualización promedio sobre 66,6 s, 4 me gusta, 0 compartidos y 0 guardados. Abría con "Sábado, 15:20 en Texas" (B11 fecha y hora):
un dato que no le dice nada al que no sigue el espacio, y a los 19 s la gente se iba antes de llegar al giro del propulsor. Esta versión cambia:
- **Inicio:** J100 "comparación con algo conocido" (Es como agarrar una mosca con palitos chinos. Pero la mosca mide unos 50 metros
  y viene del espacio). Arranca con una imagen que entiende cualquiera; "Starship" y "SpaceX" recién aparecen en el plano 3. No repite
  el A2 de `spacex-starmind` ni D33, G67, E43 de los últimos videos, y no es "Sos X".
- **Cierre:** pregunta de debate (playbook 4, n.º 70: "¿Qué parte te costó creer?") + "Te leo". Sin "Seguime" y sin la pregunta
  de predicción del original.
- **Orden y recorte:** la atrapada va de entrada (planos 1 a 7) y el giro del propulsor se adelanta a los 31 s ("Pero el cohete tiene
  dos mitades"). Se cortan la hora exacta, "envuelta en fuego", "podés volver a usar el cohete entero", la fecha de octubre de 2024
  y la versión de que la nave podía volver a volar (quedó vieja). Pasa de 188 a 147 palabras y de 15 a 14 planos.
- **Imagen que abre y cierra:** la mosca y los palitos (planos 1, 2 y 6) vuelven en el plano 12: atraparon una mitad, falta atrapar
  las dos en el mismo vuelo.
- **Ángulo distinto de `spacex-starmind` (publicado hoy, 26/11):** aquel era el permiso de la FCC para un millón de satélites con
  centros de datos. Este no nombra satélites, Starlink ni la FCC: es solo la maniobra de la torre.
- **Actualizado al 26/11/2026:** el estado de la nave (Musk dijo que se retira) y el vuelo 16 (diciembre, sin fecha confirmada).

## Guion final (una línea por plano)

Tiempos estimados a unas 2,6 palabras dichas por segundo (se reemplazan por los reales al generar la voz).

| # | Tiempo | Frase |
|---|---|---|
| 1 | 0:00 | Es como agarrar una mosca con palitos chinos. |
| 2 | 0:03 | Pero la mosca mide unos 50 metros y viene del espacio. |
| 3 | 0:07 | Pasó el 14 de noviembre en Texas, con la nave Starship de SpaceX. |
| 4 | 0:13 | Venía de dar 14 vueltas a la Tierra en 22 horas y media. |
| 5 | 0:18 | Prendió los motores, frenó en el aire y dos brazos de la torre la atraparon. |
| 6 | 0:24 | Su apodo en inglés significa eso: palitos chinos. |
| 7 | 0:27 | Nunca habían agarrado la nave. Las anteriores terminaban en el mar o destruidas. |
| 8 | 0:32 | Pero el cohete tiene dos mitades. |
| 9 | 0:34 | Al propulsor, la mitad de abajo, ya lo habían atrapado tres veces. |
| 10 | 0:39 | Esta vez se perdió en el Golfo de México. |
| 11 | 0:42 | Elon Musk dijo después que esta nave se retira. |
| 12 | 0:45 | Agarrar las dos en el mismo vuelo sigue pendiente. |
| 13 | 0:49 | Al 26 de noviembre, el vuelo 16 apunta a diciembre, sin fecha confirmada. |
| 14 | 0:54 | ¿Qué parte te costó creer? Te leo. |

147 palabras dichas (contadas sobre el lado izquierdo de `[dicho|mostrado]`; máximo pedido: 150). Unos 55-57 s.
Re-ganchos: el "pero" de los 50 metros (0:03), la fecha y el nombre (0:07), las 14 vueltas (0:13), la atrapada (0:18), el apodo
(0:24), el "nunca" (0:27), el giro "dos mitades" (0:32), el tres veces (0:34), la pérdida (0:39), el retiro (0:42), el 26/11 (0:49).
Ningún tramo pasa de 6 s sin un número, un nombre o un giro.
Fechas: "14 de noviembre" es el sábado 14/11/2026 en Texas (la atrapada fue a las 21:21 UTC, 15:20-15:21 hora local). El propulsor se
perdió el viernes 13/11, minutos después del despegue: el plano 10 dice "esta vez" (el mismo vuelo) y no da día.
"Al 26 de noviembre" (plano 13) es la fecha de la última búsqueda: vale para el reel del viernes 27. Si se publica después de una
novedad del vuelo 16 (fecha oficial o permiso de la FAA), se reescribe ese plano.

### PRONUNCIACIÓN A CONFIRMAR

El glosario (`python3 fabrica/pronunciacion.py glosario`) solo tiene GTA 6, GitHub e Hilux: ninguno de estos nombres está probado ni
confirmado. Generar un audio con variantes numeradas para que elija el dueño y reemplazar el lado izquierdo del grupo en `parrafos.json`.

- **Starship** (plano 3): en `parrafos.json` va `[Stárship|Starship]` (la del original). Variantes:
  1. `Stárship` 2. `Estárship` 3. `Stárchip` 4. `Starship` (sin cambio).
- **SpaceX** (plano 3): `[Espéis Ex.|SpaceX.]` (la del original). Variantes:
  1. `Espéis Ex` 2. `Spéis Ex` 3. `Espéis Equis` 4. `Spéisex` 5. `SpaceX` (sin cambio).
- **Elon Musk** (plano 11): `[Ílon Mask|Elon Musk]` (la del original). Variantes:
  1. `Ílon Mask` 2. `Élon Mask` 3. `Ílon Mosk` 4. `Elon Musk` (sin cambio).
- "Texas" y "Golfo de México" se leen en castellano y van sin corchetes.

## Hoja de datos y fuentes

| Dato | Frase del guion | Fuente |
|---|---|---|
| A los brazos de la torre les dicen "chopsticks" (palitos chinos, en inglés) | 1, 6 | [Space.com, video desde la torre](https://www.space.com/space-exploration/launches-spacecraft/the-view-from-the-tower-watch-starship-come-in-for-chopsticks-catch-in-epic-slo-mo-video), [Gizmodo](https://gizmodo.com/spacexs-next-big-trick-catch-the-starship-upper-stage-with-chopsticks-2000650708) |
| La nave mide unos 50 metros (las fuentes dan entre 52 y 55 m para la versión 3; el cohete completo, 124 m) | 2 | [Space.com, Starship V3](https://www.space.com/space-exploration/launches-spacecraft/the-worlds-biggest-rocket-how-spacexs-new-starship-v3-differs-from-its-predecessors), [New Space Economy](https://newspaceeconomy.ca/2026/04/16/detailed-review-of-starship-v3/) |
| La torre de Starbase (Texas) atrapó la nave (Ship 42) del vuelo 15 el sábado 14/11/2026, 21:21 UTC | 3, 5 | [NASASpaceFlight](https://www.nasaspaceflight.com/2026/11/starship-flight-15-spacex-history/), [CNBC](https://www.cnbc.com/2026/11/14/spacex-plans-to-try-first-ever-catch-of-starship-rocket-from-orbit.html), [KPBS, 14/11](https://www.kpbs.org/news/science-technology/2026/11/14/spacex-successfully-catches-starship-and-makes-history) |
| 14 vueltas a la Tierra, unas 22 horas y media de vuelo | 4 | [NASASpaceFlight](https://www.nasaspaceflight.com/2026/11/starship-flight-15-spacex-history/), [Aviation Week](https://aviationweek.com/space/operations-safety/starship-flight-15-ends-first-ship-tower-catch), [The Next Web](https://thenextweb.com/news/spacex-starship-catch-upper-stage-flight-15) |
| Encendido de motores, frenado y atrapada con los dos brazos de la torre | 5 | [NASASpaceFlight](https://www.nasaspaceflight.com/2026/11/starship-flight-15-spacex-history/), [Space.com, video desde la torre](https://www.space.com/space-exploration/launches-spacecraft/the-view-from-the-tower-watch-starship-come-in-for-chopsticks-catch-in-epic-slo-mo-video) |
| Primera vez que se atrapa la etapa superior (la nave); en vuelos anteriores terminó en el mar o destruida | 7 | [Space.com](https://www.space.com/space-exploration/launches-spacecraft/spacex-chopsticks-catch-starship-upper-stage-flight-14), [Payload](https://payloadspace.com/spacex-successfully-catches-starship-upper-stage/), [Smithsonian](https://www.smithsonianmag.com/smart-news/spacex-catches-the-upper-stage-of-its-starship-for-the-first-time-making-the-company-one-step-closer-to-a-reusable-rocket-180989877/) |
| El cohete son dos etapas: el propulsor Super Heavy (abajo) y la nave (arriba) | 8, 9 | [Space.com, Starship V3](https://www.space.com/space-exploration/launches-spacecraft/the-worlds-biggest-rocket-how-spacexs-new-starship-v3-differs-from-its-predecessors), [Wikipedia, lista de lanzamientos](https://en.wikipedia.org/wiki/List_of_Starship_launches) |
| La torre ya había atrapado al propulsor tres veces antes (la primera, el 13/10/2024, vuelo 5) | 9 | [Wikipedia, lista de lanzamientos](https://en.wikipedia.org/wiki/List_of_Starship_launches), [StarbaseEvents](https://www.starbaseevents.com/flights/15), [The Next Web](https://thenextweb.com/news/spacex-starship-catch-upper-stage-flight-15) |
| En el vuelo 15 el propulsor (Booster 22) canceló su regreso a la torre y se perdió en el Golfo de México | 10 | [NASASpaceFlight](https://www.nasaspaceflight.com/2026/11/starship-flight-15-spacex-history/), [SpaceQ](https://spaceq.ca/starship-flight-15-ship-catch-booster-lost/), [CBS Austin](https://cbsaustin.com/news/nation-world/spacex-catches-starship-after-orbit-in-historic-first-as-booster-explodes-over-gulf) |
| Elon Musk dijo que la nave atrapada (Ship 42) se retira y no vuelve a volar (reportes del 22/11/2026 en adelante) | 11 | [Space.com](https://www.space.com/space-exploration/launches-spacecraft/spacex-will-retire-1st-starship-upper-stage-ever-caught-by-chopsticks-elon-musk-says), [KeepTrack, 22/11](https://keeptrack.space/x-report/spacex-brief-2026-11-22), [NewsBytes](https://www.newsbytesapp.com/news/science/spacex-retires-ship-42-elon-musk-wants-it-displayed/tldr) |
| Atrapar las dos etapas en el mismo vuelo era el objetivo del vuelo 15 y sigue pendiente | 12 | [Nature World News, 17/11](https://www.natureworldnews.com/articles/73881/20261117/half-double-catch-worked-starship-flight-15-brings-ship-home-orbit-first-time.htm), [IBTimes](https://www.ibtimes.co.uk/spacex-starship-first-upper-stage-catch-super-heavy-loss-1832512) |
| Vuelo 16: apunta a diciembre de 2026, sin fecha confirmada por SpaceX y con el permiso de la FAA pendiente (búsqueda del 26/11/2026) | 13 | [NASASpaceFlight](https://www.nasaspaceflight.com/2026/10/spacex-flight-15-16-milestones/), [Starlust, vuelo 16](https://starlust.org/profile/starship-flight-16/), [Starship Desk](https://starshipdesk.com/flights/F16/) |

Límites y cómo los trata el guion:
- "Es como agarrar una mosca con palitos chinos" es una comparación, no un dato: se apoya en el apodo real de los brazos
  ("chopsticks") y el plano 6 lo explica. "La mosca" es la nave; la placa del plano 2 lo deja claro.
- Futuro de la nave: el 16/11 Musk habló de volver a volarla en unas semanas (lo que decía el original); los reportes posteriores
  (Space.com, KeepTrack del 22/11, NewsBytes) dicen que la retiran. Una búsqueda del 26/11 encontró además una mención de
  "volver a volar una nave a fin de año o a principios de 2027", sin decir si es esta. El guion se queda con lo último que dijo
  Musk sobre esta nave ("dijo después que se retira"), atribuido a él.
- Vuelo 16: hay versiones de "no antes del 10 de diciembre", de salir desde Florida (plataforma 39A) o desde Texas, y no hay fecha
  oficial ni permiso de la FAA al 26/11. El guion solo dice "apunta a diciembre, sin fecha confirmada". No se dice que en el vuelo 16
  vayan a intentar atrapar las dos mitades: ninguna fuente lo confirma. El plano 12 solo dice que eso sigue pendiente.
- Causa de la pérdida del propulsor: las fuentes hablan de poco combustible, de un corte anticipado de motor o de un desvío. Unas
  dicen que explotó sobre el Golfo antes de tocar el agua. El guion solo dice "se perdió en el Golfo de México".
- La altura exacta varía según la fuente: el guion dice "unos 50 metros".
- Los datos se chequearon con resúmenes de búsqueda: space.com y newsbytesapp.com no se pudieron abrir desde esta sesión.

## Placas por plano

| # | Texto en pantalla (exacto) |
|---|----------------------------|
| 1 | UNA MOSCA · DOS PALITOS |
| 2 | LA "MOSCA": UNOS 50 METROS · VIENE DEL ESPACIO |
| 3 | STARSHIP · SPACEX · TEXAS · 14/11/2026 |
| 4 | 14 VUELTAS A LA TIERRA · 22 H 30 MIN |
| 5 | MOTORES ENCENDIDOS · FRENA EN EL AIRE |
| 6 | "CHOPSTICKS" = PALITOS CHINOS |
| 7 | PRIMERA VEZ QUE ATRAPAN LA NAVE |
| 8 | ARRIBA: NAVE · ABAJO: PROPULSOR |
| 9 | PROPULSOR: 3 VECES ATRAPADO ANTES |
| 10 | VUELO 15: PROPULSOR PERDIDO · GOLFO DE MÉXICO |
| 11 | ELON MUSK: ESTA NAVE SE RETIRA |
| 12 | LAS DOS MITADES EN UN VUELO: PENDIENTE |
| 13 | VUELO 16 · DICIEMBRE · SIN FECHA CONFIRMADA (AL 26/11/2026) |
| 14 | ¿QUÉ PARTE TE COSTÓ CREER? |

Sin otras placas. No usar "parte" ni números de serie en ninguna placa ni en la portada.

## Títulos

1. Palitos chinos para una mosca de 50 metros
2. Agarraron en el aire una nave que venía del espacio
3. Atraparon una mitad del cohete. La otra se perdió en el mar

## Descripción de Instagram

```
Es como agarrar una mosca con palitos chinos. Pero la mosca mide unos 50 metros y viene del espacio.

El 14 de noviembre de 2026, en Texas, la torre de SpaceX atrapó con sus dos brazos a la nave Starship, que volvía de dar 14 vueltas a la Tierra en unas 22 horas y media. A esos brazos les dicen "chopsticks": palitos chinos. Fue la primera vez que atrapan la nave.
La otra mitad del cohete, el propulsor, ya había sido atrapada tres veces antes. En este vuelo se perdió en el Golfo de México.
Elon Musk dijo después que esta nave se retira. Al 26 de noviembre, el vuelo 16 apunta a diciembre, sin fecha confirmada.

¿Qué parte te costó creer? Te leo.

#starship #spacex #cohetes #espacio #ingenieria
```
