#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Erzeugt alle SVG-Grafiken (Illustrationen, Diagramme, Charts) fuer das Portfolio."""
import os, math
from draw import svg, lin, sun, dune, palm, building, star8, camel

HERE = os.path.dirname(__file__)
IMG  = os.path.join(os.path.dirname(HERE), "assets", "img")
os.makedirs(IMG, exist_ok=True)

def write(name, content):
    open(os.path.join(IMG, name), "w").write(content)
    print("  ", name)

# Farbpalette
ORANGE="#F2750A"; BLUE="#2E6FB7"; TEAL="#2BA89A"; SAND="#F3E2C0"; INK="#2b2b2b"
SKY1="#FFE3A8"; SKY2="#FFB36B"

# ======================================================================
#  COVER: arabeske Bordüre + Skyline
# ======================================================================
def cover_border():
    w,h=1100,90; b=f'<defs>{lin("og",[("0","#F2750A"),("1","#E0413A")],0,0,1,0)}</defs>'
    x=0
    while x<w:
        b+=star8(x+30,40,26,"url(#og)",2.4)
        b+=f'<path d="M{x+30} 66 l10 14 l-10 14 l-10 -14 Z" fill="none" stroke="url(#og)" stroke-width="2.4"/>'
        x+=60
    b+=f'<line x1="0" y1="84" x2="{w}" y2="84" stroke="url(#og)" stroke-width="2"/>'
    write("cover_border.svg", svg(w,h,b))

def skyline():
    w,h=1100,150; c="#4a4a4a"
    b=""
    import random; random.seed(7)
    x=0
    while x<w:
        w0=random.randint(40,90); ht=random.randint(50,120)
        dome=random.random()<0.5; minaret=random.random()<0.5
        b+=building(x,h,w0,ht,c,dome=dome,minaret=minaret,winop=0)
        if random.random()<0.3:
            b+=palm(x+w0+8,h,1.0,trunk=c,leaf=c)
        x+=w0+random.randint(12,30)
    write("skyline.svg", svg(w,h,b))

# ======================================================================
#  ROLLEN-ICONS (kleine runde Badges)
# ======================================================================
def icon(name, inner, bg=ORANGE):
    b=f'<circle cx="32" cy="32" r="30" fill="{bg}"/><circle cx="32" cy="32" r="30" fill="none" stroke="#fff" stroke-width="2.5"/>'+inner
    write(f"ic_{name}.svg", svg(64,64,b))

def build_icons():
    W="#ffffff"
    icon("scholar", f'<rect x="18" y="20" width="22" height="26" rx="2" fill="{W}"/><line x1="29" y1="20" x2="29" y2="46" stroke="{ORANGE}" stroke-width="2"/><circle cx="41" cy="40" r="8" fill="none" stroke="{W}" stroke-width="3"/><line x1="46" y1="45" x2="52" y2="51" stroke="{W}" stroke-width="3" stroke-linecap="round"/>', ORANGE)
    icon("map", f'<path d="M16 22 L28 18 L40 22 L48 18 L48 44 L40 48 L28 44 L16 48 Z" fill="{W}"/><line x1="28" y1="18" x2="28" y2="44" stroke="{BLUE}" stroke-width="2"/><line x1="40" y1="22" x2="40" y2="48" stroke="{BLUE}" stroke-width="2"/><circle cx="34" cy="30" r="4" fill="{ORANGE}"/>', BLUE)
    icon("market", f'<path d="M20 24 L44 24 L40 40 L24 40 Z" fill="{W}"/><line x1="32" y1="24" x2="32" y2="14" stroke="{W}" stroke-width="3"/><circle cx="32" cy="12" r="4" fill="{W}"/><path d="M24 40 l-4 8 M40 40 l4 8" stroke="{W}" stroke-width="3" stroke-linecap="round"/>', TEAL)
    icon("city", f'{building(18,46,12,22,W,winop=0)}{building(32,46,12,30,W,dome=True,winop=0)}', ORANGE)
    icon("diplomat", f'<path d="M20 40 Q22 24 38 24 L48 20 L44 28 L48 30 L40 32 Q44 40 32 44 Q24 46 20 40 Z" fill="{W}"/>', BLUE)
    icon("help", f'<path d="M32 46 C16 36 18 22 28 22 C31 22 32 25 32 25 C32 25 33 22 36 22 C46 22 48 36 32 46 Z" fill="{W}"/>', "#E0413A")
    icon("influencer", f'<rect x="24" y="14" width="16" height="36" rx="3" fill="{W}"/><rect x="27" y="18" width="10" height="26" fill="{ORANGE}"/><circle cx="32" cy="47" r="1.6" fill="{ORANGE}"/>', "#C0399B")
    icon("journalist", f'<rect x="16" y="22" width="32" height="22" rx="2" fill="{W}"/><rect x="20" y="26" width="10" height="8" fill="{INK}"/><line x1="32" y1="27" x2="44" y2="27" stroke="{INK}" stroke-width="2"/><line x1="32" y1="31" x2="44" y2="31" stroke="{INK}" stroke-width="2"/><line x1="20" y1="38" x2="44" y2="38" stroke="{INK}" stroke-width="2"/>', "#6b4f8a")

# ======================================================================
#  Q1  COLLAGE-KACHELN (flache Szenen 220x140)
# ======================================================================
def tile(name, body, defs=""):
    write(f"col_{name}.svg", svg(220,140, defs+body))

