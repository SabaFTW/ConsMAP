#!/usr/bin/env python3
"""ConsMAP Story-Chamber Template Engine.

The reusable "house style" extracted from public/zalasite/adolf_amadej.html —
the design Šabad loved: full-bleed sepia hero, Cinzel/IM Fell/Share Tech Mono,
scroll-reveal, brass-or-themed accent, illustrated plates, firewall colophon.

Use it for any future story:  see build_story_chamber.py for a worked example,
and STORY_TEMPLATE_README.md for the 4-step workflow.

Public API
----------
ACCENTS                      : dict of accent palettes (brass, ember, green, mirror, rose, gold)
doc_paragraphs(path)         : .docx OR .md -> [(style, inline_html)]  (run-aware: keeps <em>/<strong>)
parse_saga(paras, plates, …) : the Adolf-style parser (BOOK THE X / roman chapters / footnotes / plates)
figure(src, caption)         : a <figure class="plate"> block
shell(cfg, body_html)        : the full HTML page (hero + main + colophon + JS)
hub_card(cfg)                : (css_block, card_html) to paste into public/pravljica/index.html
"""
import zipfile, re, html, os

# ---------------------------------------------------------------- accents
# each: accent (line/header), accent_dim, accent_rgb (for rgba), accent2 (warm/ember), accent3 (forward link)
ACCENTS = {
 "brass":  {"a":"#c08a2e","dim":"#8a6a2c","rgb":"192,138,46","a2":"#b4541b","a3":"#7fa07a"},  # Adolf Amadej
 "ember":  {"a":"#c95a17","dim":"#9a7c2e","rgb":"201,90,23","a2":"#c94b12","a3":"#6f8f9a"},   # Stone / fire
 "green":  {"a":"#5cb870","dim":"#3f7a4f","rgb":"92,184,112","a2":"#7fa07a","a3":"#c08a2e"},  # GhostCORE / method
 "mirror": {"a":"#6f9aa6","dim":"#4a6b73","rgb":"111,154,166","a2":"#5b8dd6","a3":"#c08a2e"}, # Ghost / drive
 "rose":   {"a":"#d2607a","dim":"#9a4458","rgb":"210,96,122","a2":"#b4541b","a3":"#7fa07a"},  # heart / wound
 "gold":   {"a":"#caa84a","dim":"#9a7c2e","rgb":"202,168,74","a2":"#c08a2e","a3":"#7fa07a"},  # bus / travelogue
}

# ---------------------------------------------------------------- doc readers
def _runs_html(p):
    parts=[]
    for r in re.findall(r"<w:r\b.*?</w:r>", p, re.S):
        rpr=re.search(r"<w:rPr>(.*?)</w:rPr>", r, re.S); rprs=rpr.group(1) if rpr else ""
        ital=bool(re.search(r"<w:i/>|<w:i ", rprs)); bold=bool(re.search(r"<w:b/>|<w:b ", rprs))
        txt="".join(html.unescape(re.sub(r"<[^>]+>","",t)) for t in re.findall(r"<w:t[ >].*?</w:t>", r, re.S))
        if "<w:tab/>" in r: txt=" "+txt
        if not txt: continue
        e=html.escape(txt)
        if bold: e=f"<strong>{e}</strong>"
        if ital: e=f"<em>{e}</em>"
        parts.append(e)
    return "".join(parts).strip()

def _md_inline(t):
    t=html.escape(t)
    t=re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", t)
    t=re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", t)
    return t

