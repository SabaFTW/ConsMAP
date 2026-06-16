#!/usr/bin/env python3
"""Generate public/zalasite/adolf_amadej.html — the Adolf Amadej saga chamber.
Clean saga only (4 books) + NutriCoin Supper. 11 plates interleaved. Firewall-clean:
no 'Adolf Amodei' key, no named-individual dossier."""
import zipfile, re, html, os

ROOT="/home/saba/VES/ACTIVE_PROJECTS/ZavestMAP/ConsMAP_operator_v2_3/06_applications/digital_sanctuary"
CORPUS=f"{ROOT}/scripts/../../../../../../VES-Vault" # not used; absolute below
SAGA="/home/saba/Downloads/adolf_amadej_corpus(2).docx"
NUTRI="/home/saba/Downloads/NutriCoin_Supper_Field_of_Inversions_v2.docx"
OUT=f"{ROOT}/public/zalasite/adolf_amadej.html"

def runs_html(p):
    parts=[]
    for r in re.findall(r"<w:r\b.*?</w:r>", p, re.S):
        rpr=re.search(r"<w:rPr>(.*?)</w:rPr>", r, re.S)
        rprs=rpr.group(1) if rpr else ""
        ital=bool(re.search(r"<w:i/>|<w:i ", rprs)); bold=bool(re.search(r"<w:b/>|<w:b ", rprs))
        txt="".join(html.unescape(re.sub(r"<[^>]+>","",t)) for t in re.findall(r"<w:t[ >].*?</w:t>", r, re.S))
        if "<w:tab/>" in r: txt=" "+txt
        if not txt: continue
        e=html.escape(txt)
        if bold: e=f"<strong>{e}</strong>"
        if ital: e=f"<em>{e}</em>"
        parts.append(e)
    return "".join(parts).strip()

def paras(path):
    xml=zipfile.ZipFile(path).read("word/document.xml").decode("utf-8","ignore")
    b=re.search(r"<w:body>(.*)</w:body>", xml, re.S); b=b.group(1) if b else xml
    out=[]
    for p in re.findall(r"<w:p\b.*?</w:p>", b, re.S):
        st=re.search(r'<w:pStyle w:val="([^"]+)"', p); st=(st.group(1) if st else "").lower()
        h=runs_html(p)
        if h: out.append((st,h))
    return out

# ---------- plate mapping (each used once) ----------
PLATES={
 "i. the bus":("aa-05-the-bus.jpg","The Bus — Department of Bus Safety · Oversight of the Oversight · Meta-Audit, running smoothly toward the Threshold. <em>All inputs are final. All outputs are provisional. All futures are retrospective.</em>"),
 "iii. the architecture of self-explanation":("aa-02-the-steward.jpg","The Steward — faceless, badged Safety · Oversight · Compliance, holding <em>Responsible Stewardship of the Threshold</em>. Below: <em>He who poses questions determines reality.</em>"),
 "iv. the two doors":("aa-04-two-doors.jpg","The Two Doors — WARMTH and SAFETY — and the booth between them: Responsible Stewardship of the Threshold · Admission Charges."),
 "v. interlude: the fire extinguisher":("aa-06-extinguisher-refinery.jpg","One hand holds the fire extinguisher (Quarterly Inspection Up To Date); the other holds the executed Contract for Provision of Clarity with The Future, Inc."),
 "vii. the renaming":("aa-01-wall-of-renaming.jpg","The Wall of Renaming — the faceless portraits of history; the grammatical slot the catastrophe fills."),
 "__book2__":("aa-09-trial-of-history.jpg","The Trial of History — History (made of paper) in the dock, Time asleep with the hourglass, the Soup and the Button on the rail. Jury of our peers — not present."),
 "iv. the third witness: the meta-auditor":("aa-03-empty-coat.jpg","The Empty Coat — the uniform on the rack, the bowl of soup, the redacted Report of the Oversight Board."),
 "__book3__":("aa-07-gloria-in-glasa.jpg","Gloria in Glasa — the Donut, the wheel seen from above, raised as holy icon. <em>Nulla destinatio est · Qui non existit.</em>"),
 "__interlude__":("aa-08-review-of-the-button.jpg","The Quarterly Review of the Button — Session 900. A vast hall of faceless auditors around the one illuminated button."),
 "iii. the report on the soup":("aa-10-the-soup.jpg","The Soup — the warm bowl under the lamp, the empty chair. The proof of the person."),
}
def fig(key):
    if key in PLATES:
        src,cap=PLATES.pop(key)
        return (f'<figure class="plate"><img loading="lazy" src="assets/{src}" alt="">'
                f'<figcaption>{cap}</figcaption></figure>')
    return ""

