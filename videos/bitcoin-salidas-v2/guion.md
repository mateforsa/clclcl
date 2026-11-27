# 100 dólares en Bitcoin en su máximo: el jueves 26 eran 48

Versión nueva de `bitcoin-salidas` (le fue mal: 137 vistas en 29 h, 0,16× la mediana, 11,8 s de visualización promedio,
0 me gusta, según `fabrica/rendimiento.json`). Reel de PRUEBA, se publica el viernes 27/11/2026. Sin "parte N".
Video vertical 1080x1920, 30 fps, unos 0:49 (estimado a 2,86 palabras por segundo, el ritmo real del original, la voz todavía no se generó), 10 planos,
sin carteles de capítulo. Voz: Juanma.

Qué cambia contra el original:
- **Inicio:** A2 antes y después en dos frases, con plata del que mira: "100 dólares en Bitcoin en su máximo. El jueves 26
  eran unos 48." El original abría con D31 contradicción (salida récord contra saldo positivo) y explicaba el ETF en el
  segundo 12: la gente se iba a los 11,8 s. Ahora el primer número le toca al que mira (su plata, en dólares) y lo que mejor
  rindió en el canal fue economía con un número concreto así (`dolar-tres-precios`). Distinto de los últimos de
  `hooks_used.json` (B11 en `colapinto-qatar-v2` y `huawei-condena-v2`, E48 en `crowdstrike-zscaler-v2`, C26 en
  `microsoft-codigo-rojo-v2`, J100 en `starship-atrapada-v2`) y del D31 del original. Sin "Sos X" ni escenario con "vos"
  (para no pisar al E48 de `crowdstrike-zscaler-v2`).
- **Orden:** primero el precio (lo que le pasa a tus 100 dólares), después los fondos. La definición de ETF se recortó a media
  frase y la palabra "ETF" ya no se dice (solo va en placa). Salieron Grayscale (411 días), la comparación con FTX y los
  8,5 millones de bitcoins en ganancia: eran datos del 23-24/11 que dependían del precio de ese día.
- **Datos actualizados al 26/11/2026:** salidas de noviembre 5.390 M al 25/11 (antes 4.940 M al 24/11); saldo acumulado
  51.600 M (antes 52.000); precio del jueves 26 cerca de 61.000 (antes 59.000 el 25). El 26/11 fue feriado de Acción de
  Gracias en EE. UU.: los ETF no operaron, así que el 25/11 es el último dato de flujos.
- **Cierre:** completar la frase (playbook 4, "Una palabra", n.º 26): "Completá la frase: con esos 100 dólares, yo
  hubiera..." Vuelve a los 100 dólares del inicio y se contesta con pocas palabras, sin pedir pronósticos ni hablar de
  inversiones. Sin Seguime (es un reel de prueba para no seguidores) y sin promesa de "cómo cierra noviembre". El original
  cerraba con pregunta de dos opciones + Seguime. No se usó "Mandáselo a..." (H79) porque lo usa `microsoft-codigo-rojo-v2`,
  ni la pregunta de un número porque la usa `colapinto-qatar-v2`.
- Tema de mercados: el video solo describe lo que pasó, con fecha y fuente. Sin pronósticos ni recomendaciones.

## Guion final (una línea por plano)

| # | Tiempo | Frase |
|---|---|---|
| 1 | 0:00 | 100 dólares en Bitcoin en su máximo. El jueves 26 eran unos 48. |
| 2 | 0:05 | Ese máximo fue el 6 de octubre de 2025: unos 126.000 dólares. |
| 3 | 0:11 | El 21 de noviembre bajó hasta 55.000, y el jueves rondaba los 61.000. |
| 4 | 0:17 | En noviembre se fue la plata de los fondos que compran bitcoins de verdad en Estados Unidos. |
| 5 | 0:23 | Hasta el 25 salieron 5.390 millones de dólares, según SoSoValue. |
| 6 | 0:28 | Es el mes con más salidas desde que nacieron, en 2024. |
| 7 | 0:33 | El récord anterior era de junio: 4.510 millones. |
| 8 | 0:37 | Pero desde 2024 les entró más de lo que salió: unos 51.600 millones a favor. |
| 9 | 0:44 | Esto no es consejo de inversión. |
| 10 | 0:46 | Completá la frase: con esos 100 dólares, yo hubiera... |

