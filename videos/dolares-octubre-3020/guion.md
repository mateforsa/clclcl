# En 10 meses los argentinos ya compraron más dólares que en todo 2025

Video nuevo (no es continuación de ningún otro: sin "parte N" en voz, placas, portada, títulos ni descripción). Se escribe el
sábado 28/11/2026. Tema económico: datos oficiales del Balance Cambiario del Banco Central, atribuidos. Sin opinión política, sin
nombrar funcionarios, sin pronósticos, sin recomendaciones, sin fechas relativas ("hoy", "esta semana", "el año pasado").
Video vertical 1080x1920, 30 fps, unos 0:58 a 0:63, 16 planos, sin carteles de capítulo. Voz: una sola toma.
180 palabras dichas (contadas sobre la parte "dicho" de `parrafos.json`).

**Cifra de octubre: solo los US$ 3.020 millones brutos** (compras de billetes de personas humanas). No se usan los US$ 3.332 millones
de Ámbito (demanda neta total: neto de billetes más transferencias al exterior) ni los 3.505 de Clarín. El 26.814 y el 26.392 también
son brutos, así que la comparación es pareja.

- **Inicio:** B11 fecha exacta en medio de la acción (playbook 1, sección B): "Octubre de 2026. Un millón setecientas mil personas
  compran dólares en la Argentina." Golpe 2, el monto: "Suman 3.020 millones, según el Banco Central." Golpe 3, la contradicción con
  el calendario: "Y con ese mes, el año ya le ganó a todo 2025." Los últimos catorce de `hooks_used.json` no tienen ninguna sección B.
  No repite el F52 de `hoy-hace-independiente-juventus-1973` ni el A8 de `exportaciones-agro-5717`. No es "Sos X".
