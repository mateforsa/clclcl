#!/bin/bash
# 1 still por beat + hojas de contacto. Uso: scripts/stills.sh <slug> [desde] [hasta] [fraccion]
cd "$(dirname "$0")/.."; S=$1; A=${2:-1}; B=${3:-99}; FR=${4:-0.85}; V=videos/$S; O=out/$S; mkdir -p $O/stills
[ -f $V/public/mix.wav ] || cp $V/public/voz.wav $V/public/mix.wav
FRAMES=$(node -e "const t=require('./$V/timing.json');const o=[];t.beats.forEach((b,i)=>{const n=i+1;if(n>=$A&&n<=$B){const e=t.beats[i+1]?t.beats[i+1].start:t.duration;o.push(b.id+':'+Math.round((b.start+(e-b.start)*$FR)*30))}});console.log(o.join(' '))")
npx remotion bundle $V/entry.ts --out-dir $O/bundle --public-dir $V/public > $O/bundle.log 2>&1 || { tail -20 $O/bundle.log; exit 1; }
for x in $FRAMES; do id=${x%%:*}; f=${x##*:}; rm -f $O/stills/$id.png
  npx remotion still $O/bundle Video $O/stills/$id.png --frame=$f --scale=0.5 --log=error 2>&1 | grep -v "^at \|Memory\|docker\|lower amount" | head -6 &
  while [ $(jobs -r | wc -l) -ge 2 ]; do sleep 0.3; done; done; wait
rm -f $O/sheet*.jpg; i=0; set -- $(ls $O/stills/*.png)
while [ $# -gt 0 ]; do n=$#; [ $n -gt 12 ] && n=12; COLS=6 scripts/sheet.sh $O/sheet$i.jpg "${@:1:$n}"; shift $n; i=$((i+1)); done
echo "stills: $(ls $O/stills | wc -l) -> $O/sheet*.jpg"
