# ¿Se te cortó el mail del trabajo el 12 de noviembre? El Código Rojo de Microsoft (microsoft-codigo-rojo-v2)

Versión nueva de `microsoft-codigo-rojo` (publicado el 25/11/2026: 257 vistas, 0,31 de la mediana, "le fue mal" en
`fabrica/rendimiento.json`). Se sube como reel de PRUEBA el viernes 27/11/2026. Escrito la noche del jueves 26/11/2026.

Qué cambia frente al original:
- Gancho: el original abría con "Sos Microsoft" (E41, la empresa en primera fila). Este abre con C26, la pregunta cotidiana
  ("¿Se te cortó el mail del trabajo?"): el espectador es el protagonista y la empresa aparece en la segunda frase.
- Recorte: de 380 palabras y 2:17 a 150 palabras dichas (unos 55-60 s). Afuera: los carteles "Parte uno/dos/tres", los
  nombres de Henderson, Silver y Lamanna, la "niebla de guerra", los diez años de fallas, los cinco frentes, los agentes de
  IA y el repaso de los códigos rojos de Google y OpenAI.
- Orden: primero lo que le pasó al que mira, después la alarma, la causa, el número de los memos y al final lo que puede
  hacer él (el descuento con fecha). El original iba por capítulos y terminaba en la comparación con Google y OpenAI.
- Dato nuevo para el que mira: el descuento por la caída no se aplica solo y, según guías especializadas, comprando directo
  a Microsoft se reclama hasta el 31/12/2026 (el original lo había dejado afuera por tener una sola fuente menor; ahora hay
  varias).
- Cierre: el original cerraba con "Seguime para la próxima historia". Este cierra con un pedido de compartir con destinatario
  y motivo (el plazo): "Mandáselo al de sistemas de tu trabajo."
- Novedades del Código Rojo entre el 25 y el 27/11/2026: no se encontró ninguna (ni comunicado de Microsoft, ni cambio en
  la meta, ni informe final que se pueda abrir). El guion no dice "hoy" ni "esta semana" sobre los memos.

## Guion final (una línea por plano)

| plano | texto dicho (como se ve en subtítulos) |
|---|---|
| b01 | ¿El 12 de noviembre se te cortó el mail del trabajo? No era tu compu. |
| b02 | Se cayó el correo de empresas de Microsoft casi 24 horas. |
| b03 | Y adentro, según memos que leyó Reuters, se prendió una alarma: Código Rojo. |
| b04 | No fue un ataque: un arreglo de julio en sus servidores traía un defecto que nadie vio en cuatro meses. |
| b05 | Le sumaron el tráfico de Teams a esos servidores con menos capacidad, y se trabaron. |
| b06 | Otro memo admite que un arreglo urgente tardaba cinco o seis días en llegar a todo el mundo. |
| b07 | La meta nueva es resolver una caída global en una hora. |
| b08 | Es un memo interno, no una promesa a los clientes. |
| b09 | Si tu empresa paga Microsoft 365, puede reclamar un descuento. |
| b10 | No llega solo: según guías especializadas, comprando directo se pide hasta el 31 de diciembre. |
| b11 | Mandáselo al de sistemas de tu trabajo. |

150 palabras dichas (contadas sobre el lado "dicho" de `parrafos.json`). Re-ganchos: b03 (Código Rojo, ~8 s), b04 (no fue un
ataque / cuatro meses), b06 (cinco o seis días), b07 (una hora), b09 (descuento), b10 (31 de diciembre).
Imagen que abre y cierra: la bandeja de entrada vacía del trabajo (b01) vuelve en b11, ahora con el mail que reenviás.

### PRONUNCIACIÓN A CONFIRMAR

Ninguno de estos términos está en `python3 fabrica/pronunciacion.py glosario` (solo tiene GTA 6, GitHub e Hilux). Se usó la
forma del video original como primera variante; el productor tiene que generar variantes numeradas y no adivinar.

| término | forma usada | variantes sugeridas para probar |
|---|---|---|
| Microsoft (b02, b09) | `[Máicrosoft\|Microsoft]` | Máicrosoft / Maicrosoft / Mái-crosoft / Microsoft |
| Microsoft 365 (b09) | `[Máicrosoft tres sesenta y cinco,\|Microsoft 365,]` | ... tres sesenta y cinco / ... trescientos sesenta y cinco |
| Reuters (b03) | `[Róiters,\|Reuters,]` | Róiters / Roiters / Róitres / Reuters |
| Teams (b05) | `[Tims\|Teams]` | Tims / Tíims / Teams |

