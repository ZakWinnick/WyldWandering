from pathlib import Path
import xml.etree.ElementTree as ET
import json, re, html, shutil

HERE=Path(__file__).resolve().parent
ROOT=HERE.parent/'wyld-wandering-brand-kit-v1'
NS={'s':'http://www.w3.org/2000/svg'}
C={'forest':'#0F1A14','ivory':'#FFFBF5','terracotta':'#C45D3A','amber':'#D4A857','stone':'#E8E3DA','muted':'#576159'}

def traced(name):
    r=ET.parse(HERE/f'{name}-traced.svg').getroot()
    w,h=map(float,r.attrib['viewBox'].split()[2:])
    g=r.find('s:g',NS)
    paths=''.join('<path d="'+re.sub(r'\s+',' ',p.attrib['d'])+'"/>' for p in g.findall('s:path',NS))
    return w,h,f'<g transform="{g.attrib["transform"]}">{paths}</g>'
MW,MH,MARK=traced('monogram')
WW,WH,WORD=traced('wordmark')

def group(kind,x,y,w,color,small=False):
    ow,oh,body=(MW,MH,MARK) if kind=='mark' else (WW,WH,WORD)
    stroke=f' stroke="{color}" stroke-width="70" stroke-linejoin="round"' if small else ''
    return f'<g fill="{color}"{stroke} transform="translate({x} {y}) scale({w/ow})">{body}</g>'

def svg(w,h,body,title='Wyld Wandering',desc='',physical=None):
    dim=f'width="{physical[0]}in" height="{physical[1]}in"' if physical else f'width="{w}" height="{h}"'
    return f'<svg xmlns="http://www.w3.org/2000/svg" {dim} viewBox="0 0 {w} {h}" role="img"><title>{html.escape(title)}</title><desc>{html.escape(desc)}</desc>{body}</svg>'

LOGOS={}
def logo(kind,color):
    if kind=='stacked':
        w,h=1000,520
        b=group('mark',320,60,360,color)+group('word',80,305,840,color)
    elif kind=='horizontal':
        w,h=1400,270
        b=group('mark',60,68,220,color)+group('word',340,56,1000,color)
    elif kind=='wordmark':
        w,h=1800,420
        b=group('word',90,80,1620,color)
    else:
        w=h=1000
        b=group('mark',150,(1000-700*MH/MW)/2,700,color,kind=='small-symbol')
    return w,h,b

for kind in ['stacked','horizontal','wordmark','symbol','small-symbol']:
    for version,color in [('light',C['forest']),('dark',C['ivory']),('black','#000000'),('white','#FFFFFF')]:
        if kind=='small-symbol' and version in ['black','white']: continue
        w,h,b=logo(kind,color)
        name=f'ww-{kind}-{version}'
        p=ROOT/'01-logos/svg'/f'{name}.svg'
        p.write_text(svg(w,h,b,f'Wyld Wandering {kind} logo',f'{version} version. Outlined vector artwork. Transparent background.'))
        LOGOS[name]=(w,h,b)

# Master components remain pure paths and are shared by every asset.
(ROOT/'05-source/monogram-master.svg').write_text(svg(MW,MH,group('mark',0,0,MW,C['forest']),'Wyld Wandering monogram master'))
(ROOT/'05-source/wordmark-master.svg').write_text(svg(WW,WH,group('word',0,0,WW,C['forest']),'Wyld Wandering wordmark master'))

def text(x,y,s,size=24,color=None,font='Arial',weight='normal',spacing=0,anchor='start',ident=''):
    # y is top edge; SVG and HTML both use an explicit baseline offset.
    return {'type':'text','x':x,'y':y,'text':s,'size':size,'color':color or C['forest'],'font':font,'weight':weight,'spacing':spacing,'anchor':anchor,'id':ident}
def rect(x,y,w,h,fill,ident=''):
    return {'type':'rect','x':x,'y':y,'w':w,'h':h,'fill':fill,'id':ident}
