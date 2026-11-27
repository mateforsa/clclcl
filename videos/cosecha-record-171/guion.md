# Cosecha récord: 171 millones de toneladas. Y no fue la soja, que bajó: fue el maíz

Video nuevo (no es continuación de ningún otro: sin "parte N" en voz, placas, portada, títulos ni descripción). Se escribe el
viernes 27/11/2026, corrida de las 16:34. Formato "Argentina productiva" (`fabrica/referencias.md`): orgullo + dato sorprendente +
pregunta que invita a sumar el propio lugar. Tema económico: se cuentan los datos oficiales y los privados, cada uno atribuido.
Sin opinión política, sin nombrar al Gobierno ni a ningún funcionario, sin pronósticos propios.
Video vertical 1080x1920, 30 fps, unos 0:60 a 0:65, 14 planos, sin carteles de capítulo. Voz: Juanma (ElevenLabs), una sola toma.
184 palabras dichas (contadas sobre la parte "dicho" de `parrafos.json`).

- **Inicio:** D31 contradicción (sección D del playbook, "Subió X. Y aun así..."), invertida: "La soja bajó. Y aun así la Argentina
  cosechó más granos que nunca." Golpe 2: el número y quién lo dice (171 millones de toneladas, según la Secretaría de Agricultura).
  Golpe 3: el salto (30 millones más) y la única pregunta del cuerpo ("¿quién empujó el récord?"), que se contesta en el plano 5.
  No es "Sos X". Los dos videos anteriores en `hooks_used.json` usan H76 (`de-donde-vienen-tus-cosas`) y J99 (`ypf-burford-ciadi`);
  ninguno de los diez últimos usa la sección D.
