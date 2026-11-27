# Lo que tenés en la mano tiene domicilio: cinco ciudades que hacen tus cosas

Video nuevo, pedido directo del dueño (27/11/2026, "Pedido del dueño 14:50" en `fabrica/candidatos/2026-11-27.md`). No es
continuación de nada: sin "parte N" en voz, placas, portada, títulos ni descripción. Formato inspirado en el reel de
@induscoreig (`fabrica/referencias.md`), con ángulo, orden, ciudades y frases propias: ese reel recorría San Nicolás, el litio,
Tucumán, Chaco, el vino y la minería. Acá no se repite ninguna parada.
Video vertical 1080x1920, 30 fps, unos 0:64 a 0:68, 17 planos, sin carteles de capítulo. Voz: Juanma (ElevenLabs), una sola toma.
200 palabras dichas (contadas sobre la parte "dicho" de `parrafos.json`).

- **Ángulo:** cada parada arranca por un objeto cotidiano (celular, lata, caramelo, aceite, la señal que te pasa por arriba) y
  termina en la ciudad que lo hace, con un número grande en placa.
- **Paradas (5):** Río Grande (Tierra del Fuego), Puerto Madryn, Arroyito, Gran Rosario, Bariloche. Quedaron afuera Mar del Plata
  (49% de los desembarques: entraba como sexta, pero llevaba el video a 75 s), Campana (su cifra es un año, 1954, y el dato de
  producción tiene una sola fuente) y Tucumán (la usó el reel de referencia).
- **Inicio:** H76 una orden de mirar algo (sección H del playbook, "Mirá el número de abajo a la derecha"), aplicada al objeto que
  el espectador tiene en la mano: "Mirá el celular en el que ves esto." Golpe 2, el dato enorme (9 de cada 10, Tierra del Fuego).
  Golpe 3, la promesa: "Lo que tenés en la mano tiene domicilio. Hay cuatro más." No es "Sos X". La sección H nunca se usó como
  inicio en `hooks_used.json`; los tres anteriores fueron G64, A8 y E47.
- **Cierre:** pedido de buscar algo propio y contarlo, con juego (playbook 4, sección Juego / Memoria personal): "Agarrá lo primero
  que tengas cerca, fijate dónde se hizo y contalo en los comentarios. A ver quién encuentra el lugar más raro." Es el cierre que
  sugirió el dueño. No es "¿qué ciudad sumarías?", sin "Seguime", sin predicción ni continuación. Vuelve a la mano del gancho.
- **Imagen que abre y cierra:** una mano low-poly que sostiene un celular (plano 1); del celular sale una línea que viaja por un
  mapa de la Argentina hasta Río Grande. Cada parada repite el gesto: objeto en primer plano, línea al punto del mapa que se
  enciende. En el plano 16 la mano vuelve, vacía, y agarra un objeto genérico de la mesa.
- **Re-ganchos:** 9 de cada 10 (0:03), Río Grande (0:09), "hay cuatro más" (0:12), una sola fábrica (0:14), 460.000 (0:20),
  Arroyito (0:23), 1951 y el nombre (0:25), mayor del mundo (0:29), tres cuartos (0:34), 75,7 millones (0:39), ninguna zona del
  mundo sacó más (0:44), el satélite (0:49), 8 países (0:53). Ningún tramo pasa de 6 s sin un número o una ciudad nueva.
- **Checker de la skill:** 85/100, cero fallas graves. Los tres avisos leves son del lector en inglés: no lee números escritos con
  letras (por eso cree que no hay re-ganchos ni número en el gancho; el número llega a los 2 s, en el plano 2) ni un cierre en
  castellano ("contalo en los comentarios").

## Guion final (una línea por plano)

