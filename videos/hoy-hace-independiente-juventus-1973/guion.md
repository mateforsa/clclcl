# Hoy hace 53 años: el gol de Bochini que estuvo perdido

Efeméride suelta del 28/11 (Independiente 1, Juventus 0, Roma, 28/11/1973). No es continuación de ningún video: sin "parte N"
en voz, placas, portada, títulos ni descripción. Se escribe la noche del viernes 27/11/2026 para publicar el sábado 28/11/2026, el día del aniversario.
Video vertical 1080x1920, 30 fps, 13 planos, sin carteles de capítulo. Voz: Juanma, una sola toma.
179 palabras dichas (contadas sobre la parte "dicho" de `parrafos.json`, con los números en letras): unos 0:60 a 0:62 a 2,9
palabras por segundo. No más: el último video se fue a 74 s. Si la toma pasa de 65 s, se recorta primero el final del plano 11
("sin saber si estaba el gol") y después el plano 6 (penal); el dato del penal queda en la descripción.

- **Inicio:** F52 objeto fuera de lugar (playbook 1, sección F): "Un VHS negro llega por correo desde Italia. En el lomo: Juventus
  contra Independiente." Golpe 2 (plano 2): "Adentro hay un gol perdido desde 1973." Golpe 3, la fecha del aniversario (plano 3):
  "Roma, 28 de noviembre. Hoy hace 53 años." El "hoy hace" va como golpe 3 y no como fórmula de apertura, porque el video
  anterior a este usó la sección I (I82, gta-v-nivel-del-mar) y el último usó A8 (exportaciones-agro-5717). La última sección F
  fue F53 (libertadores-plata-final, cinco videos atrás). No es "Sos X".
- **Cierre:** playbook 4, Memoria personal, n.º 34 adaptado ("¿Quién lo vio en vivo?"): "¿Alguien en tu casa lo vio en vivo?
  Contalo abajo." Apunta a padres y abuelos, que lo vieron por Canal 7. Sin "Seguime", sin predicción, sin continuación, sin
  número, sin elegir entre dos (los cierres recientes fueron adiviná el precio, mandáselo, qué hubieras hecho, un número).
- **Imagen que abre y cierra:** el VHS negro con el papel en el lomo. Plano 1: el sobre cae en un felpudo y el casete se desliza
  afuera. Plano 12: el mismo casete entra en una videocasetera y la tele se prende con la jugada en low-poly.
- **Re-ganchos:** gol perdido (0:05), hoy hace 53 años (0:09), el Ajax no quiso (0:12), la condición (0:16), el penal (0:21),
  faltan diez minutos (0:25), el gol (0:30), no quedó rastro (0:34), el hincha (0:39), 500 euros (0:45), el timbre (0:52).
  No hay ningún tramo de más de 8 s sin algo nuevo.
- Chequeo a mano con la skill: sin rayas, sin punto y coma, sin "no es X, es Y", una sola pregunta (la del cierre), sin palabras
  de IA. "Uno a cero" no se dice en voz: va en la placa del plano 8.

## Guion final (una línea por plano)

Tiempos estimados a unas 2,9 palabras dichas por segundo; los reales salen de `timing.json` después de la voz.

