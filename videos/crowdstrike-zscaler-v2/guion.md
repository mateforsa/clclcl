# Te dejó sin vuelo en 2024. Ahora quiere cuidar el internet de las empresas (versión 2 de crowdstrike-zscaler)

Video vertical 1080x1920, 30 fps, unos 0:57, 13 planos, sin carteles de capítulo. Voz: Juanma. Reel de prueba (solo no seguidores),
se publica el viernes 27/11/2026.

Por qué se rehace: el original (`videos/crowdstrike-zscaler/`) hizo 124 vistas en 38 h (0,15 veces la mediana), 18 s de visualización
promedio y 0 me gusta. Abría con "Sos CrowdStrike", el nombre de una empresa que el que no la conoce no reconoce, duraba 2:34 y tenía
carteles de "Parte uno/dos/tres". Esta versión cambia:
- **Inicio:** E48 "vos como usuario" (Llegás al aeropuerto y tu vuelo no sale). Arranca por la consecuencia humana. El nombre de la
  empresa recién aparece en el plano 4, cuando ya se sabe qué hizo.
- **Cierre:** continuación con motivo concreto (playbook 3, n.º 5: "Cuando [evento] pase, lo explico acá"): "Cuando decidan los
  reguladores, te lo cuento acá". Sin "Seguime para la próxima historia" y sin la pregunta del original.
- **Orden y recorte:** se cortan la fundación (Kurtz, 2011), Chaudhry y su 34%, el canje de 1,135, JPMorgan, la suba de Zscaler y la
  recuperación de la acción. Sin carteles de capítulo. Pasa de 384 a 150 palabras y de 34 a 13 planos.
- **Metáfora que abre y cierra:** la pantalla azul de la aerolínea (plano 2) vuelve en el plano 12 ("La de la pantalla azul").

## Guion final (una línea por plano)

Tiempos estimados a unas 2,6 palabras dichas por segundo (se reemplazan por los reales al generar la voz).

| # | Tiempo | Frase |
|---|---|---|
| 1 | 0:00 | Llegás al aeropuerto y tu vuelo no sale. Julio de 2024. |
| 2 | 0:05 | En las computadoras de la aerolínea, una pantalla azul. |
| 3 | 0:08 | Según Microsoft, pasa en 8,5 millones de computadoras con Windows. |
| 4 | 0:13 | La causa: una actualización fallada de CrowdStrike, la empresa que las protege. |
| 5 | 0:18 | La aerolínea Delta dice que perdió unos 500 millones de dólares. |
| 6 | 0:22 | La acción de CrowdStrike cae más de un tercio. |
| 7 | 0:26 | Y este lunes compra Zscaler, que filtra el internet de otras empresas. |
| 8 | 0:31 | Paga casi 44.000 millones de dólares, todo en acciones. |
| 9 | 0:36 | Más que Google por Wiz: 32.000 millones. |
| 10 | 0:40 | Ese día su acción cae un 9 por ciento, y la oferta vale menos. |
| 11 | 0:45 | Faltan los reguladores: no cierra antes de agosto de 2027. |
| 12 | 0:50 | La de la pantalla azul quiere cuidar también el internet de las empresas. |
| 13 | 0:55 | Cuando decidan los reguladores, te lo cuento acá. |

150 palabras dichas (contadas sobre el lado izquierdo de `[dicho|mostrado]`; máximo pedido: 150).
Re-ganchos: la pantalla azul (0:05), el 8,5 millones (0:08), la causa con nombre (0:13), los 500 millones (0:18), la caída de la
acción (0:22), el salto a "este lunes" (0:26), los 44.000 millones (0:31), la comparación con Google (0:36), el "9 por ciento" (0:40),
la fecha de 2027 (0:45). Ningún tramo pasa de 5 s sin un número, un nombre o un salto de fecha.
"Este lunes" es el lunes 23/11/2026: vale para un reel publicado el viernes 27/11. Si se publica después del domingo 29/11, cambiar
el plano 7 a "El 23 de noviembre compra..." (`[veintitrés|23]`) y la placa no cambia.

### PRONUNCIACIÓN A CONFIRMAR

El glosario (`python3 fabrica/pronunciacion.py glosario`) solo tiene GTA 6, GitHub e Hilux: ninguno de estos nombres está probado ni
confirmado. Generar un audio con variantes numeradas para que elija el dueño y reemplazar el lado izquierdo del grupo en `parrafos.json`.

- **CrowdStrike** (planos 4 y 6): en `parrafos.json` va `[Cráud Stráik,|CrowdStrike,]` (la del original). Variantes:
  1. `Cráud Stráik` 2. `Cráudstraik` 3. `Cráud Estráik` 4. `Cráud Straic` 5. `CrowdStrike` (sin cambio).
