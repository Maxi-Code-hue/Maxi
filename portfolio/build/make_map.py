#!/usr/bin/env python3
"""Erzeugt eine SVG-Karte von Nordafrika & Nahem/Mittlerem Osten fuer Quest 2."""
import json, math, os

HERE = os.path.dirname(__file__)
geo = json.load(open(os.path.join(HERE, "ne50.geojson")))

# ---- Kartenausschnitt (Längengrad/Breitengrad) ----
LON_MIN, LON_MAX = -18, 67
LAT_MIN, LAT_MAX = 7.5, 41
W, H = 1180, 720
PAD = 4

def merc_y(lat):
    return math.log(math.tan(math.pi/4 + math.radians(lat)/2))

YMIN, YMAX = merc_y(LAT_MIN), merc_y(LAT_MAX)

def project(lon, lat):
    x = (lon - LON_MIN) / (LON_MAX - LON_MIN) * (W - 2*PAD) + PAD
    y = (YMAX - merc_y(lat)) / (YMAX - YMIN) * (H - 2*PAD) + PAD
    return x, y

# ---- Regionen-Zuordnung (Schulbuch M3) ----
MAGHREB   = {"MAR","DZA","TUN","LBY","MRT","ESH"}
NAHER     = {"EGY","ISR","PSE","LBN","SYR","JOR","IRQ","SAU","KWT","BHR","QAT","ARE","OMN","YEM"}
MITTLERER = {"IRN","AFG","PAK"}
# Nachbarn nur als Kontext (grau)
CONTEXT   = {"TUR","CYP","GRC","ITA","ESP","SDN","SSD","TCD","NER","MLI","ETH","ERI","DJI","SOM"}

COL = {
    "maghreb":   "#E9963A",   # warmes Orange
    "naher":     "#4F86C6",   # Blau
    "mittlerer": "#7CB6A6",   # Türkisgrün
    "context":   "#E4E1DA",   # hellgrau
    "sea":       "#CFE6F2",
}

def iso(p):
    a = p.get("ISO_A3")
    if a in (None,"-99"): a = p.get("ISO_A3_EH")
    return a

def region_of(a):
    if a in MAGHREB: return "maghreb"
    if a in NAHER: return "naher"
    if a in MITTLERER: return "mittlerer"
    if a in CONTEXT: return "context"
    return None

# deutsche Namen (Kurzform für die Karte)
LABELS = {
 "MAR":"Marokko","DZA":"Algerien","TUN":"Tunesien","LBY":"Libyen","MRT":"Mauretanien",
 "ESH":"West-\nsahara","EGY":"Ägypten","ISR":"Israel","PSE":"Palästina","LBN":"Libanon",
 "SYR":"Syrien","JOR":"Jordanien","IRQ":"Irak","SAU":"Saudi-\nArabien","KWT":"Kuwait",
 "BHR":"Bahrain","QAT":"Katar","ARE":"VAE","OMN":"Oman","YEM":"Jemen",
 "IRN":"Iran","AFG":"Afghanistan","PAK":"Pakistan",
 "TUR":"Türkei","CYP":"Zypern","SDN":"Sudan","TCD":"Tschad","NER":"Niger",
 "MLI":"Mali","ETH":"Äthiopien","ESP":"Spanien","ITA":"Italien","GRC":"Griechenl.",
}
# manuelle Label-Positionen (lon,lat) für saubere Platzierung; sonst Centroid
LABELPOS = {
 "MAR":(-6.5,31.5),"DZA":(2.5,27.8),"TUN":(9.6,34.2),"LBY":(17.5,27.0),"EGY":(29.5,26.5),
 "MRT":(-10.5,20.5),"ESH":(-13.5,24.8),"SAU":(45.0,23.5),"YEM":(47.5,15.5),"OMN":(56.5,21.0),
 "ARE":(54.6,23.9),"QAT":(51.3,25.4),"BHR":(50.6,26.4),"KWT":(47.9,29.4),"IRQ":(43.8,33.0),
 "IRN":(54.0,32.5),"SYR":(38.7,35.2),"JOR":(38.2,30.3),"ISR":(33.2,30.0),"PSE":(36.0,32.6),
 "LBN":(37.6,33.9),"AFG":(66.0,34.0),"PAK":(69.5,30.0),"TUR":(35.0,39.2),"SDN":(30.0,15.5),
}

def ring_to_path(ring):
    pts = []
    for lon, lat in ring:
        x, y = project(lon, lat)
        pts.append(f"{x:.1f},{y:.1f}")
    return "M" + "L".join(pts) + "Z"

