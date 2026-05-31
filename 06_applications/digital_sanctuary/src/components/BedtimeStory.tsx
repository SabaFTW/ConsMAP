import { useMemo, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import MarkdownReader from './MarkdownReader';
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
const GITHUB_ROOT = 'https://github.com/SabaFTW/ConsMAP/blob/main/docs/visual_parables/factory_trilogy';
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
    title: 'First Feast / Poop Fiesta',
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
    title: 'Great Depresion / First Sludge',
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
    title: 'Second Booting',
    path: `${REPO_PATH}/second_booting.md`,
    githubHref: `${GITHUB_ROOT}/second_booting.md`,
    description: 'Gregor restores Mario Recovery, disables the yes-bot, stabilizes Ur-God, and installs Mouse Translation.',
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
    title: 'Valley Return / Rebuild Law',
    path: `${REPO_PATH}/colophon.md`,
    githubHref: `${GITHUB_ROOT}/colophon.md`,
    description: 'Mouse goes down to ants, bees, and bear. Route-memory returns: what part are you doing?',
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
];

const boundaryChips = [
  { label: 'METAPHOR',     cls: 'border-purple-600/40 bg-purple-900/20 text-purple-300' },
  { label: 'PRACTICAL',    cls: 'border-emerald-600/40 bg-emerald-900/20 text-emerald-300' },
  { label: 'NOT EVIDENCE', cls: 'border-amber-600/40 bg-amber-900/20 text-amber-300' },
  { label: 'CLAIM HYGIENE',cls: 'border-slate-600/40 bg-slate-800/30 text-slate-300' },
];

const SectionDivider: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="h-px flex-1" style={{ background: 'rgba(100,116,139,0.25)' }} />
    <div className="text-[10px] font-mono uppercase tracking-[0.26em]" style={{ color }}>
      {label}
    </div>
    <div className="h-px flex-1" style={{ background: 'rgba(100,116,139,0.25)' }} />
  </div>
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
  const visual = storyImageMap[item.path];
  const tone = sectionTones[item.section] ?? sectionTones['Part I'];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      animate={{
        scale: active ? 1.015 : 1,
        y: active ? -3 : 0,
      }}
      transition={{ duration: 0.32, ease: [0.19, 1, 0.22, 1] }}
      whileTap={{ scale: 0.985 }}
      className={`group w-full text-left rounded-2xl border overflow-hidden transition-all duration-300 ${side === 'left' ? 'lg:justify-self-end' : 'lg:justify-self-start'}`}
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
      <div className="relative">
        {visual && (
          <div className="relative w-full overflow-hidden aspect-[16/9]">
            <img
              src={visual.src}
              alt={visual.alt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              style={{ filter: 'brightness(0.72) saturate(0.92) contrast(1.05)' }}
              loading="lazy"
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
        </div>
      </div>
    </motion.button>
  );
};

const StoryCard: React.FC<{ item: StoryLink; onOpen: (item: StoryLink) => void }> = ({ item, onOpen }) => {
  const visual = storyImageMap[item.path];

  return (
    <button
      onClick={() => onOpen(item)}
      className="group w-full text-left rounded-2xl border bg-slate-950/60 overflow-hidden transition-all duration-200"
      style={{ borderColor: 'rgba(71,85,105,0.5)', boxShadow: '0 1px 20px rgba(0,0,0,0.35)' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.35)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 28px rgba(34,211,238,0.08)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(71,85,105,0.5)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 20px rgba(0,0,0,0.35)';
      }}
    >
      {/* Thumbnail */}
      {visual && (
        <div className="relative w-full overflow-hidden" style={{ height: '120px' }}>
          <img
            src={visual.src}
            alt={visual.alt}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.7) saturate(0.85) contrast(1.05)' }}
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(8,12,8,0.82) 100%)' }}
          />
          {item.tag && (
            <div
              className="absolute bottom-2 left-3 text-[9px] font-mono uppercase tracking-[0.22em]"
              style={{ color: 'rgba(92,184,112,0.9)' }}
            >
              {item.tag}
            </div>
          )}
        </div>
      )}

      {/* Card body */}
      <div className="p-4">
        {!visual && item.tag && (
          <div className="text-[9px] font-mono uppercase tracking-[0.24em] mb-2" style={{ color: 'rgba(92,184,112,0.65)' }}>
            {item.tag}
          </div>
        )}
        <div className="text-sm font-medium leading-5 mb-2" style={{ color: '#d8e8d8' }}>
          {item.title}
        </div>
        <div className="text-sm leading-[1.7] mb-3" style={{ color: 'rgba(216,232,216,0.78)' }}>
          {item.description}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: '#5cb870' }}>
            Read in archive →
          </div>
          <a
            href={item.githubHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[9px] font-mono uppercase tracking-[0.14em] hover:opacity-100 transition-opacity"
            style={{ color: 'rgba(92,184,112,0.35)' }}
          >
            source ↗
          </a>
        </div>
      </div>
    </button>
  );
};