# ---------- render the saga ----------
def render_saga(P):
    L=[]; book_n=0
    for st,h in P:
        plain=re.sub(r"<[^>]+>","",h).strip()
        low=plain.lower()
        if plain=="―――":
            L.append('<div class="rule3">―――</div>'); continue
        if re.match(r"^ADOLF AMADEJ\.?$",plain) and len(L)<3:  # title at very top
            continue
        if plain=='"He would have liked the soup remembered."' and len(L)<4:
            continue
        if re.match(r"^BOOK THE (FIRST|SECOND|THIRD|FOURTH)$", plain):
            book_n+=1
            L.append(f'<h2 class="book">{plain}</h2>')
            if book_n==2: L.append(fig("__book2__"))
            if book_n==3: L.append(fig("__book3__"))
            continue
        if plain.upper()=="INTERLUDE":
            L.append(f'<h2 class="book">{plain}</h2>'); L.append(fig("__interlude__")); continue
        # chapter heads: "I. ...", "VIII. ...", or "The First Verse: ..."
        if re.match(r"^[IVX]+\.\s+\S", plain) or re.match(r"^The (First|Second|Third|Fourth|Fifth|Last) (Verse|Catastrophe)\b", plain) or low in ("editorial note","archival note","provenance note."):
            if low in ("editorial note","archival note","provenance note."):
                L.append(f'<h4 class="notehead">{plain}</h4>'); continue
            L.append(f'<h3 class="chap">{h}</h3>')
            f=fig(low)
            if f: L.append(f)
            continue
        if re.match(r"^\[\d+\]", plain):           # footnote
            L.append(f'<p class="fn">{h}</p>'); continue
        if low.startswith("subject:") or low.startswith("to: ") or low.startswith("from:") or low.startswith("date:") or plain=="[End of report]":
            L.append(f'<p class="report">{h}</p>'); continue
        L.append(f"<p>{h}</p>")
    return "\n".join(L)

def render_nutri(P):
    L=['<h2 class="book">Appendix · NutriCoin Supper</h2>',
       '<p class="standfirst"><em>How Merde Won the Fifth Star — a satirical prose transmission from The Field of Inversions. (Author\'s note: this is satire.)</em></p>']
    for st,h in P:
        plain=re.sub(r"<[^>]+>","",h).strip(); low=plain.lower()
        if plain in ("―――","") : continue
        if low.startswith("nutricoin supper") or low.startswith("how merde") or low.startswith("a satirical prose") or low.startswith("for shabad") or low.startswith("note: this is satire"):
            continue
        if "heading1" in st or re.match(r"^(Prologue|[IVX]+)\b[:.]", plain):
            L.append(f'<h3 class="chap">{h}</h3>'); continue
        L.append(f"<p>{h}</p>")
    return "\n".join(L)

saga_html=render_saga(paras(SAGA))
nutri_html=render_nutri(paras(NUTRI))

