import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: process.env.HOME+'/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' });
const page=await (await b.newContext({viewport:{width:1920,height:1080}})).newPage();
await page.goto('file://'+process.cwd()+'/../public/assets/original/video_9a58ba_99ef674890824d5fa106c485433f9406.mp4');
await page.waitForTimeout(1500);
for(const t of [7,22,52,66,81,96,126,141]){
  await page.evaluate(t=>new Promise(r=>{const e=document.querySelector('video');e.pause();e.onseeked=r;e.currentTime=t}),t);
  await page.waitForTimeout(500);
  await page.screenshot({path:`../public/assets/original/still_neighborhood-video_${String(t).padStart(3,'0')}s.jpg`,type:'jpeg',quality:90,clip:{x:0,y:0,width:1920,height:1000}});
}
await b.close();
