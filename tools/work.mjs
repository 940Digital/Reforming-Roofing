import { chromium } from 'playwright-core';
const S=process.argv[2];
const b = await chromium.launch({ executablePath: process.env.HOME+'/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' });
const errs=[];
for (const [name,vp] of [['desk',{width:1440,height:900}],['mob',{width:390,height:844}]]) {
  const ctx=await b.newContext({viewport:vp, deviceScaleFactor:1});
  const page=await ctx.newPage();
  page.on('console',m=>{if(m.type()==='error')errs.push(name+': '+m.text())});
  await page.goto('http://localhost:3111/our-work',{waitUntil:'load'}); await page.waitForTimeout(1500);
  // scroll through so every reveal plays and every image loads
  const H=await page.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<H;y+=400){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(120);}
  await page.evaluate(()=>scrollTo(0,0)); await page.waitForTimeout(300);
  for (const id of ['acreage','woods-edge','open-land','cul-de-sac']) {
    await page.evaluate(id=>{document.documentElement.style.scrollBehavior='auto';document.getElementById(id).scrollIntoView()},id);
    await page.waitForTimeout(1600);
    await page.screenshot({path:`${S}/work-${name}-${id}.png`});
  }
  const info=await page.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,imgs:[...document.images].filter(i=>i.src.includes('work')).map(i=>i.complete&&i.naturalWidth>0).filter(x=>!x).length}));
  console.log(name,JSON.stringify(info));
  // lightbox
  await page.click('#cul-de-sac ul li:nth-child(2) button'); await page.waitForTimeout(1200);
  await page.keyboard.press('ArrowRight'); await page.waitForTimeout(1200);
  await page.screenshot({path:`${S}/work-${name}-lightbox.png`});
  console.log(name,'counter',await page.locator('dialog figcaption').innerText());
  await page.keyboard.press('Escape'); await page.waitForTimeout(300);
  console.log(name,'dialog open after Esc:',await page.evaluate(()=>document.querySelector('dialog').open));
  if(name==='desk'){
    await page.goto('http://localhost:3111/',{waitUntil:'load'}); await page.waitForTimeout(1000);
    await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';const n=document.getElementById('neighborhood');scrollTo(0,n.offsetTop+500)}); await page.waitForTimeout(2000);
    await page.screenshot({path:`${S}/home-neighborhood.png`});
  }
  await ctx.close();
}
console.log('errors',errs);
await b.close();
