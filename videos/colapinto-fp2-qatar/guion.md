# Colapinto en la segunda práctica de Qatar: «Corre como si fuera domingo», 15° y Sainz enojado

Video nuevo, noticia del viernes 27/11/2026 (pedido del dueño después de la práctica 2). Video suelto: no es continuación de
`colapinto-fp1-qatar` ni de `colapinto-qatar-v2`, y no lleva "parte N" en voz, placas, portada, títulos ni descripción.
Vertical 1080x1920, 30 fps, 13 planos, 180 palabras dichas (contadas sobre la parte "dicho" de `parrafos.json`): unos
57 a 60 s a 3 palabras por segundo. Los tiempos reales salen de `timing.json` después de la voz.

Se centra en Colapinto. El otro video del viernes, `fp2-qatar-general`, cuenta las dos rojas, los 13 minutos extra y el top 10:
acá Gasly y su roja aparecen solo en un plano, como lo que le cortó la vuelta con blandas a Colapinto, y no se nombran
Leclerc, Briatore, los minutos extra ni Mercedes.

- **Inicio:** J91 cita real y corta, con autor (playbook sección 1.J): "«Corre como si fuera domingo». Carlos Sainz lo dijo de
  Colapinto". Golpe 2, la escena (la pasada por adentro en la curva 1). Golpe 3, el "Oh, wow" de Russell. No es "Sos X".
  Los dos últimos de `hooks_used.json` son F53 (`libertadores-plata-final`) y D31 (`cosecha-record-171`); el último J91 fue
  `rockstar-sindicato-no`, hace ocho videos. `fp2-qatar-general` abre con G63 (un tiempo). No repite el A8 de
  `colapinto-fp1-qatar` (diferencia entre dos pilotos) ni el B11 de `colapinto-qatar-v2` (fecha y hora del domingo).
- **Cierre:** playbook 4 n.º 67 "¿Vos qué hubieras hecho en su lugar?", adaptado: "En una práctica, ¿vos te tirabas por
  adentro? Contalo abajo." Antes, callback a la cita del gancho con la clasificación ("El sábado a las tres de la tarde
  clasifican. Ahí sí, todos corren como si fuera domingo."). Sin "Seguime", sin elegir entre dos pilotos (era el de
  `colapinto-fp1-qatar`), sin pedir un número (era el de `colapinto-qatar-v2` y el de `fp2-qatar-general`).
- **Imagen que abre y cierra:** un almanaque de escritorio en la hoja "VIERNES" con la cita encima (plano 1). En el plano 12 la
  hoja pasa a "SÁBADO" y en el 12-13 vuelve la frase "como si fuera domingo".
- **Re-ganchos:** la curva 1 (0:05), "casi se tocan" y la radio de Russell (0:10), "un par de viernes" (0:13), "Puede ser" (0:17),
  "Pero" el 15° (0:20), los frenos (0:26), la roja de Gasly (0:32), las 14 vueltas (0:36), Sainz 16° (0:40), el salto a Las Vegas
  (0:45), la clasificación (0:51), la pregunta (0:56). Ningún tramo de más de 6 s sin dato nuevo.
- **Checker de la skill:** 90/100, cero fallas graves. Los dos avisos leves son del lector en inglés (no reconoce números
  escritos con letras ni "Contalo abajo" como pedido final).
- **Si la toma pasa de 60 s:** el plano 10 (Sainz 16°) es el primero que se puede sacar; después, el plano 5 ("Puede ser"), que
  pasa a la descripción.
- **Fechas:** el guion no dice "hoy" ni "mañana". Si se publica después de la clasificación del sábado 28 (15:00), el plano 12
  queda viejo y hay que revisarlo.

## Guion final (una línea por plano)

