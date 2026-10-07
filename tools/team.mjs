import { chromium } from 'playwright-core';
import fs from 'fs';
const b = await chromium.launch({ executablePath: process.env.HOME+'/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' });
const page=await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await page.goto('https://www.roofingreformation.com/about-us',{waitUntil:'domcontentloaded',timeout:60000});
await page.waitForTimeout(4000);
for(const n of ['ROB VAUGHAN','JEREMY MORPHIS','ROBERT HINES']){
  try{
    await page.getByText(n,{exact:true}).first().scrollIntoViewIfNeeded();
    await page.getByText(n,{exact:true}).first().click({timeout:5000});
    await page.waitForTimeout(2500);
    console.log('URL',page.url());
    const t=await page.evaluate(()=>document.body.innerText);
    console.log('---',n,'\n',t.slice(0,1500));
    await page.screenshot({path:`../scrape/team-${n.split(' ')[0]}.png`});
    await page.goBack().catch(()=>{});
    await page.waitForTimeout(2500);
  }catch(e){console.log('ERR',n,e.message.slice(0,100))}
}
await b.close();
