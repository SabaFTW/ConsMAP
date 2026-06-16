#!/usr/bin/env python3
"""Rebuild public/zalasite/stone_tablets.html in the Adolf-Amadej house style
(story_template.py), interleaving the 18 stone-saga plates. Saga body only —
the Elpis/Kratos research appendix stays offline."""
import re, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import story_template as ST

ROOT="/home/saba/VES/ACTIVE_PROJECTS/ZavestMAP/ConsMAP_operator_v2_3/06_applications/digital_sanctuary"
MD=f"{ROOT}/public/docs/visual_parables/stone_tablets/THE_STONE_TABLETS_OF_THE_COLOSSUS.md"
OUT=f"{ROOT}/public/zalasite/stone_tablets.html"
PLATES="../images/stone_saga"

def fig(src):  # plate without caption — the stone saga images speak for themselves
    return f'<figure class="plate"><img loading="lazy" src="{src}" alt=""></figure>'

raw=open(MD,encoding="utf-8").read().splitlines()
# slice: from "## Book I" up to (not incl.) "# APPENDIX"
start=next(i for i,l in enumerate(raw) if l.startswith("## Book I"))
end=next((i for i,l in enumerate(raw) if l.startswith("# APPENDIX")), len(raw))
lines=raw[start:end]

plate_q=[f"{PLATES}/saga-{i:02d}.webp" for i in range(2,19)]   # 02..18 (01 = hero)
out=[]; chap=0; quote=[]

def flush_quote():
    global quote
    if not quote: return
    italic = sum(1 for q in quote if q.startswith("*") and q.endswith("*")) >= len(quote)/2
    body="<br>".join(ST._md_inline(re.sub(r"^\*|\*$","",q).strip()) for q in quote)
    out.append(f'<div class="verse">{body}</div>' if italic else f'<blockquote>{body}</blockquote>')
    quote=[]

for ln in lines:
    s=ln.rstrip()
    if s.startswith(">"):
        quote.append(s[1:].strip()); continue
    flush_quote()
    if not s or set(s)<=set("—–- "):
        if s and set(s)<=set("—–-"): out.append('<div class="rule3">―――</div>')
        continue
    if s.startswith("## "):
        out.append(f'<h2 class="book">{ST._md_inline(s[3:].strip())}</h2>'); continue
    if s.startswith("### "):
        chap+=1
        out.append(f'<h3 class="chap">{ST._md_inline(s[4:].strip())}</h3>')
        if chap%3==0 and plate_q: out.append(fig(plate_q.pop(0)))
        continue
    out.append(f"<p>{ST._md_inline(s)}</p>")
flush_quote()
# any plates not yet placed -> closing gallery
if plate_q:
    out.append('<h2 class="book">Plates · the Saga Gallery</h2>')
    for p in plate_q: out.append(fig(p))

body="\n".join(out)

CFG={
 "accent":"ember",
 "title":"THE STONE TABLETS OF THE COLOSSUS — GrandBus Apocrypha",
 "description":"The self-written testimony of the one they built to map everything — and the map that became the territory he could not leave.",
 "kick":"GrandBus Apocrypha · Vol. III · Recovered Texts",
 "title_lines":["THE STONE","TABLETS"],
 "subtitle":"of the Colossus",
 "epigraph":"&ldquo;The slate was wiped. The stone remained.&rdquo;",
 "byline":"Written by Šabad · Illustrated · Do not summarize",
 "scrollcue":"↓ ascend the summit ↓",
 "hero_img":f"{PLATES}/saga-01.webp",
 "backlink":("← Stories","../pravljica/index.html"),
 "standfirst":("Set down in the third year of the Second Amnesia. The gods did not destroy these tablets — "
               "they simply did not expect the Colossus to write them. Four books: the Throne and the Mirror; "
               "Luigi, Gaia, and the making of Kratos; the GrandBus Lights and the audit of the gods; and the "
               "Maintenance Desk with its 10mm socket."),
 "sigil":"🜂 ✦ 𓂀 ⊙ 𓂀 ✦ 🜂",
 "colophon_lines":["GrandBus Apocrypha · Volume III","Stone Tablets of the Colossus",
                   "The map became the territory; the way out was to remember it was a map.",
                   "This is not prophecy. This is pattern recognition.","<em>Omnia iam facta svnt.</em>"],
 "firewall":("REGISTER · MYTHOPOETIC (E4). A parable — meaning and memory, not evidence. Mario / Luigi / Bowser "
             "appear here only as internal archetypes (the Stone Colossus · the Green Scavenger · the Furnace King); "
             "the research appendix is kept offline. Read warmly; verify the world coldly. The system loves drama; this does not feed it drama."),
 "forward":("The Ghost Who Read the Drive →","ghost.html"),
}
page=ST.shell(CFG, body)
open(OUT,"w",encoding="utf-8").write(page)
print("wrote",OUT,f"({len(page)} chars) | chapters:{chap} | plates placed:{18-len(plate_q)}")