def build_collage():
    # --- Stereotype ---
    # Wüste + Kamel
    d=lin("s1",[("0",SKY1),("1",SKY2)]);
    tile("camel", f'<rect width="220" height="140" fill="url(#s1)"/>{sun(40,34,18)}'+dune(96,220,8,"#E8B26A")+dune(112,220,6,"#D99A4A",2)+camel(120,118,1.7,"#5b3f25")+palm(28,118,1.0), f'<defs>{d}</defs>')
    # Öl-Förderturm
    d=lin("s2",[("0","#3a3a4a"),("1","#1d1d28")])
    oil=('<g stroke="#caa14a" stroke-width="4" fill="none">'
         '<path d="M70 130 L86 50 M150 130 L134 50 M70 130 L150 130 M82 100 L138 100 M88 78 L132 78"/></g>'
         '<rect x="104" y="40" width="12" height="14" fill="#caa14a"/>'
         '<path d="M110 40 q-30 -6 -34 14" stroke="#7a5a20" stroke-width="6" fill="none"/>')
    tile("oil", f'<rect width="220" height="140" fill="url(#s2)"/>{oil}<rect y="128" width="220" height="12" fill="#0d0d14"/>', f'<defs>{d}</defs>')
    # Basar / Markt (Teppiche, Gewürze)
    d=lin("s3",[("0","#caa46a"),("1","#a87b3e")])
    rugs=""
    cols=["#E0413A","#2E6FB7","#2BA89A","#F2C200","#C0399B"]
    for i in range(5):
        rugs+=f'<rect x="{20+i*38}" y="70" width="30" height="56" rx="3" fill="{cols[i]}"/><rect x="{24+i*38}" y="76" width="22" height="44" fill="none" stroke="#fff" stroke-width="2"/>'
    tile("bazaar", f'<rect width="220" height="140" fill="url(#s3)"/><rect width="220" height="34" fill="#8a5a2a"/>'+ "".join(f'<path d="M{i*44} 0 q22 24 44 0" fill="#b5793a"/>' for i in range(6))+rugs, f'<defs>{d}</defs>')
    # Wüstenkarawane Sonnenuntergang / "1001 Nacht" Lampe
    d=lin("s4",[("0","#6b2d8a"),("1","#E0413A")])
    lamp=('<g fill="#F2C200"><path d="M96 96 q24 -20 52 0 q-8 12 -26 12 q-18 0 -26 -12 Z"/>'
          '<path d="M148 96 q12 -2 16 6 q-8 0 -10 -2 Z"/><rect x="116" y="84" width="14" height="8"/>'
          '<circle cx="123" cy="80" r="5"/></g>')
    tile("lamp", f'<rect width="220" height="140" fill="url(#s4)"/>{sun(170,40,16,"#FFD86B",False)}{lamp}<rect y="124" width="220" height="16" fill="#3a173f"/>', f'<defs>{d}</defs>')
    # --- Realität ---
    # Dubai Skyline modern
    d=lin("r1",[("0","#bfe3f5"),("1","#6db4dd")])
    sk=building(28,118,18,70,"#8fa9bd",winop=0.7)+building(50,118,16,46,"#a9bfd0",winop=0.7)
    # Burj-artiger Spitzturm
    sk+='<path d="M96 118 L104 30 L112 118 Z" fill="#cdd9e4"/><line x1="104" y1="30" x2="104" y2="8" stroke="#cdd9e4" stroke-width="3"/>'
    sk+=building(120,118,16,58,"#9fb6c8",winop=0.7)+building(140,118,22,80,"#b3c6d6",winop=0.7)+building(168,118,16,40,"#a9bfd0",winop=0.7)
    tile("dubai", f'<rect width="220" height="140" fill="url(#r1)"/>{sk}<rect y="118" width="220" height="22" fill="#2E6FB7"/><rect y="118" width="220" height="4" fill="#5a93c4"/>', f'<defs>{d}</defs>')
    # Wissenschaft / Universität (Frau mit Laptop)
    d=lin("r2",[("0","#e7f0e9"),("1","#bcd9c4")])
    person=('<circle cx="78" cy="58" r="14" fill="#8a5a3c"/><path d="M64 58 q0 -18 14 -18 q14 0 14 18 q-4 -6 -14 -6 q-10 0 -14 6Z" fill="#2b2b2b"/>'
            '<path d="M60 110 q0 -30 18 -30 q18 0 18 30 Z" fill="#2E6FB7"/>'
            '<rect x="96" y="86" width="40" height="26" rx="2" fill="#37474f"/><rect x="100" y="90" width="32" height="18" fill="#7fd4ff"/>'
            '<rect x="92" y="112" width="48" height="4" fill="#263238"/>')
    tile("science", f'<rect width="220" height="140" fill="url(#r2)"/>{person}<circle cx="160" cy="40" r="16" fill="none" stroke="#2BA89A" stroke-width="4"/><line x1="160" y1="56" x2="160" y2="74" stroke="#2BA89A" stroke-width="4"/>', f'<defs>{d}</defs>')
    # Solar / erneuerbare Energie Wüste
    d=lin("r3",[("0","#cdeefb"),("1","#9bd0ea")])
    pan=""
    for i in range(4):
        pan+=f'<g transform="translate({30+i*46},92)"><rect x="0" y="0" width="36" height="22" fill="#1b3a6b" transform="skewX(-18)"/><line x1="12" y1="0" x2="6" y2="22" stroke="#5a93c4"/><line x1="24" y1="0" x2="18" y2="22" stroke="#5a93c4"/><rect x="14" y="22" width="3" height="10" fill="#555"/></g>'
    tile("solar", f'<rect width="220" height="140" fill="url(#r3)"/>{sun(180,32,16)}'+dune(120,220,4,"#E8C98A")+pan, f'<defs>{d}</defs>')
    # moderne Metro / Verkehr
    d=lin("r4",[("0","#f0e6f5"),("1","#cdb6dd")])
    train=('<rect x="40" y="60" width="140" height="42" rx="10" fill="#e0413a"/><rect x="40" y="60" width="140" height="14" rx="10" fill="#fff" opacity="0.5"/>'
           '<rect x="52" y="78" width="20" height="16" rx="2" fill="#cde8ff"/><rect x="80" y="78" width="20" height="16" rx="2" fill="#cde8ff"/>'
           '<rect x="108" y="78" width="20" height="16" rx="2" fill="#cde8ff"/><rect x="136" y="78" width="20" height="16" rx="2" fill="#cde8ff"/>'
           '<line x1="20" y1="108" x2="200" y2="108" stroke="#7a7a7a" stroke-width="4"/>')
    tile("metro", f'<rect width="220" height="140" fill="url(#r4)"/>{train}', f'<defs>{d}</defs>')
    # Vielfalt Essen
    d=lin("r5",[("0","#fff3e0"),("1","#ffd9a8")])
    food=('<circle cx="110" cy="78" r="40" fill="#fff"/><circle cx="110" cy="78" r="40" fill="none" stroke="#e0a85a" stroke-width="3"/>'
          '<circle cx="96" cy="70" r="9" fill="#E0413A"/><circle cx="120" cy="66" r="8" fill="#2E9E45"/><circle cx="124" cy="86" r="9" fill="#F2C200"/>'
          '<circle cx="100" cy="90" r="8" fill="#a8632a"/><circle cx="112" cy="80" r="7" fill="#C0399B"/>')
    tile("food", f'<rect width="220" height="140" fill="url(#r5)"/>{food}', f'<defs>{d}</defs>')

