from pathlib import Path
import html, json
R=Path(__file__).resolve().parent.parent/'wyld-wandering-brand-kit-v1'
F='#0F1A14';I='#FFFBF5';T='#C45D3A';A='#D4A857'
def art(name):return (R/'01-logos/svg'/f'ww-{name}.svg').read_text()
def box(name,w=360):return f'<div class="logo" style="width:{w}px">{art(name)}</div>'
def image(path,style=''):return f'<img src="../{path}" style="{style}"/>'
pages=[]
def page(title,kicker,body,dark=False):
 n=len(pages)+1
 pages.append(f'<section class="page {"dark" if dark else ""}"><div class="kicker">WYLD WANDERING &nbsp; / &nbsp; {kicker}</div><h1>{title}</h1>{body}<footer><span>Brand guidelines &nbsp; / &nbsp; Version 1.0</span><span>October 2026 &nbsp; / &nbsp; {n:02d}</span></footer></section>')

page('A more personal way to go.','THE IDENTITY',f'<div class="cover-logo">{art("stacked-dark")}</div><div class="cover-bottom"><p>Personal travel planning.<br/>An identity grounded in hospitality, curiosity and care.</p><div class="mini-palette"><i style="background:{I}"></i><i style="background:{T}"></i><i style="background:{A}"></i></div></div>',True)
page('One identity. Every setting.','LOGO SYSTEM',f'<div class="logo-grid"><div class="sample">{box("stacked-light",365)}<p>Primary stacked lockup</p></div><div class="sample forest">{box("horizontal-dark",440)}<p>Horizontal lockup</p></div><div class="sample">{box("wordmark-light",440)}<p>Wordmark</p></div><div class="sample forest">{box("symbol-dark",230)}<p>Standalone monogram</p></div></div><p class="note">All logo lettering is outlined. SVG and PDF files contain editable vector paths, with no fonts or embedded photographs. Light = forest artwork for light backgrounds. Dark = ivory artwork for dark backgrounds.</p>')
page('Room to breathe.','PLACEMENT AND SIZE',f'<div class="two"><div><div class="clearspace">{box("stacked-light",410)}</div><p>Keep at least one quarter of the monogram’s height clear around the visible artwork. For the wordmark alone, use one quarter of the lettering height. Measure from the artwork, not the file edge.</p><p>Place the mark on a quiet, high-contrast surface. Keep the original proportions and approved color.</p></div><div><h2>Recommended minimum widths</h2><table><tr><th>Asset</th><th>Screen</th><th>Print</th></tr><tr><td>Stacked</td><td>220 px</td><td>45 mm</td></tr><tr><td>Horizontal</td><td>280 px</td><td>60 mm</td></tr><tr><td>Wordmark</td><td>200 px</td><td>45 mm</td></tr><tr><td>Monogram</td><td>48 px</td><td>12 mm</td></tr></table><p class="note">Use the heavier small-symbol artwork for 16–47 px web icons. Always review at actual size; fine strokes need more space on absorbent paper or textured materials.</p><h2>Keep the artwork intact</h2><p>No stretching, rotation, shadows, gradients, outlines or rearranged lettering. Do not recreate the wordmark by typing the brand name.</p></div></div>')