- **Zscaler** (plano 7): `[Zi Skéiler,|Zscaler,]` (la del original). Variantes:
  1. `Zi Skéiler` 2. `Zí Eskéiler` 3. `Zeta Skéiler` 4. `Sí Skéiler` 5. `Zskéiler` 6. `Zscaler` (sin cambio).
- **Wiz** (plano 9): `[Uíz:|Wiz:]`. Variantes: 1. `Uíz` 2. `Güíz` 3. `Uís` 4. `Wiz` (sin cambio).
- **Google** (plano 9): `[Gúguel|Google]`, la forma más usada en el repo, sin probar. Variantes: 1. `Gúguel` 2. `Gúgol` 3. `Google`.
- **Windows** (plano 3): `[Güíndous.|Windows.]` (del original). Variantes: 1. `Güíndous` 2. `Uíndous` 3. `Windows`.
- **Microsoft** (plano 3): `[Máicrosoft,|Microsoft,]` (de `microsoft-codigo-rojo` y del original). Variantes: 1. `Máicrosoft` 2. `Maicrosóft`.
- "Delta" se lee bien en castellano y va sin corchetes.

## Placas por plano (texto exacto en pantalla)

Aparte de los subtítulos. Mayúsculas y signos tal como van. Sin placa de serie ni "parte N".

| # | Placa(s) | Cuándo |
|---|---|---|
| 1 | `VUELO CANCELADO` · `19/7/2024` | `VUELO CANCELADO` desde el cuadro 0; `19/7/2024` en "2024" |
| 2 | (sin placa: la pantalla azul ocupa el cuadro) | |
| 3 | `8,5 MILLONES DE COMPUTADORAS` · `SEGÚN MICROSOFT` | en "8,5" y en "Microsoft" |
| 4 | `ACTUALIZACIÓN CON ERROR` · `NO FUE UN ATAQUE` · `CROWDSTRIKE` | en "actualización", en "fallada" y en "CrowdStrike" |
| 5 | `DELTA: US$ 500 MILLONES` · `SEGÚN DELTA` | en "500" y en "dice" |
| 6 | `−36% EN DOS SEMANAS` | en "tercio" |
| 7 | `23/11/2026 · DOS AÑOS DESPUÉS` · `COMPRA ZSCALER` | en "lunes" y en "Zscaler" |
| 8 | `US$ 43.900 MILLONES` · `TODO EN ACCIONES` | en "44.000" y en "acciones" |
| 9 | `RÉCORD ANTERIOR: GOOGLE → WIZ · US$ 32.000 M` | en "Google" |
| 10 | `CROWDSTRIKE −9%` · `OFERTA: US$ 260 → 235 POR ACCIÓN` | en "9" y en "menos" |
| 11 | `CIERRE: NO ANTES DE AGOSTO DE 2027` | en "agosto" |
| 12 | `2024: PANTALLA AZUL` · `2026: EL INTERNET DE LAS EMPRESAS` | en "azul" y en "internet" |
| 13 | `CUANDO DECIDAN LOS REGULADORES, LO CUENTO ACÁ` | en "decidan" |

Notas para el productor:
- Plano 8: la voz dice "casi 44.000" y la placa muestra la cifra exacta, 43.900. No cambiar ninguna de las dos.
- Plano 10: los US$ 260 y 235 son el valor por acción de Zscaler que implicaba el canje al anunciarse y después de la caída del lunes
  (ver hoja). No poner otra cotización.
- Plano 9: "récord anterior" es la lectura de la prensa (ver hoja); no agregar "el más grande de la historia" en otra placa.
- Personas: no aparece ninguna real con nombre. El pasajero del plano 1 es un muñeco genérico. Marcas: solo el nombre en texto plano,
  sin logos.

## Hoja de datos y fuentes

Mismos datos verificados del original (hoja del 25/11/2026 en `videos/crowdstrike-zscaler/guion.md`) más los vuelos cancelados.
Vigencia revisada la noche del 26/11/2026: no se encontró ninguna novedad posterior al anuncio del 23/11 (ni aprobación, ni rechazo,
ni cambio de términos). El 10-Q de CrowdStrike advierte que la compra diluye a sus accionistas y que el precio de su acción puede bajar.

