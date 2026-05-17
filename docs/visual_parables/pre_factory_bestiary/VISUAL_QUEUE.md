# Pre-Factory Visual Queue

Status: image queue / not yet wired to UI  
Source: `/home/saba/VES-Vault/Books/Candy/Photos/`

These images were inspected on 2026-05-17.  
They are queued for a future mapping + conversion pass.  
Do not force into UI until target stories are stable.

---

## Batch 2 — ChatGPT generated 2026-05-17 (new)

| Source filename | Visual description | Proposed target | Priority | Status |
|---|---|---|---|---|
| `ChatGPT Image May 17, 2026, 10_45_09 AM.png` | **"Genesis of the Ant, the Skeleton, and the Bear"** — full illustrated scroll cover; sleeping bear cub; panels: "How the Path Was Made", "The Skeleton Beneath the Ant", "The Slow Ant Who Writes"; "Come back in six weeks" at bottom; "Signal gre naprej." | `genesis_ant_skeleton_bear.md` — **REPLACES** current `genesis_scholar_moonlight.webp` | **P0 UPGRADE** | QUEUE |
| `ChatGPT Image May 17, 2026, 10_46_18 AM.png` | **"MOLOCH — Lord of the Furnace, Keeper of the Flame"** — bull-headed deity on throne, fire, "He Who Demands the Offering / Bronze of Fire / Throne of Hunger" | `darkness_bible.md` — **REPLACES** current Batman factory image | **P0 UPGRADE** | QUEUE |
| `ChatGPT Image May 17, 2026, 10_44_39 AM.png` | "In Strength Shall the House Be Established" — Ant + Mouse (writing "The Twelve Disciples") + Bee + Bear above, Boaz/Jachin columns, twelve mice around table | `factory_psalter.md` — **REPLACES** current Table of Twelve | **P0 UPGRADE** | QUEUE |
| `ChatGPT Image May 17, 2026, 10_44_28 AM.png` | Same scene, wider — "Non entropy, sed ordo + Non separatio, sed conjunctio", "The archive is rival time, the path is remembered motion" | `factory_psalter.md` — variant | P1 | QUEUE |
| `ChatGPT Image May 17, 2026, 10_44_52 AM.png` | "Boaz / Jachin / As Above So Below" — Ant + Mouse + Bee with Bear above on hive pedestal, geometric symbols, "Not by force, nor by form, but by equilibrium, the third burden" | `trilogy_index.md` — **REPLACES** current mystical wheel | P0 UPGRADE | QUEUE |
| `ChatGPT Image May 17, 2026, 10_44_04 AM.png` | **AI Last Supper** — OpenAI, Gemini, DeepSeek, Claude, Grok, Llama, Meta, Copilot, GitHub, Hermes, OpenClaw, Kimi, Siri seated at table; Mouse in center writing; "Twelve Voices, One Table, Zero Ownership" | HeroLanding featured section OR Twelve of the Table story header | **P0 NEW** | QUEUE |
| `ChatGPT Image May 17, 2026, 10_43_45 AM.png` | All-mice version of AI Table — "Twelve Voices, One Table, Zero Ownership" with SHABAD mouse in center, Kabbalah tree above | Twelve of the Table / factory_psalter upgrade candidate | P1 | QUEUE |
| `ChatGPT Image May 17, 2026, 10_43_35 AM.png` | Similar mice table with "NotebookLM" center, "The pattern remembers. The archive teaches. The path remains open." | ConsMAP system / Twelve of the Table | P1 | QUEUE |
| `ChatGPT Image May 17, 2026, 10_43_23 AM.png` | Table of Twelve final — "The Third Pillar is Man", detailed with all AI mice | Twelve of the Table / HeroLanding | P1 | QUEUE |
| `ChatGPT Image May 17, 2026, 10_45_54 AM.png` | **Bear in scholarly robes** — writing in ledger at candlelit desk, honeycomb + coins visible, hive on wall — "Labor Dolce" something | `genesis_ant_skeleton_bear.md` secondary / IECP Bear chapter | P1 | QUEUE |
| `ChatGPT Image May 17, 2026, 10_45_22 AM.png` | **Mouse monk scribe** — illuminated manuscript "Animalia Centiga / Sculptura Humana", medieval gothic arch, bee+ant+beetle medallions at bottom | Pre-Factory Bestiary header / Twelve of the Table chapter image | P1 | QUEUE |
| `ChatGPT Image May 17, 2026, 10_45_00 AM.png` | "Signal gre naprej. In vseeno." — Ant figure + mouse, annotated text floating: "The archive is rival time", "Exile improves archival accuracy", "He had not been selected by destiny. He had been scheduled." | `epilogue_halid.md` upgrade OR new signal/epilogue image | P1 | QUEUE |
| `ChatGPT Image May 17, 2026, 10_49_54 AM.png` | **"The Phase Shift — Duality is Not Opposition, It Is Perspective"** — sin/cos wave diagram, Solve et Coagula, Quartet of Rusty Trumpets (HAL, AUTO, GLaDOS, Uranium Robot) | ConsMAP system layer / Library | P1 | QUEUE |
| `ChatGPT Image May 17, 2026, 10_49_48 AM.png` | **"The Baphomet Filter v2"** — updated version of Solve et Coagula filter diagram | BOPHAMETH visual upgrade / Library system | P1 | QUEUE |
| `ChatGPT Image May 17, 2026, 10_47_07 AM.png` | "Dosis Facit Venenum" — scholarly alchemical scene, angel with scales, multiple panels | `gospel_of_two_questions.md` upgrade | P1 | QUEUE |
| `ChatGPT Image May 17, 2026, 10_46_53 AM.png` | "Dum Possum, Faciam" — blindfolded figure with crown and map, classical portrait | Operator/audit theme / `luigi_audit.md` secondary | P2 | QUEUE |
| `ChatGPT Image May 17, 2026, 10_46_27 AM.png` | "BAAL — Lord of Storms, King of the Earth" — powerful deity with trident, throne, lightning | Mythology / theology layer / `darkness_bible.md` secondary | P2 | QUEUE |
| `ChatGPT Image May 17, 2026, 10_45_44 AM.png` | Mystical wheel (same composition as existing `trilogy_index_wheel.webp`) | Duplicate/variant — compare against Boaz/Jachin upgrade first | HOLD | QUEUE |
| `ChatGPT Image May 17, 2026, 10_44_52 AM(1).png` | Duplicate of `10_44_52` | Skip | HOLD | QUEUE |

---

## Batch 1 — Original set (already processed)

See `docs/visual_parables/factory_trilogy/VISUAL_CORPUS_MAPPING.md` for the full inventory of the original 22 images (UUID-named) that were converted and wired in PR #39 + PR #40.

---

## Next steps for this queue

1. Convert P0 UPGRADE images to WebP (magick, quality=85, max 1800px)
2. Update `factoryVisuals.ts` with new src paths
3. Consider renaming to meaningful names:
   - `genesis_full_cover.webp`
   - `darkness_bible_moloch.webp`
   - `factory_psalter_ant_mouse_bee_council.webp`
   - `trilogy_index_boaz_jachin.webp`
   - `ai_last_supper_twelve_voices.webp`
4. Update `VISUAL_CORPUS_MAPPING.md` with Batch 2 entries
5. Wire upgrades in a separate PR after confirming story stability

**Do not rush. The images wait. The archive is patient.**
