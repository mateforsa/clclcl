export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const eio = (t: number) => { t = clamp(t); return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
export const eo = (t: number) => 1 - Math.pow(1 - clamp(t), 3);
/** escala 0 -> 1.15 -> 1 en ~0.32 s */
export const pop = (tt: number) => {
  if (tt <= 0) return 0;
  const x = clamp(tt / 0.32);
  return x < 0.6 ? lerp(0, 1.15, eo(x / 0.6)) : lerp(1.15, 1, eio((x - 0.6) / 0.4));
};
/** generador pseudoaleatorio con semilla (determinista) */
export const rnd = (seed: number) => { let s = (seed * 9301 + 49297) % 233280; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; };
export const C = {
  bg: '#140a2e', grid: '#6b3cff', cyan: '#27e0d8', magenta: '#ff3ea5', gold: '#ffb52e', gold2: '#e08a12',
  white: '#f4f1ff', red: '#ff3b4e', green: '#3ee07a', blue: '#2f6bff', floorWarm: '#f29a4b', wall: '#b9a3e8', dark: '#1b1340',
};
export type V3 = [number, number, number];
