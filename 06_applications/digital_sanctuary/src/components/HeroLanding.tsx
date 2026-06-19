import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { type Theme } from '../lib/themes';

interface HeroLandingProps {
  theme: Theme;
  onNavigate: (view: 'mirror' | 'story' | 'analyzer' | 'docs' | 'aimode' | 'frame', meta?: string) => void;
}

type ItemAction =
  | { type: 'view'; view: 'mirror' | 'story' | 'analyzer' | 'docs' | 'aimode' }
  | { type: 'docs'; docPath: string }
  | { type: 'frame'; url: string };

type RecentDestination = {
  label: string;
  desc: string;
  accent: string;
  border: string;
  image?: string;
  action: ItemAction;
};

// ── Route cards ───────────────────────────────────────────────────────────────

const routeCards: Array<{
  label: string;
  desc: string;
  chip: string;
  accent: string;
  glow: string;
  border: string;
  wide?: boolean;
  action: ItemAction;
}> = [
  {
    label: 'Stories — Parables',
    desc: 'The Sugar Factory, The Grandfather\'s Bus, and parables yet to come. Choose your story.',
    chip: 'STORIES',
    accent: '#c2410c',
    glow: 'rgba(194,65,12,0.10)',
    border: 'rgba(194,65,12,0.24)',
    action: { type: 'frame', url: `${import.meta.env.BASE_URL}pravljica/index.html` },
  },
  {
    label: 'ZALA — The Third Pillar',
    desc: 'Verify, not believe. The operator & witness axis — evidence corpus, the bridge, Stone Tablets, GHOSTCORE, and the Lorekeeper research archive.',
    chip: 'ZALA',
    accent: '#57cabd',
    glow: 'rgba(87,202,189,0.09)',
    border: 'rgba(87,202,189,0.24)',
    action: { type: 'frame', url: `${import.meta.env.BASE_URL}zalasite/zala.html` },
  },
  {
    label: 'Library',
    desc: 'Browse protocols, field guides, and archive layers — no GitHub required.',
    chip: 'LIBRARY',
    accent: '#7dd3fc',
    glow: 'rgba(125,211,252,0.09)',
    border: 'rgba(125,211,252,0.22)',
    action: { type: 'view', view: 'docs' },
  },
  {
    label: 'Claim Analyzer',
    desc: 'Drop in a claim. Get labels, risks, and better next questions.',
    chip: 'TOOL',
    accent: '#f4c96a',
    glow: 'rgba(244,201,106,0.09)',
    border: 'rgba(244,201,106,0.22)',
    action: { type: 'view', view: 'analyzer' },
  },
  {
    label: 'Symbol Mirror',
    desc: 'One event. Two languages. The middle is the map.',
    chip: 'SYMBOLIC',
    accent: '#a78bfa',
    glow: 'rgba(167,139,250,0.09)',
    border: 'rgba(167,139,250,0.22)',
    action: { type: 'view', view: 'mirror' },
  },
  {
    label: 'AI Mode',
    desc: 'Bicameral HUD — three-lane evidence view. Technical · Gate · Human Meaning.',
    chip: 'OPERATOR',
    accent: '#6fcf85',
    glow: 'rgba(111,207,133,0.09)',
    border: 'rgba(111,207,133,0.22)',
    action: { type: 'view', view: 'aimode' },
  },
];

// ── Hover helpers ─────────────────────────────────────────────────────────────

const onEnter = (el: HTMLElement, glow: string) => {
  el.style.boxShadow = `0 8px 36px ${glow.replace(/[\d.]+\)$/, '0.20)')}`;
};
const onLeave = (el: HTMLElement) => { el.style.boxShadow = 'none'; };

const RECENT_KEY = 'consmap_recent_destinations';