colors=[('Forest',F,'15 / 26 / 20','Primary logo, text and dark surfaces'),('Ivory',I,'255 / 251 / 245','Main light surface and reverse logo'),('Terracotta',T,'196 / 93 / 58','Selective emphasis and accents'),('Amber',A,'212 / 168 / 87','Small decorative details')]
cards=''.join(f'<div class="color"><div style="background:{v}"></div><h2>{n}</h2><b>{v}</b><p>RGB {rgb}</p><p>{role}</p></div>' for n,v,rgb,role in colors)
page('Warmth, with restraint.','COLOR',f'<div class="colors">{cards}</div><div class="two"><div><h2>Lead with forest and ivory</h2><p>Use forest text on ivory, or ivory text on forest. Reserve terracotta for emphasis and amber for fine details. Avoid amber text on ivory.</p></div><div><h2>Use the supplied values</h2><p>All master artwork uses exact sRGB colors. The package includes CSS, JSON and a GIMP palette. For print, have the printer convert from the vector PDF using the profile for the selected paper and process.</p></div></div>')
page('Editorial, never ornamental.','TYPOGRAPHY',f'<div class="two"><div><p class="kicker">PRIMARY DISPLAY / CORMORANT</p><div class="specimen">Places worth<br/>finding.</div><p>Cormorant Medium or Semibold for headlines. Use italics sparingly. Give headings generous space.</p><p class="kicker">PRIMARY BODY / OUTFIT</p><p class="outfit" style="font-size:27px">The right hotel.<br/>The thoughtful details.<br/>Your trip, handled.</p><p>Outfit Regular or Medium for body copy, captions and navigation. Keep paragraphs easy to scan.</p></div><div><h2>Practical type scale</h2><table><tr><th>Role</th><th>Screen</th><th>Documents</th></tr><tr><td>Display</td><td>48–80 px</td><td>30–48 pt</td></tr><tr><td>Section title</td><td>28–40 px</td><td>18–24 pt</td></tr><tr><td>Body</td><td>16–20 px</td><td>11–12 pt</td></tr><tr><td>Small label</td><td>12–14 px</td><td>9–10 pt</td></tr></table><h2>Office templates</h2><p>The editable templates use Georgia and Arial as practical fallbacks. The logo stays identical because its lettering is artwork. Cormorant and Outfit font files and their OFL licenses are included for design and web work.</p><p class="note">Install the supplied fonts before applying the primary pair in a design application. Recheck wrapping after changing fonts. Georgia and Arial font files are not redistributed.</p></div></div>')
page('Speak like someone who knows.','VOICE AND IMAGERY','<div class="two"><div><h2>The voice</h2><p>Personal, direct and informed. Explain why a place is worth a client’s time and what makes it right for that particular trip.</p><p>Use concrete details: the room, the neighborhood, the morning walk, the reservation. Keep confidence grounded in what is known or confirmed.</p><h2>Core language</h2><p class="quote">Your trip, handled.</p><p>Primary headline</p><p class="quote">Places worth finding.</p><p>Supporting editorial phrase</p><p><b>Descriptor:</b> Personal travel planning.</p></div><div><h2>Photography</h2><p>Choose distinctive places, human-scale architecture, natural light and considered details. Favor a sense of being there over a catalog of attractions.</p><p>Allow one strong image to lead. Keep horizons straight, color believable and space around typography. Use only imagery you own or have permission to use.</p><h2>Writing example</h2><p class="quote small">A quiet courtyard, a walkable neighborhood, and a room worth lingering in.</p><p>This is illustrative style copy. Use property-specific details only after confirming them.</p><p class="note">Avoid generic superlatives and promises of upgrades, access or availability unless confirmed for the booking.</p></div></div>')
page('Ready for the next trip.','SOCIAL AND TEMPLATES',f'<div class="preview-row">{image("02-social/brand-post-dark-1080.png","width:255px;height:255px")}{image("02-social/brand-portrait-1080x1350.png","width:204px;height:255px")}{image("02-social/brand-story-1080x1920.png","width:143px;height:255px")}{image("03-templates/itinerary-01-cover.png","width:197px;height:255px")}</div><div class="three"><div><h2>Social assets</h2><p>1080 px avatars in three colors; square, portrait and vertical brand cards; 1500 × 500 wide banners in light and dark.</p><p>Keep essential content away from platform controls. Preview the actual crop before posting.</p></div><div><h2>Editable templates</h2><p>Square, portrait and story layouts in light and dark. Eight client presentation slides. A three-page itinerary, letterhead and business cards.</p><p>SVG files keep live text and vector artwork. PowerPoint files keep editable text and shapes.</p></div><div><h2>Make it yours</h2><p>Duplicate a template, replace bracketed copy and add your own photograph. Keep the photo within its placeholder area.</p><p>Export a fresh PNG or PDF and review it before sharing. Template placeholders are not publishable content.</p></div></div>')
page('Use the right file.','HANDOFF',f'<div class="two"><div><h2>01 Logos</h2><p><b>SVG:</b> scalable artwork for design and web.<br/><b>PDF:</b> vector artwork for placement and print.<br/><b>PNG:</b> transparent images for everyday use.</p><h2>02 Social</h2><p>Finished brand cards, avatars, banners and web icons. SVG source and PNG exports are paired by filename.</p><h2>03 Templates</h2><p>Five PowerPoint files covering social, itineraries and client presentations. Individual SVG layouts are also editable. Print layouts include PDF proofs.</p><h2>04 Guidelines and 05 Source</h2><p>This guide, fonts and licenses, palette files, master monogram and wordmark artwork, and provenance notes.</p></div><div><h2>Business cards</h2><p>Trim: 3.5 × 2 inches. Bleed: 0.125 inch on every edge. Artwork size: 3.75 × 2.25 inches. Keep live content at least 0.125 inch inside the trim. PDF TrimBox and BleedBox are supplied.</p><h2>Print workflow</h2><p>The PDFs are RGB vector artwork. Confirm the printer’s preferred color conversion and stock, then review a proof. The itinerary and letterhead use US Letter dimensions.</p><h2>Editing workflow</h2><p>Open PPTX in PowerPoint or import it into your slide editor. Open SVG in a vector editor; text remains editable. Logos are fixed artwork in the slide templates; the SVG masters allow path editing.</p><p class="note">Version 1.0 / October 22, 2026<br/>Brand contact: zak@winnick.io<br/>Website: wyldwandering.com</p></div></div>')

