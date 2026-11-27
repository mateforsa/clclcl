# La mayor salida a bolsa de la historia: le faltó una parte

Versión nueva de `videos/anthropic-ipo/` para reel de PRUEBA (viernes 27/11/2026, solo no seguidores). Video vertical 1080x1920,
30 fps, unos 53 s, 15 planos, sin carteles de capítulo. Voz: Juanma. 149 palabras dichas.
Inicio: J93 el titular ("Los diarios titularon: la mayor salida a bolsa de la historia." + cifra + "Les faltó una parte."). El
nombre de la empresa recién aparece en el plano 5: el gancho se entiende sin saber qué es Anthropic.
Cierre: predicción de sí o no (playbook 4, sección Predicción: "¿Vuelve arriba de 83 este año? Escribí sí o no."), sin "Seguime".
El plano 13 vuelve al gancho: la "parte que faltó" son los 21 centavos bajo el precio de salida.
Metáfora que abre y cierra: el recorte de diario con el titular y la raya horizontal de los US$ 83.
Tono: historia de negocios neutral. No es recomendación de inversión. Sin "parte N".

Qué cambia contra el original (183 vistas en 38 h, 0,22x la mediana, 28,7 s de visualización promedio sobre 2:34):
- Gancho: de "Sos Anthropic" (E41, que además ya usó `anthropic-fundadores`) a J93 titular, con el dato antes que el nombre.
- Recorte: 2:34 a unos 53 s. Afuera la historia de 2021, los hermanos Amodei, las rondas de febrero y mayo, Saudi Aramco,
  la discusión del récord, el prospecto (ingresos y pérdida) y la comparación con SpaceX (así no hay nombres extranjeros de más).
- Orden: gancho con el final, quién es en una frase, y después día por día hasta el precio más reciente.
- Nuevo: cotización actualizada al cierre del miércoles 25/11/2026 (el jueves 26 no hubo rueda por Acción de Gracias).
- Cierre: de "Seguime para la próxima historia" a una pregunta de predicción.
- No repite el ángulo de `anthropic-fundadores` (la venta de acciones de los siete fundadores): no se nombra a ningún fundador.

PRONUNCIACIÓN A CONFIRMAR (no están en `python3 fabrica/pronunciacion.py glosario`, que solo tiene GTA 6, GitHub e Hilux):
- Anthropic: `[Antrópic,|Anthropic,]` (forma del original, que no pasó por el glosario). Probar variantes, por ejemplo
  Antrópic / Ántropic / Anzrópic / Antrópik.
- Claude: `[Clod,|Claude,]` (forma del original). Probar variantes, por ejemplo Clod / Clood / Cláud / Clóud.

## Guion final (una línea por plano)

| # | Tiempo | Texto |
|---|--------|-------|
| 1 | 0:00 | Los diarios titularon: la mayor salida a bolsa de la historia. |
| 2 | 0:03 | 81.300 millones de dólares en acciones. |
| 3 | 0:07 | Les faltó una parte. |
| 4 | 0:08 | Cuatro días después, la acción valía menos que al salir. |
| 5 | 0:12 | Es Anthropic, la empresa que hace Claude, un asistente de inteligencia artificial. |
| 6 | 0:16 | Vendió cada acción a 83 dólares, más de lo esperado. |
| 7 | 0:21 | Jueves 19 de noviembre: abre a 111,50. |
| 8 | 0:24 | Al abrir, vale cerca de dos billones de dólares. |
| 9 | 0:27 | Pero cierra en 97. |
| 10 | 0:30 | El viernes caen las tecnológicas y pierde 8,5 por ciento. |
| 11 | 0:34 | El martes, 81,91: abajo de los 83. |
| 12 | 0:39 | Miércoles 25 de noviembre: cierra en 82,79. |
| 13 | 0:44 | 21 centavos abajo del precio de salida. |
| 14 | 0:46 | Esto no es consejo de inversión. |
| 15 | 0:48 | ¿Vuelve arriba de 83 este año? Escribí sí o no. |

Tiempos estimados a 2,8 palabras por segundo (el ritmo real del original). Re-ganchos: cifra (0:03), giro (0:07), nombre (0:12),
precio (0:16), salto de día cada 3 a 5 s desde 0:21. Ningún tramo pasa 5 s sin un número nuevo.

## Hoja de datos y fuentes

Datos del original verificados el 25/11/2026 (ver `videos/anthropic-ipo/guion.md`). La cotización del 25/11 se buscó el 26/11/2026
por la noche. Los sitios de Yahoo Finance y de relación con inversores de Anthropic no se pudieron abrir desde este entorno (red
restringida): el cierre del 25/11 sale de los resúmenes de búsqueda de esas notas, no del texto completo.

