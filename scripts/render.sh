#!/bin/bash
# Render completo. Con GL por software, varias pestañas en un mismo navegador corrompen frames:
# se usan N procesos independientes con --concurrency=1 y después se unen los tramos.
cd "$(dirname "$0")/.."; N=${N:-3}; OUT=${1:-out/gta-vi.mp4}; mkdir -p out/parts; rm -f out/parts/*
npx remotion bundle src/index.ts --out-dir out/bundle >/dev/null 2>&1
TOTAL=$(node -e "console.log(Math.round(require('./src/timing.json').duration*30))"); STEP=$(( (TOTAL+N-1)/N ))
for i in $(seq 0 $((N-1))); do a=$((i*STEP)); b=$(( a+STEP-1 )); [ $b -ge $TOTAL ] && b=$((TOTAL-1))
  npx remotion render out/bundle Video out/parts/p$i.mp4 --frames=$a-$b --concurrency=1 --muted --crf=18 --log=error > out/parts/p$i.log 2>&1 &
done; wait
for i in $(seq 0 $((N-1))); do echo "file 'p$i.mp4'"; done > out/parts/list.txt
ffmpeg -v error -y -f concat -safe 0 -i out/parts/list.txt -i public/mix.wav -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "$OUT"
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,nb_frames,duration -of csv=p=0 "$OUT"
