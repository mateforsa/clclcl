# FP2 de Qatar: 13 minutos extra, dos banderas rojas y Mercedes otra vez 1-2

Video nuevo, pedido del dueño (viernes 27/11/2026, después de la práctica 2). No es continuación de nada: sin "parte N" en
voz, placas, portada, títulos ni descripción. Hay un video aparte sobre Colapinto (`colapinto-fp2-qatar`): acá Colapinto
va en una sola línea (15°, sin vuelta con blandas por la roja de Gasly), sin la pelea con Sainz.
Vertical 1080x1920, 30 fps, 14 planos, 168 palabras dichas (contadas sobre la parte "dicho" de `parrafos.json`):
unos 55 a 60 s a 2,8-3 palabras por segundo. Los tiempos reales salen de `timing.json` después de la voz.

- **Inicio:** G63 un tiempo (playbook sección 1.G): "Trece minutos extra: eso se estiró la segunda práctica de Qatar."
  Golpe 2: dos banderas rojas y aun así Mercedes 1-2. Golpe 3, la contradicción: ninguno de sus autos cerró una vuelta con
  blandas. No es "Sos X". Los dos videos anteriores en `hooks_used.json` usan D31 (`cosecha-record-171`) y F53
  (`libertadores-plata-final`); el último G fue G64 en `kioscos-53000`, hace seis videos. No repite el A8 de
  `colapinto-fp1-qatar` (comparación de dos compañeros de equipo).
- **Cierre:** playbook 4, "Un número" (n.º 16/18 adaptado): "¿Cuántas décimas le saca a McLaren el sábado? Dejá tu número.",
  tras el callback al gancho ("Dos rojas, trece minutos extra, y Mercedes igual adelante"). Sin "Seguime", sin elegir entre
  dos (lo usó `colapinto-fp1-qatar`), sin continuación ni predicción de resultado exacto (lo usó `libertadores-plata-final`).
  Las siete décimas de Norris (plano 10) son la base de la pregunta.
- **Imagen que abre y cierra:** un reloj de sesión que no llega a cero y suma "+13:00" (plano 1). En el plano 13 vuelve el
  mismo reloj, ya en 0:00, con los dos autos plateados genéricos adelante.
- **Re-ganchos:** 13 minutos (0:00), dos rojas y 1-2 (0:04), sin blandas (0:08), roja 1 (0:12), roja 2 (0:16), la radio
  (0:21), Briatore (0:23), Antonelli y Colapinto sin vuelta (0:27), el resultado (0:33), las siete décimas (0:36), 27 vueltas
  (0:41), 57 y dos paradas (0:46), callback (0:50), pregunta (0:53). Ningún tramo de más de 6 s sin dato nuevo.
- **Checker de la skill:** 90/100, cero fallas graves. Los dos avisos leves son del lector en inglés (no lee números
  escritos con letras ni un pedido de comentario en castellano).
- **Fechas:** el guion no dice "hoy" ni "mañana": dice "el domingo" y "el sábado". Si se publica después de la
  clasificación del sábado 28 (15:00 ARG), la pregunta del cierre queda vieja: hay que revisarlo.

## Guion final (una línea por plano)

