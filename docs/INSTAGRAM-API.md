# Instagram por API: radar, publicación y métricas

Documentación de Meta revisada el 26/11/2026 (versión v27.0 de la API). Meta la cambia seguido: si algo falla,
volver a leer las páginas de "Content Publishing", "IG User Media", "Business Discovery" e "Instagram Media Insights".

## Paso 0: acceso (se hace una sola vez)

1. **Cuenta profesional.** En Instagram: Configuración > Tipo de cuenta y herramientas > Cambiar a cuenta
   profesional (Creador o Empresa).
2. **Página de Facebook vinculada.** Crear una página en facebook.com/pages/create y, en Instagram, Editar
   perfil > Página > Conectar. Sin página vinculada la API no ve la cuenta.
3. **App en Meta for Developers.** developers.facebook.com > Mis apps > Crear app > caso de uso con Instagram >
   elegir "Instagram API with Facebook Login" (no "Instagram Login": Business Discovery y la subida reanudable
   solo están en la de Facebook Login).
4. **Permisos.** `instagram_basic`, `instagram_content_publish`, `instagram_manage_insights`,
   `pages_show_list`, `pages_read_engagement`. Si el rol sobre la página viene del Business Manager, sumar
   `ads_read`. Mientras la app esté en modo desarrollo y la cuenta sea tuya (administrador de la app), funcionan
   sin revisión de Meta.
5. **Token.** Dos caminos:
   - Recomendado: en business.facebook.com > Configuración > Usuarios > Usuarios del sistema, crear un usuario
     del sistema, asignarle la página, la cuenta de Instagram y la app, y generar un token con esos permisos
     eligiendo "Nunca" en el vencimiento. No hay que renovarlo.
   - Alternativa: en el Explorador de la API Graph generar un token de usuario (dura 1 hora) y cambiarlo por
     uno de 60 días. Ese hay que renovarlo: `python3 scripts/renovar_token.py --renovar`.
6. **Guardar el token como secreto, nunca en git.**
   - En la nube: secreto de red del entorno `clclcl` para `graph.facebook.com` y otro igual para
     `rupload.facebook.com`, los dos con cabecera Authorization y prefijo Bearer (probado el 26/11/2026: la subida
     acepta Bearer). El proxy lo agrega solo; los scripts no lo ven.
   - En tu computadora: variable de entorno `IG_ACCESS_TOKEN` (y `META_APP_ID`, `META_APP_SECRET` para renovar).
7. **ID de la cuenta.** `python3 scripts/meta_api.py cuenta` y copiar el número a `ig_user_id` en
   `instagram/config.yaml`.

Hosts del entorno de nube (ya agregados): `graph.facebook.com`, `rupload.facebook.com`, `developers.facebook.com`.

## Comandos

```
python3 scripts/meta_api.py token        # ¿funciona el token? ¿cuándo vence?
python3 scripts/radar.py                 # informe de cuentas de referencia -> instagram/referencias/AAAA-MM-DD.md
python3 scripts/radar.py --demo          # lo mismo con datos inventados, sin token
python3 scripts/publicar.py <slug> --simular    # valida y muestra, no publica
python3 scripts/publicar.py <slug>              # pide escribir PUBLICAR <slug>
python3 scripts/publicar.py <slug> --prueba     # reel de prueba (solo no seguidores)
python3 scripts/cola.py [--simular]      # publica lo vencido de instagram/cola.json
python3 scripts/metricas.py              # fotos de 48 h y 7 días -> instagram/metricas.json
python3 scripts/metricas.py --importar   # suma los reels subidos a mano
python3 scripts/metricas.py --informe    # informe semanal por gancho, cierre y duración
```

## Archivos

| Archivo | Qué es |
|---|---|
| `instagram/config.yaml` | ID de la cuenta, versión de la API, horarios. Sin secretos. |
| `instagram/radar.yaml` | Cuentas de referencia (5 a 20) y reglas del radar. |
| `instagram/radar.sqlite` | Historial del radar, para no repetir reels ya informados. Va en git. |
| `instagram/referencias/` | Informes del radar e informes semanales. |
| `instagram/cola.json` | Qué publicar y cuándo. Cada entrada es un OK dado de antemano. |
| `instagram/publicados.json` | slug, id, fecha, link de cada reel publicado. |
| `instagram/metricas.json` | Métricas a las 48 h y a los 7 días. |

## Cómo se usa el radar

`radar.py` trae los datos y marca los "reventados" (5x o más la mediana de su cuenta, últimos 30 días). No
descarga video. Después Claude completa en el mismo archivo "Por qué funcionó" y las "5 ideas": cada idea usa un
tipo de gancho que no esté entre los últimos 6 de `instagram/hooks_used.json` y lleva un dato verificado con
WebSearch y su fuente. Se toma la estructura, nunca el texto ni el video de otro.

Límites de la API: solo lee cuentas profesionales y públicas, no devuelve la duración de reels ajenos, y
`view_count` puede incluir vistas de Facebook en videos publicados en las dos redes.

## Publicación

`publicar.py` valida contra las especificaciones de Meta para Reels (MP4 con H264 o HEVC 4:2:0, 23 a 60 cuadros
por segundo, audio AAC hasta 48 kHz, 3 s a 15 min, hasta 300 MB) y contra las reglas del canal (1080x1920, cinco
etiquetas). La portada se pasa como URL pública: `instagram/portadas/<slug>.jpg` tiene que estar subida a la rama
de `rama_portadas` (el repo es público). Meta permite 100 publicaciones por API cada 24 horas.

El MP4 no está en git. Entre sesiones no hace falta guardarlo: todo lo necesario para rehacerlo sí está en git
(guion, voz, mezcla, escenas), y `scripts/render.sh <slug>` lo regenera en unos 10 minutos por corto. `cola.py`
lo hace solo si falta.

## Programación

La API no agenda: el script tiene que correr a la hora. Lo más simple es una tarea programada de Claude Code en
la nube por cada horario, que abre una sesión nueva en el entorno `clclcl` y corre:

- Madrugada (por ejemplo 05:00): `python3 scripts/radar.py`, completar análisis e ideas, `python3 scripts/metricas.py`,
  commit y push.
- A cada horario de publicación: `npm ci`, `python3 scripts/cola.py`, commit y push de `publicados.json`.

Para que publique sin que estés, el slug tiene que estar en `instagram/cola.json` con su fecha y hora.

## Reels de prueba: no disponibles todavía

Probado el 26/11/2026: Meta rechaza `trial_params` para esta cuenta con "Application does not have permission for
this action" (código 10), tanto con subida reanudable como con `video_url`. Un reel normal con la misma app sí se
publica. La causa no está confirmada: puede ser que la cuenta no tenga la función habilitada (24 seguidores en esa
fecha) o que la app necesite acceso avanzado. Volver a probar si la opción "Prueba" aparece en la app de Instagram.

## Subida de video: falla de a ratos (sin resolver)

26/11/2026: la subida a `rupload.facebook.com` devuelve "ProcessingFailedError: Request processing failed" en la
mayoría de los intentos, con el mismo archivo y el mismo pedido que otras veces funciona. Funcionó 2 veces
(Hilux y dólar) y falló más de 15, incluso con un archivo que ya había subido bien. No depende de `requests` o
curl ni de esperar tras crear el contenedor. Hipótesis sin confirmar: límite de Meta por intentos, o el proxy
de la nube. Si falla, no insistir en bucle: reintentar más tarde o subir a mano. Alternativa a probar: `video_url`
con el MP4 en una URL pública, que evita ese servidor.

