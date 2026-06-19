"""Kleine Zeichen-Bibliothek (flache SVG-Illustrationen) fuer das Portfolio."""
import math, random

def svg(w, h, body, extra=""):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
            f'width="{w}" height="{h}" {extra}>{body}</svg>')

def lin(id, stops, x1=0,y1=0,x2=0,y2=1):
    s="".join(f'<stop offset="{o}" stop-color="{c}"/>' for o,c in stops)
    return f'<linearGradient id="{id}" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}">{s}</linearGradient>'

def sun(cx,cy,r,c="#FFD86B",ray=True,rc="#FFD86B"):
    out=f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{c}"/>'
    if ray:
        rr=""
        for k in range(12):
            a=k*math.pi/6
            x1=cx+math.cos(a)*(r+4); y1=cy+math.sin(a)*(r+4)
            x2=cx+math.cos(a)*(r+14); y2=cy+math.sin(a)*(r+14)
            rr+=f'<line x1="{x1:.0f}" y1="{y1:.0f}" x2="{x2:.0f}" y2="{y2:.0f}" stroke="{rc}" stroke-width="3" stroke-linecap="round" opacity="0.8"/>'
        out=rr+out
    return out

def dune(y, w, amp, color, phase=0):
    pts=[f"M0 {y}"]
    n=8
    for i in range(n+1):
        x=w*i/n
        yy=y+math.sin(i*0.9+phase)*amp
        pts.append(f"L{x:.0f} {yy:.0f}")
    pts.append(f"L{w} 9999 L0 9999 Z")
    return f'<path d="{" ".join(pts)}" fill="{color}"/>'

def palm(x,y,s=1,trunk="#7a5230",leaf="#3a9d5d"):
    g=f'<g transform="translate({x},{y}) scale({s})">'
    g+='<path d="M-4 0 Q-2 -34 2 -50 L6 -50 Q2 -32 4 0 Z" fill="%s"/>'%trunk
    for ang in (-60,-30,0,30,60,90,-90):
        g+=f'<path transform="rotate({ang} 4 -50)" d="M4 -50 Q26 -60 44 -50 Q24 -50 4 -46 Z" fill="{leaf}"/>'
    g+='</g>'
    return g

def building(x,y,w,h,color,dome=False,minaret=False,win="#ffffff",winop=0.5):
    out=f'<rect x="{x}" y="{y-h}" width="{w}" height="{h}" fill="{color}"/>'
    if dome:
        out+=f'<path d="M{x} {y-h} Q{x+w/2} {y-h-w*0.7} {x+w} {y-h} Z" fill="{color}"/>'
        out+=f'<rect x="{x+w/2-1.5}" y="{y-h-w*0.7-10}" width="3" height="10" fill="{color}"/>'
    # Fenster
    cols=max(1,int(w//12)); rows=max(1,int(h//16))
    for c in range(cols):
        for r in range(rows):
            wx=x+5+c*12; wy=y-h+8+r*16
            if wy<y-6:
                out+=f'<rect x="{wx}" y="{wy}" width="5" height="8" fill="{win}" opacity="{winop}"/>'
    if minaret:
        mx=x+w+3
        out+=f'<rect x="{mx}" y="{y-h-30}" width="8" height="{h+30}" fill="{color}"/>'
        out+=f'<path d="M{mx} {y-h-30} Q{mx+4} {y-h-44} {mx+8} {y-h-30} Z" fill="{color}"/>'
    return out

def star8(cx,cy,r,color,sw=2,fill="none"):
    pts=[]
    for k in range(16):
        rr=r if k%2==0 else r*0.42
        a=k*math.pi/8 - math.pi/2
        pts.append(f"{cx+math.cos(a)*rr:.1f},{cy+math.sin(a)*rr:.1f}")
    return f'<polygon points="{" ".join(pts)}" fill="{fill}" stroke="{color}" stroke-width="{sw}"/>'

def camel(x,y,s=1,c="#6b4a2b"):
    return (f'<g transform="translate({x},{y}) scale({s})" fill="{c}">'
      '<path d="M2 0 L4 -22 L10 -22 L11 -10 Q16 -26 22 -24 Q26 -23 27 -16 '
      'Q34 -22 40 -18 L44 -16 Q47 -15 47 -10 L46 0 L42 0 L42 -10 L38 -9 '
      'L37 0 L33 0 L33 -10 L22 -12 L21 0 L17 0 L17 -12 L11 -8 L11 0 Z"/>'
      '<path d="M44 -16 Q49 -19 50 -24 L52 -23 Q51 -17 46 -14 Z"/>'
      '</g>')