| # | Tiempo | Texto |
|---|--------|-------|
| 1 | 0:00 | Un VHS negro llega por correo desde Italia. En el lomo: Juventus contra Independiente. |
| 2 | 0:05 | Adentro hay un gol perdido desde 1973. |
| 3 | 0:09 | Roma, 28 de noviembre. Hoy hace 53 años. |
| 4 | 0:12 | El Ajax, campeón de Europa, no quiso jugar la final contra Independiente. |
| 5 | 0:16 | Lo reemplazó el subcampeón, Juventus, con una condición: un solo partido, y en Italia. |
| 6 | 0:21 | En el segundo tiempo, Juventus tira un penal por arriba del travesaño. |
| 7 | 0:25 | Faltan diez minutos. Bochini y Bertoni, dos pibes, hacen dos paredes seguidas. |
| 8 | 0:30 | Bochini queda solo contra el arquero y se la pica. Primera Intercontinental del club. |
| 9 | 0:34 | Canal 7 lo pasó en vivo. Después, no quedó rastro: solo fotos y dibujos. |
| 10 | 0:39 | Hasta que un hincha, Mariano Asch, llegó a la RAI, la tele italiana, por un amigo de allá. |
| 11 | 0:45 | Mandó mail tras mail. Le pidieron 500 euros por digitalizar la cinta, sin saber si estaba el gol. |
| 12 | 0:52 | En 2007 le tocaron el timbre: el VHS negro, con el golazo del Bocha. |
| 13 | 0:58 | ¿Alguien en tu casa lo vio en vivo? Contalo abajo. |

## PRONUNCIACIÓN A CONFIRMAR

Glosario consultado (`python3 fabrica/pronunciacion.py glosario` y `fabrica/pronunciacion.json`, 27/11/2026): no está ninguno de
estos términos. Las formas de `parrafos.json` son una propuesta: probar las variantes con `pronunciacion.py probar` antes de la toma.

| Término | Dónde | Estado | Forma en `parrafos.json` y variantes para probar |
|---|---|---|---|
| Juventus | voz, planos 1, 5 y 6 | PRONUNCIACIÓN A CONFIRMAR | `[Yuventus|Juventus]` · variantes: Yuventus · Iuventus · Yuvéntus · Juventus |
| Ajax | voz, plano 4 | PRONUNCIACIÓN A CONFIRMAR | `[Áyax,|Ajax,]` · variantes: Áyax · Áiax · Ájax · Ayax |
| Asch | voz, plano 10 | PRONUNCIACIÓN A CONFIRMAR | `[Ash,|Asch,]` · variantes: Ash · Asch · Ásch · Asc |
| RAI | voz, plano 10 | PRONUNCIACIÓN A CONFIRMAR (que no la deletree) | `[Rai,|RAI,]` · variantes: Rai · Rái · la Rai · erre a i |
| VHS | voz, planos 1 y 12 | PRONUNCIACIÓN A CONFIRMAR | `[ve hache ese|VHS]` · variantes: ve hache ese · ve, hache, ese · uve hache ese |
| Bochini | voz, planos 7 y 8 | apellido que se lee en castellano; mirar en `oir` | tal cual · si falla: Bochíni · Bo-chi-ni |
| Bertoni | voz, plano 7 | apellido que se lee en castellano; mirar en `oir` | tal cual · si falla: Bertóni |
| Bocha | voz, plano 12 | apodo castellano | tal cual |
| Zoff | solo placa (plano 8) | PRONUNCIACIÓN A CONFIRMAR si la voz la dijera | variantes: Zof · Tsof · Sof |
| Cuccureddu | solo placa (plano 6) | PRONUNCIACIÓN A CONFIRMAR si la voz la dijera | variantes: Cucurédu · Cucuréddu |

A propósito la voz no dice Zoff, Cuccureddu, Cruyff, Paolo Di Gaetano ni El Gráfico: dice "el arquero", "un penal", "un amigo
de allá" y "dibujos"; los nombres van en placa. Mirar en `oir`: "Rojo" no aparece; "se la pica" y "Contalo".

## Hoja de datos y fuentes

Fuentes leídas en las copias bajadas (scratchpad de la sesión, `buscador-2234/dl/n62.html` y `n63.html`). Solo entran datos que
están en esas dos páginas.

- La Nación (28/11/2023): https://www.lanacion.com.ar/deportes/futbol/independiente/a-medio-siglo-del-independiente-campeon-del-mundo-contra-juventus-en-italia-con-un-golazo-de-ricardo-nid28112023/
- Infobae (28/11/2023): https://www.infobae.com/deportes/2023/11/28/la-increible-historia-de-la-recuperacion-del-gol-perdido-de-bochini-a-50-anos-de-independiente-campeon-del-mundo/

