# Huawei: la detuvieron en Vancouver en 2018 y su empresa acaba de ser condenada

Versión nueva de `huawei-condena` (publicado el 25/11/2026, le fue mal: 296 vistas, 0,35 de la mediana, 31 s de vista promedio
sobre un video de 2:40). Reel de prueba del viernes 27/11/2026. Video vertical 1080x1920, 30 fps, unos 45-50 s.
150 palabras dichas, 13 frases, 6 párrafos.

Qué cambia frente al original:
- Apertura: el original abría con "Sos Huawei" (E41, segunda persona). Esta abre en medio de la acción con fecha y lugar (B11)
  y con la historia humana primero: la detención de Meng Wanzhou en el aeropuerto de Vancouver. El veredicto entra en la tercera frase.
- Narración en tercera persona (sin "Sos"/"vos" como Huawei). Solo el cierre le habla al espectador.
- Recorte: afuera la fundación de 1987, los "capítulos", Tappy, el Mate 60, el juicio de once semanas, la reacción china y la lista de
  absoluciones. Queda un solo hilo: Meng detenida, Meng libre, la empresa todavía sin pena.
- Orden: detención, veredicto, por qué la acusaron, cómo zafó ella, bloqueo y ventas, cargos, apelación, qué arriesga, fecha.
- Cierre: el original cerraba con "Seguime para la próxima historia". Este usa continuación con fecha concreta (playbook 3.1):
  la sentencia del 14/9/2027. Antes, callback a la persona del gancho ("Meng ya está libre").
- Metáfora visual sugerida (el productor decide el diseño): una silla vacía en una sala de embarque que en el cierre vuelve a aparecer
  ocupada por una caja con el nombre de la empresa delante de un calendario detenido en septiembre de 2027.

## Guion final (una línea por plano)

| # | Tiempo | Texto |
|---|--------|-------|
| 1 | 0:00 | Aeropuerto de Vancouver, diciembre de 2018. |
| 2 | 0:02 | Canadá detiene a Meng Wanzhou, directora financiera de Huawei e hija del fundador. |
| 3 | 0:06 | Casi ocho años después, un jurado de Brooklyn declara culpable a su empresa en 10 de 12 cargos. |
| 4 | 0:11 | Según los fiscales, ella le mintió a un banco sobre negocios en Irán. |
| 5 | 0:15 | Hizo un acuerdo y volvió a China. La empresa siguió acusada. |
| 6 | 0:19 | Mientras, perdió Google y los chips más avanzados. |
| 7 | 0:21 | Y en 2025 facturó casi como en su mejor año, según su balance. |
| 8 | 0:26 | El veredicto incluye fraude bancario, violar sanciones a Irán y conspirar para robar secretos comerciales. |
| 9 | 0:30 | Huawei anunció que va a apelar. |
| 10 | 0:32 | Una empresa no va presa, arriesga multas y decomisos. |
| 11 | 0:35 | Al 26 de noviembre, la fiscalía no pidió monto. |
| 12 | 0:37 | Meng ya está libre. La pena de Huawei llega el 14 de septiembre de 2027. |
| 13 | 0:43 | Seguime y ese día te cuento cómo termina. |

Tiempos estimados a 3,3 palabras por segundo; los reales salen de `timing.json` después de la voz.
Re-ganchos: 0:06 (el veredicto, cifra 10 de 12), 0:15 (giro: ella zafa, la empresa no), 0:21 (contraste con las ventas),
0:26 (los cargos), 0:35 (fecha explícita y lo que falta), 0:37 (callback y fecha de la pena).

## PRONUNCIACIÓN A CONFIRMAR

Ninguno de estos términos está en el glosario (`python3 fabrica/pronunciacion.py glosario` solo tiene GTA 6, GitHub y Hilux).
En `parrafos.json` quedó la forma que usó el original entre corchetes, pero no está probada ni confirmada: el productor tiene que
generar variantes numeradas para que el dueño elija.

| Término | Forma puesta | Variantes a probar |
|---------|--------------|--------------------|
| Huawei | `[Juáuei\|Huawei]` | Juáuei, Juawéi, Guawéi, Uawéi, Huawei |
| Meng Wanzhou | `[Meng Uanyóu,\|Meng Wanzhou,]` | Meng Uanyóu, Meng Uanchóu, Meng Uan-you, Meng Wanzhou |
| Meng (sola) | `[Meng\|Meng]` | Meng, Méng, Mong |
| Vancouver | `[Vancúver,\|Vancouver,]` | Vancúver, Vancóuver, Vancouver |
| Brooklyn | `[Brúclin\|Brooklyn]` | Brúclin, Brúklin, Brooklyn |
| Google | `[Gúguel\|Google]` | Gúguel, Gúgol, Google |

## Hoja de datos y fuentes

