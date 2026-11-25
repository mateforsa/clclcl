#!/bin/bash
# Render completo: scripts/render.sh <slug>  -> out/<slug>/<slug>.mp4
# Con GL por software, varias pestañas en un mismo navegador corrompen frames: se usan N procesos
# independientes con --concurrency=1 y después se unen los tramos. Un lock evita dos renders a la vez.
cd "$(dirname "$0")/.."; S=$1; N=${N:-3}; V=videos/$S; O=out/$S; mkdir -p $O/parts out
exec 9>out/render.lock; flock 9
rm -f $O/parts/*
npx remotion bundle $V/entry.ts --out-dir $O/bundle --public-dir $V/public > $O/bundle.log 2>&1 || { tail -20 $O/bundle.log; exit 1; }
TOTAL=$(node -e "console.log(Math.round(require('./$V/timing.json').duration*30))"); STEP=$(( (TOTAL+N-1)/N ))
for i in $(seq 0 $((N-1))); do a=$((i*STEP)); b=$(( a+STEP-1 )); [ $b -ge $TOTAL ] && b=$((TOTAL-1))
  npx remotion render $O/bundle Video $O/parts/p$i.mp4 --frames=$a-$b --concurrency=1 --muted --crf=18 --log=error > $O/parts/p$i.log 2>&1 &
done; wait
for i in $(seq 0 $((N-1))); do echo "file 'p$i.mp4'"; done > $O/parts/list.txt
ffmpeg -v error -y -f concat -safe 0 -i $O/parts/list.txt -i $V/public/mix.wav -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart $O/$S.mp4 || exit 1
rm -f $O/qc*.jpg; D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $O/$S.mp4); K=$(node -e "console.log(Math.ceil($D/41))")
for i in $(seq 0 $((K-1))); do ffmpeg -v error -y -ss $((i*41)) -t 41 -i $O/$S.mp4 -vf "fps=1,scale=180:-1,tile=14x3" -q:v 5 $O/qc$i.jpg; done
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,duration -of csv=p=0 $O/$S.mp4; cat $O/parts/*.log | grep -v "^at " | head -5
