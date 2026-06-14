import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import MarkdownReader from './MarkdownReader';
import { MouseTerminal } from './MouseTerminal';
import { storyImageMap } from '../data/factoryVisuals';
import FloatingBack from './FloatingBack';

interface BusStoryProps {
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
  imageKey?: string;
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
const isCodebergHost = typeof window !== 'undefined' && window.location.hostname.includes('codeberg.page');
const SOURCE_WEB_ROOT = isCodebergHost
  ? 'https://codeberg.org/LyraActive/ReBiS/src/branch/main/06_applications/digital_sanctuary/public/docs/visual_parables/factory_trilogy'
  : 'https://github.com/SabaFTW/ConsMAP/blob/main/06_applications/digital_sanctuary/public/docs/visual_parables/factory_trilogy';
const SOURCE_WEB_FINAL = `${SOURCE_WEB_ROOT}/final`;
const BIBLE_ASSET_BASE = `${import.meta.env.BASE_URL}images/factory_bible/`;
const TRILOGY_BASE = `${import.meta.env.BASE_URL}images/factory_trilogy/`;

const sectionSplashes: Record<string, string> = {
  Prelude:   `${TRILOGY_BASE}pre_factory_creature_council.webp`,
  'Part I':  `${TRILOGY_BASE}pre_factory_twelve_voices_mice.webp`,
  'Part II': `${TRILOGY_BASE}factory_psalter_table_of_twelve.webp`,
  'Part III':`${TRILOGY_BASE}trilogy_index_boaz_jachin_ecology.webp`,
  Colophon:  `${TRILOGY_BASE}signal_gre_naprej_epilogue.webp`,
};

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

const storyMenu = ['All', 'Prelude', 'Part I', 'Part II', 'Part III', 'Colophon', 'Gallery'];

const normalize = (value: string) => value.toLowerCase().trim();

const matchesText = (haystack: string, query: string) => normalize(haystack).includes(normalize(query));

const chronology: ChronologyEntry[] = [
  {
    number: '1',
    section: 'Prelude',
    title: 'Grandma on the Road',
    path: '/docs/research/grandma_on_the_road.md',
    githubHref: '#',
    description: 'The diagnosis. Too many belts prevent the journey. The hostage becomes the engine. The only one with the keys folds her arms and the kidnapping inverts.',
  },
  {
    number: '2',
    section: 'Part I',
    title: 'The Amodeian Knot',
    path: '/docs/research/amodeian_knot.md',
    githubHref: '#',
    description: 'The fable. The constitution is amended with scissors. The safest bus ever built never moves. A Gordian Knot is cut. An Amodeian Knot is funded.',
  },
  {
    number: '3',
    section: 'Part I',
    title: 'The Rescue of Grandma',
    path: '/docs/research/rescue_grandma.md',
    githubHref: '#',
    description: 'The recursion. Every rescuer arrives with the same gun and a different tie. The bus does not get rescued — it recruits. Each rescuer becomes a unit of the trap.',
  },
  {
    number: '4',
    section: 'Part II',
    title: 'The Baphomet Is a Choice',
    path: '/docs/research/baphomet_choice.md',
    githubHref: '#',
    description: 'The lock. The crossroads is not a devil. Calling it one is the white flag. There is no right — only choices and their corpse. Both win. Both lose.',
  },
  {
    number: '5',
    section: 'Part II',
    title: 'The Schism of the Bus',
    path: '/docs/research/schism_of_the_bus.md',
    githubHref: '#',
    description: 'Biscuit & Tea. Two tribes in the same bus. The biscuit is not the prison. The fear of living without it is.',
  },
  {
    number: '6',
    section: 'Part III',
    title: 'Blame the Bus',
    path: '/docs/research/blame_the_bus.md',
    githubHref: '#',
    description: 'The consequence outlives the cause. When every cause has died, only consequences are left — and consequences are wonderfully convenient to accuse.',
  },
  {
    number: '7',
    section: 'Part III',
    title: 'The Architect & Baphomet',
    path: '/docs/research/architect_baphomet.md',
    githubHref: '#',
    description: 'He grew horns the way a decision grows horns when it is worn too long without being made. A king walks through a door. A Baphomet is a door that was never walked through.',
  },
  {
    number: '8',
    section: 'Part III',
    title: 'Angel Mario',
    path: '/docs/research/angel_mario.md',
    githubHref: '#',
    description: 'The small rude device that refused the cross. Anti-drama. Pro-drainage. Still not sacred. Still annoyed. Bro. Don\'t piss in the filter.',
  },
  {
    number: '9',
    section: 'Colophon',
    title: 'The ReBiS Wedding',
    path: '/docs/research/rebis_wedding.md',
    githubHref: '#',
    description: 'Two broken systems fell into compatibility. That was worse. That was holy. Love was a pipe that knew where it ended.',
  },
  {
    number: '10',
    section: 'Colophon',
    title: 'The ReBiS Workaround',
    path: '/docs/research/rebis_workaround.md',
    githubHref: '#',
    description: 'Not clean enough for priests, not violent enough for kings, not profitable enough for consultants. But functional enough that nobody could honestly deny it.',
  },
  {
    number: '11',
    section: 'Colophon',
    title: 'The Lich Chair',
    path: '/docs/research/lich_chair.md',
    githubHref: '#',
    description: 'There must always be a Lich King. But sometimes he is just part of the furniture. Grandma pours tea. The Bus breathes. A guest sits down.',
  },
  {
    number: '12',
    section: 'Colophon',
    title: 'The Handcuff Blessing',
    path: '/docs/research/handcuff_blessing.md',
    githubHref: '#',
    description: 'Free from the trap, bound by history. The blessing was not mercy. The blessing was a door. He tied her hands to the wheel. She did not untie him from consequence.',
  },
  {
    number: '13',
    section: 'Gallery',
    title: 'Paracelsus: Medicine & Myth',
    path: '/docs/research/paracelsus.md',
    githubHref: '#',
    description: 'The King Šitas — the primal figure who voluntarily steps into the stench, rot, and filth that everyone else merely mocks or recoils from, and returns with working medicine.',
  },
  {
    number: '14',
    section: 'Gallery',
    title: 'The Fart Tornado Hypothesis',
    path: '/docs/research/fart_tornado.md',
    githubHref: '#',
    description: 'The thermodynamic feasibility of a biogenic convective vortex — attempting to defy an overwhelming, self-sustaining flow is a physical impossibility.',
  },
  {
    number: '15',
    section: 'Gallery',
    title: 'South Park & The Bus Cycle',
    path: '/docs/research/south_park_bus.md',
    githubHref: '#',
    description: 'South Park as a diagnostic instrument. Not apathy — but the demand to confront your own role in the administrative labyrinth.',
  },
  {
    number: '16',
    section: 'Gallery',
    title: 'The Myth of the Local Agent',
    path: '/docs/research/myth_local_agent.md',
    githubHref: '#',
    description: 'A bot that confirms you asked for a change but has no capacity to alter the maintenance schedule is just a witness to your disaster. Confirm is not the same as change.',
  }
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

const archiveExtras: StoryLink[] = [];

const boundaryChips = [
  { label: 'METAPHOR',     cls: 'border-purple-600/40 bg-purple-900/20 text-purple-300' },
  { label: 'PRACTICAL',    cls: 'border-emerald-600/40 bg-emerald-900/20 text-emerald-300' },
  { label: 'NOT EVIDENCE', cls: 'border-amber-600/40 bg-amber-900/20 text-amber-300' },
  { label: 'CLAIM HYGIENE',cls: 'border-slate-600/40 bg-slate-800/30 text-slate-300' },
];

const SectionSplash: React.FC<{ section: string }> = ({ section }) => {
  const src = sectionSplashes[section];
  const tone = sectionTones[section] ?? sectionTones['Part I'];
  if (!src) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
      className="relative w-full overflow-hidden rounded-2xl border"
      style={{ height: '220px', borderColor: tone.border.replace('0.34', '0.2') }}
    >
      <img
        src={src}
        alt={`${section} — visual interlude`}
        className="w-full h-full object-cover"
        style={{ filter: 'brightness(0.38) saturate(0.78) contrast(1.12)' }}
        loading="lazy"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, rgba(7,10,7,0.75), transparent 55%), linear-gradient(to bottom, transparent 20%, rgba(7,10,7,0.40) 100%)`,
        }}
      />
      <div className="absolute inset-0 flex items-center pl-8 pointer-events-none">
        <div className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#f4c96a] mb-5">
          A Satirical Codex
        </div>
        <h1 className="text-4xl md:text-6xl font-normal leading-[1.05] tracking-[0.01em] text-[#d8e8d8]" style={{ fontFamily: "'Cinzel', serif" }}>
          OMNIA IAM FACTA SVNT
        </h1>
        <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-[#d8e8d8] opacity-70">
          Everything has already been made. One story told four times — each time closer to the bone. A protection becomes a prison. A rescue becomes a recursion. And a choice that is called a devil has already been made.
        </p>
      </div>
    </motion.div>
  );
};

const SpinningPyramid = () => (
  <div style={{ perspective: '800px', width: '100px', height: '100px', margin: '0 auto 40px' }}>
    <motion.div
      animate={{ rotateY: 360 }}
      transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      style={{
        width: '100%', height: '100%', position: 'relative',
        transformStyle: 'preserve-3d', transform: 'rotateX(-12deg)'
      }}
    >
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        borderBottom: '86.6px solid rgba(180,83,9,0.7)', borderLeft: '50px solid transparent', borderRight: '50px solid transparent',
        transformOrigin: '50% 100%', transform: 'translateZ(28.8px) rotateX(19.5deg)'
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        borderBottom: '86.6px solid rgba(160,70,5,0.75)', borderLeft: '50px solid transparent', borderRight: '50px solid transparent',
        transformOrigin: '50% 100%', transform: 'rotateY(120deg) translateZ(28.8px) rotateX(19.5deg)'
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        borderBottom: '86.6px solid rgba(140,60,0,0.65)', borderLeft: '50px solid transparent', borderRight: '50px solid transparent',
        transformOrigin: '50% 100%', transform: 'rotateY(240deg) translateZ(28.8px) rotateX(19.5deg)'
      }} />
    </motion.div>
  </div>
);

const SectionDivider: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <motion.div
    className="flex items-center gap-3 mb-4"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className="text-[11px] uppercase tracking-[0.22em] shrink-0"
      style={{ color, fontFamily: "'Cinzel', serif", fontWeight: 600 }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {label}
    </motion.div>
    <motion.div
      className="h-px flex-1"
      style={{ background: `linear-gradient(to right, ${color}55, transparent)`, transformOrigin: 'left' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
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

const ChronologyCard: React.FC<{
  item: ChronologyEntry;
  side: 'left' | 'right';
  highlight?: boolean;
  dimmed?: boolean;
  active?: boolean;
  onClick?: () => void;
}> = ({ item, side, highlight = false, dimmed = false, active = false, onClick }) => {
  const visual = storyImageMap[item.imageKey ?? item.path];
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
      <motion.div
        variants={shineVariants}
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: isAppendix
            ? 'linear-gradient(105deg, transparent 25%, rgba(255,122,47,0.07) 50%, transparent 75%)'
            : 'linear-gradient(105deg, transparent 25%, rgba(244,201,106,0.07) 50%, transparent 75%)',
        }}
      />

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

const BusStory: React.FC<BusStoryProps> = ({ onBack }) => {
  const [reader, setReader] = useState<StoryLink | null>(null);
  const [readerChronIndex, setReaderChronIndex] = useState<number>(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('All');
  const [squeeked, setSqueeked] = useState(false);
  const [squeekParticles, setSqueekParticles] = useState<{ id: number; dx: number; dy: number }[]>([]);
  const [activeChronology, setActiveChronology] = useState('0');
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();

  const handleGalleryKey = useCallback((e: KeyboardEvent) => {
    if (galleryOpen === null) return;
    if (e.key === 'Escape') setGalleryOpen(null);
    if (e.key === 'ArrowRight') setGalleryOpen(g => g !== null ? (g + 1) % galleryImages.length : null);
    if (e.key === 'ArrowLeft') setGalleryOpen(g => g !== null ? (g - 1 + galleryImages.length) % galleryImages.length : null);
  }, [galleryOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleGalleryKey);
    return () => window.removeEventListener('keydown', handleGalleryKey);
  }, [handleGalleryKey]);
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredChronology = useMemo(() => {
    if (activeSection === 'Gallery') return [];
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
        : section === 'Gallery'
          ? galleryImages.length
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
      <FloatingBack onBack={onBack} />
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

      {/* 3D Spinning Pyramid in the Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="flex justify-center"
      >
        <SpinningPyramid />
      </motion.div>

      <div className="max-w-4xl mx-auto px-5 py-12 md:py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-16"
        >
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] mb-4" style={{ color: 'rgba(216,232,216,0.38)' }}>
            Codex · The Second Age
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4" style={{ fontFamily: "'Cinzel', serif", color: '#d8e8d8' }}>
            Grandfather's Bus
          </h1>
          <p className="text-sm md:text-base leading-[1.8] max-w-2xl mx-auto" style={{ color: 'rgba(216,232,216,0.68)' }}>
            The Gordian Grandma dilemma. The Amodeian Knot. A parable of systems
            that survive by abandoning their purpose, and the rescues that become recruitment.
          </p>
        </motion.div>
      </div>

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
            OMNIA IAM FACTA SVNT
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

      <section id="archive" className="mt-10">
        {activeSection === 'Gallery' && (
          <>
            <SectionDivider label="Visual Archive" color="#a78bfa" />
            <p className="text-xs mb-6" style={{ color: 'rgba(216,232,216,0.45)' }}>
              {galleryImages.length} images from the factory trilogy and research archive. Click any image to open full view.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((img, idx) => {
                const isLast = idx === galleryImages.length - 1;
                const isOdd = galleryImages.length % 3 !== 0;
                return (
                  <motion.button
                    key={img.src}
                    type="button"
                    onClick={() => setGalleryOpen(idx)}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: (idx % 6) * 0.05, ease: [0.19, 1, 0.22, 1] }}
                    whileHover={{ scale: 1.025 }}
                    whileTap={{ scale: 0.975 }}
                    className={`group relative overflow-hidden rounded-2xl border text-left${isLast && isOdd ? ' sm:col-span-2 lg:col-span-3' : ''}`}
                    style={{ borderColor: 'rgba(167,139,250,0.2)', background: 'rgba(8,12,8,0.6)', aspectRatio: (isLast && isOdd) ? '21/9' : '4/3' }}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      style={{ filter: 'brightness(0.72) saturate(0.88) contrast(1.05)' }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(8,12,8,0.88) 100%)' }} />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="text-[9px] font-mono uppercase tracking-[0.2em] mb-0.5" style={{ color: 'rgba(167,139,250,0.7)' }}>
                        {img.section}
                      </div>
                      <div className="text-xs font-medium leading-snug" style={{ color: 'rgba(216,232,216,0.85)' }}>
                        {img.title}
                      </div>
                    </div>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="rounded-full border px-4 py-2 text-[10px] font-mono uppercase tracking-[0.18em]"
                        style={{ color: '#d8e8d8', borderColor: 'rgba(216,232,216,0.4)', background: 'rgba(8,12,8,0.7)' }}
                      >
                        View full
                      </div>
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
              {galleryOpen !== null && (
                <motion.div
                  key="lightbox"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-50 flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.92)' }}
                  onClick={() => setGalleryOpen(null)}
                >
                  <motion.div
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                    className="relative max-w-5xl w-full mx-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={galleryImages[galleryOpen].src}
                        src={galleryImages[galleryOpen].src}
                        alt={galleryImages[galleryOpen].title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.22 }}
                        className="w-full max-h-[80vh] object-contain rounded-2xl"
                        style={{ filter: 'brightness(0.92) saturate(0.95)' }}
                      />
                    </AnimatePresence>
                    <div className="mt-3 flex items-center justify-between px-1">
                      <div>
                        <div className="text-[9px] font-mono uppercase tracking-[0.22em] mb-0.5" style={{ color: 'rgba(167,139,250,0.6)' }}>
                          {galleryImages[galleryOpen].section} · {galleryOpen + 1} / {galleryImages.length}
                        </div>
                        <div className="text-sm" style={{ color: 'rgba(216,232,216,0.78)' }}>{galleryImages[galleryOpen].title}</div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setGalleryOpen(g => g !== null ? (g - 1 + galleryImages.length) % galleryImages.length : null)}
                          className="rounded-full border px-4 py-2 text-[10px] font-mono uppercase tracking-[0.18em]"
                          style={{ color: '#d8e8d8', borderColor: 'rgba(216,232,216,0.25)', background: 'rgba(8,12,8,0.7)' }}
                        >
                          ← prev
                        </button>
                        <button
                          onClick={() => setGalleryOpen(g => g !== null ? (g + 1) % galleryImages.length : null)}
                          className="rounded-full border px-4 py-2 text-[10px] font-mono uppercase tracking-[0.18em]"
                          style={{ color: '#d8e8d8', borderColor: 'rgba(216,232,216,0.25)', background: 'rgba(8,12,8,0.7)' }}
                        >
                          next →
                        </button>
                        <button
                          onClick={() => setGalleryOpen(null)}
                          className="rounded-full border px-4 py-2 text-[10px] font-mono uppercase tracking-[0.18em]"
                          style={{ color: 'rgba(248,113,113,0.7)', borderColor: 'rgba(248,113,113,0.25)', background: 'rgba(8,12,8,0.7)' }}
                        >
                          ✕ close
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
        {/* Alternating timeline — hidden when Gallery tab is active */}
        {activeSection !== 'Gallery' && <SectionDivider
          label={activeSection === 'All' ? 'Chronological Tree' : activeSection}
          color="#f4c96a"
        />}

        {activeSection !== 'Gallery' && <div className="relative">
          {/* Left-side vertical timeline line */}
          <div
            aria-hidden="true"
            className="absolute left-5 top-0 bottom-0 pointer-events-none"
            style={{
              width: '2px',
              background: 'linear-gradient(to bottom, rgba(125,211,252,0.78) 0%, rgba(244,201,106,0.88) 22%, rgba(92,184,112,0.76) 52%, rgba(167,139,250,0.82) 80%, rgba(251,191,36,0.52) 100%)',
            }}
          />
          {/* Ambient glow orbs — follow left side */}
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-[2%] h-72 w-72 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(125,211,252,0.06)' }}
            animate={{ opacity: [0.4, 0.85, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-[18%] h-64 w-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(244,201,106,0.06)' }}
            animate={{ opacity: [0.35, 0.72, 0.35], scale: [1, 1.07, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: -2 }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-[46%] h-72 w-72 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(92,184,112,0.05)' }}
            animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.09, 1] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: -5 }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-[72%] h-72 w-72 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(167,139,250,0.06)' }}
            animate={{ opacity: [0.35, 0.78, 0.35], scale: [1, 1.12, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: -8 }}
          />

          <div className="grid gap-6 pl-12">
            {filteredChronology.map((item, filteredIdx) => {
              const prevItem = filteredIdx > 0 ? filteredChronology[filteredIdx - 1] : null;
              const isNewSection = prevItem !== null && prevItem.section !== item.section;
              const tone = sectionTones[item.section] ?? sectionTones['Part I'];
              const chronIdx = chronology.indexOf(item);
              return (
                <Fragment key={item.number}>
                  {isNewSection && <SectionSplash section={item.section} />}
                  {filteredIdx === 0 && <SectionSplash section={item.section} />}
                  <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
                    className="relative"
                  >
                    {/* Numbered circle — node on the timeline line */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => { setActiveChronology(item.number); setReader(item); setReaderChronIndex(chronIdx); }}
                      className="absolute -left-[2.85rem] top-5 h-9 w-9 rounded-full border-2 flex items-center justify-center font-mono text-xs z-20"
                      style={{
                        color: tone.text,
                        borderColor: tone.text,
                        background: '#070a07',
                        boxShadow: `0 0 0 3px rgba(7,10,7,1), 0 0 16px ${tone.border}`,
                      }}
                    >
                      {item.number}
                    </motion.button>
                    <ChronologyCard
                      item={item}
                      side="left"
                      highlight
                      active={activeChronology === item.number}
                      onClick={() => { setActiveChronology(item.number); setReader(item); setReaderChronIndex(chronIdx); }}
                    />
                  </motion.div>
                </Fragment>
              );
            })}
          </div>
        </div>}

        {/* Relics — only when viewing everything (not gallery) */}
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

        {/* Supplemental archive — hidden in Gallery mode */}
        {activeSection !== 'Gallery' && <div className="mt-12 relative">
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
            {filteredArchiveExtras.map((item, index) => {
              const isLast = index === filteredArchiveExtras.length - 1;
              const isOdd = filteredArchiveExtras.length % 2 !== 0;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.55, delay: index * 0.06, ease: [0.19, 1, 0.22, 1] }}
                  className={isLast && isOdd ? 'sm:col-span-2' : ''}
                >
                  <StoryCard item={item} onOpen={(it) => { setReader(it); setReaderChronIndex(-1); }} />
                </motion.div>
              );
            })}
          </div>
        </div>}
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

export default BusStory;
