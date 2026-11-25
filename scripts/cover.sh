#!/bin/bash
# Portada de un video: scripts/cover.sh <slug>  -> out/<slug>/portada.png (1080x1920) a partir de videos/<slug>/cover.json
cd "$(dirname "$0")/.."; S=$1; V=videos/$S; O=out/$S; mkdir -p $O
sed -e "s#makeRoot(timing, BEATS, EXTRA)#makeRoot(timing, BEATS, EXTRA, COVER)#; s#makeRoot(timing, BEATS)#makeRoot(timing, BEATS, {}, COVER)#" -e "1i import COVER from './cover.json';" $V/entry.ts > $V/cover.entry.ts
F=$(node -e "const t=require('./$V/timing.json'),c=require('./$V/cover.json');const i=t.beats.findIndex(b=>b.id===c.beat);const b=t.beats[i];const e=t.beats[i+1]?t.beats[i+1].start:t.duration;console.log(Math.round((b.start+(e-b.start)*c.frac)*30))")
npx remotion bundle $V/cover.entry.ts --out-dir $O/cover-bundle --public-dir $V/public > $O/cover.log 2>&1 || { tail -20 $O/cover.log; exit 1; }
npx remotion still $O/cover-bundle Video $O/portada.png --frame=$F --log=error 2>&1 | grep -v "^at \|Memory\|docker\|lower amount" | head -6
rm -rf $O/cover-bundle $V/cover.entry.ts; ls -la $O/portada.png
