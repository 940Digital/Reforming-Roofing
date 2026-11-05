import { chromium } from 'playwright-core';
const S=process.argv[2];
const b = await chromium.launch({ executablePath: process.env.HOME+'/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' });
const page=await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await page.goto('http://localhost:3111/',{waitUntil:'load'}); await page.waitForTimeout(800);
const card=page.locator('a[href="/services/roofing"].group').first();
// scroll it in and hover straight away, mid-slide
await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';const a=document.querySelector('a[href="/services/roofing"].group');scrollTo(0,a.getBoundingClientRect().top+scrollY-150)});
const box=await card.boundingBox(); await page.mouse.move(box.x+box.width*0.3, box.y+box.height/2);
await page.waitForTimeout(350); await page.screenshot({path:`${S}/roof-mid.png`});
const bg=await page.evaluate(()=>getComputedStyle(document.querySelector('.slide-panel')).backgroundColor);
await page.waitForTimeout(1500); await page.screenshot({path:`${S}/roof-end.png`});
console.log('panel bg while hovered:',bg); await b.close();