| Dato | Frase del guion | Fuente |
|------|-----------------|--------|
| La prensa la presentó como la mayor salida a bolsa de la historia (por monto base, supera los US$ 75.000 M de SpaceX) | 1: "Los diarios titularon: la mayor salida a bolsa de la historia." | [CBS News](https://www.cbsnews.com/news/anthropic-ipo-nasdaq-debut-claude-ai/), [Fox Business](https://www.foxbusiness.com/markets/anthropic-begins-trading-nasdaq-record-breaking-ipo), [Beninwebtv](https://beninwebtv.bj/en/anthropic-lists-on-nasdaq-with-record-81-3-billion-ipo/) |
| 980 millones de acciones a US$ 83 = unos US$ 81.300 M | 2: "81.300 millones de dólares en acciones." | [CBS News](https://www.cbsnews.com/news/anthropic-ipo-nasdaq-debut-claude-ai/), [Anthropic en X](https://x.com/AnthropicAI/status/2123196808675405860) |
| Martes 24/11, cuarto día de bolsa: cierra a US$ 81,91, debajo de los US$ 83 | 4: "Cuatro días después, la acción valía menos que al salir." y 11 | [CNBC](https://www.cnbc.com/2026/11/24/anthropic-stock-ipo-price.html), [Axios](https://www.axios.com/2026/11/24/anthropic-stock-ipo-banks), [Reuters vía Investing.com](https://www.investing.com/news/economy-news/anthropic-breaks-below-83-ipo-price-as-debut-rally-unravels-5047654) |
| Anthropic hace Claude, un asistente de inteligencia artificial | 5: "Es Anthropic, la empresa que hace Claude..." | [Wikipedia: Anthropic](https://en.wikipedia.org/wiki/Anthropic) |
| Precio de US$ 83, arriba del rango esperado de 70 a 78 | 6: "Vendió cada acción a 83 dólares, más de lo esperado." | [Investinglive](https://investinglive.com/stocks/anthropic-prices-ipo-at-83-above-range-setting-up-thursday-s-nasdaq-debut-as-ant/), [CBS News](https://www.cbsnews.com/news/anthropic-ipo-nasdaq-debut-claude-ai/) |
| Jueves 19/11/2026, primer día: abre a US$ 111,50 | 7: "Jueves 19 de noviembre: abre a 111,50." | [CNBC](https://www.cnbc.com/2026/11/19/anthropic-ipo-ant-live-updates.html), [Silicon Report](https://www.siliconreport.com/anthropic-shares-open-at-111-50-approximately-33-above-ipo-price) |
| Al abrir, valor de mercado cercano a US$ 2 billones (2 trillion) | 8: "Al abrir, vale cerca de dos billones de dólares." | [CNBC](https://www.cnbc.com/2026/11/19/anthropic-ipo-ant-live-updates.html), [CNN](https://www.cnn.com/2026/11/19/business/live-news/anthropic-ipo) |
| Cierre del primer día: US$ 97,17 (+17%) | 9: "Pero cierra en 97." | [The Information](https://www.theinformation.com/briefings/anthropic-closes-first-trading-day-97-share-17-ipo-price), [Value Add VC](https://valueaddvc.com/pulse/anthropic-ipo-first-day-close-97-17-up-17-percent-2026) |
| Viernes 20/11: caen las tecnológicas (Nvidia y AMD más de 13% abajo) y ANT pierde 8,5% (cierre US$ 88,91) | 10: "El viernes caen las tecnológicas y pierde 8,5 por ciento." | [CNBC](https://www.cnbc.com/2026/11/20/anthropic-stock-ai-amd-nvidia.html) |
| Martes 24/11: cierre US$ 81,91 | 11: "El martes, 81,91: abajo de los 83." | [CNBC](https://www.cnbc.com/2026/11/24/anthropic-stock-ipo-price.html), [Reuters vía Investing.com](https://www.investing.com/news/economy-news/anthropic-breaks-below-83-ipo-price-as-debut-rally-unravels-5047654) |
| Miércoles 25/11/2026: cierra a US$ 82,79, 21 centavos abajo de los US$ 83 (cotización más reciente al 26/11) | 12: "Miércoles 25 de noviembre: cierra en 82,79." y 13: "21 centavos abajo del precio de salida." | [MLQ.ai](https://mlq.ai/news/anthropic-shares-sink-nearly-10-below-tuesdays-close-before-paring-losses-staying-under-the-83-ipo-price/), [Yahoo Finance](https://finance.yahoo.com/markets/stocks/article/anthropic-stock-sinks-further-below-ipo-price-as-investors-sour-on-the-amodei-ai-bet-100918869.html), [Fortune, 25/11](https://fortune.com/2026/11/25/wall-street-anthropic-steal-generational-opportunity-stock-below-ipo-price/), [CNBC, 25/11](https://www.cnbc.com/investingclub/2026/11/25/anthropics-stock-has-been-a-clunker-post-ipo-why-that-matters-for-the-ai-trade.html) |
| Jueves 26/11/2026: la bolsa de EE. UU. no opera por Acción de Gracias. El viernes 27 hay rueda corta | (no se dice; justifica que el 25/11 es el último cierre) | [BBN Times](https://www.bbntimes.com/technology/nasdaq-closed-for-thanksgiving-at-23-585-80-after-nasdaq-100-touches-bear-market-territory-in-ai-rout) |

Cuentas: 980 M x 83 = US$ 81.340 M. 83 - 82,79 = 0,21 (21 centavos). 82,79 / 81,91 = +1,07%. 88,91 / 97,17 = -8,5%.

Notas y cautelas:
- **El récord depende de cómo se mida.** Por monto base, Anthropic (81.300 M) supera a SpaceX (75.000 M). Contando las acciones
  extra ya vendidas, SpaceX llegó a 85.700 M (Reuters vía Investing.com, Visual Capitalist). Por eso el guion no lo afirma: lo
  atribuye a "los diarios", y la placa del plano 1 va entre comillas. La versión corta no explica el matiz por duración.
- **Cierre del 25/11:** US$ 82,79 en MLQ.ai (con datos de cotización de CNBC) y en Yahoo Finance; Fortune dice "cerca de 1,3%
  abajo de los 83" en algún momento del día (fue durante la rueda). MLQ.ai dice "+0,89" contra el martes: 81,91 + 0,89 = 82,80, un
  centavo de diferencia por redondeo. CNBC Investing Club cita el martes en "81,90". Se usa 82,79, que es lo que da los 21 centavos
  que repiten las fuentes. 24/7 Wall St. publicó durante la rueda que había vuelto arriba de 83: fue un precio intradiario, el
  cierre quedó abajo. El mínimo intradiario de 73,85 que da una sola fuente NO entra.
- **Vigencia:** el viernes 27/11 la acción vuelve a operar. Por eso el guion dice la fecha ("Miércoles 25 de noviembre") y no
  "hoy" ni "último". El verificador tiene que revisar si el reel sale después de la rueda del viernes: el dato sigue siendo cierto
  con fecha, pero si el viernes cierra arriba de 83 la pregunta del cierre queda vieja y conviene ajustarla.
- "Cuatro días después" cuenta ruedas: jueves 19, viernes 20, lunes 23 y martes 24.
- "Billones" está en escala larga: 2 billones = 2 trillion en inglés.
- Sin personas reales en pantalla. Logos no: el nombre de la empresa en texto plano.

## Placas por plano

| # | Texto en pantalla (exacto) |
|---|----------------------------|
| 1 | "LA MAYOR SALIDA A BOLSA DE LA HISTORIA" (con comillas, como recorte de diario) |
| 2 | US$ 81.300 M · 980 millones de acciones x US$ 83 |
| 3 | LE FALTÓ UNA PARTE |
| 4 | 4 DÍAS DESPUÉS: MENOS QUE AL SALIR |
| 5 | ANTHROPIC · la empresa que hace Claude |
| 6 | PRECIO DE SALIDA: US$ 83 · esperaban de 70 a 78 |
| 7 | JUEVES 19/11 · ABRE: US$ 111,50 |
| 8 | ~US$ 2 BILLONES al abrir |
| 9 | CIERRE DÍA 1: US$ 97,17 |
| 10 | VIERNES 20/11 · −8,5% |
| 11 | MARTES 24/11 · US$ 81,91 · bajo los 83 |
| 12 | CIERRE 25/11/2026 · US$ 82,79 |
| 13 | −21 CENTAVOS vs US$ 83 |
| 14 | NO ES CONSEJO DE INVERSIÓN |
| 15 | ¿VUELVE ARRIBA DE US$ 83 ESTE AÑO? · SÍ / NO |

Placa fija chica en los planos 7 a 13: "en dólares, Nasdaq". La raya de los US$ 83 queda visible en esos planos.

## Títulos

1. La mayor salida a bolsa de la historia: le faltó una parte
2. 81.300 millones de dólares y, a los cuatro días, abajo del precio de salida
3. A 21 centavos de los 83: así está la acción de Anthropic

## Descripción de Instagram

```
Los diarios titularon "la mayor salida a bolsa de la historia". Les faltó una parte.

Anthropic, la empresa que hace Claude, vendió 980 millones de acciones a 83 dólares: unos 81.300 millones.
El jueves 19 de noviembre abrió a 111,50 y cerró en 97,17. En su cuarta rueda, el martes 24, cerró en 81,91.
Al cierre del miércoles 25 de noviembre de 2026: 82,79 dólares, 21 centavos abajo del precio de salida.

Esto no es consejo de inversión.

¿Vuelve arriba de 83 este año? Escribí sí o no.

#anthropic #bolsa #ipo #inteligenciaartificial #economia
```
