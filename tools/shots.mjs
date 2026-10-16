import { chromium } from 'playwright-core';
const S=process.argv[2];
const b = await chromium.launch({ executablePath: process.env.HOME+'/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' });
for (const [name,vp] of [['desk',{width:1440,height:900}],['mob',{width:390,height:844}]]) {
  const ctx=await b.newContext({viewport:vp, deviceScaleFactor:1});
  for (const [route,tag] of [['/','o1'],['/option-2','o2']]) {
    const page=await ctx.newPage();
    await page.goto('http://localhost:3111'+route,{waitUntil:'domcontentloaded'}); await page.waitForTimeout(3500);
    await page.screenshot({path:`${S}/${tag}-${name}-hero.png`});
    const info=await page.evaluate(()=>{const h=document.querySelector('header');const bar=document.querySelector('[class*="z-[70]"]');return {sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,barBottom:bar.getBoundingClientRect().bottom,headerTop:h.getBoundingClientRect().top,eyebrows:document.querySelectorAll('.eyebrow').length,pegs:document.querySelectorAll('.peg-label').length,h1:document.querySelectorAll('h1').length}});
    console.log(tag,name,JSON.stringify(info));
    if(name==='desk'){await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';scrollTo(0,document.querySelector('#services').offsetTop-20)});await page.waitForTimeout(2000);await page.screenshot({path:`${S}/${tag}-${name}-services.png`});}
    await page.close();
  }
  await ctx.close();
}
await b.close();
