// Solo para el control de calidad (nunca en el render): ?qc=1 pinta los objetos clave en magenta; ?qc=2 además oculta placas y
// subtítulos; ?qc=3 solo oculta placas y subtítulos (colores reales, para medir la franja de subtítulos).
if (typeof window !== 'undefined') {
  const m = (window as any).__QCMODE ?? 0;
  (window as any).__QCF = m === 1 || m === 2;
  if (m >= 2 && typeof document !== 'undefined') { const st = document.createElement('style'); st.textContent = 'div[style*="translate(-50%"], div[style*="top: 15.5%"]{visibility:hidden !important}'; document.head.appendChild(st); }
}
export {};
