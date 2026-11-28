# Hoy hace 506 años, Magallanes salió al Pacífico (y le puso ese nombre)

Video nuevo (no es continuación de ningún otro: sin "parte N" en voz, placas, portada, títulos ni descripción). Efeméride del
28/11, escrita el sábado 28/11/2026. Video vertical 1080x1920, 30 fps, unos 0:58 a 0:62, 17 planos, sin carteles de capítulo.
Voz: una sola toma. 180 palabras dichas (contadas sobre la parte "dicho" de `parrafos.json`).

- **Inicio:** D contradicción (playbook 1, sección D, la forma de n.º 33 "Es [X]. Y [lo contrario]"): "Magallanes lo llamó
  Pacífico porque el agua estaba en calma. Y en ese mar tan calmo, sus marineros terminaron masticando cuero." Golpe 3, el
  aniversario: "Hoy hace 506 años, el 28 de noviembre de 1520, sus naves salían a ese océano." El "hoy hace" va como golpe 3, no
  como fórmula de apertura. No repite el B11 de `dolares-octubre-3020`, el F52 de `hoy-hace-independiente-juventus-1973` ni el A8 de
  `exportaciones-agro-5717`. La última sección D fue el D31 de `cosecha-record-171`, siete videos atrás. No es "Sos X".
- **Cierre:** Juego n.º 88 Verdadero o falso (playbook 4): "Verdadero o falso: Magallanes completó la vuelta al mundo. Respondé
  abajo, sin buscar." Respuesta (falso) solo en la descripción. Antes, callback al gancho (plano 16: "ese mar del hambre se sigue
  llamando Pacífico"). Primer verdadero o falso del canal. Sin "Seguime", sin elegir entre dos (lo usó `dolares-octubre-3020`), sin
  memoria personal, sin adivinar precio, sin predicción ni continuación.
- **Imagen que abre y cierra:** un océano low-poly liso como un espejo, con la placa `PACÍFICO`. En el plano 2, sobre ese mismo
  mar quieto, una nave chica y un muñeco sin rasgos que mastica una tira marrón (cuero). En el plano 16 vuelve el mismo mar quieto,
  ahora vacío, con la placa `PACÍFICO`.
- **Re-ganchos:** el cuero (0:03), 506 años (0:07), la entrada (0:13), 500 km (0:15), más de un mes (0:21), llora (0:23), la
  traición (0:27), San Antonio (0:28), tres naves (0:34), ya tenía nombre (0:36), 1513 Balboa (0:38), 99 días (0:43), comida (0:46),
  cuero (0:48), callback (0:51), verdadero o falso (0:55). Ningún tramo pasa de 8 s sin dato nuevo.
- **Checks de la skill:** `score.py` da 90 (PASS). Solo avisos blandos que no lee en castellano (números en letras, "pero" como
  giro, CTA en castellano). Cero fallas duras: sin rayas, sin punto y coma, sin oraciones de una palabra, sin "no es X, es Y", sin
  preguntas en el medio.

## Guion final (una línea por plano)

| # | Tiempo | Texto |
|---|--------|-------|
| 1 | 0:00 | Magallanes lo llamó Pacífico porque el agua estaba en calma. |
| 2 | 0:03 | Y en ese mar tan calmo, sus marineros terminaron masticando cuero. |
| 3 | 0:07 | Hoy hace 506 años, el 28 de noviembre de 1520, sus naves salían a ese océano. |
| 4 | 0:13 | Pero primero tuvieron que encontrar la entrada. |
| 5 | 0:15 | El 21 de octubre dan con el paso: un estrecho de 500 kilómetros, lleno de bifurcaciones. |
| 6 | 0:21 | Cruzarlo les lleva más de un mes. |
| 7 | 0:23 | Cuando por fin ve el mar abierto, Magallanes llora de alegría. |
| 8 | 0:27 | Pero ahí llega la traición. |
| 9 | 0:28 | La San Antonio, la nave más grande y mejor provista, da media vuelta, rumbo a España. |
| 10 | 0:34 | Al océano salen solo tres naves. |
| 11 | 0:36 | Y ese mar ya tenía nombre. |
| 12 | 0:38 | En 1513, Vasco Núñez de Balboa lo había descubierto y llamado Mar del Sur. |
| 13 | 0:43 | Según History, la travesía dura 99 días. |
| 14 | 0:46 | Y la comida se acaba. |
| 15 | 0:48 | Para seguir vivos, mastican las partes de cuero de sus equipos. |
| 16 | 0:51 | 506 años después, ese mar del hambre se sigue llamando Pacífico. |
| 17 | 0:55 | Verdadero o falso: Magallanes completó la vuelta al mundo. Respondé abajo, sin buscar. |

