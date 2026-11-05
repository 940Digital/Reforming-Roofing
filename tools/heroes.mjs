import { chromium } from 'playwright-core';
const S=process.argv[2]; const shots=process.argv[3].split(',');
const all=['/services','/services/roofing','/services/gutters','/services/skylights','/services/general-contracting','/services/roof-inspection','/services/roof-damage-repair','/services/storm-damage-roof-repair','/services/roof-replacement','/services/shingle-roofing','/services/tile-roofing','/services/siding','/services/gutter-installation','/services/gutter-replacement','/services/gutter-cleaning','/services/skylight-replacement','/services/skylight-repair','/services/remodeling','/services/kitchen-remodeling','/services/bathroom-remodeling','/services/home-repairs','/services/interior-painting','/services/exterior-painting'];
const b = await chromium.launch({ executablePath: process.env.HOME+'/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' });
const errs=[]; const missing=[];
for (const [name,vp] of [['desk',{width:1440,height:900}],['mob',{width:390,height:844}]]) {
  const page=await (await b.newContext({viewport:vp})).newPage();
  page.on('console',m=>{if(m.type()==='error')errs.push(name+' '+page.url()+': '+m.text())});
  for (const r of all) {
    await page.goto('http://localhost:3111'+r,{waitUntil:'load'});
    const ok=await page.evaluate(()=>{const i=document.querySelector('main section img');return !!(i&&(i.src.includes('work')||i.src.includes('stock'))&&i.complete&&i.naturalWidth)});
    if(!ok) missing.push(name+' '+r);
    if(shots.includes(r)){await page.waitForTimeout(800);await page.screenshot({path:`${S}/hero-${name}-${r.split('/').pop()}.png`});}
  }
}
console.log('missing',missing,'errors',errs); await b.close();
