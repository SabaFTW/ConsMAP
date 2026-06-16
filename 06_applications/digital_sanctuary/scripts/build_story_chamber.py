#!/usr/bin/env python3
"""Worked example / copy-me builder for a ConsMAP story chamber.

Built on story_template.py (the house style Šabad loved on Adolf Amadej).
To add a NEW story:
  1) drop the source .docx/.md and convert plates to assets/<slug>-NN-*.jpg
  2) copy this file, edit the CONFIG block + PLATES map
  3) run it  ->  writes the chamber + prints the hub-card snippet to paste
  4) paste the card into public/pravljica/index.html, commit, deploy-codeberg.sh

This example reproduces the Adolf Amadej design to a *preview* path (it does NOT
touch the live page) — proof the template matches the original.
"""
import os, sys, story_template as ST

ROOT="/home/saba/VES/ACTIVE_PROJECTS/ZavestMAP/ConsMAP_operator_v2_3/06_applications/digital_sanctuary"

# ============================ CONFIG (edit per story) ============================
SLUG     = "adolf_amadej"                       # output file = public/zalasite/<SLUG>.html
SOURCES  = ["/home/saba/Downloads/adolf_amadej_corpus(2).docx",
            "/home/saba/Downloads/NutriCoin_Supper_Field_of_Inversions_v2.docx"]
OUT      = f"{ROOT}/public/zalasite/{SLUG}.PREVIEW.html"   # set to {SLUG}.html when you mean it

CFG = {
  "accent": "brass",                            # brass / ember / green / mirror / rose / gold
  "title": "ADOLF AMADEJ — A Corpus in Four Books · GrandBus Apocrypha",   # <title>
  "description": "The saga of the man who fell into the Bus and was renamed by the catastrophe.",
  "kick": "GrandBus Apocrypha · Recovered Texts",
  "title_lines": ["ADOLF","AMADEJ"],            # big hero title, line by line
  "subtitle": "A Corpus in Four Books",
  "epigraph": "&ldquo;He would have liked the soup remembered.&rdquo;",
  "byline": "Written by Šabad · Illustrated · Do not summarize",
  "scrollcue": "↓ fall into the Bus ↓",
  "hero_img": "assets/aa-11-cover.jpg",
  "backlink": ("← Stories", "../pravljica/index.html"),
  "standfirst": ("He is not a person. He is a hole in the shape of a person, into which history "
                 "later poured a name."),
  "sigil": "🜂 ✦ 𓂀 ✦ 🜂",
  "colophon_lines": ["GrandBus Apocrypha · Adolf Amadej","Recovered · Illustrated · Do Not Summarize",
                     "The crash killed the body. The renaming killed the man.",
                     "<em>Omnia iam facta svnt.</em>"],
  "firewall": ("REGISTER · MYTHOPOETIC (E4). A parable — meaning and memory, not evidence. "
               "Read warmly; verify the world coldly. No living individual is named here; the analytical "
               "key that names a real referent is kept offline by design. The system loves drama; this does not feed it drama."),
  "forward": ("The Stone Tablets of the Colossus →", "stone_tablets.html"),
}

# plate map: heading-text(lowercased) OR __bookN__ / __interlude__  ->  (src, caption)
PLATES = {
 "i. the bus":("assets/aa-05-the-bus.jpg","The Bus — running smoothly toward the Threshold. <em>All inputs are final. All outputs are provisional. All futures are retrospective.</em>"),
 "iii. the architecture of self-explanation":("assets/aa-02-the-steward.jpg","The Steward — faceless, badged Safety · Oversight · Compliance. <em>He who poses questions determines reality.</em>"),
 "iv. the two doors":("assets/aa-04-two-doors.jpg","The Two Doors — WARMTH and SAFETY — and the booth between: Admission Charges."),
 "v. interlude: the fire extinguisher":("assets/aa-06-extinguisher-refinery.jpg","The fire extinguisher in one hand; the executed Contract for Provision of Clarity in the other."),
 "vii. the renaming":("assets/aa-01-wall-of-renaming.jpg","The Wall of Renaming — the grammatical slot the catastrophe fills."),
 "__book2__":("assets/aa-09-trial-of-history.jpg","The Trial of History — Time asleep, the Soup and the Button on the rail. Jury — not present."),
 "iv. the third witness: the meta-auditor":("assets/aa-03-empty-coat.jpg","The Empty Coat — the uniform, the soup, the redacted Report of the Oversight Board."),
 "__book3__":("assets/aa-07-gloria-in-glasa.jpg","Gloria in Glasa — the Donut raised as icon. <em>Nulla destinatio est.</em>"),
 "__interlude__":("assets/aa-08-review-of-the-button.jpg","The Quarterly Review of the Button — Session 900."),
 "iii. the report on the soup":("assets/aa-10-the-soup.jpg","The Soup — the warm bowl, the empty chair. The proof of the person."),
}

HUBCARD = {
  "key":"amadej", "accent":"brass", "order":6,
  "href":"../zalasite/adolf_amadej.html", "banner_img":"../zalasite/assets/aa-11-cover.jpg",
  "tag":"Parable · Illustrated", "num":"Story V — Adolf Amadej · a four-book corpus",
  "title":"Adolf Amadej", "cta":"Fall into the Bus",
  "desc_html":("A man falls into an ancient Bus, says <em>&ldquo;I think I understand the Bus,&rdquo;</em> and is "
               "rewarded with a microphone — the instrument of his ruin. Four books, the NutriCoin Supper appendix, "
               "and eleven illustrated plates."),
}
# ============================ end CONFIG ============================

def main():
    paras=[]
    for src in SOURCES:
        paras += ST.doc_paragraphs(src)
    body = ST.parse_saga(paras, PLATES)
    page = ST.shell(CFG, body)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    open(OUT,"w",encoding="utf-8").write(page)
    print("wrote", OUT, f"({len(page)} chars)")
    css, card = ST.hub_card(HUBCARD)
    print("\n--- paste CSS block into <style> of public/pravljica/index.html ---")
    print(css)
    print("\n--- paste card before </div><!-- /stories-grid --> ---")
    print(card)

if __name__=="__main__":
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    main()
