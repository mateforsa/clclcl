# Juicio por YPF: Burford pide US$ 14.400 millones en otro tribunal, el CIADI

Video nuevo (no es continuación de ningún otro: sin "parte N" en voz, placas, portada, títulos ni descripción). Se escribe el
viernes 27/11/2026, corrida de las 14:34 (candidato 4). Tema sensible (economía y Estado): se cuenta qué se reclama, dónde y en
qué etapa está. Sin opinión política, sin nombrar gobiernos ni dirigentes en la voz (la expropiación se dice con el año, 2012),
sin decir que la Argentina "debe" ni que "tiene que pagar": es un reclamo, no una condena.
Video vertical 1080x1920, 30 fps, unos 0:60 a 0:65, 14 planos, sin carteles de capítulo. Voz: Juanma (ElevenLabs), una sola toma.
194 palabras dichas (contadas sobre la parte "dicho" de `parrafos.json`).

- **Inicio:** J99 el error común (playbook 1, sección J): "Si creés que el juicio por YPF se terminó en marzo, te falta un dato."
  Golpe 2: lo que pasó en marzo (Nueva York revocó la condena; había cerca de 16.000 millones en juego). Golpe 3, la contradicción:
  "Pero el fondo Burford abrió otro reclamo, en otro tribunal." No es "Sos X". Los dos videos anteriores en `hooks_used.json` usan
  H76 (`de-donde-vienen-tus-cosas`) y E47 (`ludopatia-sponsors-futbol`); el último J (J91) fue `rockstar-sindicato-no`, hace cuatro
  videos, y J99 no se usó nunca.
- **Cierre:** continuación con fecha concreta (playbook 3, n.º 1 "La sentencia sale en [fecha]... te cuento cómo termina", adaptado
  a un plazo real): "La Argentina tiene hasta el 2 de diciembre para responder ese pedido en la Corte Suprema de Estados Unidos.
  Ese día te cuento qué dijo." Viene
  después del callback a los dos números (plano 13). Sin "Seguime para la próxima historia", sin pregunta.
- **Imagen que abre y cierra:** una balanza low-poly con una pila de billetes en un platillo. Plano 1: un mazo de juez baja en un
  edificio con cartel `NUEVA YORK` y la pila se cae de la balanza. Plano 4: una flecha sale del edificio de Nueva York hacia otro edificio
  con cartel `CIADI · BANCO MUNDIAL` (la ciudad de la sede no está en las fuentes: sin mapa ni ciudad) y la pila se vuelve a armar en otra balanza, un poco más baja. Plano 13: las dos
  balanzas lado a lado, 16.000 contra 14.400. Las pilas son un esquema, no a escala.
- **Re-ganchos:** el dato que falta (0:00), 16.000 millones (0:10), el "pero" de Burford (0:14), 14.400 (0:19), 2012 (0:26),
  Petersen (0:30), "es un reclamo" (0:39), 5 a 10 años (0:45), la Corte Suprema (0:47), callback de los dos números (0:52),
  2 de diciembre (0:57). Ningún tramo pasa de 8 s sin dato nuevo.
- **Checker de la skill:** 85/100, cero fallas graves. Los tres avisos leves son del lector en inglés (no lee "YPF" escrito como se
  dice, ni números con letras, ni un cierre en castellano).

## Guion final (una línea por plano)

> Producción (27/11): la toma con el plano 10 duraba 68,1 s; se sacó "Y el tribunal recién se está formando" (quedan 13 planos, 67,1 s). La placa `TRIBUNAL EN FORMACIÓN` va como cartel 3D en el plano 9, con las sillas `ÁRBITRO · NEUTRAL · ÁRBITRO`. CIADI se dice deletreado ("ce, i, a, de, i").

