# Ley de ludopatía: Lanús rechazó 750.000 dólares de una empresa del juego. Ahora la ley deja sin esas marcas a uno de cada tres equipos

Video nuevo (no es continuación de ningún otro: sin "parte N" en voz, placas, portada, títulos ni descripción). Se escribe el
viernes 27/11/2026, corrida de las 13:34. Tema con costado político (una ley): el video cuenta qué aprobó el Senado, a quién toca
y qué falta para que rija. Sin opinión, sin nombrar a legisladores ni partidos, sin decir si la ley es buena o mala.
Video vertical 1080x1920, 30 fps, unos 0:62 a 0:65, 16 planos, sin carteles de capítulo. Voz: Juanma (ElevenLabs), una sola toma.
179 palabras dichas (contadas sobre la parte "dicho" de `parrafos.json`).

- **Inicio:** E47 "el que dijo que no" (playbook 1, sección E; gancho 29 "[Persona] dijo que no a [X millones]"): "Lanús le dijo
  que no a 750.000 dólares por año." Golpe 2: de quién era la plata y qué eligió (una empresa del juego, Mapei por medio millón).
  Golpe 3, la contradicción: "Ahora una ley les va a sacar esa elección a todos." No es "Sos X". Los dos videos anteriores en
  `hooks_used.json` usan A8 (`colapinto-fp1-qatar`) y G64 (`kioscos-53000`); ningún video anterior usó la sección E.
- **Cierre:** playbook 4 n.º 29 "Tu club, y vemos cuál gana", adaptado: "Comentá tu club, y vemos cuántos tienen que cambiar la
  camiseta." Sin "Seguime", sin predicción y sin continuación. Vuelve a la camiseta del gancho.
- **Imagen que abre y cierra:** una camiseta low-poly gigante con el pecho vacío y, al lado, dos valijas con fajos (750.000 contra
  500.000); Lanús empuja la grande lejos (plano 1). En el plano 15 vuelve la misma imagen con la resta (250.000 menos).
- **Re-ganchos:** 750.000 (0:00), Mapei y medio millón (0:07), "Ahora una ley" (0:09), 72 a cero (0:13), uno de cada tres (0:22),
  20 millones (0:28), Boca 7 a 8 millones (0:32), River 6 (0:38), "Pero la ley todavía no rige" (0:40), 10 días (0:42), 120 días
  (0:47), "hasta el triple" (0:50), la cuenta de Lanús (0:55). Ningún tramo pasa de 6 s sin dato nuevo.
- **Checker de la skill:** 85/100, cero fallas graves. Los tres avisos leves son del lector en inglés: no lee números escritos
  con letras ("setecientos cincuenta mil" en el gancho, y en todo el cuerpo) ni un cierre en castellano ("Comentá").

## Guion final (una línea por plano)

| # | Tiempo | Texto |
|---|--------|-------|
| 1 | 0:00 | Lanús le dijo que no a 750.000 dólares por año. |
| 2 | 0:04 | Se los ofrecía una empresa del juego. |
| 3 | 0:07 | Y renovó con Mapei, por medio millón. |
| 4 | 0:09 | Ahora una ley les va a sacar esa elección a todos. |
| 5 | 0:13 | El jueves, el Senado aprobó la ley de ludopatía: 72 votos a cero. |
| 6 | 0:18 | Prohíbe que las empresas de apuestas patrocinen equipos, estadios y camisetas. |
| 7 | 0:22 | Según La Nación, uno de cada tres equipos de la Liga Profesional tendrá que buscar otra marca. |
| 8 | 0:28 | Y el diario calcula al menos 20 millones de dólares en juego. |
| 9 | 0:32 | Boca cobra de Betsson entre 7 y 8 millones por año, hasta fines de 2028. |
| 10 | 0:38 | River, 6 millones de Betano. |
| 11 | 0:40 | Pero la ley todavía no rige. |
| 12 | 0:42 | El Ejecutivo tiene 10 días hábiles para vetarla. Si no lo hace, queda promulgada. |
| 13 | 0:47 | Y después hay 120 días para reglamentarla. |
| 14 | 0:50 | Según La Nación, las apuestas pagaban hasta el triple que las marcas de siempre. |
| 15 | 0:55 | Lanús ya hizo esa cuenta: 250.000 dólares menos por año. |
| 16 | 0:59 | Comentá tu club, y vemos cuántos tienen que cambiar la camiseta. |