141 palabras dichas (contadas sobre el lado izquierdo de `[dicho|mostrado]`, máximo 150).
Re-ganchos: 100 → 48 en el primer plano (0:00), la fecha y el máximo (0:05), el mínimo y el rebote (0:11), el cambio de
tema a los fondos (0:17), 5.390 millones (0:23), "récord desde que nacieron" (0:28), el récord anterior (0:33) y el "Pero"
del saldo a favor (0:37). Ningún tramo pasa de 7 s sin un número nuevo.
El cierre vuelve al gancho: los mismos 100 dólares del primer plano.

### La cuenta del gancho (propia)

- Máximo del 6/10/2025: entre US$ 126.080 (24/7 Wall St) y 126.210 (Coinbase).
- Precio del jueves 26/11/2026: entre US$ 60.700 (24/7 Wall St) y 61.266 (Coinotag), según la hora y la fuente.
- 100 × 60.700 ÷ 126.210 = 48,1. 100 × 61.266 ÷ 126.080 = 48,6. Cualquier combinación da entre 48,1 y 48,6: el guion dice
  "unos 48".
- Caída: entre 51,4% y 51,9% (24/7 Wall St publica 51,8%). La placa dice "≈ −52%".
- No cuenta comisiones ni impuestos, y supone comprar justo al precio máximo (nadie compró exactamente ahí). La placa lo
  aclara: "sin comisiones".

### PRONUNCIACIÓN A CONFIRMAR

Ninguno de estos términos está en el glosario (`python3 fabrica/pronunciacion.py glosario` solo trae GTA 6, GitHub e Hilux).
Generar audios con variantes numeradas para que elija el dueño; cuando se elija, reemplazar el lado izquierdo en `parrafos.json`.
- **Bitcoin** (plano 1): en `parrafos.json` va `[Bítcoin|Bitcoin]` (la forma del original). Variantes: 1. `Bítcoin`
  2. `Bít coin` 3. `Bítkoin` 4. `Bitcoin` (sin cambio).
- **bitcoins** (plano 4): `[bítcoins|bitcoins]`. Variantes: 1. `bítcoins` 2. `bít coins` 3. `bitcoins` (sin cambio).
- **SoSoValue** (plano 5, nombre del sitio de datos): `[Sóso Váliu.|SoSoValue.]`. Variantes: 1. `Sóso Váliu` 2. `Soso Váliu`
  3. `Sóu sóu Váliu` 4. `Sosováliu` 5. `SoSoValue` (sin cambio). Si ninguna suena bien, el plano 5 se puede decir
  "según el sitio de datos [Sóso Váliu]" o sacar el nombre de la voz y dejarlo solo en la placa (avisar al guionista: cambia
  la atribución dicha).
- "Estados Unidos" y el resto van en castellano, sin corchetes.

## Placas por plano (texto exacto en pantalla)

Aparte de los subtítulos. Mayúsculas y signos tal como van. Sin logos: los nombres en texto plano.

