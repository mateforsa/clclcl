# Rockstar: "si quieren un sindicato, van a tener un sindicato". Tres de cada cuatro votaron que no

Video nuevo (no es continuación de ningún otro: sin "parte N" en voz, placas, portada, títulos ni descripción). Es otro hecho
sobre Rockstar y GTA 6, distinto de `gta-vi-online`. Se escribe el viernes 27/11/2026.
Video vertical 1080x1920, 30 fps, unos 0:60 a 0:64, 17 planos, sin carteles de capítulo. Voz: Juanma (ElevenLabs), una sola toma.
185 palabras dichas (contadas sobre la parte "dicho" de `parrafos.json`).

- **Inicio:** J91 cita real y corta, con autor (sección J del playbook). La frase de Jennifer Kolbe a Bloomberg, "Si quieren un
  sindicato, van a tener un sindicato", y en el plano 4 el golpe: "tres de cada cuatro dijeron que no". No es "Sos X". Los dos
  videos anteriores en `hooks_used.json` usan C30 (`canva-despidos-v2`) y F54 (`meta-muse-v2`); el último J (J100) fue hace tres
  videos (`starship-atrapada-v2`) y es otro tipo (comparación).
- **Cierre:** continuación con motivo concreto (playbook 3, n.º 5: "Cuando [evento] pase, lo explico acá"): "Cuando salga el
  fallo, te lo cuento acá." Sin "Seguime" ni pregunta. Los últimos tres cierres fueron preguntas o predicciones.
- **Imagen que abre y cierra:** una urna con la cita de la jefa arriba (plano 1) y la misma urna, ya cerrada, al lado del
  escritorio vacío del tribunal (plano 16). "El equipo ya votó" vuelve a la frase de la jefa ("vamos a donde va el equipo").
- **Gancho en 3 golpes:** la promesa (plano 1) -> quién la dijo y de qué estudio (plano 2) -> la contradicción con el número
  (plano 4).

## Guion final (una línea por plano)

| # | Tiempo | Texto |
|---|--------|-------|
| 1 | 0:00 | «Si quieren un sindicato, van a tener un sindicato.» |
| 2 | 0:03 | Lo dijo la jefa de publicación de Rockstar, el estudio de GTA 6. |
| 3 | 0:08 | El jueves, sus empleados del Reino Unido terminaron de votar. |
| 4 | 0:12 | Y tres de cada cuatro dijeron que no. |
| 5 | 0:14 | 1.163 votos en contra. 381 a favor. |
| 6 | 0:19 | Votó más del 93%, en cinco oficinas. |
| 7 | 0:23 | En el medio salió el juego, y vendió más de 30 millones el primer día. |
| 8 | 0:28 | Con el sí, iban a negociar horas extra, despidos e inteligencia artificial. |
| 9 | 0:32 | Con el no, nada obliga a la empresa a sentarse con el sindicato. |
| 10 | 0:37 | Pero la pelea empezó un año antes. |
| 11 | 0:39 | En octubre de 2025, Rockstar despidió a 31 afiliados, según The Register. |
| 12 | 0:45 | El sindicato dice que los eligieron por estar en un grupo privado de Discord. |
| 13 | 0:50 | Rockstar dice que fue por falta grave. |
| 14 | 0:52 | Un tribunal laboral todavía no dio el fallo. |
| 15 | 0:55 | El sindicato, IWGB, promete seguir organizándose. |
| 16 | 0:58 | El equipo ya votó. Falta que hable el tribunal. |
| 17 | 1:01 | Cuando salga el fallo, te lo cuento acá. |

Tiempos estimados a unas 2,9 palabras dichas por segundo (el ritmo real de `meta-muse-v2`). Los reales salen de `timing.json`
después de la voz. Si la toma pasa de 70 s, el plano 13 es el primero que se puede recortar sin perder datos (queda en placa).

Re-ganchos: el número (0:12 y 0:14), el porcentaje (0:19), el juego y los 30 millones (0:23), "Con el sí / con el no" (0:28-0:32),
"Pero la pelea empezó un año antes" con salto de fecha (0:37), los 31 despidos (0:39), Discord contra "falta grave" (0:45-0:50),
el fallo pendiente (0:52). Ningún tramo pasa de 6 s sin dato nuevo. El checker de la skill dio 90/100 sin fallas graves (sus dos
avisos leves no leen números en palabras ni cierres en castellano).

## PRONUNCIACIÓN A CONFIRMAR