| Dato | Frase del guion | Fuente |
|---|---|---|
| Julio de 2024: aerolíneas cancelan vuelos durante días por la caída (Delta, cientos por día durante cinco días; más de 5.000 en total según las coberturas del quinto día) | 1: "Llegás al aeropuerto y tu vuelo no sale. Julio de 2024" | [CBS News](https://cbsnews.com/news/delta-flight-cancellations-today-dot-investigation-crowdstrike-outage) · [NBC News](https://www.nbcnews.com/business/travel/delta-air-lines-cancels-hundreds-flights-dot-opens-probe-rcna163175) · [SecurityWeek](https://www.securityweek.com/most-airlines-except-one-are-recovering-from-the-crowdstrike-tech-outage-the-feds-have-noticed/amp/) |
| 19/7/2024: las computadoras con Windows que recibieron la actualización se colgaron con la pantalla azul | 2: "En las computadoras de la aerolínea, una pantalla azul" | [UPI](https://www.upi.com/Top_News/US/2024/07/22/CrowdStrike-update/6561721625762/) · [NPR](https://www.npr.org/2024/07/31/nx-s1-5058652/delta-crowdstrike-outage-500-million-dollars) |
| 8,5 millones de equipos con Windows afectados: cifra de Microsoft (menos del 1% de los equipos con Windows) | 3: "Según Microsoft, pasa en 8,5 millones de computadoras con Windows" | [UPI](https://www.upi.com/Top_News/US/2024/07/22/CrowdStrike-update/6561721625762/) |
| La causa fue una actualización defectuosa de CrowdStrike, no un ciberataque. CrowdStrike vende la protección instalada en esas computadoras | 4: "una actualización fallada de CrowdStrike, la empresa que las protege" | [UPI](https://www.upi.com/Top_News/US/2024/07/22/CrowdStrike-update/6561721625762/) · [NPR](https://www.npr.org/2024/07/31/nx-s1-5058652/delta-crowdstrike-outage-500-million-dollars) |
| Delta dice que perdió unos US$ 500 M (Ed Bastian, CEO, a CNBC el 31/7/2024). Es lo que declara la aerolínea | 5: "La aerolínea Delta dice que perdió unos 500 millones de dólares" | [NPR](https://www.npr.org/2024/07/31/nx-s1-5058652/delta-crowdstrike-outage-500-million-dollars) · [CBS](https://www.cbsnews.com/news/delta-global-tech-outage-500-million-in-costs) |
| La acción de CrowdStrike pasa de US$ 343,05 (18/7/2024) a 217,89 (2/8/2024): −36,5% | 6: "cae más de un tercio" · placa "−36% EN DOS SEMANAS" | [Nasdaq / Motley Fool](https://www.nasdaq.com/articles/heres-how-july-outage-affecting-crowdstrike-today-stock-buy) |
| Anuncio el lunes 23/11/2026 de la compra de Zscaler | 7: "Y este lunes compra Zscaler" | [Comunicado CrowdStrike](https://www.crowdstrike.com/en-us/press-releases/crowdstrike-to-acquire-zscaler-bringing-network-security-and-zero-trust-to-the-falcon-platform/) · [SEC 8-K](https://www.sec.gov/Archives/edgar/data/1535527/000110465926130785/tm2630454d1_ex99-1.htm) · [Bloomberg](https://www.bloomberg.com/news/articles/2026-11-23/crowdstrike-reaches-44-billion-cybersecurity-deal-for-zscaler) |
| Zscaler filtra el tráfico de internet de las empresas (seguridad de red, "zero trust") | 7: "que filtra el internet de otras empresas" | [Comunicado Zscaler](https://www.zscaler.com/press/crowdstrike-acquire-zscaler-bringing-network-security-and-zero-trust-falcon-platform) |
| Valor aprox. US$ 43.900 M; CNBC y Bloomberg redondean a 44.000. Todo en acciones (1,135 de CrowdStrike por cada una de Zscaler) | 8: "Paga casi 44.000 millones de dólares, todo en acciones" | [CNBC](https://www.cnbc.com/2026/11/23/crowdstrike-zscaler-aquisition-ai-cyberattacks.html) · [Cybersecurity Dive](https://www.cybersecuritydive.com/news/crowdstrike-acquire-zscaler-439-billion-turbulent-threat/875477/) · [SecurityWeek](https://www.securityweek.com/crowdstrike-to-acquire-zscaler-in-43-9-billion-deal/) |
| Google-Wiz: US$ 32.000 M (anunciada en marzo de 2025, cerrada en marzo de 2026). La prensa describe a CrowdStrike-Zscaler como la mayor compra de ciberseguridad registrada (no lo dice el comunicado) | 9: "Más que Google por Wiz: 32.000 millones" · placa "RÉCORD ANTERIOR" | [TechCrunch (Wiz)](https://techcrunch.com/2026/03/11/google-completes-32b-acquisition-of-wiz/) · [Bloomberg](https://www.bloomberg.com/news/articles/2026-11-23/crowdstrike-reaches-44-billion-cybersecurity-deal-for-zscaler) · [The Register](https://www.theregister.com/security/2026/11/24/crowdstrike-splashes-44b-on-zscaler-customers-brace-for-the-bill/5311877) |
| El día del anuncio CrowdStrike cae 9% (CNBC; otras notas, cerca de 10%) | 10: "Ese día su acción cae un 9 por ciento" | [CNBC](https://www.cnbc.com/2026/11/23/crowdstrike-zscaler-deal-ceo-george-kurtz.html) · [24/7 Wall St.](https://247wallst.com/investing/2026/11/24/jim-cramer-calls-crowdstrikes-zscaler-deal-the-biggest-in-cybersecurity-history-what-it-means-for-both-stocks/) |
| Como paga con acciones, la oferta baja: 1,135 acciones valían US$ 260,41 al anuncio (cierre del 20/11) y cerca de 235,45 tras la caída | 10: "y la oferta vale menos" · placa "US$ 260 → 235" | [Motley Fool / Yahoo](https://finance.yahoo.com/markets/stocks/articles/zscaler-stock-surged-crowdstrikes-43-211810616.html) · [Investing.com](https://www.investing.com/news/stock-market-news/crowdstrikes-allstock-bid-for-zscaler-deal-structure-shifts-risk-to-target-holders-93CH-5048924) · [SEC 10-Q](https://www.sec.gov/Archives/edgar/data/0001535527/000153552726000038/crwd-20261031.htm) |
| Faltan aprobaciones regulatorias y el voto de accionistas. Cierre previsto en la segunda mitad del año fiscal 2028 de CrowdStrike (agosto 2027 a enero 2028) | 11: "Faltan los reguladores: no cierra antes de agosto de 2027" · 13 | [Comunicado Zscaler](https://www.zscaler.com/press/crowdstrike-acquire-zscaler-bringing-network-security-and-zero-trust-falcon-platform) · [The Register](https://www.theregister.com/security/2026/11/24/crowdstrike-splashes-44b-on-zscaler-customers-brace-for-the-bill/5311877) |
| CrowdStrike suma con la compra la seguridad de red (el tráfico de internet de las empresas) a la de las computadoras | 12: "quiere cuidar también el internet de las empresas" | [Comunicado CrowdStrike](https://www.crowdstrike.com/en-us/press-releases/crowdstrike-to-acquire-zscaler-bringing-network-security-and-zero-trust-to-the-falcon-platform/) · [8-K del 23/11](https://www.sec.gov/Archives/edgar/data/0001535527/000153552726000035/crwd-20261123xex991.htm) |

Límites y cómo los trata el guion:
- Como en el original, los datos se contrastaron con los resúmenes del buscador, no abriendo cada página.
- Vuelos cancelados: las coberturas del quinto día dan más de 5.000 (Yahoo) y más de 5.500 (SecurityWeek); Wikipedia da más de 7.000.
  No coinciden, por eso el guion no dice ninguna cifra de vuelos: solo "tu vuelo no sale".
- "Faltan los reguladores" simplifica: también falta el voto de los accionistas (se dice en la descripción).
- "No cierra antes de agosto de 2027" es la cuenta propia del rango que da la empresa (segunda mitad de su año fiscal 2028). Una nota
  de Yahoo habla de "mediados de 2027"; se usa la de la empresa.
- Quedan afuera: la recuperación de la acción en tres meses, la suba de Zscaler el día del anuncio, la opinión de JPMorgan, los
  fundadores y el 34% de Chaudhry. Sin citas textuales, sin recomendación de inversión.

## Títulos

1. Te dejó sin vuelo en 2024. Ahora compra una empresa por casi 44.000 millones
2. La empresa de la pantalla azul hace la compra récord de la ciberseguridad
3. 8,5 millones de pantallas azules, y dos años después, 43.900 millones de dólares

## Descripción de Instagram

```
En julio de 2024 una actualización fallada dejó vuelos en tierra y 8,5 millones de computadoras en pantalla azul. Esa empresa acaba de hacer una compra de casi 44.000 millones de dólares.

La actualización era de CrowdStrike, la empresa que protege esas computadoras. Microsoft contó 8,5 millones de equipos con Windows caídos y Delta dice que perdió unos 500 millones de dólares. La acción de CrowdStrike cayó más de un tercio en dos semanas.
El lunes 23 de noviembre de 2026, CrowdStrike anunció que compra Zscaler, que filtra el tráfico de internet de las empresas: unos 43.900 millones de dólares, todo en acciones. Más que los 32.000 millones que pagó Google por Wiz.
Ese día su acción cayó 9% y la oferta pasó a valer menos. Faltan el voto de los accionistas y los reguladores: no cierra antes de agosto de 2027.

Cuando decidan los reguladores, te lo cuento acá.

#ciberseguridad #pantallaazul #tecnologia #negocios #bolsa
```