| Dato | Frase del guion | Fuente |
|------|-----------------|--------|
| Meng Wanzhou, directora financiera de Huawei e hija del fundador Ren Zhengfei, detenida en el aeropuerto de Vancouver el 1/12/2018 a pedido de EE.UU. | 1, 2 | [CBC](https://www.cbc.ca/news/world/us-charges-meng-wanzhou-1.6671878), [Fortune](https://fortune.com/2021/09/24/huawei-executive-resolves-criminal-charges-with-u-s/) |
| Veredicto del 24/11/2026: un jurado federal de Brooklyn declara culpables a Huawei y tres filiales en 10 de 12 cargos | 3 | [Bloomberg](https://www.bloomberg.com/news/articles/2026-11-24/huawei-found-guilty-of-us-criminal-charges-in-landmark-case), [NBC News](https://www.nbcnews.com/news/us-news/chinese-tech-company-huawei-convicted-federal-charges-rcna611189), [Courthouse News](https://www.courthousenews.com/huawei-found-guilty-of-stealing-trade-secrets-in-us-trial/) |
| "Casi ocho años": del 1/12/2018 al 24/11/2026 van 7 años y 51 semanas | 3 | cuenta propia con las dos fechas de arriba |
| Acusación contra Meng: según los fiscales, engañó a HSBC sobre el control de Huawei sobre Skycom, que operaba en Irán | 4 | [CBC](https://www.cbc.ca/news/world/us-charges-meng-wanzhou-1.6671878), [Fortune](https://fortune.com/2021/09/24/huawei-executive-resolves-criminal-charges-with-u-s/) |
| Meng firma un acuerdo de enjuiciamiento diferido el 24/9/2021 y vuelve a China; sus cargos se desestiman en diciembre de 2022. La empresa sigue acusada | 5, 12 ("ya está libre") | [Fortune](https://fortune.com/2021/09/24/huawei-executive-resolves-criminal-charges-with-u-s/), [CBS News](https://www.cbsnews.com/news/huawei-cfo-meng-wanzhou-fraud-charges-dropped) |
| Mayo de 2019: Huawei entra en la "Entity List"; Google suspende los negocios que requieren licencia y los modelos nuevos quedan sin sus aplicaciones ("perdió Google") | 6 | [BBC](https://bbc.in/2WULDPF), [Engadget](https://www.engadget.com/2019-05-19-google-pulls-android-support-from-huawei.html) |
| Cerca de un año después de la lista, pierde el acceso a chips de punta | 6 | [PhoneArena](https://www.phonearena.com/news/huawei-seeks-global-comeback-led-by-kirin-chipset-and-harmony-os_id166764) |
| Ingresos 2025: 880.900 millones de yuanes (unos US$ 126.000 M), +2,2%. Récord: 2020, unos 891.000 millones de yuanes. 880.900 / 891.000 = 98,9% ("casi como en su mejor año"). Dato del balance de la empresa | 7 | [Huawei](https://www.huawei.com/en/news/2026/3/annual-report-2025), [Reuters vía Yahoo Finance](https://finance.yahoo.com/markets/stocks/articles/huawei-posts-2-2-growth-120903598.html) |
| Cargos del veredicto: fraude bancario, fraude electrónico, violación de sanciones a Irán (IEEPA), conspiración de lavado y conspiración para robar secretos comerciales. El guion nombra tres ("incluye") | 8 | [CNN](https://www.cnn.com/2026/11/24/china/china-huawei-iran-conviction-intl-hnk), [NBC News](https://www.nbcnews.com/news/us-news/chinese-tech-company-huawei-convicted-federal-charges-rcna611189), [Courthouse News](https://www.courthousenews.com/huawei-found-guilty-of-stealing-trade-secrets-in-us-trial/) |
| Absuelta en 2 (crimen organizado y obstrucción de la justicia). Solo va en placa, no en la voz | placa 3 | [Time / AP](https://time.com/article/2026/11/25/huawei-guilty-crimes-fraud-conspiracy-sanctions-us-china/), [Fortune](https://fortune.com/2026/11/25/huawei-us-trial-racketeering-china-national-champion/) |
| Huawei dice que las condenas no tienen fundamento; su abogado, Brian Heberlig: "We fully expect to appeal" | 9 | [Yahoo / Reuters](https://www.yahoo.com/news/us/articles/chinas-huawei-convicted-us-criminal-201624138.html), [CNN](https://www.cnn.com/2026/11/24/china/china-huawei-iran-conviction-intl-hnk), [NBC News](https://www.nbcnews.com/news/us-news/chinese-tech-company-huawei-convicted-federal-charges-rcna611189) |
| Penas posibles para la empresa: multas, decomisos y restitución | 10 | [CNN](https://www.cnn.com/2026/11/24/china/china-huawei-iran-conviction-intl-hnk), [Fox Business](https://www.foxbusiness.com/fox-news-tech/federal-jury-convicts-huawei-stealing-us-trade-secrets-violating-iran-sanctions) |
| Al 26/11/2026 la fiscalía no dijo qué monto va a pedir. Búsqueda del 26/11/2026 por la noche: no aparece ninguna novedad posterior al veredicto (ni apelación presentada, ni monto pedido, ni cambio de fecha) | 11 | [CNN](https://www.cnn.com/2026/11/24/china/china-huawei-iran-conviction-intl-hnk), [Fox Business](https://www.foxbusiness.com/fox-news-tech/federal-jury-convicts-huawei-stealing-us-trade-secrets-violating-iran-sanctions), [NBC News](https://www.nbcnews.com/news/us-news/chinese-tech-company-huawei-convicted-federal-charges-rcna611189) |
| Sentencia fijada para el 14/9/2027 (jueza Ann Donnelly) | 12 | [CNN](https://www.cnn.com/2026/11/24/china/china-huawei-iran-conviction-intl-hnk), [Fox Business](https://www.foxbusiness.com/fox-news-tech/federal-jury-convicts-huawei-stealing-us-trade-secrets-violating-iran-sanctions) |

Notas para el verificador:
- Novedades desde el original (búsqueda del jueves 26/11/2026 a la noche): ninguna. La apelación está anunciada, no presentada
  (Huawei solo puede apelar después de la sentencia). La fecha de sentencia sigue en el 14/9/2027. Un sitio menor
  ([talkwithtech](https://talkwithtech.com/huawei-convicted-in-us-trial/)) habla de multas "de miles de millones" y de mociones
  previas a la sentencia en enero de 2027; ninguna fuente seria lo confirma, así que no entra al guion.
- cnn.com y yahoo.com no se pudieron abrir desde esta sesión (dominios no permitidos en la red); las citas de esas fuentes vienen
  del original y de los resúmenes de búsqueda. Conviene que el verificador las reabra.
- "Perdió Google" se refiere a las aplicaciones y servicios de Google en los modelos nuevos; la placa lo aclara.
- "Ya está libre": sus cargos se desestimaron en diciembre de 2022 y vive en China. No se dice qué cargo tiene hoy.
- La palabra "condenada" del título: hay veredicto de culpabilidad, todavía no hay pena. Si el verificador prefiere, usar el título 2.
- Meng, fiscales y abogados son muñecos genéricos con placa. Sin caras, sin logos, sin banderas.

## Placas por plano

| # | Placa (texto exacto) |
|---|----------------------|
| 1 | AEROPUERTO DE VANCOUVER · 1/12/2018 |
| 2 | Meng Wanzhou · directora financiera de Huawei · hija del fundador |
| 3 | 24/11/2026 · Jurado de Brooklyn · CULPABLE en 10 de 12 cargos (absuelta en 2) |
| 4 | Según los fiscales: mintió a un banco sobre negocios en Irán |
| 5 | 2021: acuerdo y vuelta a China · La empresa sigue acusada |
| 6 | 2019: sin apps de Google · 2020: sin chips de punta |
| 7 | 2025: US$ 126.000 M · 98,9% de su récord (fuente: balance de Huawei) |
| 8 | Fraude bancario · Sanciones a Irán · Conspiración para robar secretos comerciales |
| 9 | Huawei va a apelar |
| 10 | Una empresa no va presa · Multas y decomisos |
| 11 | Al 26/11/2026: la fiscalía no pidió monto |
| 12 | Sentencia: 14/9/2027 |
| 13 | Seguime: ese día te cuento cómo termina |


## Títulos

1. **La detuvieron en Vancouver en 2018. Ocho años después, su empresa es culpable**
2. **Huawei, culpable en 10 de 12 cargos: qué arriesga y cuándo se sabe la pena**
3. **Ella quedó libre. Huawei espera la pena hasta septiembre de 2027**

Texto de portada sugerido (otro que el original): "LA DETUVIERON EN 2018" arriba, "SU EMPRESA: CULPABLE" abajo.

## Ganchos alternativos

- "La pena de Huawei llega el 14 de septiembre de 2027. El caso empezó con una detención en un aeropuerto." (G66, fecha lejana)
- "Diez cargos en contra y ninguna pena todavía. Así terminó, por ahora, el juicio a Huawei." (A, resultado primero)

## Descripción de Instagram

```
En 2018 la detuvieron en el aeropuerto de Vancouver. Casi ocho años después, su empresa es culpable en 10 de 12 cargos.

Meng Wanzhou, directora financiera de Huawei e hija del fundador, fue detenida en Canadá a pedido de Estados Unidos el 1 de diciembre de 2018. En 2021 hizo un acuerdo y volvió a China. La empresa siguió acusada.

El 24 de noviembre de 2026, un jurado de Brooklyn declaró culpable a Huawei de fraude bancario, violar sanciones a Irán y conspirar para robar secretos comerciales, entre otros cargos. Fue absuelta en dos. Huawei dice que va a apelar.

Al 26 de noviembre, la fiscalía todavía no pidió un monto. La sentencia está fijada para el 14 de septiembre de 2027.

Seguime y ese día te cuento cómo termina.

#huawei #tecnologia #china #estadosunidos #juicio
```
