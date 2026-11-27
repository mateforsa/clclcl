# Black Friday: el bot de Meta que compra por vos todavía no puede entrar a Amazon

Versión nueva de `meta-muse` (rehacer, reel de PRUEBA para no seguidores). Se publica el viernes 27/11/2026, Black Friday.
Video vertical 1080x1920, 30 fps, unos 0:50, 14 planos, sin carteles de capítulo. Voz: Juanma (ElevenLabs), una sola toma.
148 palabras dichas.

Por qué se rehace: el original (`meta-muse`) iba en 115 vistas a las 23,7 h, 0,14 de la mediana del canal, con 9,9 s de
tiempo medio de visionado sobre 1:00 y cero interacciones (`fabrica/rendimiento.json`, 27/11/2026 02:11 UTC). Se pierde a la
gente en la apertura: el original arrancaba con un escenario ("Abrís WhatsApp...") que no dice de qué empresa ni qué pasa hasta el
plano 3. Esta versión nombra a Meta y el bot en la segunda frase y engancha con el día en que se publica.

Qué cambia frente al original:
- **Inicio:** C26 la pregunta cotidiana ("¿Este Black Friday comparás precios pestaña por pestaña?"). El original usaba E48 (vos
  como usuario). No es "Sos X". Ningún video de los últimos 16 en `hooks_used.json` usa C26.
- **Cierre:** predicción (playbook 4, "Predicción", 41: "Dejá tu apuesta") con una pregunta de sí o no: "¿Firman antes de fin de
  año?". Sin "Seguime" ni promesa de contarlo. El original cerraba con pregunta de dos opciones sobre la tarjeta + "si Amazon firma,
  te lo cuento".