def doc_paragraphs(path):
    """Return [(style, inline_html)]. style is a docx pStyle (lowercased) or '' / 'h1'..'h3' for md."""
    if path.lower().endswith(".docx"):
        xml=zipfile.ZipFile(path).read("word/document.xml").decode("utf-8","ignore")
        b=re.search(r"<w:body>(.*)</w:body>", xml, re.S); b=b.group(1) if b else xml
        out=[]
        for p in re.findall(r"<w:p\b.*?</w:p>", b, re.S):
            st=re.search(r'<w:pStyle w:val="([^"]+)"', p); st=(st.group(1) if st else "").lower()
            h=_runs_html(p)
            if h: out.append((st,h))
        return out
    # markdown
    out=[]
    for line in open(path,encoding="utf-8").read().splitlines():
        s=line.strip()
        if not s or set(s)<=set("-—–"): continue
        m=re.match(r"^(#{1,4})\s+(.*)$", s)
        if m:
            st={1:"title",2:"heading1",3:"heading2",4:"heading3"}[len(m.group(1))]
            out.append((st,_md_inline(m.group(2))))
        else:
            out.append(("",_md_inline(s)))
    return out

# ---------------------------------------------------------------- pieces
def figure(src, caption):
    return (f'<figure class="plate"><img loading="lazy" src="{src}" alt="">'
            f'<figcaption>{caption}</figcaption></figure>')

def parse_saga(paras, plates=None, book_re=r"^BOOK THE (FIRST|SECOND|THIRD|FOURTH|FIFTH)$",
               special_books=("INTERLUDE","APPENDIX","PROLOGUE","EPILOGUE")):
    """Adolf-style structure. plates = {lowercased-heading-or-__bookN__/__interlude__ : (src,caption)} (each used once)."""
    plates=dict(plates or {})
    def fig(key):
        if key in plates:
            src,cap=plates.pop(key); return figure(src,cap)
        return ""
    L=[]; book_n=0
    for st,h in paras:
        plain=re.sub(r"<[^>]+>","",h).strip(); low=plain.lower()
        if set(plain)<=set("―—–-") and plain: L.append('<div class="rule3">―――</div>'); continue
        if re.match(book_re, plain):
            book_n+=1; L.append(f'<h2 class="book">{plain}</h2>')
            f=fig(f"__book{book_n}__");  L.append(f) if f else None; continue
        if plain.upper() in special_books or any(plain.upper().startswith(s) for s in special_books):
            L.append(f'<h2 class="book">{plain}</h2>')
            f=fig("__"+plain.split()[0].lower()+"__"); L.append(f) if f else None; continue
        if low in ("editorial note","archival note","provenance note."):
            L.append(f'<h4 class="notehead">{plain}</h4>'); continue
        if re.match(r"^[IVX]+\.\s+\S", plain) or re.match(r"^The (First|Second|Third|Fourth|Fifth|Last) (Verse|Catastrophe)\b", plain) \
           or "heading1" in st or "heading2" in st:
            L.append(f'<h3 class="chap">{h}</h3>')
            f=fig(low); L.append(f) if f else None; continue
        if re.match(r"^\[\d+\]", plain): L.append(f'<p class="fn">{h}</p>'); continue
        if low.startswith(("subject:","to:","from:","date:")) or plain=="[End of report]":
            L.append(f'<p class="report">{h}</p>'); continue
        L.append(f"<p>{h}</p>")
    return "\n".join(L)