# ======================================================================
#  Q3  MAROKKO-FLYER Illustrationen
# ======================================================================
def flyer_imgs():
    # Hero: Sahara
    d=lin("fh",[("0","#FFE0A0"),("1","#FF9E5A")])
    body=f'<rect width="400" height="180" fill="url(#fh)"/>{sun(70,46,26)}'+dune(120,400,12,"#E8B26A")+dune(140,400,10,"#D99A4A",2)
    body+=camel(150,150,2.0,"#5b3f25")+camel(210,156,1.4,"#6b4a2b")+palm(40,160,1.3)
    write("fl_hero.svg", svg(400,180, f'<defs>{d}</defs>'+body))
    # Chefchaouen blaue Stadt
    d=lin("fb",[("0","#9ad0ef"),("1","#4f86c6")])
    bl=""
    import random; random.seed(3)
    for i in range(10):
        x=10+i*38; h=random.randint(40,90); shade=random.choice(["#5a93c4","#6fa3d0","#84b4dd"])
        bl+=f'<rect x="{x}" y="{160-h}" width="34" height="{h}" fill="{shade}"/>'
        bl+=f'<rect x="{x+10}" y="{160-h+10}" width="12" height="16" fill="#cfe6f7"/>'
    write("fl_blue.svg", svg(400,180, f'<defs>{d}</defs><rect width="400" height="180" fill="url(#fb)"/>{bl}<rect y="158" width="400" height="22" fill="#365f8a"/>'))
    # Moschee (Koutoubia)
    d=lin("fm",[("0","#FFD9A8"),("1","#E88B3A")])
    mq=building(150,150,90,70,"#d8a25a",winop=0)
    mq+='<rect x="190" y="40" width="22" height="100" fill="#c98f48"/><path d="M190 40 q11 -16 22 0 Z" fill="#b97e3a"/><circle cx="201" cy="30" r="5" fill="#caa14a"/>'
    mq+='<path d="M150 80 q45 -16 90 0" fill="#c98f48"/>'
    write("fl_mosque.svg", svg(400,180, f'<defs>{d}</defs><rect width="400" height="180" fill="url(#fm)"/>{sun(60,40,20)}{mq}<rect y="148" width="400" height="32" fill="#8a5a2a"/>'))
    # Tajine Essen
    d=lin("ft",[("0","#fff3e0"),("1","#f3d3a0")])
    tj='<path d="M120 130 q80 0 160 0 q0 -16 -20 -20 l-120 0 q-20 4 -20 20 Z" fill="#c0623a"/>'
    tj+='<path d="M150 110 q50 -70 100 0 Z" fill="#d8763f"/><rect x="196" y="36" width="8" height="16" fill="#a84a28"/><circle cx="200" cy="32" r="7" fill="#a84a28"/>'
    tj+='<circle cx="170" cy="118" r="8" fill="#E0413A"/><circle cx="200" cy="120" r="8" fill="#2E9E45"/><circle cx="230" cy="118" r="8" fill="#F2C200"/>'
    write("fl_food.svg", svg(400,160, f'<defs>{d}</defs><rect width="400" height="160" fill="url(#ft)"/>{tj}'))
    # kleine Marokko-Karte (stilisierter Umriss)
    body='<path d="M20 60 L60 40 L120 44 L150 30 L150 70 L120 86 L70 120 L40 110 L24 80 Z" fill="#E0413A" opacity="0.9"/>'
    body+='<circle cx="64" cy="64" r="4" fill="#fff"/><text x="70" y="68" font-family="Nunito" font-size="13" font-weight="800" fill="#fff">Rabat</text>'
    body+='<circle cx="86" cy="86" r="4" fill="#fff"/><text x="58" y="100" font-family="Nunito" font-size="12" font-weight="800" fill="#fff">Marrakesch</text>'
    write("fl_map.svg", svg(170,140, body))

