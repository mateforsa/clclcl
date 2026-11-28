# Referencias que le gustaron al dueño

Reels de otras cuentas que el dueño marcó como "interesantes" o "parecidos a lo que quiero". Solo se toma el formato y el
tipo de tema; nunca se copia guion, orden, imágenes ni video. No se bajan los videos de otras cuentas.

| Fecha | Cuenta | Reel | Tema / formato | Números al verlo |
|---|---|---|---|---|
| 27/11/2026 | @induscoreig | https://www.instagram.com/reel/DgDRRGzkVLU/ | "La Argentina no solo exporta soja: un viaje por las ciudades que fabrican". Recorrido por ciudades/regiones (San Nicolás, litio, Tucumán, Chaco, vino, minería). Cierre: "¿Qué ciudad industrial sumarías al viaje?" | 25K me gusta, 382 comentarios (22/11) |
| 27/11/2026 | @cafeconfeli | https://www.instagram.com/reel/DgPyjEmR2vV/ | "72 a 0: freno a las apuestas online". Noticia del día con el número en el gancho; qué prohíbe la ley; "todavía falta que se promulgue". | 3.841 me gusta, 128 comentarios (27/11, el mismo día) |

## Qué sacamos
- **Recorridos de Argentina productiva** ("un viaje por…"): orgullo + dato sorprendente + pregunta que invita a sumar el propio lugar. El editor tiene que darle puntaje alto a este formato.
- **Noticia del día con un número fuerte en la primera frase** (72 a 0): sale el mismo día y prende.
- Cierres que piden al espectador sumar algo suyo ("¿qué ciudad sumarías?", "comentá tu club") generan comentarios.


## Cuentas que se leen con la API (28/11)
`python3 fabrica/referencias.py` lista los posteos que más pegaron de las cuentas de referencia (solo texto y números).
Funciona con cuentas de empresa o creador. `explicadoen.unminuto1` (la mandó el dueño el 28/11) da "Invalid user id":
es personal o el usuario es otro, así que no se puede leer por la API.

Lo que se vio el 28/11:
- @induscoreig (46.720 seguidores): su serie "Instalaciones solo en Argentina / ... armado de cero" saca 10.000–17.000 me gusta.
  Ejemplos: los seis tornillos del motor (estrella-triángulo), la terminal de granos que vacía un camión en minutos, el pivote
  de riego, la refinería. Gancho = objeto cotidiano + "cómo funciona por dentro", y cierre preguntando "¿trabajás en...?".
  Encaja perfecto con nuestro 3D low-poly.
- @cafeconfeli (34.834 seguidores, 14 posteos): 20.000–66.000 me gusta con preguntas de economía y política del tipo
  "¿Estábamos mejor con...? Comparé los números" o "Te lo desmiento en un minuto", con "Datos: INDEC, ...". Tomamos el
  FORMATO (pregunta polémica + datos con fuente + muchos comentarios), nunca la postura: el canal no toma partido.