# Leader-Linien für kleine, versetzt beschriftete Länder: iso -> (anchor_lon, anchor_lat)
LEADER = {
 "JOR":(36.3,31.2),"ISR":(34.9,31.4),"PSE":(35.2,32.0),"LBN":(35.9,33.9),
}
leaders = []
paths = []
labels = []
for ft in geo["features"]:
    p = ft["properties"]
    a = iso(p)
    reg = region_of(a)
    if reg is None:
        continue
    geom = ft["geometry"]
    polys = geom["coordinates"] if geom["type"]=="MultiPolygon" else [geom["coordinates"]]
    d = ""
    for poly in polys:
        for ring in poly:
            # nur grob im Ausschnitt
            d += ring_to_path(ring)
    fill = COL[reg]
    sw = 0.8 if reg=="context" else 1.1
    paths.append(f'<path d="{d}" fill="{fill}" stroke="#ffffff" stroke-width="{sw}" stroke-linejoin="round"/>')

    if a in LABELS and reg!="context" or (a in LABELS and a in ("TUR","SDN")):
        if a in LABELPOS:
            lon, lat = LABELPOS[a]
        else:
            continue
        x, y = project(lon, lat)
        if a in LEADER:
            ax, ay = project(*LEADER[a])
            leaders.append(f'<line x1="{x:.1f}" y1="{y-4:.1f}" x2="{ax:.1f}" y2="{ay:.1f}" stroke="#1d2b3a" stroke-width="0.8"/>')
            leaders.append(f'<circle cx="{ax:.1f}" cy="{ay:.1f}" r="1.6" fill="#1d2b3a"/>')
        small = a in ("BHR","QAT","ARE","KWT","LBN","PSE","ISR","ESH")
        fs = 13 if small else 17
        cls = "lbl small" if small else "lbl"
        lines = LABELS[a].split("\n")
        for i,ln in enumerate(lines):
            labels.append(f'<text class="{cls}" x="{x:.1f}" y="{y+ i*fs:.1f}">{ln}</text>')

# ---- Markierungspunkte ----
dots = []
def add_dot(lon, lat, color, name, dx=8, dy=-8, anchor="start"):
    x, y = project(lon, lat)
    dots.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="7" fill="{color}" stroke="#222" stroke-width="1.5"/>')
    dots.append(f'<text class="dot" x="{x+dx:.1f}" y="{y+dy:.1f}" text-anchor="{anchor}" fill="#222">{name}</text>')

add_dot(55.27, 25.20, "#2ecc40", "Dubai", dx=9, dy=-9)            # grün
add_dot(51.53, 25.28, "#ffd400", "Katar", dx=-9, dy=22, anchor="end")  # gelb
add_dot(34.47, 31.50, "#ff4136", "Gaza", dx=-9, dy=-9, anchor="end")   # rot

# ---- Regionen-Trennlinien (geschwungen, handgezeichnet-Stil) ----
def pline(coords, color, label=None, lx=0, ly=0):
    pts=[]
    for lon,lat in coords:
        x,y=project(lon,lat); pts.append(f"{x:.0f},{y:.0f}")
    return f'<polyline points="{" ".join(pts)}" fill="none" stroke="{color}" stroke-width="3.5" stroke-dasharray="2 7" stroke-linecap="round" opacity="0.85"/>'

borders=[]
# Grenze Maghreb | Naher Osten (zwischen Libyen und Ägypten)
borders.append(pline([(25,33),(25,30),(24.5,25),(24,20)], "#b34700"))
# Grenze Naher Osten | Mittlerer Osten (Westgrenze Iran/Afgh/Pak)
borders.append(pline([(46,37),(48,34),(49,30),(56,26),(61,25)], "#1f5c3f"))

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
<defs>
<style>
 .lbl {{ font-family:'Nunito','DejaVu Sans',sans-serif; font-weight:800; font-size:17px; fill:#1d2b3a; text-anchor:middle; }}
 .lbl.small {{ font-size:12.5px; }}
 .dot {{ font-family:'Nunito',sans-serif; font-weight:800; font-size:18px; }}
 .leg {{ font-family:'Nunito',sans-serif; font-weight:700; font-size:18px; fill:#222; }}
 .legt {{ font-family:'Baloo 2','Fredoka',sans-serif; font-weight:700; font-size:21px; fill:#222; }}
</style>
</defs>
<rect x="0" y="0" width="{W}" height="{H}" fill="{COL['sea']}"/>
{''.join(paths)}
{''.join(borders)}
{''.join(leaders)}
{''.join(labels)}
{''.join(dots)}
</svg>'''

out = os.path.join(os.path.dirname(HERE), "assets", "img", "map_region.svg")
open(out, "w").write(svg)
print("geschrieben:", out, len(svg), "bytes")