css='''@font-face{font-family:Cormorant;src:url("fonts/cormorant/Cormorant[wght].ttf")}@font-face{font-family:Outfit;src:url("fonts/outfit/Outfit[wght].ttf")}
*{box-sizing:border-box}html,body{margin:0;padding:0;background:#E8E3DA;color:#0F1A14;font-family:Arial,sans-serif} @page{size:1120px 800px;margin:0}.page{position:relative;width:1120px;height:800px;padding:48px 64px 70px;background:#FFFBF5;page-break-after:always;overflow:hidden}.page:last-child{page-break-after:auto}.dark{background:#0F1A14;color:#FFFBF5}.kicker{font-size:12px;letter-spacing:2.8px;margin:0 0 18px}h1{font-family:Cormorant,Georgia,serif;font-size:54px;font-weight:500;line-height:1.05;margin:0 0 30px}h2{font-family:Cormorant,Georgia,serif;font-size:28px;font-weight:600;line-height:1.1;margin:18px 0 12px}p{font-size:16px;line-height:1.5;margin:0 0 16px}.note{font-size:13px;line-height:1.5}.two{display:grid;grid-template-columns:1fr 1fr;gap:64px}.three{display:grid;grid-template-columns:1fr 1fr 1fr;gap:34px}.logo svg{display:block;width:100%;height:auto}.cover-logo{width:650px;margin:30px auto 0}.cover-logo svg{width:100%;height:auto}.cover-bottom{display:flex;justify-content:space-between;align-items:center;margin-top:22px}.cover-bottom p{font-size:18px}.mini-palette{display:flex;gap:12px}.mini-palette i{width:46px;height:46px;border-radius:50%}footer{position:absolute;bottom:29px;left:64px;right:64px;display:flex;justify-content:space-between;border-top:1px solid #B9BDB4;padding-top:13px;font-size:11px;letter-spacing:1px}.dark footer{border-color:#435247}.logo-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:20px}.sample{height:227px;border:1px solid #E8E3DA;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative}.sample.forest{background:#0F1A14;color:#FFFBF5}.sample p{position:absolute;bottom:8px;margin:0;font-size:12px}.sample .logo{max-height:188px;display:flex;align-items:center}.sample .logo svg{max-height:188px}.clearspace{border:1px dashed #C45D3A;margin:12px 0 22px;padding:22px 10px;width:450px;display:flex;justify-content:center}table{border-collapse:collapse;width:100%;margin:18px 0 22px;font-size:15px}th,td{text-align:left;padding:12px 9px;border-bottom:1px solid #D6D9D1}th{font-size:13px}td:first-child,th:first-child{padding-left:0}.colors{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin:4px 0 18px}.color>div{height:160px;border:1px solid #D6D9D1}.color h2{margin-top:20px}.color b{font-size:16px}.color p{font-size:14px;margin:8px 0}.specimen{font:500 72px/1.02 Cormorant,Georgia,serif;margin:22px 0 25px}.outfit{font-family:Outfit,Arial,sans-serif}.quote{font:500 36px/1.2 Cormorant,Georgia,serif;margin:20px 0 10px}.quote.small{font-size:31px}.preview-row{display:flex;gap:36px;align-items:flex-start;justify-content:space-between;margin:10px 0 24px}.preview-row img{object-fit:contain;border:1px solid #E8E3DA}'''
(R/'04-guidelines/Brand-guide.html').write_text('<!doctype html><html><head><meta charset="utf-8"><title>Wyld Wandering brand guidelines</title><style>'+css+'</style></head><body>'+''.join(pages)+'</body></html>')

