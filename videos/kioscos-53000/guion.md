# Kioscos: cerraron más de 53.000 en tres años, casi uno de cada dos. Y el alfajor se vende más

Video nuevo (no es continuación de ningún otro: sin "parte N" en voz, placas, portada, títulos ni descripción). Se escribe el
viernes 27/11/2026, corrida de las 10:34. Tema sensible (economía): el video cuenta el dato del sector y lo que dice el sector.
Sin opinión política, sin nombrar al Gobierno ni a ningún dirigente, sin pronósticos.
Video vertical 1080x1920, 30 fps, unos 0:63 a 0:70, 15 planos, sin carteles de capítulo. Voz: Juanma (ElevenLabs), una sola toma.
190 palabras dichas (contadas sobre la parte "dicho" de `parrafos.json`).

- **Inicio:** G64 una fracción (sección G del playbook): "Casi uno de cada dos kioscos del país cerró en tres años." Golpe 2: el
  número y quién lo dice (más de 53.000, según la Unión de Kiosqueros). Golpe 3, la contradicción: "Pero hay algo que se vende cada
  vez más: el alfajor." No es "Sos X". Los dos videos anteriores en `hooks_used.json` usan J91 (`rockstar-sindicato-no`) y C30
  (`canva-despidos-v2`); el último G (G67) fue `gta-vi-leonida`, hace once videos.
- **Cierre:** pregunta a los que conocen el rubro de adentro (playbook 4, n.º 69 "Si trabajás en esto, contá cómo es de adentro"):
  "Si tenés o tuviste un kiosco, contá qué es lo que más sale hoy." Sin "Seguime", sin predicción y sin continuación. Ese tipo no
  se usó en ningún video anterior.
- **Imagen que abre y cierra:** una cuadra low-poly de kioscos con las persianas bajando una por una y, en el único mostrador
  abierto, un alfajor (plano 1). En el plano 14 la misma cuadra, casi toda con persiana baja, y la pila de alfajores más alta.
- **Re-ganchos:** el número (0:04), el "pero" del alfajor (0:08), 59.000 (0:12), 72.000 (0:15), gasto hormiga (0:22), "va a
  contramano" (0:26), 85 y 10 millones (0:32), la razón (0:38), el 61% (0:42), 1944 (0:50). Ningún tramo pasa de 8 s sin dato nuevo.
- **Checker de la skill:** 85/100, cero fallas graves. Los tres avisos leves son del lector en inglés (no lee números escritos con
  letras ni un cierre en castellano); el gancho tiene la fracción y el cierre es una pregunta concreta.

## Guion final (una línea por plano)

| # | Tiempo | Texto |
|---|--------|-------|
| 1 | 0:00 | Casi uno de cada dos kioscos del país cerró en tres años. |
| 2 | 0:04 | Más de 53.000, según la Unión de Kiosqueros. |
| 3 | 0:08 | Pero hay algo que se vende cada vez más: el alfajor. |
| 4 | 0:12 | Hoy quedan menos de 59.000 kioscos. |
| 5 | 0:15 | Y se perdieron unos 72.000 empleos. |
| 6 | 0:18 | El kiosco vive de lo que comprás al pasar, como un chocolate. |
| 7 | 0:22 | Lo llaman gasto hormiga, y fue lo primero que se cortó. |
| 8 | 0:26 | El alfajor va a contramano. |
| 9 | 0:28 | Es de lo que más crece entre los chocolates, según una consultora. |
| 10 | 0:32 | Cada argentino come en promedio 85 alfajores por año: más de 10 millones por día. |
| 11 | 0:38 | Según el sector, para una parte de la gente reemplaza una comida. |
| 12 | 0:42 | En una encuesta de la Universidad Católica, el 61% de los trabajadores se salteó una comida en el trabajo por plata. |
| 13 | 0:50 | El gremio existe desde 1944 y nunca registró una caída así. |
| 14 | 0:56 | Más de 53.000 persianas bajas. Y el alfajor, cada vez más vendido. |
| 15 | 1:01 | Si tenés o tuviste un kiosco, contá qué es lo que más sale hoy. |

