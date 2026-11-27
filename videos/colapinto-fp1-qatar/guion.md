# Colapinto en la primera práctica de Qatar: 12°, a medio segundo de Gasly, y el límite de 27 vueltas

Video nuevo, noticia del día (pedido del dueño, viernes 27/11/2026, después de la práctica 1). No es continuación de
`colapinto-qatar-v2` ni es el "video del resultado" que ese reel prometía para después de la carrera: no nombra aquellos
comentarios ni pide un número. Sin "parte N" en voz, placas, portada, títulos ni descripción.
Vertical 1080x1920, 30 fps, 13 planos, 158 palabras dichas (contadas sobre la parte "dicho" de `parrafos.json`):
unos 52 a 56 s a 2,8-3 palabras por segundo. Los tiempos reales salen de `timing.json` después de la voz.

- **Inicio:** A8 la diferencia (playbook sección 1.A): "Mismo Alpine, misma pista: Gasly, puesto 10. Colapinto, puesto 12."
  Golpe 2: el número (medio segundo entre los dos). Golpe 3, el giro: "Pero lo que pesa para el domingo es otra cosa: las
  gomas." No es "Sos X". Los dos videos anteriores en `hooks_used.json` usan G64 (`kioscos-53000`) y J91
  (`rockstar-sindicato-no`); el último A fue A2 en `bitcoin-salidas-v2`, hace ocho videos. `colapinto-qatar-v2` abría con
  B11 (fecha y hora del domingo) y el cero de Qatar: acá el cero de Qatar va en el medio (plano 9), no como gancho.
- **Cierre:** playbook 4 n.º 2, elegir entre dos con nombres: "¿Quién termina adelante el domingo: Colapinto o Lindblad?"
  Sin "Seguime", sin pedir un número (eso era lo de `colapinto-qatar-v2`), sin promesa de continuación. Vuelve al gancho:
  el video abre con una comparación de dos pilotos y cierra con otra.
- **Imagen que abre y cierra:** dos autos genéricos iguales (mismo color, sin logos) en paralelo, uno apenas adelante
  (plano 1). En el plano 13, otros dos autos en paralelo, ahora el de Colapinto contra el de Lindblad (otro color), y la
  pregunta.
- **Re-ganchos:** medio segundo (0:04), más de dos segundos (0:08), "Pero" las gomas (0:13), 27 vueltas (0:16), 57 y dos
  paradas (0:20), desgaste más alto de lo esperado (0:25), la cita (0:30), el cero en Qatar (0:35), 35 puntos (0:38), 38 y
  tres más (0:43), los horarios (0:46), la pregunta (0:51). Ningún tramo de más de 5 s sin dato nuevo.
- **Checker de la skill:** 90/100, cero fallas graves. Los dos avisos leves son del lector en inglés (no lee números
  escritos con letras ni una pregunta de cierre en castellano).
- **Qué quedó afuera:** Hulkenberg a 0,028 (sale de una resta sobre una sola tabla; si el productor lo quiere, va solo en
  placa con RaceFans como fuente, nunca en título), los tiempos de Russell, Hadjar, Norris y Piastri, Verstappen 6°, el
  golpe de Gasly contra los pianos, la investigación a Red Bull, los 3,692 s del primero al último, los neumáticos de
  arranque, el campeonato de Antonelli y Verstappen. Respetada la lista "NO usar" de `fabrica/candidatos/2026-11-27.md`:
  ni la frase del aro de básquet, ni temperatura, ni "se fue ancho y pisó pianos", ni números de The Race.

## Guion final (una línea por plano)

| # | Tiempo aprox. | Frase |
|---|---|---|
| 1 | 0:00 | Mismo Alpine, misma pista: Gasly, puesto 10. Colapinto, puesto 12. |
| 2 | 0:04 | Medio segundo entre los dos, en la primera práctica de Qatar. |
| 3 | 0:08 | Arriba quedó Antonelli, el campeón, y Colapinto terminó a más de dos segundos. |
| 4 | 0:13 | Pero lo que pesa para el domingo es otra cosa: las gomas. |
| 5 | 0:16 | Pirelli puso un límite de 27 vueltas por juego de neumáticos. |
| 6 | 0:20 | La carrera tiene 57, así que todos tienen que parar dos veces. |
| 7 | 0:25 | Y en la práctica el desgaste fue mucho más alto de lo esperado, según el ingeniero de Hamilton. |
| 8 | 0:30 | Colapinto ya lo había avisado: «Es donde más se muestran nuestras debilidades». |
| 9 | 0:35 | Encima, en Qatar nunca sumó un punto. |
| 10 | 0:38 | Y hay algo en juego: es 12° en el campeonato, con 35 puntos. |
| 11 | 0:43 | Lindblad, el 11°, tiene 38: tres más. |
| 12 | 0:46 | Clasifica el sábado a las tres de la tarde, hora argentina, y corre el domingo a la una. |
| 13 | 0:51 | ¿Quién termina adelante el domingo: Colapinto o Lindblad? |