Tiempos estimados a unas 2,8 palabras dichas por segundo (entre `dolar-tres-precios` y `rockstar-sindicato-no`): unos 64 s;
a 2,9 da 62 s. Los reales salen de `timing.json` después de la voz. Si la toma pasa de 65 s, el plano 6 es el primero que se
puede recortar (lo que prohíbe la ley queda en la placa del plano 5 y en la descripción).

## PRONUNCIACIÓN A CONFIRMAR

Glosario consultado (`python3 fabrica/pronunciacion.py glosario`, 27/11/2026): **ningún término de este video está en el
glosario**. En `parrafos.json` van con una forma provisoria; el productor tiene que probar variantes numeradas con
`pronunciacion.py probar` antes de la toma final. No las elegí de oído.

| Término (mostrado) | Plano | Forma provisoria en `parrafos.json` | Estado | Variantes sugeridas para probar |
|---|---|---|---|---|
| Betsson | 9 | `[Bétson\|Betsson]` | PRONUNCIACIÓN A CONFIRMAR | Bétson · Bétsson · Betsón · Béts-son · Betsson |
| Betano | 10 | `[Betáno.\|Betano.]` | PRONUNCIACIÓN A CONFIRMAR | Betáno · Betano · Bétano · Be-tá-no |
| Mapei | 3 | `[Mapéi,\|Mapei,]` | PRONUNCIACIÓN A CONFIRMAR | Mapéi · Mapei · Ma-péi · Mápei |
| River | 10 | `[Ríver,\|River,]` | PRONUNCIACIÓN A CONFIRMAR (tiene que sonar como en la cancha, "Ríber", no en inglés) | Ríver · Ríber · River |

"Lanús", "Boca", "La Nación", "Liga Profesional" y "Senado" son castellano y van sin marca. Racing e Independiente no se dicen.
Números: todos con `[dicho|mostrado]` (750.000, 72, 20, 7, 8, 2028, 6, 10, 120, 250.000). "Medio millón", "uno de cada tres" y
"hasta el triple" se dicen y se muestran igual.

## Hoja de datos y fuentes

Fuentes leídas en las copias bajadas con curl el 27/11/2026 (La Nación, TN y El Economista). Solo entran cifras que están en esas
páginas.