- **Metáfora que abre y cierra:** las pestañas del Black Friday (plano 1) y el mismo cartel de Black Friday con Amazon cerrada (13).
- **Orden y recorte:** Amazon pasa adelante (plano 4) y el lanzamiento en el Reino Unido queda como contraste ("llegó, pero en
  Amazon sigue afuera"). Salen: WhatsApp, Argos y Sainsbury's, "más de veinte quejas internas", el temor de chats a la persona
  equivocada, la vuelta al chat y la pregunta de la tarjeta.
- **Frases del medio nuevas:** el motivo del bloqueo que dio Amazon (el bot no avisa que es una IA, en lugar de "viola sus
  condiciones de uso"), los dos puntos que traban la negociación según Fortune (publicidad y búsquedas) y la fecha del dato de la
  negociación (25/11).
- **Novedades buscadas el 26-27/11/2026:** no encontré ningún acuerdo anunciado ni otra novedad de Muse después del informe de
  Fortune del 25/11. Las coberturas del 25 y 26/11 (TechCrunch, Neowin, The Paypers, GIGAZINE, The AI Insider) repiten que hay
  negociación, sin acuerdo y sin comentario de las empresas. Por eso el plano 13 dice "hasta el jueves 26 no hubo acuerdo".

"Agente de IA" se dice como "un bot que busca, compara y te arma el carrito" (plano 2).

## Guion final (una línea por plano)

| # | Tiempo | Texto |
|---|--------|-------|
| 1 | 0:00 | ¿Este Black Friday comparás precios pestaña por pestaña? |
| 2 | 0:03 | Meta tiene un bot que busca, compara y te arma el carrito. |
| 3 | 0:07 | Se llama Muse. Vos solo aprobás la compra. |
| 4 | 0:10 | Pero hay una tienda que no lo deja entrar. |
| 5 | 0:13 | Amazon lo bloqueó en septiembre. |
| 6 | 0:15 | Dijo que el bot no avisa que es una inteligencia artificial. |
| 7 | 0:19 | Esta semana llegó al Reino Unido, pero en Amazon sigue afuera. |
| 8 | 0:23 | El 25 de noviembre, Fortune contó que las dos empresas negocian. |
| 9 | 0:27 | Según la revista, se traban por la publicidad y por las búsquedas. |
| 10 | 0:31 | Y Muse tiene otro problema. |
| 11 | 0:33 | Según Reuters, en pruebas pudo leer mensajes de Signal en Android, con el permiso de notificaciones. |
| 12 | 0:39 | Meta dice que son casos aislados y que solo usa los permisos que vos le das. |
| 13 | 0:44 | Hoy es Black Friday y hasta el jueves 26 no hubo acuerdo. |
| 14 | 0:48 | ¿Firman antes de fin de año? Sí o no, dejá tu apuesta. |

Tiempos estimados a unas 3 palabras por segundo. Los reales salen de `timing.json` después de la voz.

Re-ganchos: "Pero" (0:10), el motivo del bloqueo (0:15), "pero en Amazon sigue afuera" (0:19), la fecha 25/11 (0:23),
"Y Muse tiene otro problema" (0:31), la vuelta al Black Friday (0:44). Ningún tramo pasa de 8 s sin dato nuevo.

## PRONUNCIACIÓN A CONFIRMAR

El glosario (`python3 fabrica/pronunciacion.py glosario`, 27/11/2026) solo tiene GTA 6, GitHub y Hilux. Ninguno de estos términos
está, así que van marcados para que el productor genere variantes numeradas con `pronunciacion.py probar` y el dueño elija. En
`parrafos.json` quedan las formas del original `meta-muse` (o la más probable) como punto de partida, no como decisión.

| Término | Forma en `parrafos.json` | Variantes sugeridas para probar | Planos |
|---|---|---|---|
| Black Friday | `[Blák Fráidei\|Black Friday]` | Blák Fráidei · Black Fráidei · Blac Fraidei · Blák Fráidey · Black Friday | 1, 13 |
| Muse | `[Mius\|Muse]` | Mius · Miús · Miuz · Miúus · Muse | 3, 10 |
| Amazon | `[Ámazon\|Amazon]` | Ámazon · Amazon · Ámason · Émazon | 5, 7 |
| Fortune | `[Fórchun\|Fortune]` | Fórchun · Fórchiun · Forchun · Fortune | 8 |
| Reuters | `[Róiters\|Reuters]` | Róiters · Róyters · Roiters · Reuters | 11 |
| Signal | `[Sígnal\|Signal]` | Sígnal · Síknal · Signal · Sígnol | 11 |
| Android | `[Ándroid\|Android]` | Ándroid · Android · Andróid · Ándroi | 11 |
| Meta | `[Meta\|Meta]` | Meta · Méta | 2, 12 |

## Hoja de datos y fuentes

Datos vigentes al jueves 26/11/2026 a la noche (Argentina). Revisar antes de publicar el 27/11: la negociación con Amazon está
en curso y el plano 13 depende de que siga sin acuerdo anunciado.

| Dato | Frase del guion | Fuente |
|---|---|---|
| El viernes 27/11/2026 es Black Friday (el día después del Día de Acción de Gracias de EE. UU., cuarto jueves de noviembre: 26/11/2026) | 1 y 13: "Este Black Friday", "Hoy es Black Friday" | Calendario. Pedido del dueño: se publica el viernes 27/11/2026 |
| Muse es el agente de IA de Meta: busca productos, compara y arma carritos; el usuario aprueba la compra | 2 y 3: "un bot que busca, compara y te arma el carrito", "Vos solo aprobás la compra" | [Retail Gazette](https://www.retailgazette.co.uk/blog/2026/11/everything-you-need-to-know-about-metas-agentic-muse-launch/), [Retail Insight Network](https://www.retail-insight-network.com/news/meta-muse-ai-agent-uk-retail-partners/) |
| Amazon bloqueó a Muse en su tienda en septiembre de 2026 (los usuarios lo notaron el domingo 20/9; se informó el 21/9) | 4 y 5: "hay una tienda que no lo deja entrar", "Amazon lo bloqueó en septiembre" | [Bloomberg, 21/9/2026](https://www.bloomberg.com/news/articles/2026-09-21/amazon-blocks-meta-s-muse-ai-agent-from-its-retail-site), [Axios, 21/9/2026](https://www.axios.com/2026/09/21/amazon-meta-muse-ai-agentic-shopping), [SiliconANGLE, 21/9/2026](https://siliconangle.com/2026/09/21/amazon-blocks-metas-muse-agent-from-shopping-on-users-behalf/) |
| Motivo que dio Amazon: Meta no le avisó que Muse iba a entrar a su sitio y el agente no se identifica mientras compra (no dice que es una IA). También habló de credenciales de clientes: no entra | 6: "Dijo que el bot no avisa que es una inteligencia artificial" | [SiliconANGLE, 21/9/2026](https://siliconangle.com/2026/09/21/amazon-blocks-metas-muse-agent-from-shopping-on-users-behalf/), [The Decoder / Mixed](https://mixed-news.com/en/?p=31791), [TechRepublic](https://techrepublic.com/article/news-amazon-blocks-meta-muse) |
| Muse llegó al Reino Unido esta semana (las fuentes dan 23 o 24/11/2026) | 7: "Esta semana llegó al Reino Unido" | [Retail Insight Network](https://www.retail-insight-network.com/news/meta-muse-ai-agent-uk-retail-partners/), [mlq.ai](https://mlq.ai/news/meta-launches-its-muse-ai-agent-for-adults-in-the-uk/), [Blockonomi](https://blockonomi.com/meta-platforms-meta-stock-launches-muse-ai-in-the-uk-with-sainsburys-and-argos/) |
| El 25/11/2026, Fortune informó (exclusiva, con fuentes al tanto) que Amazon y Meta negocian un acuerdo para conectar Muse a la tienda y terminar el bloqueo. Sin acuerdo; ninguna de las dos comentó | 8: "El 25 de noviembre, Fortune contó que las dos empresas negocian" | [Fortune, 25/11/2026](https://fortune.com/2026/11/25/exclusive-amazon-meta-talks-deal-muse-ai-shopping-agent-blockade/), [TechCrunch, 25/11/2026](https://techcrunch.com/2026/11/25/amazon-and-meta-reportedly-in-talks-to-lift-blockade-on-ai-agent-muse/), [Neowin](https://www.neowin.net/news/amazon-is-reportedly-in-talks-with-meta-to-get-its-muse-ai-agent-unblocked/) |
| Según Fortune, los puntos sin resolver son la publicidad y el lugar en los resultados de búsqueda | 9: "se traban por la publicidad y por las búsquedas" | [Fortune, 25/11/2026](https://fortune.com/2026/11/25/exclusive-amazon-meta-talks-deal-muse-ai-shopping-agent-blockade/) (título: "ads, search emerge as key issues"), [The Next Web](https://thenextweb.com/news/amazon-and-meta-talks-muse-blockade-ads-fortune), [ContentGrip](https://www.contentgrip.com/amazon-meta-muse-ad-talks/) |
| En pruebas hechas con empleados de Signal y el AI Now Institute, Muse pudo leer texto de mensajes de Signal en Android a través del permiso de notificaciones. En iPhone se bloqueó. Lo informó Reuters | 11: "Según Reuters, en pruebas pudo leer mensajes de Signal en Android, con el permiso de notificaciones" | [GB News (cita a Reuters)](https://www.gbnews.com/tech/muse-ai-agent-meta-staff-complaints-reuters-investigation), [Storyboard18](https://www.storyboard18.com/amp/digital/extreme-privacy-violation-meta-employees-alarmed-by-unexpected-muse-ai-messages-115245.htm), [Root-Nation (cita a Reuters)](https://root-nation.com/en/news-en/it-news-en/en-meta-s-ai-agent-muse-is-mixing-up-conversations-and-could-be-exposing-private-data/) |
| Meta respondió que son incidentes aislados y que Muse solo llega a otras apps con los permisos que da el usuario | 12: "Meta dice que son casos aislados y que solo usa los permisos que vos le das" | [Root-Nation](https://root-nation.com/en/news-en/it-news-en/en-meta-s-ai-agent-muse-is-mixing-up-conversations-and-could-be-exposing-private-data/), [GB News](https://www.gbnews.com/tech/muse-ai-agent-meta-staff-complaints-reuters-investigation) |
| Al 25-26/11/2026 no había acuerdo anunciado; búsqueda del 27/11/2026 sin novedades | 13: "hasta el jueves 26 no hubo acuerdo" | [TechCrunch, 25/11/2026](https://techcrunch.com/2026/11/25/amazon-and-meta-reportedly-in-talks-to-lift-blockade-on-ai-agent-muse/), [The AI Insider, 26/11/2026](https://theaiinsider.tech/2026/11/26/amazon-and-meta-reportedly-discuss-deal-to-let-muse-ai-agent-shop-on-amazon/), [GIGAZINE, 26/11/2026](https://gigazine.net/news/20261126-muse-amazon-discuss/), [The Paypers](https://thepaypers.com/payments/news/amazon-and-meta-reportedly-in-talks-over-muse-ai-access) |

Límites y cómo los trata el guion:
- **No pude abrir las páginas** desde este entorno (techcrunch.com, theaiinsider.tech y finance.yahoo.com no resuelven). Los datos
  nuevos salen de los extractos del buscador con su URL, cruzados entre sí. El verificador tiene que confirmarlos.
- **El Black Friday y Muse:** ninguna fuente dice que Muse compre ofertas de Black Friday ni que esté disponible en Argentina. El
  guion no lo dice: la pregunta del plano 1 es para el espectador, y el plano 2 solo dice qué hace el bot. Muse está en EE. UU. y,
  desde esta semana, en el Reino Unido; el guion no promete que el espectador pueda usarlo.
- **"Antes del Black Friday":** un resumen de búsqueda ubicaba la negociación "antes del Black Friday y el Cyber Monday", y BigGo
  Finance tituló en ese sentido. No pude confirmarlo en Fortune, así que el guion no dice que estén apurados por el Black Friday:
  solo pone la fecha de hoy al lado del dato.
- **Firma de los dos jefes (Jassy y Zuckerberg):** apareció en un resumen sin fuente clara. No entra.
- **Walmart y las ofertas de Black Friday en Muse:** un resumen lo mencionaba (24/11), sin fuente que lo confirme. No entra.
- **Plano 6:** Amazon dijo que Meta no le avisó y que el agente no se identifica al comprar. El guion lo resume en "el bot no
  avisa que es una inteligencia artificial". La acusación de que guardaba credenciales de clientes (Meta lo niega) queda afuera.
- **Plano 11:** lo de Signal sale de medios que citan la investigación de Reuters; no encontré el artículo original de Reuters.
  "Pudo leer" usa el permiso que el usuario da (notificaciones): el guion lo dice y no habla de "sin autorización".
- **Plano 13:** si el viernes 27 se anuncia un acuerdo antes de publicar, el plano 13 y el cierre se rehacen. El verificador
  tiene que buscar de nuevo esa mañana.
- El bloqueo de Amazon es en su tienda de EE. UU. El guion no dice país.
- Quedaron afuera (por recorte): Argos, Sainsbury's y el resto de cadenas británicas, las "más de veinte quejas internas", el
  temor de empleados a chats mandados a la persona equivocada, los planes pagos de Muse y la frase de Andy Jassy (Fortune, 29/10)
  sobre los agentes de compra.

## Placas por plano

Aparte de los subtítulos. Mayúsculas y signos tal como van. Sin "parte N" en ningún lado.

| # | Placa(s) | Cuándo |
|---|---|---|
| 1 | `BLACK FRIDAY · 27/11` | desde el cuadro 0 (el hook en pantalla en mudo) |
| 2 | `META` · `BUSCA · COMPARA · ARMA EL CARRITO` | `META` en "Meta"; la segunda en "carrito" |
| 3 | `MUSE` · `VOS APROBÁS LA COMPRA` | `MUSE` en "Muse"; la segunda en "aprobás" |
| 4 | (sin placa) | |
| 5 | `AMAZON · BLOQUEADO` · `SEPTIEMBRE 2026` | en "Amazon" y en "septiembre" |
| 6 | `NO AVISA QUE ES UNA IA · SEGÚN AMAZON` | en "avisa" |
| 7 | `REINO UNIDO · 23-24/11/2026` · `AMAZON: SIGUE CERRADO` | en "Reino" y en "afuera" |
| 8 | `NEGOCIAN · SEGÚN FORTUNE · 25/11/2026` | en "Fortune" |
| 9 | `PUBLICIDAD` · `BÚSQUEDAS` | en "publicidad" y en "búsquedas" |
| 10 | (sin placa) | |
| 11 | `SIGNAL · ANDROID` · `PERMISO DE NOTIFICACIONES` · `SEGÚN REUTERS` | en "Signal", en "permiso" y en "Reuters" |
| 12 | `META: CASOS AISLADOS` | en "aislados" |
| 13 | `BLACK FRIDAY · 27/11` · `SIN ACUERDO AL 26/11/2026` | en "Black Friday" y en "acuerdo" |
| 14 | `¿FIRMAN ANTES DE FIN DE AÑO?` · `SÍ / NO` | en "Firman" y en "Sí o no" |

Personas: no aparece ninguna. Marcas: solo el nombre en texto plano, sin logos (Meta, Muse, Amazon, Fortune, Reuters, Signal,
Android). La tienda de Amazon es un local genérico con persiana baja; el bot es un carrito genérico.

## Títulos

1. **Black Friday: el bot de Meta que compra por vos no puede entrar a Amazon**
2. **Meta y Amazon negocian por un bot que hace las compras**
3. **¿Le dejarías el Black Friday a un bot? Amazon le cerró la puerta**

## Descripción de Instagram

```
¿Este Black Friday comparás precios pestaña por pestaña? Meta tiene un bot que lo hace por vos, y Amazon no lo deja entrar.

Se llama Muse: busca, compara y arma el carrito, y vos aprobás la compra.
Amazon lo bloqueó en septiembre: dijo que el bot no avisa que es una inteligencia artificial.
Esta semana llegó al Reino Unido. El 25 de noviembre, Fortune contó que Amazon y Meta negocian, trabados por la publicidad y las búsquedas. Hasta el jueves 26 no hubo acuerdo.
Según Reuters, en pruebas pudo leer mensajes de Signal en Android con el permiso de notificaciones. Meta dice que son casos aislados.

¿Firman antes de fin de año? Sí o no, dejá tu apuesta.

#blackfriday #meta #amazon #inteligenciaartificial #compras
```

## Cómo regenerar

```
python3 scripts/voice.py meta-muse-v2       # voz + tiempos (ElevenLabs). Antes: confirmar las pronunciaciones de arriba
python3 fabrica/pronunciacion.py oir meta-muse-v2
scripts/stills.sh meta-muse-v2
npx tsx scripts/events.ts meta-muse-v2 && python3 scripts/audio.py meta-muse-v2
scripts/render.sh meta-muse-v2              # out/meta-muse-v2/meta-muse-v2.mp4
scripts/cover.sh meta-muse-v2               # out/meta-muse-v2/portada.png
```