Si la toma pasa de 60 s, el plano 8 (la cita) es el primero que se puede sacar sin perder el hilo; la cita pasa a la
descripción. Fechas: el guion no dice "hoy" ni "mañana", así que no queda viejo si sale el sábado antes de la
clasificación. Si se publica después de la clasificación del sábado 28 (15:00), hay que revisarlo.

## PRONUNCIACIÓN A CONFIRMAR

Glosario consultado (`python3 fabrica/pronunciacion.py glosario`, 27/11/2026). Solo **Alpine** está: se usa la forma exacta
`[Alpáin,|Alpine,]` (probada). Los demás no están: van con una forma propuesta en `parrafos.json` y el productor tiene que
generar variantes numeradas para que se elija de oído. No se adivinó ninguna como definitiva.

| Término | Estado | Forma escrita en `parrafos.json` | Variantes para probar |
|---|---|---|---|
| Alpine | en glosario (probada) | `[Alpáin,|Alpine,]` | — |
| Gasly | PRONUNCIACIÓN A CONFIRMAR | `[Gaslí,|Gasly,]` | Gaslí · Gásli · Gasly · Gaslý |
| Antonelli | PRONUNCIACIÓN A CONFIRMAR | `[Antonéli,|Antonelli,]` | Antonéli · Antonelli · Antonelli (con ele doble italiana) |
| Lindblad | PRONUNCIACIÓN A CONFIRMAR | `[Líndblad,|Lindblad,]` (planos 11 y 13) | Líndblad · Lindblád · Lindblad · Línblad |
| Pirelli | PRONUNCIACIÓN A CONFIRMAR | `[Piréli|Pirelli]` | Piréli · Pirelli · Pirelí |
| Hamilton | PRONUNCIACIÓN A CONFIRMAR | `[Hámilton.|Hamilton.]` | Hámilton · Jámilton · Hamilton · Ámilton |
| Qatar | PRONUNCIACIÓN A CONFIRMAR (ya marcada en `colapinto-qatar-v2`, sigue sin glosario) | `[Catar.|Qatar.]` (planos 2 y 9) | Catar · Cátar · Katar · Qatar |
| Colapinto | PRONUNCIACIÓN A CONFIRMAR (es castellano, pero el dueño pidió revisarla) | sin corchetes | Colapinto (control: que no diga "Colapínto" raro) |
| Mercedes | no se dice: va solo en placa (plano 3) | — | — |
| Hulkenberg | no se dice ni va en placa | — | — |

Números: todos con `[dicho|mostrado]` (10, 12, 27, 57, 12°, 35, 11°, 38). "Medio segundo", "dos segundos", "dos veces",
"tres más", "las tres de la tarde" y "la una" se dicen y se muestran igual en el subtítulo; la cifra exacta va en placa.

## Hoja de datos y fuentes

Todo sale de `fabrica/candidatos/2026-11-27.md`, sección "Pedido del dueño 11:40", releído en las copias bajadas con curl el
27/11/2026 (scratchpad `dlfp1/`). Única excepción: "nunca sumó en Qatar", que no está en esa lista y se chequeó en las
tablas oficiales de 2024 y 2025 de formula1.com, bajadas con curl el 27/11/2026.

