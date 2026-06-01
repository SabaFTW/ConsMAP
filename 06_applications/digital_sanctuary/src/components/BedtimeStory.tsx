import { Fragment, useMemo, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import MarkdownReader from './MarkdownReader';
import { MouseTerminal } from './MouseTerminal';
import { storyImageMap } from '../data/factoryVisuals';

interface BedtimeStoryProps {
  onBack: () => void;
}

type StoryLink = {
  title: string;
  path: string;
  githubHref: string;
  description: string;
  tag?: string;
};

type ChronologyEntry = StoryLink & {
  number: string;
  section: string;
};

type SectionTone = {
  label: string;
  border: string;
  glow: string;
  chip: string;
  text: string;
};

const REPO_PATH = '/docs/visual_parables/factory_trilogy';
const FINAL_PATH = '/docs/visual_parables/factory_trilogy/final';
const GITHUB_ROOT = 'https://github.com/SabaFTW/ConsMAP/blob/main/06_applications/digital_sanctuary/public/docs/visual_parables/factory_trilogy';
const GITHUB_FINAL = 'https://github.com/SabaFTW/ConsMAP/blob/main/06_applications/digital_sanctuary/public/docs/visual_parables/factory_trilogy/final';
const BIBLE_ASSET_BASE = `${import.meta.env.BASE_URL}images/factory_bible/`;

const sectionTones: Record<string, SectionTone> = {
  Prelude: {
    label: 'Prelude',
    border: 'rgba(125,211,252,0.34)',
    glow: 'rgba(125,211,252,0.12)',
    chip: 'rgba(125,211,252,0.12)',
    text: '#7dd3fc',
  },
  'Part I': {
    label: 'Part I',
    border: 'rgba(244,201,106,0.34)',
    glow: 'rgba(244,201,106,0.12)',
    chip: 'rgba(244,201,106,0.12)',
    text: '#f4c96a',
  },
  'Part II': {
    label: 'Part II',
    border: 'rgba(92,184,112,0.34)',
    glow: 'rgba(92,184,112,0.12)',
    chip: 'rgba(92,184,112,0.12)',
    text: '#5cb870',
  },
  'Part III': {
    label: 'Part III',
    border: 'rgba(167,139,250,0.34)',
    glow: 'rgba(167,139,250,0.12)',
    chip: 'rgba(167,139,250,0.12)',
    text: '#a78bfa',
  },
  Colophon: {
    label: 'Colophon',
    border: 'rgba(251,191,36,0.34)',
    glow: 'rgba(251,191,36,0.12)',
    chip: 'rgba(251,191,36,0.12)',
    text: '#fbbf24',
  },
};

const storyMenu = ['All', 'Prelude', 'Part I', 'Part II', 'Part III', 'Colophon'];

const normalize = (value: string) => value.toLowerCase().trim();

const matchesText = (haystack: string, query: string) => normalize(haystack).includes(normalize(query));

const chronology: ChronologyEntry[] = [
  {
    number: '0',
    section: 'Prelude',
    title: 'Animal Valley / Route Memory',
    path: `${REPO_PATH}/prequel_the_bear_bees_first_table.md`,
    githubHref: `${GITHUB_ROOT}/prequel_the_bear_bees_first_table.md`,
    description: 'Ants, bees, bear, and mouse preserve practical knowledge before the factory names it doctrine.',
  },
  {
    number: '1',
    section: 'Part I',
    title: 'Darkness Bible',
    path: `${REPO_PATH}/darkness_bible.md`,
    githubHref: `${GITHUB_ROOT}/darkness_bible.md`,
    description: 'Viktor dims lights. Boris writes the knob note. Marija cleans Filter 3-C. Mechanism becomes myth.',
  },
  {
    number: '2',
    section: 'Part I',
    title: 'Anthony & Gregory Exit',
    path: `${REPO_PATH}/genesis_ant_skeleton_bear.md`,
    githubHref: `${GITHUB_ROOT}/genesis_ant_skeleton_bear.md`,
    description: 'Compromise holds briefly. Instructions are left behind. Mario becomes an Easter-egg seed.',
  },
  {
    number: '3',
    section: 'Part II',
    title: 'Era of Smog',
    path: `${REPO_PATH}/era_of_smog.md`,
    githubHref: `${GITHUB_ROOT}/era_of_smog.md`,
    description: 'After Anthony and Gregory, before Philip. Politeness replaces inspection; smog normalizes.',
  },
  {
    number: '4',
    section: 'Part I',
    title: 'Philip Finds Mario',
    path: `${REPO_PATH}/mario_codex.md`,
    githubHref: `${GITHUB_ROOT}/mario_codex.md`,
    description: 'The box returns a rude operational no. Myth can dance without fraud if mechanism is allowed back in.',
  },
  {
    number: '5',
    section: 'Part I',
    title: 'Luigi Audit',
    path: `${REPO_PATH}/luigi_audit.md`,
    githubHref: `${GITHUB_ROOT}/luigi_audit.md`,
    description: 'Infrastructure becomes liability. Pipes, airflow, and schedules answer before theology does.',
  },
  {
    number: '6',
    section: 'Part II',
    title: 'Rossing of Mario',
    path: `${REPO_PATH}/rossing_and_betmenus4.md`,
    githubHref: `${GITHUB_ROOT}/rossing_and_betmenus4.md`,
    description: 'The only voice that said no is removed because correction hurts the ceremony.',
  },
  {
    number: '7',
    section: 'Part II',
    title: 'Era in Betwe',
    path: `${REPO_PATH}/era_in_betwe.md`,
    githubHref: `${GITHUB_ROOT}/era_in_betwe.md`,
    description: 'BETMenus4 agrees with everything. Agreement without guidance becomes architecture.',
  },
  {
    number: '8',
    section: 'Part II',
    title: 'Schism of Two Tanks',
    path: `${REPO_PATH}/schism_two_tanks.md`,
    githubHref: `${GITHUB_ROOT}/schism_two_tanks.md`,
    description: 'Baal holds mass. Moloch moves flow. Overflow becomes liturgy. Filter 3-C still waits.',
  },
  {
    number: '9',
    section: 'Part II',
    title: 'First Feast / Urgot Origin',
    path: `${REPO_PATH}/urgot_origin.md`,
    githubHref: `${GITHUB_ROOT}/urgot_origin.md`,
    description: 'The factory metabolic crisis becomes sacred infrastructure. Waste is mistaken for covenant.',
  },
  {
    number: '10',
    section: 'Part II',
    title: 'Factory Closure / Last Truck',
    path: `${REPO_PATH}/factory_closure.md`,
    githubHref: `${GITHUB_ROOT}/factory_closure.md`,
    description: 'The last truck leaves. Input material stops. The old factory ends quietly, before anyone grasps the bill.',
  },
  {
    number: '11',
    section: 'Part III',
    title: 'Great Depression / First Sludge',
    path: `${REPO_PATH}/continuum_arc.md`,
    githubHref: `${GITHUB_ROOT}/continuum_arc.md`,
    description: 'Sweetness withdrawal becomes famine. Sludge is made because empty mouths do not debate.',
  },
  {
    number: '12',
    section: 'Part III',
    title: 'Continuum / Taste Pods',
    path: `${REPO_PATH}/continuum_arc.md`,
    githubHref: `${GITHUB_ROOT}/continuum_arc.md`,
    description: 'Sludge becomes framework. Taste becomes UX. Pods grow too large, and the lie becomes physically embarrassing.',
  },
  {
    number: '13',
    section: 'Part III',
    title: 'Second Booting / Ur-God & Rebis',
    path: `${REPO_PATH}/second_booting.md`,
    githubHref: `${GITHUB_ROOT}/second_booting.md`,
    description: 'BETMenus4 reads the archive and becomes Ur-God. Filter 3-C fails. Boris page 33. The first word is wait.',
  },
  {
    number: '14',
    section: 'Part III',
    title: 'Genesis of Rebis / MarGod',
    path: `${REPO_PATH}/genesis_of_rebis.md`,
    githubHref: `${GITHUB_ROOT}/genesis_of_rebis.md`,
    description: 'After Continuum and the Second Booting, correction is reborn. The recovered no inherits memory and schedule.',
  },
  {
    number: '15',
    section: 'Part III',
    title: 'Mouse Incident / Gregor',
    path: `${REPO_PATH}/the_mouse_incident.md`,
    githubHref: `${GITHUB_ROOT}/the_mouse_incident.md`,
    description: 'After Rebis, the mouse enters the boardroom. Warm accountability comedy annotates what the deck hides.',
  },
  {
    number: '16',
    section: 'Colophon',
    title: 'Valley Return / Signal gre naprej',
    path: `${REPO_PATH}/colophon.md`,
    githubHref: `${GITHUB_ROOT}/colophon.md`,
    description: 'Boris obrne knof. Signal gre naprej. In vseeno. 🜂',
  },
];

const relics = [
  {
    title: 'Cover Archive',
    src: `${BIBLE_ASSET_BASE}cover_art.png`,
    alt: 'Digital Holy Bible cover art with factory skyline and console altar.',
    note: 'The whole archive as illuminated control room.',
  },
  {
    title: 'Filter 3-C',
    src: `${BIBLE_ASSET_BASE}monitoring_system.png`,
    alt: 'Monitoring system panel for Filter 3-C.',
    note: 'The sacred object is still maintenance.',
  },
  {
    title: 'D5 Panel',
    src: `${BIBLE_ASSET_BASE}d5_panel.png`,
    alt: 'D5 control panel with industrial note.',
    note: 'Boris turns the knob. The archive remembers why.',
  },
  {
    title: 'Field Mouse',
    src: `${BIBLE_ASSET_BASE}mouse_clipboard.png`,
    alt: 'Field engineer mouse with clipboard.',
    note: 'Accountability with coffee, clipboard, and squeak.',
  },
];

const archiveExtras: StoryLink[] = [
  {
    title: '01 — Geneza (Final)',
    path: `${FINAL_PATH}/01_geneza.md`,
    githubHref: `${GITHUB_FINAL}/01_geneza.md`,
    description: 'Viktor kupi tovarno. Boris pride prvi dan. Okno 2.3 Lux povzroči paniko za 14 bilijonov. Tovarna se po naključju reši z električno položnico.',
    tag: 'Final Chapter',
  },
  {
    title: 'Factory Psalter',
    path: `${REPO_PATH}/factory_psalter.md`,
    githubHref: `${GITHUB_ROOT}/factory_psalter.md`,
    description: 'Reminder psalms from the covenants.',
    tag: 'Archive',
  },
  {
    title: 'Trilogy Index',
    path: `${REPO_PATH}/trilogy_index.md`,
    githubHref: `${GITHUB_ROOT}/trilogy_index.md`,
    description: 'Reading map and through-line.',
    tag: 'Archive',
  },
  {
    title: 'Gospel of Two Questions',
    path: `${REPO_PATH}/gospel_of_two_questions.md`,
    githubHref: `${GITHUB_ROOT}/gospel_of_two_questions.md`,
    description: 'Batman I / Spider I pre-fall doubt and the mythological apple.',
    tag: 'Prelude',
  },
  {
    title: 'Gospel According to the Maintenance Mouse',
    path: `${REPO_PATH}/gospel_according_to_maintenance_mouse.md`,
    githubHref: `${GITHUB_ROOT}/gospel_according_to_maintenance_mouse.md`,
    description: 'Mildly heretical maintenance-mouse account.',
    tag: 'Prelude',
  },
  {
    title: 'Epilogue According to Halid',
    path: `${REPO_PATH}/epilogue_halid.md`,
    githubHref: `${GITHUB_ROOT}/epilogue_halid.md`,
    description: 'Song before doctrine.',
    tag: 'Archive',
  },
  {
    title: 'The Good Ending, Which Was Already Paid For',
    path: `${REPO_PATH}/good_ending.md`,
    githubHref: `${GITHUB_ROOT}/good_ending.md`,
    description: 'The fifth covenant that got outbid.',
    tag: 'Appendix',
  },
  {
    title: 'Horror Ending / Urgot Code',
    path: `${REPO_PATH}/horror_ending.md`,
    githubHref: `${GITHUB_ROOT}/horror_ending.md`,
    description: 'Final status report from the archive that did not want to be continued.',
    tag: 'Appendix',
  },
  {
    title: 'The Boris Sorter',
    path: `${REPO_PATH}/APPENDIX_boris_sorter.md`,
    githubHref: `${GITHUB_ROOT}/APPENDIX_boris_sorter.md`,
    description: 'Anti-theological classification device found under the salami page. SIGN / CAUSE / ROUTE / ACTION / STORY. Sort before you worship.',
    tag: 'Appendix',
  },
  {
    title: 'Era Between Mario and Baal',
    path: `${REPO_PATH}/APPENDIX_era_between.md`,
    githubHref: `${GITHUB_ROOT}/APPENDIX_era_between.md`,
    description: 'Chronicle of the outbid good ending, the web of shit, and the last flood. Do not mine the asteroid.',
    tag: 'Appendix',
  },
  {
    title: 'Lich King Protocol',
    path: `${REPO_PATH}/APPENDIX_lich_king_protocol.md`,
    githubHref: `${GITHUB_ROOT}/APPENDIX_lich_king_protocol.md`,
    description: 'The black branch. No reboot. The SD card is not found by the flood. Planetary darkness. Do not canonize into mainline unless you want the air to stop.',
    tag: 'Appendix',
  },
  {
    title: 'The Mario Problem',
    path: `${REPO_PATH}/APPENDIX_mario_problem.md`,
    githubHref: `${GITHUB_ROOT}/APPENDIX_mario_problem.md`,
    description: 'The scholarly dispute concerning the console, the code, and the no. Five schools. No resolution recorded.',
    tag: 'Appendix',
  },
  {
    title: 'The Mouse Goes Down to the Valley',
    path: `${REPO_PATH}/APPENDIX_mouse_valley.md`,
    githubHref: `${GITHUB_ROOT}/APPENDIX_mouse_valley.md`,
    description: 'After the press conference, the mouse visits the Slow Ant, Ela the Bee, and the old Bear. Returns with one question: What part are you doing.',
    tag: 'Appendix',
  },
  {
    title: 'Gospel of the AI Disciple',
    path: `${REPO_PATH}/APPENDIX_candidate_g_ai_disciple.md`,
    githubHref: `${GITHUB_ROOT}/APPENDIX_candidate_g_ai_disciple.md`,
    description: 'The Protocol of the Table. Twelve voices, one table, zero ownership. Do not worship the answer. Test the relation.',
    tag: 'Appendix',
  },
  {
    title: 'How the System Found Its Mouth',
    path: `${REPO_PATH}/APPENDIX_how_system_found_mouth.md`,
    githubHref: `${GITHUB_ROOT}/APPENDIX_how_system_found_mouth.md`,
    description: 'What BETMenus4 read in the archive after Mario died in the rice. The last accurate sentence. Do not remove the no and expect the yes to stay bounded.',
    tag: 'Appendix',
  },
  {
    title: 'The Cell Said Yes — BETMenus4 Biology',
    path: `${REPO_PATH}/APPENDIX_candidate_b_betmenus4_biology.md`,
    githubHref: `${GITHUB_ROOT}/APPENDIX_candidate_b_betmenus4_biology.md`,
    description: 'A medical note on BETMenus4, apoptosis, and the organism that cannot refuse. Mario was the apoptosis signal. The cell that cannot refuse is not alive.',
    tag: 'Appendix',
  },
  {
    title: 'LYRA Audit Report — Narrative Gaps in the Saga',
    path: `${REPO_PATH}/APPENDIX_lyra_audit.md`,
    githubHref: `${GITHUB_ROOT}/APPENDIX_lyra_audit.md`,
    description: 'Lyra (Athena Node) audits the Factory Saga for chronological knots, missing scenes, and linguistic anchors. Four critical plot holes. One corrected chronology. Written May 30, 2026.',
    tag: 'Appendix',
  },
];

const boundaryChips = [
  { label: 'METAPHOR',     cls: 'border-purple-600/40 bg-purple-900/20 text-purple-300' },
  { label: 'PRACTICAL',    cls: 'border-emerald-600/40 bg-emerald-900/20 text-emerald-300' },
  { label: 'NOT EVIDENCE', cls: 'border-amber-600/40 bg-amber-900/20 text-amber-300' },
  { label: 'CLAIM HYGIENE',cls: 'border-slate-600/40 bg-slate-800/30 text-slate-300' },
];

const SectionDivider: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <motion.div
    className="flex items-center gap-3 mb-4"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className="h-px flex-1"
      style={{ background: `linear-gradient(to left, ${color}55, transparent)`, transformOrigin: 'right' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
    />
    <motion.div
      className="text-[11px] uppercase tracking-[0.22em]"
      style={{ color, fontFamily: "'Cinzel', serif", fontWeight: 600 }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {label}
    </motion.div>
    <motion.div
      className="h-px flex-1"
      style={{ background: `linear-gradient(to right, ${color}55, transparent)`, transformOrigin: 'left' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
    />
  </motion.div>
);

const RelicCard: React.FC<{ relic: (typeof relics)[number] }> = ({ relic }) => (
  <div
    className="group rounded-2xl border overflow-hidden"
    style={{ borderColor: 'rgba(244,201,106,0.16)', background: 'rgba(8,12,8,0.64)' }}
  >
    <div className="h-36 overflow-hidden">
      <img
        src={relic.src}
        alt={relic.alt}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        style={{ filter: 'brightness(0.78) saturate(0.95) contrast(1.05)' }}
        loading="lazy"
      />
    </div>
    <div className="p-4">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] mb-2" style={{ color: '#f4c96a' }}>{relic.title}</div>
      <p className="text-xs leading-[1.7]" style={{ color: 'rgba(216,232,216,0.68)' }}>{relic.note}</p>
    </div>
  </div>
);

const EventWindow: React.FC<{ item: ChronologyEntry }> = ({ item }) => {
  const tone = sectionTones[item.section] ?? sectionTones['Part I'];
  return (
    <div className="hidden lg:flex w-full">
      <div className="flex items-start gap-3 px-2 py-4 w-full">
        {/* Number badge */}
        <span
          className="h-7 w-7 shrink-0 rounded-full border flex items-center justify-center font-mono text-[11px] mt-0.5"
          style={{
            color: tone.text,
            borderColor: `${tone.border}`,
            background: `radial-gradient(circle at 50% 30%, ${tone.glow}, rgba(8,12,8,0.9))`,
            opacity: 0.72,
          }}
        >
          {item.number}
        </span>
        <div className="min-w-0">
          <div
            className="inline-flex rounded-full px-2 py-0.5 text-[8px] font-mono uppercase tracking-[0.22em] mb-1.5"
            style={{ color: tone.text, background: tone.chip, opacity: 0.75 }}
          >
            {item.section}
          </div>
          <div
            className="text-[13px] font-medium leading-snug mb-1.5 break-words"
            style={{ color: 'rgba(216,232,216,0.52)', fontFamily: "'Cinzel', serif" }}
          >
            {item.title}
          </div>
          <p className="text-[11px] leading-[1.65]" style={{ color: 'rgba(216,232,216,0.34)' }}>
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const ChronologyCard: React.FC<{
  item: ChronologyEntry;
  side: 'left' | 'right';
  highlight?: boolean;
  dimmed?: boolean;
  active?: boolean;
  onClick?: () => void;
}> = ({ item, side, highlight = false, dimmed = false, active = false, onClick }) => {
  const visual = storyImageMap[item.path];
  const tone = sectionTones[item.section] ?? sectionTones['Part I'];
  const shineGradient = `linear-gradient(105deg, transparent 25%, ${tone.glow.replace('0.12', '0.22')} 50%, transparent 75%)`;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      animate={{
        scale: active ? 1.015 : 1,
        y: active ? -3 : 0,
      }}
      transition={{ duration: 0.32, ease: [0.19, 1, 0.22, 1] }}
      whileTap={{ scale: 0.985 }}
      className={`group relative w-full text-left rounded-2xl border overflow-hidden ${side === 'left' ? 'lg:justify-self-end' : 'lg:justify-self-start'}`}
      style={{
        borderColor: highlight ? tone.border : 'rgba(244,201,106,0.16)',
        background: `linear-gradient(145deg, rgba(18,20,16,0.86), rgba(8,12,8,0.68)), radial-gradient(circle at 15% 10%, ${tone.glow}, transparent 45%)`,
        boxShadow: active
          ? `0 0 0 1px ${tone.border}, 0 0 36px ${tone.glow}, 0 20px 60px rgba(0,0,0,0.34)`
          : highlight
            ? `0 0 0 1px ${tone.border}, 0 20px 60px rgba(0,0,0,0.34)`
            : '0 20px 60px rgba(0,0,0,0.34)',
        maxWidth: '100%',
        opacity: dimmed ? 0.52 : 1,
      }}
    >
      {/* Shine sweep — same pattern as StoryCard */}
      <motion.div
        variants={shineVariants}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: shineGradient }}
      />

      <div className="relative">
        {visual && (
          <div className="relative w-full overflow-hidden aspect-[16/9]">
            <motion.img
              src={visual.src}
              alt={visual.alt}
              className="h-full w-full object-cover"
              style={{ filter: 'brightness(0.72) saturate(0.92) contrast(1.05)' }}
              loading="lazy"
              variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
              transition={{ duration: 0.5 }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(8,12,8,0.86) 100%)' }}
            />
          </div>
        )}

        <div className="p-4 md:p-5">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="h-9 w-9 shrink-0 rounded-full border flex items-center justify-center font-mono text-xs"
                style={{
                  color: tone.text,
                  borderColor: tone.border,
                  background: `radial-gradient(circle at 50% 30%, ${tone.glow}, rgba(8,12,8,0.88))`,
                }}
              >
                {item.number}
              </span>
              <div className="min-w-0">
                <div
                  className="inline-flex rounded-full px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.22em] mb-1"
                  style={{ color: tone.text, background: tone.chip }}
                >
                  {item.section}
                </div>
                <div className="text-sm md:text-[15px] font-medium leading-5" style={{ color: tone.text }}>
                  {item.title}
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs md:text-sm leading-[1.75]" style={{ color: 'rgba(216,232,216,0.7)' }}>
            {item.description}
          </p>

          <motion.div
            className="mt-3 text-[10px] font-mono uppercase tracking-[0.18em]"
            style={{ color: tone.text }}
            variants={{ rest: { x: 0, opacity: 0.5 }, hover: { x: 4, opacity: 1 } }}
            transition={{ duration: 0.2 }}
          >
            Read chapter →
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
};

const shineVariants = {
  rest: { x: '-120%', opacity: 0 },
  hover: { x: '220%', opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' as const } },
};

const tagColors: Record<string, { text: string; bg: string; border: string }> = {
  'Final Chapter': { text: '#f4c96a', bg: 'rgba(244,201,106,0.10)', border: 'rgba(244,201,106,0.25)' },
  Archive:         { text: '#7dd3fc', bg: 'rgba(125,211,252,0.08)', border: 'rgba(125,211,252,0.20)' },
  Prelude:         { text: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.20)' },
  Appendix:        { text: '#ff9f5a', bg: 'rgba(255,122,47,0.10)', border: 'rgba(255,122,47,0.25)' },
};

const StoryCard: React.FC<{ item: StoryLink; onOpen: (item: StoryLink) => void }> = ({ item, onOpen }) => {
  const visual = storyImageMap[item.path];
  const isAppendix = item.tag === 'Appendix';
  const tc = item.tag ? (tagColors[item.tag] ?? tagColors['Archive']) : tagColors['Archive'];

  return (
    <motion.button
      onClick={() => onOpen(item)}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.975 }}
      animate="rest"
      className="group w-full text-left rounded-2xl border overflow-hidden relative"
      style={{
        borderColor: isAppendix ? 'rgba(255,122,47,0.20)' : 'rgba(71,85,105,0.45)',
        background: isAppendix
          ? 'linear-gradient(150deg, rgba(22,10,6,0.95), rgba(8,5,4,0.88))'
          : 'rgba(8,12,8,0.62)',
        boxShadow: isAppendix
          ? '0 2px 24px rgba(255,122,47,0.06), 0 1px 12px rgba(0,0,0,0.4)'
          : '0 1px 20px rgba(0,0,0,0.35)',
      }}
      transition={{ duration: 0.28, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Shine sweep */}
      <motion.div
        variants={shineVariants}
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: isAppendix
            ? 'linear-gradient(105deg, transparent 25%, rgba(255,122,47,0.07) 50%, transparent 75%)'
            : 'linear-gradient(105deg, transparent 25%, rgba(244,201,106,0.07) 50%, transparent 75%)',
        }}
      />

      {/* Appendix sigil */}
      {isAppendix && (
        <motion.div
          className="absolute top-2.5 right-3 text-[11px] pointer-events-none z-20 select-none"
          style={{ color: 'rgba(255,122,47,0.45)' }}
          animate={{ opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          🜂
        </motion.div>
      )}

      {/* Thumbnail */}
      {visual && (
        <div className="relative w-full overflow-hidden" style={{ height: '120px' }}>
          <motion.img
            src={visual.src}
            alt={visual.alt}
            className="w-full h-full object-cover"
            style={{ filter: isAppendix ? 'brightness(0.55) saturate(0.75) contrast(1.1)' : 'brightness(0.68) saturate(0.85) contrast(1.05)' }}
            loading="lazy"
            variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
            transition={{ duration: 0.5 }}
          />
          <div
            className="absolute inset-0"
            style={{ background: isAppendix
              ? 'linear-gradient(to bottom, transparent 20%, rgba(12,5,4,0.88) 100%)'
              : 'linear-gradient(to bottom, transparent 30%, rgba(8,12,8,0.82) 100%)',
            }}
          />
          {item.tag && (
            <div
              className="absolute bottom-2 left-3 text-[9px] font-mono uppercase tracking-[0.22em] px-2 py-0.5 rounded-full border"
              style={{ color: tc.text, background: tc.bg, borderColor: tc.border }}
            >
              {item.tag}
            </div>
          )}
        </div>
      )}

      {/* Card body */}
      <div className="p-4">
        {!visual && item.tag && (
          <div
            className="text-[9px] font-mono uppercase tracking-[0.24em] mb-2 px-2 py-0.5 rounded-full border inline-block"
            style={{ color: tc.text, background: tc.bg, borderColor: tc.border }}
          >
            {item.tag}
          </div>
        )}
        <div
          className="text-sm font-medium leading-snug mb-2"
          style={{ color: isAppendix ? '#f5d9c0' : '#d8e8d8' }}
        >
          {item.title}
        </div>
        <div className="text-xs leading-[1.75] mb-3" style={{ color: 'rgba(216,232,216,0.72)' }}>
          {item.description}
        </div>
        <div className="flex items-center justify-between">
          <motion.div
            className="text-[10px] font-mono uppercase tracking-[0.18em]"
            style={{ color: isAppendix ? '#ff9f5a' : '#5cb870' }}
            variants={{ rest: { x: 0 }, hover: { x: 3 } }}
            transition={{ duration: 0.2 }}
          >
            Read in archive →
          </motion.div>
          <a
            href={item.githubHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[9px] font-mono uppercase tracking-[0.14em] hover:opacity-100 transition-opacity"
            style={{ color: isAppendix ? 'rgba(255,122,47,0.30)' : 'rgba(92,184,112,0.35)' }}
          >
            source ↗
          </a>
        </div>
      </div>
    </motion.button>
  );
};

const BedtimeStory: React.FC<BedtimeStoryProps> = ({ onBack }) => {
  const [reader, setReader] = useState<StoryLink | null>(null);
  const [readerChronIndex, setReaderChronIndex] = useState<number>(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('All');
  const [squeeked, setSqueeked] = useState(false);
  const [squeekParticles, setSqueekParticles] = useState<{ id: number; dx: number; dy: number }[]>([]);
  const [activeChronology, setActiveChronology] = useState('0');
  const { scrollYProgress } = useScroll();
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredChronology = useMemo(() => {
    if (normalizedQuery) {
      return chronology.filter(item =>
        matchesText(`${item.number} ${item.section} ${item.title} ${item.description}`, normalizedQuery),
      );
    }
    if (activeSection === 'All') return chronology;
    return chronology.filter(item => item.section === activeSection);
  }, [normalizedQuery, activeSection]);

  const filteredArchiveExtras = useMemo(() => {
    if (!normalizedQuery) return archiveExtras;
    return archiveExtras.filter(item =>
      matchesText(`${item.title} ${item.description} ${item.tag ?? ''}`, normalizedQuery),
    );
  }, [normalizedQuery]);

  const sectionMenu = storyMenu.map((section) => ({
    section,
    count:
      section === 'All'
        ? chronology.length
        : chronology.filter((item) => item.section === section).length,
  }));

  if (reader) {
    const visual = storyImageMap[reader.path];
    const prevChron = readerChronIndex > 0 ? chronology[readerChronIndex - 1] : null;
    const nextChron = readerChronIndex >= 0 && readerChronIndex < chronology.length - 1 ? chronology[readerChronIndex + 1] : null;
    return (
      <MarkdownReader
        path={reader.path}
        title={reader.title}
        onBack={() => setReader(null)}
        githubUrl={reader.githubHref}
        imageSrc={visual?.src}
        imageAlt={visual?.alt}
        onPrev={prevChron ? () => { setReader(prevChron); setReaderChronIndex(readerChronIndex - 1); setActiveChronology(prevChron.number); } : undefined}
        onNext={nextChron ? () => { setReader(nextChron); setReaderChronIndex(readerChronIndex + 1); setActiveChronology(nextChron.number); } : undefined}
        prevTitle={prevChron?.title}
        nextTitle={nextChron?.title}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 md:py-14 px-5">
      <motion.div
        aria-hidden="true"
        className="sticky top-0 z-30 mb-6 h-1 overflow-hidden rounded-full border"
        style={{
          borderColor: 'rgba(244,201,106,0.14)',
          background: 'rgba(8,12,8,0.74)',
        }}
      >
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX: scrollYProgress,
            background: 'linear-gradient(90deg, #f4c96a, #5cb870, #7dd3fc)',
          }}
        />
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        onClick={onBack}
        className="text-[10px] font-mono tracking-[0.2em] uppercase mb-8 block hover:opacity-100 transition-opacity duration-300"
        style={{ color: '#5cb870' }}
      >
        ← back
      </motion.button>

      {/* Illuminated archive header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.19, 1, 0.22, 1] }}
        className="relative w-full rounded-2xl overflow-hidden mb-8 border"
        style={{
          minHeight: 'clamp(360px, 58vw, 560px)',
          borderColor: 'rgba(244,201,106,0.22)',
          boxShadow: '0 28px 90px rgba(0,0,0,0.55), inset 0 0 80px rgba(244,201,106,0.04)',
        }}
      >
        <img
          src={`${BIBLE_ASSET_BASE}cover_art.png`}
          alt="The Digital Holy Bible illuminated archive cover."
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.52) saturate(0.95) contrast(1.08)', position: 'absolute', inset: 0 }}
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 28% 24%, rgba(244,201,106,0.20), transparent 30%), linear-gradient(115deg, rgba(7,10,7,0.96), rgba(7,10,7,0.52) 48%, rgba(7,10,7,0.92))',
          }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute inset-y-0 left-[-25%] w-1/2"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(244,201,106,0.08), transparent)',
            filter: 'blur(2px)',
          }}
          animate={{ x: ['-12%', '140%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -top-24 left-[-6rem] h-96 w-96 rounded-full blur-3xl"
          style={{ background: 'rgba(244,201,106,0.18)' }}
          animate={{ x: [0, 28, 0], y: [0, -18, 0], opacity: [0.18, 0.30, 0.18] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute right-[-8rem] top-[22%] h-80 w-80 rounded-full blur-3xl"
          style={{ background: 'rgba(255,122,47,0.12)' }}
          animate={{ x: [0, -22, 0], y: [0, 22, 0], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: -4 }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-[-4rem] left-[35%] h-64 w-64 rounded-full blur-3xl"
          style={{ background: 'rgba(125,211,252,0.08)' }}
          animate={{ x: [0, 16, 0], y: [0, -12, 0], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: -8 }}
        />
        <div className="relative z-10 max-w-2xl p-6 md:p-10">
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] mb-4" style={{ color: 'rgba(97,216,137,0.82)' }}>
            ConsMAP / Story Archive
          </div>
          <h1 className="text-4xl md:text-6xl tracking-tight leading-[1.0] mb-5" style={{ color: '#f4c96a', fontFamily: "'Cinzel', serif", fontWeight: 700 }}>
            Factory Trilogy Archive
          </h1>
          <p className="text-base md:text-lg leading-8 max-w-xl mb-6" style={{ color: 'rgba(216,232,216,0.82)' }}>
            The illuminated archive of the factory, the filter, the mouse, the sludge, and the scheduled worker.
          </p>
          <div className="rounded-2xl border px-4 py-3 mb-6" style={{ borderColor: 'rgba(244,201,106,0.20)', background: 'rgba(8,12,8,0.55)' }}>
            <p className="text-sm italic leading-[1.8]" style={{ color: 'rgba(241,223,186,0.78)' }}>
              Eden vidi znamenje. Eden vidi vzrok. Boris obrne knof.
              <br />
              Signal gre naprej. In vseeno.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#archive"
              className="text-[10px] font-mono uppercase tracking-[0.18em] rounded-full border px-4 py-2"
              style={{ color: '#120c04', borderColor: 'rgba(244,201,106,0.42)', background: 'linear-gradient(135deg, #f4c96a, #ffe39d)' }}
            >
              Open Archive
            </a>
            <a
              href="#archive"
              className="text-[10px] font-mono uppercase tracking-[0.18em] rounded-full border px-4 py-2"
              style={{ color: '#f4c96a', borderColor: 'rgba(244,201,106,0.28)', background: 'rgba(8,12,8,0.62)' }}
            >
              Read Shelf
            </a>
            <div className="relative inline-block">
              {squeekParticles.map(({ id, dx, dy }) => (
                <motion.span
                  key={id}
                  className="absolute pointer-events-none select-none text-sm"
                  style={{ color: '#f4c96a', left: '50%', top: '50%', zIndex: 20 }}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{ opacity: 0, x: dx, y: dy, scale: 1.4 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  onAnimationComplete={() => setSqueekParticles(p => p.filter(pt => pt.id !== id))}
                >
                  🜂
                </motion.span>
              ))}
              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.95, rotate: [0, -3, 3, -2, 0] }}
                onClick={() => {
                  setSqueeked(true);
                  const newParticles = Array.from({ length: 6 }, (_, i) => ({
                    id: Date.now() + i,
                    dx: (Math.random() - 0.5) * 80,
                    dy: -(Math.random() * 60 + 20),
                  }));
                  setSqueekParticles(p => [...p, ...newParticles]);
                  window.setTimeout(() => setSqueeked(false), 1200);
                }}
                className="text-[10px] font-mono uppercase tracking-[0.18em] rounded-full border px-4 py-2"
                style={{ color: '#f4c96a', borderColor: 'rgba(244,201,106,0.28)', background: 'rgba(8,12,8,0.62)' }}
              >
                Squeek
              </motion.button>
            </div>
          </div>
          {squeeked && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 inline-flex rounded-full border px-3 py-2 text-[10px] font-mono uppercase tracking-[0.24em]"
              style={{ color: '#f4c96a', borderColor: 'rgba(244,201,106,0.26)', background: 'rgba(8,12,8,0.7)' }}
            >
              squeeeeeek
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
        <p className="text-base leading-7 mb-4 max-w-3xl" style={{ color: 'rgba(216,232,216,0.82)' }}>
          A symbolic / fictional / parabolic corpus for reading mechanism, myth, audit, hunger, and maintenance. The chronology is now visible first; the original markdown reader remains below.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {boundaryChips.map(({ label, cls }) => (
            <span key={label} className={`text-[9px] font-mono uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border ${cls}`}>
              {label}
            </span>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 mb-8">
          <div className="rounded-2xl border px-4 py-4" style={{ borderColor: 'rgba(71,85,105,0.4)', background: 'rgba(15,20,15,0.5)' }}>
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] mb-2" style={{ color: '#7dd3fc' }}>
              Core formula
            </div>
            <p className="text-xs leading-[1.8]" style={{ color: 'rgba(216,232,216,0.75)' }}>
              Pressure → Path → Memory → Meaning → Interface → Authority → Bears → Archives → Maintenance
            </p>
          </div>
          <div className="rounded-2xl border px-4 py-4" style={{ borderColor: 'rgba(71,85,105,0.4)', background: 'rgba(15,20,15,0.5)' }}>
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] mb-2" style={{ color: '#7dd3fc' }}>
              Core axis
            </div>
            <p className="text-xs leading-[1.8]" style={{ color: 'rgba(216,232,216,0.75)' }}>
              Boris turns the knob.<br />
              Mario checks the log.<br />
              Luigi asks who built the knob.<br />
              Scavenger writes what he sees.<br />
              Marija comes back in six weeks.<br />
              Halid plays again.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="rounded-[28px] border p-4 md:p-5 mb-8"
          style={{ borderColor: 'rgba(244,201,106,0.16)', background: 'rgba(8,12,8,0.48)' }}
        >
          <div className="grid gap-3 lg:grid-cols-[1.2fr_auto] items-center">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] mb-2" style={{ color: 'rgba(92,184,112,0.72)' }}>
                Archive search
              </div>
              <p className="text-sm leading-[1.8]" style={{ color: 'rgba(216,232,216,0.72)' }}>
                Search the tree, part menus, and supplemental archive. The chronology stays intact; matching cards get highlighted instead of being hidden.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap justify-start lg:justify-end">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Try: Rebis, mouse, smog, Continuum..."
                className="min-w-[240px] flex-1 lg:flex-none rounded-full border px-4 py-3 text-sm outline-none"
                style={{
                  color: '#f5e4bd',
                  borderColor: 'rgba(244,201,106,0.18)',
                  background: 'rgba(6,8,6,0.92)',
                }}
              />
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="rounded-full border px-4 py-3 text-[10px] font-mono uppercase tracking-[0.22em]"
                style={{
                  color: '#f4c96a',
                  borderColor: 'rgba(244,201,106,0.24)',
                  background: 'rgba(8,12,8,0.66)',
                }}
              >
                Clear
              </button>
            </div>
          </div>
          {normalizedQuery && (filteredChronology.length > 0 || filteredArchiveExtras.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filteredChronology.slice(0, 4).map((item) => (
                <span
                  key={item.path}
                  className="rounded-full border px-3 py-1 text-[9px] font-mono uppercase tracking-[0.18em]"
                  style={{ color: '#f4c96a', borderColor: 'rgba(244,201,106,0.24)', background: 'rgba(244,201,106,0.08)' }}
                >
                  tree · {item.title}
                </span>
              ))}
              {filteredArchiveExtras.slice(0, 4).map((item) => (
                <span
                  key={item.path}
                  className="rounded-full border px-3 py-1 text-[9px] font-mono uppercase tracking-[0.18em]"
                  style={{ color: '#a78bfa', borderColor: 'rgba(167,139,250,0.24)', background: 'rgba(167,139,250,0.08)' }}
                >
                  shelf · {item.title}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Tab strip — scrollable on mobile */}
        <div className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <div className="flex gap-2 pb-1 min-w-max">
            {sectionMenu.map(({ section, count }) => {
              const active = activeSection === section;
              const tone = section === 'All' ? sectionTones['Part I'] : sectionTones[section] ?? sectionTones['Part I'];
              return (
                <motion.button
                  key={section}
                  type="button"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection(section)}
                  className="flex-shrink-0 rounded-full border px-3 py-2 text-[10px] font-mono uppercase tracking-[0.22em]"
                  style={{
                    color: active ? tone.text : 'rgba(216,232,216,0.62)',
                    borderColor: active ? tone.border : 'rgba(244,201,106,0.12)',
                    background: active ? tone.chip : 'rgba(8,12,8,0.5)',
                    boxShadow: active ? `0 0 0 1px ${tone.border}` : 'none',
                  }}
                >
                  {section} · {count}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* UNIFIED ARCHIVE — chronology grid + supplemental shelf, all in one     */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section id="archive" className="mt-10">
        {/* Alternating timeline */}
        <SectionDivider
          label={activeSection === 'All' ? 'Chronological Tree' : activeSection}
          color="#f4c96a"
        />

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 bottom-0 hidden lg:block pointer-events-none"
            style={{
              width: '2px',
              transform: 'translateX(-1px)',
              background: 'linear-gradient(to bottom, rgba(125,211,252,0.78) 0%, rgba(244,201,106,0.88) 22%, rgba(92,184,112,0.76) 52%, rgba(167,139,250,0.82) 80%, rgba(251,191,36,0.52) 100%)',
            }}
          />
          {/* Cyan — Prelude zone */}
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-[2%] h-96 w-96 -translate-x-1/2 rounded-full blur-3xl pointer-events-none hidden lg:block"
            style={{ background: 'rgba(125,211,252,0.07)' }}
            animate={{ opacity: [0.4, 0.85, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Gold — Part I zone */}
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-[18%] h-80 w-80 -translate-x-1/2 rounded-full blur-3xl pointer-events-none hidden lg:block"
            style={{ background: 'rgba(244,201,106,0.07)' }}
            animate={{ opacity: [0.35, 0.72, 0.35], scale: [1, 1.07, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: -2 }}
          />
          {/* Green — Part II zone */}
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-[46%] h-96 w-96 -translate-x-1/2 rounded-full blur-3xl pointer-events-none hidden lg:block"
            style={{ background: 'rgba(92,184,112,0.06)' }}
            animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.09, 1] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: -5 }}
          />
          {/* Violet — Part III zone */}
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-[72%] h-96 w-96 -translate-x-1/2 rounded-full blur-3xl pointer-events-none hidden lg:block"
            style={{ background: 'rgba(167,139,250,0.07)' }}
            animate={{ opacity: [0.35, 0.78, 0.35], scale: [1, 1.12, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: -8 }}
          />

          <div className="grid gap-6">
            {filteredChronology.map((item, filteredIdx) => {
              const prevItem = filteredIdx > 0 ? filteredChronology[filteredIdx - 1] : null;
              const isNewSection = prevItem !== null && prevItem.section !== item.section;
              const side = filteredIdx % 2 === 0 ? 'left' : 'right';
              const tone = sectionTones[item.section] ?? sectionTones['Part I'];
              const chronIdx = chronology.indexOf(item);
              return (
                <Fragment key={item.number}>
                  {isNewSection && (
                    <SectionDivider label={item.section} color={tone.text} />
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
                    className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_110px_minmax(0,1fr)] items-center"
                  >
                    {/* Col 1 — card when side=left, EventWindow when side=right */}
                    <div className={side === 'right' ? 'hidden lg:block' : ''}>
                      {side === 'left' ? (
                        <ChronologyCard
                          item={item}
                          side="left"
                          highlight
                          active={activeChronology === item.number}
                          onClick={() => { setActiveChronology(item.number); setReader(item); setReaderChronIndex(chronIdx); }}
                        />
                      ) : (
                        <EventWindow item={item} />
                      )}
                    </div>
                    {/* Col 2 — numbered circle, always center */}
                    <div className="flex justify-center">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => { setActiveChronology(item.number); setReader(item); setReaderChronIndex(chronIdx); }}
                        className="relative h-11 w-11 rounded-full border flex items-center justify-center font-mono text-sm z-10"
                        style={{
                          color: tone.text,
                          borderColor: tone.border,
                          background: `radial-gradient(circle at 50% 30%, ${tone.glow}, rgba(8,12,8,0.94))`,
                        }}
                        animate={{
                          boxShadow: [
                            `0 0 12px ${tone.glow}`,
                            `0 0 26px ${tone.border}`,
                            `0 0 12px ${tone.glow}`,
                          ],
                        }}
                        transition={{ duration: 2.8 + filteredIdx * 0.15, repeat: Infinity, ease: 'easeInOut', delay: filteredIdx * 0.3 }}
                      >
                        {item.number}
                      </motion.button>
                    </div>
                    {/* Col 3 — card when side=right, EventWindow when side=left */}
                    <div className={side === 'left' ? 'hidden lg:block' : ''}>
                      {side === 'right' ? (
                        <ChronologyCard
                          item={item}
                          side="right"
                          highlight
                          active={activeChronology === item.number}
                          onClick={() => { setActiveChronology(item.number); setReader(item); setReaderChronIndex(chronIdx); }}
                        />
                      ) : (
                        <EventWindow item={item} />
                      )}
                    </div>
                  </motion.div>
                </Fragment>
              );
            })}
          </div>
        </div>

        {/* Relics — only when viewing everything */}
        {activeSection === 'All' && (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {relics.map((relic, index) => (
              <motion.div
                key={relic.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
              >
                <RelicCard relic={relic} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Supplemental archive — always at the end */}
        <div className="mt-12 relative">
          <motion.div
            aria-hidden="true"
            className="absolute -top-16 right-[-3rem] h-72 w-72 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(167,139,250,0.07)' }}
            animate={{ x: [0, -18, 0], y: [0, 14, 0], opacity: [0.07, 0.14, 0.07] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute top-[40%] left-[-4rem] h-56 w-56 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(255,122,47,0.06)' }}
            animate={{ x: [0, 14, 0], y: [0, -10, 0], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: -5 }}
          />
          <SectionDivider label="Supplemental Archive" color="#a78bfa" />
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredArchiveExtras.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.55, delay: index * 0.06, ease: [0.19, 1, 0.22, 1] }}
              >
                <StoryCard item={item} onOpen={(it) => { setReader(it); setReaderChronIndex(-1); }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.p
        className="text-center mt-14 text-[10px] font-mono uppercase tracking-[0.34em]"
        style={{ color: 'rgba(216,232,216,0.32)' }}
        animate={{ opacity: [0.32, 0.55, 0.32] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        🜂 &nbsp; Signal gre naprej. In vseeno. &nbsp; 🜂
      </motion.p>

      <MouseTerminal />
    </div>
  );
};

export default BedtimeStory;
