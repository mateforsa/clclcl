# Año 2300: científicos inundaron Los Santos, la ciudad de GTA V, para mostrar la suba del mar

Video nuevo y suelto (no es continuación de ningún otro, y no tiene nada que ver con la serie de GTA VI: sin "parte N" en voz,
placas, portada, títulos ni descripción; la voz nunca nombra GTA VI). Se escribe el viernes 27/11/2026, corrida de las 19:34
(candidato 7 de `fabrica/candidatos/2026-11-27.md`). Es sobre **el mapa de un videojuego** que imita a Los Ángeles: cada escenario
se dice como simulación de los autores, no como pronóstico de Los Ángeles. Sin opinión política, sin pronósticos propios.
Video vertical 1080x1920, 30 fps, unos 0:57 a 0:60, 11 planos, sin carteles de capítulo. Voz: Juanma (ElevenLabs), una sola toma.
172 palabras dichas (contadas sobre la parte "dicho" de `parrafos.json`).

- **Inicio:** I82 salto adelante (playbook 1, sección I, "En [año] esto..."): "Año 2300. Se inunda el puerto de Los Santos, la ciudad
  de GTA V." Golpe 2, la aclaración que es a la vez la sorpresa (plano 2: es una simulación de dos científicos sobre el mapa del
  juego, que imita a Los Ángeles). Golpe 3, la contradicción (plano 3: Rockstar no les dio los datos y usaron el mapa de un fan).
  No es "Sos X". Ninguno de los últimos doce videos de `hooks_used.json` usa la sección I (los dos anteriores: J91 y G63).
- **Cierre:** playbook 4, "Etiquetar y compartir", n.º 94 adaptado ("Mostráselo al fanático de [tema]"): "Mandáselo al que todavía
  pasea por Los Santos." Vuelve a la ciudad del gancho. Sin "Seguime", sin pregunta, sin predicción, sin continuación (los cierres de
  hoy fueron un número, qué hubieras hecho, resultado exacto, el lugar propio).
- **Imagen que abre y cierra:** una ciudad costera low-poly genérica (palmeras, muelle con grúas, playa con canales), SIN logos ni
  edificios copiados del juego. En el plano 1 el agua sube desde el cuadro 0 y tapa el muelle, con un contador de año que llega a
  2300. En el plano 11 la misma ciudad, el agua baja al nivel de hoy y un auto genérico pasea por la costanera.
- **Re-ganchos:** "simulación" (0:06), Rockstar se negó (0:12), el helicóptero (0:18), dos escenarios (0:22), 5,1% (0:27), puerto
  cortado, energía y aguas residuales (0:34), 2,2% (0:38), Vespucci contra el estudio de 2013 (0:44), "no es una predicción" (0:52). Ningún tramo pasa
  de 8 s sin dato nuevo.
- **Checker de la skill:** 85/100, cero fallas graves. Los tres avisos leves son del lector en inglés: no lee números escritos con
  letras ("dos mil trescientos" en el gancho), por eso cree que no hay re-ganchos, y no reconoce "Mandáselo" como pedido.
- Si la toma pasa de 60 s, el plano 4 (helicóptero) es el primero que se recorta: el dato queda en la descripción.

## Guion final (una línea por plano)

Tiempos estimados a unas 2,9 palabras dichas por segundo; los reales salen de `timing.json` después de la voz.

| # | Tiempo | Texto |
|---|--------|-------|
| 1 | 0:00 | Año 2300. Se inunda el puerto de Los Santos, la ciudad de GTA V. |
| 2 | 0:06 | Es una simulación de dos científicos alemanes sobre el mapa del juego, que imita a Los Ángeles. |
| 3 | 0:12 | Rockstar se negó a darles los datos originales, por derechos de publicación. Usaron el mapa de un fan. |
| 4 | 0:18 | Chequearon la costa en helicóptero, dentro del juego. |
| 5 | 0:21 | Y probaron dos escenarios del IPCC, el panel de clima de la ONU. |
| 6 | 0:27 | Con emisiones altas y marejada, en 2300 se inunda el 5,1% de la ciudad. |
| 7 | 0:34 | Se corta el puerto. También quedan afectadas la energía y las aguas residuales. |
| 8 | 0:38 | Si las emisiones bajan fuerte, se inunda el 2,2%, sin tocar ninguna infraestructura importante. |
| 9 | 0:44 | Y en Vespucci, la playa del juego, quedan expuestos los mismos canales que un estudio de 2013 marcó en Los Ángeles. |
| 10 | 0:52 | Los autores avisan que no es una predicción: el mapa no distingue edificios ni terraplenes. |
| 11 | 0:57 | Mandáselo al que todavía pasea por Los Santos. |