def line(x,y,w,color=None):return rect(x,y,w,1.5,color or C['stone'])
def brand(x,y,w,version='light',kind='horizontal'):
    name=f'ww-{kind}-{version}'; ow,oh,_=LOGOS[name]
    return {'type':'logo','name':name,'x':x,'y':y,'w':w,'h':w*oh/ow}
def heading(x,y,s,size=80,color=None):return text(x,y,s,size,color,'Georgia')
def lines(x,y,ss,size=28,color=None,font='Arial',leading=1.4):return [text(x,y+i*size*leading,s,size,color,font) for i,s in enumerate(ss)]
def label(x,y,s,color=None,size=18):return text(x,y,s,size,color,spacing=3)

SCENES=[]
def scene(name,w,h,bg,nodes,folder='02-social',editable=False,physical=None):
    d={'name':name,'w':w,'h':h,'bg':bg,'nodes':nodes,'folder':folder,'editable':editable,'physical':physical}
    body=f'<rect id="background" width="{w}" height="{h}" fill="{bg}"/>'
    for i,n in enumerate(nodes):
        ident=n.get('id') or f'element-{i+1}'
        if n['type']=='rect':body+=f'<rect id="{ident}" x="{n["x"]}" y="{n["y"]}" width="{n["w"]}" height="{n["h"]}" fill="{n["fill"]}"/>'
        elif n['type']=='logo':
            ow,oh,art=LOGOS[n['name']]
            body+=f'<g id="{ident}" transform="translate({n["x"]} {n["y"]}) scale({n["w"]/ow})">{art}</g>'
        else:
            body+=f'<text id="{ident}" x="{n["x"]}" y="{n["y"]+n["size"]*.85}" font-family="{n["font"]}" font-size="{n["size"]}" font-weight="{n["weight"]}" fill="{n["color"]}" letter-spacing="{n["spacing"]}" text-anchor="{n["anchor"]}">{html.escape(n["text"])}</text>'
    (ROOT/folder/f'{name}.svg').write_text(svg(w,h,body,name,'Editable text and grouped vector artwork.' if editable else 'Brand asset derived from the approved vector master.',physical))
    SCENES.append(d);return d

for tone,bg,ver in [('light',C['ivory'],'light'),('dark',C['forest'],'dark'),('terracotta',C['terracotta'],'dark')]:
    scene(f'avatar-{tone}-1080',1080,1080,bg,[brand(0,0,1080,ver,'symbol')])
for tone,bg,ver in [('light',C['ivory'],'light'),('dark',C['forest'],'dark')]:
    fg=C['forest'] if tone=='light' else C['ivory']
    scene(f'brand-post-{tone}-1080',1080,1080,bg,[brand(120,180,840,ver,'stacked'),line(440,720,200,C['terracotta']),text(540,790,'Your trip, handled.',46,fg,'Georgia',anchor='middle'),text(540,970,'wyldwandering.com',22,fg,anchor='middle')])
    scene(f'wide-banner-{tone}-1500x500',1500,500,bg,[brand(75,100,380,ver,'stacked'),rect(540,125,2,250,C['terracotta']),heading(625,160,'Your trip, handled.',66,fg),text(630,270,'Personal travel planning.',28,fg),text(630,340,'wyldwandering.com',22,fg)])

# Ready-to-use branded portrait and story cards.
scene('brand-portrait-1080x1350',1080,1350,C['ivory'],[brand(60,55,540),label(80,300,'PERSONAL TRAVEL PLANNING'),heading(75,410,'Places worth',104),heading(75,535,'finding.',104),rect(80,760,100,5,C['terracotta']),*lines(80,835,['The right hotel.','The thoughtful details.','Your trip, handled.'],34),text(80,1235,'wyldwandering.com',24),brand(780,1110,220,kind='symbol')])
scene('brand-story-1080x1920',1080,1920,C['forest'],[brand(150,250,780,'dark','stacked'),heading(100,920,'Your trip,',105,C['ivory']),heading(100,1040,'handled.',105,C['ivory']),rect(100,1250,100,5,C['terracotta']),text(100,1340,'Personal travel planning.',34,C['ivory']),text(100,1580,'wyldwandering.com',28,C['ivory'])])