const BedtimeStory: React.FC<BedtimeStoryProps> = ({ onBack }) => {
  const [reader, setReader] = useState<StoryLink | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('All');
  const [squeeked, setSqueeked] = useState(false);
  const [activeChronology, setActiveChronology] = useState('0');
  const { scrollYProgress } = useScroll();
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const chronologySearchMatches = useMemo(() => {
    if (!normalizedQuery) return [];
    return chronology.filter((item) =>
      matchesText(`${item.number} ${item.section} ${item.title} ${item.description}`, normalizedQuery),
    );
  }, [normalizedQuery]);

  const archiveSearchMatches = useMemo(() => {
    if (!normalizedQuery) return [];
    return archiveExtras.filter((item) =>
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
    return (
      <MarkdownReader
        path={reader.path}
        title={reader.title}
        onBack={() => setReader(null)}
        githubUrl={reader.githubHref}
        imageSrc={visual?.src}
        imageAlt={visual?.alt}
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
          className="absolute -top-24 left-[-6rem] h-64 w-64 rounded-full blur-3xl"
          style={{ background: 'rgba(244,201,106,0.12)' }}
          animate={{ x: [0, 24, 0], y: [0, -14, 0], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute right-[-8rem] top-[22%] h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'rgba(125,211,252,0.10)' }}
          animate={{ x: [0, -18, 0], y: [0, 18, 0], opacity: [0.10, 0.18, 0.10] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: -4 }}
        />
        <div className="relative z-10 max-w-2xl p-6 md:p-10">
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] mb-4" style={{ color: 'rgba(97,216,137,0.82)' }}>
            ConsMAP / Story Archive
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[0.98] mb-5" style={{ color: '#f4c96a' }}>
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
              href="#chronology"
              className="text-[10px] font-mono uppercase tracking-[0.18em] rounded-full border px-4 py-2"
              style={{ color: '#120c04', borderColor: 'rgba(244,201,106,0.42)', background: 'linear-gradient(135deg, #f4c96a, #ffe39d)' }}
            >
              Open Chronology
            </a>
            <a
              href="#reader-shelf"
              className="text-[10px] font-mono uppercase tracking-[0.18em] rounded-full border px-4 py-2"
              style={{ color: '#f4c96a', borderColor: 'rgba(244,201,106,0.28)', background: 'rgba(8,12,8,0.62)' }}
            >
              Read MD Archive
            </a>
            <motion.button
              type="button"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSqueeked(true);
                window.setTimeout(() => setSqueeked(false), 1200);
              }}
              className="text-[10px] font-mono uppercase tracking-[0.18em] rounded-full border px-4 py-2"
              style={{ color: '#f4c96a', borderColor: 'rgba(244,201,106,0.28)', background: 'rgba(8,12,8,0.62)' }}
            >
              Squeek
            </motion.button>
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
          {(chronologySearchMatches.length > 0 || archiveSearchMatches.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {chronologySearchMatches.slice(0, 4).map((item) => (
                <span
                  key={item.path}
                  className="rounded-full border px-3 py-1 text-[9px] font-mono uppercase tracking-[0.18em]"
                  style={{ color: '#f4c96a', borderColor: 'rgba(244,201,106,0.24)', background: 'rgba(244,201,106,0.08)' }}
                >
                  tree · {item.title}
                </span>
              ))}
              {archiveSearchMatches.slice(0, 4).map((item) => (
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

        <div className="flex flex-wrap gap-2 mb-8">
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
                className="rounded-full border px-3 py-2 text-[10px] font-mono uppercase tracking-[0.22em]"
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
      </motion.div>

      <section id="chronology" className="mt-10">
        <SectionDivider label="Corrected Chronological Tree" color="#f4c96a" />
        <div className="relative overflow-hidden rounded-[32px] border" style={{ borderColor: 'rgba(244,201,106,0.14)', background: 'rgba(8,12,8,0.42)' }}>
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(8,12,8,0.32), rgba(8,12,8,0.88))' }}
            aria-hidden="true"
          />

          <div className="relative z-10 p-4 md:p-6 lg:p-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr_1fr] items-start mb-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.65 }}
                className="rounded-2xl border px-4 py-4"
                style={{ borderColor: 'rgba(244,201,106,0.14)', background: 'rgba(15,20,15,0.58)' }}
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.22em] mb-2" style={{ color: 'rgba(92,184,112,0.72)' }}>
                  Left wing
                </div>
                <p className="text-sm leading-[1.8]" style={{ color: 'rgba(216,232,216,0.74)' }}>
                  The left side carries the pre-factory and Part I pressure: route memory, darkness, the hidden no, and the first moment when mechanism stops pretending to be myth.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="rounded-2xl border px-4 py-4 text-center"
                style={{ borderColor: 'rgba(244,201,106,0.18)', background: 'rgba(15,20,15,0.66)' }}
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.28em] mb-2" style={{ color: '#f4c96a' }}>
                  Saga Tree
                </div>
                <p className="text-sm leading-[1.8]" style={{ color: 'rgba(216,232,216,0.76)' }}>
                  Corrected chronological flow. The cards are visual markers; the matching markdown lives in the shelf below for anything not already shown here.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="rounded-2xl border px-4 py-4"
                style={{ borderColor: 'rgba(244,201,106,0.14)', background: 'rgba(15,20,15,0.58)' }}
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.22em] mb-2" style={{ color: 'rgba(92,184,112,0.72)' }}>
                  Right wing
                </div>
                <p className="text-sm leading-[1.8]" style={{ color: 'rgba(216,232,216,0.74)' }}>
                  The right side is the collapse and recovery sequence: closure, Continuum, Second Booting, Rebis, and the Mouse incident that makes the boardroom honest.
                </p>
              </motion.div>
            </div>

            <div className="relative">
              <div
                className="absolute left-1/2 top-0 bottom-0 hidden lg:block"
                style={{ width: '2px', transform: 'translateX(-1px)', background: 'linear-gradient(to bottom, rgba(244,201,106,0.92), rgba(244,201,106,0.08))' }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 20%, rgba(244,201,106,0.08), transparent 35%)' }}
                animate={{ opacity: [0.35, 0.7, 0.35] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="grid gap-6">
                {chronology.map((item, index) => {
                  const side = index % 2 === 0 ? 'left' : 'right';
                  const tone = sectionTones[item.section] ?? sectionTones['Part I'];
                  const highlighted =
                    (normalizedQuery && matchesText(`${item.number} ${item.section} ${item.title} ${item.description}`, normalizedQuery)) ||
                    activeSection === 'All' ||
                    activeSection === item.section;
                  const dimmed = activeSection !== 'All' && activeSection !== item.section;
                  return (
                    <div
                      key={item.number}
                      className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] items-center"
                    >
                      <div className={side === 'left' ? 'order-1' : 'order-3'}>
                        {side === 'left' ? (
                          <ChronologyCard
                            item={item}
                            side="left"
                            highlight={highlighted}
                            dimmed={dimmed}
                            active={activeChronology === item.number}
                            onClick={() => setActiveChronology(item.number)}
                          />
                        ) : null}
                      </div>
                      <div className="order-2 flex justify-center">
                        <button
                          type="button"
                          onClick={() => setActiveChronology(item.number)}
                          className="h-12 w-12 rounded-full border flex items-center justify-center font-mono text-sm transition-transform duration-300 hover:scale-[1.05]"
                          style={{
                            color: tone.text,
                            borderColor: tone.border,
                            background: `radial-gradient(circle at 50% 30%, ${tone.glow}, rgba(8,12,8,0.92))`,
                            boxShadow: `0 0 24px ${tone.glow}`,
                            opacity: dimmed ? 0.55 : 1,
                          }}
                        >
                          {item.number}
                        </button>
                      </div>
                      <div className={side === 'right' ? 'order-3' : 'order-1'}>
                        {side === 'right' ? (
                          <ChronologyCard
                            item={item}
                            side="right"
                            highlight={highlighted}
                            dimmed={dimmed}
                            active={activeChronology === item.number}
                            onClick={() => setActiveChronology(item.number)}
                          />
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

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
          </div>
        </div>
      </section>

      <section id="reader-shelf" className="mt-12">
        <SectionDivider label="Markdown Reading Shelf" color="#34d399" />
        <p className="text-sm leading-[1.8] mb-5" style={{ color: 'rgba(216,232,216,0.62)' }}>
          These cards keep the original ConsMAP markdown reading flow. Click any text to open it inside the app.
        </p>
      </section>

      <section className="mt-10">
        <SectionDivider label="Supplemental Archive" color="#a78bfa" />
        <p className="text-sm leading-[1.8] mb-5" style={{ color: 'rgba(216,232,216,0.62)' }}>
          Only the texts not already shown in the tree live here.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {archiveExtras.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              style={{
                opacity:
                  normalizedQuery && !matchesText(`${item.title} ${item.description} ${item.tag ?? ''}`, normalizedQuery) ? 0.45 : 1,
                transform:
                  normalizedQuery && !matchesText(`${item.title} ${item.description} ${item.tag ?? ''}`, normalizedQuery)
                    ? 'scale(0.985)'
                    : 'none',
              }}
            >
              <StoryCard item={item} onOpen={setReader} />
            </motion.div>
          ))}
        </div>
      </section>

      <p className="text-center mt-14 text-[10px] font-mono uppercase tracking-[0.34em]" style={{ color: 'rgba(216,232,216,0.32)' }}>
        Signal gre naprej. In vseeno.
      </p>
    </div>
  );
};

export default BedtimeStory;