| # | Tiempo aprox. | Frase |
|---|---|---|
| 1 | 0:00 | «Corre como si fuera domingo». Carlos Sainz lo dijo de Colapinto, después de la segunda práctica de Qatar. |
| 2 | 0:05 | En la curva 1, Colapinto se le tiró por adentro y lo pasó. |
| 3 | 0:10 | Casi se tocan, y atrás Russell soltó por radio: «Oh, wow». |
| 4 | 0:13 | Sainz dijo que ya van un par de viernes así. |
| 5 | 0:17 | Le preguntaron si va a hablar con él. Contestó: «Puede ser». |
| 6 | 0:20 | Pero en la tabla terminó en el puesto 15, a más de dos segundos y medio del primero. |
| 7 | 0:26 | Tuvo problemas de frenos, y su vuelta con gomas blandas, las más rápidas, quedó a medias. |
| 8 | 0:32 | La cortó la bandera roja de Gasly, su compañero, enterrado en la leca. |
| 9 | 0:36 | Gasly dio apenas 14 vueltas, y aun así terminó casi un segundo adelante. |
| 10 | 0:40 | Y Sainz, el que se quejó, quedó justo atrás, en el puesto 16. |
| 11 | 0:45 | El viernes anterior, en Las Vegas, el enojado era Colapinto, que pidió por radio: «Lo tienen que penalizar». |
| 12 | 0:51 | El sábado a las tres de la tarde clasifican. Ahí sí, todos corren como si fuera domingo. |
| 13 | 0:56 | En una práctica, ¿vos te tirabas por adentro? Contalo abajo. |

## PRONUNCIACIÓN A CONFIRMAR

Glosario consultado (`python3 fabrica/pronunciacion.py glosario`, 27/11/2026). Están y se usan con la forma exacta: **Gasly**
`[Gaslý|Gasly]` (probada), **Qatar** `[Qatar|Qatar]` (probada). **Alpine** `[Alpín|Alpine]` (confirmada) no se dice en este
guion: va solo en placa. **Antonelli** no se dice (va en placa). Los que faltan llevan una forma propuesta en `parrafos.json`;
el productor genera variantes numeradas para que se elija de oído.

| Término | Estado | Forma escrita en `parrafos.json` | Variantes para probar |
|---|---|---|---|
| Sainz | PRONUNCIACIÓN A CONFIRMAR | `[Sáinz|Sainz]` (planos 1, 4, 10) | Sáinz · Sainz · Sáins · Sainz (con zeta española) |
| Russell | PRONUNCIACIÓN A CONFIRMAR (`fp2-qatar-general` usa `Rásel`; sigue sin glosario) | `[Rásel|Russell]` (plano 3) | Rásel · Rósel · Russell · Rúsel |
| Oh, wow | PRONUNCIACIÓN A CONFIRMAR | `[Ou, uáu|Oh, wow]` (plano 3) | Ou, uáu · Oh, guau · Oh, wow · Óu, uáo |
| Colapinto | castellano, sin corchetes | — | control: que no diga "Colapínto" |
| Las Vegas | castellano, sin corchetes | — | — |
| Piastri, Briatore | no se dicen ni van en placa | — | — |

Números: con `[dicho|mostrado]` (1, 15, 14, 16). "Dos segundos y medio", "casi un segundo" y "las tres de la tarde" se dicen
y se muestran igual; la cifra exacta va en placa.

## Hoja de datos y fuentes

Todo sale de `fabrica/investigacion/fp2-qatar-2026.md`, secciones "Colapinto" y "Lo que viene", releído en las páginas bajadas
con curl el 27/11/2026 (scratchpad `dlfp2/`; las notas de Infobae y TN sobre Sainz y el en vivo de La Nación se volvieron a
bajar en `dlsainz/` para chequear las citas).