| Dato | Frase del guion | Fuente |
|---|---|---|
| Llegó un sobre desde Italia con un VHS negro; en el lomo, un papel que decía "Juventus vs Independiente" | 1 y 12: "Un VHS negro llega por correo desde Italia. En el lomo: Juventus contra Independiente." / "le tocaron el timbre: el VHS negro" | [Infobae](https://www.infobae.com/deportes/2023/11/28/la-increible-historia-de-la-recuperacion-del-gol-perdido-de-bochini-a-50-anos-de-independiente-campeon-del-mundo/) (Asch: "tocaron el timbre y allí estaba el sobre proveniente de Italia, cuyo contenido era un VHS de color negro, que en lomo tenía un papel con la leyenda 'Juventus vs Independiente'") |
| El gol se consideraba perdido: no quedó rastro de la transmisión | 2 y 9: "un gol perdido desde 1973" / "no quedó rastro" | [Infobae](https://www.infobae.com/deportes/2023/11/28/la-increible-historia-de-la-recuperacion-del-gol-perdido-de-bochini-a-50-anos-de-independiente-campeon-del-mundo/) (título: "el gol perdido de Bochini"; "luego no quedó rastro alguno") |
| Partido el 28 de noviembre de 1973 en el estadio Olímpico de Roma | 3: "Roma, 28 de noviembre." | [La Nación](https://www.lanacion.com.ar/deportes/futbol/independiente/a-medio-siglo-del-independiente-campeon-del-mundo-contra-juventus-en-italia-con-un-golazo-de-ricardo-nid28112023/) ("Anochecía en el estadio Olímpico de Roma ... aquel 28 de noviembre de 1973") |
| 53 años | 3: "Hoy hace 53 años." | cuenta propia: 28/11/1973 a 28/11/2026 |
| El Ajax, campeón de Europa, no quiso jugar contra Independiente | 4: "El Ajax, campeón de Europa, no quiso jugar la final" | [Infobae](https://www.infobae.com/deportes/2023/11/28/la-increible-historia-de-la-recuperacion-del-gol-perdido-de-bochini-a-50-anos-de-independiente-campeon-del-mundo/) ("fue nuevamente el vencedor de la Champions, pero no quiso disputar el match contra los Rojos"); [La Nación](https://www.lanacion.com.ar/deportes/futbol/independiente/a-medio-siglo-del-independiente-campeon-del-mundo-contra-juventus-en-italia-con-un-golazo-de-ricardo-nid28112023/) (Ajax campeón ganándole 1-0 la final a la Juventus en Belgrado; "el Ajax no quiso venir") |
| Lo reemplazó el subcampeón, Juventus, con la condición de un solo partido (la modalidad era ida y vuelta) y en Italia | 5: "Lo reemplazó el subcampeón, Juventus, con una condición: un solo partido, y en Italia." | [Infobae](https://www.infobae.com/deportes/2023/11/28/la-increible-historia-de-la-recuperacion-del-gol-perdido-de-bochini-a-50-anos-de-independiente-campeon-del-mundo/) ("Su lugar lo tomó el sub campeón, Juventus, que puso como condición que fuese solo un partido (la modalidad era de ida y vuelta) y en Italia"); [La Nación](https://www.lanacion.com.ar/deportes/futbol/independiente/a-medio-siglo-del-independiente-campeon-del-mundo-contra-juventus-en-italia-con-un-golazo-de-ricardo-nid28112023/) (Pavoni: "Juventus aceptó con la condición de que fuera a partido único y en Italia") |
| A los dos minutos del segundo tiempo, penal para Juventus; lo pateó Antonello Cuccureddu y se fue por encima del travesaño | 6: "En el segundo tiempo, Juventus tira un penal por arriba del travesaño." | [La Nación](https://www.lanacion.com.ar/deportes/futbol/independiente/a-medio-siglo-del-independiente-campeon-del-mundo-contra-juventus-en-italia-con-un-golazo-de-ricardo-nid28112023/) |
| El gol llegó a diez minutos del final | 7: "Faltan diez minutos." | [La Nación](https://www.lanacion.com.ar/deportes/futbol/independiente/a-medio-siglo-del-independiente-campeon-del-mundo-contra-juventus-en-italia-con-un-golazo-de-ricardo-nid28112023/) ("La jugada que definió el partido ... llegó a diez minutos del final") |
| Bochini y Bertoni, dos pibes; dos paredes seguidas | 7: "Bochini y Bertoni, dos pibes, hacen dos paredes seguidas." | [La Nación](https://www.lanacion.com.ar/deportes/futbol/independiente/a-medio-siglo-del-independiente-campeon-del-mundo-contra-juventus-en-italia-con-un-golazo-de-ricardo-nid28112023/) ("consagró a dos pibes"; Muñoz: "los dos chicos argentinos"); [Infobae](https://www.infobae.com/deportes/2023/11/28/la-increible-historia-de-la-recuperacion-del-gol-perdido-de-bochini-a-50-anos-de-independiente-campeon-del-mundo/) (Bochini: "se la pasó a Bertoni y allí hicimos dos paredes seguidas") |
| Mano a mano con Dino Zoff, se la picó | 8: "Bochini queda solo contra el arquero y se la pica." | [Infobae](https://www.infobae.com/deportes/2023/11/28/la-increible-historia-de-la-recuperacion-del-gol-perdido-de-bochini-a-50-anos-de-independiente-campeon-del-mundo/) (Bochini: "me dejó mano a mano con Dino Zoff ... se la mandé por arriba"); [La Nación](https://www.lanacion.com.ar/deportes/futbol/independiente/a-medio-siglo-del-independiente-campeon-del-mundo-contra-juventus-en-italia-con-un-golazo-de-ricardo-nid28112023/) ("se la pico a Zoff") |
| 1-0 y primera Copa del Mundo (Intercontinental) de Independiente | 8: "Primera Intercontinental del club." (placa 1-0) | [La Nación](https://www.lanacion.com.ar/deportes/futbol/independiente/a-medio-siglo-del-independiente-campeon-del-mundo-contra-juventus-en-italia-con-un-golazo-de-ricardo-nid28112023/) ("le dio a Independiente su primera Copa del Mundo (o Intercontinental, de acuerdo con su nombre oficial)") |
| Canal 7 transmitió el partido vía satélite desde las 11 | 9: "Canal 7 lo pasó en vivo." | [Infobae](https://www.infobae.com/deportes/2023/11/28/la-increible-historia-de-la-recuperacion-del-gol-perdido-de-bochini-a-50-anos-de-independiente-campeon-del-mundo/) ("Canal 7 levantó su programación matutina para hacerle espacio a la transmisión del partido vía satélite desde las 11 hs") |
| Sobrevivieron las fotos en blanco y negro y los dibujos de El Gráfico | 9: "solo fotos y dibujos" | [Infobae](https://www.infobae.com/deportes/2023/11/28/la-increible-historia-de-la-recuperacion-del-gol-perdido-de-bochini-a-50-anos-de-independiente-campeon-del-mundo/) ("Las fotos en blanco y negro y la reconstrucción que realizó la revista El Gráfico ... eran los testimonios que habían sobrevivido") |
| Mariano Asch, hincha de Independiente, llegó a la RAI por su amigo italiano Paolo Di Gaetano, que le pasó el contacto de una empleada | 10: "un hincha, Mariano Asch, llegó a la RAI, la tele italiana, por un amigo de allá" | [Infobae](https://www.infobae.com/deportes/2023/11/28/la-increible-historia-de-la-recuperacion-del-gol-perdido-de-bochini-a-50-anos-de-independiente-campeon-del-mundo/) ("Productor musical, periodista y fanático de Independiente"; "Paolo Di Gaetano ... su vinculación con la RAI, la radio y televisión de aquel país"; "me dio el contacto de una mujer llamada María que trabajaba en la RAI") |
| Mandó mails muchas veces sin respuesta | 11: "Mandó mail tras mail." | [Infobae](https://www.infobae.com/deportes/2023/11/28/la-increible-historia-de-la-recuperacion-del-gol-perdido-de-bochini-a-50-anos-de-independiente-campeon-del-mundo/) ("Comencé a mandar mails en reiteradas ocasiones, pero nunca me contestaban") |
| Para saber si estaba el gol había que digitalizar el material, a 500 euros | 11: "Le pidieron 500 euros por digitalizar la cinta, sin saber si estaba el gol." | [Infobae](https://www.infobae.com/deportes/2023/11/28/la-increible-historia-de-la-recuperacion-del-gol-perdido-de-bochini-a-50-anos-de-independiente-campeon-del-mundo/) ("para saber eso había que digitalizar el material, cuyo valor era de 500 euros") |
| El video apareció en 2007; en el VHS estaban las mejores jugadas, el penal errado y el golazo del Bocha | 12: "En 2007 le tocaron el timbre: el VHS negro, con el golazo del Bocha." | [Infobae](https://www.infobae.com/deportes/2023/11/28/la-increible-historia-de-la-recuperacion-del-gol-perdido-de-bochini-a-50-anos-de-independiente-campeon-del-mundo/) (bajada: "le permitió encontrar el video del histórico gol en 2007"; "allá por 2007, cuando hizo su mágica aparición ese video"; "el penal errado por Cuccureddu y, por supuesto, el golazo del Bocha") |

Límites y cómo los trata el guion:
- **No se dice "la única final a partido único"** ni nada parecido: no está en las fuentes. Solo "un solo partido, y en Italia".
- **Por qué no vino el Ajax:** La Nación trae la versión del capitán Pavoni (temor por la seguridad tras el secuestro del presidente
  de Fiat). Es una versión atribuida y larga de explicar: no entra en voz ni en placa.
- **2007:** Infobae dice que el video "apareció" en 2007 y que el sobre llegó unos quince días después del intento fallido de
  proyectarlo en la RAI. El guion pone el timbre en 2007 siguiendo eso; no se da mes.
- **"Perdido desde 1973":** es como lo cuenta Infobae ("gol perdido", "no quedó rastro"). Infobae también menciona que la Iglesia
  Bochinesca tenía un video con parte de los festejos, sin el gol: por eso se dice "gol" y no "partido".
- **Los 500 euros:** el guion no dice que Asch los pagara; Infobae no lo dice (él ofrecía pagar solo si estaba el gol).
- **Bertoni:** Infobae cita a Asch diciendo que Bertoni también consiguió una copia más tarde y que se atribuyó el hallazgo.
  Es una acusación de una parte: no entra.
- Quedaron afuera por duración: el relato de José María Muñoz, la Fragata Libertad en la tribuna, los 130 dólares de premio, el
  árbitro Delcourt, el estreno del video en el teatro Roma y que al día siguiente estaba en YouTube.
- Personas reales (Bochini, Bertoni, Asch, el arquero, el pateador): muñecos low-poly genéricos sin rasgos de cara, con placa de
  nombre. Camisetas en colores planos (rojo; blanco y negro a rayas) sin escudos, sin marcas ni números de dorsal reales.

## Placas por plano

Aparte de los subtítulos. Mayúsculas y signos tal como van. Sin "parte N" en ningún lado. Nombres de clubes y de la RAI en texto
plano, sin escudos ni logos.

| # | Placa(s) | Cuándo |
|---|---|---|
| 1 | `JUVENTUS VS INDEPENDIENTE` (papel en el lomo del casete) · `DESDE ITALIA` | la primera desde el cuadro 0 sobre el casete; la segunda en "Italia." |
| 2 | `EL GOL PERDIDO` · `1973` | en "gol" y en "1973." |
| 3 | `ROMA · 28/11/1973` · `HOY HACE 53 AÑOS` | en "Roma," y en "53" |
| 4 | `AJAX: CAMPEÓN DE EUROPA` · `NO QUISO JUGAR` | en "Europa," y en "quiso" |
| 5 | `JUVENTUS, SUBCAMPEÓN` · `UN SOLO PARTIDO, EN ITALIA` · `(ERA IDA Y VUELTA)` | en "subcampeón," en "partido," y al final del plano |
| 6 | `PENAL DE CUCCUREDDU: AFUERA` | en "penal" |
| 7 | `FALTAN 10 MINUTOS` · `BERTONI` · `BOCHINI` | en "Faltan"; las dos de nombre sobre cada muñeco en "Bochini" y "Bertoni," |
| 8 | `DINO ZOFF` (sobre el arquero) · `INDEPENDIENTE 1 · JUVENTUS 0` · `PRIMERA INTERCONTINENTAL DEL CLUB` | en "arquero", en "pica." y en "Intercontinental" |
| 9 | `CANAL 7 · EN VIVO` · `DESPUÉS: SOLO FOTOS Y DIBUJOS DE EL GRÁFICO` | en "Canal" y en "fotos" |
| 10 | `MARIANO ASCH · HINCHA DE INDEPENDIENTE` · `RAI · TELEVISIÓN ITALIANA` | en "Asch," y en "RAI," |
| 11 | `500 EUROS PARA DIGITALIZAR` · `¿ESTÁ EL GOL?` | en "500" y en "gol." |
| 12 | `2007` · `JUVENTUS VS INDEPENDIENTE` (el mismo casete, en la videocasetera) | en "2007" y en "VHS" |
| 13 | `¿ALGUIEN EN TU CASA LO VIO EN VIVO?` | en "Alguien" |

Fuentes en pantalla (texto chico, abajo, planos 3 a 12): `FUENTES: LA NACIÓN E INFOBAE (28/11/2023)`.
La jugada en low-poly es una recreación: en los planos 7 y 8 agregar, chico, `RECREACIÓN`. Nunca imitar las imágenes reales de la RAI.

## Títulos

1. **Hoy hace 53 años: el gol de Bochini que estuvo perdido**
2. **El VHS que llegó desde Italia con el gol perdido de Bochini**
3. **Independiente campeón del mundo en Roma, y un gol que nadie podía volver a ver**

## Descripción de Instagram

```
Un VHS negro llegó por correo desde Italia. Adentro, el gol de Bochini a Juventus que estuvo perdido durante años.

Hoy hace 53 años, el 28 de noviembre de 1973, Independiente le ganó 1-0 a Juventus en el Olímpico de Roma y se quedó con su primera Intercontinental.
El Ajax, campeón de Europa, no quiso jugar. Lo reemplazó el subcampeón, Juventus, con una condición: un solo partido (la modalidad era de ida y vuelta) y en Italia.
En el segundo tiempo, Cuccureddu tiró un penal por arriba del travesaño. A diez minutos del final, Bochini y Bertoni hicieron dos paredes seguidas y el Bocha se la picó a Dino Zoff.
Canal 7 lo transmitió en vivo, pero de la imagen no quedó rastro: solo fotos y los dibujos de El Gráfico.
Hasta que Mariano Asch, hincha de Independiente, llegó a la RAI por un amigo italiano. Después de muchos mails y un pedido de 500 euros para digitalizar la cinta, en 2007 le llegó el VHS a su casa.

¿Alguien en tu casa lo vio en vivo? Contalo abajo.

Fuentes: La Nación e Infobae (28/11/2023). La jugada del video es una recreación en 3D.

#independiente #bochini #futbolargentino #historiasdelfutbol #intercontinental
```