| Dato | Frase del guion | Fuente |
|---|---|---|
| Lanús rechazó una oferta de un sponsor relacionado al juego por 750 mil dólares al año | 1 y 2: "Lanús le dijo que no a 750.000 dólares por año." / "Se los ofrecía una empresa del juego." | [La Nación, 27/11/2026](https://www.lanacion.com.ar/deportes/futbol/ludopatia-los-clubes-de-futbol-que-tienen-sponsors-ligados-al-juego-y-que-pasara-con-ellos-tras-la-nid27112026/) ("rechazó una oferta de un sponsor relacionado al juego por 750 mil dólares al año") |
| En su lugar renovó con Mapei por medio millón al año | 3: "Y renovó con Mapei, por medio millón." | [La Nación](https://www.lanacion.com.ar/deportes/futbol/ludopatia-los-clubes-de-futbol-que-tienen-sponsors-ligados-al-juego-y-que-pasara-con-ellos-tras-la-nid27112026/) ("En su lugar, renovó con Mapei... por medio millón al año") |
| El Senado sancionó la ley el jueves 26/11/2026 con 72 votos afirmativos, ninguno en contra y ninguna abstención | 5: "El jueves, el Senado aprobó la ley de ludopatía: 72 votos a cero." | [TN, 27/11/2026](https://tn.com.ar/politica/2026/11/27/que-cambia-con-la-ley-de-prevencion-de-ludopatia-nuevas-restricciones-para-apostar-y-cambios-en-la-publicidad-en-el-futbol/) ("El Senado convirtió en ley este jueves 26 de noviembre... 72 votos afirmativos, ninguno en contra y ninguna abstención"), [El Economista, 27/11/2026](https://eleconomista.com.ar/deportes/la-ley-ludopatia-pone-fin-uno-negocios-mas-lucrativos-futbol-argentino-quienes-seran-mas-afectados-n99974) |
| Impide que las empresas de apuestas patrocinen equipos, deportistas, estadios y eventos; alcanza a la indumentaria deportiva y a la publicidad en camisetas | 6: "Prohíbe que las empresas de apuestas patrocinen equipos, estadios y camisetas." | [La Nación](https://www.lanacion.com.ar/deportes/futbol/ludopatia-los-clubes-de-futbol-que-tienen-sponsors-ligados-al-juego-y-que-pasara-con-ellos-tras-la-nid27112026/) ("impide que las empresas de apuestas patrocinen equipos, deportistas, estadios y eventos"; "La medida alcanza a la indumentaria deportiva"), [TN](https://tn.com.ar/politica/2026/11/27/que-cambia-con-la-ley-de-prevencion-de-ludopatia-nuevas-restricciones-para-apostar-y-cambios-en-la-publicidad-en-el-futbol/) ("los auspicios a clubes y deportistas y la publicidad en camisetas deportivas") |
| Uno de cada tres equipos de la Liga Profesional tendrá que buscar otros sponsors | 7: "Según La Nación, uno de cada tres equipos de la Liga Profesional tendrá que buscar otra marca." | [La Nación](https://www.lanacion.com.ar/deportes/futbol/ludopatia-los-clubes-de-futbol-que-tienen-sponsors-ligados-al-juego-y-que-pasara-con-ellos-tras-la-nid27112026/) ("uno de cada tres equipos de la Liga Profesional tendrá que buscar otros sponsors") |
| La prohibición tiene un impacto mínimo de US$ 20 millones, solo en la Liga Profesional (suma aproximada de los contratos vigentes). Es un cálculo de La Nación | 8: "Y el diario calcula al menos 20 millones de dólares en juego." | [La Nación](https://www.lanacion.com.ar/deportes/futbol/ludopatia-los-clubes-de-futbol-que-tienen-sponsors-ligados-al-juego-y-que-pasara-con-ellos-tras-la-nid27112026/) ("tiene un impacto mínimo de US$ 20 millones, sólo en la Liga Profesional. Es la suma aproximada de los contratos vigentes") |
| Boca firmó con Betsson hasta fines de 2028 y percibe entre 7 y 8 millones de dólares al año | 9: "Boca cobra de Betsson entre 7 y 8 millones por año, hasta fines de 2028." | [La Nación](https://www.lanacion.com.ar/deportes/futbol/ludopatia-los-clubes-de-futbol-que-tienen-sponsors-ligados-al-juego-y-que-pasara-con-ellos-tras-la-nid27112026/) ("firmó con Betsson hasta fines de 2028: percibe entre 7 y 8 millones de dólares al año"); El Economista da "cercana a los US$ 7,5 millones anuales" hasta diciembre de 2028 |
| River tiene a Betano como sponsor, a cambio de US$ 6 millones | 10: "River, 6 millones de Betano." | [La Nación](https://www.lanacion.com.ar/deportes/futbol/ludopatia-los-clubes-de-futbol-que-tienen-sponsors-ligados-al-juego-y-que-pasara-con-ellos-tras-la-nid27112026/) ("su sponsor actual es Betano, a cambio de US$ 6 millones"); El Economista: "estimado en US$ 6 millones por temporada" |
| La ley pasa al Poder Ejecutivo, que tiene diez días hábiles para vetarla; si no lo hace, queda promulgada automáticamente | 11 y 12: "Pero la ley todavía no rige." / "El Ejecutivo tiene 10 días hábiles para vetarla. Si no lo hace, queda promulgada." | [TN](https://tn.com.ar/politica/2026/11/27/que-cambia-con-la-ley-de-prevencion-de-ludopatia-nuevas-restricciones-para-apostar-y-cambios-en-la-publicidad-en-el-futbol/) ("pasa al Poder Ejecutivo, que tiene diez días hábiles para vetarla. Si no lo hace, quedará promulgada automáticamente") |
| El Gobierno tendrá 120 días para reglamentarla; los plazos concretos de los contratos dependen de la reglamentación | 13: "Y después hay 120 días para reglamentarla." | [TN](https://tn.com.ar/politica/2026/11/27/que-cambia-con-la-ley-de-prevencion-de-ludopatia-nuevas-restricciones-para-apostar-y-cambios-en-la-publicidad-en-el-futbol/) ("El Gobierno tendrá 120 días para reglamentarla"; "los plazos concretos dependerán de la reglamentación"), [La Nación](https://www.lanacion.com.ar/deportes/futbol/ludopatia-los-clubes-de-futbol-que-tienen-sponsors-ligados-al-juego-y-que-pasara-con-ellos-tras-la-nid27112026/) ("habrá 120 días para la reglamentación") |
| La industria del juego pagaba el doble o hasta el triple que los auspiciantes tradicionales; lo más probable es que los clubes pierdan dinero | 14: "Según La Nación, las apuestas pagaban hasta el triple que las marcas de siempre." | [La Nación](https://www.lanacion.com.ar/deportes/futbol/ludopatia-los-clubes-de-futbol-que-tienen-sponsors-ligados-al-juego-y-que-pasara-con-ellos-tras-la-nid27112026/) ("la industria del juego pagaba el doble o hasta el triple de lo que abonaban los auspiciantes tradicionales") |
| 750.000 − 500.000 = 250.000 dólares por año (cuenta propia con los dos números de La Nación) | 15: "Lanús ya hizo esa cuenta: 250.000 dólares menos por año." | Cuenta propia sobre [La Nación](https://www.lanacion.com.ar/deportes/futbol/ludopatia-los-clubes-de-futbol-que-tienen-sponsors-ligados-al-juego-y-que-pasara-con-ellos-tras-la-nid27112026/) |

Límites y cómo los trata el guion:
- **La ley todavía no rige.** El guion no dice "ya se prohibió": dice que el Senado la aprobó, que "Prohíbe" (lo que dice el texto),
  y en los planos 11 a 13 que falta la promulgación (10 días hábiles, o veto) y después 120 días de reglamentación. El plano 7 dice
  "tendrá que", en futuro. TN aclara que los plazos de los contratos dependen de la reglamentación: por eso el guion no dice
  cuándo se cae ningún contrato (tampoco el de Boca, que solo se nombra hasta 2028 porque así está firmado).
- **US$ 20 millones** es un cálculo de La Nación ("impacto mínimo", solo Liga Profesional, suma aproximada de contratos): la voz lo
  atribuye ("el diario calcula al menos") y la placa dice "SEGÚN LA NACIÓN". El Economista suma otra cosa (US$ 16,7 millones solo
  en los contratos de Boca, River, Racing e Independiente): no se usa para no mezclar cuentas.
- **Uno de cada tres:** es de La Nación (9 equipos de primera, según su bajada). El Economista dice "al menos 13 de los 30" contando
  loterías y casinos provinciales cuya situación depende de la reglamentación. Se usa solo el de La Nación, atribuido.
- **Lanús:** La Nación no nombra a la empresa que ofreció los 750.000 ni dice que fuera para el pecho de la camiseta: la voz dice
  solo "una empresa del juego". La Nación describe a Mapei como "una multinacional de los seguros"; el guion
  no describe a Mapei para no repetir ni corregir esa definición.
- **"Lanús ya hizo esa cuenta":** quiere decir que ya eligió cobrar 250.000 menos que lo ofrecido. Es resta propia y la placa lo
  muestra como cuenta.
- **Boca:** La Nación da 7 a 8 millones; El Economista, unos 7,5. Se usa el rango de La Nación.
- **Sin política:** TN nombra a los senadores que destrabaron la ley y el pedido de la Iglesia. El guion no nombra a nadie ni dice
  si la ley es buena o mala; tampoco cita la presentación de la AFA en el Senado.
- Quedaron afuera por duración: Racing (US$ 2 millones de Betsson), Independiente (US$ 1,2 millones de SportsBet), San Lorenzo,
  Rosario Central y Newell's (casinos), Vélez y Bplay, Huracán y Argentinos (Mr. Bet), los controles biométricos con Renaper, los
  bonos de bienvenida, la Selección y la AFA.
- Personas y clubes: sin escudos ni logos. Las marcas (Betsson, Betano, Mapei) van solo como texto plano en placa.

## Placas por plano

Aparte de los subtítulos. Mayúsculas y signos tal como van. Sin "parte N" en ningún lado. Sin logos ni escudos: clubes y marcas
solo en texto.

| # | Placa(s) | Cuándo |
|---|---|---|
| 1 | `LANÚS DIJO QUE NO` · `US$ 750.000 POR AÑO` | la primera desde el cuadro 0 (el gancho en mudo, sobre la camiseta con el pecho vacío); la segunda en "750.000" |
| 2 | `EMPRESA DEL JUEGO` | en "juego." |
| 3 | `MAPEI · US$ 500.000 POR AÑO` | en "Mapei," |
| 4 | `UNA LEY NUEVA` | en "ley" |
| 5 | `SENADO · JUEVES 26/11` · `72 A 0` | en "Senado" y en "72" |
| 6 | `SIN APUESTAS EN CAMISETAS NI ESTADIOS` | en "camisetas." |
| 7 | `1 DE CADA 3 EQUIPOS` · `LIGA PROFESIONAL · SEGÚN LA NACIÓN` | en "tres" y en "Profesional" |
| 8 | `US$ 20 MILLONES · IMPACTO MÍNIMO` · `SEGÚN LA NACIÓN` | en "20" y al final del plano |
| 9 | `BOCA · BETSSON` · `US$ 7 A 8 MILLONES POR AÑO` · `CONTRATO HASTA FINES DE 2028` | en "Boca", en "8" y en "2028." |
| 10 | `RIVER · BETANO` · `US$ 6 MILLONES` | en "River," y en "6" |
| 11 | `TODAVÍA NO RIGE` | en "rige." |
| 12 | `10 DÍAS HÁBILES PARA VETAR O PROMULGAR` | en "10" |
| 13 | `+120 DÍAS PARA REGLAMENTAR` | en "120" |
| 14 | `HASTA EL TRIPLE` · `SEGÚN LA NACIÓN` | en "triple" y al final del plano |
| 15 | `750.000 − 500.000 = 250.000` · `US$ 250.000 MENOS POR AÑO` | en "cuenta:" y en "250.000" |
| 16 | `COMENTÁ TU CLUB` | en "club," |

## Títulos

1. Lanús rechazó 750.000 dólares de una empresa del juego. Ahora la ley les toca a todos
2. Ley de ludopatía: cuánto cobran Boca y River de las apuestas
3. Uno de cada tres equipos tendrá que cambiar el sponsor de la camiseta

## Descripción de Instagram

```
Lanús le dijo que no a 750.000 dólares por año de una empresa del juego. Ahora una ley les va a sacar esa elección a todos.

El jueves 26 de noviembre el Senado aprobó la ley de prevención de la ludopatía, 72 votos a cero. Prohíbe que las empresas de apuestas patrocinen equipos, estadios y camisetas.
Según La Nación, uno de cada tres equipos de la Liga Profesional tendrá que buscar otro sponsor, con un impacto mínimo de US$ 20 millones. Boca cobra de Betsson entre US$ 7 y 8 millones por año y River, US$ 6 millones de Betano.
La ley todavía no rige: el Ejecutivo tiene 10 días hábiles para vetarla o queda promulgada, y después hay 120 días para reglamentarla.

Fuentes: La Nación y TN, 27/11/2026.

Comentá tu club, y vemos cuántos tienen que cambiar la camiseta.

#futbolargentino #ludopatia #apuestas #ligaprofesional #sponsors
```
