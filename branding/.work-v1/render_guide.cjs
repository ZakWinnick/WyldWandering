const fs=require('fs'),path=require('path');
const {chromium}=require('playwright');
const here=__dirname,root=path.resolve(here,'../wyld-wandering-brand-kit-v1');
async function main(){
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const page=await browser.newPage({viewport:{width:1120,height:800},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>errors.push(r.url()));
 await page.goto('file://'+path.join(root,'04-guidelines/Brand-guide.html'));
 await page.evaluate(()=>document.fonts.ready);
 const layout=await page.evaluate(()=>Array.from(document.querySelectorAll('.page')).map((s,i)=>{
   const f=s.querySelector('footer').getBoundingClientRect();
   const hits=Array.from(s.querySelectorAll('p,table,.preview-row,.cover-bottom,.logo-grid,.colors')).filter(el=>el.getBoundingClientRect().bottom>f.top-6).map(el=>el.textContent.slice(0,70));
   return {page:i+1,footerOverlaps:hits};
 }));
 fs.writeFileSync(path.join(here,'guide-layout-check.json'),JSON.stringify({errors,layout},null,2));
 await page.pdf({path:path.join(root,'04-guidelines/Brand-guide.pdf'),preferCSSPageSize:true,printBackground:true});
 const sections=await page.locator('.page').all();
 for(let i=0;i<sections.length;i++)await sections[i].screenshot({path:path.join(here,'rendered',`guide-${i+1}.png`)});
 const img=(src,css='')=>`<img src="${src}" style="${css}"/>`;
 const overview=`<!doctype html><html><head><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;width:1600px;height:1160px;background:#FFFBF5;color:#0F1A14;font-family:Arial,sans-serif}.top{height:70px;padding:25px 45px;font-size:14px;letter-spacing:3px;border-bottom:1px solid #D8D8CC;display:flex;justify-content:space-between}.hero{height:480px;display:grid;grid-template-columns:1000px 600px}.main{display:flex;align-items:center;justify-content:center}.reverse{background:#0F1A14;display:flex;align-items:center;justify-content:center}.bottom{display:grid;grid-template-columns:420px 460px 720px;height:540px}.panel{padding:40px;border-top:1px solid #D8D8CC;border-right:1px solid #D8D8CC}.label{font-size:12px;letter-spacing:2.5px;margin:0 0 25px}.swatch{display:flex;align-items:center;margin:20px 0;font-size:17px}.swatch i{width:55px;height:55px;margin-right:20px;display:block;border:1px solid #D8D8CC}.swatch small{font-size:12px;display:block;margin-top:6px}h1{font:56px/1.1 Georgia,serif;margin:55px 0 35px}.apps{display:flex;align-items:center;gap:22px;height:395px;justify-content:center}.apps img{box-shadow:0 8px 22px #0F1A1420}.foot{padding:25px 45px;display:flex;justify-content:space-between;font-size:13px;border-top:1px solid #D8D8CC}</style></head><body><div class="top"><span>WYLD WANDERING</span><span>BRAND SYSTEM / 1.0</span></div><div class="hero"><div class="main">${img('01-logos/svg/ww-stacked-light.svg','width:800px')}</div><div class="reverse">${img('01-logos/svg/ww-symbol-dark.svg','width:440px')}</div></div><div class="bottom"><div class="panel"><p class="label">THE PALETTE</p>${[['Forest','#0F1A14'],['Ivory','#FFFBF5'],['Terracotta','#C45D3A'],['Amber','#D4A857']].map(([n,c])=>`<div class="swatch"><i style="background:${c}"></i><span>${n}<small>${c}</small></span></div>`).join('')}</div><div class="panel"><p class="label">THE EXPRESSION</p><h1>Places worth<br/>finding.</h1><p style="font-size:24px;line-height:1.5">Personal travel planning.</p><p style="font-size:17px;margin-top:65px">Your trip, handled.</p></div><div class="panel"><p class="label">IN USE</p><div class="apps">${img('03-templates/itinerary-01-cover.png','width:244px')}${img('02-social/brand-story-1080x1920.png','width:187px')}${img('02-social/avatar-terracotta-1080.png','width:128px')}</div></div></div><div class="foot"><span>Vector logos · Social assets · Editable templates</span><span>wyldwandering.com</span></div></body></html>`;
 fs.writeFileSync(path.join(root,'Brand-overview.html'),overview);
 await page.setViewportSize({width:1600,height:1160});await page.goto('file://'+path.join(root,'Brand-overview.html'));
 await page.screenshot({path:path.join(root,'Brand-overview.png'),fullPage:true});
 await browser.close();console.log(JSON.stringify({errors,layout}));
}
main().catch(e=>{console.error(e);process.exit(1)});