# ======================================================================
#  Q4  Orientalische Stadt – Strukturmodell
# ======================================================================
def oriental_city():
    W,H=700,560
    cx,cy=350,280
    b=f'<rect width="{W}" height="{H}" fill="#F4ECD8"/>'
    # Stadtmauer (rund) mit Toren
    b+=f'<circle cx="{cx}" cy="{cy}" r="250" fill="#EBDcBD" stroke="#9a7b4a" stroke-width="8"/>'
    # Tore
    for ang,lbl in [(-90,"Bab Nord"),(0,"Tor Ost"),(90,"Tor Süd"),(180,"Tor West")]:
        a=math.radians(ang); tx=cx+math.cos(a)*250; ty=cy+math.sin(a)*250
        b+=f'<rect x="{tx-12:.0f}" y="{ty-12:.0f}" width="24" height="24" fill="#8a5a2a" transform="rotate({ang} {tx:.0f} {ty:.0f})"/>'
    # Altstadt-Kern (Medina) – kleinere Mauer
    b+=f'<circle cx="{cx}" cy="{cy}" r="120" fill="#E4CfA0" stroke="#b08a4a" stroke-width="3" stroke-dasharray="6 4"/>'
    # Zitadelle / Kasbah
    b+=building(cx-40,cy-130,30,40,"#8a6a3a",winop=0)
    b+=f'<text x="{cx-25}" y="{cy-138}" font-family="Patrick Hand" font-size="15" fill="#6b4a20" text-anchor="middle">Zitadelle</text>'
    # Freitagsmoschee (Zentrum)
    b+=building(cx-22,cy+14,44,40,"#cfa15a",dome=True,minaret=True,winop=0)
    b+=f'<text x="{cx+6}" y="{cy+34}" font-family="Patrick Hand" font-size="14" fill="#fff" text-anchor="middle">Freitags-</text>'
    b+=f'<text x="{cx+6}" y="{cy+48}" font-family="Patrick Hand" font-size="14" fill="#fff" text-anchor="middle">moschee</text>'
    # Suq / Basar (Ring um Moschee)
    b+=f'<circle cx="{cx}" cy="{cy}" r="78" fill="none" stroke="#C0792E" stroke-width="14" opacity="0.45"/>'
    b+=f'<text x="{cx}" y="{cy-86}" font-family="Patrick Hand" font-size="15" fill="#9a5a1e" text-anchor="middle">Suq / Basar</text>'
    # verwinkelte Sackgassen (kurze Linien)
    import random; random.seed(11)
    for k in range(40):
        a=random.uniform(0,2*math.pi); r0=random.uniform(125,235)
        x0=cx+math.cos(a)*r0; y0=cy+math.sin(a)*r0
        a2=a+random.uniform(-0.5,0.5); l=random.uniform(14,34)
        x1=x0+math.cos(a2)*l; y1=y0+math.sin(a2)*l
        b+=f'<line x1="{x0:.0f}" y1="{y0:.0f}" x2="{x1:.0f}" y2="{y1:.0f}" stroke="#cBb892" stroke-width="3"/>'
    # Wohnviertel-Beschriftung
    b+=f'<text x="{cx+150}" y="{cy-70}" font-family="Patrick Hand" font-size="15" fill="#6b4a20" text-anchor="middle">Wohnviertel</text>'
    b+=f'<text x="{cx-150}" y="{cy+90}" font-family="Patrick Hand" font-size="15" fill="#6b4a20" text-anchor="middle">enge Gassen</text>'
    # Moderne Erweiterung außerhalb (Schachbrett)
    b+=f'<g opacity="0.9">'
    for i in range(4):
        for j in range(3):
            b+=building(560+i*30, 120+j*60, 22, 40, "#9fb6c8", winop=0)
    b+=f'</g><text x="600" y="110" font-family="Patrick Hand" font-size="15" fill="#2E6FB7">moderne</text>'
    b+=f'<text x="600" y="300" font-family="Patrick Hand" font-size="15" fill="#2E6FB7">Stadt-</text><text x="600" y="316" font-family="Patrick Hand" font-size="15" fill="#2E6FB7">erweiterung</text>'
    # breite Ausfallstraße
    b+=f'<line x1="{cx+120}" y1="{cy-40}" x2="600" y2="200" stroke="#b8b8b8" stroke-width="8"/>'
    write("city_model.svg", svg(W,H,b))

