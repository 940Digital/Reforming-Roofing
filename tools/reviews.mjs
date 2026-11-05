import { chromium } from 'playwright-core';
const S=process.argv[2];
const b = await chromium.launch({ executablePath: process.env.HOME+'/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' });
const errs=[];
for (const [name,vp] of [['desk',{width:1440,height:900}],['mob',{width:390,height:844}]]) {
  const page=await (await b.newContext({viewport:vp})).newPage();
  page.on('console',m=>{if(m.type()==='error')errs.push(name+': '+m.text())});
  for (const [route,tag] of [['/','home'],['/reviews','page']]) {
    await page.goto('http://localhost:3111'+route,{waitUntil:'load'}); await page.waitForTimeout(800);
    await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';const r=document.getElementById('reviews');scrollTo(0,r.offsetTop+(innerWidth<600?120:160))});
    await page.waitForTimeout(1800);
    if(tag==='page'){ const btn=page.locator('#reviews article button:has-text("More")').first(); await btn.click(); await page.waitForTimeout(300); }
    await page.screenshot({path:`${S}/rev-${name}-${tag}.png`});
    console.log(name,tag,await page.evaluate(()=>({cards:document.querySelectorAll('#reviews article').length,font:getComputedStyle(document.querySelector('#reviews article')).fontFamily.slice(0,40),sw:document.documentElement.scrollWidth,link:document.querySelector('#reviews a[href*="cid="]')?.href})));
  }
}
console.log('errors',errs); await b.close();