Tiempos estimados a unas 3 palabras dichas por segundo (unos 60 s). Los reales salen de `timing.json` después de la voz. Si la
toma pasa de 65 s, el primer plano que se puede recortar es el 4 ("Pero primero tuvieron que encontrar la entrada.").

## PRONUNCIACIÓN A CONFIRMAR

Glosario consultado (`python3 fabrica/pronunciacion.py glosario`, 28/11/2026): ningún término de este video está en el glosario.
Magallanes, San Antonio, Pacífico, España, Vasco Núñez de Balboa y Mar del Sur van en castellano, sin `[dicho|mostrado]`.

- **History** (plano 13): PRONUNCIACIÓN A CONFIRMAR. En `parrafos.json` va `[Jístori,|History,]`. Probar variantes con
  `pronunciacion.py probar` (por ejemplo `Jístori`, `Jístory`, `History`, `Hístori`, `Jistori`) y que se elija la buena. Si ninguna
  suena bien, alternativa sin nombre extranjero en voz: "Según el canal de historia, la travesía dura noventa y nueve días", con
  `HISTORY.COM` solo en placa.

Palabras para mirar en `pronunciacion.py oir`: "Núñez de Balboa", "bifurcaciones", "mil quinientos veinte", "mil quinientos trece".
Todos los números van con `[dicho|mostrado]`.

## Hoja de datos y fuentes

Fuentes leídas en copias bajadas con curl el 28/11/2026 (scratchpad `mag/h.html` y `mag/i.html`).

- History, "Ferdinand Magellan reaches the Pacific | November 28, 1520": https://www.history.com/this-day-in-history/november-28/magellan-reaches-the-pacific
- Infobae (30/10/2020), Claudia Peiró, "A 500 años del paso de Magallanes por el Estrecho": https://www.infobae.com/sociedad/2020/10/30/a-500-anos-del-paso-de-magallanes-por-el-estrecho-como-fue-la-proeza-que-la-argentina-no-conmemoro/