## Hoja de datos y fuentes

No se pudo abrir ningún artículo completo desde el entorno (red restringida, por ejemplo newsweek.com no resuelve): los datos
salen de resultados y resúmenes de búsqueda cruzados entre varias republicaciones, igual que en el original. Abrir los links
antes de publicar.

| dato | frase del guion | fuente |
|---|---|---|
| La caída empezó el jueves 12/11/2026 (16:20 UTC) y duró casi 24 horas (hasta 16:10 UTC del 13/11) | b01, b02 | IncidentHub: https://blog.incidenthub.cloud/microsoft-365-outage-nov-12-2026 |
| El 12/11/2026 fue jueves (el 26/11/2026 es jueves, menos 14 días); el memo de Henderson habla de "ese jueves" | b01 | Reuters vía The Globe and Mail: https://www.theglobeandmail.com/business/article-microsoft-code-red-outage/ |
| Lo que se cayó fue Exchange Online, el correo para empresas de Microsoft (además de Outlook, Teams y Copilot) | b01, b02 | Reuters vía Investing.com: https://www.investing.com/news/stock-market-news/exclusivemicrosoft-declares-code-red-after-historic-outage-internal-memos-show-5048702 |
| Microsoft declaró un "Code Red" interno; se sabe por memos internos que vio Reuters (exclusiva del 24/11/2026) | b03 | Reuters vía Investing.com (misma URL) y Reuters vía Yahoo: https://tech.yahoo.com/ai/copilot/articles/microsoft-declares-internal-code-red-174518687.html |
| Microsoft dijo que no fue actividad maliciosa | b04 | Cybernews: https://cybernews.com/news/microsoft-declares-code-red/ |
| Informe preliminar (15/11): defecto latente en un arreglo de julio de 2026 en los servidores gateway de Exchange Online (julio a noviembre = cuatro meses) | b04 | BleepingComputer: https://www.bleepingcomputer.com/news/microsoft/microsoft-says-months-old-bug-caused-global-microsoft-365-outage/ |
| El tráfico de Teams se pasó a esos gateways unas 15 horas antes, con parte de la capacidad fuera de servicio, y los servidores dejaron de responder | b05 | BleepingComputer (misma URL) |
| En un memo, Henderson reconoció que un arreglo urgente tardaba 5 a 6 días en llegar a todo el mundo | b06 | The Next Web: https://thenextweb.com/news/microsoft-code-red-exchange-online-outage-memos-reuters |
| Meta del Código Rojo: resolver una caída global en una hora | b07 | SiliconANGLE: https://siliconangle.com/2026/11/24/microsoft-declares-internal-code-red-after-nearly-24-hour-microsoft-365-outage/ |
| Son memos internos que Microsoft no publicó: la meta no es un compromiso anunciado con los clientes | b08 | Reuters vía RTÉ: https://www.rte.ie/news/business/2026/1125/1600565-microsoft-declares-code-red-after-historic-outage-memo/ |
| Las empresas que pagan Microsoft 365 pueden reclamar un crédito (descuento) por el contrato de nivel de servicio (SLA) | b09 | Inc.: https://www.inc.com/liyana-illyas/microsoft-outlook-outage-could-qualify-business-50-percent-credit/91436775 |
| El crédito no se aplica solo: hay que pedirlo | b10 | Windows Latest (13/11/2026): https://www.windowslatest.com/2026/11/13/microsoft-365-outage-you-may-get-money-off-your-bill-if-you-use-it-for-work-but-youll-have-to-ask-microsoft-for-it-as-a-server-failure-takes-down-outlook-teams-and-exchange/ y Inc. (misma URL) |
| Comprando directo a Microsoft, el plazo para reclamar esta caída vence el 31/12/2026 (fin del mes calendario siguiente a la caída); por revendedor, antes | b10 | Office Watch: https://office-watch.com/2026/microsoft-365-outage-sla-claim/ y LazyAdmin: https://lazyadmin.nl/office-365/claim-microsoft-365-sla-credit-after-an-outage/ |

