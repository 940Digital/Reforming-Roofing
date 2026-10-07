import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: process.env.HOME+'/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' });
const page=await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
page.on('request',r=>{if(/video|\.mp4|\.m3u8|youtube|vimeo/i.test(r.url())&&!/parastorage/.test(r.url()))console.log('REQ',r.url().slice(0,200))});
await page.goto('https://www.roofingreformation.com/about-us',{waitUntil:'domcontentloaded',timeout:60000});
await page.waitForTimeout(4000);
try{await page.getByText('PLAY VIDEO',{exact:false}).first().click({timeout:8000});}catch(e){console.log('noclick',e.message.slice(0,80))}
await page.waitForTimeout(6000);
console.log(await page.evaluate(()=>[...document.querySelectorAll('video,iframe,source')].map(e=>e.tagName+' '+(e.src||e.currentSrc||'')+' poster='+(e.poster||''))));
await b.close();
