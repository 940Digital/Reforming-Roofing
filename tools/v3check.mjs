import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: process.env.HOME+'/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' });
// form + menu on mobile
let ctx=await b.newContext({viewport:{width:390,height:844}});
let page=await ctx.newPage();
await page.goto('http://localhost:3111/option-3',{waitUntil:'domcontentloaded'}); await page.waitForTimeout(3000);
await page.click('button[aria-controls="mobile-menu-v3"]'); await page.waitForTimeout(400);
console.log('menu visible:', await page.isVisible('#mobile-menu-v3'), 'links:', await page.$$eval('#mobile-menu-v3 a', a=>a.map(x=>x.textContent).join(' | ')));
await page.click('#mobile-menu-v3 a[href="#request"]'); await page.waitForTimeout(1200);
console.log('menu closed after tap:', !(await page.isVisible('#mobile-menu-v3')));
await page.fill('input[name=name]','Test Person'); await page.fill('input[name=phone]','5555550100');
await page.selectOption('select[name=city]','Denton'); await page.fill('textarea[name=message]','Hail test');
await page.click('form button[type=submit]'); await page.waitForTimeout(1500);
console.log('status:', await page.textContent('form [role=status]'));
// empty required check
await page.reload({waitUntil:'domcontentloaded'}); await page.waitForTimeout(2500);
await page.evaluate(()=>document.getElementById('request').scrollIntoView());
await page.click('form button[type=submit]'); await page.waitForTimeout(800);
console.log('blocked by required:', await page.$eval('input[name=name]', el=>!el.validity.valid), 'status empty:', JSON.stringify(await page.textContent('form [role=status]')));
await ctx.close();
// reduced motion
ctx=await b.newContext({viewport:{width:1440,height:900}, reducedMotion:'reduce'});
page=await ctx.newPage();
await page.goto('http://localhost:3111/option-3',{waitUntil:'domcontentloaded'}); await page.waitForTimeout(2500);
console.log('reduced: hero video?', await page.$('#top video')!==null, 'hero img?', await page.$('#top img[alt^="Finished home"]')!==null);
await b.close();