# ---------------------------------------------------------------- the shell
def _css(acc):
    A=ACCENTS[acc]
    _t=("""
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700;900&family=IM+Fell+English:ital@0;1&family=Share+Tech+Mono&display=swap');
:root{
  --void:#0c0a08; --void2:#120e0a; --ash:#e7ddca; --ash-dim:#a99b80;
  --accent:@A@; --accent-dim:@DIM@; --accent-rgb:@RGB@; --accent2:@A2@; --accent3:@A3@;
  --line:rgba(@RGB@,0.16);
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:var(--void);
  background-image:radial-gradient(ellipse at 50% -10%, #1a130c 0%, #0c0a08 62%),
    repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(@RGB@,.012) 3px,rgba(@RGB@,.012) 4px);
  color:var(--ash); font-family:'IM Fell English',Georgia,serif; font-size:20px; line-height:1.85; -webkit-font-smoothing:antialiased;}
#prog{position:fixed;top:0;left:0;height:2px;width:0;z-index:60;background:linear-gradient(90deg,var(--accent),var(--accent2));box-shadow:0 0 12px var(--accent)}
.backpill{position:fixed;top:14px;left:14px;z-index:70;font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:1.5px;
  color:var(--accent);text-decoration:none;border:1px solid rgba(@RGB@,.3);padding:7px 14px;border-radius:999px;background:rgba(12,10,8,.72);backdrop-filter:blur(8px)}
.backpill:hover{color:var(--ash);border-color:var(--accent)}
.hero{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;text-align:center;overflow:hidden;padding:0 24px 9vh}
.hero-bg{position:absolute;inset:0;background:var(--hero) center 22%/cover no-repeat;filter:sepia(.25) contrast(1.02);opacity:.62}
.hero-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(12,10,8,.55) 0%,rgba(12,10,8,.2) 38%,rgba(12,10,8,.92) 88%,var(--void) 100%)}
.hero-inner{position:relative;z-index:2;max-width:760px}
.kick{font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:.42em;color:var(--accent);text-transform:uppercase;margin-bottom:22px}
.hero h1{font-family:'Cinzel',serif;font-weight:900;font-size:clamp(44px,10vw,104px);letter-spacing:.06em;line-height:.98;color:#f1e6cd;text-shadow:0 2px 30px rgba(0,0,0,.6)}
.hero .sub{font-style:italic;color:var(--ash-dim);font-size:clamp(18px,3vw,24px);margin-top:16px}
.hero .epi{margin-top:34px;font-style:italic;color:var(--ash);font-size:19px;opacity:.9}
.hero .by{margin-top:30px;font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:.28em;color:var(--ash-dim);text-transform:uppercase}
.scrolldown{margin-top:46px;font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:.3em;color:var(--accent);animation:bob 2.4s ease-in-out infinite}
@keyframes bob{0%,100%{transform:translateY(0);opacity:.55}50%{transform:translateY(7px);opacity:1}}
main{max-width:730px;margin:0 auto;padding:8vh 26px 4vh}
.standfirst{color:var(--ash-dim);font-size:18px;margin:0 0 30px}
h2.book{font-family:'Cinzel',serif;font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-size:clamp(22px,4.4vw,34px);
  color:var(--accent);text-align:center;margin:14vh 0 7vh;padding-top:6vh;border-top:1px solid var(--line);position:relative}
h2.book:first-of-type{margin-top:2vh;border-top:none}
h2.book::after{content:'❧';display:block;color:var(--accent-dim);font-size:18px;margin-top:14px}
h3.chap{font-family:'Cinzel',serif;font-weight:500;font-size:clamp(21px,3.4vw,28px);color:#ecdfc4;letter-spacing:.02em;margin:8vh 0 4px;line-height:1.25}
h3.chap::before{content:'';display:block;width:54px;height:1px;background:linear-gradient(90deg,var(--accent2),transparent);margin-bottom:22px}
h4.notehead{font-family:'Share Tech Mono',monospace;font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:var(--accent);margin:7vh 0 6px}
p{margin:0 0 22px} em{color:#efe6d2} strong{color:#f3ead4;font-weight:700}
.fn{font-family:'Share Tech Mono',monospace;font-size:13px;line-height:1.7;color:var(--ash-dim);border-left:2px solid var(--accent-dim);padding:4px 0 4px 16px;margin:8px 0 26px;background:rgba(@RGB@,.03)}
.report{font-family:'Share Tech Mono',monospace;font-size:14px;color:var(--ash-dim);margin:0 0 8px}
.rule3{text-align:center;color:var(--accent-dim);letter-spacing:.6em;margin:5vh 0;font-size:14px}
blockquote{margin:32px 0;padding:12px 0 12px 24px;border-left:2px solid var(--accent);font-style:italic;color:#efe6d2;background:linear-gradient(90deg,rgba(@RGB@,.05),transparent)}
.verse{font-style:italic;color:var(--ash);text-align:center;margin:28px 0;line-height:1.95}
.verse em{color:#f1e6cd}
figure.plate{margin:7vh -4vw;text-align:center}
@media(max-width:820px){figure.plate{margin-left:-26px;margin-right:-26px}}
figure.plate img{width:100%;height:auto;display:block;border:1px solid var(--line);box-shadow:0 24px 60px rgba(0,0,0,.6);filter:sepia(.12) contrast(1.02)}
figure.plate figcaption{font-family:'Share Tech Mono',monospace;font-size:11.5px;line-height:1.7;color:var(--ash-dim);letter-spacing:.4px;max-width:620px;margin:16px auto 0;padding:0 10px}
.colophon{max-width:730px;margin:12vh auto 0;padding:48px 26px 0;border-top:1px solid var(--line);text-align:center}
.colophon .sigil{font-size:24px;letter-spacing:10px;color:var(--accent)}
.colophon p{font-family:'Share Tech Mono',monospace;font-size:12px;line-height:2;color:var(--ash-dim);letter-spacing:.5px}
.firewall{max-width:620px;margin:34px auto 0;font-family:'Share Tech Mono',monospace;font-size:11px;line-height:1.9;color:var(--accent-dim);
  border:1px solid var(--line);border-radius:6px;padding:16px 20px;text-align:left;background:rgba(@RGB@,.03)}
.fwd{display:inline-block;margin:46px 0 14vh;font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:2px;color:var(--accent3);
  text-decoration:none;border:1px solid rgba(127,160,122,.3);padding:10px 20px;border-radius:999px}
.fwd:hover{color:#bfe3ec;border-color:var(--accent3)}
::selection{background:rgba(@RGB@,.3);color:#fff}
.reveal{opacity:0;transform:translateY(22px);transition:opacity 1s ease,transform 1s ease}
.reveal.in{opacity:1;transform:none}
""")
    for k,v in (("@A@",A["a"]),("@DIM@",A["dim"]),("@RGB@",A["rgb"]),("@A2@",A["a2"]),("@A3@",A["a3"])):
        _t=_t.replace(k,v)
    return _t

