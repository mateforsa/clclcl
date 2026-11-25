import React from 'react';
import * as THREE from 'three';
import { C, rnd } from './math';
import { Building, useTex, M } from './Props';

const Sky: React.FC<{ top: string; mid: string; low: string }> = ({ top, mid, low }) => {
  const tx = useTex((g, W, H) => { const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, top); gr.addColorStop(0.62, mid); gr.addColorStop(0.8, low); gr.addColorStop(1, low); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    const r = rnd(11); g.fillStyle = '#fff'; for (let i = 0; i < 70; i++) { g.globalAlpha = 0.3 + r() * 0.6; g.fillRect(r() * W, r() * H * 0.55, 2, 2); } }, 256, 512, 'sky' + top + mid + low);
  return <mesh position={[0, 16, -42]}><planeGeometry args={[130, 70]} /><meshBasicMaterial map={tx} toneMapped={false} fog={false} /></mesh>;
};
export const NeonSet: React.FC<{ city?: boolean }> = ({ city = true }) => {
  const b = React.useMemo(() => { const r = rnd(21); return Array.from({ length: 22 }, (_, i) => ({ x: -22 + i * 2.1 + (r() - 0.5), z: -15 - r() * 9, w: 1.3 + r() * 1.1, h: 2.5 + r() * 7, seed: i + 2, c: ['#241659', '#2d1a6e', '#1d1150'][i % 3] })); }, []);
  return (
    <group>
      <color attach="background" args={[C.bg]} />
      <fog attach="fog" args={[C.bg, 14, 46]} />
      <Sky top="#0b0520" mid="#2a1066" low="#a02a8c" />
      <ambientLight intensity={1.0} color="#bfb0ff" />
      <directionalLight position={[4, 9, 7]} intensity={1.7} color="#ffffff" />
      <pointLight position={[-5, 3, 3]} intensity={40} color={C.magenta} distance={18} />
      <pointLight position={[5, 3, 2]} intensity={40} color={C.cyan} distance={18} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[140, 140]} /><M c="#1a0d42" /></mesh>
      <gridHelper args={[140, 100, C.grid, C.grid]} position={[0, 0.012, 0]} />
      {city && b.map((q, i) => <group key={i} position={[q.x, 0, q.z]}><Building t={0} tt={0} p={{ w: q.w, h: q.h, d: q.w, seed: q.seed, color: q.c }} /></group>)}
    </group>
  );
};
export const RoomSet: React.FC<{ night?: boolean }> = () => (
  <group>
    <color attach="background" args={[C.bg]} />
    <ambientLight intensity={1.35} color="#fff1e0" />
    <directionalLight position={[3, 7, 6]} intensity={1.5} color="#fff" />
    <pointLight position={[0, 3.2, 1]} intensity={22} color="#ffd9a0" distance={12} />
    <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[9, 8]} /><M c={C.floorWarm} /></mesh>
    <mesh position={[0, 4, -4]}><boxGeometry args={[9, 8, 0.2]} /><M c={C.wall} /></mesh>
    <mesh position={[-4.5, 4, 0]}><boxGeometry args={[0.2, 8, 8]} /><M c="#a48ddb" /></mesh>
    <mesh position={[4.5, 4, 0]}><boxGeometry args={[0.2, 8, 8]} /><M c="#a48ddb" /></mesh>
    <mesh position={[0, 0.12, -3.88]}><boxGeometry args={[9, 0.24, 0.06]} /><M c="#f4f1ff" /></mesh>
    <group position={[2.9, 2.9, -3.86]}>
      <mesh><boxGeometry args={[1.5, 1.5, 0.08]} /><M c="#f4f1ff" /></mesh>
      <mesh position={[0, 0, 0.045]}><planeGeometry args={[1.3, 1.3]} /><meshBasicMaterial color="#1d1150" toneMapped={false} /></mesh>
      <mesh position={[0.3, 0.3, 0.05]}><circleGeometry args={[0.16, 12]} /><meshBasicMaterial color="#fff3c4" toneMapped={false} /></mesh>
    </group>
  </group>
);
export const SETS: Record<string, React.FC<any>> = { neon: NeonSet, room: RoomSet, void: () => <NeonSet city={false} /> };
