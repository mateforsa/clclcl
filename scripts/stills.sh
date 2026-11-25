#!/bin/bash
# 1 still por beat (a ~70% del plano) + hoja de contacto. Uso: scripts/stills.sh [desde] [hasta] [fraccion]
cd "$(dirname "$0")/.."; A=${1:-1}; B=${2:-99}; FR=${3:-0.7}; mkdir -p out/stills
FRAMES=$(node -e "const t=require('./src/timing.json');const o=[];t.beats.forEach((b,i)=>{const n=i+1;if(n>=$A&&n<=$B){const e=t.beats[i+1]?t.beats[i+1].start:t.duration;o.push(b.id+':'+Math.round((b.start+(e-b.start)*$FR)*30))}});console.log(o.join(' '))")
npx remotion bundle src/index.ts --out-dir out/bundle >/dev/null 2>&1
for x in $FRAMES; do id=${x%%:*}; f=${x##*:}; npx remotion still out/bundle Video out/stills/$id.png --frame=$f --scale=0.5 --log=error 2>&1 | grep -v "^at \|Memory\|docker\|lower amount" | head -5 & 
  while [ $(jobs -r | wc -l) -ge 3 ]; do sleep 0.3; done; done; wait
ls out/stills | wc -l