| Dato | Frase del guion | Fuente |
|---|---|---|
| Sainz: "Corre como si fuera domingo" (coincide en las tres traducciones) | 1: "«Corre como si fuera domingo». Carlos Sainz lo dijo de Colapinto" | [Infobae](https://www.infobae.com/deportes/2026/11/27/carlos-sainz-se-enojo-por-una-maniobra-de-franco-colapinto-lo-critico-y-advirtio-quizas-tenga-que-hablar-con-el/) ("Corre como si fuera domingo, pero bueno..."), [TN](https://tn.com.ar/deportes/formula-1/2026/11/27/carlos-sainz-critico-a-franco-colapinto-tras-una-ajustada-maniobra-en-la-la-segunda-practica-en-qatar-no-entiendo-que-hace/) ("Corre como si fuera domingo"), [TyC Sports](https://www.tycsports.com/automovilismo/sainz-enojado-con-colapinto-tras-un-cruce-en-qatar-voy-a-tener-que-hablar-con-el-f1-formula-1--id773315.html) ("porque corre como si fuera domingo") |
| Fue en la segunda práctica del GP de Qatar, viernes 27/11 | 1: "después de la segunda práctica de Qatar" | [formula1.com, crónica FP2](https://www.formula1.com/en/latest/article/fp2-antonelli-tops-extended-second-practice-from-russell-and-norris-in-qatar.6jAa2kcIAVqOPHW30oipfm), [Infobae](https://www.infobae.com/deportes/2026/11/27/carlos-sainz-se-enojo-por-una-maniobra-de-franco-colapinto-lo-critico-y-advirtio-quizas-tenga-que-hablar-con-el/) |
| Pasada a Sainz por adentro en la curva 1, en un tren de tres autos | 2: "En la curva 1, Colapinto se le tiró por adentro y lo pasó." | [Infobae](https://www.infobae.com/deportes/2026/11/27/carlos-sainz-se-enojo-por-una-maniobra-de-franco-colapinto-lo-critico-y-advirtio-quizas-tenga-que-hablar-con-el/) ("se lanzó por el interior en la curva uno para superar al Williams"), [RaceFans](https://www.racefans.net/2026/11/27/antonelli-leads-another-mercedes-one-two-despite-red-flag-interruptions/) ("near-miss with Carlos Sainz Jnr at turn one") |
| Casi se tocan (no "se tocaron": solo TyC habla de toque) | 3: "Casi se tocan" | [La Nación, en vivo](https://www.lanacion.com.ar/deportes/automovilismo/franco-colapinto-en-el-gran-premio-de-qatar-de-formula-1-en-vivo-nid27112026-2/) ("¡y casi se tocan!"), [RaceFans](https://www.racefans.net/2026/11/27/antonelli-leads-another-mercedes-one-two-despite-red-flag-interruptions/) ("near-miss") |
| Russell, detrás de los dos, por radio: "Oh, wow" | 3: "atrás Russell soltó por radio: «Oh, wow»" | [formula1.com, crónica FP2](https://www.formula1.com/en/latest/article/fp2-antonelli-tops-extended-second-practice-from-russell-and-norris-in-qatar.6jAa2kcIAVqOPHW30oipfm) ("'Oh wow,' Russell – running behind the pair – commented over the radio"), [Infobae](https://www.infobae.com/deportes/2026/11/27/carlos-sainz-se-enojo-por-una-maniobra-de-franco-colapinto-lo-critico-y-advirtio-quizas-tenga-que-hablar-con-el/), [La Nación, en vivo](https://www.lanacion.com.ar/deportes/automovilismo/franco-colapinto-en-el-gran-premio-de-qatar-de-formula-1-en-vivo-nid27112026-2/) |
| Sainz: "Ya van un par de viernes" (coincide en las tres) | 4: "Sainz dijo que ya van un par de viernes así." | [Infobae](https://www.infobae.com/deportes/2026/11/27/carlos-sainz-se-enojo-por-una-maniobra-de-franco-colapinto-lo-critico-y-advirtio-quizas-tenga-que-hablar-con-el/), [TN](https://tn.com.ar/deportes/formula-1/2026/11/27/carlos-sainz-critico-a-franco-colapinto-tras-una-ajustada-maniobra-en-la-la-segunda-practica-en-qatar-no-entiendo-que-hace/), [TyC Sports](https://www.tycsports.com/automovilismo/sainz-enojado-con-colapinto-tras-un-cruce-en-qatar-voy-a-tener-que-hablar-con-el-f1-formula-1--id773315.html) |
| ¿Va a hablar con él? "Puede ser" (coincide en las tres) | 5: "Contestó: «Puede ser»." | [Infobae](https://www.infobae.com/deportes/2026/11/27/carlos-sainz-se-enojo-por-una-maniobra-de-franco-colapinto-lo-critico-y-advirtio-quizas-tenga-que-hablar-con-el/), [TN](https://tn.com.ar/deportes/formula-1/2026/11/27/carlos-sainz-critico-a-franco-colapinto-tras-una-ajustada-maniobra-en-la-la-segunda-practica-en-qatar-no-entiendo-que-hace/), [TyC Sports](https://www.tycsports.com/automovilismo/sainz-enojado-con-colapinto-tras-un-cruce-en-qatar-voy-a-tener-que-hablar-con-el-f1-formula-1--id773315.html) ("Puede ser que tenga que hablar con él") |
| Colapinto 15°, 1:25.733, +2.656 de Antonelli (1°, 1:23.077) | 6: "terminó en el puesto 15, a más de dos segundos y medio del primero" | [formula1.com, resultado FP2](https://www.formula1.com/en/results/2026/races/1301/qatar/practice/2), [RaceFans](https://www.racefans.net/2026/11/27/antonelli-leads-another-mercedes-one-two-despite-red-flag-interruptions/) ("15 43 Franco Colapinto Alpine-Mercedes A526 1'25.733 2.656"), [La Nación, en vivo](https://www.lanacion.com.ar/deportes/automovilismo/franco-colapinto-en-el-gran-premio-de-qatar-de-formula-1-en-vivo-nid27112026-2/) |
| Le trabajaron los frenos durante la sesión; "Tuvimos problemas con los frenos" | 7: "Tuvo problemas de frenos" | [La Nación, en vivo](https://www.lanacion.com.ar/deportes/automovilismo/franco-colapinto-en-el-gran-premio-de-qatar-de-formula-1-en-vivo-nid27112026-2/), [Infobae](https://www.infobae.com/deportes/2026/11/27/carlos-sainz-se-enojo-por-una-maniobra-de-franco-colapinto-lo-critico-y-advirtio-quizas-tenga-que-hablar-con-el/) ("Los mecánicos de Alpine trabajaron sobre los frenos"), [TyC Sports](https://www.tycsports.com/automovilismo/colapinto-disconforme-post-practicas-gp-de-catar-id773206.html) |
| No completó vuelta con blandos por la roja de Gasly; el blando es el compuesto más rápido | 7-8: "su vuelta con gomas blandas, las más rápidas, quedó a medias. La cortó la bandera roja de Gasly" | [Infobae](https://www.infobae.com/deportes/2026/11/27/carlos-sainz-se-enojo-por-una-maniobra-de-franco-colapinto-lo-critico-y-advirtio-quizas-tenga-que-hablar-con-el/) ("no registró una vuelta rápida con neumáticos blandos, ya que debió abortar ese intento por el incidente de Gasly"), [TyC Sports](https://www.tycsports.com/automovilismo/el-despiste-de-pierre-gasly-en-el-gp-de-qatar-que-obligo-a-detener-la-practica-y-la-reaccion-de-briatore-id773202.html), [La Nación, en vivo](https://www.lanacion.com.ar/deportes/automovilismo/franco-colapinto-en-el-gran-premio-de-qatar-de-formula-1-en-vivo-nid27112026-2/) ("gomas blandas, el compuesto más rápido") |
| Gasly, compañero en Alpine, enterrado en la leca (roja 2) | 8: "Gasly, su compañero, enterrado en la leca" | [formula1.com, crónica FP2](https://www.formula1.com/en/latest/article/fp2-antonelli-tops-extended-second-practice-from-russell-and-norris-in-qatar.6jAa2kcIAVqOPHW30oipfm), [RaceFans](https://www.racefans.net/2026/11/27/antonelli-leads-another-mercedes-one-two-despite-red-flag-interruptions/), [TyC Sports](https://www.tycsports.com/automovilismo/el-despiste-de-pierre-gasly-en-el-gp-de-qatar-que-obligo-a-detener-la-practica-y-la-reaccion-de-briatore-id773202.html) |
| Gasly 12°, 1:24.764, 14 vueltas; 0,969 s adelante de Colapinto | 9: "Gasly dio apenas 14 vueltas, y aun así terminó casi un segundo adelante." | [formula1.com, resultado FP2](https://www.formula1.com/en/results/2026/races/1301/qatar/practice/2) ("Gasly GAS Alpine +1.687s 14"), [Infobae](https://www.infobae.com/deportes/2026/11/27/carlos-sainz-se-enojo-por-una-maniobra-de-franco-colapinto-lo-critico-y-advirtio-quizas-tenga-que-hablar-con-el/) ("una diferencia de 0.969 segundos entre ambos"), [RaceFans](https://www.racefans.net/2026/11/27/antonelli-leads-another-mercedes-one-two-despite-red-flag-interruptions/) |
| Sainz 16°, 1:25.839, justo detrás de Colapinto | 10: "Y Sainz, el que se quejó, quedó justo atrás, en el puesto 16." | [formula1.com, resultado FP2](https://www.formula1.com/en/results/2026/races/1301/qatar/practice/2) ("16 55 Carlos Sainz SAI Williams +2.762s"), [RaceFans](https://www.racefans.net/2026/11/27/antonelli-leads-another-mercedes-one-two-despite-red-flag-interruptions/), [Infobae](https://www.infobae.com/deportes/2026/11/27/carlos-sainz-se-enojo-por-una-maniobra-de-franco-colapinto-lo-critico-y-advirtio-quizas-tenga-que-hablar-con-el/) ("una posición detrás del argentino") |
| Las Vegas, FP3 del viernes 20/11: dos cruces con Sainz; Colapinto por radio: "Lo tienen que penalizar" | 11: "El viernes anterior, en Las Vegas, el enojado era Colapinto, que pidió por radio: «Lo tienen que penalizar»." | [Infobae, 21/11](https://www.infobae.com/deportes/2026/11/21/la-ira-de-franco-colapinto-contra-carlos-sainz-durante-la-fp3-del-gran-premio-de-las-vegas-lo-tienen-que-penalizar/), [TN, 20/11](https://tn.com.ar/deportes/formula-1/2026/11/20/lo-tienen-que-penalizar-el-enojo-de-franco-colapinto-con-carlos-sainz-tras-dos-cruces-en-la-pista-durante-la-tercera-practica/) |
| Clasificación sábado 28 a las 15:00, hora argentina (FP3 11:30; carrera domingo 29, 13:00) | 12: "El sábado a las tres de la tarde clasifican." | [La Nación, horarios](https://www.lanacion.com.ar/deportes/automovilismo/a-que-hora-de-argentina-son-las-practicas-qualy-y-carrera-del-gran-premio-de-qatar-de-la-f1-nid26112026/) ("Sábado 28 de noviembre ... Clasificación: 15"), [TN](https://tn.com.ar/deportes/formula-1/2026/11/27/carlos-sainz-critico-a-franco-colapinto-tras-una-ajustada-maniobra-en-la-la-segunda-practica-en-qatar-no-entiendo-que-hace/), [formula1.com, horarios](https://www.formula1.com/en/latest/article/formula-1-qatar-airways-qatar-grand-prix-2026.3XJyoYSnpJEcuZovstTdcG) (hora local, +6) |
| (solo placa) Colapinto 31 vueltas | placa del plano 9 | [formula1.com, resultado FP2](https://www.formula1.com/en/results/2026/races/1301/qatar/practice/2) ("Colapinto COL Alpine +2.656s 31"). Una sola fuente, la tabla oficial: va solo en placa, nunca en voz ni título |

Límites y cómo los trata el guion:
- **"Casi se tocan"**, nunca "se tocaron": solo TyC dice que hubo toque de ruedas; La Nación y RaceFans dicen que casi.
- **Citas de Sainz:** solo lo que coincide en Infobae, TN y TyC ("Corre como si fuera domingo", "un par de viernes", "Puede
  ser"). "Supongo que es joven" quedó afuera: Infobae dice "supongo que simplemente es joven", TN "supongo que es joven" y TyC
  "supongo que es cosa de la juventud", así que no hay una forma textual común. Tampoco se usa "No entiendo qué hace los
  viernes" (Infobae: "qué está haciendo"). La frase de Sainz es traducción (la dijo a Motorsport, según Infobae y TN), por eso
  no va con su nombre en un título como cita.
- **"Más de dos segundos y medio"** redondea 2,656 s; **"casi un segundo"** redondea 0,969 s. Las placas llevan las cifras exactas.
- **"Su vuelta con gomas blandas quedó a medias"**: Infobae dice que abortó ese intento por la roja de Gasly. No se dice cuántas
  vueltas dio Colapinto en voz (31 es una sola fuente; las 56 entre las dos prácticas de Infobae no se usan).
- **"Discos y frenos delanteros"** es solo de La Nación: la voz dice "problemas de frenos" y la placa cita a Colapinto.
- **"Ahí sí, todos corren como si fuera domingo"** es el remate del guion, no una cita: en la placa va sin comillas.
- **Las Vegas:** la voz dice "el viernes anterior" (FP3 del 20/11, viernes), sin "hace una semana".
- **No se usa:** "esperaba estar 17-19" (es de Sainz, mal atribuido por TyC), "FP1 fue un poco mejor..." (una sola fuente), la
  frase de Gasly sobre la temperatura, Briatore, el campeonato, la defensa con Piastri.

## Placas por plano

Aparte de los subtítulos. Mayúsculas y signos tal como van. Sin "parte N" en ningún lado. Autos y pilotos genéricos: sin caras,
sin logos, sin sponsors; equipos y pilotos en texto plano.

| # | Placa(s) | Cuándo |
|---|---|---|
| 1 | `«CORRE COMO SI FUERA DOMINGO»` · `CARLOS SAINZ, SOBRE COLAPINTO` · `PRÁCTICA 2 · GP DE QATAR · VIERNES 27/11` | la primera desde el cuadro 0 (gancho en mudo, sobre el almanaque en "VIERNES"); la segunda en "Colapinto,"; la tercera en "Qatar." |
| 2 | `CURVA 1` · `COLAPINTO (ALPINE) POR ADENTRO` | en "uno," y en "adentro" |
| 3 | `CASI SE TOCAN` · `GEORGE RUSSELL, POR RADIO: «OH, WOW»` | en "tocan," y en "wow" |
| 4 | `SAINZ (WILLIAMS): «YA VAN UN PAR DE VIERNES»` | en "viernes" |
| 5 | `¿VA A HABLAR CON ÉL?` · `«PUEDE SER»` | en "él." y en "ser" |
| 6 | `COLAPINTO 15° · 1:25.733` · `A 2,656 S DE ANTONELLI (1°)` | en "quince," y en "primero." |
| 7 | `«TUVIMOS PROBLEMAS CON LOS FRENOS»` · `SIN VUELTA CON BLANDAS` | en "frenos," y en "medias." |
| 8 | `BANDERA ROJA: GASLY EN LA LECA` | en "roja" |
| 9 | `GASLY: 14 VUELTAS · 12° · 1:24.764` · `COLAPINTO: 31 VUELTAS · 15° · A 0,969 S` | en "catorce" y en "adelante." |
| 10 | `SAINZ 16° · 1:25.839` | en "dieciséis." |
| 11 | `LAS VEGAS · PRÁCTICA 3 · VIERNES 20/11` · `COLAPINTO, POR RADIO: «LO TIENEN QUE PENALIZAR»` | en "Vegas," y en "penalizar" |
| 12 | `CLASIFICACIÓN: SÁBADO 28 · 15:00 (ARG)` · `COMO SI FUERA DOMINGO` | en "tres de la tarde" (el almanaque pasa a "SÁBADO") y en "domingo." |
| 13 | `¿VOS TE TIRABAS POR ADENTRO?` | en "adentro?" |

Fuentes en pantalla (texto chico, abajo, planos 1 a 12): `FUENTES: FORMULA1.COM, RACEFANS, INFOBAE, TN, TYC SPORTS, LA NACIÓN`.
Nota sobre las placas 1, 3, 4, 5 y 11: son citas traducidas o dichas por radio; si el verificador prefiere sin comillas
angulares en la de Russell (plano 3), va `GEORGE RUSSELL, POR RADIO: OH, WOW`, sin cambiar el resto. La tabla del plano 9 es
un esquema: si se dibujan barras, agregar `ESQUEMA, NO A ESCALA`.

## Títulos

1. **Sainz, enojado con Colapinto después de la segunda práctica de Qatar**
2. **Colapinto pasó a Sainz por adentro, casi se tocan y terminó 15° en la segunda práctica de Qatar**
3. **Frenos, una roja y Sainz enojado: el viernes de Colapinto en Qatar**

## Descripción de Instagram

```
"Corre como si fuera domingo": así habló Carlos Sainz de Colapinto después de la segunda práctica de Qatar.

En la curva 1, Colapinto se le tiró por adentro y casi se tocan. Atrás venía Russell, que soltó por radio: "Oh, wow".
Sainz dijo que ya van un par de viernes así. ¿Va a hablar con él? "Puede ser".
En la tabla, Colapinto terminó 15°, a 2,656 s de Antonelli. Tuvo problemas de frenos y no pudo cerrar su vuelta con gomas blandas por la bandera roja de Gasly, que con solo 14 vueltas terminó 0,969 s adelante. Sainz quedó 16°.
El viernes anterior, en Las Vegas, el enojado era Colapinto: "Lo tienen que penalizar".

Clasificación: sábado 28 a las 15:00 (hora argentina).

En una práctica, ¿vos te tirabas por adentro? Contalo abajo.

Fuentes: formula1.com, RaceFans, Infobae, TN, TyC Sports y La Nación.

#colapinto #formula1 #f1 #gpdeqatar #sainz
```

## Cómo regenerar

```
python3 scripts/voice.py colapinto-fp2-qatar       # voz + tiempos (ElevenLabs)
python3 fabrica/pronunciacion.py oir colapinto-fp2-qatar
scripts/stills.sh colapinto-fp2-qatar
npx tsx scripts/events.ts colapinto-fp2-qatar && python3 scripts/audio.py colapinto-fp2-qatar
scripts/render.sh colapinto-fp2-qatar              # out/colapinto-fp2-qatar/colapinto-fp2-qatar.mp4
scripts/cover.sh colapinto-fp2-qatar               # out/colapinto-fp2-qatar/portada.png
```