# ======================================================================
#  Q4  "Luftbild"-Stil (Google-Earth-artig)
# ======================================================================
def aerial():
    W,H=460,300
    b=f'<rect width="{W}" height="{H}" fill="#C9BB97"/>'
    import random; random.seed(5)
    # dichtes Gewirr kleiner Blöcke (Medina)
    for i in range(260):
        x=random.uniform(120,300); y=random.uniform(60,250)
        if (x-210)**2+(y-150)**2 < 95**2:
            s=random.uniform(6,13)
            b+=f'<rect x="{x:.0f}" y="{y:.0f}" width="{s:.0f}" height="{s:.0f}" fill="#d8c7a0" stroke="#b0a078" stroke-width="0.6"/>'
    # Moschee-Hof
    b+='<rect x="196" y="138" width="30" height="24" fill="#7aa0c0" stroke="#fff" stroke-width="1.5"/>'
    # moderne Raster-Stadt rechts
    for i in range(5):
        for j in range(7):
            b+=f'<rect x="{320+i*24}" y="{50+j*28}" width="18" height="20" fill="#cfd8c0" stroke="#aab59a" stroke-width="0.8"/>'
    # Grünflächen / Palmen
    for _ in range(20):
        x=random.uniform(20,110); y=random.uniform(60,250)
        b+=f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{random.uniform(4,9):.0f}" fill="#6a9a4a" opacity="0.8"/>'
    write("aerial.svg", svg(W,H,b))

# ======================================================================
#  Q5  Konflikt-Schaubild (Netzwerk)
# ======================================================================
def conflict():
    W,H=720,520
    b=f'<rect width="{W}" height="{H}" fill="#FBF7EE"/>'
    nodes={
      "Israel":(360,90,"#2E6FB7"),
      "USA":(150,70,"#2E6FB7"),
      "Iran":(360,430,"#2E9E45"),
      "Saudi-\nArabien":(120,300,"#E2A300"),
      "Hamas\n(Gaza)":(560,300,"#9a3b3b"),
      "Hisbollah\n(Libanon)":(560,150,"#9a3b3b"),
      "Huthi\n(Jemen)":(560,430,"#9a3b3b"),
      "Türkei":(120,150,"#7a5a8a"),
      "Ägypten /\nGolfstaaten":(150,430,"#E2A300"),
    }
    def center(n): x,y,_=nodes[n]; return x,y
    # Kanten: (a,b,typ) typ: ally(grün) / enemy(rot)
    edges=[("USA","Israel","ally"),("Iran","Hamas\n(Gaza)","ally"),("Iran","Hisbollah\n(Libanon)","ally"),
           ("Iran","Huthi\n(Jemen)","ally"),("Israel","Hamas\n(Gaza)","enemy"),("Israel","Hisbollah\n(Libanon)","enemy"),
           ("Israel","Iran","enemy"),("Saudi-\nArabien","Iran","enemy"),("Saudi-\nArabien","Huthi\n(Jemen)","enemy"),
           ("USA","Iran","enemy"),("Ägypten /\nGolfstaaten","Israel","ally")]
    for a,bn,t in edges:
        x1,y1=center(a); x2,y2=center(bn)
        col= "#2E9E45" if t=="ally" else "#E0413A"
        dash= "" if t=="enemy" else 'stroke-dasharray="2 8"'
        b+=f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{col}" stroke-width="3" {dash} opacity="0.8"/>'
    for n,(x,y,c) in nodes.items():
        b+=f'<circle cx="{x}" cy="{y}" r="40" fill="{c}"/><circle cx="{x}" cy="{y}" r="40" fill="none" stroke="#fff" stroke-width="3"/>'
        for i,ln in enumerate(n.split("\n")):
            b+=f'<text x="{x}" y="{y-2+i*14- (len(n.split(chr(10)))-1)*7}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="13" fill="#fff">{ln}</text>'
    # Legende
    b+=f'<rect x="20" y="470" width="680" height="40" rx="8" fill="#fff" stroke="#e0d4ba"/>'
    b+=f'<line x1="40" y1="490" x2="80" y2="490" stroke="#E0413A" stroke-width="3"/><text x="90" y="495" font-family="Nunito" font-weight="700" font-size="14">Gegner / Konflikt</text>'
    b+=f'<line x1="270" y1="490" x2="310" y2="490" stroke="#2E9E45" stroke-width="3" stroke-dasharray="2 8"/><text x="320" y="495" font-family="Nunito" font-weight="700" font-size="14">verbündet / unterstützt</text>'
    write("conflict.svg", svg(W,H,b))