Tiempos estimados a unas 2,9 palabras dichas por segundo (el ritmo de `rockstar-sindicato-no`); a 2,7 (el de
`dolar-tres-precios`) da unos 70 s. Los reales salen de `timing.json` después de la voz. Si la toma pasa de 70 s, el plano 13 es el
primero que se puede recortar sin perder el hilo (el dato pasa a la descripción).

## PRONUNCIACIÓN A CONFIRMAR

Glosario consultado (`python3 fabrica/pronunciacion.py glosario`, 27/11/2026): ningún término de este video está en el glosario,
y la voz **no dice ningún nombre extranjero ni sigla**. A propósito: "UKRA", "NielsenIQ", "Scentia", "UCA" e "Infobae" van solo en
placa; la voz dice "la Unión de Kiosqueros", "una consultora", "la Universidad Católica" y "el gremio". No hace falta probar
variantes. Si el productor decide que la voz diga alguno, queda marcado así:

| Término | Estado | Variantes sugeridas para probar |
|---|---|---|
| UKRA | PRONUNCIACIÓN A CONFIRMAR (solo en placa) | úkra · u ka erre a · Ucra |
| NielsenIQ | PRONUNCIACIÓN A CONFIRMAR (solo en placa) | Nílsen ái kiú · Nílsen Ai Kiu · Nielsen I Q |
| Scentia | PRONUNCIACIÓN A CONFIRMAR (solo en placa) | Séntia · Esséntia · Shéntia |

Números: todos con `[dicho|mostrado]` en `parrafos.json` (53.000, 59.000, 72.000, 85, 10 millones, 61%, 1944).
"Uno de cada dos" y "uno o dos" se dicen y se muestran igual.

## Hoja de datos y fuentes

Fuentes leídas en las copias bajadas con curl el 27/11/2026 (Ámbito e Infobae). Solo entran cifras que están en esas dos páginas.