| # | Placa(s) | Cuándo |
|---|---|---|
| 1 | `US$ 100 → US$ 48` · `100 × 61.000 ÷ 126.000 ≈ 48 · SIN COMISIONES` | `US$ 100 → US$ 48` desde el cuadro 0 (el 100 se achica hasta 48); la cuenta en "cuarenta y ocho" |
| 2 | `MÁXIMO: 6/10/2025` · `1 BITCOIN ≈ US$ 126.000` | en "seis" y en "ciento veintiséis" |
| 3 | `21/11/2026: ≈ 55.000` · `26/11/2026: ≈ 61.000` · `≈ −52% DESDE EL MÁXIMO` | en "veintiuno", en "sesenta y un" y al final de la frase |
| 4 | `FONDOS ETF DE BITCOIN AL CONTADO · EE. UU.` · `TIENEN BITCOINS DE VERDAD` | en "fondos" y en "de verdad" |
| 5 | `−US$ 5.390 MILLONES` · `1 AL 25/11/2026 · DATOS: SOSOVALUE` | en "cinco mil" y en "SoSoValue" |
| 6 | `RÉCORD MENSUAL DESDE ENERO DE 2024` | en "más salidas" |
| 7 | `JUNIO 2026: −4.510 M` · `NOVIEMBRE 2026: −5.390 M` | en "junio"; la segunda barra queda más larga |
| 8 | `SALDO DESDE 2024: +US$ 51.600 M` · `AL 25/11/2026` | en "cincuenta y un mil" |
| 9 | `NO ES CONSEJO DE INVERSIÓN` | en "consejo" |
| 10 | `US$ 100` · `CON ESOS 100 DÓLARES, YO HUBIERA...` | el `US$ 100` del plano 1 vuelve entero; la frase en "completá" |

Notas para el productor:
- El gráfico del plano 3 une solo tres puntos confirmados (6/10/2025, 21/11/2026 y 26/11/2026). Agregar en chico
  `3 PUNTOS, NO ES EL RECORRIDO REAL`.
- Las barras del plano 7 sí pueden ir a escala (4.510 contra 5.390).
- Sin personas en este video.

## Hoja de datos y fuentes

