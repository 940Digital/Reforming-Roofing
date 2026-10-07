import { chromium } from 'playwright-core';
import fs from 'fs';
const b = await chromium.launch({ executablePath: process.env.HOME+'/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' });
const ctx = await b.newContext({ viewport:{width:1440,height:900}});
for (const p of ['/','/about-us']) {
  const page=await ctx.newPage();
  await page.goto('https://www.roofingreformation.com'+p,{waitUntil:'domcontentloaded',timeout:60000});
  await page.waitForTimeout(4000);
  const t=await page.evaluate(()=>document.documentElement.textContent.replace(/\s+/g,' '));
  fs.writeFileSync('../scrape/textcontent'+(p==='/'?'-home':'-about')+'.txt',t);
  const css=await page.evaluate(()=>{
    const out={};
    const q=(s)=>[...document.querySelectorAll(s)].slice(0,6).map(e=>{const c=getComputedStyle(e);return {t:(e.innerText||'').slice(0,40),color:c.color,bg:c.backgroundColor,font:c.fontFamily,size:c.fontSize,weight:c.fontWeight,radius:c.borderRadius,tt:c.textTransform}});
    return {h:q('h1,h2,h3'),btn:q('a[data-testid=linkElement], button, [role=button]'),body:q('p'),nav:q('nav a')};
  });
  fs.writeFileSync('../scrape/css'+(p==='/'?'-home':'-about')+'.json',JSON.stringify(css,null,1));
  const html=await page.content();
  fs.writeFileSync('../scrape/rendered'+(p==='/'?'-home':'-about')+'.html',html);
  await page.close();
}
await b.close();
