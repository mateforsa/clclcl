#!/bin/bash
# hoja de contacto: scripts/sheet.sh salida.jpg archivos...
out=$1; shift; n=$#; cols=${COLS:-4}; rows=$(( (n+cols-1)/cols ))
args=(); for f in "$@"; do args+=(-i "$f"); done
ffmpeg -v error -y "${args[@]}" -filter_complex "concat=n=$n:v=1:a=0,scale=405:-1,tile=${cols}x${rows}" -frames:v 1 -q:v 3 "$out"