## PRONUNCIACIÓN A CONFIRMAR

Glosario consultado (`python3 fabrica/pronunciacion.py glosario`, 27/11/2026). Están: `GTA 6: [ge te a seis|GTA 6]` (probada) y
`Rockstar: [Rocstar|Rockstar]` (probada), que se usa tal cual. Lo demás no está:

| Término | Dónde | Estado | Forma en `parrafos.json` y variantes para probar |
|---|---|---|---|
| GTA V | voz, plano 1 | PRONUNCIACIÓN A CONFIRMAR (no está; se armó igual que `GTA 6`) | `[ge te a cinco.|GTA V.]` · variantes: ge te a cinco · ge, te, a, cinco · yi ti ei cinco |
| IPCC | voz, plano 5 | PRONUNCIACIÓN A CONFIRMAR | `[i pe ce ce,|IPCC,]` · variantes: i pe ce ce · i, pe, doble ce · i pe ce, ce |
| Vespucci | voz, plano 9 | PRONUNCIACIÓN A CONFIRMAR | `[Vespuchi,|Vespucci,]` · variantes: Vespuchi · Vespúchi · Vespuci · Vespúcci |
| Los Santos | voz, planos 1 y 11 | castellano, no hace falta probar | se escribe tal cual |
| ONU | voz, plano 5 | sigla castellana que se lee como palabra | `[ONU.|ONU.]` (mirar en `oir` que no la deletree) |
| Potsdam | solo placa (plano 2) | PRONUNCIACIÓN A CONFIRMAR si la voz la dijera | variantes: Pótsdam · Pots-dam · Pósdam |
| Nörenberg | solo placa (plano 2) | PRONUNCIACIÓN A CONFIRMAR si la voz la dijera | variantes: Nórenberg · Nérenberg · Nörenberg |
| Lantuit | solo placa (plano 2) | PRONUNCIACIÓN A CONFIRMAR si la voz la dijera | variantes: Lantuí · Lantuit · Lan-tuí |
| Venice Beach | solo placa (plano 9) | PRONUNCIACIÓN A CONFIRMAR si la voz la dijera | variantes: Vénis Bich · Venis Bich |