# Editable social compositions; intentional placeholders are not claims.
social={}
for tone,bg,ver in [('light',C['ivory'],'light'),('dark',C['forest'],'dark')]:
    fg=C['forest'] if tone=='light' else C['ivory']; ph=C['stone'] if tone=='light' else '#26382C'
    social[f'square-{tone}']=scene(f'square-{tone}-template',1080,1080,bg,[brand(45,35,500,ver),rect(70,210,940,465,ph,'photo-placeholder'),text(540,425,'[ Add destination photo ]',28,fg,anchor='middle'),label(75,730,'[ DESTINATION ]',fg),heading(70,800,'[ Your headline ]',67,fg),text(75,925,'[ One useful detail about this place. ]',25,fg),text(75,1010,'wyldwandering.com',18,fg)],'03-templates',True)
    social[f'portrait-{tone}']=scene(f'portrait-{tone}-template',1080,1350,bg,[brand(45,35,500,ver),label(70,210,'[ DESTINATION ]',fg),heading(65,275,'[ Places to stay ]',72,fg),rect(70,415,940,600,ph,'photo-placeholder'),text(540,680,'[ Add property photo ]',28,fg,anchor='middle'),text(70,1080,'[ Property name ]',38,fg,'Georgia'),text(70,1155,'[ A specific reason to stay here. ]',27,fg),text(70,1270,'wyldwandering.com',20,fg)],'03-templates',True)
    social[f'story-{tone}']=scene(f'story-{tone}-template',1080,1920,bg,[brand(105,245,870,ver),label(90,500,'[ DESTINATION ]',fg),heading(85,580,'[ A place to go ]',76,fg),rect(90,760,900,550,ph,'photo-placeholder'),text(540,1010,'[ Add destination photo ]',28,fg,anchor='middle'),*lines(90,1390,['[ One thoughtful detail. ]','[ One reason to make the trip. ]'],30,fg),text(90,1600,'[ Your call to action ]',28,fg)],'03-templates',True)

# Business cards use 300 units per inch, 0.125-inch bleed and live text.
scene('business-card-front-bleed',1125,675,C['forest'],[brand(165,145,795,'dark','stacked')],'03-templates',True,(3.75,2.25))
scene('business-card-back-bleed',1125,675,C['ivory'],[brand(65,65,550),text(90,240,'Zak Winnick',66,font='Georgia'),label(93,337,'TRAVEL ADVISOR',size=22),rect(93,407,100,4,C['terracotta']),text(93,470,'zak@winnick.io',34),text(93,525,'wyldwandering.com',34),brand(805,420,220,kind='symbol')],'03-templates',True,(3.75,2.25))