| Dato | Frase del guion | Fuente |
|---|---|---|
| El océano se llamó Pacífico por sus aguas extrañamente calmas (del latín *pacificus*, "tranquilo"); Magallanes lo llamó Pacífico | 1: "Magallanes lo llamó Pacífico porque el agua estaba en calma" | [History](https://www.history.com/this-day-in-history/november-28/magellan-reaches-the-pacific) ("crossing waters so strangely calm that the ocean was named 'Pacific,' from the Latin word pacificus, meaning 'tranquil'"), [Infobae](https://www.infobae.com/sociedad/2020/10/30/a-500-anos-del-paso-de-magallanes-por-el-estrecho-como-fue-la-proeza-que-la-argentina-no-conmemoro/) ("el incierto cruce del océano que Magallanes llamará Pacífico") |
| Al final del cruce los hombres masticaban las partes de cuero de sus equipos para seguir vivos | 2 y 15: "terminaron masticando cuero" / "mastican las partes de cuero de sus equipos" | [History](https://www.history.com/this-day-in-history/november-28/magellan-reaches-the-pacific) ("By the end, the men were out of food and chewed the leather parts of their gear to keep themselves alive") |
| 28 de noviembre de 1520: las naves entran al Pacífico | 3: "el 28 de noviembre de 1520, sus naves salían a ese océano" | [History](https://www.history.com/this-day-in-history/november-28/magellan-reaches-the-pacific) (título "November 28, 1520"), [Infobae](https://www.infobae.com/sociedad/2020/10/30/a-500-anos-del-paso-de-magallanes-por-el-estrecho-como-fue-la-proeza-que-la-argentina-no-conmemoro/) ("El 28 de noviembre inician las tres naves que quedan el incierto cruce del océano") |
| 506 años | 3 y 16: "Hoy hace 506 años" | cuenta propia: 28/11/1520 a 28/11/2026 |
| 21 de octubre de 1520: encuentran el estrecho | 5: "El 21 de octubre dan con el paso" | [History](https://www.history.com/this-day-in-history/november-28/magellan-reaches-the-pacific) ("On October 21, he finally discovered the strait"), [Infobae](https://www.infobae.com/sociedad/2020/10/30/a-500-anos-del-paso-de-magallanes-por-el-estrecho-como-fue-la-proeza-que-la-argentina-no-conmemoro/) ("el 21 de octubre, llegan a cabo Vírgenes") |
| El estrecho mide 500 km y tiene muchas bifurcaciones | 5: "un estrecho de 500 kilómetros, lleno de bifurcaciones" | [Infobae](https://www.infobae.com/sociedad/2020/10/30/a-500-anos-del-paso-de-magallanes-por-el-estrecho-como-fue-la-proeza-que-la-argentina-no-conmemoro/) ("El Estrecho, vale recordar, mide 500 kilómetros y tiene muchas bifurcaciones") |
| El cruce del estrecho: 38 días (History) o 36 (Infobae) | 6: "Cruzarlo les lleva más de un mes" | [History](https://www.history.com/this-day-in-history/november-28/magellan-reaches-the-pacific) ("It took 38 days to navigate the treacherous strait"), [Infobae](https://www.infobae.com/sociedad/2020/10/30/a-500-anos-del-paso-de-magallanes-por-el-estrecho-como-fue-la-proeza-que-la-argentina-no-conmemoro/) ("Les lleva 36 días atravesar el Estrecho") |
| Magallanes lloró de alegría al ver el océano | 7: "Cuando por fin ve el mar abierto, Magallanes llora de alegría" | [History](https://www.history.com/this-day-in-history/november-28/magellan-reaches-the-pacific) ("when ocean was sighted at the other end Magellan wept with joy"), [Infobae](https://www.infobae.com/sociedad/2020/10/30/a-500-anos-del-paso-de-magallanes-por-el-estrecho-como-fue-la-proeza-que-la-argentina-no-conmemoro/) (Pigafetta: "El Capitano Generale lacrimó per allegrezza") |
| La San Antonio, la nave más grande, la mejor y la más provista, desertó y emprendió el regreso a España | 8 y 9: "Pero ahí llega la traición" / "La San Antonio, la nave más grande y mejor provista, da media vuelta, rumbo a España" | [Infobae](https://www.infobae.com/sociedad/2020/10/30/a-500-anos-del-paso-de-magallanes-por-el-estrecho-como-fue-la-proeza-que-la-argentina-no-conmemoro/) ("Pero entonces, una puñalada: la San Antonio, la nave más grande, la mejor y la más provista, ha desertado y, dando media vuelta, emprende el regreso a España"). History lo confirma sin nombre: "another deserted" |
| Al Pacífico salen tres naves | 10: "Al océano salen solo tres naves" | [History](https://www.history.com/this-day-in-history/november-28/magellan-reaches-the-pacific) ("enters the Pacific Ocean with three ships"), [Infobae](https://www.infobae.com/sociedad/2020/10/30/a-500-anos-del-paso-de-magallanes-por-el-estrecho-como-fue-la-proeza-que-la-argentina-no-conmemoro/) ("las tres naves que quedan") |
| En 1513 Vasco Núñez de Balboa había descubierto el Pacífico y lo llamó Mar del Sur | 11 y 12: "Y ese mar ya tenía nombre" / "En 1513, Vasco Núñez de Balboa lo había descubierto y llamado Mar del Sur" | [Infobae](https://www.infobae.com/sociedad/2020/10/30/a-500-anos-del-paso-de-magallanes-por-el-estrecho-como-fue-la-proeza-que-la-argentina-no-conmemoro/) ("En 1513, Vasco Núñez de Balboa había descubierto el Pacífico, que llamó Mar del Sur") |
| La travesía del océano duró 99 días (según History) | 13: "Según History, la travesía dura 99 días" | [History](https://www.history.com/this-day-in-history/november-28/magellan-reaches-the-pacific) ("His fleet accomplished the westward crossing of the ocean in 99 days") |
| Se quedaron sin comida | 14: "Y la comida se acaba" | [History](https://www.history.com/this-day-in-history/november-28/magellan-reaches-the-pacific) ("the men were out of food"), [Infobae](https://www.infobae.com/sociedad/2020/10/30/a-500-anos-del-paso-de-magallanes-por-el-estrecho-como-fue-la-proeza-que-la-argentina-no-conmemoro/) ("con los víveres agotados") |
| Magallanes no completó la vuelta: murió en las Filipinas en 1521 (Mactan, 27/4/1521, según History); la terminó la nave Victoria en 1522 | 17 (respuesta solo en la descripción) | [History](https://www.history.com/this-day-in-history/november-28/magellan-reaches-the-pacific) ("In fighting on April 27, Magellan was hit by a poisoned arrow"; la Vittoria llegó a Sanlúcar el 6/9/1522), [Infobae](https://www.infobae.com/sociedad/2020/10/30/a-500-anos-del-paso-de-magallanes-por-el-estrecho-como-fue-la-proeza-que-la-argentina-no-conmemoro/) ("Magallanes encontró la muerte en una de esas islas"; la nao Victoria, "la única de las cinco embarcaciones" que regresa) |

Límites y cómo los trata el guion:
- **Días del estrecho:** 38 (History) contra 36 (Infobae). La voz dice "más de un mes" y la placa `MÁS DE UN MES`, sin cifra.
- **Días del océano:** History dice 99. Infobae da "cien días" (cita de Zweig) y también "tres meses y 20 días", que no coinciden
  entre sí. Por eso el 99 va atribuido a History en voz y placa.
- **El cuero:** solo History (el "comiéndose hasta la suela de los zapatos" de Infobae no se usa para no sumar otro nombre en voz).
  El plano 15 lo dice con las palabras de History ("las partes de cuero de sus equipos").
- **Orden del plano 7 al 9:** Infobae cuenta que primero ven el mar y lloran, y "entonces" se enteran de la deserción. El guion
  respeta ese orden. No se dice si la San Antonio llegó a España (las fuentes dicen "emprende el regreso"): "rumbo a España".
- **"Descubierto" (plano 12):** palabra de Infobae, desde la mirada europea. No se agrega nada sobre los pueblos que ya vivían allí.
- Quedaron afuera: cantidad de hombres (270 según History, 265 o 250 según Infobae: no coinciden), motín de San Julián, Guam y
  Filipinas, Elcano, los 18 que volvieron, Pigafetta y Zweig (nombres extranjeros), la conmemoración de 2020.

## Placas por plano

Aparte de los subtítulos. Mayúsculas y signos tal como van. Sin "parte N" en ningún lado.

| # | Placa(s) | Cuándo |
|---|---|---|
| 1 | `PACÍFICO` · `"TRANQUILO", EN LATÍN` | la primera desde el cuadro 0, la segunda en "calma." |
| 2 | `MASTICARON CUERO` | en "cuero." |
| 3 | `28 DE NOVIEMBRE DE 1520` · `HOY HACE 506 AÑOS` | en "28" y en "506" |
| 4 | (sin placa) | |
| 5 | `21 DE OCTUBRE` · `ESTRECHO: 500 KM` | en "21" y en "500" |
| 6 | `MÁS DE UN MES` | en "mes." |
| 7 | `FERNANDO DE MAGALLANES` | en "Magallanes" (placa con nombre sobre el muñeco) |
| 8 | (sin placa) | |
| 9 | `SAN ANTONIO` · `LA MÁS GRANDE Y MEJOR PROVISTA` · `RUMBO A ESPAÑA` | en "Antonio,", en "provista," y en "España." |
| 10 | `3 NAVES` | en "tres" |
| 11 | (sin placa) | |
| 12 | `1513` · `VASCO NÚÑEZ DE BALBOA` · `"MAR DEL SUR"` | en "1513,", en "Balboa" y en "Sur." |
| 13 | `99 DÍAS` · `SEGÚN HISTORY.COM` | en "99" y al final del plano |
| 14 | `SIN COMIDA` | en "acaba." |
| 15 | `CUERO DE SUS EQUIPOS` | en "cuero" |
| 16 | `PACÍFICO` | en "Pacífico." |
| 17 | `¿VERDADERO O FALSO?` · `MAGALLANES COMPLETÓ LA VUELTA AL MUNDO` · `RESPONDÉ SIN BUSCAR` | en "Verdadero", en "mundo." y en "buscar." |

Fuentes en pantalla (texto chico, abajo, planos 3 a 16): `FUENTES: HISTORY.COM · INFOBAE (30/10/2020)`.
Personas: muñecos low-poly genéricos, sin rasgos, sin caras. Magallanes (plano 7) y Balboa (plano 12) solo con placa de nombre.
Naves: carabelas genéricas de madera, sin escudos ni banderas reales; en el plano 9 una se separa y gira hacia atrás; en el plano
10 quedan tres. Marcas: ninguna; History e Infobae solo en texto plano, sin logos. Mapa del estrecho (plano 5): esquema simple, sin
pretender exactitud.

## Títulos

1. **Hoy hace 506 años, Magallanes salió al Pacífico (y le puso ese nombre)**
2. **Lo llamó Pacífico por la calma, y sus marineros terminaron masticando cuero**
3. **28 de noviembre de 1520: el día que Magallanes salió del estrecho al Pacífico**

## Descripción de Instagram

```
Magallanes lo llamó Pacífico porque el agua estaba en calma. Y en ese mar, sus marineros terminaron masticando cuero.

Hoy hace 506 años, el 28 de noviembre de 1520, las naves de Magallanes salieron del estrecho al océano. Lo habían encontrado el 21 de octubre: un paso de 500 kilómetros, lleno de bifurcaciones, que les llevó más de un mes cruzar.
En el camino, la San Antonio, la nave más grande y mejor provista, desertó y emprendió el regreso a España. Al océano salieron solo tres.
Ese mar ya tenía nombre: en 1513, Vasco Núñez de Balboa lo había llamado Mar del Sur.
Según History, la travesía duró 99 días. Sin comida, los hombres masticaban las partes de cuero de sus equipos para seguir vivos.

Verdadero o falso: Magallanes completó la vuelta al mundo. Respondé abajo, sin buscar.
Respuesta: falso. Murió en 1521 en las Filipinas. La vuelta la terminó la nave Victoria, en 1522.

Fuentes: History.com e Infobae (30/10/2020).

#historia #magallanes #efemerides #oceanopacifico #navegacion
```