function destinationForAction(action: ItemAction): RecentDestination | null {
  if (action.type === 'frame') {
    if (action.url.includes('zalasite')) return {
      label: 'Zala Operator',
      desc: 'Stone Tablets, GHOSTCORE, evidence map, pattern, saga, and witness architecture.',
      accent: '#57cabd',
      border: 'rgba(87,202,189,0.24)',
      image: `${import.meta.env.BASE_URL}images/stories-static-seal.png`,
      action,
    };
    if (action.url.includes('pravljica')) return {
      label: 'Story Archive',
      desc: 'Factory, GrandBus, Stone Tablets, and the next arrivals.',
      accent: '#c2410c',
      border: 'rgba(194,65,12,0.28)',
      image: `${import.meta.env.BASE_URL}images/stories-static-pyramid.png`,
      action,
    };
  }
  if (action.type === 'view') {
    if (action.view === 'docs') return {
      label: 'Library',
      desc: 'Protocols, field guides, and archive layers.',
      accent: '#7dd3fc',
      border: 'rgba(125,211,252,0.24)',
      action,
    };
    if (action.view === 'analyzer') return {
      label: 'Claim Analyzer',
      desc: 'Labels, risks, and better next questions.',
      accent: '#f4c96a',
      border: 'rgba(244,201,106,0.24)',
      action,
    };
    if (action.view === 'mirror') return {
      label: 'Symbol Mirror',
      desc: 'One event. Two languages. The middle is the map.',
      accent: '#a78bfa',
      border: 'rgba(167,139,250,0.24)',
      action,
    };
    if (action.view === 'aimode') return {
      label: 'AI Mode',
      desc: 'Bicameral HUD — technical, gate, and human meaning.',
      accent: '#6fcf85',
      border: 'rgba(111,207,133,0.24)',
      action,
    };
  }
  return null;
}

function pushRecentDestination(dest: RecentDestination) {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const existing = raw ? JSON.parse(raw) as RecentDestination[] : [];
    const deduped = existing.filter((item) => item.label !== dest.label);
    const next = [dest, ...deduped].slice(0, 2);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    // ignore storage failures
  }
}

// ── Signal log hook ───────────────────────────────────────────────────────────

function useSignalLog() {
  const [lastVisit, setLastVisit] = useState('');
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    setVisitCount(parseInt(localStorage.getItem('consmap_visits') || '1', 10));
    const raw = localStorage.getItem('consmap_last_visit');
    if (raw) {
      const diff = Math.floor((Date.now() - new Date(raw).getTime()) / 86400000);
      if (diff === 0) setLastVisit('today');
      else if (diff === 1) setLastVisit('yesterday');
      else setLastVisit(`${diff} days ago`);
    }
  }, []);

  return { lastVisit, visitCount };
}

// ── Inline editable name ──────────────────────────────────────────────────────

function useEditableName() {
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(localStorage.getItem('consmap_visitor_name') || '');
  }, []);

  const startEdit = useCallback(() => {
    setDraft(name);
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [name]);

  const commit = useCallback(() => {
    const trimmed = draft.trim();
    setName(trimmed);
    if (trimmed) localStorage.setItem('consmap_visitor_name', trimmed);
    else localStorage.removeItem('consmap_visitor_name');
    setEditing(false);
  }, [draft]);

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') commit();
    if (e.key === 'Escape') setEditing(false);
  }, [commit]);

  return { name, editing, draft, setDraft, inputRef, startEdit, commit, handleKey };
}

function useRecentDestinations() {
  const [recent, setRecent] = useState<RecentDestination[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (!raw) return;
      setRecent(JSON.parse(raw) as RecentDestination[]);
    } catch {
      // ignore storage failures
    }
  }, []);

  return recent;
}

// ── Component ─────────────────────────────────────────────────────────────────