| # | Tiempo | Texto |
|---|--------|-------|
| 1 | 0:00 | Mirá el celular en el que ves esto. |
| 2 | 0:03 | Hasta hace poco, 9 de cada 10 celulares, teles y aires del país salían de Tierra del Fuego. |
| 3 | 0:09 | Sobre todo, de Río Grande. |
| 4 | 0:10 | Lo que tenés en la mano tiene domicilio. Hay cuatro más. |
| 5 | 0:14 | La lata de gaseosa es de aluminio. Y una sola fábrica del país lo hace nuevo, en Puerto Madryn. |
| 6 | 0:20 | Hasta 460.000 toneladas por año. |
| 7 | 0:23 | El caramelo tiene dirección: Arroyito, en Córdoba. |
| 8 | 0:25 | Ahí nació Arcor en 1951, por ARroyito y CÓRdoba. |
| 9 | 0:29 | Hoy, el mayor fabricante de caramelos del mundo. |
| 10 | 0:32 | El aceite sale de moler granos. |
| 11 | 0:34 | Y tres cuartos de lo que el país puede moler está cerca de Rosario. |
| 12 | 0:39 | En 2025, esa costa despachó 75,7 millones de toneladas. |
| 13 | 0:44 | Ninguna zona de puertos agrícolas del mundo sacó más, según la Bolsa de Comercio de Rosario. |
| 14 | 0:49 | Y lo que te pasa por arriba: un satélite armado en Bariloche. |
| 15 | 0:53 | En 2014, con él, la Argentina entró al grupo de 8 países que fabricaban satélites así. |
| 16 | 0:59 | Agarrá lo primero que tengas cerca, fijate dónde se hizo y contalo en los comentarios. |
| 17 | 1:04 | A ver quién encuentra el lugar más raro. |

Tiempos estimados a unas 2,97 palabras dichas por segundo (el ritmo real de `kioscos-53000`: 190 palabras en 63,98 s); da unos
67 s. Los reales salen de `timing.json` después de la voz. Si la toma pasa de 68 s, lo primero que se recorta es "Hay cuatro más"
(plano 4) y, si hace falta, "Hoy," del plano 9; después, el plano 17 (la frase pasa a la descripción).

## PRONUNCIACIÓN A CONFIRMAR

Glosario consultado (`python3 fabrica/pronunciacion.py glosario`, 27/11/2026): ninguno de estos términos está. Para bajar riesgo,
la voz solo dice **Arcor**; Aluar, INVAP, ARSAT y Tenaris van únicamente en placa (Tenaris ni siquiera aparece: Campana quedó
afuera). Si el productor decide que la voz diga alguno, quedan marcados:

| Término | Dónde | Estado | Variantes sugeridas para probar |
|---|---|---|---|
| Arcor | voz, plano 8: `[Arcor\|Arcor]` | PRONUNCIACIÓN A CONFIRMAR | Arcor · Arcór · Ar-cor · Árcor |
| ARroyito / CÓRdoba | voz, plano 8: `[Arroyito\|ARroyito]`, `[Córdoba.\|CÓRdoba.]` | la voz dice las palabras normales; las mayúsculas son solo del subtítulo | (no hace falta, pero confirmar que el subtítulo con mayúsculas mezcladas no rompe el corte por palabra) |
| Aluar | solo placa, plano 5 | PRONUNCIACIÓN A CONFIRMAR | Aluár · Alu-ar · A-luar |
| INVAP | solo placa, plano 14 | PRONUNCIACIÓN A CONFIRMAR | Ínvap · Invap · In-vap |
| ARSAT | solo placa, plano 15 | PRONUNCIACIÓN A CONFIRMAR | Arsát · Ársat · Ar-sat |
| Tenaris | no se usa | PRONUNCIACIÓN A CONFIRMAR | Ténaris · Tenáris |

Números: todos con `[dicho|mostrado]` en `parrafos.json` (9, 10, 460.000 dicho "cuatrocientas sesenta mil" porque va con
toneladas, 1951, 2025, 75,7 millones dicho "setenta y cinco coma siete millones", 2014, 8). "Tres cuartos" y "cuatro" se dicen y se
muestran igual.

## Hoja de datos y fuentes

Fuentes leídas en las copias bajadas con curl el 27/11/2026 (scratchpad `dlciud/`). Solo entran cifras de la sección "Pedido del
dueño 14:50", y cada "Ojo" de esa sección se respetó.

