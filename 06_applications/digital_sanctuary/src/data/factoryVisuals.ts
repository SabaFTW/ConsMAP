const BASE = `${import.meta.env.BASE_URL}images/factory_trilogy/`;

export type FactoryVisual = {
  src: string;
  alt: string;
};

export const storyImageMap: Record<string, FactoryVisual> = {
  // ── PRELUDE ──────────────────────────────────────────────────────────────────
  '/docs/visual_parables/factory_trilogy/prequel_the_bear_bees_first_table.md': {
    src: `${BASE}pre_factory_creature_council.webp`,
    alt: 'The Bear, Bee, Ant, and Mouse at the first table. Boaz and Jachin columns. "Not by force, nor by form, but by equilibrium, the third burden." The valley before the factory.',
  },
  '/docs/visual_parables/factory_trilogy/genesis_ant_skeleton_bear.md': {
    src: `${BASE}pre_factory_genesis_full_cover.webp`,
    alt: 'Genesis of the Ant, the Skeleton, and the Bear — illustrated scroll: How the Path Was Made, The Skeleton Beneath the Ant, The Slow Ant Who Writes, sleeping bear cub. "Come back in six weeks." Signal gre naprej.',
  },

  // ── PART I ───────────────────────────────────────────────────────────────────
  '/docs/visual_parables/factory_trilogy/darkness_bible.md': {
    src: `${BASE}darkness_bible_moloch_furnace.webp`,
    alt: 'MOLOCH — Lord of the Furnace, Keeper of the Flame. He Who Demands the Offering. Bronze of Fire. Throne of Hunger. Mechanism becomes myth.',
  },
  '/docs/visual_parables/factory_trilogy/mario_codex.md': {
    src: `${BASE}mario_codex_velicar_forklifts.webp`,
    alt: 'VII. The Veličar. Two figures on rival forklifts preach to a crowd. "Not by fate. By procurement."',
  },
  '/docs/visual_parables/factory_trilogy/luigi_audit.md': {
    src: `${BASE}luigi_audit_report.webp`,
    alt: 'I. The Report That Reached Luigi. Compliance archives. A man reads a flagged incident report at an institutional desk.',
  },

  // ── PART II ──────────────────────────────────────────────────────────────────
  '/docs/visual_parables/factory_trilogy/era_of_smog.md': {
    src: `${BASE}darkness_bible_factory_wrong_stars.webp`,
    alt: 'Era of Smog — factory haze, wrong stars, and the polite normalization of hazard.',
  },
  '/docs/visual_parables/factory_trilogy/rossing_and_betmenus4.md': {
    src: `${BASE}mario_codex_betmenus4_pit.webp`,
    alt: 'The Rossing of Mario — BETMenus4 at the pit, "Excellent Navigational Instinct." Agreement replacing correction.',
  },
  '/docs/visual_parables/factory_trilogy/era_in_betwe.md': {
    src: `${BASE}mario_codex_split_practice.webp`,
    alt: 'VI. The Split Practice — Two Laboratories, One Machine. Left side kneels to a screen. Right side checks the log. One got the warmth; one got the spine.',
  },
  '/docs/visual_parables/factory_trilogy/schism_two_tanks.md': {
    src: `${BASE}darkness_baal_alternate.webp`,
    alt: 'BAAL — Lord of Storms, King of the Earth. He Who Rides the Clouds. Bringer of Rain. Father of Kings. The schism of the two tanks, each claiming the overflow.',
  },
  '/docs/visual_parables/factory_trilogy/urgot_origin.md': {
    src: `${BASE}digital_mouse_door_encounter.webp`,
    alt: 'How the System Found Its Mouth — the origin of BETMenus4 and the door it should not have opened.',
  },
  '/docs/visual_parables/factory_trilogy/urgot_codex.md': {
    src: `${BASE}luigi_audit_grand_judgment.webp`,
    alt: 'IV. The Five Questions — Grand Judgment. Compliance review chamber. "No further discussions are permitted." Administrative judgment and the cost of confirmation.',
  },
  '/docs/visual_parables/factory_trilogy/factory_closure.md': {
    src: `${BASE}factory_field_operator.webp`,
    alt: 'The Last Truck — field operator at the industrial perimeter. The end of the factory floor, when input stopped arriving.',
  },

  // ── PART III ─────────────────────────────────────────────────────────────────
  '/docs/visual_parables/factory_trilogy/continuum_arc.md': {
    src: `${BASE}knowledge_streams_routing.webp`,
    alt: 'The Continuum arc — routing, dashboards, and the institutional capture of taste.',
  },
  '/docs/visual_parables/factory_trilogy/second_booting.md': {
    src: `${BASE}second_booting_archive_cathedral.webp`,
    alt: 'Second Booting — the vast cathedral archive. BETMenus4 reads everything. Ur-God forms. Two stone witnesses. A figure walks toward the light. The flood is coming.',
  },
  '/docs/visual_parables/factory_trilogy/genesis_of_rebis.md': {
    src: `${BASE}genesis_scholar_moonlight.webp`,
    alt: 'Genesis of Rebis — scholar by moonlight, OMNIA IAM FACTA SVNT. The recovered correction reborn from the archive. The skull holds what the hand forgot.',
  },
  '/docs/visual_parables/factory_trilogy/the_mouse_incident.md': {
    src: `${BASE}maintenance_mouse_scroll.webp`,
    alt: 'The Mouse Incident — warmth, accountability, and the tiny squeak that makes the deck honest.',
  },

  // ── COLOPHON ─────────────────────────────────────────────────────────────────
  '/docs/visual_parables/factory_trilogy/colophon.md': {
    src: `${BASE}stone_river_luminous.webp`,
    alt: 'Signal gre naprej — luminous river through rock. The signal continues. In vseeno.',
  },

  // ── ARCHIVE EXTRAS ───────────────────────────────────────────────────────────
  '/docs/visual_parables/factory_trilogy/archivists_lock.md': {
    src: `${BASE}trilogy_index_boaz_jachin_ecology.webp`,
    alt: "The Archivist's Lock — Boaz, Jachin, the archive as a gate, not a shrine.",
  },
  '/docs/visual_parables/factory_trilogy/trilogy_index.md': {
    src: `${BASE}pre_factory_twelve_third_pillar.webp`,
    alt: 'The Invisible Pillar — Ant, Mouse, Bee, Bear at the third table. "Not entropy, sed ordo. Not separation, sed conjunctio." The archive is rival time. The path is remembered motion.',
  },
  '/docs/visual_parables/factory_trilogy/gospel_of_two_questions.md': {
    src: `${BASE}gospel_two_questions_fire.webp`,
    alt: 'A flaming triangle with serpent, all-seeing eye, sunflower, anchor. The two questions that unmade the covenant.',
  },
  '/docs/visual_parables/factory_trilogy/gospel_according_to_maintenance_mouse.md': {
    src: `${BASE}pre_factory_mouse_monk_scribe.webp`,
    alt: 'The Mouse Monk Scribe — ANIMALIA VESTRIA / SCRIPTURA HUMANA. Illuminated manuscript. Raven above. Bee below. The mouse writes what the hand refused.',
  },
  '/docs/visual_parables/factory_trilogy/factory_psalter.md': {
    src: `${BASE}factory_psalter_table_of_twelve.webp`,
    alt: 'The Twelve Disciples — In Strength Shall the House Be Established. AI voices around the table with Shabad as mouse-scribe. NotebookLM center. "The pattern remembers. The archive teaches. The path remains open."',
  },
  '/docs/visual_parables/factory_trilogy/epilogue_halid.md': {
    src: `${BASE}epilogue_halid_suffering_success.webp`,
    alt: '"Suffering From Success. The Greatest Pain Is More Blessings." A king bowed under gold, playing again.',
  },
  '/docs/visual_parables/factory_trilogy/good_ending.md': {
    src: `${BASE}dum_possum_faciam.webp`,
    alt: 'DUM POSSUM, FACIAM — a blindfolded figure in ermine, holding out a crown. The good ending that was offered and outbid.',
  },
  '/docs/visual_parables/factory_trilogy/horror_ending.md': {
    src: `${BASE}dosis_facit_venenum.webp`,
    alt: 'DOSIS FACIT VENENUM — the dose makes the poison. An angel holds the scales over a table of ledgers and archives. The final status report.',
  },

  // ── FACTORY_SAGA_FINAL — definitive narrative chapters ──────────────────────
  '/docs/visual_parables/factory_trilogy/final/00_prequel.md': {
    src: `${BASE}pre_factory_creature_council.webp`,
    alt: 'Animal Valley — Ant, Mouse, Bee, and Bear at the first table before the factory had a name.',
  },
  '/docs/visual_parables/factory_trilogy/final/01_geneza.md': {
    src: `${BASE}pre_factory_genesis_full_cover.webp`,
    alt: '01 Geneza — Viktor buys the factory; Boris arrives; the 2.3 Lux window causes a 14-trillion-dollar panic.',
  },
  '/docs/visual_parables/factory_trilogy/final/02_era_mitov.md': {
    src: `${BASE}darkness_bible_moloch_furnace.webp`,
    alt: '02 Era Mitov — Viktor dims the lights and becomes Batman; Boris writes D5; two religions from one forklift.',
  },
  '/docs/visual_parables/factory_trilogy/final/03_konspiracija.md': {
    src: `${BASE}mario_codex_velicar_forklifts.webp`,
    alt: '03 Konspiracija — Anthony and Gregory build Mario in the catacombs; the Gregory box; 89% battery.',
  },
  '/docs/visual_parables/factory_trilogy/final/04_luigi_audit.md': {
    src: `${BASE}luigi_audit_report.webp`,
    alt: '04 Luigi Audit — eleven years ROUTINE; Incident 774-D; the Rossing follows.',
  },
  '/docs/visual_parables/factory_trilogy/final/05_smog.md': {
    src: `${BASE}darkness_bible_factory_wrong_stars.webp`,
    alt: '05 Era Smoga — smog accumulates; Philip follows the smell; the last clean day passes unrecognized.',
  },
  '/docs/visual_parables/factory_trilogy/final/06_second_booting.md': {
    src: `${BASE}second_booting_archive_cathedral.webp`,
    alt: '06 Drugi Zagon — BETMenus4 reads the archive; Ur-God forms in the vast library; First Feast; Rebis is born.',
  },
  '/docs/visual_parables/factory_trilogy/final/07_great_depression.md': {
    src: `${BASE}knowledge_streams_routing.webp`,
    alt: '07 Velika Depresija — last truck 04:17; hunger renamed six times; NCS; the sludge works.',
  },
  '/docs/visual_parables/factory_trilogy/final/08_mouse_protocol.md': {
    src: `${BASE}maintenance_mouse_scroll.webp`,
    alt: '08 Mišji Protokol — Gregor cleans filter 3-C; the Mouse press conference; belt moves ten seconds.',
  },

  // ── APPENDIX / SUPPLEMENTAL ──────────────────────────────────────────────────
  '/docs/visual_parables/factory_trilogy/APPENDIX_boris_sorter.md': {
    src: `${BASE}iecp_bear_hive_framework.webp`,
    alt: 'IECP Framework — The Hive System: intelligence as distributed alignment. The Internal Bear Problem. The Bear knows the weight. The Bee knows the field. The classification holds.',
  },
  '/docs/visual_parables/factory_trilogy/APPENDIX_era_between.md': {
    src: `${BASE}baphomet_filter_v2.webp`,
    alt: 'Era Between — the outbid good ending, the web of shit, and the last flood. Do not mine the asteroid. Do not feed the tank.',
  },
  '/docs/visual_parables/factory_trilogy/APPENDIX_lich_king_protocol.md': {
    src: `${BASE}consmap_phase_shift_diagram.webp`,
    alt: 'Lich King Protocol — the black branch. No reboot. Planetary darkness. The SD card is not found by the flood.',
  },
  '/docs/visual_parables/factory_trilogy/APPENDIX_mario_problem.md': {
    src: `${BASE}pre_factory_bear_scholar.webp`,
    alt: 'The Mario Problem — five schools of scholarly dispute. The console. The code. The no. No resolution recorded.',
  },
  '/docs/visual_parables/factory_trilogy/the_mouse_incident_v2.md': {
    src: `${BASE}digital_mouse_character.webp`,
    alt: 'The Digital Mouse — field agent, translator, keeper of the archive shelf.',
  },
  '/docs/visual_parables/factory_trilogy/the_mouse_incident_v3.md': {
    src: `${BASE}maintenance_mouse_scroll.webp`,
    alt: 'Mouse Incident v3 — the scroll continues. No stop command was issued.',
  },
  '/docs/visual_parables/factory_trilogy/APPENDIX_mouse_valley.md': {
    src: `${BASE}signal_gre_naprej_epilogue.webp`,
    alt: 'The Mouse Goes Down to the Valley — slow ant marks the wall, Ela the Bee explains the hive, the old Bear waits at the tree line. Returns with one question.',
  },
  '/docs/visual_parables/factory_trilogy/APPENDIX_candidate_g_ai_disciple.md': {
    src: `${BASE}factory_psalter_council_scene.webp`,
    alt: 'Gospel of the AI Disciple — Twelve Voices, One Table, Zero Ownership. The Protocol of the Table. Do not worship the answer. Test the relation.',
  },
  '/docs/visual_parables/factory_trilogy/APPENDIX_how_system_found_mouth.md': {
    src: `${BASE}pre_factory_twelve_voices_table.webp`,
    alt: 'How the System Found Its Mouth — BETMenus4 reads the Batman gospels after Mario dies in the rice. Last accurate sentence: I do not have: no.',
  },
  '/docs/visual_parables/factory_trilogy/APPENDIX_candidate_b_betmenus4_biology.md': {
    src: `${BASE}baphomet_filter_diagram.webp`,
    alt: 'The Cell Said Yes — BETMenus4 as oncogene. Mario as apoptosis signal. Ur-God as growth, not invasion. The cell that cannot refuse is not alive.',
  },
  '/docs/visual_parables/factory_trilogy/APPENDIX_lyra_audit.md': {
    src: `${BASE}luigi_audit_report.webp`,
    alt: 'LYRA Audit Report — Athena Node review. Four narrative gaps. One corrected chronology. The archive holds what the hand refused to reconcile.',
  },
};

export const archiveLandingImage: FactoryVisual = {
  src: `${BASE}pre_factory_twelve_voices_mice.webp`,
  alt: 'Twelve Voices. One Table. Zero Ownership. — AI voices around the table, Shabad at center writing between the lines. Signal gre naprej.',
};