Glosario consultado (`python3 fabrica/pronunciacion.py glosario`, 27/11/2026): está **GTA 6** y se usa la forma exacta
`[ge, te, a seis|GTA 6]` (con el punto pegado en el plano 2: `[ge, te, a seis.|GTA 6.]`). Rockstar, IWGB, Discord y The Register
**no están**: van marcados para que el productor genere variantes numeradas con `pronunciacion.py probar` y el dueño elija de oído.
En `parrafos.json` queda una forma de partida, no una decisión.

| Término | Forma en `parrafos.json` | Variantes sugeridas para probar | Planos |
|---|---|---|---|
| Rockstar | `[Rókstar\|Rockstar]` | Rókstar · Rókestar · Rocstar · Rock-star · Rockstar | 2, 11, 13 |
| IWGB | `[ái dóbliu yi bi\|IWGB]` | ái dóbliu yi bi · ái dábliu yí bí · i dóbliu ye be · i doble ve ge be · I, W, G, B | 15 |
| Discord | `[Díscord\|Discord]` | Díscord · Díscor · Discord · Dískord · Dís-cord | 12 |
| The Register | `[De Réyister\|The Register]` | De Réyister · Da Réyister · The Réyister · De Régister · The Register | 11 |

Nombres que solo van en placa (la voz no los dice, no hace falta probarlos): Jennifer Kolbe, Bloomberg, IGN, Edimburgo, Leeds,
Lincoln, Dundee, Londres.

## Hoja de datos y fuentes

Fuentes leídas en las copias bajadas con curl el 27/11/2026 (Kotaku, Engadget, The Register). Solo entran cifras que están en
esas páginas.