# ======================================================================
#  Q6  Wirkungsgefüge Desertifikation
# ======================================================================
def wirkungsgefuege():
    W,H=720,560
    b=f'<rect width="{W}" height="{H}" fill="#FBF7EE"/>'
    boxes={
      "klima":(360,40,"Klimawandel &\nweniger Niederschlag","#7aa0c0"),
      "duerre":(360,150,"Dürre /\nTrockenheit","#7aa0c0"),
      "vegetation":(150,260,"weniger\nVegetation","#6a9a4a"),
      "boden":(360,300,"Boden-\ndegradation","#a86a3a"),
      "deser":(360,430,"DESERTIFIKATION\n(Wüstenbildung)","#c0622a"),
      "bevoelk":(570,60,"Bevölkerungs-\nwachstum","#9a3b8a"),
      "ueber":(570,200,"Überweidung &\nÜbernutzung","#9a3b8a"),
      "holz":(570,330,"Abholzung /\nBrennholz","#9a3b8a"),
      "hunger":(150,440,"Hungersnot /\nFlucht","#9a2b2b"),
    }
    def bx(key):
        x,y,txt,c=boxes[key]; w,h=150,56
        out=f'<rect x="{x-w/2}" y="{y}" width="{w}" height="{h}" rx="10" fill="{c}"/>'
        for i,ln in enumerate(txt.split("\n")):
            ln=ln.replace("&","&amp;")
            out+=f'<text x="{x}" y="{y+24+i*16}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="12.5" fill="#fff">{ln}</text>'
        return out
    # Pfeile (key->key, sign)
    arrows=[("klima","duerre","+"),("duerre","vegetation","–"),("duerre","boden","+"),
            ("vegetation","boden","+"),("boden","deser","+"),("bevoelk","ueber","+"),
            ("ueber","vegetation","–"),("holz","vegetation","–"),("ueber","boden","+"),
            ("holz","boden","+"),("deser","hunger","+"),("deser","duerre","+")]
    def anchor(key):
        x,y,_,_=boxes[key]; return x,y+28
    def arrowhead(x1,y1,x2,y2,col,back=30):
        # Spitze etwas vor dem Zielkasten platzieren
        ang=math.atan2(y2-y1,x2-x1)
        tx=x2-math.cos(ang)*back; ty=y2-math.sin(ang)*back
        l=11; w=6
        bx_=tx-math.cos(ang)*l; by_=ty-math.sin(ang)*l
        px=-math.sin(ang)*w; py=math.cos(ang)*w
        return (f'<line x1="{x1:.0f}" y1="{y1:.0f}" x2="{tx:.0f}" y2="{ty:.0f}" stroke="{col}" stroke-width="2.6" opacity="0.85"/>'
                f'<polygon points="{tx:.0f},{ty:.0f} {bx_+px:.0f},{by_+py:.0f} {bx_-px:.0f},{by_-py:.0f}" fill="{col}"/>')
    b_arrows=""
    for a,c,s in arrows:
        x1,y1=anchor(a); x2,y2=anchor(c)
        col="#2E9E45" if s=="+" else "#E0413A"
        mx,my=(x1+x2)/2,(y1+y2)/2
        b_arrows+=arrowhead(x1,y1,x2,y2,col)
        b_arrows+=f'<circle cx="{mx:.0f}" cy="{my:.0f}" r="9" fill="#fff" stroke="{col}" stroke-width="1.5"/><text x="{mx:.0f}" y="{my+5:.0f}" text-anchor="middle" font-family="Baloo 2" font-weight="800" font-size="14" fill="{col}">{s}</text>'
    body=b+b_arrows+"".join(bx(k) for k in boxes)
    # Legende
    body+=f'<text x="30" y="540" font-family="Nunito" font-weight="700" font-size="13" fill="#2E9E45">→ + verstärkt</text>'
    body+=f'<text x="170" y="540" font-family="Nunito" font-weight="700" font-size="13" fill="#E0413A">→ – verringert</text>'
    write("wirkungsgefuege.svg", svg(W,H,body))

# ======================================================================
#  Q7  Charts
# ======================================================================
def axis(W,H,pad):
    return f'<line x1="{pad}" y1="{H-pad}" x2="{W-10}" y2="{H-pad}" stroke="#888" stroke-width="2"/><line x1="{pad}" y1="10" x2="{pad}" y2="{H-pad}" stroke="#888" stroke-width="2"/>'

def chart_dubai_pop():
    W,H=440,300; pad=46
    years=[1950,1970,1990,2000,2010,2020]; vals=[20,60,370,860,1900,3400]  # Tsd. Einwohner
    mx=3600
    b=f'<rect width="{W}" height="{H}" fill="#fff"/>'+axis(W,H,pad)
    def X(i): return pad+ i*(W-pad-20)/(len(years)-1)
    def Y(v): return (H-pad)-v/mx*(H-pad-20)
    # Gitter + y labels
    for v in (0,1000,2000,3000):
        y=Y(v); b+=f'<line x1="{pad}" y1="{y:.0f}" x2="{W-10}" y2="{y:.0f}" stroke="#eee"/><text x="{pad-6}" y="{y+4:.0f}" text-anchor="end" font-family="Nunito" font-size="11" fill="#777">{v}</text>'
    pts=" ".join(f"{X(i):.0f},{Y(v):.0f}" for i,v in enumerate(vals))
    b+=f'<polyline points="{pts}" fill="none" stroke="{ORANGE}" stroke-width="3.5"/>'
    for i,v in enumerate(vals):
        b+=f'<circle cx="{X(i):.0f}" cy="{Y(v):.0f}" r="4" fill="{ORANGE}"/>'
        b+=f'<text x="{X(i):.0f}" y="{Y(v)-9:.0f}" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="11" fill="#c95c00">{v}</text>'
        b+=f'<text x="{X(i):.0f}" y="{H-pad+16:.0f}" text-anchor="middle" font-family="Nunito" font-size="11" fill="#555">{years[i]}</text>'
    b+=f'<text x="{pad}" y="20" font-family="Nunito" font-size="11" fill="#777">Einwohner (Tsd.)</text>'
    write("ch_dubaipop.svg", svg(W,H,b))