| # | Tiempo | Texto |
|---|--------|-------|
| 1 | 0:00 | Si creés que el juicio por YPF se terminó en marzo, te falta un dato. |
| 2 | 0:06 | Ese mes, la Justicia de Nueva York revocó la condena contra la Argentina. |
| 3 | 0:10 | En juego había cerca de 16.000 millones de dólares. |
| 4 | 0:14 | Pero el fondo Burford abrió otro reclamo, en otro tribunal: el CIADI, del Banco Mundial. |
| 5 | 0:19 | Ahora pide 14.400 millones de dólares más intereses, según el informe del jefe de Gabinete al Senado. |
| 6 | 0:26 | Todo viene de la expropiación de YPF, en 2012. |
| 7 | 0:30 | Reclaman dos sociedades Petersen, y Burford tiene intereses en ese juicio. |
| 8 | 0:34 | Dicen lo mismo que en Nueva York: que no les ofrecieron comprarles las acciones. |
| 9 | 0:39 | Esto es un reclamo. Ahí todavía no hay ningún fallo. |
| 10 | 0:42 | Y el tribunal recién se está formando. |
| 11 | 0:45 | Según Clarín, estos casos duran de 5 a 10 años. |
| 12 | 0:47 | En Estados Unidos, los demandantes le pidieron a la Corte Suprema que revise el fallo. |
| 13 | 0:52 | En Nueva York eran 16.000 millones. Ahora son 14.400, en otro tribunal. |
| 14 | 0:57 | La Argentina tiene hasta el 2 de diciembre para responder ese pedido en la Corte Suprema de Estados Unidos. Ese día te cuento qué dijo. |

Tiempos estimados a unas 2,97 palabras dichas por segundo (el ritmo real de `kioscos-53000`: 190 palabras en 63,98 s): unos 65 s;
a 2,9 darían unos 67 s. Los reales salen de `timing.json` después de la voz. Si la toma pasa de 65 s, el plano 10 es el primero que se puede recortar (el dato
pasa a la placa del plano 9).

## PRONUNCIACIÓN A CONFIRMAR

Glosario consultado (`python3 fabrica/pronunciacion.py glosario`, 27/11/2026): **ningún término extranjero ni sigla de este video
está en el glosario.** En `parrafos.json` quedó una forma provisoria para que la toma no se trabe, pero no está elegida: el productor
tiene que generar las variantes numeradas (`pronunciacion.py probar`) y que el dueño o Whisper elijan.

| Término | Dónde lo dice la voz | Forma provisoria en `parrafos.json` | Variantes para probar |
|---|---|---|---|
| Burford | planos 4 y 7 | `[Búrford\|Burford]` | Búrford · Bérford · Bórford · Burford (sin tilde) · Bérfor |
| Petersen | plano 7 | `[Pétersen,\|Petersen,]` | Pétersen · Péterssen · Píterson · Petersén |
| CIADI | plano 4 | `[ciádi,\|CIADI,]` | ciádi · ce, i, a, de, i · siádi · ciadí |
| YPF | planos 1 y 6 | `[i pe efe\|YPF]` | i pe efe · ye pe efe · i griega pe efe · YPF (sin cambio) |

- "Santilli" (jefe de Gabinete), "Eton Park", "Burford Capital" y "Maximiliano Abad" van **solo en placa o descripción**: la voz
  dice "el jefe de Gabinete" y "los demandantes". No hace falta probarlos.
- "Clarín", "Nueva York", "Banco Mundial" y "Corte Suprema" son castellano: sin marca.
- Números: todos con `[dicho|mostrado]` (16.000 millones, 14.400 millones, 14.400, 2012, 5, 10, 2 de diciembre).

## Hoja de datos y fuentes

Fuentes leídas en las copias bajadas con curl el 27/11/2026 (BAE Negocios y Clarín, las dos publicadas el miércoles 25/11/2026,
por eso el guion no dice "hoy"). Solo entran datos que están en esas dos páginas.