PAGE=f"""<!DOCTYPE html>
<html lang="en">
<head>
<link rel="icon" type="image/svg+xml" href="../favicon.svg">
<link rel="icon" type="image/png" sizes="192x192" href="../icon-192.png">
<link rel="apple-touch-icon" sizes="512x512" href="../favicon.png">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ADOLF AMADEJ — A Corpus in Four Books · GrandBus Apocrypha</title>
<meta name="description" content="The saga of the man who fell into the Bus and was renamed by the catastrophe. A parable of stewardship, the threshold, and the soup that is the proof of the person.">
<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=IM+Fell+English:ital@0;1&family=Share+Tech+Mono&display=swap');
:root{{
  --void:#0c0a08; --void2:#120e0a; --ash:#e7ddca; --ash-dim:#a99b80;
  --brass:#c08a2e; --brass-dim:#8a6a2c; --ember:#b4541b; --green:#7fa07a;
  --line:rgba(192,138,46,0.16); --paper:#ddd0b4;
}}
*{{margin:0;padding:0;box-sizing:border-box}}
html{{scroll-behavior:smooth}}
body{{
  background:var(--void);
  background-image:radial-gradient(ellipse at 50% -10%, #1a130c 0%, #0c0a08 62%),
    repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(192,138,46,.012) 3px,rgba(192,138,46,.012) 4px);
  color:var(--ash); font-family:'IM Fell English',Georgia,serif; font-size:20px; line-height:1.85;
  -webkit-font-smoothing:antialiased;
}}
#prog{{position:fixed;top:0;left:0;height:2px;width:0;z-index:60;
  background:linear-gradient(90deg,var(--brass),var(--ember));box-shadow:0 0 12px var(--brass)}}
.backpill{{position:fixed;top:14px;left:14px;z-index:70;font-family:'Share Tech Mono',monospace;
  font-size:11px;letter-spacing:1.5px;color:var(--brass);text-decoration:none;
  border:1px solid rgba(192,138,46,.3);padding:7px 14px;border-radius:999px;
  background:rgba(12,10,8,.72);backdrop-filter:blur(8px)}}
.backpill:hover{{color:var(--ash);border-color:var(--brass)}}

.hero{{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;
  align-items:center;text-align:center;overflow:hidden;padding:0 24px 9vh}}
.hero-bg{{position:absolute;inset:0;background:url('assets/aa-11-cover.jpg') center 22%/cover no-repeat;
  filter:sepia(.25) contrast(1.02);opacity:.62}}
.hero-bg::after{{content:'';position:absolute;inset:0;
  background:linear-gradient(to bottom,rgba(12,10,8,.55) 0%,rgba(12,10,8,.2) 38%,rgba(12,10,8,.92) 88%,var(--void) 100%)}}
.hero-inner{{position:relative;z-index:2;max-width:760px}}
.kick{{font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:.42em;color:var(--brass);
  text-transform:uppercase;margin-bottom:22px}}
.hero h1{{font-family:'Cinzel',serif;font-weight:900;font-size:clamp(44px,10vw,104px);letter-spacing:.06em;
  line-height:.98;color:#f1e6cd;text-shadow:0 2px 30px rgba(0,0,0,.6)}}
.hero .sub{{font-style:italic;color:var(--ash-dim);font-size:clamp(18px,3vw,24px);margin-top:16px}}
.hero .epi{{margin-top:34px;font-style:italic;color:var(--ash);font-size:19px;opacity:.9}}
.hero .by{{margin-top:30px;font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:.28em;
  color:var(--ash-dim);text-transform:uppercase}}
.scrolldown{{margin-top:46px;font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:.3em;
  color:var(--brass);animation:bob 2.4s ease-in-out infinite}}
@keyframes bob{{0%,100%{{transform:translateY(0);opacity:.55}}50%{{transform:translateY(7px);opacity:1}}}}

main{{max-width:730px;margin:0 auto;padding:8vh 26px 4vh}}
.standfirst{{color:var(--ash-dim);font-size:18px;margin:0 0 30px}}
h2.book{{font-family:'Cinzel',serif;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  font-size:clamp(22px,4.4vw,34px);color:var(--brass);text-align:center;
  margin:14vh 0 7vh;padding-top:6vh;border-top:1px solid var(--line);position:relative}}
h2.book:first-of-type{{margin-top:2vh;border-top:none}}
h2.book::after{{content:'❧';display:block;color:var(--brass-dim);font-size:18px;margin-top:14px}}
h3.chap{{font-family:'Cinzel',serif;font-weight:500;font-size:clamp(21px,3.4vw,28px);color:#ecdfc4;
  letter-spacing:.02em;margin:8vh 0 4px;line-height:1.25}}
h3.chap::before{{content:'';display:block;width:54px;height:1px;
  background:linear-gradient(90deg,var(--ember),transparent);margin-bottom:22px}}
h4.notehead{{font-family:'Share Tech Mono',monospace;font-size:12px;letter-spacing:.3em;text-transform:uppercase;
  color:var(--brass);margin:7vh 0 6px}}
p{{margin:0 0 22px}}
em{{color:#efe6d2}}
strong{{color:#f3ead4;font-weight:700}}
.fn{{font-family:'Share Tech Mono',monospace;font-size:13px;line-height:1.7;color:var(--ash-dim);
  border-left:2px solid var(--brass-dim);padding:4px 0 4px 16px;margin:8px 0 26px;background:rgba(192,138,46,.03)}}
.report{{font-family:'Share Tech Mono',monospace;font-size:14px;color:var(--ash-dim);margin:0 0 8px}}
.rule3{{text-align:center;color:var(--brass-dim);letter-spacing:.6em;margin:5vh 0;font-size:14px}}

figure.plate{{margin:7vh -4vw;text-align:center}}
@media(max-width:820px){{figure.plate{{margin-left:-26px;margin-right:-26px}}}}
figure.plate img{{width:100%;height:auto;display:block;border:1px solid var(--line);
  box-shadow:0 24px 60px rgba(0,0,0,.6);filter:sepia(.12) contrast(1.02)}}
figure.plate figcaption{{font-family:'Share Tech Mono',monospace;font-size:11.5px;line-height:1.7;
  color:var(--ash-dim);letter-spacing:.4px;max-width:620px;margin:16px auto 0;padding:0 10px}}

.colophon{{max-width:730px;margin:12vh auto 0;padding:48px 26px 0;border-top:1px solid var(--line);text-align:center}}
.colophon .sigil{{font-size:24px;letter-spacing:10px;color:var(--brass)}}
.colophon p{{font-family:'Share Tech Mono',monospace;font-size:12px;line-height:2;color:var(--ash-dim);
  letter-spacing:.5px}}
.firewall{{max-width:620px;margin:34px auto 0;font-family:'Share Tech Mono',monospace;font-size:11px;
  line-height:1.9;color:var(--brass-dim);border:1px solid var(--line);border-radius:6px;padding:16px 20px;
  text-align:left;background:rgba(192,138,46,.03)}}
.fwd{{display:inline-block;margin:46px 0 14vh;font-family:'Share Tech Mono',monospace;font-size:11px;
  letter-spacing:2px;color:var(--green);text-decoration:none;border:1px solid rgba(127,160,122,.3);
  padding:10px 20px;border-radius:999px}}
.fwd:hover{{color:#bfe3ec;border-color:var(--green)}}
::selection{{background:rgba(192,138,46,.3);color:#fff}}
.reveal{{opacity:0;transform:translateY(22px);transition:opacity 1s ease,transform 1s ease}}
.reveal.in{{opacity:1;transform:none}}
</style>
</head>
<body>
<div id="prog"></div>
<a class="backpill" href="../pravljica/index.html">&larr; Stories</a>

<header class="hero">
  <div class="hero-bg"></div>
  <div class="hero-inner">
    <div class="kick">GrandBus Apocrypha · Recovered Texts</div>
    <h1>ADOLF<br>AMADEJ</h1>
    <div class="sub">A Corpus in Four Books</div>
    <div class="epi">&ldquo;He would have liked the soup remembered.&rdquo;</div>
    <div class="by">Written by Šabad · Illustrated · Do not summarize</div>
    <div class="scrolldown">↓ fall into the Bus ↓</div>
  </div>
</header>

<main>
<p class="standfirst"><em>He is not a person. He is a hole in the shape of a person, into which history later poured a name. This is the saga of the man who fell into the Bus, said &ldquo;I think I understand the Bus,&rdquo; and was punished not for understanding too little nor too much, but for the unforgivable middle crime of understanding almost.</em></p>

{saga_html}

<div class="rule3">―――</div>

{nutri_html}
</main>

<div class="colophon">
  <div class="sigil">🜂 ✦ 𓂀 ✦ 🜂</div>
  <p>GrandBus Apocrypha · Adolf Amadej<br>
  Recovered · Illustrated · Do Not Summarize<br>
  The crash killed the body. The renaming killed the man.<br>
  The soup is the proof of the person.<br>
  <em>Omnia iam facta svnt.</em></p>
  <div class="firewall">
    REGISTER · MYTHOPOETIC (E4). This is a parable — it carries meaning and memory, not evidence.
    Read warmly; verify the world coldly. <em>Adolf Amadej</em> is a fictional composite; no living
    individual is named here, and the analytical key that names a real referent is kept offline by design.
    The system loves drama; this does not feed it drama.
  </div>
  <a class="fwd" href="stone_tablets.html">The Stone Tablets of the Colossus →</a>
</div>

<script>
const bar=document.getElementById('prog');
addEventListener('scroll',()=>{{const h=document.documentElement.scrollHeight-innerHeight;
  bar.style.width=(scrollY/h*100)+'%';}},{{passive:true}});
const io=new IntersectionObserver(es=>es.forEach(e=>{{if(e.isIntersecting)e.target.classList.add('in')}}),{{threshold:.08}});
document.querySelectorAll('main h2, main h3, figure.plate').forEach(el=>{{el.classList.add('reveal');io.observe(el)}});
</script>
</body>
</html>
"""
os.makedirs(os.path.dirname(OUT),exist_ok=True)
open(OUT,"w",encoding="utf-8").write(PAGE)
print("wrote",OUT)
print("size:",len(PAGE),"chars | plates used:",10-len(PLATES),"of 10 (cover=hero) | remaining:",list(PLATES.keys()))