- **Cierre:** Elegir entre dos con pedido de una palabra (playbook 4, n.º 2 "¿[A] o [B]?" con el formato de n.º 21 "en una
  palabra"): "¿Y vos? ¿Colchón o banco? Una palabra." Antes, callback a las dos pilas del gancho (plano 15). Sin "Seguime", sin
  adivinar un precio (lo usó `exportaciones-agro-5717`), sin memoria personal (la usó `hoy-hace-independiente-juventus-1973`), sin
  predicción ni continuación. Pregunta sobre un hábito, no sobre cuánta plata tiene cada uno.
- **Imagen que abre y cierra:** dos pilas low-poly de billetes verdes sobre una mesa. En los planos 3 a 5 la pila de 2025 (más
  baja, con los tres primeros meses casi vacíos marcados en gris en el plano 6) y la de 2026 que la pasa. En los planos 11 a 14 la
  pila de octubre se reparte en tres montones: uno sale por la ventana o a un colchón (fuera de los bancos), uno entra a un banco
  (chico) y uno va a una tarjeta (gastos). En el plano 15 vuelven las dos pilas, la de 2026 arriba, con dos huecos vacíos encima
  (noviembre y diciembre).
- **Re-ganchos:** 1,7 millones (0:00), 3.020 millones (0:05), "le ganó a todo 2025" (0:08), 26.392 (0:13), 26.814 (0:19), el cepo
  hasta abril (0:24), segundo mes más alto (0:31), julio (0:34), "brutas" (0:36), "adónde fueron" (0:40), 4 de cada 10 (0:41),
  1.100 millones (0:49), proporción más alta (0:52), 500 millones (0:55), la pila (0:58). Ningún tramo pasa de 8 s sin dato nuevo.
- **Checks de la skill:** `score.py` da 80 solo por avisos blandos que no lee en castellano (números escritos con letras, la pregunta
  del cierre partida en tres frases, CTA en castellano). Cero fallas duras: sin rayas, sin punto y coma, sin oraciones de una
  palabra, sin "no es X, es Y", sin preguntas en el medio (la única es la del cierre). Gancho con número y nombre en la primera frase.

## Guion final (una línea por plano)

| # | Tiempo | Texto |
|---|--------|-------|
| 1 | 0:00 | Octubre de 2026. 1,7 millones de personas compran dólares en la Argentina. |
| 2 | 0:05 | Suman 3.020 millones, según el Banco Central. |
| 3 | 0:08 | Y con ese mes, el año ya le ganó a todo 2025. |
| 4 | 0:13 | La pila de 2025 llegó a 26.392 millones. |
| 5 | 0:19 | La nueva, de enero a octubre, ya suma 26.814 millones. |
| 6 | 0:24 | En 2025 el cepo siguió hasta abril, y los primeros tres meses casi no hubo compras. |
| 7 | 0:31 | Octubre fue el segundo mes más alto del año. |
| 8 | 0:34 | Solo julio estuvo arriba. |
| 9 | 0:36 | Y son compras brutas, sin restar lo que otros vendieron. |
| 10 | 0:40 | Ahora, adónde fueron. |
| 11 | 0:41 | Según el Banco Central, cuatro de cada diez dólares que compraron personas y empresas quedaron fuera de los bancos del país. |
| 12 | 0:49 | Unos 1.100 millones, en billetes guardados o afuera. |
| 13 | 0:52 | Es la proporción más alta desde la salida del cepo. |
| 14 | 0:55 | En los bancos de acá quedaron apenas 500 millones. |
| 15 | 0:58 | La pila nueva ya es más alta, y le quedan dos meses para crecer. |
| 16 | 1:02 | ¿Y vos? ¿Colchón o banco? Una palabra. |

Tiempos estimados a unas 2,9 palabras dichas por segundo (unos 62 s). Los reales salen de `timing.json` después de la voz. Si la
toma pasa de 65 s, el primer plano que se puede recortar es el 9 ("Y son compras brutas..."): la placa `BRUTO: SIN RESTAR VENTAS`
pasa al plano 2.

## PRONUNCIACIÓN A CONFIRMAR

Glosario consultado (`python3 fabrica/pronunciacion.py glosario`, 28/11/2026): ningún término de este video está en el glosario, y
la voz **no dice ningún nombre extranjero, marca ni sigla**. "BCRA", "Infobae" y "Ámbito" van solo en placa; la voz dice "el Banco
Central". No hace falta probar variantes.

Palabras para mirar en `pronunciacion.py oir`: las cifras largas ("veintiséis mil trescientos noventa y dos millones", "veintiséis
mil ochocientos catorce millones", "tres mil veinte millones", "un millón setecientas mil") y "cepo". Todos los números van con
`[dicho|mostrado]` en `parrafos.json`. En el plano 1 la voz dice "un millón setecientas mil personas" y el subtítulo muestra
"1,7 millones de personas". En el plano 11, "cuatro de cada diez" va en letras también en el subtítulo (no es cifra de la fuente
sino su forma de decirlo).

## Hoja de datos y fuentes

Fuentes leídas en copias bajadas con curl el 28/11/2026 (scratchpad `src34/infobae.html` y `src34/ambito.html`). La fuente primaria
de las dos notas es el informe "Evolución del Mercado de Cambios y Balance Cambiario" del BCRA de octubre de 2026.

- Infobae (27/11/2026): https://www.infobae.com/economia/2026/11/27/la-demanda-de-dolares-no-afloja-los-argentinos-compraron-mas-de-usd-3000-millones-en-octubre/
- Ámbito (27/11/2026): https://www.ambito.com/finanzas/la-compra-dolar-ahorro-trepo-15-octubre-supero-los-us3300-millones-y-crecio-el-atesoramiento-bajo-el-colchon-n6350206

| Dato | Frase del guion | Fuente |
|---|---|---|
| Octubre 2026: cerca de 1,7 millones de personas compraron billetes | 1: "1,7 millones de personas compran dólares en la Argentina" | [Infobae](https://www.infobae.com/economia/2026/11/27/la-demanda-de-dolares-no-afloja-los-argentinos-compraron-mas-de-usd-3000-millones-en-octubre/) ("cerca de 1,7 millones de personas compraron billetes"), [Ámbito](https://www.ambito.com/finanzas/la-compra-dolar-ahorro-trepo-15-octubre-supero-los-us3300-millones-y-crecio-el-atesoramiento-bajo-el-colchon-n6350206) ("1,7 millones de compradores (+100.000)") |
| Octubre 2026: compras brutas por US$ 3.020 millones, según el BCRA | 2: "Suman 3.020 millones, según el Banco Central" | [Infobae](https://www.infobae.com/economia/2026/11/27/la-demanda-de-dolares-no-afloja-los-argentinos-compraron-mas-de-usd-3000-millones-en-octubre/) ("por un total bruto de 3.020 millones de dólares"), [Ámbito](https://www.ambito.com/finanzas/la-compra-dolar-ahorro-trepo-15-octubre-supero-los-us3300-millones-y-crecio-el-atesoramiento-bajo-el-colchon-n6350206) ("Las compras brutas ascendieron a u$s3.020 millones") |
| 2026 acumula US$ 26.814 millones brutos y ya superó los US$ 26.392 millones de 2025 | 3, 4 y 5: "el año ya le ganó a todo 2025" / "La pila de 2025 llegó a 26.392 millones" / "de enero a octubre, ya suma 26.814 millones" | [Infobae](https://www.infobae.com/economia/2026/11/27/la-demanda-de-dolares-no-afloja-los-argentinos-compraron-mas-de-usd-3000-millones-en-octubre/) ("las adquisiciones brutas acumulan USD 26.814 millones y ya superaron a los USD 26.392 millones de 2025") |
| El cepo se flexibilizó en abril de 2025, sin compras relevantes en el primer trimestre de 2025 | 6: "En 2025 el cepo siguió hasta abril, y los primeros tres meses casi no hubo compras" | [Infobae](https://www.infobae.com/economia/2026/11/27/la-demanda-de-dolares-no-afloja-los-argentinos-compraron-mas-de-usd-3000-millones-en-octubre/) ("las restricciones cambiarias recién se flexibilizaron en abril del año pasado, por lo cual no se produjeron compras relevantes en el primer trimestre de 2025") |
| Octubre: segundo volumen de compras más alto del año; septiembre US$ 2.896 M (+124 M); julio US$ 3.319 M, pico del año | 7 y 8: "Octubre fue el segundo mes más alto del año" / "Solo julio estuvo arriba" (cifras en placa) | [Infobae](https://www.infobae.com/economia/2026/11/27/la-demanda-de-dolares-no-afloja-los-argentinos-compraron-mas-de-usd-3000-millones-en-octubre/) ("superó en USD 124 millones al de septiembre ... 2.896 millones ... tras los USD 3.319 millones anotados en julio, que se mantiene como el pico del período") |
| Bruto = sin restar ventas: 812.000 personas vendieron US$ 472 M; neto US$ 2.548 M | 9: "Y son compras brutas, sin restar lo que otros vendieron" | [Infobae](https://www.infobae.com/economia/2026/11/27/la-demanda-de-dolares-no-afloja-los-argentinos-compraron-mas-de-usd-3000-millones-en-octubre/) ("unos 812.000 argentinos vendieron divisas por 472 millones ... el neto, que resta las compras y las ventas ... 2.548 millones"), [Ámbito](https://www.ambito.com/finanzas/la-compra-dolar-ahorro-trepo-15-octubre-supero-los-us3300-millones-y-crecio-el-atesoramiento-bajo-el-colchon-n6350206) |
| Cuatro de cada diez dólares (alrededor del 41%) comprados por personas y empresas quedaron fuera del sistema financiero local (billetes atesorados o activos en el exterior); 33% en septiembre | 11: "cuatro de cada diez dólares que compraron personas y empresas quedaron fuera de los bancos del país" | [Ámbito](https://www.ambito.com/finanzas/la-compra-dolar-ahorro-trepo-15-octubre-supero-los-us3300-millones-y-crecio-el-atesoramiento-bajo-el-colchon-n6350206) ("Cuatro de cada diez dólares adquiridos por personas y empresas se destinaron a la formación de activos externos" / "alrededor del 41% de las divisas adquiridas quedó fuera del sistema financiero local, ya sea mediante el atesoramiento de billetes o la constitución de activos en el exterior, frente al 33% del mes anterior") |
| Unos US$ 1.100 millones incrementaron la posición de activos externos (estimación del BCRA) | 12: "Unos 1.100 millones, en billetes guardados o afuera" | [Ámbito](https://www.ambito.com/finanzas/la-compra-dolar-ahorro-trepo-15-octubre-supero-los-us3300-millones-y-crecio-el-atesoramiento-bajo-el-colchon-n6350206) ("el BCRA estimó que ... unos u$s1.100 millones incrementaron la posición de activos externos"), [Infobae](https://www.infobae.com/economia/2026/11/27/la-demanda-de-dolares-no-afloja-los-argentinos-compraron-mas-de-usd-3000-millones-en-octubre/) ("unos USD 1.100 millones incrementaron la posición de activos externos") |
| La proporción destinada a activos externos es la más alta desde la salida del cepo, en abril de 2025 | 13: "Es la proporción más alta desde la salida del cepo" (abril 2025 en placa) | [Ámbito](https://www.ambito.com/finanzas/la-compra-dolar-ahorro-trepo-15-octubre-supero-los-us3300-millones-y-crecio-el-atesoramiento-bajo-el-colchon-n6350206) ("alcanzó su mayor nivel desde la salida del cepo cambiario en abril de 2025") |
| Unos US$ 500 millones (19%) quedaron depositados en bancos locales, el menor monto desde noviembre de 2025 | 14: "En los bancos de acá quedaron apenas 500 millones" | [Ámbito](https://www.ambito.com/finanzas/la-compra-dolar-ahorro-trepo-15-octubre-supero-los-us3300-millones-y-crecio-el-atesoramiento-bajo-el-colchon-n6350206) ("apenas u$s500 millones (19%) quedaron depositados en bancos locales, el menor monto desde noviembre de 2025"), [Infobae](https://www.infobae.com/economia/2026/11/27/la-demanda-de-dolares-no-afloja-los-argentinos-compraron-mas-de-usd-3000-millones-en-octubre/) |
| Otros US$ 1.100 millones (41%) se usaron para gastos con tarjetas y débitos (turismo, importaciones) | solo en el esquema del plano 11 (tercer montón, sin voz) | [Ámbito](https://www.ambito.com/finanzas/la-compra-dolar-ahorro-trepo-15-octubre-supero-los-us3300-millones-y-crecio-el-atesoramiento-bajo-el-colchon-n6350206), [Infobae](https://www.infobae.com/economia/2026/11/27/la-demanda-de-dolares-no-afloja-los-argentinos-compraron-mas-de-usd-3000-millones-en-octubre/) |
| Quedan noviembre y diciembre: el acumulado llega hasta octubre | 15: "le quedan dos meses para crecer" | Calendario; el acumulado es de enero a octubre (Infobae, informe de octubre). Sin pronóstico de cuánto cierra el año |

Límites y cómo los trata el guion:
- **Base del "cuatro de cada diez".** No es sobre los 3.020 brutos: el BCRA lo calcula sobre unos US$ 2.700 millones de compras
  netas de billetes y transferencias del sector privado (personas y empresas), descontadas operaciones duplicadas. Por eso la voz
  dice "dólares que compraron personas y empresas", no "de esos 3.020". La placa no muestra la cuenta 1.100 / 3.020.
- **"Bajo el colchón"** es la forma de decir de Ámbito; incluye billetes guardados y activos en el exterior. La voz dice "fuera de
  los bancos del país" y "en billetes guardados o afuera". "Colchón" solo aparece en la pregunta del cierre, como hábito.
- **2025 no es un año completo de compras** (cepo hasta abril): se dice en el plano 6 para no inflar la comparación.
- **Plano 1:** "compran dólares" en presente narrativo; la fuente habla de compra de billetes en el mercado de cambios.
- Quedaron afuera: los US$ 3.332 M de demanda neta total (Ámbito) y los 3.505 de Clarín; los US$ 53.206 M brutos desde abril de 2025;
  la proyección de Infobae de más de US$ 32.176 M al cierre de 2026 (es una cuenta de ritmo, no un dato); el récord de septiembre de
  2025 (US$ 5.130 M) y el contexto electoral; la cobertura con bonos dollar-linked y la cita de 1816; reservas y cuenta corriente.
- Esto no es consejo de inversión: va en placa del plano 16.

## Placas por plano

Aparte de los subtítulos. Mayúsculas y signos tal como van. Sin "parte N" en ningún lado.

| # | Placa(s) | Cuándo |
|---|---|---|
| 1 | `OCTUBRE 2026` · `1,7 MILLONES DE PERSONAS` | la primera desde el cuadro 0, la segunda en "1,7" |
| 2 | `US$ 3.020 MILLONES` · `SEGÚN EL BCRA` | en "3.020" y en "Central." |
| 3 | `MÁS QUE EN TODO 2025` | en "2025." |
| 4 | `2025: US$ 26.392 MILLONES` | en "26.392" |
| 5 | `2026 (ENE-OCT): US$ 26.814 MILLONES` · `ESQUEMA, NO A ESCALA` | en "26.814" y al final del plano |
| 6 | `CEPO HASTA ABRIL 2025` · `ENE-MAR 2025: CASI SIN COMPRAS` | en "abril," y en "compras." |
| 7 | `2.º MES MÁS ALTO DE 2026` · `+US$ 124 M VS. SEPTIEMBRE` | en "segundo" y en "año." |
| 8 | `JULIO: US$ 3.319 MILLONES` | en "julio" |
| 9 | `BRUTO: SIN RESTAR VENTAS` | en "brutas," |
| 10 | (sin placa) | |
| 11 | `4 DE CADA 10` · `FUERA DE LOS BANCOS DEL PAÍS` · `PERSONAS Y EMPRESAS · ESTIMACIÓN BCRA` | en "cuatro", en "bancos" y al final del plano |
| 12 | `~US$ 1.100 MILLONES` · `BILLETES GUARDADOS O ACTIVOS AFUERA` | en "1.100" y en "afuera." |
| 13 | `MÁXIMO DESDE LA SALIDA DEL CEPO (ABRIL 2025)` | en "proporción" |
| 14 | `EN BANCOS LOCALES: US$ 500 MILLONES` · `EL MENOR DESDE NOVIEMBRE 2025` | en "500" y al final del plano |
| 15 | `2026 > 2025` · `FALTAN NOVIEMBRE Y DICIEMBRE` | en "alta," y en "crecer." |
| 16 | `¿COLCHÓN O BANCO?` · `UNA PALABRA` · `NO ES CONSEJO DE INVERSIÓN` | en "Colchón", en "palabra." y la tercera chica, todo el plano |

Fuentes en pantalla (texto chico, abajo, planos 2 a 15): `FUENTE: BCRA, BALANCE CAMBIARIO OCT. 2026 · INFOBAE Y ÁMBITO, 27/11/2026`.
Personas: ninguna persona real. La fila del plano 1 son muñecos genéricos. Marcas: ninguna; billetes verdes genéricos, bancos sin
logo, el BCRA en texto plano, sin escudo. Las pilas son un esquema: llevan `ESQUEMA, NO A ESCALA` en el plano 5. Aun así, la pila de
2026 tiene que verse apenas más alta que la de 2025 (26.814 contra 26.392, un 1,6% más), no el doble.

## Títulos

1. **En 10 meses, los argentinos ya compraron más dólares que en todo 2025**
2. **US$ 3.020 millones en octubre: adónde fueron los dólares que compraron los argentinos**
3. **4 de cada 10 dólares quedaron fuera de los bancos: lo que dice el BCRA de octubre**

## Descripción de Instagram

```
En 10 meses, los argentinos ya compraron más dólares que en todo 2025: US$ 26.814 millones contra US$ 26.392 millones.

Según el Balance Cambiario del BCRA, en octubre de 2026 cerca de 1,7 millones de personas compraron US$ 3.020 millones en bruto (sin restar ventas), el segundo mes más alto del año después de julio (US$ 3.319 millones).
Un detalle: en 2025 el cepo siguió hasta abril, y en el primer trimestre casi no hubo compras.
Cuatro de cada diez dólares que compraron personas y empresas quedaron fuera de los bancos del país, unos US$ 1.100 millones: la proporción más alta desde la salida del cepo. En bancos locales quedaron US$ 500 millones.

Esto no es consejo de inversión.

¿Y vos? ¿Colchón o banco? Una palabra.

Fuentes: BCRA, vía Infobae y Ámbito (27/11/2026).

#dolar #ahorro #economia #argentina #finanzas
```