| Dato | Frase del guion | Fuente |
|---|---|---|
| La Cámara de Apelaciones de Nueva York revocó la condena contra la Argentina, casi seis meses antes del 15 de septiembre | 1 y 2: "se terminó en marzo" / "Ese mes, la Justicia de Nueva York revocó la condena contra la Argentina" | [BAE Negocios, 25/11/2026](https://www.baenegocios.com/economia/juicio-por-ypf-burford-reclama-usd-14-400-millones-en-un-nuevo-arbitraje-contra-la-argentina/) ("casi seis meses después de que la Cámara de Apelaciones de Nueva York revocara la condena contra la Argentina") |
| El mes fue marzo de 2026: la segunda instancia le dio la razón a la Argentina | 1 y 2: "en marzo" / "Ese mes" | [Clarín, 25/11/2026](https://www.clarin.com/economia/juicio-ypf-gobierno-dice-fondo-burford-reclama-us-14400-millones-nueva-demanda-inicio-ciadi_0_Tp61FKCNn5.html) ("En marzo de este año la segunda instancia judicial le dio la razón a la Argentina") |
| En Nueva York estaban en juego cerca de US$ 16.000 millones | 3 y 13: "cerca de 16.000 millones de dólares" / "En Nueva York eran 16.000 millones" | [BAE Negocios](https://www.baenegocios.com/economia/juicio-por-ypf-burford-reclama-usd-14-400-millones-en-un-nuevo-arbitraje-contra-la-argentina/) ("los cerca de USD 16.000 millones que estaban en juego en los tribunales de Nueva York"), [Clarín](https://www.clarin.com/economia/juicio-ypf-gobierno-dice-fondo-burford-reclama-us-14400-millones-nueva-demanda-inicio-ciadi_0_Tp61FKCNn5.html) ("la sentencia buscada por el fondo era de unos US$ 16.000 millones") |
| Burford inició un nuevo arbitraje ante el CIADI, que depende del Banco Mundial | 4: "el fondo Burford abrió otro reclamo, en otro tribunal: el CIADI, del Banco Mundial" | [BAE Negocios](https://www.baenegocios.com/economia/juicio-por-ypf-burford-reclama-usd-14-400-millones-en-un-nuevo-arbitraje-contra-la-argentina/) ("organismo vinculado al Banco Mundial"), [Clarín](https://www.clarin.com/economia/juicio-ypf-gobierno-dice-fondo-burford-reclama-us-14400-millones-nueva-demanda-inicio-ciadi_0_Tp61FKCNn5.html) ("El CIADI depende administrativamente del Banco Mundial") |
| El arbitraje se registró el 15 de septiembre | placa del plano 4 | [BAE Negocios](https://www.baenegocios.com/economia/juicio-por-ypf-burford-reclama-usd-14-400-millones-en-un-nuevo-arbitraje-contra-la-argentina/) ("El nuevo arbitraje se registró el 15 de septiembre") |
| Burford pide US$ 14.400 millones, según el informe del jefe de Gabinete, Diego Santilli, al Senado; además pide intereses compuestos (sin indicar la tasa) y costas | 5: "Ahora pide 14.400 millones de dólares más intereses, según el informe del jefe de Gabinete al Senado" | [BAE Negocios](https://www.baenegocios.com/economia/juicio-por-ypf-burford-reclama-usd-14-400-millones-en-un-nuevo-arbitraje-contra-la-argentina/) ("según reveló el jefe de Gabinete, Diego Santilli, en un informe enviado al Senado"; "se solicitan intereses compuestos anteriores y posteriores al laudo, sin indicar la tasa, y costas"), [Clarín](https://www.clarin.com/economia/juicio-ypf-gobierno-dice-fondo-burford-reclama-us-14400-millones-nueva-demanda-inicio-ciadi_0_Tp61FKCNn5.html) |
| La disputa viene de la expropiación de YPF en 2012 | 6: "Todo viene de la expropiación de YPF, en 2012" | [BAE Negocios](https://www.baenegocios.com/economia/juicio-por-ypf-burford-reclama-usd-14-400-millones-en-un-nuevo-arbitraje-contra-la-argentina/) ("La disputa internacional por la expropiación de YPF en 2012"), [Clarín](https://www.clarin.com/economia/juicio-ypf-gobierno-dice-fondo-burford-reclama-us-14400-millones-nueva-demanda-inicio-ciadi_0_Tp61FKCNn5.html) |
| Los demandantes formales son Petersen Energía y Petersen Energía Inversora; Burford tiene intereses económicos en ese litigio | 7: "Reclaman dos sociedades Petersen, y Burford tiene intereses en ese juicio" | [BAE Negocios](https://www.baenegocios.com/economia/juicio-por-ypf-burford-reclama-usd-14-400-millones-en-un-nuevo-arbitraje-contra-la-argentina/) ("Los demandantes formales son Petersen Energía y Petersen Energía Inversora, sociedades en cuyo litigio Burford tiene intereses económicos") |
| La controversia se origina en "la alegada falta de emisión por parte de Argentina de una oferta de adquisición de acciones"; es el mismo fundamento que en Nueva York | 8: "Dicen lo mismo que en Nueva York: que no les ofrecieron comprarles las acciones" | [Clarín](https://www.clarin.com/economia/juicio-ypf-gobierno-dice-fondo-burford-reclama-us-14400-millones-nueva-demanda-inicio-ciadi_0_Tp61FKCNn5.html) ("el fundamento del reclamo es el mismo que llevó a los demandantes a los tribunales de Nueva York"), [BAE Negocios](https://www.baenegocios.com/economia/juicio-por-ypf-burford-reclama-usd-14-400-millones-en-un-nuevo-arbitraje-contra-la-argentina/) |
| El reclamo se sustenta en el tratado bilateral de inversiones entre España y la Argentina de 1991 | solo en la descripción | [BAE Negocios](https://www.baenegocios.com/economia/juicio-por-ypf-burford-reclama-usd-14-400-millones-en-un-nuevo-arbitraje-contra-la-argentina/) |
| El proceso está en la etapa de conformación del tribunal: un árbitro propuesto por cada parte y un tercero neutral (por eso todavía no hay laudo) | 9 y 10: "Ahí todavía no hay ningún fallo" / "Y el tribunal recién se está formando" | [Clarín](https://www.clarin.com/economia/juicio-ypf-gobierno-dice-fondo-burford-reclama-us-14400-millones-nueva-demanda-inicio-ciadi_0_Tp61FKCNn5.html) ("Todavía la demanda está en proceso de conformación del tribunal, con un integrante propuesto por cada parte más un tercero neutral"), [BAE Negocios](https://www.baenegocios.com/economia/juicio-por-ypf-burford-reclama-usd-14-400-millones-en-un-nuevo-arbitraje-contra-la-argentina/) ("recién transita la etapa de conformación del tribunal") |
| Suelen ser procesos de entre 5 y 10 años hasta una resolución definitiva | 11: "Según Clarín, estos casos duran de 5 a 10 años" | [Clarín](https://www.clarin.com/economia/juicio-ypf-gobierno-dice-fondo-burford-reclama-us-14400-millones-nueva-demanda-inicio-ciadi_0_Tp61FKCNn5.html) ("Suelen ser procesos largos, de entre 5 y 10 años hasta conocer una resolución definitiva") |
| Promedio de los arbitrajes del CIADI: 47 meses, según su informe anual 2026 (sin contar anulaciones) | placa del plano 11 | [BAE Negocios](https://www.baenegocios.com/economia/juicio-por-ypf-burford-reclama-usd-14-400-millones-en-un-nuevo-arbitraje-contra-la-argentina/) |
| Petersen y Eton Park pidieron el 30 de septiembre que la Corte Suprema de EE.UU. revise el fallo de la Cámara; la Corte todavía no decidió si acepta el recurso | 12: "En Estados Unidos, los demandantes le pidieron a la Corte Suprema que revise el fallo" | [BAE Negocios](https://www.baenegocios.com/economia/juicio-por-ypf-burford-reclama-usd-14-400-millones-en-un-nuevo-arbitraje-contra-la-argentina/) ("Petersen y Eton Park solicitaron el 30 de septiembre que la Corte Suprema de EEUU revise el fallo"; "todavía no decidió si aceptar el recurso"), [Clarín](https://www.clarin.com/economia/juicio-ypf-gobierno-dice-fondo-burford-reclama-us-14400-millones-nueva-demanda-inicio-ciadi_0_Tp61FKCNn5.html) ("dejó como única ventana en ese país una elevación a la Corte Suprema") |
| La Argentina y YPF tienen plazo hasta el 2 de diciembre para responder el pedido de revisión ante la Corte Suprema de EE.UU. | 14: "La Argentina tiene hasta el 2 de diciembre para responder ese pedido en la Corte Suprema de Estados Unidos" | [BAE Negocios](https://www.baenegocios.com/economia/juicio-por-ypf-burford-reclama-usd-14-400-millones-en-un-nuevo-arbitraje-contra-la-argentina/) ("tanto la Argentina como YPF tienen plazo hasta el 2 de diciembre para responder") |

Límites y cómo los trata el guion:
- **El monto es lo que dice el informe oficial que pide Burford**, no lo que se debe. La voz lo atribuye en el mismo plano 5
  ("según el informe del jefe de Gabinete al Senado") y la placa dice `SEGÚN EL INFORME DE JEFATURA DE GABINETE AL SENADO`. No se
  dice en ningún lado que la Argentina "debe" ni "tiene que pagar"; el plano 9 dice que es un reclamo y que no hay fallo.
- **La revocación de marzo está en las dos fuentes.** BAE dice que la Cámara de Apelaciones de Nueva York revocó la condena casi
  seis meses antes del 15/9; Clarín dice que en marzo la segunda instancia le dio la razón a la Argentina. El monto de ~16.000 M es
  lo que "estaba en juego" (BAE) o "la sentencia buscada por el fondo" (Clarín): el guion dice "en juego había cerca de 16.000
  millones" y no dice cuánto decía la condena de primera instancia, porque ninguna de las dos fuentes da esa cifra.
- **No es de hoy.** El reclamo se registró el 15/9 y el monto se conoció por notas del 25/11. La voz no dice "hoy" ni "esta semana"
  en el plano 5; dice "Ahora pide".
- **5 a 10 años es de Clarín** y la voz lo atribuye. BAE da otro dato (47 meses de promedio, informe del CIADI); va solo en placa,
  atribuido, para no mezclar las dos cifras en la voz.
- **El 2 de diciembre** es el plazo para responder el pedido de revisión que Petersen y Eton Park presentaron ante la Corte
  Suprema de EE.UU. (BAE); la Corte no le preguntó nada a la Argentina. La voz nombra la Corte Suprema de Estados Unidos en el
  plano 14 para que no se confunda con el CIADI del plano 13. La Corte todavía no decidió si toma el caso:
  el cierre promete contar qué contestó la Argentina, no qué decidió la Corte.
- **Sin política:** Clarín menciona que la expropiación fue "durante el gobierno de Cristina Kirchner"; el guion dice solo "en
  2012", como BAE en su primera línea. No se nombra a ningún gobierno ni dirigente en la voz. Santilli y Abad solo en placa o
  descripción, como autor y destinatario del informe.
- Quedaron afuera por duración o tono: el 86% de casos favorables a inversores según el Transnational Institute (incluye acuerdos;
  se puede leer como pronóstico), los otros reclamos ante el CIADI (AES, Abertis, Webuild, NN), lo que Burford dijo a sus
  inversores en mayo y la frase "escasas chances" de los especialistas citados por Clarín.

## Placas por plano

Aparte de los subtítulos. Mayúsculas y signos tal como van. Sin "parte N" en ningún lado.

| # | Placa(s) | Cuándo |
|---|---|---|
| 1 | `JUICIO POR YPF: ¿TERMINÓ?` | desde el cuadro 0 (el gancho en mudo, sobre el mazo que baja en el edificio de Nueva York) |
| 2 | `MARZO 2026 · NUEVA YORK` · `REVOCARON LA CONDENA` | en "mes," y en "revocó" |
| 3 | `~US$ 16.000 MILLONES EN JUEGO` | en "16.000 millones" |
| 4 | `NUEVO RECLAMO: CIADI` · `DEPENDE DEL BANCO MUNDIAL · REGISTRADO EL 15/9` | en "CIADI," y en "Mundial." |
| 5 | `PIDE US$ 14.400 MILLONES + INTERESES` · `SEGÚN EL INFORME DE JEFATURA DE GABINETE AL SENADO` | en "14.400 millones" y en "Senado." |
| 6 | `EXPROPIACIÓN DE YPF · 2012` | en "2012." |
| 7 | `DEMANDANTES: PETERSEN ENERGÍA Y PETERSEN ENERGÍA INVERSORA` · `BURFORD CAPITAL TIENE INTERESES EN EL LITIGIO` | en "Petersen," y en "juicio." |
| 8 | `MISMO ARGUMENTO QUE EN NUEVA YORK` · `NO LES HICIERON UNA OFERTA POR SUS ACCIONES (SEGÚN EL RECLAMO)` | en "Nueva York:" y en "acciones." |
| 9 | `ES UN RECLAMO` · `TODAVÍA NO HAY FALLO` | en "reclamo." y en "fallo." |
| 10 | `TRIBUNAL EN FORMACIÓN` · `1 ÁRBITRO POR PARTE + 1 NEUTRAL` | en "tribunal" y en "formando." |
| 11 | `5 A 10 AÑOS · SEGÚN CLARÍN` · `PROMEDIO DEL CIADI: 47 MESES · INFORME ANUAL 2026` | en "5" y al final del plano |
| 12 | `EE.UU.: PIDIERON QUE LA CORTE SUPREMA REVISE EL FALLO` · `LA CORTE TODAVÍA NO DECIDIÓ SI LO TOMA` | en "Corte Suprema" y en "fallo." |
| 13 | `NUEVA YORK: ~US$ 16.000 M` · `CIADI: US$ 14.400 M + INTERESES` | en "16.000 millones." y en "14.400," |
| 14 | `EE.UU.: PLAZO PARA RESPONDER EL PEDIDO · 2 DE DICIEMBRE` · `ESE DÍA TE CUENTO` | en "2 de diciembre" y en "cuento" |

Fuentes en pantalla (texto chico, abajo, planos 2 a 14): `FUENTES: BAE NEGOCIOS Y CLARÍN, 25/11/2026`.
Personas: no aparece ninguna persona real con cara. Si hace falta un juez o un árbitro, muñeco genérico sin nombre. Marcas: sin
logos de YPF, Burford, CIADI ni Banco Mundial; los nombres van en texto plano. Edificios genéricos: en el plano 4, uno con cartel `NUEVA YORK` y otro con
`CIADI · BANCO MUNDIAL`, sin mapa ni ciudad para el segundo (la sede no está en las fuentes). Las pilas de billetes de los planos 3, 5 y 13 llevan `ESQUEMA, NO A ESCALA`.

## Títulos

1. **Juicio por YPF: Burford ahora pide US$ 14.400 millones en otro tribunal**
2. **El juicio por YPF no terminó en marzo: el nuevo reclamo en el CIADI**
3. **De Nueva York al CIADI: cuánto reclama Burford por YPF y qué falta**

## Descripción de Instagram

```
Si creés que el juicio por YPF se terminó en marzo, te falta un dato.

En marzo, la Cámara de Apelaciones de Nueva York revocó la condena contra la Argentina. En juego había cerca de US$ 16.000 millones.
Pero el 15 de septiembre se registró un nuevo arbitraje en el CIADI, el tribunal que depende del Banco Mundial. Los demandantes son Petersen Energía y Petersen Energía Inversora, en cuyo litigio tiene intereses el fondo Burford Capital.
Según el informe de la Jefatura de Gabinete al Senado, piden US$ 14.400 millones, más intereses compuestos (sin indicar la tasa) y costas. El reclamo se apoya en el tratado de inversiones entre España y la Argentina de 1991.
Es un reclamo: no hay fallo. El tribunal todavía se está formando y, según Clarín, estos casos duran de 5 a 10 años.
En Estados Unidos, los demandantes pidieron que la Corte Suprema revise el fallo. La Argentina e YPF tienen plazo hasta el 2 de diciembre para responder. Ese día te cuento qué dijeron.

Fuentes: BAE Negocios y Clarín (25/11/2026), con datos del informe de Jefatura de Gabinete al Senado.

#ypf #ciadi #burford #economia #argentina
```

## Cómo regenerar

```
python3 fabrica/pronunciacion.py probar "Burford" "Pero el fondo ## abrió otro reclamo." Búrford Bérford Bórford Burford Bérfor
python3 fabrica/pronunciacion.py probar "Petersen" "Reclaman dos sociedades ##, y el fondo tiene intereses." Pétersen Péterssen Píterson Petersén
python3 fabrica/pronunciacion.py probar "CIADI" "En otro tribunal: el ##, del Banco Mundial." ciádi "ce, i, a, de, i" siádi ciadí
python3 fabrica/pronunciacion.py probar "YPF" "El juicio por ## no se terminó." "i pe efe" "ye pe efe" "i griega pe efe" YPF
python3 scripts/voice.py ypf-burford-ciadi       # voz + tiempos (ElevenLabs)
python3 fabrica/pronunciacion.py oir ypf-burford-ciadi
scripts/stills.sh ypf-burford-ciadi
npx tsx scripts/events.ts ypf-burford-ciadi && python3 scripts/audio.py ypf-burford-ciadi
scripts/render.sh ypf-burford-ciadi              # out/ypf-burford-ciadi/ypf-burford-ciadi.mp4
scripts/cover.sh ypf-burford-ciadi               # out/ypf-burford-ciadi/portada.png
```