| Dato | Frase del guion | Fuente |
|---|---|---|
| Colapinto 12° en la práctica 1, 1:25.409, +2.192 de Antonelli; Gasly 10°, 1:24.874, los dos con Alpine | 1: "Mismo Alpine, misma pista: Gasly, puesto 10. Colapinto, puesto 12." | [formula1.com, resultado FP1](https://www.formula1.com/en/results/2026/races/1301/qatar/practice/1), [RaceFans](https://www.racefans.net/2026/11/27/antonelli-quickest-by-half-a-second-on-medium-tyre-compound-in-first-practice/) (tabla: "10 Pierre Gasly Alpine-Mercedes 1'24.874" / "12 Franco Colapinto Alpine-Mercedes 1'25.409") |
| Gasly le sacó 0,535 s a Colapinto | 2: "Medio segundo entre los dos, en la primera práctica de Qatar." | [Infobae](https://www.infobae.com/deportes/2026/11/27/franco-colapinto-afrontara-las-primeras-practicas-libres-del-gran-premio-de-qatar-hora-tv-y-todo-lo-que-hay-que-saber/) ("0.535 más lento que su compañero Pierre Gasly (1:24.874)"), [RaceFans](https://www.racefans.net/2026/11/27/antonelli-quickest-by-half-a-second-on-medium-tyre-compound-in-first-practice/) (1:25.409 − 1:24.874) |
| Antonelli (Mercedes, ya campeón) 1°, 1:23.217; Colapinto a 2,192 s | 3: "Arriba quedó Antonelli, el campeón, y Colapinto terminó a más de dos segundos." | [formula1.com, resultado FP1](https://www.formula1.com/en/results/2026/races/1301/qatar/practice/1), [formula1.com, crónica](https://www.formula1.com/en/latest/article/fp1-antonelli-leads-russell-in-qatar-as-mercedes-control-opening-practice.3v7t8Oja9vAGkic9TxN7FR), [RaceFans](https://www.racefans.net/2026/11/27/antonelli-quickest-by-half-a-second-on-medium-tyre-compound-in-first-practice/) ("The new world champion set his best lap time of 1'23.217") |
| Pirelli fijó un máximo de 27 vueltas por juego de neumáticos | 5: "Pirelli puso un límite de 27 vueltas por juego de neumáticos." | [RaceFans, 21/11/2026](https://www.racefans.net/2026/11/21/pirellis-f1-tyres-still-cant-cope-with-losail-maximum-stint-lengths-imposed-again/) ("This year Pirelli has set the limit at 27 laps"), [formula1.com, crónica](https://www.formula1.com/en/latest/article/fp1-antonelli-leads-russell-in-qatar-as-mercedes-control-opening-practice.3v7t8Oja9vAGkic9TxN7FR) |
| La carrera tiene 57 vueltas: el límite obliga a dos paradas | 6: "La carrera tiene 57, así que todos tienen que parar dos veces." | [RaceFans, 21/11/2026](https://www.racefans.net/2026/11/21/pirellis-f1-tyres-still-cant-cope-with-losail-maximum-stint-lengths-imposed-again/) ("as the race is 57 laps long, it will again force drivers to make two pit stops"), [Infobae](https://www.infobae.com/deportes/2026/11/27/franco-colapinto-afrontara-las-primeras-practicas-libres-del-gran-premio-de-qatar-hora-tv-y-todo-lo-que-hay-que-saber/) ("Carrera a 57 vueltas") |
| El ingeniero de carrera de Hamilton (Carlos Santi) le dijo que la degradación fue "mucho más alta de lo esperado en todos los compuestos" | 7: "el desgaste fue mucho más alto de lo esperado, según el ingeniero de Hamilton" | [RaceFans](https://www.racefans.net/2026/11/27/antonelli-quickest-by-half-a-second-on-medium-tyre-compound-in-first-practice/) ("tyre degradation was 'much higher than expected on all compounds'") |
| Cita previa de Colapinto (no de la sesión): "Normalmente es el tipo de pistas donde sufrimos un poco más. Es donde más se muestran nuestras debilidades: el calor, la altísima velocidad, exigir mucho a los neumáticos" | 8: "Colapinto ya lo había avisado: «Es donde más se muestran nuestras debilidades»." | [La Nación, en vivo](https://www.lanacion.com.ar/deportes/automovilismo/franco-colapinto-en-el-gran-premio-de-qatar-de-formula-1-en-vivo-nid27112026/) ("Colapinto hizo un anticipo de lo que le tocará en Qatar") |
| Nunca sumó en Qatar: 2024 abandono sin completar vueltas (con Williams), 0 puntos; 2025 14°, 0 puntos (con Alpine) | 9: "Encima, en Qatar nunca sumó un punto." | [formula1.com, Qatar 2024](https://www.formula1.com/en/results/2024/races/1251/qatar/race-result) ("43 Franco Colapinto COL Williams Mercedes 0 DNF 0"), [formula1.com, Qatar 2025](https://www.formula1.com/en/results/2025/races/1275/qatar/race-result) ("14 43 Franco Colapinto COL Alpine 56 +1 lap 0") |
| Campeonato: Colapinto 12° con 35 puntos | 10: "es 12° en el campeonato, con 35 puntos" | [formula1.com, campeonato de pilotos 2026](https://www.formula1.com/en/results/2026/drivers) ("12 Franco Colapinto COL ARG Alpine 35") |
| Lindblad 11° con 38 (3 más) | 11: "Lindblad, el 11°, tiene 38: tres más." | [formula1.com, campeonato de pilotos 2026](https://www.formula1.com/en/results/2026/drivers) ("11 Arvid Lindblad LIN GBR Racing Bulls 38") |
| Sin sprint. Clasificación sábado 28, 15:00; carrera domingo 29, 13:00 (hora argentina) | 12: "Clasifica el sábado a las tres de la tarde, hora argentina, y corre el domingo a la una." | [Infobae](https://www.infobae.com/deportes/2026/11/27/franco-colapinto-afrontara-las-primeras-practicas-libres-del-gran-premio-de-qatar-hora-tv-y-todo-lo-que-hay-que-saber/) ("Clasificación: 15.00 (Argentina) ... Carrera a 57 vueltas: 13.00 (Argentina)"), [Diario Uno](https://www.diariouno.com.ar/ovacion/automovilismo/franco-colapinto-termino-el-puesto-12-la-primera-practica-libre-del-gran-premio-qatar-n1620526), [formula1.com, Qatar 2026](https://www.formula1.com/en/racing/2026/qatar) |
| (solo placa) Diferencia exacta 0,535 s; 2,192 s; 28 vueltas de Colapinto | placas de los planos 2 y 3 | [Infobae](https://www.infobae.com/deportes/2026/11/27/franco-colapinto-afrontara-las-primeras-practicas-libres-del-gran-premio-de-qatar-hora-tv-y-todo-lo-que-hay-que-saber/), [formula1.com, resultado FP1](https://www.formula1.com/en/results/2026/races/1301/qatar/practice/1) |

Límites y cómo los trata el guion:
- **"Medio segundo"** redondea 0,535 s. La placa lleva la cifra exacta.
- **"El campeón"**: Antonelli ya es campeón 2026 según la lista verificada y RaceFans ("The new world champion"). La voz no
  nombra a Mercedes (va en placa).
- **El desgaste** es lo que dijo un ingeniero en la radio, no una medición: la voz lo atribuye ("según el ingeniero de
  Hamilton"). La placa no lleva comillas en castellano porque la frase original es en inglés y esto es traducción: va
  como paráfrasis con la atribución.
- **La cita de Colapinto** es de antes de la sesión, no sobre la práctica: la voz dice "ya lo había avisado". Se usa un
  fragmento textual sin cambiar palabras. No se usa "No es lo suficientemente fuerte" (es del aro de básquet del jueves).
- **"Nunca sumó en Qatar"**: las tablas oficiales de 2024 y 2025 le dan 0 puntos en las dos. La voz no da detalles de esas carreras (eso ya lo contó `colapinto-qatar-v2`); la placa 9 sí.
- **"Todos tienen que parar dos veces"**: es lo que dice RaceFans ("force drivers to make two pit stops").
- **Hulkenberg (0,028 detrás)**: no entra en la voz ni en placas. Ojo: el título de la idea en `fabrica/estado.json` lo
  menciona ("a 0,028 de Hulkenberg"); los títulos de este guion no.

## Placas por plano

Aparte de los subtítulos. Mayúsculas y signos tal como van. Sin "parte N" en ningún lado. Autos y pilotos genéricos: sin
caras, sin logos, sin sponsors; los nombres de equipos y pilotos en texto plano.

| # | Placa(s) | Cuándo |
|---|---|---|
| 1 | `MISMO AUTO: ALPINE` · `GASLY 10°` · `COLAPINTO 12°` | la primera desde el cuadro 0 (el gancho en mudo, sobre los dos autos iguales); la segunda en "diez."; la tercera en "doce." |
| 2 | `0,535 S ENTRE LOS DOS` · `PRÁCTICA 1 · GP DE QATAR · VIERNES 27/11` | en "segundo" y en "Qatar." |
| 3 | `1° ANTONELLI (MERCEDES) · 1:23.217` · `COLAPINTO A 2,192 S · 28 VUELTAS` | en "Antonelli," y en "segundos." |
| 4 | `EL PROBLEMA DEL DOMINGO: LAS GOMAS` | en "gomas." |
| 5 | `MÁXIMO 27 VUELTAS POR JUEGO` · `REGLA DE PIRELLI` | en "veintisiete" y al final del plano |
| 6 | `CARRERA: 57 VUELTAS` · `= 2 PARADAS OBLIGADAS` | en "cincuenta y siete," y en "dos veces." |
| 7 | `DESGASTE "MUCHO MÁS ALTO DE LO ESPERADO"` · `SEGÚN EL INGENIERO DE HAMILTON (RADIO)` | en "esperado," y en "Hamilton." |
| 8 | `«ES DONDE MÁS SE MUESTRAN NUESTRAS DEBILIDADES»` · `FRANCO COLAPINTO, ANTES DE LA PRÁCTICA` | en "debilidades" y al final del plano |
| 9 | `QATAR 2024: ABANDONO · 0 PUNTOS` · `QATAR 2025: 14° · 0 PUNTOS` | en "Qatar" y en "punto." |
| 10 | `CAMPEONATO: COLAPINTO 12° · 35 PUNTOS` | en "treinta y cinco" |
| 11 | `LINDBLAD 11° · 38 PUNTOS` · `+3` | en "Lindblad," y en "tres más." |
| 12 | `CLASIFICACIÓN: SÁBADO 28 · 15:00 (ARG)` · `CARRERA: DOMINGO 29 · 13:00 (ARG)` | en "tres de la tarde," y en "la una." |
| 13 | `¿QUIÉN TERMINA ADELANTE?` · `COLAPINTO O LINDBLAD` | en "adelante" y en "Lindblad?" |

Nota sobre la placa 7: la frase del ingeniero es traducción del inglés ("much higher than expected"). Si el verificador
prefiere sin comillas, va `DESGASTE MUCHO MÁS ALTO DE LO ESPERADO`, sin cambiar el resto.
Fuentes en pantalla (texto chico, abajo, planos 2 a 12): `FUENTES: FORMULA1.COM, RACEFANS, INFOBAE, LA NACIÓN`.
La tabla de puestos del plano 1 y la columna de puntos de los planos 10 y 11 son esquemas: si se dibujan barras, agregar
`ESQUEMA, NO A ESCALA`.

## Títulos

1. **Colapinto 12° en la primera práctica de Qatar, a medio segundo de Gasly**
2. **27 vueltas por juego de gomas: el problema de Colapinto para el domingo en Qatar**
3. **Colapinto en Qatar: medio segundo detrás de Gasly y tres puntos detrás de Lindblad**

## Descripción de Instagram

```
Mismo Alpine, misma pista: Gasly 10°, Colapinto 12°, medio segundo atrás en la primera práctica de Qatar.

Antonelli fue el más rápido (1:23.217) y Colapinto terminó a 2,192 s, con 28 vueltas.
Para el domingo pesa otra cosa: Pirelli limitó cada juego de neumáticos a 27 vueltas. La carrera tiene 57, así que todos tienen que parar dos veces. Y en la práctica el desgaste fue mucho más alto de lo esperado, según el ingeniero de Hamilton.
Colapinto ya lo había avisado: "Es donde más se muestran nuestras debilidades". En Qatar nunca sumó un punto.
En el campeonato es 12° con 35 puntos. Lindblad, 11°, tiene 38.

Clasificación: sábado 28 a las 15:00. Carrera: domingo 29 a las 13:00 (hora argentina).

¿Quién termina adelante el domingo: Colapinto o Lindblad?

Fuentes: formula1.com, RaceFans, Infobae y La Nación.

#colapinto #formula1 #f1 #gpdeqatar #alpine
```

## Cómo regenerar

```
python3 scripts/voice.py colapinto-fp1-qatar       # voz + tiempos (ElevenLabs)
python3 fabrica/pronunciacion.py oir colapinto-fp1-qatar
scripts/stills.sh colapinto-fp1-qatar
npx tsx scripts/events.ts colapinto-fp1-qatar && python3 scripts/audio.py colapinto-fp1-qatar
scripts/render.sh colapinto-fp1-qatar              # out/colapinto-fp1-qatar/colapinto-fp1-qatar.mp4
scripts/cover.sh colapinto-fp1-qatar               # out/colapinto-fp1-qatar/portada.png
```