- **Cierre:** pedido de sumar lo propio, con dos datos concretos (playbook 4, aporte del lugar propio, en la línea de "¿qué ciudad
  sumarías?" de `referencias.md`): "Contá qué se siembra cerca de donde vivís: el pueblo y el cultivo." Viene después del callback a
  la soja del gancho (plano 13: bajó, pero sigue siendo la que más dólares trae). Sin "Seguime", sin predicción, sin continuación, sin
  "comentá tu club" ni "pregunta a los del rubro" (los cierres de hoy).
- **Imagen que abre y cierra:** dos montañas de granos low-poly en un campo, una amarilla (maíz) y una verde clara (soja). En el plano 1
  la de soja baja un poco y aun así el silo de atrás se llena hasta el tope con un contador de toneladas. En el plano 13 vuelve la
  montaña de soja, más chica que la de maíz, pero con la pila de billetes más alta al lado.
- **Re-ganchos:** 171 millones (0:04), 30 millones (0:08), la pregunta (0:11), 72,5 (0:13), "más de 20 millones" (0:17), el
  primer puesto (0:21), la soja que baja (0:24), 2,1% contra 21% (0:30), la cuenta privada más chica (0:40), los dólares (0:46),
  la soja que sigue primera en dólares (0:53). Ningún tramo pasa de 8 s sin dato nuevo.
- **Checker de la skill:** 85/100, cero fallas graves. Los tres avisos leves son del lector en inglés (no lee números escritos con
  letras ni un pedido en castellano); el gancho tiene la contradicción y la cifra llega en el plano 2, a los 4 s.

## Guion final (una línea por plano)

| # | Tiempo | Texto |
|---|--------|-------|
| 1 | 0:00 | La soja bajó. Y aun así la Argentina cosechó más granos que nunca. |
| 2 | 0:04 | 171 millones de toneladas, según la Secretaría de Agricultura. |
| 3 | 0:08 | Son 30 millones más que en la campaña anterior. |
| 4 | 0:11 | Entonces, ¿quién empujó el récord? |
| 5 | 0:13 | El maíz: llegó a 72,5 millones de toneladas. |
| 6 | 0:17 | Son más de 20 millones extra, de un solo cultivo. |
| 7 | 0:21 | Y hoy es el cultivo más grande del país. |
| 8 | 0:24 | La soja, en cambio, bajó de 51,5 a 49,3 millones. |
| 9 | 0:30 | Lo sembrado creció apenas un 2,1%. La cosecha, un 21%. |
| 10 | 0:35 | Cada hectárea rindió más, según la Secretaría, por el buen clima y más tecnología. |
| 11 | 0:40 | Una consultora privada cuenta menos, 164,4 millones: no suma el maíz para forraje. |
| 12 | 0:46 | Según esa consultora, las exportaciones de granos llegarían a 44.869 millones de dólares. |
| 13 | 0:53 | Y la soja, aunque bajó, sigue siendo la que más dólares trae: unos 21.300 millones. |
| 14 | 0:59 | Contá qué se siembra cerca de donde vivís: el pueblo y el cultivo. |

Tiempos estimados a unas 2,9 palabras dichas por segundo (`kioscos-53000`: 190 palabras en 63,98 s); a 2,7 da unos 68 s. Los reales
salen de `timing.json` después de la voz. Si la toma pasa de 65 s, el plano 10 es el primero que se puede recortar (el dato del
rendimiento ya está en el plano 9 y la atribución pasa a la descripción).

## PRONUNCIACIÓN A CONFIRMAR

Glosario consultado (`python3 fabrica/pronunciacion.py glosario`, 27/11/2026): ningún término de este video está en el glosario,
y la voz **no dice ningún nombre extranjero, marca ni sigla**. A propósito: "Agritrend", "Ámbito" y "Clarín" van solo en placa; la
voz dice "una consultora privada" y "esa consultora". No hace falta probar variantes. Si el productor decide que la voz diga el nombre
de la consultora, queda marcado así:

| Término | Estado | Variantes sugeridas para probar |
|---|---|---|
| Agritrend | PRONUNCIACIÓN A CONFIRMAR (solo en placa) | Agritrénd · Ágri trend · Agritren |

Palabras para mirar en `pronunciacion.py oir`: "forraje", "veintiún mil trescientos" y "cuarenta y cuatro mil ochocientos sesenta
y nueve millones" (cifra larga). Números: todos con `[dicho|mostrado]` en `parrafos.json`.

## Hoja de datos y fuentes

Fuentes leídas en las copias bajadas con curl el 27/11/2026 (Ámbito y Clarín, carpeta `dl1634/` del scratchpad de la sesión). Solo
entran cifras que están en esas dos páginas. La fuente primaria de la cosecha es la Secretaría de Agricultura (campaña 2025/26); las
exportaciones y la cuenta de 164,4 son de la consultora Agritrend (Gustavo López), según Clarín.

- Ámbito: https://www.ambito.com/economia/la-cosecha-alcanzo-un-record-historico-y-el-campo-aportaria-casi-u45000-millones-n6349975
- Clarín: https://www.clarin.com/rural/saliendo-estancamiento-cosecha-granos-record-trae-aluvion-dolares-argentina_0_mjnLdIjqyP.html

| Dato | Frase del guion | Fuente |
|---|---|---|
| Campaña 2025/26: 171 millones de toneladas, récord histórico, según la Secretaría de Agricultura ("el mayor volumen registrado hasta el momento", según las series de la Dirección Nacional de Agricultura) | 1 y 2: "cosechó más granos que nunca" / "171 millones de toneladas, según la Secretaría de Agricultura" | [Ámbito](https://www.ambito.com/economia/la-cosecha-alcanzo-un-record-historico-y-el-campo-aportaria-casi-u45000-millones-n6349975) ("récord histórico de 171 millones de toneladas... según informó la Secretaría de Agricultura"), [Clarín](https://www.clarin.com/rural/saliendo-estancamiento-cosecha-granos-record-trae-aluvion-dolares-argentina_0_mjnLdIjqyP.html) |
| 30 millones de toneladas más que los 141 millones de 2024/25 (+21%) | 3: "Son 30 millones más que en la campaña anterior" (y placa 3) | [Ámbito](https://www.ambito.com/economia/la-cosecha-alcanzo-un-record-historico-y-el-campo-aportaria-casi-u45000-millones-n6349975) ("superó en 30 millones de toneladas los 141 millones"; "crecimiento del 21%"), [Clarín](https://www.clarin.com/rural/saliendo-estancamiento-cosecha-granos-record-trae-aluvion-dolares-argentina_0_mjnLdIjqyP.html) |
| Maíz: 72,5 millones de toneladas, frente a 51,69 millones de la campaña anterior; aportó 20,81 millones adicionales | 5 y 6: "llegó a 72,5 millones de toneladas" / "Son más de 20 millones extra" (placa 5: 51,69 → 72,5) | [Ámbito](https://www.ambito.com/economia/la-cosecha-alcanzo-un-record-historico-y-el-campo-aportaria-casi-u45000-millones-n6349975) ("72,5 millones de toneladas, frente a los 51,69 millones... aportó 20,81 millones de toneladas adicionales"). Clarín redondea la base a "51,6 millones" |
| El maíz es el principal cultivo argentino en volumen | 7: "Y hoy es el cultivo más grande del país" | [Ámbito](https://www.ambito.com/economia/la-cosecha-alcanzo-un-record-historico-y-el-campo-aportaria-casi-u45000-millones-n6349975) ("se consolidó como el principal cultivo argentino en términos de volumen"), [Clarín](https://www.clarin.com/rural/saliendo-estancamiento-cosecha-granos-record-trae-aluvion-dolares-argentina_0_mjnLdIjqyP.html) ("El maíz fue el cultivo de mayor producción") |
| Soja: 49,3 millones de toneladas, frente a 51,5 millones del ciclo previo (Ámbito: 51,51); sigue segunda en volumen | 8: "bajó de 51,5 a 49,3 millones" | [Clarín](https://www.clarin.com/rural/saliendo-estancamiento-cosecha-granos-record-trae-aluvion-dolares-argentina_0_mjnLdIjqyP.html) ("La soja registró 49,3 millones de toneladas, frente a los 51,5 millones"), [Ámbito](https://www.ambito.com/economia/la-cosecha-alcanzo-un-record-historico-y-el-campo-aportaria-casi-u45000-millones-n6349975) |
| Superficie sembrada récord: 44,6 millones de hectáreas, +2,1% interanual; la producción creció 21% "frente a una expansión de apenas 2,1%", lo que "refleja una mejora de los rendimientos" | 9 y 10: "Lo sembrado creció apenas un 2,1%. La cosecha, un 21%" / "Cada hectárea rindió más" (placa 9: 44,6 M ha) | [Ámbito](https://www.ambito.com/economia/la-cosecha-alcanzo-un-record-historico-y-el-campo-aportaria-casi-u45000-millones-n6349975), [Clarín](https://www.clarin.com/rural/saliendo-estancamiento-cosecha-granos-record-trae-aluvion-dolares-argentina_0_mjnLdIjqyP.html) (44,6 millones de hectáreas) |
| La Secretaría atribuyó el crecimiento a condiciones climáticas favorables, la inversión de los productores, la incorporación de tecnología y variables macroeconómicas | 10: "según la Secretaría, por el buen clima y más tecnología" | [Ámbito](https://www.ambito.com/economia/la-cosecha-alcanzo-un-record-historico-y-el-campo-aportaria-casi-u45000-millones-n6349975) ("condiciones climáticas favorables... la incorporación de tecnología") |
| Agritrend calcula 164,4 millones de toneladas, casi siete millones menos que el dato oficial; la diferencia es el maíz: el Gobierno incluye la producción destinada a forraje y la cuenta privada mide el grano comercial. "Ambas mediciones coinciden en señalar una campaña excepcional" | 11: "Una consultora privada cuenta menos, 164,4 millones: no suma el maíz para forraje" | [Clarín](https://www.clarin.com/rural/saliendo-estancamiento-cosecha-granos-record-trae-aluvion-dolares-argentina_0_mjnLdIjqyP.html) |
| Exportaciones del complejo granario: US$ 44.869 millones, cálculo de Agritrend (saldo exportable 124,4 Mt a US$ 361 FOB por tonelada); la Secretaría no dio estimación oficial. Ámbito: +34,5% frente a US$ 33.371 millones del ciclo anterior | 12: "Según esa consultora, las exportaciones de granos llegarían a 44.869 millones de dólares" | [Clarín](https://www.clarin.com/rural/saliendo-estancamiento-cosecha-granos-record-trae-aluvion-dolares-argentina_0_mjnLdIjqyP.html) ("De acuerdo con los números de Agritrend... alcanzaría los US$ 44.869 millones"), [Ámbito](https://www.ambito.com/economia/la-cosecha-alcanzo-un-record-historico-y-el-campo-aportaria-casi-u45000-millones-n6349975) ("la Secretaría de Agricultura no difundió estimaciones oficiales... cálculos privados ubicaron las ventas externas en torno de u$s44.869 millones") |
| La soja sigue primera como generadora de dólares: el complejo sojero aportaría unos US$ 21.300 millones (US$ 19.800 M el ciclo previo); el maíz, casi US$ 10.000 millones (US$ 6.800 M antes) | 13: "sigue siendo la que más dólares trae: unos 21.300 millones" (placa 13 con el maíz) | [Clarín](https://www.clarin.com/rural/saliendo-estancamiento-cosecha-granos-record-trae-aluvion-dolares-argentina_0_mjnLdIjqyP.html) ("La soja... continuará ocupando el primer lugar como principal generador de dólares del sector. El complejo sojero aportaría unos US$ 21.300 millones"), cálculo de Agritrend |

Límites y cómo los trata el guion:
- **Maíz del año anterior: 51,69 y no 51,7.** El editor escribió 51,7 y el buscador 51,6. Ámbito dice 51,69 y Clarín 51,6. La voz no
  dice la base: dice "llegó a 72,5" y "más de 20 millones extra" (Ámbito: 20,81, y 72,5 menos 51,6 también da más de 20). La placa del
  plano 5 muestra `51,69 → 72,5`, la cifra exacta de Ámbito, con la fuente al lado.
- **"El cultivo más grande del país":** en 2024/25 el maíz (51,69) ya superaba apenas a la soja (51,51), según Ámbito. Por eso el guion
  no dice que el maíz "le sacó el primer puesto" a la soja: dice "hoy es el cultivo más grande".
- **Sin restas propias en voz ni placa.** No se dice cuánto le saca el maíz a la soja ni cuánto falta liquidar.
- **Lo oficial y lo privado, separados.** 171 Mt, 30 Mt, 2,1% y 21% son de la Secretaría ("según la Secretaría de Agricultura" en el
  plano 2 y de nuevo en el 10). 164,4 Mt, US$ 44.869 M y US$ 21.300 M son de Agritrend: la voz dice "una consultora privada" y
  "esa consultora"; las placas, `SEGÚN AGRITREND`. Ámbito los llama "cálculos privados" y Clarín los atribuye a Agritrend.
- **Sin política:** la Secretaría también menciona "las medidas del Gobierno" y las retenciones. El guion se queda con el clima y la
  tecnología, que la misma fuente nombra, y no habla de retenciones ni de medidas. La frase de López sobre "salir del estancamiento"
  queda afuera (es una opinión).
- **"Falta ingresar unos US$ 6.000 M":** la bajada de Clarín dice 6.000 y el cuerpo dice 5.700 más unos 1.000 de retenciones. No
  coinciden: no se usa.
- Quedaron afuera por duración: trigo (18,5 a 27,8 Mt), girasol (5,5 a 7,6 Mt; exportaciones de US$ 1.000 a 3.500 M), cebada, sorgo,
  arroz, hectáreas de maíz (9,2 a 11,5 M) y de soja (17,9 a 16,2 M), retenciones (US$ 5.781 M).

## Placas por plano

Aparte de los subtítulos. Mayúsculas y signos tal como van. Sin "parte N" en ningún lado.

| # | Placa(s) | Cuándo |
|---|---|---|
| 1 | `LA SOJA BAJÓ` · `Y AUN ASÍ, RÉCORD` | la primera desde el cuadro 0 (el gancho en mudo, sobre la montaña de soja que baja), la segunda en "nunca." |
| 2 | `171 MILLONES DE TONELADAS` · `SEGÚN LA SECRETARÍA DE AGRICULTURA · CAMPAÑA 2025/26` | en "171 millones" y en "Agricultura." |
| 3 | `141 → 171 MILLONES DE T` · `+21%` | en "30 millones" y al final del plano |
| 4 | `¿QUIÉN EMPUJÓ EL RÉCORD?` | en "récord?" |
| 5 | `MAÍZ` · `51,69 → 72,5 MILLONES DE T` | en "maíz:" y en "72,5" |
| 6 | `+20,81 MILLONES DE T` · `UN SOLO CULTIVO` | en "20 millones" y en "cultivo." |
| 7 | `N.º 1 DEL PAÍS EN TONELADAS` | en "grande" |
| 8 | `SOJA` · `51,5 → 49,3 MILLONES DE T` | en "soja," y en "49,3" |
| 9 | `SUPERFICIE: +2,1% · 44,6 MILLONES DE HECTÁREAS (RÉCORD)` · `COSECHA: +21%` | en "2,1%." y en "21%." |
| 10 | `MÁS TONELADAS POR HECTÁREA` · `SEGÚN LA SECRETARÍA: CLIMA Y TECNOLOGÍA` | en "hectárea" y en "tecnología." |
| 11 | `164,4 MILLONES DE T · SEGÚN AGRITREND` · `NO CUENTA EL MAÍZ PARA FORRAJE` | en "164,4" y en "forraje." |
| 12 | `US$ 44.869 MILLONES EN EXPORTACIONES` · `CÁLCULO PRIVADO · SEGÚN AGRITREND` | en "44.869 millones" y en "consultora," (o al final del plano si la palabra cae antes) |
| 13 | `SOJA: US$ 21.300 MILLONES` · `MAÍZ: CASI US$ 10.000 MILLONES` · `SEGÚN AGRITREND` | en "21.300 millones." la primera; las otras dos al final del plano |
| 14 | `¿QUÉ SE SIEMBRA CERCA TUYO?` · `CONTÁ EL PUEBLO Y EL CULTIVO` | en "siembra" y en "cultivo." |

Fuentes en pantalla (texto chico, abajo, planos 2 a 13): `FUENTES: ÁMBITO Y CLARÍN, 27/11/2026 · DATOS: SECRETARÍA DE AGRICULTURA Y AGRITREND`.
Personas: no aparece ninguna persona real. Si hay productores o camioneros, son muñecos genéricos. Marcas: ninguna; silos, camiones,
cosechadoras y bolsas sin logo. Agritrend, la Secretaría y los diarios van en texto plano, sin logos ni escudos. Las montañas de
granos y las pilas de billetes son un esquema: si llevan números, agregar `ESQUEMA, NO A ESCALA`.

## Títulos

1. **Cosecha récord: 171 millones de toneladas. Y no fue la soja, que bajó**
2. **La soja bajó y aun así la Argentina cosechó más que nunca: lo empujó el maíz**
3. **30 millones de toneladas más en un año: el maíz ya es el cultivo más grande del país**

## Descripción de Instagram

```
La soja bajó. Y aun así la Argentina cosechó más granos que nunca: 171 millones de toneladas.

Según la Secretaría de Agricultura, la campaña 2025/26 es la más grande registrada: 30 millones de toneladas más que la anterior (141 millones), un 21% más, sobre una superficie récord de 44,6 millones de hectáreas.
El empujón vino del maíz: pasó de 51,69 a 72,5 millones de toneladas y es el cultivo más grande del país. La soja bajó de 51,5 a 49,3 millones.
La superficie creció apenas 2,1%: cada hectárea rindió más. La Secretaría lo atribuye, entre otras cosas, al clima favorable y a la tecnología.
La consultora Agritrend calcula menos, 164,4 millones, porque no cuenta el maíz para forraje. Según sus cálculos, las exportaciones de granos llegarían a US$ 44.869 millones, y la soja sigue siendo la que más dólares trae: unos US$ 21.300 millones.

Contá qué se siembra cerca de donde vivís: el pueblo y el cultivo.

Fuentes: Ámbito y Clarín (27/11/2026), con datos de la Secretaría de Agricultura y de Agritrend.

#cosecha #maiz #campo #argentina #agro
```

## Cómo regenerar

```
python3 scripts/voice.py cosecha-record-171       # voz + tiempos (ElevenLabs)
python3 fabrica/pronunciacion.py oir cosecha-record-171
scripts/stills.sh cosecha-record-171
npx tsx scripts/events.ts cosecha-record-171 && python3 scripts/audio.py cosecha-record-171
scripts/render.sh cosecha-record-171              # out/cosecha-record-171/cosecha-record-171.mp4
scripts/cover.sh cosecha-record-171               # out/cosecha-record-171/portada.png
```