readme='''# Wyld Wandering brand package

Version 1.0 — October 22, 2026

Start with `Brand-overview.png` and `04-guidelines/Brand-guide.pdf`.

## Quick start

- Use `01-logos/svg/ww-horizontal-light.svg` on a light website header.
- Use `01-logos/svg/ww-horizontal-dark.svg` on a dark header.
- Use the stacked lockup on covers and the monogram for avatars.
- SVG and PDF logos are pure vector paths. PNG logos have transparent backgrounds.
- “Light” means forest artwork for a light surface; “dark” means ivory artwork for a dark surface. Black and white versions are also included.
- Ready-to-use social artwork is in `02-social`. Files with `template` in the name have placeholders and must be edited before publishing.

## Editable templates

`03-templates` includes these PowerPoint files:

| File | Contents |
| --- | --- |
| social-square.pptx | Two 1:1 layouts, light and dark |
| social-portrait.pptx | Two 4:5 layouts, light and dark |
| social-story.pptx | Two 9:16 layouts, light and dark |
| itinerary-US-letter.pptx | Cover, daily plan, practical details |
| client-presentation.pptx | Eight layouts, including light and dark covers |

Text and layout shapes remain editable in PowerPoint. Logos are high-resolution images in the slide templates; use the supplied SVG masters for vector editing. Each layout is also supplied as an SVG with editable text and grouped vector logo artwork. Business-card and letterhead SVGs have live text. Preview PNGs and print PDFs are supplied alongside them.

Replace all bracketed copy. To add a photograph in PowerPoint, remove the placeholder rectangle and its text, insert your image and crop it to the same bounds. In a vector editor, replace the placeholder with a clipped photograph. Export social slides to 1080 × 1080, 1080 × 1350 or 1080 × 1920 pixels as appropriate. Native export resolution can differ between applications; check the resulting file dimensions.

Use a duplicate when editing. Review text wrapping and photo crops after importing into a different application. The PowerPoint source was rendered and visually checked with LibreOffice; import behavior can vary.

## Typography

Primary supporting fonts are Cormorant and Outfit, retaining the site's established pairing. Original font files and licenses are bundled in `04-guidelines/fonts`. Install them for design/web work. The office and portable SVG templates use Georgia and Arial to reduce font substitution; these font files are not bundled. Logo lettering is outlined artwork and needs no font installation.

Font sources: https://github.com/google/fonts/tree/main/ofl/cormorant and https://github.com/google/fonts/tree/main/ofl/outfit . Each family carries its own included SIL Open Font License.

## Print

Business cards are 3.5 × 2 inches trimmed, with 0.125-inch bleed on all sides. Files measure 3.75 × 2.25 inches. Card PDFs include TrimBox and BleedBox. Itinerary and letterhead pages use US Letter. PDFs are RGB; ask the printer to handle the final profile conversion and provide a proof for the selected stock.

## Website and email

The package includes a favicon SVG and PNG icons at 16, 32, 48, 180, 192 and 512 pixels. The heavier small-symbol artwork is intended for small web icons. `03-templates/email-signature.html` is a copyable, editable text-based email signature with no remote image dependency. This package has not been installed on the live site or published to social accounts.

## Source and consistency

All final variations derive from one cleaned monogram and one outlined wordmark. The source follows the approved first-round direction, with uniform colors, refined vector curves, consistent spacing and a small-size symbol variant. The original image-generation study is outside this package. See `05-source/Provenance.md` for the production record.
'''
(R/'START-HERE.md').write_text(readme)
(R/'05-source/Provenance.md').write_text('''# Artwork provenance

Version 1.0, October 22, 2026.

The user selected identity study 01. This package preserves its WW monogram and title-case wordmark. The forest transparent lockup from that study supplied the source contours. The alpha mask was thresholded, isolated into monogram and wordmark, and converted into optimized Bézier outlines with small artifacts removed. The resulting two master components are included here as SVG paths.

All logo variants, social artwork and templates are built from these common masters. Colors are exact flat sRGB fills. Layouts use consistent proportions and spacing. Small web icons use a slightly heavier version of the same contour for legibility. No generated raster logo is embedded in any master SVG or logo PDF. PowerPoint templates use high-resolution logo PNGs to preserve appearance across office applications; their text and layout shapes remain editable.

The wordmark is outlined custom artwork derived from the approved concept, not typed text in Cormorant. Cormorant and Outfit are supporting brand typefaces. Georgia and Arial are template fallbacks. Font sources and OFL license texts are included in the guidelines folder. The email address used in templates was supplied by the user: zak@winnick.io.
''')

(R/'03-templates/email-signature.html').write_text('''<!doctype html><html><head><meta charset="utf-8"><title>Wyld Wandering email signature</title></head><body><table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;color:#0F1A14"><tr><td style="padding:0 0 8px;font-family:Georgia,serif;font-size:23px">Zak Winnick</td></tr><tr><td style="font-size:13px;padding-bottom:13px">Travel Advisor · Wyld Wandering</td></tr><tr><td style="padding-top:12px;border-top:2px solid #C45D3A;font-size:13px;line-height:1.7"><a href="mailto:zak@winnick.io" style="color:#0F1A14;text-decoration:none">zak@winnick.io</a><br><a href="https://wyldwandering.com" style="color:#0F1A14;text-decoration:none">wyldwandering.com</a></td></tr></table></body></html>''')
print('Created eight-page guide and handoff instructions.')
