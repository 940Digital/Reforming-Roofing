import { chromium } from 'playwright-core';
import fs from 'fs';
const S=process.argv[2];
const b = await chromium.launch({ executablePath: process.env.HOME+'/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', args:['--allow-file-access-from-files','--autoplay-policy=no-user-gesture-required'] });
const page=await (await b.newContext({viewport:{width:960,height:540}})).newPage();
const dir=process.cwd()+'/../public/assets/original/';
for(const v of ['video_c72b01_3c833bae0ed84cc6a4d598a1dcb31257','video_9a58ba_99ef674890824d5fa106c485433f9406']){
  await page.goto('file://'+dir+v+'.mp4');
  await page.waitForTimeout(1500);
  const info=await page.evaluate(()=>{const e=document.querySelector('video');return {d:e.duration,w:e.videoWidth,h:e.videoHeight}});
  console.log(v,info);
  const n=10;
  for(let i=0;i<n;i++){
    await page.evaluate(t=>new Promise(r=>{const e=document.querySelector('video');e.pause();e.onseeked=r;e.currentTime=t}),info.d*(i+0.5)/n);
    await page.waitForTimeout(300);
    await page.screenshot({path:`${S}/${v.slice(6,12)}_${i}.png`});
  }
}
await b.close();
