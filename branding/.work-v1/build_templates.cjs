const fs=require('fs');
const path=require('path');
const PptxGenJS=require('pptxgenjs');
const html2pptx=require('/Users/zakwinnick/.agents/skills/Utilities/Documents/Pptx/scripts/html2pptx.js');
const here=__dirname,root=path.resolve(here,'../wyld-wandering-brand-kit-v1');
const {sets}=JSON.parse(fs.readFileSync(path.join(here,'scene-data.json')));
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
fs.mkdirSync(path.join(here,'template-html'),{recursive:true});
async function main(){
 for(const [name,scenes] of Object.entries(sets)){
  const pptx=new PptxGenJS(),s0=scenes[0];
  const wi=s0.physical?s0.physical[0]:10, hi=s0.physical?s0.physical[1]:10*s0.h/s0.w;
  pptx.defineLayout({name:'WYLD',width:wi,height:hi});pptx.layout='WYLD';
  pptx.author='Wyld Wandering';pptx.subject='Editable brand template';pptx.title=`Wyld Wandering — ${name}`;
  pptx.company='Wyld Wandering';pptx.lang='en-US';
  pptx.theme={headFontFace:'Georgia',bodyFontFace:'Arial',lang:'en-US'};
  for(const s of scenes){
   const k=wi*72/s.w;
   let body='';
   for(const n of s.nodes){
    const pos=`position:absolute;left:${n.x*k}pt;top:${n.y*k}pt;`;
    if(n.type==='rect')body+=`<div style="${pos}width:${n.w*k}pt;height:${n.h*k}pt;background:${n.fill};"></div>`;
    if(n.type==='logo')body+=`<img src="${path.join(root,'01-logos/png',n.name+'.png')}" style="${pos}width:${n.w*k}pt;height:${n.h*k}pt;"/>`;
    if(n.type==='text'){
      const size=n.size*k;
      const width=(n.anchor==='middle'?Math.min(n.x,s.w-n.x)*2:n.anchor==='end'?n.x:s.w-n.x-35)*k;
      const left=(n.anchor==='middle'?n.x*k-width/2:n.anchor==='end'?n.x*k-width:n.x*k);
      const align=n.anchor==='middle'?'center':n.anchor==='end'?'right':'left';
      body+=`<p style="position:absolute;left:${left}pt;top:${n.y*k}pt;width:${width}pt;height:${size*1.25}pt;font-size:${size}pt;font-family:${n.font};font-weight:${n.weight};color:${n.color};letter-spacing:${n.spacing*k}pt;text-align:${align};">${esc(n.text)}</p>`;
    }
   }
   const h=`<!doctype html><html><head><meta charset="utf-8"><style>html{background:${s.bg}}body{position:relative;display:flex;width:${wi*72}pt;height:${hi*72}pt;margin:0;padding:0;background:${s.bg};}p{margin:0;padding:0;line-height:1.1;white-space:pre;}</style></head><body>${body}</body></html>`;
   const file=path.join(here,'template-html',s.name+'.html');fs.writeFileSync(file,h);
   const {slide}=await html2pptx(file,pptx,{tmpDir:here});
   slide.addNotes('Editable Wyld Wandering template. Replace all bracketed text before use. To add a photo, remove the photo placeholder rectangle and its label, insert your licensed image and crop it to the same bounds. Use the supplied vector logo masters when replacing brand artwork. Text and layout shapes are editable; the logo is an image. Georgia and Arial are the Office fallback fonts.');
  }
  await pptx.writeFile({fileName:path.join(root,'03-templates',name+'.pptx')});
  console.log(name,scenes.length,'editable pages');
 }
}
main().catch(e=>{console.error(e);process.exit(1)});