def chart_oil():
    W,H=440,300; pad=46
    years=[1975,1990,2000,2010,2020]; oil=[50,24,10,3,1]  # Anteil Erdöl am BIP Dubai %
    b=f'<rect width="{W}" height="{H}" fill="#fff"/>'+axis(W,H,pad)
    def X(i): return pad+ i*(W-pad-20)/(len(years)-1)
    def Y(v): return (H-pad)-v/60*(H-pad-20)
    for v in (0,20,40,60):
        y=Y(v); b+=f'<line x1="{pad}" y1="{y:.0f}" x2="{W-10}" y2="{y:.0f}" stroke="#eee"/><text x="{pad-6}" y="{y+4:.0f}" text-anchor="end" font-family="Nunito" font-size="11" fill="#777">{v}%</text>'
    pts=" ".join(f"{X(i):.0f},{Y(v):.0f}" for i,v in enumerate(oil))
    b+=f'<polygon points="{pad},{H-pad} {pts} {X(len(oil)-1):.0f},{H-pad}" fill="#2E6FB7" opacity="0.15"/>'
    b+=f'<polyline points="{pts}" fill="none" stroke="{BLUE}" stroke-width="3.5"/>'
    for i,v in enumerate(oil):
        b+=f'<circle cx="{X(i):.0f}" cy="{Y(v):.0f}" r="4" fill="{BLUE}"/><text x="{X(i):.0f}" y="{Y(v)-9:.0f}" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="11" fill="#1f5c9c">{v}%</text>'
        b+=f'<text x="{X(i):.0f}" y="{H-pad+16:.0f}" text-anchor="middle" font-family="Nunito" font-size="11" fill="#555">{years[i]}</text>'
    b+=f'<text x="{pad}" y="20" font-family="Nunito" font-size="11" fill="#777">Anteil Erdöl am BIP Dubais</text>'
    write("ch_oil.svg", svg(W,H,b))

def chart_gulf_bars():
    # Bevölkerung Golfstaaten 1970 vs 2020 (Mio.)
    W,H=440,300; pad=50
    data=[("VAE",0.2,9.9),("Katar",0.1,2.8),("Saudi-Arab.",5.8,34.8),("Kuwait",0.7,4.3),("Bahrain",0.2,1.5)]
    mx=36
    b=f'<rect width="{W}" height="{H}" fill="#fff"/>'+axis(W,H,pad)
    bw=26; gap=(W-pad-20)/len(data)
    def Y(v): return (H-pad)-v/mx*(H-pad-30)
    for v in (0,10,20,30):
        y=Y(v); b+=f'<line x1="{pad}" y1="{y:.0f}" x2="{W-10}" y2="{y:.0f}" stroke="#eee"/><text x="{pad-6}" y="{y+4:.0f}" text-anchor="end" font-family="Nunito" font-size="11" fill="#777">{v}</text>'
    for i,(nm,a,bb) in enumerate(data):
        x=pad+12+i*gap
        b+=f'<rect x="{x:.0f}" y="{Y(a):.0f}" width="{bw}" height="{(H-pad)-Y(a):.0f}" fill="#bcd0e6"/>'
        b+=f'<rect x="{x+bw:.0f}" y="{Y(bb):.0f}" width="{bw}" height="{(H-pad)-Y(bb):.0f}" fill="{ORANGE}"/>'
        b+=f'<text x="{x+bw:.0f}" y="{H-pad+15:.0f}" text-anchor="middle" font-family="Nunito" font-size="10" fill="#555">{nm}</text>'
        b+=f'<text x="{x+bw:.0f}" y="{Y(bb)-4:.0f}" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="10" fill="#c95c00">{bb}</text>'
    b+=f'<rect x="{pad+10}" y="14" width="12" height="12" fill="#bcd0e6"/><text x="{pad+26}" y="24" font-family="Nunito" font-size="11">1970</text>'
    b+=f'<rect x="{pad+80}" y="14" width="12" height="12" fill="{ORANGE}"/><text x="{pad+96}" y="24" font-family="Nunito" font-size="11">2020 (Mio. Einw.)</text>'
    write("ch_gulfbars.svg", svg(W,H,b))

def dubai_thennow():
    W,H=440,180
    b=f'<rect width="{W}" height="{H}" fill="#EaF4Fb"/>'
    # 1950 Dorf
    b+='<rect x="0" y="0" width="220" height="180" fill="#F3E2C0"/>'+dune(150,220,6,"#E8C98A")
    b+=building(40,150,26,18,"#c9a36a",winop=0)+building(80,150,30,16,"#bb9558",winop=0)+palm(140,150,1.1)
    b+='<rect x="150" y="120" width="40" height="6" fill="#7aa0c0"/>'  # Wasser/Creek
    b+='<text x="110" y="28" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="16" fill="#8a5a2a">1950 · Fischerdorf</text>'
    # heute Skyline
    b+='<rect x="220" y="0" width="220" height="180" fill="#bfe3f5"/>'
    sk=building(236,150,16,80,"#8fa9bd",winop=0.6)+'<path d="M290 150 L300 30 L310 150 Z" fill="#cdd9e4"/><line x1="300" y1="30" x2="300" y2="10" stroke="#cdd9e4" stroke-width="3"/>'+building(320,150,18,100,"#a9bfd0",winop=0.6)+building(350,150,16,64,"#9fb6c8",winop=0.6)+building(376,150,20,90,"#b3c6d6",winop=0.6)
    b+=sk+'<rect x="220" y="150" width="220" height="30" fill="#2E6FB7"/>'
    b+='<text x="330" y="28" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="16" fill="#1f5c9c">heute · Megacity</text>'
    write("dubai_thennow.svg", svg(W,H,b))