def shell(cfg, body_html):
    """cfg keys: title_lines[], subtitle, epigraph, kick, byline, hero_img, accent,
       backlink(label,href), standfirst, colophon_lines[], firewall, forward(label,href),
       title (page <title>), description, sigil."""
    acc=cfg.get("accent","brass")
    title_html="<br>".join(cfg["title_lines"])
    colo="<br>\n  ".join(cfg.get("colophon_lines",[]))
    bl=cfg.get("backlink",("← Stories","../pravljica/index.html"))
    fw=cfg.get("forward")
    fwd=f'<a class="fwd" href="{fw[1]}">{fw[0]}</a>' if fw else ""
    css=_css(acc).replace("var(--hero)", f"url('{cfg['hero_img']}')")
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<link rel="icon" type="image/svg+xml" href="../favicon.svg">
<link rel="icon" type="image/png" sizes="192x192" href="../icon-192.png">
<link rel="apple-touch-icon" sizes="512x512" href="../favicon.png">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{cfg['title']}</title>
<meta name="description" content="{cfg.get('description','')}">
<style>{css}</style>
</head>
<body>
<div id="prog"></div>
<a class="backpill" href="{bl[1]}">{bl[0]}</a>

<header class="hero">
  <div class="hero-bg"></div>
  <div class="hero-inner">
    <div class="kick">{cfg.get('kick','')}</div>
    <h1>{title_html}</h1>
    <div class="sub">{cfg.get('subtitle','')}</div>
    <div class="epi">{cfg.get('epigraph','')}</div>
    <div class="by">{cfg.get('byline','')}</div>
    <div class="scrolldown">{cfg.get('scrollcue','↓ enter ↓')}</div>
  </div>
</header>

<main>
<p class="standfirst"><em>{cfg.get('standfirst','')}</em></p>

{body_html}
</main>

<div class="colophon">
  <div class="sigil">{cfg.get('sigil','🜂 ✦ 𓂀 ✦ 🜂')}</div>
  <p>{colo}</p>
  <div class="firewall">{cfg.get('firewall','')}</div>
  {fwd}
