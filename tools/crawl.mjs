import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';
const exePath = process.env.HOME+'/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const b = await chromium.launch({ executablePath: exePath });
const ctx = await b.newContext({ viewport:{width:1440,height:900}});
const base='https://www.roofingreformation.com';
const seen=new Set(), queue=['/'], out='../scrape/pages', imgs=new Map(), vids=new Set();
const norm=u=>{try{const x=new URL(u,base);if(!x.hostname.endsWith('roofingreformation.com'))return null;return x.pathname.replace(/(?<=.)\/+$/,'')}catch{return null}};
const seed=['/about-us','/contact','/privacy-policy','/accessibility-statement','/book-online','/service-page/roof-inspection'];
queue.push(...seed);
while(queue.length){
  const p=queue.shift(); if(seen.has(p))continue; seen.add(p);
  const page=await ctx.newPage();
  page.on('response',r=>{const u=r.url();if(/wixstatic\.com\/(media|ugd)|filesusr|video\.wixstatic/.test(u))imgs.set(u,p)});
  try{
    const r=await page.goto(base+p,{waitUntil:'domcontentloaded',timeout:45000});
    const st=r?.status();
    // scroll to trigger lazy
    for(let i=0;i<12;i++){await page.mouse.wheel(0,900);await page.waitForTimeout(350)}
    await page.waitForTimeout(1000);
    const data=await page.evaluate(()=>{
      const t=document.title, d=document.querySelector('meta[name=description]')?.content;
      const links=[...document.querySelectorAll('a[href]')].map(a=>a.href);
      const im=[...document.querySelectorAll('img')].map(i=>({src:i.currentSrc||i.src,alt:i.alt,w:i.naturalWidth,h:i.naturalHeight}));
      const bg=[...document.querySelectorAll('*')].map(e=>getComputedStyle(e).backgroundImage).filter(x=>x&&x.includes('url('));
      const vid=[...document.querySelectorAll('video,iframe,source')].map(e=>e.src||e.currentSrc||e.dataset.src||'');
      const walker=[...document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,a,button,span,div')].filter(e=>e.children.length===0&&e.innerText?.trim());
      return {t,d,links,im,bg,vid,text:document.body.innerText};
    });
    if(st>=400||data.text.length<80){console.log('BAD',p,st,data.text.length)}
    const slug=(p==='/'?'home':p.slice(1).replace(/\//g,'__'));
    fs.writeFileSync(`${out}/${slug}.md`,`# ${data.t}\n\nURL: ${base}${p}\nStatus: ${st}\nMeta description: ${data.d||''}\n\n## Full text\n\n${data.text}\n\n## Images\n\n${data.im.map(i=>`- ${i.src} | alt="${i.alt}" | ${i.w}x${i.h}`).join('\n')}\n\n## Background images\n\n${data.bg.join('\n')}\n\n## Media/iframes\n\n${data.vid.join('\n')}\n\n## Links\n\n${[...new Set(data.links)].join('\n')}\n`);
    for(const l of data.links){const n=norm(l);if(n&&!n.startsWith('/roofing-services')&&!n.startsWith('/our-team')&&!seen.has(n)&&!/\.(pdf|jpg|png)$/.test(n))queue.push(n)}
    console.log('OK',p,st,data.text.length);
  }catch(e){console.log('ERR',p,e.message.slice(0,80))}
  await page.close();
}
fs.writeFileSync('../scrape/network-media.txt',[...imgs].map(([u,p])=>`${p}\t${u}`).join('\n'));
await b.close();