| Dato | Frase del guion | Fuente |
|---|---|---|
| Según AFARTE, el 93% de los aires acondicionados, celulares y televisores que se venden en la Argentina se fabrican en Río Grande y Ushuaia | 2: "Hasta hace poco, 9 de cada 10 celulares, teles y aires del país salían de Tierra del Fuego" | [La Nación](https://www.lanacion.com.ar/economia/electronica-tierra-del-fuego-industria-nid2180148/) ("el 93 por ciento de los aires acondicionados, teléfonos celulares y televisores que se comercializan en la Argentina se fabrican en Río Grande y Ushuaia") |
| Desde 2025 el Gobierno bajó los aranceles a los celulares importados (por eso "hasta hace poco" y verbo en pasado) | 2: "Hasta hace poco" | [Infobae, 14/05/2025](https://www.infobae.com/economia/2025/05/14/paro-total-en-la-industria-electronica-de-tierra-del-fuego-por-la-baja-de-aranceles-a-electronicos-importados/), [Chequeado](https://chequeado.com/el-explicador/eliminacion-de-aranceles-a-la-importacion-de-celulares-en-que-consiste-el-regimen-de-promocion-industrial-de-tierra-del-fuego/) |
| Alrededor del 80% de los establecimientos productivos están en Río Grande y el resto en Ushuaia; régimen de la Ley 19.640 | 3: "Sobre todo, de Río Grande" | [Ministerio de Economía, cadenas de valor de Tierra del Fuego](https://www.argentina.gob.ar/sites/default/files/tierra_del_fuego_-_cadenas_de_valor.pdf), [iProfesional](https://www.iprofesional.com/negocios/295913-industria-consumo-empresa-Tierra-del-Fuego-como-nacio-el-polo-electronico-y-que-se-fabrica-hoy) (ley 19.640 de 1972) |
| Aluar es la única productora nacional de aluminio primario; su planta de Puerto Madryn tiene capacidad para 460.000 toneladas por año | 5 y 6: "una sola fábrica del país lo hace nuevo, en Puerto Madryn" / "Hasta 460.000 toneladas por año" | [Ministerio de Economía, informe de aluminio 2024](https://www.argentina.gob.ar/sites/default/files/aluminio_2024.pdf) ("Aluar, única productora nacional, con una capacidad instalada de 460 mil toneladas"; "Puerto Madryn... capacidad de producción de 460 mil toneladas por año"), [Wikipedia, Aluar](https://es.wikipedia.org/wiki/Aluar) |
| El principal destino local de los semielaborados de aluminio son los envases, y dentro de ellos se destaca la chapa para latas | 5: "La lata de gaseosa es de aluminio" | [Ministerio de Economía, informe de aluminio 2024](https://www.argentina.gob.ar/sites/default/files/aluminio_2024.pdf) ("El principal destino son envases. Dentro de ese rubro se destaca por su importancia, la chapa para latas") |
| Arcor nació en Arroyito, Córdoba, en 1951; el nombre une las primeras letras de Arroyito y Córdoba | 7 y 8: "Arroyito, en Córdoba" / "Ahí nació Arcor en 1951, por ARroyito y CÓRdoba" | [Wikipedia, Arcor](https://es.wikipedia.org/wiki/Arcor) ("Fue fundada en 1951 en la ciudad Arroyito"; "Arcor es la conjunción de las primeras letras del lugar que lo vio nacer, Arroyito y Córdoba"), [La Nación, 17/08/2024](https://www.lanacion.com.ar/economia/comercio-exterior/cuales-son-las-claves-de-la-avanzada-dulce-de-la-argentina-en-el-mundo-nid17082024/) |
| Arcor es la mayor fabricante de caramelos del mundo | 9: "Hoy, el mayor fabricante de caramelos del mundo" | [La Nación, 17/08/2024](https://www.lanacion.com.ar/economia/comercio-exterior/cuales-son-las-claves-de-la-avanzada-dulce-de-la-argentina-en-el-mundo-nid17082024/) ("La Argentina tiene a la mayor fabricante de caramelos del mundo... la cordobesa Arcor nacida en Arroyito") |
| El Gran Rosario concentra más de 52 millones de toneladas anuales de capacidad de molienda de oleaginosas, el 75% del total nacional | 10 y 11: "El aceite sale de moler granos" / "tres cuartos de lo que el país puede moler está cerca de Rosario" | [La Capital, 30/05/2026](https://www.lacapital.com.ar/economia/el-gran-rosario-volvio-ser-el-principal-nodo-agroexportador-del-mundo-n10262055.html), [Ámbito, 30/05/2026](https://www.ambito.com/economia/una-region-argentina-recupero-el-liderazgo-global-y-volvio-ser-el-principal-nodo-agroexportador-del-mundo-n6283237) |
| 70 km de costa entre Timbúes y Arroyo Seco, con 30 terminales portuarias | 12: "esa costa" (y placa del plano 12) | [La Capital](https://www.lacapital.com.ar/economia/el-gran-rosario-volvio-ser-el-principal-nodo-agroexportador-del-mundo-n10262055.html) ("A lo largo de 70 kilómetros de costa, entre Timbúes y Arroyo Seco, funcionan 30 terminales portuarias"), [Ámbito](https://www.ambito.com/economia/una-region-argentina-recupero-el-liderazgo-global-y-volvio-ser-el-principal-nodo-agroexportador-del-mundo-n6283237) |
| En 2025 el Gran Rosario embarcó 75,7 millones de toneladas de granos, harinas y aceites y volvió a ser el principal nodo portuario agroexportador del mundo, por encima de Nueva Orleans (74,8) y Santos (60), según un informe de la Bolsa de Comercio de Rosario | 12 y 13: "En 2025, esa costa despachó 75,7 millones de toneladas" / "Ninguna zona de puertos agrícolas del mundo sacó más, según la Bolsa de Comercio de Rosario" | [La Capital](https://www.lacapital.com.ar/economia/el-gran-rosario-volvio-ser-el-principal-nodo-agroexportador-del-mundo-n10262055.html), [Ámbito](https://www.ambito.com/economia/una-region-argentina-recupero-el-liderazgo-global-y-volvio-ser-el-principal-nodo-agroexportador-del-mundo-n6283237) |
| El ARSAT-1 lo construyó INVAP y se fabricó en San Carlos de Bariloche; da internet, telefonía y televisión digital; se lanzó el 16 de octubre de 2014 | 14: "un satélite armado en Bariloche" (y placa del plano 14) | [Argentina.gob.ar, El ARSAT-1](https://www.argentina.gob.ar/jefatura/innovacion-publica/ssetic/conectar/el-arsat-1), [iProfesional, 17/10/2014](https://www.iprofesional.com/actualidad/198430--que-sirve-el-arsat-1-el-primer-satelite-geoestacionario-argentino-de-telecomunicaciones) ("fabricado en la ciudad rionegrina de San Carlos de Bariloche") |
| Con el ARSAT-1, en 2014 la Argentina pasó a ser una de las ocho naciones que desarrollaban y producían sus propios satélites geoestacionarios, la segunda de América después de Estados Unidos | 15: "En 2014, con él, la Argentina entró al grupo de 8 países que fabricaban satélites así" | [Argentina.gob.ar, El ARSAT-1](https://www.argentina.gob.ar/jefatura/innovacion-publica/ssetic/conectar/el-arsat-1) ("una de las ocho naciones en el mundo que desarrollaban y producían sus propios satélites geoestacionarios y el segundo en el continente americano, luego de los Estados Unidos"), [iProfesional](https://www.iprofesional.com/actualidad/198430--que-sirve-el-arsat-1-el-primer-satelite-geoestacionario-argentino-de-telecomunicaciones) |

Límites y cómo los trata el guion:
- **El 93% es de AFARTE** (la cámara de las fábricas fueguinas), sin año claro, y suma aires, celulares y televisores. Desde 2025
  bajaron los aranceles a los celulares importados, así que el guion dice "hasta hace poco, 9 de cada 10" con los tres productos y
  el verbo en pasado ("salían"). La placa dice "SEGÚN AFARTE". No se dice que hoy sigan siendo 9 de cada 10.
- **"Sobre todo, de Río Grande"**: el 80% es de establecimientos productivos, no de unidades fabricadas. El guion no pone número
  en voz y la placa dice "8 DE CADA 10 FÁBRICAS", no "8 de cada 10 celulares".
- **"Lo hace nuevo"** es la forma dicha de "aluminio primario" (el que no sale de reciclar). La placa dice el término exacto.
  El guion no dice que la lata que tenés sea de aluminio de Madryn: dice que la lata es de aluminio y que una sola fábrica del país
  hace aluminio nuevo. Según el mismo informe, la producción local cubre el 67% del consumo de semielaborados: hay latas con chapa
  importada. 460.000 toneladas es **capacidad**, por eso "Hasta".
- **"El caramelo tiene dirección"** no dice que todos los caramelos sean de Arroyito: es la parada del caramelo y el dato que sigue
  es de Arcor. "Mayor fabricante de caramelos del mundo" lo afirma La Nación (2024); la placa lo atribuye. No se usan las 160.000
  toneladas (pedido del dueño) ni los países de exportación (no están en la sección).
- **Rosario**: el 75% es de **capacidad** de molienda de oleaginosas ("lo que el país puede moler"), no de aceite producido. El guion
  no dice que el aceite de tu cocina salga de Rosario: dice de dónde sale el aceite (moler granos) y dónde está la capacidad de
  moler. "Ninguna zona de puertos agrícolas del mundo sacó más" es el ranking de la Bolsa de Comercio de Rosario de nodos
  portuarios agroexportadores (granos, harinas y aceites), no de carga total: por eso "agrícolas" y "según". Es un dato de 2025.
- **Bariloche**: el satélite es el ARSAT-1, de 2014; la frase y la placa dicen "en 2014" y "entró", en pasado, sin decir cuántos
  países hacen satélites hoy. "Satélites así" = geoestacionarios, que lo dice la placa. La carga útil se compró a Francia y la
  propulsión a Alemania (iProfesional): por eso "armado en Bariloche", no "hecho entero en Bariloche".
- **Mar del Plata** (49% de los desembarques, [Ministerio de Economía, pesca 2024](https://www.argentina.gob.ar/sites/default/files/pesca_y_acuicultura_2024.pdf))
  quedó afuera solo por duración; puede ir en la descripción o en un video aparte. Campana y Tucumán, afuera (ver arriba).

## Placas por plano

Aparte de los subtítulos. Mayúsculas y signos tal como van. Sin "parte N" en ningún lado. En cada parada, el mapa de la Argentina
low-poly con el punto de la ciudad encendido y su nombre (placa de ciudad) más la placa del número.

| # | Placa(s) | Cuándo |
|---|---|---|
| 1 | `LO QUE TENÉS EN LA MANO TIENE DOMICILIO` | desde el cuadro 0 (gancho en mudo, sobre la mano con el celular) |
| 2 | `9 DE CADA 10` · `CELULARES, TELES Y AIRES · HASTA HACE POCO` · `SEGÚN AFARTE` | en "9", en "aires" y al final del plano |
| 3 | `RÍO GRANDE · TIERRA DEL FUEGO` · `8 DE CADA 10 FÁBRICAS DE LA ISLA` | en "Río Grande." (punto del mapa) y al final del plano |
| 4 | `+4 PARADAS` | en "cuatro" |
| 5 | `PUERTO MADRYN · CHUBUT` · `ALUAR: ÚNICA PRODUCTORA DE ALUMINIO PRIMARIO DEL PAÍS` | en "Madryn." y al final del plano |
| 6 | `460.000 TONELADAS POR AÑO` · `CAPACIDAD DE LA PLANTA` | en "460.000" y en "año." |
| 7 | `ARROYITO · CÓRDOBA` | en "Arroyito," |
| 8 | `1951` · `AR(royito) + COR(doba) = ARCOR` | en "1951," y en "CÓRdoba." |
| 9 | `MAYOR FABRICANTE DE CARAMELOS DEL MUNDO` · `SEGÚN LA NACIÓN` | en "mayor" y al final del plano |
| 10 | `GRANO MOLIDO = ACEITE` | en "moler" |
| 11 | `GRAN ROSARIO · SANTA FE` · `75% DE LA CAPACIDAD DE MOLIENDA DEL PAÍS` | en "Rosario." y al final del plano |
| 12 | `75,7 MILLONES DE TONELADAS · 2025` · `70 KM DE COSTA · 30 TERMINALES · TIMBÚES A ARROYO SECO` | en "75,7 millones" y en "toneladas." |
| 13 | `N.º 1 DEL MUNDO` · `MÁS QUE NUEVA ORLEANS (74,8) Y SANTOS (60)` · `SEGÚN LA BOLSA DE COMERCIO DE ROSARIO` | en "Ninguna", en "más," y en "Rosario." |
| 14 | `BARILOCHE · RÍO NEGRO` · `ARSAT-1 · ARMADO POR INVAP` | en "Bariloche." y al final del plano |
| 15 | `2014` · `1 DE 8 PAÍSES CON SATÉLITES GEOESTACIONARIOS PROPIOS` · `2.º DE AMÉRICA, DESPUÉS DE EE. UU.` | en "2014,", en "8" y al final del plano |
| 16 | `¿DÓNDE SE HIZO LO QUE TENÉS CERCA?` · `CONTALO EN LOS COMENTARIOS` | en "cerca," y en "comentarios." |
| 17 | `EL LUGAR MÁS RARO GANA` | en "raro." |

Fuentes en pantalla (texto chico, abajo, planos 2 a 15): `FUENTES: LA NACIÓN, MINISTERIO DE ECONOMÍA, LA CAPITAL, ÁMBITO, ARGENTINA.GOB.AR`.
Personas: no aparece ninguna persona real. La mano y los objetos son genéricos: celular, lata, caramelo y botella de aceite sin
marca ni etiqueta. Aluar, Arcor, INVAP, ARSAT y la Bolsa de Comercio de Rosario van en texto plano, sin logos. El satélite es un
modelo genérico, sin logo. El mapa es un esquema: las distancias no hacen falta a escala, pero los puntos tienen que caer en la
provincia correcta.

## Títulos

1. **Lo que tenés en la mano tiene domicilio: cinco ciudades que hacen tus cosas**
2. **9 de cada 10 celulares salían de una isla: de dónde vienen tus cosas**
3. **Río Grande, Madryn, Arroyito, Rosario y Bariloche: lo que fabrica cada una**

## Descripción de Instagram

```
Lo que tenés en la mano tiene domicilio. Cinco ciudades argentinas que hacen tus cosas.

Río Grande: hasta hace poco, 9 de cada 10 celulares, teles y aires que se vendían en el país salían de Tierra del Fuego, según AFARTE. La mayoría de las fábricas están en Río Grande.
Puerto Madryn: ahí está Aluar, la única productora de aluminio primario del país, con capacidad para 460.000 toneladas por año.
Arroyito: ahí nació Arcor en 1951 (ARroyito + CÓRdoba), hoy el mayor fabricante de caramelos del mundo.
Gran Rosario: tres cuartos de la capacidad de molienda de oleaginosas del país. En 2025 despachó 75,7 millones de toneladas y fue el principal nodo agroexportador del mundo, según la Bolsa de Comercio de Rosario.
Bariloche: ahí se armó el ARSAT-1. En 2014, la Argentina entró al grupo de 8 países que fabricaban sus propios satélites geoestacionarios.

Agarrá lo primero que tengas cerca, fijate dónde se hizo y contalo en los comentarios. A ver quién encuentra el lugar más raro.

Fuentes: La Nación, Ministerio de Economía, La Capital, Ámbito, Argentina.gob.ar e iProfesional.

#argentina #industriaargentina #hechoenargentina #ciudades #datoscuriosos
```

## Cómo regenerar

```
python3 scripts/voice.py de-donde-vienen-tus-cosas       # voz + tiempos (ElevenLabs)
python3 fabrica/pronunciacion.py oir de-donde-vienen-tus-cosas
scripts/stills.sh de-donde-vienen-tus-cosas
npx tsx scripts/events.ts de-donde-vienen-tus-cosas && python3 scripts/audio.py de-donde-vienen-tus-cosas
scripts/render.sh de-donde-vienen-tus-cosas              # out/de-donde-vienen-tus-cosas/de-donde-vienen-tus-cosas.mp4
scripts/cover.sh de-donde-vienen-tus-cosas               # out/de-donde-vienen-tus-cosas/portada.png
```