A propósito la voz no dice Potsdam, Nörenberg, Lantuit, Venice Beach ni Sketchfab: dice "dos científicos alemanes", "un fan" y
"la playa del juego"; los nombres van en placa. Números: todos con `[dicho|mostrado]`. Mirar en `oir`: "dos coma dos," (sin "por
ciento" en voz; la placa dice 2,2%) y "Mandáselo".

## Hoja de datos y fuentes

Fuentes leídas en las copias bajadas con curl el 27/11/2026 (carpeta `dl1934/` del scratchpad de la sesión: Infobae y Xataka). Solo
entran cifras que están en esas dos páginas.

- Infobae (27/11/2026): https://www.infobae.com/tecno/2026/11/27/cientificos-usaron-el-mapa-de-gta-v-para-simular-el-impacto-de-la-subida-del-nivel-del-mar-en-los-angeles/
- Xataka (25/11/2026): https://www.xataka.com/ecologia-y-naturaleza/unos-geocientificos-alemanes-han-inundado-santos-ciudad-gta-para-ensenarnos-efectos-cambio-climatico-angeles

| Dato | Frase del guion | Fuente |
|---|---|---|
| Los Santos es la ciudad ficticia de GTA V, inspirada en Los Ángeles | 1 y 2: "Los Santos, la ciudad de GTA V" / "el mapa del juego, que imita a Los Ángeles" | [Infobae](https://www.infobae.com/tecno/2026/11/27/cientificos-usaron-el-mapa-de-gta-v-para-simular-el-impacto-de-la-subida-del-nivel-del-mar-en-los-angeles/) ("la ciudad ficticia de Grand Theft Auto V (GTA 5), inspirada en Los Ángeles"); [Xataka](https://www.xataka.com/ecologia-y-naturaleza/unos-geocientificos-alemanes-han-inundado-santos-ciudad-gta-para-ensenarnos-efectos-cambio-climatico-angeles) ("un escenario que imita a otro") |
| Con emisiones altas y marejada, el puerto deja de funcionar en 2300. Energía y aguas residuales: Infobae las pone en 2300 y Xataka en 2500, por eso van sin año | 1 y 7: "Se inunda el puerto de Los Santos" / "Se corta el puerto. También quedan afectadas la energía y las aguas residuales." | [Infobae](https://www.infobae.com/tecno/2026/11/27/cientificos-usaron-el-mapa-de-gta-v-para-simular-el-impacto-de-la-subida-del-nivel-del-mar-en-los-angeles/) ("El escenario de altas emisiones proyecta la inundación del puerto y las plantas de energía costeras de Los Santos hacia el año 2300"; "El puerto, las instalaciones de aguas residuales y las plantas de energía costeras dejarían de funcionar") |
| Los científicos Paul Nörenberg y Hugues Lantuit; geocientíficos de la Universidad de Potsdam, Alemania | 2: "dos científicos alemanes" (placa con nombres y Potsdam) | [Infobae](https://www.infobae.com/tecno/2026/11/27/cientificos-usaron-el-mapa-de-gta-v-para-simular-el-impacto-de-la-subida-del-nivel-del-mar-en-los-angeles/) (nombres); [Xataka](https://www.xataka.com/ecologia-y-naturaleza/unos-geocientificos-alemanes-han-inundado-santos-ciudad-gta-para-ensenarnos-efectos-cambio-climatico-angeles) ("geocientíficos de la Universidad de Potsdam, en Alemania") |
| Es una estimación sobre el mapa del videojuego; salió de una tesis de maestría | 2: "Es una simulación ... sobre el mapa del juego" | [Infobae](https://www.infobae.com/tecno/2026/11/27/cientificos-usaron-el-mapa-de-gta-v-para-simular-el-impacto-de-la-subida-del-nivel-del-mar-en-los-angeles/) ("Esta estimación se refiere específicamente al mapa del videojuego"; "El trabajo surgió como parte de una tesis de maestría") |
| Rockstar Games se negó a dar los datos originales por derechos de publicación; usaron un mapa 3D de un fan (Sketchfab, usuario Somnit, resolución de unos 2 m) | 3: "Rockstar se negó a darles los datos originales, por derechos de publicación. Usaron el mapa de un fan." | [Infobae](https://www.infobae.com/tecno/2026/11/27/cientificos-usaron-el-mapa-de-gta-v-para-simular-el-impacto-de-la-subida-del-nivel-del-mar-en-los-angeles/) ("Rockstar Games se negó a proporcionar los datos originales por cuestiones de derechos de publicación. Ante esa negativa, los investigadores recurrieron a un mapa tridimensional creado y difundido por un fanático"; "Rockstar Games, la desarrolladora, rechazó entregar los datos originales por derechos de publicación"; "publicado en Sketchfab por un usuario identificado como Somnit, con una resolución de unos 2 metros") |
| Para fijar el nivel del mar eligieron 31 puntos de playa y los verificaron en el juego con sobrevuelos en helicóptero | 4: "Chequearon la costa en helicóptero, dentro del juego." (placa: 31 puntos) | [Infobae](https://www.infobae.com/tecno/2026/11/27/cientificos-usaron-el-mapa-de-gta-v-para-simular-el-impacto-de-la-subida-del-nivel-del-mar-en-los-angeles/) |
| Dos escenarios del IPCC de la ONU: uno de fuerte mitigación y otro de emisiones altas, más una tormenta de 1,59 m (la mayor marea registrada en el mareógrafo de Los Ángeles) | 5: "dos escenarios del IPCC, el panel de clima de la ONU" / 6: "marejada" | [Infobae](https://www.infobae.com/tecno/2026/11/27/cientificos-usaron-el-mapa-de-gta-v-para-simular-el-impacto-de-la-subida-del-nivel-del-mar-en-los-angeles/); [Xataka](https://www.xataka.com/ecologia-y-naturaleza/unos-geocientificos-alemanes-han-inundado-santos-ciudad-gta-para-ensenarnos-efectos-cambio-climatico-angeles) (escenarios del Quinto Informe del IPCC, "un organismo de la ONU") |
| Emisiones altas + marejada: el mar llega a 5,18 m en 2300; 2,25 km² inundados, 5,08% de la superficie (titular y Xataka: 5,1%) | 6: "en 2300 se inunda el 5,1% de la ciudad" (placa: 5,18 m y 2,25 km²) | [Infobae](https://www.infobae.com/tecno/2026/11/27/cientificos-usaron-el-mapa-de-gta-v-para-simular-el-impacto-de-la-subida-del-nivel-del-mar-en-los-angeles/) ("el 5,1 % de la superficie de Los Santos quedaría bajo el agua hacia 2300"; "5,18 metros en 2300 ... 2,25 kilómetros cuadrados inundados, el 5,08%"); [Xataka](https://www.xataka.com/ecologia-y-naturaleza/unos-geocientificos-alemanes-han-inundado-santos-ciudad-gta-para-ensenarnos-efectos-cambio-climatico-angeles) ("la pérdida sería del 5,1%, con el agua subiendo hasta a 5,18 metros") |
| Mitigación fuerte: en 2300 la inundación se limita al 2,2% y ninguna infraestructura importante resulta afectada | 8: "se inunda el 2,2%, sin tocar ninguna infraestructura importante" | [Infobae](https://www.infobae.com/tecno/2026/11/27/cientificos-usaron-el-mapa-de-gta-v-para-simular-el-impacto-de-la-subida-del-nivel-del-mar-en-los-angeles/); [Xataka](https://www.xataka.com/ecologia-y-naturaleza/unos-geocientificos-alemanes-han-inundado-santos-ciudad-gta-para-ensenarnos-efectos-cambio-climatico-angeles) ("Con el escenario optimista, para 2300 ... un 2,2%") |
| Vespucci es la versión del juego de Venice Beach; para Venice Beach y la marina, el modelo del juego y un estudio de 2013 sobre Los Ángeles señalan los mismos canales y frentes de playa como las áreas más expuestas | 9: "en Vespucci ... quedan expuestos los mismos canales que un estudio de 2013 marcó en Los Ángeles" | [Infobae](https://www.infobae.com/tecno/2026/11/27/cientificos-usaron-el-mapa-de-gta-v-para-simular-el-impacto-de-la-subida-del-nivel-del-mar-en-los-angeles/) (estudio de 2013, canales); [Xataka](https://www.xataka.com/ecologia-y-naturaleza/unos-geocientificos-alemanes-han-inundado-santos-ciudad-gta-para-ensenarnos-efectos-cambio-climatico-angeles) ("Vespucci, que equivale a Venice Beach") |
| La simulación es estática; tiende a sobrestimar porque el mapa no distingue edificios ni terraplenes; los mapas no son predicciones | 10: "no es una predicción: el mapa no distingue edificios ni terraplenes" | [Infobae](https://www.infobae.com/tecno/2026/11/27/cientificos-usaron-el-mapa-de-gta-v-para-simular-el-impacto-de-la-subida-del-nivel-del-mar-en-los-angeles/) ("el mapa no distingue edificios ni terraplenes que frenarían el avance. Los mapas, dicen los autores, no son predicciones de dónde llegaría el agua en un evento concreto") |
| Año 2500, emisiones altas: nivel de 8,22 m, 6,5% anegado (el IPCC da baja confianza a ese horizonte) | solo en la descripción | [Infobae](https://www.infobae.com/tecno/2026/11/27/cientificos-usaron-el-mapa-de-gta-v-para-simular-el-impacto-de-la-subida-del-nivel-del-mar-en-los-angeles/) |

Límites y cómo los trata el guion:
- **Siempre simulación, nunca pronóstico.** El gancho dice "se inunda" en presente narrativo, y el plano 2 aclara enseguida que es
  una simulación sobre el mapa de un juego. La placa del plano 1 lleva `SIMULACIÓN` desde el cuadro 0. El plano 10 repite que los
  autores dicen que no es una predicción. Nunca se dice "Los Ángeles se va a inundar".
- **5,1% y no 5,08%.** Infobae da las dos (titular y cuerpo); Xataka da 5,1%. La voz y la placa usan 5,1%; la placa chica agrega 2,25 km².
- **Xataka contra Infobae en el año de la infraestructura.** Xataka dice que "para 2500" se afectarían aguas residuales y energía;
  Infobae dice 2300 con emisiones altas y marejada. Como no coinciden, en 2300 queda solo el puerto (que Infobae pone en 2300) y la
  energía y las aguas residuales van sin ninguna referencia de tiempo ("También quedan afectadas"), en voz, placa 7 y descripción
  (correcciones del verificador, 27/11/2026).
- **Xataka nombra el Quinto Informe del IPCC;** Infobae agrega que probaron también las proyecciones más nuevas (hasta 2150). El guion
  dice solo "dos escenarios del IPCC".
- **"El mapa no distingue edificios ni terraplenes"**: voz y placa 10 dicen lo mismo que Infobae, sin simplificar (corrección del
  verificador, 27/11/2026).
- **Sin GTA VI.** Xataka arranca hablando de la fiebre por GTA VI; no se usa. El video no conecta con la serie de GTA VI.
- Quedaron afuera por duración: tesis de maestría, 31 puntos (solo placa), Sketchfab y Somnit (solo placa y descripción), Ballona
  Creek y el aeropuerto, Fort Zancudo, Chumash (Malibú), el 2500 (solo descripción), la diferencia de 24% a 40% con las proyecciones
  nuevas, y la recomendación de usarlo en divulgación y no en el aula.

## Placas por plano

Aparte de los subtítulos. Mayúsculas y signos tal como van. Sin "parte N" en ningún lado. "GTA V" y "Rockstar" van en texto plano,
sin logos del juego ni de la empresa, sin la tipografía de GTA y sin capturas del juego: la ciudad es low-poly genérica.

| # | Placa(s) | Cuándo |
|---|---|---|
| 1 | `AÑO 2300` · `SIMULACIÓN` | la primera desde el cuadro 0 con el contador de año; la segunda, chica, fija desde el cuadro 0 hasta el final del plano 2 |
| 2 | `LOS SANTOS (GTA V) IMITA A LOS ÁNGELES` · `PAUL NÖRENBERG Y HUGUES LANTUIT · UNIVERSIDAD DE POTSDAM` | en "mapa del juego" y en "alemanes" |
| 3 | `ROCKSTAR SE NEGÓ A DAR LOS DATOS ORIGINALES` · `MAPA 3D DE UN FAN (SKETCHFAB)` | en "se negó" y en "fan." |
| 4 | `31 PUNTOS DE PLAYA, CHEQUEADOS EN HELICÓPTERO` | en "helicóptero" |
| 5 | `IPCC: EL PANEL DE CLIMA DE LA ONU` · `2 ESCENARIOS` | en "IPCC" y en "dos escenarios" (o al final del plano si la palabra cae antes) |
| 6 | `EMISIONES ALTAS + MAREJADA` · `2300: 5,1% BAJO EL AGUA` · `MAR A 5,18 M · 2,25 KM²` | en "emisiones", en "5,1%" y al final del plano |
| 7 | `2300: PUERTO FUERA DE SERVICIO` · `TAMBIÉN: ENERGÍA Y AGUAS RESIDUALES` | en "puerto." y en "También" |
| 8 | `EMISIONES BAJAN: 2,2%` · `SIN INFRAESTRUCTURA IMPORTANTE AFECTADA` | en "2,2%" y en "importante." |
| 9 | `VESPUCCI = VENICE BEACH` · `MISMOS CANALES QUE UN ESTUDIO DE 2013` | en "Vespucci" y en "2013" |
| 10 | `NO ES UNA PREDICCIÓN` · `EL MAPA NO DISTINGUE EDIFICIOS NI TERRAPLENES` | en "predicción:" y en "terraplenes." |
| 11 | `MANDÁSELO AL QUE PASEA POR LOS SANTOS` | en "Mandáselo" |

Fuentes en pantalla (texto chico, abajo, planos 2 a 10): `FUENTES: INFOBAE (27/11) Y XATAKA (25/11/2026) · SIMULACIÓN SOBRE EL MAPA DE UN JUEGO, NO PRONÓSTICO`.
Personas: los dos científicos, si aparecen, son muñecos genéricos con placa de nombre, sin caras. Helicóptero, autos y grúas genéricos,
sin marcas. Los porcentajes de inundación son un esquema: si el agua se dibuja sobre la ciudad, agregar `ESQUEMA, NO A ESCALA`.

## Toma final (productor, 27/11/2026)

- Voz en dos vueltas. La primera duró 61,4 s, así que se sacó el plano 4 (helicóptero; el dato queda en la descripción). Toma
  final: 59,98 s, 10 planos (b01 a b10 siguen el orden de la tabla sin el plano 4).
- Pronunciación (probada con `pronunciacion.py probar` antes de la toma): GTA V `[ge, te, a, cinco.|GTA V.]` (ganadora);
  Vespucci `[Vespuci,|Vespucci,]` (ganadora); IPCC `[i, pe, ce, ce,|IPCC,]` (Whisper oyó "IPCC" en los dos idiomas; la
  "ganadora" automática `i pe doble ce` se oyó "IPWC" y no se usó). En la escucha final el oído sigue marcando GTA V ("GTA-5") y
  Vespucci ("Bespuchi"), las dos bien de oído, y oye "doce escenarios" donde dice "dos escenarios": decide el dueño.
- Mezcla: −14,6 LUFS integrados, pico −4,5 dBTP.
- Look: maqueta costera en bloque a la hora azul; los porcentajes van en un tablero de 100 cuadros a escala.

## Títulos

1. **Año 2300: científicos inundaron Los Santos, la ciudad de GTA V**
2. **Rockstar no les dio el mapa, así que usaron el de un fan para inundar Los Santos**
3. **El 5,1% de Los Santos bajo el agua: la simulación climática hecha sobre GTA V**

## Descripción de Instagram

```
Año 2300: el puerto de Los Santos, la ciudad de GTA V, bajo el agua. Es una simulación, no un pronóstico.

Dos geocientíficos de la Universidad de Potsdam, Paul Nörenberg y Hugues Lantuit, usaron el mapa del juego, que imita a Los Ángeles, para medir qué partes quedarían inundadas si sube el mar.
Rockstar Games se negó a darles los datos originales por derechos de publicación, así que usaron un mapa 3D hecho por un fan, publicado en Sketchfab. Para fijar la orilla chequearon 31 puntos de playa en helicóptero dentro del juego.
Con dos escenarios del IPCC: con emisiones altas y marejada, el mar llega a 5,18 metros en 2300 y se inunda el 5,1% de la ciudad (2,25 km²) y se corta el puerto. También quedan afectadas la energía y las aguas residuales. Con emisiones en fuerte baja, el 2,2%, sin infraestructura importante afectada. Para 2500, con emisiones altas, el 6,5%.
En Vespucci, la Venice Beach del juego, quedan expuestos los mismos canales que marcó un estudio de 2013 sobre Los Ángeles.
Los autores aclaran que sus mapas no son predicciones: el modelo no distingue edificios ni terraplenes.

Mandáselo al que todavía pasea por Los Santos.

Fuentes: Infobae (27/11/2026) y Xataka (25/11/2026).

#gtav #videojuegos #cambioclimatico #ciencia #gamer
```

## Cómo regenerar

```
python3 scripts/voice.py gta-v-nivel-del-mar       # voz + tiempos (ElevenLabs)
python3 fabrica/pronunciacion.py oir gta-v-nivel-del-mar
scripts/stills.sh gta-v-nivel-del-mar
npx tsx scripts/events.ts gta-v-nivel-del-mar && python3 scripts/audio.py gta-v-nivel-del-mar
scripts/render.sh gta-v-nivel-del-mar              # out/gta-v-nivel-del-mar/gta-v-nivel-del-mar.mp4
scripts/cover.sh gta-v-nivel-del-mar               # out/gta-v-nivel-del-mar/portada.png
```
