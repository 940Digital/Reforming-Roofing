import { chromium } from 'playwright-core';
const S=process.argv[2];
const b = await chromium.launch({ executablePath: process.env.HOME+'/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' });
const page=await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await page.goto('http://localhost:3111/',{waitUntil:'load'}); await page.waitForTimeout(1000);
// preload images so the shot shows the wipe, not loading
await page.evaluate(async()=>{for(const i of document.images){i.loading='eager'} await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))});
for (const [sel,tag] of [['#about','about'],['#process, #how-it-works','process']]) {
  const ok=await page.evaluate((sel)=>{const el=document.querySelector(sel);if(!el)return false;document.documentElement.style.scrollBehavior='auto';scrollTo(0,el.getBoundingClientRect().top+scrollY);return true},sel);
  if(!ok){console.log('missing',sel);continue}
  await page.waitForTimeout(720); await page.screenshot({path:`${S}/wipe-${tag}-mid.png`});
  console.log(tag,'wrapper bg:',await page.evaluate((sel)=>[...document.querySelector(sel).querySelectorAll('div')].filter(d=>d.firstElementChild&&d.firstElementChild.style.clipPath!==undefined&&d.querySelector('img')&&getComputedStyle(d.firstElementChild).clipPath!=='none').map(d=>getComputedStyle(d).backgroundColor).slice(0,2).join(' '),sel));
}
await b.close();