| # | Tiempo aprox. | Frase |
|---|---|---|
| 1 | 0:00 | Trece minutos extra: eso se estiró la segunda práctica de Qatar. |
| 2 | 0:04 | Dos banderas rojas, y aun así Mercedes volvió a hacer el 1-2. |
| 3 | 0:08 | Sin que ninguno de sus autos cerrara una vuelta con blandas. |
| 4 | 0:12 | La primera roja: Leclerc hizo un trompo y dejó leca en la pista. |
| 5 | 0:16 | La segunda: Gasly perdió el Alpine en la curva 14 y quedó enterrado en la leca. |
| 6 | 0:21 | «Estoy estancado», avisó por radio. |
| 7 | 0:23 | Y Briatore, el jefe de Alpine, se levantó y se fue del box. |
| 8 | 0:27 | Esa roja también dejó sin vuelta con blandas a Antonelli y a Colapinto, que terminó 15°. |
| 9 | 0:33 | Antonelli quedó primero con gomas medias. Russell, segundo. |
| 10 | 0:36 | Norris, tercero, calcula que McLaren está unas siete décimas por vuelta detrás de Mercedes. |
| 11 | 0:41 | Y para el domingo, Pirelli limitó cada juego de gomas a 27 vueltas. |
| 12 | 0:46 | Con 57 vueltas de carrera, todos paran por lo menos dos veces. |
| 13 | 0:50 | Dos rojas, trece minutos extra, y Mercedes igual adelante. |
| 14 | 0:53 | ¿Cuántas décimas le saca a McLaren el sábado? Dejá tu número. |

Si la toma pasa de 60 s, el plano 7 (Briatore) o el 6 (la radio) se pueden sacar sin perder el hilo; pasan a la descripción.

## PRONUNCIACIÓN A CONFIRMAR

Glosario consultado (`python3 fabrica/pronunciacion.py glosario`, 27/11/2026). Las que están se usan con la forma exacta
del glosario (solo cambia la puntuación pegada, que va dentro del grupo):

| Término | Estado | Forma en `parrafos.json` | Variantes para el productor |
|---|---|---|---|
| Alpine | en glosario (**confirmada** por el dueño) | `[Alpín|Alpine]`, `[Alpín,|Alpine,]` (planos 5 y 7) | — |
| Gasly | en glosario (probada) | `[Gaslý|Gasly]` (plano 5) | — |
| Antonelli | en glosario (probada) | `[Antoneli|Antonelli]` (planos 8 y 9) | — |
| Pirelli | en glosario (probada) | `[Pireli|Pirelli]` (plano 11) | — |
| Qatar | en glosario (probada) | `[Qatar.|Qatar.]` (plano 1) | — |
| Lindblad | en glosario (probada) | no se dice | — |
| Hamilton | en glosario (probada) | no se dice | — |
| Mercedes | PRONUNCIACIÓN A CONFIRMAR | `[Mercedes|Mercedes]` (planos 2, 10, 13) | Mercedes (castellano) · Mersédes · Merzédes |
| Russell | PRONUNCIACIÓN A CONFIRMAR | `[Rásel,|Russell,]` (plano 9) | Rásel · Rúsel · Rásell · Russell |
| Norris | PRONUNCIACIÓN A CONFIRMAR | `[Nóris,|Norris,]` (plano 10) | Nóris · Norris · Nórris |
| Leclerc | PRONUNCIACIÓN A CONFIRMAR | `[Leclér|Leclerc]` (plano 4) | Leclér · Leclerc · Leclérc · Le Clér |
| Briatore | PRONUNCIACIÓN A CONFIRMAR | `[Briatóre,|Briatore,]` (plano 7) | Briatóre · Briatore · Briatoré |
| McLaren | PRONUNCIACIÓN A CONFIRMAR | `[Mac Láren|McLaren]` (planos 10 y 14) | Mac Láren · Mclaren · Mac Laren · Maclárem |
| Ferrari | no se dice: va solo en placa (plano 4) | — | — |
| Piastri, Verstappen | no se dicen ni van en voz; Piastri y Verstappen solo en la tabla de la placa 9 si el productor la arma (opcional) | — | — |
| Colapinto | castellano, sin corchetes (control: que no diga "Colapínto") | — | — |

Números: con `[dicho|mostrado]` los que se muestran como cifra (14, 15°, 27, 57, 1-2). "Trece minutos", "siete décimas" y
"dos veces" se dicen y se muestran igual en el subtítulo; la cifra exacta va en placa.

## Hoja de datos y fuentes