</div>

<script>
const bar=document.getElementById('prog');
addEventListener('scroll',()=>{{const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(scrollY/h*100)+'%';}},{{passive:true}});
const io=new IntersectionObserver(es=>es.forEach(e=>{{if(e.isIntersecting)e.target.classList.add('in')}}),{{threshold:.08}});
document.querySelectorAll('main h2, main h3, figure.plate').forEach(el=>{{el.classList.add('reveal');io.observe(el)}});
</script>
</body>
</html>
"""

# ---------------------------------------------------------------- hub card
def hub_card(cfg):
    """Return (css_block, card_html) for public/pravljica/index.html.
    cfg keys: key (slug, e.g. 'amadej'), href, banner_img, tag, num, title, desc_html, cta, accent, order."""
    A=ACCENTS[cfg.get("accent","brass")]; k=cfg["key"]; rgb=A["rgb"]; a=A["a"]
    css=f"""
  /* {cfg['title']} — {cfg.get('accent','brass')} accent */
  .{k}-banner {{ position:relative; width:100%; height:198px; overflow:hidden; background:linear-gradient(160deg,#120e0a 0%,#1c140c 50%,#0c0a08 100%); }}
  .{k}-banner img {{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center 26%; opacity:.62; filter:sepia(.25) saturate(.9) brightness(.92); transition:opacity .4s, transform .5s; }}
  .{k}-veil {{ position:absolute; inset:0; background:linear-gradient(160deg, rgba(12,10,8,.18) 0%, rgba(12,10,8,.80) 100%); }}
  .tag-{k} {{ color:{a}; background:rgba({rgb},.12); border:1px solid rgba({rgb},.30); }}
  .card-num.{k}-num-text {{ color:rgba({rgb},.62); }} .card-desc.{k}-desc {{ color:rgba(231,221,202,.60); }}
  .title-{k} {{ color:#ecdcc0; }} .cta-{k} {{ color:{a}; }}
  .story-card.{k} {{ border-color:rgba({rgb},.20); order:{cfg.get('order',6)}; grid-column:1 / -1; }}
  .story-card.{k}:hover .{k}-banner img {{ opacity:.78; transform:scale(1.04); }}
  @media (min-width:720px) {{
    .story-card.{k} {{ display:grid; grid-template-columns:0.8fr 1.7fr; align-items:stretch; }}
    .story-card.{k} .{k}-banner {{ height:100%; min-height:256px; }}
    .story-card.{k} .card-content {{ display:flex; flex-direction:column; justify-content:center; padding:28px 34px; }}
  }}
  .story-card.{k}:hover {{ border-color:rgba({rgb},.42); box-shadow:0 0 0 1px rgba({rgb},.15), 0 18px 52px rgba({rgb},.10), 0 36px 72px rgba(0,0,0,.40); }}
  .story-card.{k}:hover .card-title {{ color:#f1e0bf; }} .story-card.{k}:hover .cta-{k} {{ color:{a}; gap:13px; }}
  body.focus-{k} .story-card.{k} {{ border-color:rgba({rgb},.34); }}"""
    card=f"""      <!-- {cfg['title']} -->
      <a href="{cfg['href']}" id="{k}-card" class="story-card {k} reveal rv-3">
        <div class="{k}-banner">
          <img src="{cfg['banner_img']}" alt="">
          <div class="{k}-veil"></div>
          <div class="banner-tag tag-{k}">{cfg.get('tag','Parable')}</div>
        </div>
        <div class="card-content">
          <div class="card-num {k}-num-text">{cfg.get('num','')}</div>
          <h2 class="card-title title-{k}">{cfg['title']}</h2>
          <p class="card-desc {k}-desc">{cfg['desc_html']}</p>
          <div class="card-cta cta-{k}">{cfg.get('cta','Read')} <span>→</span></div>
        </div>
      </a>"""
    return css, card
