import { chromium } from 'playwright-core';
const S=process.argv[2];
const b = await chromium.launch({ executablePath: process.env.HOME+'/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' });
const ids=['top','about','services','after-a-storm','how-it-works','why-us','proof','service-area','team','request'];
for (const [name,vp] of [['desk',{width:1440,height:900}],['mob',{width:390,height:844}]]) {
  const ctx=await b.newContext({viewport:vp});
  const page=await ctx.newPage();
  const errs=[]; page.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); page.on('pageerror',e=>errs.push(e.message));
  await page.goto('http://localhost:3111/option-3',{waitUntil:'domcontentloaded'}); await page.waitForTimeout(3500);
  const info=await page.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,h1:[...document.querySelectorAll('h1')].map(h=>h.textContent),heads:[...document.querySelectorAll('h1,h2,h3')].map(h=>h.tagName).join(''),video:!document.querySelector('#top video').paused}));
  console.log(name,JSON.stringify(info));
  for(const id of ids){
    await page.evaluate(id=>{document.documentElement.style.scrollBehavior='auto';const el=document.getElementById(id);scrollTo(0,el.getBoundingClientRect().top+scrollY-108)},id);
    await page.waitForTimeout(2200);
    await page.screenshot({path:`${S}/v3-${name}-${id}.png`});
  }
  console.log('errors',errs.slice(0,5));
  await ctx.close();
}
await b.close();