| Dato | Frase del guion | Fuente |
|---|---|---|
| En los últimos tres años cerraron más de 53.000 kioscos, según la Unión de Kiosqueros de la República Argentina (UKRA) | 1 y 2: "cerró en tres años" / "Más de 53.000, según la Unión de Kiosqueros" | [Infobae, 26/11/2026](https://www.infobae.com/economia/2026/11/26/cerraron-mas-de-50000-kioscos-en-los-ultimos-tres-anos-y-el-sector-perdio-casi-la-mitad-de-sus-locales/) ("En los últimos tres años, cerraron más de 53.000 kioscos... según datos de la Unión de Kiosqueros"), [Ámbito](https://www.ambito.com/economia/crisis-el-comercio-reportan-53000-kioscos-cerrados-que-asumio-javier-milei-n6349905) ("Según datos de la UKRA... cerraron más de 53.000 locales en todo el país") |
| La caída equivale a casi la mitad del padrón del gremio | 1: "Casi uno de cada dos kioscos del país" | [Infobae](https://www.infobae.com/economia/2026/11/26/cerraron-mas-de-50000-kioscos-en-los-ultimos-tres-anos-y-el-sector-perdio-casi-la-mitad-de-sus-locales/) ("El derrumbe equivale a casi la mitad del padrón"; título: "perdió casi la mitad de sus locales") |
| Hoy quedan menos de 59.000 kioscos | 4: "Hoy quedan menos de 59.000 kioscos" | [Infobae](https://www.infobae.com/economia/2026/11/26/cerraron-mas-de-50000-kioscos-en-los-ultimos-tres-anos-y-el-sector-perdio-casi-la-mitad-de-sus-locales/), [Ámbito](https://www.ambito.com/economia/crisis-el-comercio-reportan-53000-kioscos-cerrados-que-asumio-javier-milei-n6349905) (Ernesto Acuña, vicepresidente de UKRA: "actualmente quedan menos de 59.000") |
| Se perdieron unos 72.000 puestos de trabajo (estimación de UKRA) | 5: "Y se perdieron unos 72.000 empleos" | [Ámbito](https://www.ambito.com/economia/crisis-el-comercio-reportan-53000-kioscos-cerrados-que-asumio-javier-milei-n6349905) ("aproximadamente 72.000 puestos de trabajo"), [Infobae](https://www.infobae.com/economia/2026/11/26/cerraron-mas-de-50000-kioscos-en-los-ultimos-tres-anos-y-el-sector-perdio-casi-la-mitad-de-sus-locales/) ("más de 72.000", "según las proyecciones del gremio") |
| UKRA estima que cada kiosco que cierra elimina en promedio entre uno y dos puestos directos | placa del plano 5 | [Infobae](https://www.infobae.com/economia/2026/11/26/cerraron-mas-de-50000-kioscos-en-los-ultimos-tres-anos-y-el-sector-perdio-casi-la-mitad-de-sus-locales/) |
| Los kioscos viven de las compras por impulso (el chocolate que se agarra al pasar, la gaseosa fría) | 6: "El kiosco vive de lo que comprás al pasar, como un chocolate" | [Infobae](https://www.infobae.com/economia/2026/11/26/cerraron-mas-de-50000-kioscos-en-los-ultimos-tres-anos-y-el-sector-perdio-casi-la-mitad-de-sus-locales/) |
| Ese consumo es lo que el sector llama "gasto hormiga" y fue el primero en contraerse cuando cayó el poder adquisitivo | 7: "Lo llaman gasto hormiga, y fue lo primero que se cortó" | [Infobae](https://www.infobae.com/economia/2026/11/26/cerraron-mas-de-50000-kioscos-en-los-ultimos-tres-anos-y-el-sector-perdio-casi-la-mitad-de-sus-locales/) |
| El alfajor se mueve a contramano: según NielsenIQ, es el segundo rubro con mayor crecimiento dentro de los chocolates (10% de expansión en el mix, sobre una base que ya había crecido entre 30% y 40% el año anterior) | 8 y 9: "El alfajor va a contramano" / "Es de lo que más crece entre los chocolates, según una consultora" | [Infobae](https://www.infobae.com/economia/2026/11/26/cerraron-mas-de-50000-kioscos-en-los-ultimos-tres-anos-y-el-sector-perdio-casi-la-mitad-de-sus-locales/) ("una categoría se mueve a contramano: el alfajor") |
| Los argentinos consumen en promedio 85 alfajores industriales por persona al año, más de 10 millones por día, según datos del sector | 10: "Cada argentino come en promedio 85 alfajores por año: más de 10 millones por día" | [Infobae](https://www.infobae.com/economia/2026/11/26/cerraron-mas-de-50000-kioscos-en-los-ultimos-tres-anos-y-el-sector-perdio-casi-la-mitad-de-sus-locales/) |
| La paradoja que describe el sector: el alfajor crece porque funciona como reemplazo de comidas para una parte del público; suele venderse en promoción con una gaseosa | 11: "Según el sector, para una parte de la gente reemplaza una comida" (y placa del plano 11) | [Infobae](https://www.infobae.com/economia/2026/11/26/cerraron-mas-de-50000-kioscos-en-los-ultimos-tres-anos-y-el-sector-perdio-casi-la-mitad-de-sus-locales/) |
| Encuesta del Observatorio de la Deuda Social de la UCA a 1.171 trabajadores del sector formal: el 61% de los asalariados se saltó al menos una comida durante la jornada laboral por razones económicas | 12: "En una encuesta de la Universidad Católica, el 61% de los trabajadores se salteó una comida en el trabajo por plata" | [Infobae](https://www.infobae.com/economia/2026/11/26/cerraron-mas-de-50000-kioscos-en-los-ultimos-tres-anos-y-el-sector-perdio-casi-la-mitad-de-sus-locales/) |
| UKRA existe desde 1944 y nunca había registrado una caída de esta magnitud en su padrón de afiliados | 13: "El gremio existe desde 1944 y nunca registró una caída así" | [Infobae](https://www.infobae.com/economia/2026/11/26/cerraron-mas-de-50000-kioscos-en-los-ultimos-tres-anos-y-el-sector-perdio-casi-la-mitad-de-sus-locales/) ("desde su fundación en 1944... nunca había registrado una caída de esta magnitud en su padrón") |

Límites y cómo los trata el guion:
- **El dato es del sector, no oficial.** Es de la Unión de Kiosqueros (UKRA), no del INDEC. La voz lo atribuye en el plano 2 y
  vuelve a decir "el gremio" en el 13; la placa del plano 2 dice "SEGÚN UKRA" y los planos 4 y 5 también.
- **La base de antes no coincide entre fuentes:** Ámbito dice unos 112.000 kioscos hace tres años (según el vicepresidente de UKRA);
  Infobae, más de 120.000 a fines de 2023. Por eso el guion no dice cuántos había ni un porcentaje exacto: dice "más de 53.000",
  "quedan menos de 59.000" y "casi uno de cada dos" (Infobae: "casi la mitad"). Con 112.000 son el 47%; con 120.000, el 44%: en los
  dos casos, casi la mitad. Ámbito dice en su bajada "más de la mitad", que no cierra con sus propios números: no se usa.
- **72.000 empleos:** Ámbito dice "aproximadamente" y Infobae "más de", los dos como estimación del gremio. El guion dice "unos".
- **Sin política:** Ámbito cuenta los cierres "desde que asumió Javier Milei" y lo compara con la crisis de 2001. El guion dice "en
  tres años", como Infobae, y no nombra al Gobierno, ni compara con 2001, ni culpa a nadie.
- **El alfajor como reemplazo de comida** es lo que dice el sector, y la voz lo dice así ("Según el sector"). La encuesta de la UCA
  es de trabajadores formales (1.171 casos) y no habla de alfajores: el guion la presenta como dato aparte, sin decir que esos
  trabajadores comen alfajores.
- **85 por persona y más de 10 millones por día** son "datos del sector" según Infobae, sin más detalle: la placa dice "SEGÚN EL SECTOR".
- Quedaron afuera por duración: la luz de las heladeras, alquileres e impuestos (Ámbito), el comercio electrónico (+35% en el año,
  Scentia), la caída de 2,1% de los productos de impulso y la mejora de 1,6% del canal kiosco en octubre (Scentia), las bebidas
  (Scentia), los datos de CAME y de consumo masivo de octubre (Ámbito), las 30 marcas nuevas de alfajores desde enero.

## Placas por plano

Aparte de los subtítulos. Mayúsculas y signos tal como van. Sin "parte N" en ningún lado.

| # | Placa(s) | Cuándo |
|---|---|---|
| 1 | `CASI 1 DE CADA 2 KIOSCOS CERRÓ` · `EN 3 AÑOS` | la primera desde el cuadro 0 (el gancho en mudo, sobre la cuadra con persianas bajando); la segunda en "años." |
| 2 | `+53.000 CERRADOS` · `SEGÚN UKRA · UNIÓN DE KIOSQUEROS DE LA REPÚBLICA ARGENTINA` | en "53.000," y en "Kiosqueros." |
| 3 | `EL ALFAJOR VENDE MÁS` | en "alfajor." |
| 4 | `QUEDAN MENOS DE 59.000` · `SEGÚN UKRA` | en "59.000" |
| 5 | `UNOS 72.000 EMPLEOS MENOS` · `1 O 2 EMPLEOS POR KIOSCO · ESTIMACIÓN DE UKRA` | en "72.000" y al final del plano |
| 6 | `COMPRA AL PASAR` | en "pasar," |
| 7 | `«GASTO HORMIGA»` · `LO PRIMERO QUE SE CORTÓ` | en "hormiga," y en "cortó." |
| 8 | `A CONTRAMANO` | en "contramano." |
| 9 | `2.º QUE MÁS CRECE ENTRE LOS CHOCOLATES` · `SEGÚN NIELSENIQ` | en "crece" y en "consultora." |
| 10 | `85 ALFAJORES POR PERSONA AL AÑO` · `+10 MILLONES POR DÍA` · `SEGÚN EL SECTOR` | en "85", en "millones" y al final del plano |
| 11 | `«REEMPLAZO DE COMIDAS» · SEGÚN EL SECTOR` · `SUELE VENIR EN PROMO CON GASEOSA` | en "reemplaza" y en "comida." |
| 12 | `61% SE SALTEÓ UNA COMIDA EN EL TRABAJO POR PLATA` · `UCA · ENCUESTA A 1.171 ASALARIADOS FORMALES` | en "61%" y en "plata." |
| 13 | `UKRA · DESDE 1944` · `NUNCA REGISTRÓ UNA CAÍDA ASÍ EN SU PADRÓN` | en "1944" y en "así." |
| 14 | `+53.000 PERSIANAS BAJAS` · `EL ALFAJOR, CADA VEZ MÁS VENDIDO` | en "persianas" y en "vendido." |
| 15 | `¿TENÉS O TUVISTE UN KIOSCO?` · `CONTÁ QUÉ ES LO QUE MÁS SALE HOY` | en "kiosco," y en "sale" |

Fuentes en pantalla (texto chico, abajo, planos 2 a 14): `FUENTES: ÁMBITO E INFOBAE, 26/11/2026`.
Personas: no aparece ninguna persona real con nombre. Kiosqueros y clientes son muñecos genéricos. Marcas: ninguna marca de
alfajor ni de gaseosa; el alfajor y la botella son genéricos, sin etiqueta. NielsenIQ, UKRA, UCA y las fuentes van en texto plano,
sin logos. Las pilas y columnas de los planos 4, 10 y 14 son un esquema, no a escala: si llevan números, agregar `ESQUEMA, NO A ESCALA`.

## Títulos

1. **Cerraron más de 53.000 kioscos en tres años. Y el alfajor se vende más**
2. **Casi uno de cada dos kioscos del país bajó la persiana: lo que dice el sector**
3. **Quedan menos de 59.000 kioscos y el alfajor crece: la explicación del sector**

## Descripción de Instagram

```
Casi uno de cada dos kioscos del país cerró en tres años. Y el alfajor se vende cada vez más.

Según la Unión de Kiosqueros de la República Argentina (UKRA), cerraron más de 53.000 kioscos en los últimos tres años. Hoy quedan menos de 59.000 y se perdieron unos 72.000 puestos de trabajo, según estima el gremio.
Lo primero que se cortó fue el "gasto hormiga": lo que comprás al pasar.
El alfajor va a contramano: según NielsenIQ, es el segundo rubro que más crece entre los chocolates. Según el sector, cada argentino come en promedio 85 alfajores por año, y para una parte de la gente reemplaza una comida.
En una encuesta de la UCA a 1.171 trabajadores formales, el 61% dijo que se salteó al menos una comida en el trabajo por razones económicas.

Si tenés o tuviste un kiosco, contá qué es lo que más sale hoy.

Fuentes: Ámbito e Infobae (26/11/2026), con datos de UKRA, NielsenIQ y la UCA.

#kioscos #alfajor #economia #argentina #consumo
```

## Cómo regenerar

```
python3 scripts/voice.py kioscos-53000       # voz + tiempos (ElevenLabs)
python3 fabrica/pronunciacion.py oir kioscos-53000
scripts/stills.sh kioscos-53000
npx tsx scripts/events.ts kioscos-53000 && python3 scripts/audio.py kioscos-53000
scripts/render.sh kioscos-53000              # out/kioscos-53000/kioscos-53000.mp4
scripts/cover.sh kioscos-53000               # out/kioscos-53000/portada.png
```