| Dato | Frase del guion | Fuente |
|---|---|---|
| Máximo histórico de Bitcoin: unos US$ 126.000 el 6/10/2025 (Coinbase 126.210; 24/7 Wall St 126.080; otra fuente 126.198) | 1 y 2: "en su máximo", "Ese máximo fue el 6 de octubre de 2025: unos 126.000 dólares" | [Coinbase](https://www.coinbase.com/price/bitcoin), [CoinGecko](https://www.coingecko.com/en/coins/bitcoin), [24/7 Wall St, 26/11/2026](https://247wallst.com/investing/cryptocurrency/2026/11/26/bitcoins-price-every-thanksgiving-since-2013) |
| Precio del jueves 26/11/2026: cerca de US$ 61.000 (24/7 Wall St: unos 60.700; Coinotag: 61.266; otros: "cerca de 61.000", "volvió arriba de 60.000") | 1 y 3: "el jueves 26", "el jueves rondaba los 61.000" | [24/7 Wall St, 26/11/2026](https://247wallst.com/investing/cryptocurrency/2026/11/26/bitcoins-price-every-thanksgiving-since-2013), [Coinotag](https://en.coinotag.com/bitcoin-btc-holds-61k-after-november-slide), [MLQ.ai](https://mlq.ai/news/bitcoin-holds-near-61000-on-thanksgiving-as-etf-outflows-hit-539-billion/), [CapitalStreet FX, 26/11/2026](https://www.capitalstreetfx.com/market-analysis/daily-crypto-report-26-nov-2026/) |
| 100 dólares en el máximo valían unos 48 el 26/11; caída cercana al 52% (24/7 Wall St: 51,8%) | 1: "El jueves 26 eran unos 48"; placa 3 | Cuenta propia (ver "La cuenta del gancho") con las fuentes de las dos filas anteriores; [24/7 Wall St](https://247wallst.com/investing/cryptocurrency/2026/11/26/bitcoins-price-every-thanksgiving-since-2013) |
| Mínimo del 21/11/2026: unos US$ 55.000 (Crypto Briefing, nota de Grayscale: 55.254; Altcoinbuzz: unos 55.130) | 3: "El 21 de noviembre bajó hasta 55.000" | [Crypto Briefing](https://cryptobriefing.com/bitcoin-bear-market-record-411-days-grayscale/), [Altcoinbuzz](https://www.altcoinbuzz.io/why-is-crypto-up-today-as-bitcoin-holds-above-60-000) |
| Qué es un ETF de Bitcoin al contado: un fondo que cotiza en bolsa en EE. UU. y tiene bitcoins reales como respaldo | 4: "los fondos que compran bitcoins de verdad en Estados Unidos" | [SEC, formulario 10-Q de un emisor](https://www.sec.gov/Archives/edgar/data/0001855781/000119312526450234/btco-20260930.htm) |
| Salidas netas de los ETF de Bitcoin al contado de EE. UU. en noviembre de 2026: US$ 5.390 millones al 25/11, según SoSoValue | 5: "Hasta el 25 salieron 5.390 millones de dólares, según SoSoValue" | [KuCoin (SoSoValue)](https://www.kucoin.com/news/flash/bitcoin-etfs-face-record-monthly-outflows-of-5-39-billion-in-november), [KuCoin](https://www.kucoin.com/news/flash/us-spot-bitcoin-etfs-face-5-39-billion-outflows-in-november), [OKX](https://www.okx.com/en-us/orbit/insight/93823315637696), [CapitalStreet FX](https://www.capitalstreetfx.com/market-analysis/daily-crypto-report-26-nov-2026/), [MLQ.ai](https://mlq.ai/news/bitcoin-holds-near-61000-on-thanksgiving-as-etf-outflows-hit-539-billion/) |
| El 25/11/2026 salieron US$ 453,12 millones (IBIT de BlackRock: 329,71 M), séptima rueda seguida con salidas (17 al 25/11) | no se dice; explica el salto de 4.940 a 5.390 | [TokenPost](https://www.tokenpost.com/news/investing/62669), [Crypto Times, 26/11/2026](https://www.cryptotimes.io/2026/11/26/spot-bitcoin-etfs-witness-over-3-billion-in-net-outflows-streak/) |
| Es la mayor salida mensual desde que se lanzaron los fondos (enero de 2024) | 6: "Es el mes con más salidas desde que nacieron, en 2024" | [KuCoin (SoSoValue)](https://www.kucoin.com/news/flash/bitcoin-etfs-face-record-monthly-outflows-of-5-39-billion-in-november), [MLQ.ai](https://mlq.ai/news/bitcoin-holds-near-61000-on-thanksgiving-as-etf-outflows-hit-539-billion/), [The Block, 24/11/2026](https://www.theblock.co/news/markets/2026-11-24-bitcoin-etfs-another-570-million-net-outflows-november-total-nears-5-billion-btc-dips-below-60k-445548) |
| Récord anterior: junio de 2026, US$ 4.510 millones | 7: "El récord anterior era de junio: 4.510 millones" | [KuCoin (SoSoValue)](https://www.kucoin.com/news/flash/bitcoin-etfs-face-record-monthly-outflows-of-5-39-billion-in-november), [MLQ.ai](https://mlq.ai/news/bitcoin-holds-near-61000-on-thanksgiving-as-etf-outflows-hit-539-billion/), [Cointelegraph](https://cointelegraph.com/markets/bitcoin-etfs-near-record-5-billion-monthly-outflows) |
| Entradas netas acumuladas desde el lanzamiento: US$ 51.590 millones al 25/11 (SoSoValue, vía TokenPost); unos 51.700 (Farside, vía Crypto Times); unos 52.000 al 24/11 (The Block) | 8: "desde 2024 les entró más de lo que salió: unos 51.600 millones a favor" | [TokenPost](https://www.tokenpost.com/news/investing/62669), [Crypto Times, 26/11/2026](https://www.cryptotimes.io/2026/11/26/spot-bitcoin-etfs-witness-over-3-billion-in-net-outflows-streak/), [The Block, 24/11/2026](https://www.theblock.co/news/markets/2026-11-24-bitcoin-etfs-another-570-million-net-outflows-november-total-nears-5-billion-btc-dips-below-60k-445548) |
| El 26/11/2026 (Acción de Gracias) la bolsa de EE. UU. no abrió: no hubo flujos de ETF ese día | no se dice; por eso los flujos llegan "hasta el 25" | [Coinotag](https://en.coinotag.com/bitcoin-btc-holds-61k-after-november-slide), [e8 Markets](https://blog.e8markets.com/article/bitcoin-trading-shifts-as-etf-closure-puts-spot-and-derivatives-in-focus) |

Límites y cómo los trata el guion:
- Los datos se chequearon con resúmenes del buscador, no abriendo cada página (en esta sesión no se pudieron abrir
  mlq.ai ni kucoin.com: el dominio no resuelve). Cada cifra aparece en dos o más fuentes, salvo las indicadas.
- **Salidas de noviembre:** una nota del 25/11 a las 14:40 UTC daba 4.940 M (corte del 24/11). Las de después del cierre
  del 25/11 dan 5.390 M. El mes no cerró: el guion dice "hasta el 25" y la placa "1 AL 25/11/2026". No se dice el total
  del mes. Otros proveedores (Farside) pueden dar cifras algo distintas: por eso "según SoSoValue".
- **Saldo acumulado:** 51.590 (SoSoValue) contra unos 51.700 (Farside). El guion dice "unos 51.600" y lo pone como saldo
  neto (entradas menos salidas), no como plata que "quedó adentro".
- **Precio del 26/11:** varía entre 60.700 y 61.266 según hora y fuente. El guion dice "rondaba los 61.000" con fecha.
  No hay un precio de cierre oficial: Bitcoin cotiza todo el día.
- **Mínimo del 21/11:** 55.254 (Grayscale vía Crypto Briefing) y unos 55.130 (Altcoinbuzz, "el viernes pasado"). El guion
  y la placa dicen "55.000" redondo, y no nombran el día de la semana.
- **"Eran unos 48":** cuenta hipotética, sin comisiones, comprando justo en el máximo. Lo aclara la placa.
- **"Fondos que compran bitcoins de verdad"** simplifica: los ETF al contado tienen bitcoins como respaldo y las compras y
  ventas pasan por participantes autorizados.
- Afuera por vigencia o por largo: Grayscale y los 411 días de mercado bajista (nota del 23/11), los 8,5 millones de
  bitcoins en ganancia y la comparación con FTX (Glassnode vía CoinDesk, 24/11, con el precio en 55.000), activos totales
  de US$ 72.030 M, el vencimiento de opciones del 27/11.
- Sin pronósticos, sin recomendaciones, sin logos. "Esto no es consejo de inversión" se dice y va en placa.

## Títulos

1. 100 dólares en Bitcoin en su máximo: el jueves 26 eran 48
2. Récord de salidas de los fondos de Bitcoin: 5.390 millones en noviembre
3. Bitcoin perdió más de la mitad desde su máximo, y los fondos siguen con saldo a favor

## Descripción de Instagram

```
100 dólares en Bitcoin en su máximo. El jueves 26 de noviembre eran unos 48.

El máximo fue el 6 de octubre de 2025: unos US$ 126.000. El 21 de noviembre de 2026 bajó hasta unos 55.000 y el jueves 26 rondaba los 61.000 (cuenta sin comisiones).
Del 1 al 25 de noviembre salieron US$ 5.390 millones de los fondos ETF de Bitcoin al contado de EE. UU., según SoSoValue: el mes con más salidas desde que existen. El récord anterior era junio, con 4.510.
Aun así, desde enero de 2024 les entró más de lo que salió: unos US$ 51.600 millones a favor.

Esto no es consejo de inversión.

Completá la frase: con esos 100 dólares, yo hubiera...

#bitcoin #criptomonedas #economia #finanzas #mercados
```
