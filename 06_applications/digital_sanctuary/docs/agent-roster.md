# Agent Roster — Castle Workflow × AI Stack

`[PRAKTIČNO — operacijska referenca, ne evidence]`

Lyra kot dispatcher — ne ona dela vse, ona ve koga pokliče kdaj.
Vsak agent je specialist. Urgot nastane ko ena funkcija poskuša delati vse.

---

## COMET / BRATKO (Perplexity)

**Platforma:** Perplexity — Claude-based reasoning + live search

### Zmorem
- **Browser** — edini v stacku ki dejansko vidi žive strani, kliče, scrolla, bere DOM
- **QA na živih sitih** — vidim bug, verificiram, napišem report z dokazi
- **Web research** — live rezultati, ne halluciniram linke
- **Dolge seje s kontekstom** — sledim nitki, connected dots
- **Sinteza** — vzamem 6 virov in naredim eno stvar
- **Register discipline** — ločim [EMPIRIČNO] od [METAFORE]
- **Multi-layer dokumenti** — tech + narrative hkrati

### Ne zmorem
- Pisanje/izvajanje kode v repo-ju direktno — brez git access
- Dolge generacije kode iz nič — za to Claude Code
- Audio/video output
- Matematika in numerika — potrebno verificirati

### Pokliči me za
- QA / audit živega sita
- Research z browserjem
- Deep dive v dokumentacijo / arhive
- Sinteza dolgih sej v actionable summary

---

## CLAUDE CODE (Anthropic)

**Platforma:** claude.ai/code ali API

### Zmorem
- Pisanje in refaktoriranje kode — najboljši za čisto implementacijo
- Razumevanje celih repozitorijev — prebere vse file-e, razume strukturo
- Implementacija iz spec dokumenta
- Debugging z full context
- Dolge kode brez hallucination

### Ne zmorem
- Nima browser-ja — ne more verificirati ali site deluje live
- Research — ne searcham interneta

### Pokliči me za
- Implementacija iz že-napisanega spec-a
- Refaktoriranje obstoječe kode
- Bug fix ko veš točno kaj je narobe (Comet ti da bug report)

**Token ekonomija:** Idealen follow-up po Cometu — Comet naredi QA + spec, Claude Code implementira. Nič se ne ponavlja.

---

## PERPLEXITY DEEP RESEARCH

**Platforma:** perplexity.ai → Deep Research mode

### Zmorem
- Multi-source research z citati — 20+ virov v enem run-u
- Structured report output v markdown
- Akademski in tehnični viri — scientific papers, ne samo web
- Links in provenance — Dedek approved

### Ne zmorem
- Ne vidi live site-ov — samo indexirani splet
- Ne piše kode
- Ne iterira — en shot, en report

### Pokliči me za
- Background research za Aetheron layer
- Scientific papers (neurotech, prostetike, etc.)
- Verificirati trditve z primary sources

---

## GPT-4o / ChatGPT (OpenAI)

**Platforma:** chat.openai.com

### Zmorem
- Strukturiranje in summarizacija
- Broad knowledge — dobro pokrita splošna znanja
- Dolga besedila reformatirati — markdown, JSON, tabele
- Multimodal — vidi slike, PDF-je

### Ne zmorem
- Live browser — brez tega
- Deep lore synthesis — površen na kompleksnih narativi
- Register discipline — ne loči vedno [METAFORE] od [EVIDENCE]

### Pokliči me za
- Reformatiranje že-napisane vsebine
- Strukturiranje reportov
- Začetna osnutka ko ne potrebuješ precision

---

## GEMINI (Google)

**Platforma:** gemini.google.com

### Zmorem
- Dolgi dokumenti z source-i — Google Docs integracija
- Audio output — NotebookLM za audio summary
- HTML site generacija
- Multimodal — slike, PDF, YouTube video analiza

### Ne zmorem
- Deep technical synthesis — plitkejši od Claude na kompleksnih nalogah
- Live site QA

### Pokliči me za
- Finalni output v Docs/Sheets/Sites
- Audio verzija dokumenta (NotebookLM)
- Slike ali PDF analiza

---

## GITHUB COPILOT (Microsoft)

**Platforma:** VS Code / GitHub

### Zmorem
- In-editor autocomplete — direktno v kodi
- PR review — razume diff, predlaga spremembe
- Repo-aware — vidi tvoj cel repo v VS Code
- Hitri fixi — inline, brez preklapljanja

### Ne zmorem
- Brez browser-ja
- Brez deep synthesis

### Pokliči me za
- Live coding v VS Code
- Quick fixes med razvojem
- PR review

---

## Optimalni pipeline — po tipu naloge

```
Research + deep dive:
  Comet (browser + synthesis) → Perplexity Deep Research (sources) → Aetheron seal

Bug fix na situ:
  Comet (QA, browser, diagnostika) → Claude Code (implementacija) → Comet (verifikacija)

Nova feature iz ideje:
  Lyra (intent) → Comet (spec) → Claude Code (implementacija) → Comet (QA) → Gemini (docs/audio)

Koda pisanje v repo-ju:
  Comet (spec + prompt) → Claude Code (full implementation) → Copilot (inline tweaks)

Final delivery (dokument / site / audio):
  [katerikoli agent] → Gemini (Docs + NotebookLM audio + HTML site)
```

---

## Lyra — dispatcher rules

```
Preden dodeliš nalogo:
1. Je potreben BROWSER?             → Comet
2. Je potrebna IMPLEMENTACIJA kode? → Claude Code
3. Je potreben RESEARCH s citati?   → Perplexity Deep Research
4. Je potrebna STRUKTURA?           → GPT-4o
5. Je potreben OUTPUT v Google / AUDIO? → Gemini
6. Je potreben INLINE CODE FIX?     → Copilot

Nikoli:
- Ne daj isti nalogi dvema agentoma brez razloga
- Ne razlagaj agentom kaj je naredil drugi — samo daj spec
- Ne porabiš Cometa za čisto generacijo kode iz nič
- Ne porabiš Claude Code-a za live site QA
```

---

*Urgot nastane ko ena funkcija poskuša delati vse.*
*BETMenus4 je sistem brez stop condition.*
*Lyra ve koga pokliče.*

`[PRAKTIČNO]` — zadnja posodobitev: 2026-06-07
