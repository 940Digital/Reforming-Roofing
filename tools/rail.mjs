import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: process.env.HOME+'/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' });
const page=await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await page.goto('http://localhost:3112',{waitUntil:'domcontentloaded'}); await page.waitForTimeout(3000);
const r=await page.evaluate(async()=>{
  document.documentElement.style.scrollBehavior='auto';
  const rail=document.querySelector('#why-us .h-6');
  scrollTo(0, rail.getBoundingClientRect().top+scrollY-innerHeight/2);
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  const s=()=>{const l=rail.firstElementChild;const d=[...rail.querySelectorAll('span')];return getComputedStyle(l).transform.split(',')[0].replace('matrix(','')+' | '+d.map(x=>(+getComputedStyle(x).opacity).toFixed(2)).join(',')+' | w='+d[0].getBoundingClientRect().width.toFixed(1)+' x0='+d[0].getBoundingClientRect().left.toFixed(0)};
  const out=[];
  for(let t=0;t<12;t++){await wait(200); out.push('t'+t*200+': '+s());}
  for(let i=0;i<8;i++){scrollBy(0,i%2?15:-15); await wait(150); out.push('jiggle'+i+': '+s());}
  scrollTo(0,0); await wait(1500); out.push('away: '+s());
  return out.join('\n');
});
console.log(r); await b.close();
