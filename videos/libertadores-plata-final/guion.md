# Final de la Libertadores: dos jugadores de Palmeiras valen más que todo Estudiantes

Video nuevo, sin número (no es "parte 2" de `libertadores-final-2026`: aquel contó hinchas y entradas, este cuenta plata).
Sin "parte N" en voz, placas, portada, títulos ni descripción.
Vertical 1080x1920, 30 fps, 14 planos, 163 palabras dichas (contadas sobre la parte "dicho" de `parrafos.json`).
A 2,71 palabras por segundo (el ritmo real de `libertadores-final-2026`: 170 palabras en 62,7 s) da unos 60 s. Si la voz
pasa de 60 s, el plano que se puede acortar es el 9 (sacar "Estudiantes, once y medio" de la voz y dejarlo solo en placa).

- **Vigencia:** sale el viernes 27 o el sábado 28/11/2026 antes del partido (17 h). La voz nunca dice "hoy" ni "mañana":
  dice "el sábado". Tampoco "este sábado" en placas: va la fecha `SÁBADO 28/11`.
- **Inicio:** F53, dos objetos en una balanza (playbook sección 1.F): "Dos jugadores de Palmeiras de un lado de la balanza.
  Todo Estudiantes del otro." Golpe 2: "Y valen más los dos". Golpe 3, los números (38 + 30 = 68 contra menos de 55) y la
  contradicción del plano 5 (el Flaco López es argentino). No es "Sos X". Distinto de los dos últimos de `hooks_used.json`
  (J99 en `ypf-burford-ciadi`, D31 en `cosecha-record-171`) y de ninguna F en los últimos ocho. No repite el gancho de
  `libertadores-final-2026` (E43, el anónimo: dos hinchas en bicicleta).
- **Cierre:** predicción con resultado exacto y plazo (playbook 4, sección Predicción, n.º 41 adaptado): "Dejá abajo tu
  resultado exacto antes de las cinco del sábado." Sin "Seguime", sin promesa de continuación. No es el "¿Quién gana?" de
  dos opciones (eso fue `colapinto-fp1-qatar`, hace cuatro videos) ni la pregunta de experiencia de
  `libertadores-final-2026`.
- **Imagen que abre y cierra:** una balanza low-poly de platillos. Plano 1: dos figuras genéricas (camiseta verde lisa, sin
  escudo) en un platillo; del otro, un grupo grande de figuras (camiseta roja y blanca a rayas, sin escudo), y el platillo de
  los dos baja. Plano 13: la misma balanza, inclinada hacia Palmeiras, y al lado una cancha vacía con la pelota en el centro.
- **Re-ganchos:** Transfermarkt (0:05), 38 y 30 (0:08), 68 contra menos de 55 (0:12), "es argentino" (0:16), la final del
  sábado (0:19), casi cuatro veces (0:23), los nueve más valiosos (0:28), 167 contra 11,5 (0:31), "Pero" eliminó a dos
  brasileños (0:38), 25 y 7 millones (0:42), la quinta y las siete seguidas (0:47), callback a la balanza (0:52). Ningún
  tramo de más de 5 s sin dato nuevo.
- **Checker de la skill:** 90/100, cero fallas graves. Los dos avisos leves son del lector en inglés (no lee números en
  letras ni un cierre en castellano como pedido).
- **Una sola pregunta:** ninguna en el cuerpo. El cierre es un pedido, no una pregunta.
- **Personas:** Vitor Roque, el Flaco López (y Tomás Palacios solo en placa del plano 8). Figuras genéricas con placa de
  nombre, sin caras, sin escudos, sin logos de clubes, de Conmebol ni de Transfermarkt.

**PRONUNCIACIÓN A CONFIRMAR** (ninguno está en `python3 fabrica/pronunciacion.py glosario`; generar variantes numeradas con
`pronunciacion.py probar`, no adivinar):
- **Palmeiras** (planos 1, 7 y 13): va escrito tal cual, sin grupo. En `libertadores-final-2026` salió en una sola toma y el
  revisor dejó anotado que nadie lo escuchó de oído. Variantes a probar: `Palmeiras`, `Palméiras`, `Pal-méi-ras`,
  `Palmeyras`.