# Printable itinerary and letterhead (US Letter).
itinerary=[]
itinerary.append(scene('itinerary-01-cover',850,1100,C['ivory'],[brand(85,65,680,kind='stacked'),label(85,450,'YOUR ITINERARY',size=14),heading(80,520,'[ Destination ]',64),text(85,620,'Prepared for [ Client name ]',22),text(85,675,'[ Travel dates ]',22),rect(85,785,95,3,C['terracotta']),text(85,850,'Your trip, handled.',32,font='Georgia'),text(85,1010,'wyldwandering.com',16)],'03-templates',True,(8.5,11)))
itinerary.append(scene('itinerary-02-day-plan',850,1100,C['ivory'],[brand(45,35,420),label(65,170,'[ DAY 01 / DATE ]',size=14),heading(60,225,'[ A day in place ]',52),text(65,305,'[ A short introduction to the day. ]',20),line(65,370,720),label(65,415,'MORNING',size=14),heading(245,402,'[ Experience ]',29),*lines(245,455,['[ Time and meeting point ]','[ Booking reference and helpful detail ]'],18),line(65,555,720),label(65,600,'AFTERNOON',size=14),heading(245,587,'[ Experience ]',29),*lines(245,640,['[ Time and meeting point ]','[ Booking reference and helpful detail ]'],18),line(65,740,720),label(65,785,'EVENING',size=14),heading(245,772,'[ Dinner or downtime ]',29),*lines(245,825,['[ Time and location ]','[ Dress code or reservation detail ]'],18),line(65,950,720),text(65,1005,'[ Client name ] / [ Travel dates ]',15),text(785,1005,'[ Page ]',15,anchor='end')],'03-templates',True,(8.5,11)))
itinerary.append(scene('itinerary-03-details',850,1100,C['ivory'],[brand(45,35,420),heading(60,190,'The details',54),label(65,320,'YOUR STAY',size=14),heading(65,365,'[ Property name ]',31),*lines(65,425,['[ Address and contact number ]','[ Check-in ] to [ Check-out ]','[ Room category and confirmation reference ]'],20),line(65,555,720),label(65,600,'GETTING THERE',size=14),*lines(65,655,['[ Flight or transfer details ]','[ Pickup location and local contact ]'],20),line(65,760,720),label(65,800,'GOOD TO KNOW',size=14),*lines(65,850,['[ Confirmed inclusions and booking conditions ]','[ Relevant local information ]'],20),text(65,1010,'Wyld Wandering / zak@winnick.io',16)],'03-templates',True,(8.5,11)))
scene('letterhead-US-letter',850,1100,'#FFFFFF',[brand(50,40,460),text(65,225,'[ Date ]',17),heading(60,295,'[ Letter subject ]',42),*lines(65,395,['[ Recipient name ],','','[ Write your message here. ]','','[ Continue your message here. ]','','Warmly,','Zak Winnick'],19,leading=1.7),line(65,965,720),text(65,1000,'zak@winnick.io',15),text(785,1000,'wyldwandering.com',15,anchor='end')],'03-templates',True,(8.5,11))

# Eight client presentation layouts, designed at 1600 x 900.
deck=[]
def deckscene(name,bg,nodes):
    d=scene(name,1600,900,bg,nodes,'03-templates',True);deck.append(d);return d
