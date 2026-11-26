// Captura una historia 1080x1920: node scripts/historia/shot.js <archivo.html> <salida.jpg>
const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(process.argv[2])); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.screenshot({ path: process.argv[3], type: 'jpeg', quality: 92 }); await b.close(); })();