| Dato | Frase del guion | Fuente |
|---|---|---|
| Jennifer Kolbe, jefa de publicación de Rockstar, le dijo a Bloomberg: "We go where the team goes. So if they want a union, they will have a union" (traducido) | 1 y 2: «Si quieren un sindicato, van a tener un sindicato.» / "Lo dijo la jefa de publicación de Rockstar" | [Engadget](https://www.engadget.com/2329177/workers-gta-6-studio-rockstar-games-vote-against-union-recognition/), [The Register](https://www.theregister.com/software/2026/11/12/rockstar-workers-vote-on-union-recognition-as-gta-vi-launch-looms/5309319) |
| Rockstar es el estudio de GTA 6 | 2: "el estudio de GTA 6" | [Kotaku](https://kotaku.com/rockstar-games-union-vote-fails-as-75-percent-of-devs-vote-no-2001000621) |
| La votación fue entre los empleados de Rockstar del Reino Unido, del 12 al 26 de noviembre; terminó el 26/11/2026 (jueves) | 3: "El jueves, sus empleados del Reino Unido terminaron de votar" | [Kotaku](https://kotaku.com/rockstar-games-union-vote-fails-as-75-percent-of-devs-vote-no-2001000621) ("Voting began on November 12 and concluded today on November 26"), [The Register](https://www.theregister.com/software/2026/11/12/rockstar-workers-vote-on-union-recognition-as-gta-vi-launch-looms/5309319) |
| 75% votó en contra del acuerdo de reconocimiento con el sindicato | 4: "Y tres de cada cuatro dijeron que no" | [Kotaku](https://kotaku.com/rockstar-games-union-vote-fails-as-75-percent-of-devs-vote-no-2001000621), [Engadget](https://www.engadget.com/2329177/workers-gta-6-studio-rockstar-games-vote-against-union-recognition/) ("three-quarters") |
| 1.163 en contra, 381 a favor (Engadget, citando a IGN) | 5: "1.163 votos en contra. 381 a favor" | [Engadget](https://www.engadget.com/2329177/workers-gta-6-studio-rockstar-games-vote-against-union-recognition/) ("according to IGN") |
| Participó más del 93%, en las oficinas de Edimburgo, Leeds, Lincoln, Dundee y Londres | 6: "Votó más del 93%, en cinco oficinas" | [Engadget](https://www.engadget.com/2329177/workers-gta-6-studio-rockstar-games-vote-against-union-recognition/) |
| GTA 6 salió durante la votación (el 19/11, según The Register) y vendió más de 30 millones el primer día | 7: "En el medio salió el juego, y vendió más de 30 millones el primer día" | [Kotaku](https://kotaku.com/rockstar-games-union-vote-fails-as-75-percent-of-devs-vote-no-2001000621) ("over 30 million sales in its first day"), [The Register](https://www.theregister.com/software/2026/11/12/rockstar-workers-vote-on-union-recognition-as-gta-vi-launch-looms/5309319) (fecha) |
| El acuerdo iba a formalizar la negociación colectiva sobre horas extra, bonos, despidos e IA | 8: "Con el sí, iban a negociar horas extra, despidos e inteligencia artificial" | [Kotaku](https://kotaku.com/rockstar-games-union-vote-fails-as-75-percent-of-devs-vote-no-2001000621) |
| Con el resultado, la empresa no está obligada a reconocer al sindicato ni a tener reuniones regulares con sus representantes | 9: "Con el no, nada obliga a la empresa a sentarse con el sindicato" | [Engadget](https://www.engadget.com/2329177/workers-gta-6-studio-rockstar-games-vote-against-union-recognition/), [Kotaku](https://kotaku.com/rockstar-games-union-vote-fails-as-75-percent-of-devs-vote-no-2001000621) |
| Un año de conflicto entre Rockstar y el sindicato antes de la votación | 10: "Pero la pelea empezó un año antes" | [The Register](https://www.theregister.com/software/2026/11/12/rockstar-workers-vote-on-union-recognition-as-gta-vi-launch-looms/5309319) ("a year of bad blood") |
| En octubre de 2025, Rockstar despidió a 31 afiliados del sindicato (Kotaku y Engadget dicen "decenas") | 11: "En octubre de 2025, Rockstar despidió a 31 afiliados, según The Register" | [The Register](https://www.theregister.com/software/2026/11/12/rockstar-workers-vote-on-union-recognition-as-gta-vi-launch-looms/5309319) ("fired 31 members in October 2025") |
| El sindicato dice que los eligieron por participar en un grupo privado de Discord | 12: "El sindicato dice que los eligieron por estar en un grupo privado de Discord" | [The Register](https://www.theregister.com/software/2026/11/12/rockstar-workers-vote-on-union-recognition-as-gta-vi-launch-looms/5309319) |
| Rockstar niega la acusación y dice que los despidió por falta grave (gross misconduct) | 13: "Rockstar dice que fue por falta grave" | [The Register](https://www.theregister.com/software/2026/11/12/rockstar-workers-vote-on-union-recognition-as-gta-vi-launch-looms/5309319), [Kotaku](https://kotaku.com/rockstar-games-union-vote-fails-as-75-percent-of-devs-vote-no-2001000621) |
| El caso está en un tribunal laboral; escuchó los alegatos finales y el fallo está pendiente | 14 y 16: "Un tribunal laboral todavía no dio el fallo" / "Falta que hable el tribunal" | [Kotaku](https://kotaku.com/rockstar-games-union-vote-fails-as-75-percent-of-devs-vote-no-2001000621), [Engadget](https://www.engadget.com/2329177/workers-gta-6-studio-rockstar-games-vote-against-union-recognition/) |
| El sindicato es el IWGB (Independent Workers Union of Great Britain) y va a seguir organizándose sin acuerdo formal | 15: "El sindicato, IWGB, promete seguir organizándose" | [Engadget](https://www.engadget.com/2329177/workers-gta-6-studio-rockstar-games-vote-against-union-recognition/), [Kotaku](https://kotaku.com/rockstar-games-union-vote-fails-as-75-percent-of-devs-vote-no-2001000621) |

Límites y cómo los trata el guion:
- **Solo el Reino Unido:** la votación fue en los estudios de Rockstar del Reino Unido, no en toda la empresa. El plano 3 lo dice
  ("sus empleados del Reino Unido") y la placa del 6 nombra las cinco oficinas.
- **El 31** sale solo de The Register y se dice "según The Register". Kotaku y Engadget dicen "decenas".
- **1.163 contra 381** viene de Engadget citando a IGN: la placa del plano 5 dice "SEGÚN IGN". El 75% de Kotaku coincide
  (1.163 / 1.544 = 75,3%).
- **La cita** está traducida del inglés. La voz no dice el nombre de Kolbe; va en placa.
- **Acusaciones:** el guion dice "el sindicato dice" y "Rockstar dice", sin dar por cierta ninguna versión. No hay fallo.
- Quedaron afuera: los US$ 3.790 millones de preventa y primer día (Engadget), los más de 1.600 habilitados para votar y que iba a
  ser el sindicato reconocido más grande de la industria del videojuego británica (The Register, antes del resultado), y las
  declaraciones completas del sindicato y de Kolbe.

## Placas por plano

Aparte de los subtítulos. Mayúsculas y signos tal como van. Sin "parte N" en ningún lado.

| # | Placa(s) | Cuándo |
|---|---|---|
| 1 | `«SI QUIEREN UN SINDICATO, VAN A TENER UN SINDICATO»` | desde el cuadro 0 (el gancho en mudo, sobre la urna) |
| 2 | `JENNIFER KOLBE · JEFA DE PUBLICACIÓN DE ROCKSTAR` · `A BLOOMBERG` | la primera en "jefa"; la segunda en "Rockstar" |
| 3 | `REINO UNIDO · VOTACIÓN DEL 12 AL 26/11` | en "Reino" |
| 4 | `3 DE CADA 4: NO` | en "no" |
| 5 | `NO: 1.163` · `SÍ: 381` · `SEGÚN IGN` | en "1.163", en "381" y al final del plano |
| 6 | `VOTÓ MÁS DEL 93%` · `EDIMBURGO · LEEDS · LINCOLN · DUNDEE · LONDRES` | en "93%," y en "oficinas" |
| 7 | `GTA 6 · 19/11` · `+30 MILLONES EL PRIMER DÍA` | en "juego," y en "30" |
| 8 | `HORAS EXTRA · DESPIDOS · IA` | en "negociar" |
| 9 | `SIN OBLIGACIÓN DE NEGOCIAR` | en "obliga" |
| 10 | `UN AÑO ANTES` | en "antes" |
| 11 | `OCTUBRE 2025` · `31 DESPIDOS · SEGÚN THE REGISTER` | en "octubre" y en "31" |
| 12 | `SEGÚN EL SINDICATO: GRUPO PRIVADO DE DISCORD` | en "Discord." |
| 13 | `SEGÚN ROCKSTAR: FALTA GRAVE` | en "grave" |
| 14 | `TRIBUNAL LABORAL · SIN FALLO` | en "tribunal" |
| 15 | `IWGB · SIGUE ORGANIZÁNDOSE` | en "IWGB," |
| 16 | `EL EQUIPO VOTÓ` · `FALTA EL FALLO` | en "votó." y en "tribunal." |
| 17 | `CUANDO SALGA EL FALLO, TE LO CUENTO ACÁ` | en "fallo," |

Personas: Jennifer Kolbe es un muñeco genérico con placa (plano 2), sin cara ni parecido. Empleados: muñecos genéricos haciendo
fila ante la urna. Marcas: solo el nombre en texto plano, sin logos (Rockstar, GTA 6, IWGB, Discord, The Register, Bloomberg, IGN).
El tribunal es un escritorio genérico con un martillo de juez.

## Títulos

1. **"Si quieren un sindicato, van a tener un sindicato": en Rockstar, tres de cada cuatro votaron que no**
2. **La semana de GTA 6, los empleados de Rockstar del Reino Unido votaron contra el sindicato**
3. **1.163 contra 381: el resultado que Rockstar celebra mientras espera un fallo**

## Descripción de Instagram

```
"Si quieren un sindicato, van a tener un sindicato", dijo la jefa de publicación de Rockstar. Tres de cada cuatro votaron que no.

En los estudios de Rockstar del Reino Unido se votó del 12 al 26 de noviembre: 1.163 en contra y 381 a favor (según IGN, citado por Engadget), con más del 93% de participación en cinco oficinas.
En el medio salió GTA 6, que vendió más de 30 millones el primer día.
Con el no, la empresa no está obligada a negociar con el sindicato horas extra, despidos ni inteligencia artificial.
En octubre de 2025, Rockstar despidió a 31 afiliados, según The Register. El sindicato dice que fue por un grupo privado de Discord. Rockstar dice que fue por falta grave. El tribunal laboral todavía no dio el fallo.

Cuando salga el fallo, te lo cuento acá.

Fuentes: Kotaku, Engadget, The Register.

#gta6 #rockstargames #sindicato #videojuegos #trabajo
```

## Cómo regenerar

```
python3 scripts/voice.py rockstar-sindicato-no       # voz + tiempos (ElevenLabs). Antes: probar Rockstar, IWGB, Discord y The Register
python3 fabrica/pronunciacion.py oir rockstar-sindicato-no
scripts/stills.sh rockstar-sindicato-no
npx tsx scripts/events.ts rockstar-sindicato-no && python3 scripts/audio.py rockstar-sindicato-no
scripts/render.sh rockstar-sindicato-no              # out/rockstar-sindicato-no/rockstar-sindicato-no.mp4
scripts/cover.sh rockstar-sindicato-no               # out/rockstar-sindicato-no/portada.png
```