- **Vitor Roque** (plano 3): escrito `[Vítor Roque,|Vitor Roque,]`. Variantes: `Vítor Roque`, `Vítor Róque`, `Bítor Róke`,
  `Vítor Rróque`. Ojo que no diga "Víctor".
- **Transfermarkt** (plano 2): escrito `[Tránsfermark.|Transfermarkt.]`. Variantes: `Tránsfermark`, `Trans-fer-mark`,
  `Tránsfer Market`, `Tránsfermarkt`.
- **Corinthians** (plano 10): escrito `[Corintians|Corinthians]`. Variantes: `Corintians`, `Corínthians`, `Corín-tians`,
  `Corinchans`.
- **"Flaco" López** (planos 3 y 5): castellano puro, se espera sin problema; no está en el glosario, así que confirmarlo
  al escuchar con `pronunciacion.py oir`.
Sin duda: Estudiantes, Centenario, Montevideo, Flamengo, Conmebol (se lee como palabra), Libertadores.

## Guion final (una línea por plano)

Tiempos estimados a 2,71 palabras por segundo; los reales salen de la voz.

1. `0:00.0` Dos jugadores de Palmeiras de un lado de la balanza. Todo Estudiantes del otro.
2. `0:05.2` Y valen más los dos, según Transfermarkt.
3. `0:07.7` Vitor Roque, 38 millones de euros. El Flaco López, 30.
4. `0:12.2` Suman 68. Estudiantes entero, menos de 55.
5. `0:16.2` Y el Flaco López es argentino.
6. `0:18.5` El sábado a las cinco, en el Centenario, juega la final contra Estudiantes.
7. `0:23.2` Palmeiras entero vale casi cuatro veces más: más de 218 millones.
8. `0:27.7` Los nueve más valiosos de la final son suyos.
9. `0:31.0` Por los jugadores que tiene hoy, Palmeiras pagó más de 167 millones. Estudiantes, 11,5.
10. `0:38.0` Pero Estudiantes ya eliminó a dos brasileños: Corinthians y Flamengo.
11. `0:41.7` El campeón se lleva 25 millones de dólares de la Conmebol. El subcampeón, 7.
12. `0:46.9` Si gana, Estudiantes levanta su quinta Libertadores y corta siete títulos brasileños seguidos.
13. `0:51.7` En la balanza gana Palmeiras. En la cancha, se define el sábado.
14. `0:56.1` Dejá abajo tu resultado exacto antes de las cinco del sábado.

## Cuentas propias

- 38 + 30 = 68 millones de euros (la suma la da la fuente: "Entre ambos atacantes suman 68 millones").
- 68 − 54,78 = 13,22 (también lo da la fuente). La voz dice "menos de 55" por 54,78; la placa muestra 54,78.
- 218,58 ÷ 54,78 = 3,99. La fuente dice "prácticamente cuadruplica"; la voz dice "casi cuatro veces más". La voz dice
  "más de 218" por 218,58.
- 167,4 ÷ 11,5 = 14,6 (la fuente: "una diferencia de más de 14 veces"). No se dice en voz; va en placa como `14 VECES MÁS`
  solo si el productor necesita una cifra más, si no, se omite.
- Monedas: los valores de planteles y pases están en euros; los premios, en dólares. No se suman ni se comparan entre sí.

## Hoja de datos y fuentes

Páginas bajadas con curl el 27/11/2026 (200) en el scratchpad de la sesión (`dl1806/a27.html`, `a28.html`, `a34.html`) y
leídas enteras. Transfermarkt (transfermarkt.com.ar, páginas de los dos clubes) respondió 405 a curl: **no se pudo
confirmar en Transfermarkt**, por eso todos los valores van atribuidos ("según Transfermarkt", vía El Economista) en voz
(plano 2) y en placa.