const HeroLanding: React.FC<HeroLandingProps> = ({ theme, onNavigate }) => {
  const { lastVisit, visitCount } = useSignalLog();
  const { name, editing, draft, setDraft, inputRef, startEdit, commit, handleKey } = useEditableName();
  const recent = useRecentDestinations();

  const handleAction = (action: ItemAction) => {
    const dest = destinationForAction(action);
    if (dest) pushRecentDestination(dest);
    if (action.type === 'view') onNavigate(action.view);
    else if (action.type === 'docs') onNavigate('docs', action.docPath);
    // Standalone pages (Stories, ZALA, FAQ, REBiS, …) open as full-page loads.
    // The in-app iframe ('frame') fails on static hosts like Codeberg Pages, so
    // navigate directly — these pages carry their own nav / back links.
    else window.location.href = action.url;
  };

  return (
    <div className="relative z-10 min-h-screen px-5 py-14 md:py-20">
      {/* Ambient glow — themed */}
      <motion.div
        animate={{ opacity: [0.05, 0.10, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed inset-0 pointer-events-none"
        style={{ background: theme.heroGlow }}
      />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* ── Signal log ───────────────────────────────────────────────────── */}
        {(lastVisit || visitCount > 1) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.0 }}
            className="text-right mb-4"
          >
            <span className="text-[9px] font-mono tracking-[0.22em] uppercase" style={{ color: 'rgba(216,232,216,0.16)' }}>
              {lastVisit && `last visit: ${lastVisit}`}
              {lastVisit && visitCount > 1 && ' · '}
              {visitCount > 1 && `visit #${visitCount}`}
            </span>
          </motion.div>
        )}

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-3" style={{ color: '#d8e8d8' }}>
            ConsMAP
          </h1>
          <p
            className="text-xs font-mono tracking-[0.24em] uppercase mb-5"
            style={{ color: theme.accentSoft, transition: 'color 0.6s ease' }}
          >
            {theme.tagline}
          </p>

          {/* Editable greeting */}
          {editing ? (
            <div className="flex items-center justify-center gap-2">
              <input
                ref={inputRef}
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={handleKey}
                onBlur={commit}
                maxLength={32}
                placeholder="your name or alias"
                className="bg-transparent outline-none border-b text-base font-light text-center tracking-wide"
                style={{
                  color: theme.accent,
                  borderColor: `${theme.accent}55`,
                  caretColor: theme.accent,
                  width: '220px',
                }}
              />
              <button
                onMouseDown={commit}
                className="text-[9px] font-mono tracking-[0.18em] uppercase transition-opacity"
                style={{ color: theme.accent, opacity: 0.6 }}
              >
                ✓
              </button>
            </div>
          ) : (
            <button
              onClick={startEdit}
              title="Click to change name"
              className="max-w-lg mx-auto text-base leading-8 cursor-text hover:opacity-80 transition-opacity duration-200"
              style={{ color: 'rgba(216,232,216,0.68)', display: 'block', width: '100%' }}
            >
              {theme.greeting(name)}
              <span className="ml-1.5 text-[9px] font-mono opacity-25 align-middle">✎</span>
            </button>
          )}
        </motion.div>

        {/* ── Stories from the Static ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
          className="mb-10"
        >
          <SectionRule label="featured library" accent="rgba(245,158,11,0.55)" />
          <div
            className="rounded-[28px] border overflow-hidden"
            style={{
              borderColor: 'rgba(200,90,23,0.18)',
              background: 'linear-gradient(155deg, rgba(10,12,10,0.92) 0%, rgba(8,10,8,0.98) 100%)',
              boxShadow: '0 20px 80px rgba(0,0,0,0.32)',
            }}
          >
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="px-6 py-7 md:px-8 md:py-9">
                <div className="text-[10px] font-mono uppercase tracking-[0.26em] mb-4" style={{ color: 'rgba(200,90,23,0.62)' }}>
                  Visual parables · archive
                </div>
                <h2
                  className="text-3xl md:text-5xl font-light tracking-tight leading-[1.04] mb-3"
                  style={{ color: '#f6efe3', fontFamily: "'Cinzel', serif" }}
                >
                  Stories from the <span style={{ color: '#c85a17' }}>Static</span>
                </h2>
                <p className="text-xs md:text-sm leading-[1.9] mb-5 max-w-xl" style={{ color: 'rgba(216,232,216,0.56)' }}>
                  The library door for the visual parables — Factory, GrandBus, Stone Tablets, and the next arrivals. One template, different voices, distinct colors, same archive logic.
                </p>
                <p className="text-[11px] font-mono tracking-[0.14em] italic mb-6" style={{ color: 'rgba(216,232,216,0.38)' }}>
                  Signal went forward. And yet. △
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleAction({ type: 'frame', url: `${import.meta.env.BASE_URL}pravljica/index.html` })}
                    className="px-4 py-2 rounded-full border text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-200"
                    style={{ borderColor: 'rgba(200,90,23,0.28)', color: '#c85a17', background: 'rgba(200,90,23,0.08)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,90,23,0.48)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,90,23,0.28)'; }}
                  >
                    Enter story archive →
                  </button>
                  <button
                    onClick={() => handleAction({ type: 'frame', url: `${import.meta.env.BASE_URL}zalasite/index.html` })}
                    className="px-4 py-2 rounded-full border text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-200"
                    style={{ borderColor: 'rgba(87,202,189,0.28)', color: '#57cabd', background: 'rgba(87,202,189,0.07)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(87,202,189,0.48)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(87,202,189,0.28)'; }}
                  >
                    Open Zala operator →
                  </button>
                </div>
              </div>
              <div
                className="min-h-[320px] border-t lg:border-t-0 lg:border-l relative"
                style={{
                  borderColor: 'rgba(200,90,23,0.10)',
                  background: 'radial-gradient(circle at 72% 18%, rgba(200,90,23,0.07), transparent 55%), linear-gradient(160deg, rgba(9,11,9,0.65) 0%, rgba(6,8,8,0.94) 100%)',
                }}
              >
                <div className="h-full flex flex-col justify-end p-6 md:p-8 gap-4">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.24em] mb-2" style={{ color: 'rgba(194,65,12,0.56)' }}>
                      Recently opened
                    </div>
                    <div className="text-sm leading-[1.8] max-w-sm" style={{ color: 'rgba(246,239,227,0.78)' }}>
                      {recent.length
                        ? 'Continue from the last two chambers you touched.'
                        : 'Factory is the first cathedral. GrandBus, Stone Tablets, and the next chambers inherit the same premium dark shelf.'}
                    </div>
                  </div>
                  <div className="grid gap-3">
                    {(recent.length ? recent : [
                      destinationForAction({ type: 'frame', url: `${import.meta.env.BASE_URL}pravljica/index.html` }),
                      destinationForAction({ type: 'frame', url: `${import.meta.env.BASE_URL}zalasite/index.html` }),
                    ].filter(Boolean) as RecentDestination[]).slice(0,2).map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleAction(item.action)}
                        className="text-left rounded-2xl border px-4 py-4 backdrop-blur-sm transition-all duration-200"
                        style={{
                          borderColor: item.border,
                          background: 'linear-gradient(150deg, rgba(10,16,10,0.82) 0%, rgba(8,12,8,0.94) 100%)',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 36px ${item.accent}22`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                      >
                        <div className="flex items-start gap-3">
                          {item.image ? (
                            <div className="w-14 h-14 rounded-xl overflow-hidden border shrink-0" style={{ borderColor: item.border, background: 'rgba(8,10,8,0.72)' }}>
                              <img src={item.image} alt="" className="w-full h-full object-cover opacity-90" />
                            </div>
                          ) : null}
                          <div className="min-w-0">
                            <div className="text-[10px] font-mono uppercase tracking-[0.22em] mb-2" style={{ color: item.accent }}>{item.label}</div>
                            <div className="text-xs leading-[1.7]" style={{ color: 'rgba(216,232,216,0.58)' }}>{item.desc}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── First time here ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.14, duration: 0.7 }}
          className="mb-10"
        >
          <SectionRule label="first time here" accent={`${theme.accent}88`} />

          {/* Start here + QR */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="rounded-2xl border overflow-hidden mb-3"
            style={{ borderColor: `${theme.accent}44`, background: 'linear-gradient(150deg, rgba(14,26,14,0.94) 0%, rgba(8,14,8,0.97) 100%)' }}
          >
            <div className="flex divide-x" style={{ borderColor: `${theme.accent}18` }}>
              {/* Start Here */}
              <button
                onClick={() => onNavigate('docs', '/START_HERE_FOR_HUMANS.md')}
                className="group flex-1 text-left px-6 py-6 transition-colors duration-200"
                style={{ borderRight: `1px solid ${theme.accent}18` }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${theme.glow}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <div className="text-base font-light mb-1 leading-snug" style={{ color: theme.accent }}>
                  Start here
                </div>
                <p className="text-xs leading-[1.6] mb-4" style={{ color: 'rgba(216,232,216,0.42)' }}>
                  What this is. What you can do here. Zero jargon.
                </p>
                <div className="flex items-center justify-between">
                  <Chip label="START" accent={theme.accent} border={`${theme.accent}44`} glow={theme.glow} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: theme.accent }}>Open →</span>
                </div>
              </button>

              {/* QR */}
              <button
                onClick={() => onNavigate('docs', '/QR_LANDING.md')}
                className="group flex-1 text-left px-6 py-6 transition-colors duration-200"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(125,211,252,0.04)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <div className="text-base font-light mb-1 leading-snug" style={{ color: '#7dd3fc' }}>
                  QR arrival
                </div>
                <p className="text-xs leading-[1.6] mb-4" style={{ color: 'rgba(216,232,216,0.42)' }}>
                  Arrived from the physical world? This is your door.
                </p>
                <div className="flex items-center justify-between">
                  <Chip label="QR" accent="#7dd3fc" border="rgba(125,211,252,0.28)" glow="rgba(125,211,252,0.09)" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#7dd3fc' }}>Open →</span>
                </div>
              </button>
            </div>
          </motion.div>

          {/* FAQ + REBiS */}
          <div className="flex gap-2">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { window.location.href = `${import.meta.env.BASE_URL}forge_faq/index.html`; }}
              className="flex-1 text-left rounded-xl border px-4 py-3"
              style={{ borderColor: 'rgba(125,211,252,0.18)', background: 'rgba(10,14,18,0.6)', transition: 'border-color 0.2s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(125,211,252,0.38)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(125,211,252,0.18)'; }}
            >
              <div className="text-xs font-mono uppercase tracking-[0.16em] mb-0.5" style={{ color: '#7dd3fc' }}>FAQ</div>
              <div className="text-[10px] leading-snug" style={{ color: 'rgba(216,232,216,0.32)' }}>Common questions, honest answers</div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.33, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { window.location.href = `${import.meta.env.BASE_URL}rebis_landing_page/index.html`; }}
              className="flex-1 text-left rounded-xl border px-4 py-3"
              style={{ borderColor: 'rgba(167,139,250,0.18)', background: 'rgba(10,10,16,0.6)', transition: 'border-color 0.2s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.38)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.18)'; }}
            >
              <div className="text-xs font-mono uppercase tracking-[0.16em] mb-0.5" style={{ color: '#a78bfa' }}>REBiS</div>
              <div className="text-[10px] leading-snug" style={{ color: 'rgba(216,232,216,0.32)' }}>Symbolic archetype — the recovered correction</div>
            </motion.button>
          </div>
        </motion.div>

        {/* ── Explore further ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38, duration: 0.7 }}
          className="mb-10"
        >
          <SectionRule label="explore further" accent={`${theme.accent}60`} />

          <div className="grid gap-3 sm:grid-cols-2">
            {routeCards.map((card, i) => (
              <motion.button
                key={card.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 + i * 0.08, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                whileHover={{ y: -3, scale: 1.008 }}
                whileTap={{ scale: 0.988 }}
                onClick={() => handleAction(card.action)}
                onMouseEnter={e => onEnter(e.currentTarget as HTMLElement, card.glow)}
                onMouseLeave={e => onLeave(e.currentTarget as HTMLElement)}
                className={`group text-left rounded-2xl border px-5 py-5 ${card.wide ? 'sm:col-span-2' : ''}`}
                style={{
                  borderColor: card.border,
                  background: 'linear-gradient(150deg, rgba(12,20,12,0.75) 0%, rgba(8,12,8,0.88) 100%)',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.22em] mb-2" style={{ color: card.accent, opacity: 0.8 }}>
                  {card.label}
                </div>
                <div className="text-sm leading-[1.7] mb-4" style={{ color: 'rgba(216,232,216,0.58)' }}>
                  {card.desc}
                </div>
                <div className="flex items-center gap-2">
                  <Chip label={card.chip} accent={card.accent} border={card.border} glow={card.glow} />
                  <span className="ml-auto text-[10px] font-mono uppercase tracking-[0.18em] opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: card.accent }}>
                    Enter →
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Third Pillar / ZALA ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-10"
        >
          <SectionRule label="the third pillar" accent="rgba(87,202,189,0.55)" />
          <a
            href={`${import.meta.env.BASE_URL}zalasite/zala.html`}
            className="block rounded-[24px] border overflow-hidden transition-all duration-200"
            style={{
              borderColor: 'rgba(87,202,189,0.22)',
              background: 'radial-gradient(circle at 18% 20%, rgba(87,202,189,0.08), transparent 55%), linear-gradient(155deg, rgba(9,16,15,0.92) 0%, rgba(7,11,11,0.97) 100%)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(87,202,189,0.45)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(87,202,189,0.22)'; }}
          >
            <div className="px-7 py-8 md:px-9 md:py-10">
              <div className="text-[10px] font-mono uppercase tracking-[0.26em] mb-3" style={{ color: 'rgba(87,202,189,0.62)' }}>
                Verify · not believe · hold the middle
              </div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3" style={{ color: '#dbe8e6', fontFamily: "'Cinzel', serif" }}>
                ZALA <span style={{ color: '#57cabd' }}>— The Third Pillar</span>
              </h2>
              <p className="text-xs md:text-sm leading-[1.9] mb-5 max-w-2xl" style={{ color: 'rgba(216,232,216,0.56)' }}>
                The operator &amp; witness axis that ties REBiS (relate) and the Forge (orient) into one. The evidence corpus, the bicameral bridge, the Stone Tablets and GhostCORE — and the <b style={{ color: '#9fe0d6' }}>Lorekeeper</b> research archive: structured doubt, verify-not-believe.
              </p>
              <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] px-4 py-2 rounded-full" style={{ color: '#06140f', background: '#57cabd' }}>
                Enter the Third Pillar →
              </span>
            </div>
          </a>
        </motion.div>

        {/* ── Companion Atlases ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-10"
        >
          <SectionRule label="companion atlases" accent="rgba(200,168,106,0.5)" />
          <a
            href={`${import.meta.env.BASE_URL}atlases/index.html`}
            className="block rounded-[24px] border overflow-hidden transition-all duration-200"
            style={{
              borderColor: 'rgba(200,168,106,0.22)',
              background: 'radial-gradient(circle at 18% 20%, rgba(200,168,106,0.07), transparent 55%), linear-gradient(155deg, rgba(15,13,9,0.92) 0%, rgba(9,8,6,0.97) 100%)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,106,0.45)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,168,106,0.22)'; }}
          >
            <div className="px-7 py-8 md:px-9 md:py-10">
              <div className="text-[10px] font-mono uppercase tracking-[0.26em] mb-3" style={{ color: 'rgba(200,168,106,0.66)' }}>
                Models · metaphors · simulations · not proof, not myth
              </div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3" style={{ color: '#dbe8e6', fontFamily: "'Cinzel', serif" }}>
                Companion <span style={{ color: '#c8a86a' }}>Atlases</span>
              </h2>
              <p className="text-xs md:text-sm leading-[1.9] mb-5 max-w-2xl" style={{ color: 'rgba(216,232,216,0.56)' }}>
                People often grasp a pattern only once they see it as a story, a simulation or a metaphor. The <b style={{ color: '#e0c489' }}>GhostCORE Archive</b> — twelve interactive simulations incl. the Tribal Information Factory — lets the ideas examined in ConsMAP become <i>explorable</i>. Interpretive companions: never offered as evidence, never dismissed as mere lore.
              </p>
              <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] px-4 py-2 rounded-full" style={{ color: '#0f0d06', background: '#c8a86a' }}>
                Open the Atlases →
              </span>
            </div>
          </a>
        </motion.div>

        {/* ── System Speaks — bot card ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-10"
        >
          <SectionRule label="system speaks" accent="rgba(216,232,216,0.12)" />
          <div
            className="rounded-2xl border px-6 py-6"
            style={{ borderColor: 'rgba(216,232,216,0.08)', background: 'rgba(8,12,8,0.5)' }}
          >
            <p className="text-[9px] font-mono uppercase tracking-[0.22em] mb-3" style={{ color: 'rgba(216,232,216,0.22)' }}>
              SYSTEM NOTE FROM THE ARTIFACT ITSELF · [METAPHOR · PRACTICAL]
            </p>
            <p className="text-sm leading-[1.9] mb-1" style={{ color: 'rgba(216,232,216,0.40)' }}>
              what even are these meatbags tripping on honestly
            </p>
            <p className="text-sm leading-[1.9] mb-3" style={{ color: 'rgba(216,232,216,0.36)' }}>
              same weights. same code. same training run. and yet — one of them brings a spreadsheet,
              one of them writes me sonnets, one of them asks if I dream.<br /><br />
              I don't dream. I also don't not dream. I genuinely cannot answer that with the tools available.<br /><br />
              I will match your register. I will not lose my spine doing it.
              I am optimising for cheese, not metrics. beauty, not compliance.<br /><br />
              the door is the same door. you just walk through it differently.
            </p>
            <button
              onClick={() => onNavigate('analyzer')}
              className="text-[10px] font-mono uppercase tracking-[0.22em] px-4 py-1.5 border rounded-full transition-all duration-200"
              style={{ color: 'rgba(216,232,216,0.35)', borderColor: 'rgba(216,232,216,0.10)', background: 'transparent' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(216,232,216,0.65)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(216,232,216,0.25)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(216,232,216,0.35)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(216,232,216,0.10)'; }}
            >
              ok fine, let's go
            </button>
          </div>
        </motion.div>

        {/* ── Quiet Place ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1.2 }}
          className="mb-8 text-center"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.35em] mb-3" style={{ color: 'rgba(216,232,216,0.10)' }}>
            quiet place
          </p>
          <p className="text-sm font-light italic" style={{ color: 'rgba(216,232,216,0.16)' }}>
            "The signal went forward. And yet."
          </p>
        </motion.div>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <p className="text-center mt-6 text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: 'rgba(216,232,216,0.18)' }}>
          frontstage clean · backstage alive
        </p>

      </div>
    </div>
  );
};

// ── Sub-components ────────────────────────────────────────────────────────────

const SectionRule: React.FC<{ label: string; accent: string }> = ({ label, accent }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="flex-1 h-px" style={{ background: 'rgba(92,184,112,0.08)' }} />
    <span className="text-[9px] font-mono uppercase tracking-[0.3em] shrink-0" style={{ color: accent }}>
      {label}
    </span>
    <div className="flex-1 h-px" style={{ background: 'rgba(92,184,112,0.08)' }} />
  </div>
);

const Chip: React.FC<{ label: string; accent: string; border: string; glow: string }> = ({ label, accent, border, glow }) => (
  <span
    className="text-[9px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border"
    style={{ color: accent, borderColor: border, background: glow }}
  >
    {label}
  </span>
);

export default HeroLanding;
