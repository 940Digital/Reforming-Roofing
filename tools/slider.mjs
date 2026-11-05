import { chromium } from 'playwright-core';
const S=process.argv[2];
const b = await chromium.launch({ executablePath: process.env.HOME+'/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' });
const errs=[];
for (const [name,vp] of [['desk',{width:1440,height:900}],['mob',{width:390,height:844}]]) {
  const page=await (await b.newContext({viewport:vp})).newPage();
  page.on('console',m=>{if(m.type()==='error')errs.push(name+': '+m.text())});
  await page.goto('http://localhost:3111/',{waitUntil:'load'}); await page.waitForTimeout(800);
  await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';const r=document.querySelector('[aria-roledescription=carousel]');scrollTo(0,r.getBoundingClientRect().top+scrollY-(innerWidth<600?90:200))});
  await page.mouse.move(5,5);
  const tx=()=>page.evaluate(()=>getComputedStyle(document.querySelector('[aria-roledescription=carousel] ul')).transform);
  const cur=()=>page.evaluate(()=>document.querySelector('[aria-live=polite]').innerText);
  const t0=await tx(); await page.screenshot({path:`${S}/slider-${name}-0.png`});
  await page.waitForTimeout(6800); const t1=await tx(); await page.screenshot({path:`${S}/slider-${name}-1.png`});
  console.log(name,'auto-advanced:',t0!==t1, await cur(), '');
  const box=await page.locator('[aria-roledescription=carousel] ul').boundingBox();
  await page.mouse.move(box.x+box.width/2, box.y+40); const h0=await cur(); await page.waitForTimeout(7000);
  console.log(name,'held on hover:',h0===await cur());
  await page.mouse.move(5,5); await page.locator('[aria-label="Next reviews"]').click(); await page.waitForTimeout(900);
  console.log(name,'next ->',await cur());
  console.log(name,'overflow',await page.evaluate(()=>document.documentElement.scrollWidth));
}
console.log('errors',errs); await b.close();
// touch swipe check on a touch-enabled phone context
{
  const b2 = await chromium.launch({ executablePath: process.env.HOME+'/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' });
  const page=await (await b2.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true})).newPage();
  await page.goto('http://localhost:3111/',{waitUntil:'load'}); await page.waitForTimeout(800);
  const res=await page.evaluate(async()=>{const el=document.querySelector('[aria-roledescription=carousel]');el.scrollIntoView();const cur=()=>document.querySelector('[aria-live=polite]').innerText;const a=cur();
    const t=(type,x)=>el.dispatchEvent(new TouchEvent(type,{bubbles:true,touches:type==='touchend'?[]:[new Touch({identifier:1,target:el,clientX:x,clientY:300})],changedTouches:[new Touch({identifier:1,target:el,clientX:x,clientY:300})]}));
    t('touchstart',300);t('touchend',150);await new Promise(r=>setTimeout(r,300));return [a,cur()];});
  console.log('swipe left:',res.join(' -> '));
  await b2.close();
}