### Aclaraciones de rigor
- "Un arreglo urgente tardaba cinco o seis días" (b06) y "resolver una caída global en una hora" (b07) son dos medidas
  parecidas, no idénticas. El guion no dice "de seis días a una hora": las pone en frases separadas.
- El descuento (b09-b10) sale de guías y medios especializados, no de un comunicado de Microsoft. Por eso va "según guías
  especializadas" y no se dice ningún porcentaje: el 25/50/100% del SLA de Exchange Online y el "50%" de esta caída son
  cálculos de esas guías. Tampoco se dice que toda empresa lo cobra: "puede reclamar".
- "Comprando directo" es la condición del plazo del 31/12. Por revendedor el plazo es anterior; queda en la descripción.
- No se nombra a quien "declaró" el Código Rojo: Reuters no lo dice.
- Afuera por falta de confirmación o por recorte: la disculpa pública de Satya Nadella del 18/11 (aparece en Yahoo Finance y
  24/7 Wall St., pero no suma al que mira), el 14% de capacidad caída y el "80% de servidores" (un solo resumen), la duración
  de "30 horas" del incidente de Exchange (fuentes contradictorias con las casi 24 horas), y el informe final del 20/11.
- Vigencia al 27/11/2026: el plazo del 31/12 sigue abierto (quedan 34 días). No se encontraron cambios en el Código Rojo
  desde la exclusiva del 24/11.
- Personas reales: no aparece ninguna en pantalla.

## Placas por plano

Texto exacto de cada texto en pantalla. Fuera de esto, solo los subtítulos. Nada de "Parte N".

| plano | placa |
|---|---|
| b01 | "¿SE TE CORTÓ EL MAIL DEL TRABAJO?" + fecha chica "12 DE NOVIEMBRE" |
| b02 | "CASI 24 HORAS SIN CORREO" |
| b03 | "CÓDIGO ROJO" + chico "según memos que leyó Reuters" |
| b04 | "NO FUE UN ATAQUE" + "JULIO → NOVIEMBRE: 4 MESES SIN VERLO" |
| b05 | "+ TRÁFICO DE TEAMS" / "- CAPACIDAD" |
| b06 | "ARREGLO URGENTE: 5 A 6 DÍAS" |
| b07 | "META: 1 HORA" |
| b08 | "MEMO INTERNO, NO PROMESA" |
| b09 | "TU EMPRESA PUEDE RECLAMAR UN DESCUENTO" |
| b10 | "HASTA EL 31/12" + chico "compra directa, según guías especializadas" |
| b11 | "MANDÁSELO AL DE SISTEMAS" |

## Títulos

1. **¿Se te cortó el mail del trabajo el 12 de noviembre? Microsoft declaró un Código Rojo**
2. **Casi 24 horas sin correo: tu empresa puede reclamar un descuento hasta el 31 de diciembre**
3. **El defecto que nadie vio en cuatro meses y dejó sin mail a empresas de todo el mundo**

## Ganchos alternativos

- "Abrís el mail del trabajo y no carga. Fue el 12 de noviembre, y no eras vos." (E48 vos como usuario)
- "Tu empresa puede reclamarle plata a Microsoft por el 12 de noviembre. El plazo vence el 31 de diciembre." (I90 quedan n días)

## Descripción de Instagram

```
¿El 12 de noviembre se te cortó el mail del trabajo? No era tu compu.

El correo de empresas de Microsoft estuvo caído casi 24 horas. Según memos internos que leyó Reuters, adentro declararon un "Código Rojo".
Un arreglo de julio traía un defecto que nadie vio en cuatro meses. Otro memo admite que un arreglo urgente tardaba 5 o 6 días en llegar a todo el mundo, y la meta nueva es resolver una caída global en una hora. Es un memo interno, no una promesa a los clientes.

Si tu empresa paga Microsoft 365, puede reclamar un descuento: no se aplica solo. Según guías especializadas, comprando directo a Microsoft el plazo vence el 31 de diciembre. Si compraron por un revendedor, el plazo es antes: pregúntenle.

Mandáselo al de sistemas de tu trabajo.

#microsoft #outlook #trabajo #tecnologia #noticias
```