# ======================================================================
#  Q8  Bevölkerungspyramide Katar 2016  +  Migrationsarten
# ======================================================================
def pyramid_qatar():
    W,H=520,420; cx=260; pad_top=40; bot=380
    groups=["0–9","10–19","20–29","30–39","40–49","50–59","60–69","70+"]
    # Anteile in % (Katar 2016, stark männerdominiert durch Gastarbeiter)
    male=[7,4,18,22,14,8,2,1]
    female=[6,3,6,5,3,1.6,0.8,0.4]
    maxv=24; barh=(bot-pad_top)/len(groups)-6; scale=(cx-70)/maxv
    b=f'<rect width="{W}" height="{H}" fill="#fff"/>'
    b+=f'<text x="130" y="24" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="15" fill="{BLUE}">Männer</text>'
    b+=f'<text x="390" y="24" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="15" fill="{ORANGE}">Frauen</text>'
    for i,g in enumerate(reversed(groups)):
        idx=len(groups)-1-i
        y=pad_top+i*((bot-pad_top)/len(groups))
        m=male[idx]; f=female[idx]
        b+=f'<rect x="{cx-m*scale:.0f}" y="{y:.0f}" width="{m*scale:.0f}" height="{barh:.0f}" fill="{BLUE}"/>'
        b+=f'<rect x="{cx:.0f}" y="{y:.0f}" width="{f*scale:.0f}" height="{barh:.0f}" fill="{ORANGE}"/>'
        b+=f'<text x="{cx}" y="{y+barh*0.7:.0f}" text-anchor="middle" font-family="Nunito" font-size="10" font-weight="700" fill="#444">{g}</text>'
        b+=f'<text x="{cx-m*scale-4:.0f}" y="{y+barh*0.7:.0f}" text-anchor="end" font-family="Nunito" font-size="9" fill="#1f5c9c">{m}%</text>'
        b+=f'<text x="{cx+f*scale+4:.0f}" y="{y+barh*0.7:.0f}" text-anchor="start" font-family="Nunito" font-size="9" fill="#c95c00">{f}%</text>'
    b+=f'<line x1="{cx}" y1="{pad_top-6}" x2="{cx}" y2="{bot}" stroke="#888" stroke-width="1.5"/>'
    b+=f'<text x="260" y="405" text-anchor="middle" font-family="Nunito" font-size="11" fill="#777">Anteil an der Gesamtbevölkerung · Quelle: angelehnt an Daten 2016</text>'
    write("pyramid.svg", svg(W,H,b))

def migration_types():
    W,H=620,300
    b=f'<rect width="{W}" height="{H}" fill="#FBF7EE"/>'
    # Achsen: x = Dauer (temporär<->dauerhaft), y = Distanz/Grenze (national<->international)
    b+=f'<line x1="60" y1="150" x2="600" y2="150" stroke="#bbb" stroke-width="2"/>'
    b+=f'<line x1="320" y1="30" x2="320" y2="270" stroke="#bbb" stroke-width="2"/>'
    b+=f'<text x="600" y="168" text-anchor="end" font-family="Nunito" font-size="11" fill="#777">dauerhaft →</text>'
    b+=f'<text x="64" y="168" font-family="Nunito" font-size="11" fill="#777">← temporär</text>'
    b+=f'<text x="326" y="40" font-family="Nunito" font-size="11" fill="#777">international (über Grenzen)</text>'
    b+=f'<text x="326" y="266" font-family="Nunito" font-size="11" fill="#777">national (im Land)</text>'
    items=[("Arbeits-\nmigration",430,90,ORANGE),("Flucht /\nVertreibung",180,90,"#E0413A"),
           ("Land-Stadt-\nWanderung",200,210,TEAL),("Pendel-/\nSaison",430,210,"#7a5a8a")]
    for txt,x,y,c in items:
        b+=f'<circle cx="{x}" cy="{y}" r="46" fill="{c}" opacity="0.92"/>'
        for i,ln in enumerate(txt.split("\n")):
            b+=f'<text x="{x}" y="{y-2+i*15 - (len(txt.split(chr(10)))-1)*7}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="12.5" fill="#fff">{ln}</text>'
    # Gastarbeiter-Markierung
    b+=f'<circle cx="430" cy="90" r="46" fill="none" stroke="#111" stroke-width="3" stroke-dasharray="4 4"/>'
    b+=f'<text x="430" y="40" text-anchor="middle" font-family="Patrick Hand" font-size="15" fill="#111">★ Gastarbeiter Katar</text>'
    write("migration.svg", svg(W,H,b))

# ======================================================================
if __name__=="__main__":
    print("Erzeuge Assets ...")
    cover_border(); skyline(); build_icons()
    build_collage(); flyer_imgs(); oriental_city(); aerial()
    conflict(); wirkungsgefuege()
    chart_dubai_pop(); chart_oil(); chart_gulf_bars(); dubai_thennow()
    pyramid_qatar(); migration_types()
    print("fertig.")