Todo sale de `fabrica/investigacion/fp2-qatar-2026.md`, secciones "FP2 general" y "Lo que viene", releído en las copias
bajadas con curl el 27/11/2026 (scratchpad `dlfp2/`). No se usa la tabla de FP1 de The Race. No se dice cuántos minutos
faltaban en el auto de seguridad virtual (de hecho, el VSC y Hamilton no entran). Nada con una sola fuente en la voz.

| Dato | Frase del guion | Fuente |
|---|---|---|
| La sesión se extendió 13 minutos por las dos banderas rojas | 1: "Trece minutos extra: eso se estiró la segunda práctica de Qatar." · 13 | [formula1.com, crónica FP2](https://www.formula1.com/en/latest/article/fp2-antonelli-tops-extended-second-practice-from-russell-and-norris-in-qatar.6jAa2kcIAVqOPHW30oipfm) ("the session would be extended by 13 minutes due to the two red flags"), [The Race](https://www.the-race.com/formula-1/antonelli-tops-qatar-fp2-after-multiple-red-flag-delays-f1/) ("the session was extended by 13 minutes"), [Infobae](https://www.infobae.com/deportes/2026/11/27/franco-colapinto-afrontara-las-primeras-practicas-libres-del-gran-premio-de-qatar-hora-tv-y-todo-lo-que-hay-que-saber/), [La Nación, en vivo](https://www.lanacion.com.ar/deportes/automovilismo/franco-colapinto-en-el-gran-premio-de-qatar-de-formula-1-en-vivo-nid27112026-2/) |
| Dos banderas rojas; Mercedes 1-2 (Antonelli, Russell) en FP2, como en FP1 | 2: "Dos banderas rojas, y aun así Mercedes volvió a hacer el 1-2." | [formula1.com, resultado FP2](https://www.formula1.com/en/results/2026/races/1301/qatar/practice/2) ("1 Kimi Antonelli ... Mercedes 1:23.077" / "2 George Russell ... Mercedes +0.127s"), [formula1.com, crónica FP2](https://www.formula1.com/en/latest/article/fp2-antonelli-tops-extended-second-practice-from-russell-and-norris-in-qatar.6jAa2kcIAVqOPHW30oipfm) ("After Mercedes led the way with a 1-2 during the day's first practice session"), [RaceFans](https://www.racefans.net/2026/11/27/antonelli-leads-another-mercedes-one-two-despite-red-flag-interruptions/) |
| Ningún Mercedes completó su vuelta con blandas por las rojas | 3: "Sin que ninguno de sus autos cerrara una vuelta con blandas." | [formula1.com, lo que dijeron los equipos](https://www.formula1.com/en/latest/article/what-the-teams-said-friday-in-qatar-2026.4NjrvUy3Zc6X6YN4i896S6) (Shovlin: "Neither driver completed their Soft tyre laps in FP2 due to the red flags"), [The Race](https://www.the-race.com/formula-1/antonelli-tops-qatar-fp2-after-multiple-red-flag-delays-f1/) ("neither Mercedes driver improving on soft tyres as they were both interrupted by stoppages"), [RaceFans](https://www.racefans.net/2026/11/27/antonelli-leads-another-mercedes-one-two-despite-red-flag-interruptions/) |
| Roja 1: leca y restos tras el trompo de Leclerc (Ferrari) | 4: "La primera roja: Leclerc hizo un trompo y dejó leca en la pista." | [formula1.com, crónica FP2](https://www.formula1.com/en/latest/article/fp2-antonelli-tops-extended-second-practice-from-russell-and-norris-in-qatar.6jAa2kcIAVqOPHW30oipfm), [The Race](https://www.the-race.com/formula-1/antonelli-tops-qatar-fp2-after-multiple-red-flag-delays-f1/) ("a red flag was flown midway through FP2 for gravel and debris from an early spin for Ferrari's Charles Leclerc"), [RaceFans](https://www.racefans.net/2026/11/27/antonelli-leads-another-mercedes-one-two-despite-red-flag-interruptions/), [La Nación, en vivo](https://www.lanacion.com.ar/deportes/automovilismo/franco-colapinto-en-el-gran-premio-de-qatar-de-formula-1-en-vivo-nid27112026-2/) |
| Roja 2: Gasly (Alpine) se fue a la salida de la curva 14 y quedó enterrado en la leca, a 22 min del final | 5: "La segunda: Gasly perdió el Alpine en la curva 14 y quedó enterrado en la leca." · 14 | [RaceFans](https://www.racefans.net/2026/11/27/antonelli-leads-another-mercedes-one-two-despite-red-flag-interruptions/) ("at the exit of turn 14 and lost control, spinning into a gravel trap from which he never emerged"), [formula1.com, crónica FP2](https://www.formula1.com/en/latest/article/fp2-antonelli-tops-extended-second-practice-from-russell-and-norris-in-qatar.6jAa2kcIAVqOPHW30oipfm) ("Gasly's Alpine became beached in the gravel"), [TyC Sports](https://www.tycsports.com/automovilismo/el-despiste-de-pierre-gasly-en-el-gp-de-qatar-que-obligo-a-detener-la-practica-y-la-reaccion-de-briatore-id773202.html) ("a falta de 22 minutos", "Al salir de la curva 14"), [Infobae](https://www.infobae.com/deportes/2026/11/27/el-brutal-despiste-de-pierre-gasly-que-lo-dejo-afuera-de-la-practica-en-el-gp-de-qatar-de-f1-la-reaccion-de-briatore/) |
| Gasly por radio: "Estoy estancado" (traducción publicada por los dos medios) | 6: "«Estoy estancado», avisó por radio." | [TyC Sports](https://www.tycsports.com/automovilismo/el-despiste-de-pierre-gasly-en-el-gp-de-qatar-que-obligo-a-detener-la-practica-y-la-reaccion-de-briatore-id773202.html), [La Nación, en vivo](https://www.lanacion.com.ar/deportes/automovilismo/franco-colapinto-en-el-gran-premio-de-qatar-de-formula-1-en-vivo-nid27112026-2/) |
| Briatore, jefe de Alpine, se levantó de su asiento, dejó los auriculares y se fue de los boxes | 7: "Y Briatore, el jefe de Alpine, se levantó y se fue del box." | [Infobae](https://www.infobae.com/deportes/2026/11/27/el-brutal-despiste-de-pierre-gasly-que-lo-dejo-afuera-de-la-practica-en-el-gp-de-qatar-de-f1-la-reaccion-de-briatore/) ("Flavio Briatore, jefe de Alpine ... se levantó de su asiento y dejó los auriculares"), [TyC Sports](https://www.tycsports.com/automovilismo/el-despiste-de-pierre-gasly-en-el-gp-de-qatar-que-obligo-a-detener-la-practica-y-la-reaccion-de-briatore-id773202.html) ("se marchó de los boxes") |
| La roja de Gasly cortó la vuelta con blandas de Antonelli y la de Colapinto | 8: "Esa roja también dejó sin vuelta con blandas a Antonelli y a Colapinto" | [RaceFans](https://www.racefans.net/2026/11/27/antonelli-leads-another-mercedes-one-two-despite-red-flag-interruptions/) ("That put paid to Antonelli's hopes of improving his lap time"), [formula1.com, crónica FP2](https://www.formula1.com/en/latest/article/fp2-antonelli-tops-extended-second-practice-from-russell-and-norris-in-qatar.6jAa2kcIAVqOPHW30oipfm) (salió con blandas tras la reanudación y lo frenó la roja de Gasly), [TyC Sports](https://www.tycsports.com/automovilismo/el-despiste-de-pierre-gasly-en-el-gp-de-qatar-que-obligo-a-detener-la-practica-y-la-reaccion-de-briatore-id773202.html) ("también perjudicó a Franco Colapinto, que perdió la posibilidad de completar su intento con neumáticos blandos"), [Infobae, Sainz](https://www.infobae.com/deportes/2026/11/27/carlos-sainz-se-enojo-por-una-maniobra-de-franco-colapinto-lo-critico-y-advirtio-quizas-tenga-que-hablar-con-el/) |
| Colapinto 15°, 1:25.733, +2.656 | 8: "que terminó 15°" | [formula1.com, resultado FP2](https://www.formula1.com/en/results/2026/races/1301/qatar/practice/2) ("15 43 Franco Colapinto COL Alpine +2.656s"), [RaceFans](https://www.racefans.net/2026/11/27/antonelli-leads-another-mercedes-one-two-despite-red-flag-interruptions/), [La Nación, en vivo](https://www.lanacion.com.ar/deportes/automovilismo/franco-colapinto-en-el-gran-premio-de-qatar-de-formula-1-en-vivo-nid27112026-2/) |
| Antonelli 1° con 1:23.077 en gomas medias; Russell 2° a 0,127 | 9: "Antonelli quedó primero con gomas medias. Russell, segundo." | [formula1.com, resultado FP2](https://www.formula1.com/en/results/2026/races/1301/qatar/practice/2), [formula1.com, crónica FP2](https://www.formula1.com/en/latest/article/fp2-antonelli-tops-extended-second-practice-from-russell-and-norris-in-qatar.6jAa2kcIAVqOPHW30oipfm) ("thanks to his earlier time on the medium compound, putting him 0.127s ahead of Russell"), [The Race](https://www.the-race.com/formula-1/antonelli-tops-qatar-fp2-after-multiple-red-flag-delays-f1/) ("1m23.077s on medium tyres") |
| Norris 3° (McLaren, +0,445); calcula unas siete décimas por vuelta detrás de Mercedes y que la pelea es por el P3 | 10: "Norris, tercero, calcula que McLaren está unas siete décimas por vuelta detrás de Mercedes." | [formula1.com, Norris](https://www.formula1.com/en/latest/article/i-dont-think-weve-been-further-off-norris-worried-by-mclarens-deficit-to-mercedes-in-qatar.6mwnUPpxnOsIv6YJ7O6Lgm) ("probably seven tenths off Mercedes a lap"), [formula1.com, lo que dijeron los equipos](https://www.formula1.com/en/latest/article/what-the-teams-said-friday-in-qatar-2026.4NjrvUy3Zc6X6YN4i896S6) ("We estimate we're around seven tenths off the lead cars"), [formula1.com, resultado FP2](https://www.formula1.com/en/results/2026/races/1301/qatar/practice/2) ("3 Lando Norris NOR McLaren +0.445s") |
| Pirelli fijó un máximo de 27 vueltas por juego de neumáticos | 11: "Y para el domingo, Pirelli limitó cada juego de gomas a 27 vueltas." · 27 | [The Race, presiones](https://www.the-race.com/formula-1/f1-drivers-face-highest-tyre-pressure-orders-yet-in-qatar/) ("Pirelli has elected to impose a maximum stint length ... set at 27 laps for a set of tyres"), [formula1.com, Antonelli](https://www.formula1.com/en/latest/article/you-can-never-write-off-max-and-the-others-antonelli-wary-of-rivals-despite-topping-friday-in-qatar.2bsPJciIE8epCdw1AXd6zC) ("tyre life for a set of tyres limited to just 27 laps") |
| Carrera de 57 vueltas: todos tienen que parar al menos dos veces | 12: "Con 57 vueltas de carrera, todos paran por lo menos dos veces." · 57 | [formula1.com, Antonelli](https://www.formula1.com/en/latest/article/you-can-never-write-off-max-and-the-others-antonelli-wary-of-rivals-despite-topping-friday-in-qatar.2bsPJciIE8epCdw1AXd6zC) ("Sunday's 57-lap race ... all drivers will be required to make at least two stops"), [The Race, presiones](https://www.the-race.com/formula-1/f1-drivers-face-highest-tyre-pressure-orders-yet-in-qatar/) |
| Clasificación sábado 28, 15:00 ARG; carrera domingo 29, 13:00 ARG | 11 y 14: "para el domingo", "el sábado" (horarios solo en placas 12 y 14) | [La Nación, horarios](https://www.lanacion.com.ar/deportes/automovilismo/a-que-hora-de-argentina-son-las-practicas-qualy-y-carrera-del-gran-premio-de-qatar-de-la-f1-nid26112026/), [TN](https://tn.com.ar/deportes/formula-1/2026/11/27/carlos-sainz-critico-a-franco-colapinto-tras-una-ajustada-maniobra-en-la-la-segunda-practica-en-qatar-no-entiendo-que-hace/), [formula1.com, horarios](https://www.formula1.com/en/latest/article/formula-1-qatar-airways-qatar-grand-prix-2026.3XJyoYSnpJEcuZovstTdcG) (hora local, +6) |
| (solo placa) 1:23.077, +0,127, +0,445, +2,656 y "a 22 minutos del final" | placas 5, 8, 9 y 10 | [formula1.com, resultado FP2](https://www.formula1.com/en/results/2026/races/1301/qatar/practice/2), [TyC Sports](https://www.tycsports.com/automovilismo/el-despiste-de-pierre-gasly-en-el-gp-de-qatar-que-obligo-a-detener-la-practica-y-la-reaccion-de-briatore-id773202.html), [Infobae](https://www.infobae.com/deportes/2026/11/27/el-brutal-despiste-de-pierre-gasly-que-lo-dejo-afuera-de-la-practica-en-el-gp-de-qatar-de-f1-la-reaccion-de-briatore/) |

Límites y cómo los trata el guion:
- **Hamilton** no entra en la voz (por eso no hay que decidir su tiempo ni los minutos del VSC). Si el productor arma la
  tabla completa, Hamilton va 8° con +1,139 según formula1.com, no "sin tiempo" como RaceFans.
- **Siete décimas** es una estimación de Norris: la voz dice "calcula" y la placa "según Norris".
- **"Estoy estancado"** es la traducción que publicaron TyC y La Nación de la radio en inglés; va con comillas porque así
  la citan los dos medios. Si el verificador la prefiere sin comillas: `GASLY POR RADIO: ESTÁ ESTANCADO`.
- **Fuera por una sola fuente o por pedido:** la curva 7 del trompo de Leclerc, la frase de Gasly sobre los 10 grados, la
  frase de Verstappen sobre Mercedes, las vueltas de cada piloto, la pelea Colapinto-Sainz, el VSC, el graining.
- **"Ninguno de sus autos cerró una vuelta con blandas"**: lo dice Shovlin (Mercedes) en formula1.com y lo confirma The Race.

## Placas por plano

Aparte de los subtítulos. Mayúsculas y signos tal como van. Sin "parte N" en ningún lado. Autos y pilotos genéricos: sin
caras, sin logos, sin sponsors; nombres de equipos y pilotos en texto plano.

| # | Placa(s) | Cuándo |
|---|---|---|
| 1 | `+13 MINUTOS` · `PRÁCTICA 2 · GP DE QATAR · VIERNES 27/11` | la primera desde el cuadro 0 (gancho en mudo, sobre el reloj de sesión); la segunda en "Qatar." |
| 2 | `2 BANDERAS ROJAS` · `MERCEDES 1-2` | en "rojas," y en "1-2." |
| 3 | `NINGÚN MERCEDES CERRÓ VUELTA CON BLANDAS` | en "blandas." |
| 4 | `ROJA 1: TROMPO DE LECLERC (FERRARI)` · `LECA EN LA PISTA` | en "Leclerc" y en "pista." |
| 5 | `ROJA 2: GASLY (ALPINE) · CURVA 14` · `A 22 MINUTOS DEL FINAL` | en "Gasly" y en "leca." |
| 6 | `«ESTOY ESTANCADO»` · `PIERRE GASLY, POR RADIO` | en "estancado" y al final del plano |
| 7 | `FLAVIO BRIATORE, JEFE DE ALPINE` · `SE FUE DEL BOX` | en "Briatore," y en "box." |
| 8 | `SIN VUELTA CON BLANDAS: ANTONELLI Y COLAPINTO` · `COLAPINTO 15° · +2,656 S` | en "blandas" y en "15°." |
| 9 | `1° ANTONELLI (MERCEDES) · 1:23.077 · GOMAS MEDIAS` · `2° RUSSELL (MERCEDES) · +0,127 S` | en "medias." y en "Russell," |
| 10 | `3° NORRIS (MCLAREN) · +0,445 S` · `SEGÚN NORRIS: UNAS 7 DÉCIMAS POR VUELTA DETRÁS DE MERCEDES` | en "Norris," y en "décimas" |
| 11 | `MÁXIMO 27 VUELTAS POR JUEGO DE GOMAS` · `REGLA DE PIRELLI` | en "27" y al final del plano |
| 12 | `CARRERA: 57 VUELTAS · DOMINGO 29 · 13:00 (ARG)` · `= AL MENOS 2 PARADAS` | en "57" y en "dos veces." |
| 13 | `2 ROJAS · +13 MINUTOS · MERCEDES 1-2` | en "extra," (vuelve el reloj del plano 1, ya en 0:00) |
| 14 | `CLASIFICACIÓN: SÁBADO 28 · 15:00 (ARG)` · `¿CUÁNTAS DÉCIMAS LE SACA MERCEDES A MCLAREN?` | en "sábado?" y en "número." |

Fuentes en pantalla (texto chico, abajo, planos 2 a 13): `FUENTES: FORMULA1.COM, RACEFANS, THE RACE, TYC SPORTS, INFOBAE, LA NACIÓN`.

## Títulos

1. **FP2 de Qatar: 13 minutos extra, dos banderas rojas y Mercedes otra vez 1-2**
2. **Ningún Mercedes cerró una vuelta con blandas en Qatar, y aun así hicieron el 1-2**
3. **Gasly enterrado en la leca, Briatore se va del box y Mercedes adelante: la FP2 de Qatar**

## Descripción de Instagram

```
La segunda práctica de Qatar se estiró 13 minutos por dos banderas rojas, y Mercedes igual hizo el 1-2.

Ningún Mercedes pudo cerrar una vuelta con gomas blandas. Antonelli quedó primero con medias (1:23.077) y Russell segundo, a 0,127.
Roja 1: trompo de Leclerc y leca en la pista. Roja 2: Gasly se quedó enterrado en la leca de la curva 14 y Briatore se fue del box. Colapinto terminó 15°.
Norris, tercero, calcula que McLaren está unas siete décimas por vuelta detrás de Mercedes.
Para el domingo, Pirelli limitó cada juego de gomas a 27 vueltas: con 57 de carrera, todos paran al menos dos veces.

Clasificación: sábado 28 a las 15:00. Carrera: domingo 29 a las 13:00 (hora argentina).

¿Cuántas décimas le saca Mercedes a McLaren el sábado? Dejá tu número.

Fuentes: formula1.com, RaceFans, The Race, TyC Sports, Infobae y La Nación.

#formula1 #f1 #gpdeqatar #mercedes #colapinto
```

## Cómo regenerar

```
python3 scripts/voice.py fp2-qatar-general       # voz + tiempos (ElevenLabs)
python3 fabrica/pronunciacion.py oir fp2-qatar-general
scripts/stills.sh fp2-qatar-general
npx tsx scripts/events.ts fp2-qatar-general && python3 scripts/audio.py fp2-qatar-general
scripts/render.sh fp2-qatar-general              # out/fp2-qatar-general/fp2-qatar-general.mp4
scripts/cover.sh fp2-qatar-general               # out/fp2-qatar-general/portada.png
```
