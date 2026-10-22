const fs=require('fs');
const path=require('path');
const sharp=require('sharp');
const {chromium}=require('playwright');
const here=__dirname, root=path.resolve(here,'../wyld-wandering-brand-kit-v1');
const data=JSON.parse(fs.readFileSync(path.join(here,'scene-data.json')));

async function main(){
  for(const f of fs.readdirSync(path.join(root,'01-logos/svg'))){
    const input=path.join(root,'01-logos/svg',f), name=f.replace('.svg','');
    await sharp(input).resize({width:name.includes('symbol')?2000:3000}).png().toFile(path.join(root,'01-logos/png',name+'.png'));
  }
  for(const s of data.scenes){
    await sharp(path.join(root,s.folder,s.name+'.svg'),{density:96}).resize(s.w,s.h).png().toFile(path.join(root,s.folder,s.name+'.png'));
  }
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const page=await browser.newPage();
  async function pdf(svgPath,out,wi,hi){
    const art=fs.readFileSync(svgPath,'utf8');
    await page.setContent(`<html><head><style>@page{size:${wi}in ${hi}in;margin:0}*{box-sizing:border-box}html,body{margin:0;padding:0;width:${wi}in;height:${hi}in}svg{display:block;width:100%;height:100%}</style></head><body>${art}</body></html>`);
    await page.pdf({path:out,width:`${wi}in`,height:`${hi}in`,printBackground:true,margin:{top:0,bottom:0,left:0,right:0}});
  }
  for(const f of fs.readdirSync(path.join(root,'01-logos/svg'))){
    const input=path.join(root,'01-logos/svg',f), art=fs.readFileSync(input,'utf8');
    const [,w,h]=art.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/).map(Number);
    await pdf(input,path.join(root,'01-logos/pdf',f.replace('.svg','.pdf')),w/100,h/100);
  }
  for(const s of data.scenes.filter(s=>s.physical))await pdf(path.join(root,s.folder,s.name+'.svg'),path.join(root,s.folder,s.name+'.pdf'),...s.physical);
  await browser.close();
  // Favicons and web app icons use the optically heavier symbol.
  fs.mkdirSync(path.join(root,'02-social/web-icons'),{recursive:true});
  const mark=fs.readFileSync(path.join(root,'01-logos/svg/ww-small-symbol-dark.svg'),'utf8').replace('</desc>','</desc><rect width="1000" height="1000" fill="#0F1A14"/>');
  fs.writeFileSync(path.join(root,'02-social/web-icons/favicon.svg'),mark);
  for(const n of [16,32,48,180,192,512])await sharp(Buffer.from(mark)).resize(n,n).png().toFile(path.join(root,'02-social/web-icons',`icon-${n}.png`));
  console.log('PNG assets, vector PDFs, and web icons rendered.');
}
main().catch(e=>{console.error(e);process.exit(1)});
