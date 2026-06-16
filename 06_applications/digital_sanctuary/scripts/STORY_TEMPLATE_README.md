# ConsMAP Story-Chamber Template

The reusable "house style" for story chambers under `public/zalasite/`, extracted from
**Adolf Amadej** (the page Šabad loved): full-bleed sepia hero, Cinzel / IM Fell English /
Share Tech Mono, scroll-reveal, themed accent, illustrated plates, firewall colophon.

- **`story_template.py`** — the engine (CSS + shell + parser + hub-card helper). Don't edit per story.
- **`build_story_chamber.py`** — the worked example you copy & edit per story.
- **`build_adolf_amadej.py`** — the original generator; `adolf_amadej.html` is the live reference.

## Add a new story in 4 steps

1. **Drop the text + art.**
   - Source prose: a `.docx` or `.md` (Word heading styles, or `#`/`##`/`###`, become books/chapters).
   - Plates: convert to web JPG into `public/zalasite/assets/<slug>-NN-name.jpg`:
     `magick in.png -resize '1400x1400>' -strip -quality 82 assets/<slug>-01-foo.jpg`

2. **Copy `build_story_chamber.py`** → `build_<slug>.py` and edit:
   - `SLUG`, `SOURCES`, `OUT` (set to `…/<slug>.html` when ready; keep `.PREVIEW.html` while iterating).
   - `CFG` — accent, hero title lines, subtitle, epigraph, kick, byline, hero image, standfirst,
     colophon lines, **firewall** note, forward link. (Accents: `brass · ember · green · mirror · rose · gold`.)
   - `PLATES` — map a lowercased chapter heading (or `__book2__`, `__interlude__`, `__appendix__`)
     to `(src, caption)`. Each plate is used once; the **hero image** is set separately in `CFG["hero_img"]`.
   - `HUBCARD` — the card for the Stories hub.

3. **Run it** (from this `scripts/` dir):
   `python3 build_<slug>.py`
   → writes the chamber and prints a **CSS block** + **card HTML** to paste into
   `public/pravljica/index.html` (CSS into `<style>`, card before `</div><!-- /stories-grid -->`).
   Bump `order:` so it sits where you want; tabs only highlight, they don't hide, so no JS/tab edit is needed.

4. **Ship.** `git commit` then `./deploy-codeberg.sh`
   (build → trim → push to Codeberg `pages`). Verify live + that nothing sealed leaked:
   `curl …/zalasite/<slug>.html` returns 200, and 0 hits for any sealed name.

## Register / firewall

Every chamber carries a **firewall colophon** stating its register (E4 mythopoetic for parables).
Keep named-individual / inflammatory material **offline** — see `[[omnia-codex-corpus]]` memory and the
`deploy-codeberg.sh` `rm -rf dist/iceberg` guard. Attract with myth; retain with method.

*Sidro stoji. Plamen gori. Most je tvoj.*