deckscene('presentation-01-cover-light',C['ivory'],[brand(70,60,620),label(90,300,'YOUR TRIP',size=23),heading(80,400,'[ Destination ]',112),text(90,570,'Prepared for [ Client name ] / [ Travel dates ]',32),rect(90,720,120,5,C['terracotta']),text(90,795,'wyldwandering.com',23),brand(1110,370,380,kind='symbol')])
deckscene('presentation-02-cover-dark',C['forest'],[brand(70,60,620,'dark'),label(90,300,'YOUR TRIP',C['ivory'],23),heading(80,400,'[ Destination ]',112,C['ivory']),text(90,570,'Prepared for [ Client name ] / [ Travel dates ]',32,C['ivory']),rect(90,720,120,5,C['terracotta']),text(90,795,'wyldwandering.com',23,C['ivory']),brand(1110,370,380,'dark','symbol')])
deckscene('presentation-03-overview',C['ivory'],[brand(70,35,480),heading(80,190,'The shape of your trip',82),*lines(90,350,['[ A short introduction to this itinerary. ]','[ Explain how it reflects the client’s priorities. ]'],30),line(90,505,1420),label(90,565,'WHEN',size=21),heading(90,630,'[ Dates ]',45),label(620,565,'WHERE',size=21),heading(620,630,'[ Places ]',45),label(1150,565,'PACE',size=21),heading(1150,630,'[ Trip style ]',45),text(90,815,'Wyld Wandering',20)])
deckscene('presentation-04-destination',C['ivory'],[brand(65,30,480),label(90,230,'THE DESTINATION',size=21),heading(80,315,'[ Place name ]',74),*lines(90,450,['[ Why this place fits your trip. ]','[ The detail that makes it special. ]','[ Best time to explore. ]'],28),rect(850,180,660,610,C['stone'],'photo-placeholder'),text(1180,475,'[ Add destination photo ]',28,anchor='middle'),text(90,815,'Wyld Wandering',20)])
deckscene('presentation-05-hotel',C['forest'],[brand(65,30,480,'dark'),rect(90,185,660,580,'#26382C','photo-placeholder'),text(420,450,'[ Add property photo ]',28,C['ivory'],anchor='middle'),label(840,220,'YOUR STAY',C['ivory'],21),heading(830,310,'[ Hotel name ]',67,C['ivory']),*lines(840,440,['[ Location and character ]','[ Recommended room category ]','[ Confirmed inclusions ]','[ Dates and booking conditions ]'],27,C['ivory'],leading=1.8),text(90,815,'Wyld Wandering',20,C['ivory'])])
deckscene('presentation-06-itinerary',C['ivory'],[brand(65,30,480),heading(80,185,'A few days, thoughtfully planned.',72),label(90,340,'DAY 01',size=20),heading(380,326,'[ Arrival and settling in ]',40),text(380,395,'[ Transfer, check-in and an easy first evening. ]',27),line(90,465,1420),label(90,520,'DAY 02',size=20),heading(380,506,'[ Explore at your pace ]',40),text(380,575,'[ One planned experience, with room to wander. ]',27),line(90,645,1420),label(90,700,'DAY 03',size=20),heading(380,686,'[ One more good day ]',40),text(380,755,'[ A final experience or onward travel. ]',27)])
deckscene('presentation-07-details',C['ivory'],[brand(65,30,480),heading(80,185,'Before we book',82),label(90,350,'INCLUDED',size=20),*lines(90,420,['[ Hotel and room category ]','[ Transfers and experiences ]','[ Confirmed amenities ]'],29,leading=1.8),rect(780,340,2,360,C['stone']),label(860,350,'TO CONFIRM',size=20),*lines(860,420,['[ Total and currency ]','[ Deposit and payment dates ]','[ Cancellation terms ]'],29,leading=1.8),line(90,755,1420),text(90,805,'[ Add the applicable availability and booking conditions. ]',22)])
deckscene('presentation-08-next-steps',C['forest'],[brand(70,60,620,'dark'),heading(80,330,'Your trip, handled.',112,C['ivory']),text(90,510,'[ The next step to make this trip yours. ]',34,C['ivory']),rect(90,650,120,5,C['terracotta']),text(90,735,'Zak Winnick / zak@winnick.io',28,C['ivory']),text(90,800,'wyldwandering.com',23,C['ivory'])])

# Companion palette files.
palette={k:v for k,v in C.items() if k in ['forest','ivory','terracotta','amber']}
(ROOT/'04-guidelines/brand-colors.json').write_text(json.dumps(palette,indent=2))
(ROOT/'04-guidelines/brand-colors.css').write_text(':root {\n'+''.join(f'  --ww-{k}: {v};\n' for k,v in palette.items())+'}\n')
(ROOT/'04-guidelines/brand-colors.gpl').write_text('GIMP Palette\nName: Wyld Wandering\nColumns: 4\n#\n'+''.join(' '.join(str(int(v[i:i+2],16)) for i in (1,3,5))+' '+k.title()+'\n' for k,v in palette.items()))

sets={'social-square':[social['square-light'],social['square-dark']], 'social-portrait':[social['portrait-light'],social['portrait-dark']], 'social-story':[social['story-light'],social['story-dark']], 'itinerary-US-letter':itinerary,'client-presentation':deck}
(HERE/'scene-data.json').write_text(json.dumps({'scenes':SCENES,'sets':sets},indent=2))
print(f'Created {len(LOGOS)} vector logo variations and {len(SCENES)} brand assets/templates')