| # | Dato | Frase del guion | Fuente |
|---|------|-----------------|--------|
| 1 | La final es Estudiantes–Palmeiras, el sábado 28/11/2026, en el estadio Centenario de Montevideo. | "El sábado a las cinco, en el Centenario, juega la final contra Estudiantes." (6) | [El Economista, valor de planteles, 27/11](https://eleconomista.com.ar/deportes/diferencia-valor-planteles-estudiantes-palmeiras-final-libertadores-2026-n99987), [El Economista, premios, 27/11](https://eleconomista.com.ar/deportes/cuanto-dinero-gana-campeon-copa-libertadores-n99988) |
| 2 | Hora: 17 h (misma hora en Argentina y Uruguay), confirmada por Conmebol. | "a las cinco" (6) y "antes de las cinco del sábado" (14) | [El Observador](https://www.elobservador.com.uy/copa-libertadores/rumbo-la-gloria-eterna-conmebol-confirmo-el-horario-la-final-estudiantes-y-palmeiras-que-se-jugara-el-estadio-centenario-n6062308) (ya usada en `libertadores-final-2026`), agenda de [Clarín Deportes](https://www.clarin.com/deportes/) bajada hoy: "Palmeiras vs Estudiantes de La Plata", "2026-11-28 17:00:00" |
| 3 | Según Transfermarkt, el plantel de Estudiantes vale 54,78 millones de euros. | "Todo Estudiantes del otro." (1), "Estudiantes entero, menos de 55." (4) | [El Economista, n99987](https://eleconomista.com.ar/deportes/diferencia-valor-planteles-estudiantes-palmeiras-final-libertadores-2026-n99987) ("Según Transfermarkt [...] Estudiantes alcanza los 54,78 millones") |
| 4 | Vitor Roque, el más cotizado de la final, vale 38 millones de euros; el Flaco López, 30. Entre los dos suman 68 millones, 13,22 más que todo Estudiantes. | "Y valen más los dos, según Transfermarkt." (2), "Vitor Roque, 38 millones de euros. El Flaco López, 30." (3), "Suman 68." (4) | [El Economista, n99987](https://eleconomista.com.ar/deportes/diferencia-valor-planteles-estudiantes-palmeiras-final-libertadores-2026-n99987) |
| 5 | José Manuel "Flaco" López es argentino ("el argentino José Manuel 'Flaco' López") y juega en Palmeiras (es uno de "los goleadores de [...] Palmeiras"). | "Y el Flaco López es argentino." (5) | [El Economista, n99987](https://eleconomista.com.ar/deportes/diferencia-valor-planteles-estudiantes-palmeiras-final-libertadores-2026-n99987) |
| 6 | Según Transfermarkt, el plantel de Palmeiras vale 218,58 millones de euros y "prácticamente cuadruplica" al de Estudiantes. | "Palmeiras entero vale casi cuatro veces más: más de 218 millones." (7) | [El Economista, n99987](https://eleconomista.com.ar/deportes/diferencia-valor-planteles-estudiantes-palmeiras-final-libertadores-2026-n99987) |
| 7 | Los nueve futbolistas más valiosos de la final son de Palmeiras. El primero de Estudiantes aparece décimo: Tomás Palacios, 8 millones de euros. | "Los nueve más valiosos de la final son suyos." (8) | [El Economista, n99987](https://eleconomista.com.ar/deportes/diferencia-valor-planteles-estudiantes-palmeiras-final-libertadores-2026-n99987) |
| 8 | Palmeiras invirtió 167,4 millones de euros en la adquisición de sus actuales futbolistas; Estudiantes, 11,5 millones. | "Por los jugadores que tiene hoy, Palmeiras pagó más de 167 millones. Estudiantes, 11,5." (9) | [El Economista, n99987](https://eleconomista.com.ar/deportes/diferencia-valor-planteles-estudiantes-palmeiras-final-libertadores-2026-n99987) |
| 9 | En el camino a la final, Estudiantes dejó afuera a Corinthians y Flamengo. | "Pero Estudiantes ya eliminó a dos brasileños: Corinthians y Flamengo." (10) | [El Economista, n99987](https://eleconomista.com.ar/deportes/diferencia-valor-planteles-estudiantes-palmeiras-final-libertadores-2026-n99987) ("Tras dejar en el camino a Corinthians y Flamengo") |
| 10 | Premios de la Conmebol 2026: campeón US$ 25.000.000, subcampeón US$ 7.000.000. | "El campeón se lleva 25 millones de dólares de la Conmebol. El subcampeón, 7." (11) | [Infobae, 7/4/2026](https://www.infobae.com/deportes/2026/04/07/comienza-la-fase-de-grupos-de-la-copa-libertadores-y-sudamericana-los-millonarios-premios-que-reparten/), [El Economista, n99988](https://eleconomista.com.ar/deportes/cuanto-dinero-gana-campeon-copa-libertadores-n99988) |
| 11 | Si gana, sería la quinta Libertadores de Estudiantes y cortaría siete consagraciones brasileñas consecutivas. | "Si gana, Estudiantes levanta su quinta Libertadores y corta siete títulos brasileños seguidos." (12) | [El Economista, n99987](https://eleconomista.com.ar/deportes/diferencia-valor-planteles-estudiantes-palmeiras-final-libertadores-2026-n99987) ("a un partido de conquistar su quinta Copa Libertadores y poner fin a siete consagraciones brasileñas consecutivas"), [El Economista, n99988](https://eleconomista.com.ar/deportes/cuanto-dinero-gana-campeon-copa-libertadores-n99988) ("conquistar América por quinta vez") |

Límites y lo que quedó afuera:
- **Una sola fuente para los valores de Transfermarkt** (El Economista). Atribuidos en voz y en placa. Los valores de
  Transfermarkt cambian con cada actualización: si el verificador los abre y no coinciden, manda Transfermarkt y hay que
  corregir los planos 3, 4, 7 y 8.
- "Si gana" en el plano 12 incluye ganar por penales: la fuente habla de "conquistar" la Copa, no del resultado en 90 minutos.
- Afuera: los 273,36 M€ de la final, Mauricio (18 M€) y Jhon Arias (15 M€), Abel Ferreira, Verón, los 25,5 M€ por Roque y
  25 M€ por Arias, Tiago Palacios y el resto del ranking del Pincha, los "cerca de 31 millones de euros" en premios (El
  Economista mezcla monedas: los premios de Conmebol son en dólares), los acumulados de cada club (US$ 15.930.000 y
  US$ 16.270.000 garantizados), la historia del premio desde 2021, la Recopa contra Boca. Nada de hinchas, micros ni
  entradas (eso fue `libertadores-final-2026`). La final de 1968 tampoco: ya la contó aquel video.

## Placas por plano

Aparte de los subtítulos. Mayúsculas y signos tal como van. Sin "parte N" en ningún lado. Figuras genéricas: sin caras,
sin escudos, sin logos, sin sponsors; los nombres de clubes y jugadores en texto plano. Valores de planteles en euros
(`M€`), premios en dólares (`US$`): nunca en la misma placa.

| # | Placa(s) | Cuándo |
|---|---|---|
| 1 | `FINAL DE LA LIBERTADORES` · `2 JUGADORES DE PALMEIRAS` · `TODO ESTUDIANTES` | la primera desde el cuadro 0 (el gancho en mudo, sobre la balanza); la segunda sobre el platillo de los dos, en "Palmeiras"; la tercera sobre el otro platillo, en "otro." |
| 2 | `VALEN MÁS LOS DOS` · `SEGÚN TRANSFERMARKT` | la primera cuando baja el platillo de los dos, en "dos,"; la segunda en "Transfermarkt." |
| 3 | `VITOR ROQUE · 38 M€` · `FLACO LÓPEZ · 30 M€` | en "ocho" y en "treinta." |
| 4 | `38 + 30 = 68 M€` · `ESTUDIANTES: 54,78 M€` | en "sesenta y ocho." y en "cincuenta y cinco." |
| 5 | `ARGENTINO` | en "argentino.", sobre la figura del Flaco López |
| 6 | `SÁBADO 28/11 · 17 H` · `ESTADIO CENTENARIO, MONTEVIDEO` | en "cinco," y en "Centenario," |
| 7 | `PALMEIRAS: 218,58 M€` · `CASI 4 VECES MÁS` | en "doscientos dieciocho" y al final del plano |
| 8 | `LOS 9 MÁS VALIOSOS: DE PALMEIRAS` · `EL 1° DE ESTUDIANTES, 10°: TOMÁS PALACIOS · 8 M€` | en "nueve" y al final del plano |
| 9 | `PALMEIRAS PAGÓ 167,4 M€` · `ESTUDIANTES: 11,5 M€` | en "ciento sesenta y siete" y en "once y medio." |
| 10 | `YA ELIMINÓ A CORINTHIANS` · `Y A FLAMENGO` | en "Corinthians" y en "Flamengo." |
| 11 | `CAMPEÓN: US$ 25 MILLONES` · `SUBCAMPEÓN: US$ 7 MILLONES` · `PREMIOS DE LA CONMEBOL` | en "veinticinco", en "siete." y al final del plano |
| 12 | `SERÍA SU 5ª LIBERTADORES` · `CORTARÍA 7 TÍTULOS BRASILEÑOS SEGUIDOS` | en "quinta" y en "seguidos." |
| 13 | `EN LA BALANZA: PALMEIRAS` · `EN LA CANCHA: EL SÁBADO` | en "Palmeiras." y en "sábado." |
| 14 | `DEJÁ TU RESULTADO EXACTO` · `ANTES DEL SÁBADO 28/11, 17 H` | en "exacto" y al final del plano |

Fuentes en pantalla (texto chico, abajo, planos 2 a 12): `FUENTES: TRANSFERMARKT VÍA EL ECONOMISTA, CONMEBOL VÍA INFOBAE`.
La balanza de los planos 1, 2 y 13 es un esquema: agregar `ESQUEMA, NO A ESCALA` si se inclina según los valores.

## Títulos

1. **Dos jugadores de Palmeiras valen más que todo Estudiantes**
2. **68 millones de euros contra 54,78: la final de la Libertadores se juega el sábado**
3. **Palmeiras vale casi cuatro veces más que Estudiantes, y uno de sus goleadores es argentino**

## Descripción de Instagram

```
Dos jugadores de Palmeiras valen más que todo el plantel de Estudiantes, según Transfermarkt.

Vitor Roque, 38 millones de euros. El Flaco López, argentino, 30. Suman 68. Estudiantes entero vale 54,78.
Palmeiras vale 218,58 millones: casi cuatro veces más. Los nueve jugadores más valiosos de la final son suyos, y para armar su plantel actual pagó 167,4 millones contra 11,5 de Estudiantes.
Pero el Pincha ya eliminó a Corinthians y a Flamengo. El campeón se lleva US$ 25 millones de la Conmebol y el subcampeón, US$ 7 millones. Si gana, es su quinta Libertadores y corta siete títulos brasileños seguidos.

La final: sábado 28/11, 17 h, Estadio Centenario de Montevideo.

Dejá tu resultado exacto en los comentarios antes del partido.

Fuentes: Transfermarkt (vía El Economista), Conmebol (vía Infobae y El Economista).

#libertadores #estudiantes #palmeiras #futbol #copalibertadores
```

## Cómo regenerar

```
python3 fabrica/pronunciacion.py probar "Palmeiras" "La final la juega ## el sábado." Palmeiras Palméiras Pal-méi-ras Palmeyras
python3 fabrica/pronunciacion.py probar "Vitor Roque" "El más valioso es ##, de Palmeiras." "Vítor Roque" "Vítor Róque" "Bítor Róke" "Vítor Rróque"
python3 fabrica/pronunciacion.py probar "Transfermarkt" "Los dos valen más, según ##." Tránsfermark Trans-fer-mark "Tránsfer Market" Tránsfermarkt
python3 fabrica/pronunciacion.py probar "Corinthians" "Estudiantes ya eliminó a ## y Flamengo." Corintians Corínthians Corín-tians Corinchans
python3 scripts/voice.py libertadores-plata-final       # voz + tiempos (ElevenLabs)
python3 fabrica/pronunciacion.py oir libertadores-plata-final
scripts/stills.sh libertadores-plata-final
npx tsx scripts/events.ts libertadores-plata-final && python3 scripts/audio.py libertadores-plata-final
scripts/render.sh libertadores-plata-final              # out/libertadores-plata-final/libertadores-plata-final.mp4
scripts/cover.sh libertadores-plata-final               # out/libertadores-plata-final/portada.png
```
