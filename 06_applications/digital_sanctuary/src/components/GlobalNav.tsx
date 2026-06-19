import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Theme } from '../lib/themes';

type NavState = 'home' | 'mirror' | 'story' | 'analyzer' | 'docs' | 'aimode' | 'frame';

export interface FrameNavItem { label: string; hash: string; }

interface GlobalNavProps {
  state: NavState;
  theme: Theme;
  frameLabel?: string;
  frameNav?: FrameNavItem[];
  activeFrameHash?: string;
  onNavigate: (view: NavState) => void;
  onFrameNav?: (hash: string) => void;
}

const CONSMAP_NAV: Array<{ key: NavState; label: string }> = [
  { key: 'home',     label: 'HOME' },
  { key: 'story',    label: 'ARCHIVE' },
  { key: 'docs',     label: 'LIBRARY' },
  { key: 'mirror',   label: 'MIRROR' },
  { key: 'analyzer', label: 'ANALYZER' },
  { key: 'aimode',   label: 'AI MODE' },
];

// Skip-intro settings panel
const SettingsPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [skip, setSkip] = useState(localStorage.getItem('consmap_skip_intro') === 'true');
  const [name, setName] = useState(localStorage.getItem('consmap_visitor_name') ?? '');
  const [editingName, setEditingName] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingName) nameRef.current?.focus();
  }, [editingName]);

  const toggle = () => {
    const next = !skip;
    setSkip(next);
    localStorage.setItem('consmap_skip_intro', next ? 'true' : 'false');
  };

  const saveName = () => {
    const trimmed = name.trim();
    localStorage.setItem('consmap_visitor_name', trimmed);
    setEditingName(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full right-0 mt-2 rounded-xl border px-4 py-4 z-50"
      style={{
        background: 'rgba(10,16,10,0.97)',
        borderColor: 'rgba(92,184,112,0.20)',
        backdropFilter: 'blur(12px)',
        minWidth: '220px',
      }}
      onClick={e => e.stopPropagation()}
    >
      <p className="text-[9px] font-mono uppercase tracking-[0.22em] mb-4" style={{ color: 'rgba(216,232,216,0.40)' }}>
        Settings
      </p>

      {/* Name field */}
      <div className="mb-4">
        <p className="text-[9px] font-mono uppercase tracking-[0.18em] mb-1.5" style={{ color: 'rgba(216,232,216,0.30)' }}>
          Your name
        </p>
        {editingName ? (
          <input
            ref={nameRef}
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={saveName}
            onKeyDown={e => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') setEditingName(false); }}
            className="w-full rounded-lg px-2.5 py-1.5 text-[11px] font-mono outline-none"
            style={{
              background: 'rgba(92,184,112,0.08)',
              border: '1px solid rgba(92,184,112,0.30)',
              color: '#d8e8d8',
            }}
            placeholder="enter name…"
          />
        ) : (
          <button
            onClick={() => setEditingName(true)}
            className="w-full text-left rounded-lg px-2.5 py-1.5 text-[11px] font-mono transition-colors duration-150"
            style={{
              background: 'rgba(216,232,216,0.05)',
              border: '1px solid rgba(216,232,216,0.10)',
              color: name ? 'rgba(216,232,216,0.75)' : 'rgba(216,232,216,0.25)',
            }}
          >
            {name || 'set name…'} <span style={{ opacity: 0.35 }}>✎</span>
          </button>
        )}
      </div>

      {/* Skip intro toggle */}
      <label className="flex items-center gap-2.5 cursor-pointer">
        <div
          onClick={toggle}
          className="w-8 h-4 rounded-full relative transition-colors duration-200 shrink-0"
          style={{ background: skip ? 'rgba(111,207,133,0.5)' : 'rgba(216,232,216,0.12)' }}
        >
          <motion.div
            animate={{ x: skip ? 16 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute top-0.5 w-3 h-3 rounded-full"
            style={{ background: skip ? '#6fcf85' : 'rgba(216,232,216,0.4)' }}
          />
        </div>
        <span className="text-[10px] font-mono tracking-[0.14em]" style={{ color: 'rgba(216,232,216,0.55)' }}>
          Skip intro animation
        </span>
      </label>

      <button
        onClick={onClose}
        className="mt-4 text-[8px] font-mono uppercase tracking-[0.2em] opacity-30 hover:opacity-60 transition-opacity"
        style={{ color: '#d8e8d8' }}
      >
        close
      </button>
    </motion.div>
  );
};

const GlobalNav: React.FC<GlobalNavProps> = ({
  state, theme, frameLabel, frameNav, activeFrameHash, onNavigate, onFrameNav,
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const inFrame = !!frameNav?.length;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-6"
      style={{
        height: '44px',
        background: 'rgba(7,11,7,0.90)',
        borderBottom: `1px solid ${theme.navBorder}`,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        transition: 'border-color 0.5s ease',
      }}
    >
      {/* Left — brand + context breadcrumb */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onNavigate('home')}
          className="text-[11px] font-mono tracking-[0.28em] uppercase transition-opacity duration-200 hover:opacity-100"
          style={{ color: '#5cb870', opacity: 0.75 }}
        >
          ConsMAP
        </button>

        <AnimatePresence>
          {frameLabel && (
            <motion.div
              key={frameLabel}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-1.5"
            >
              <span style={{ color: 'rgba(216,232,216,0.20)', fontSize: '10px' }}>›</span>
              <span
                className="text-[10px] font-mono tracking-[0.20em] uppercase"
                style={{ color: theme.accent, opacity: 0.9 }}
              >
                {frameLabel}
              </span>
              <span
                className="inline-block rounded-full shrink-0"
                style={{
                  width: '5px', height: '5px',
                  background: theme.accent,
                  boxShadow: `0 0 6px ${theme.accent}`,
                  transition: 'background 0.5s ease, box-shadow 0.5s ease',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right — nav items (ConsMAP or frame-specific) */}
      <div className="flex items-center gap-0.5 md:gap-1">
        <AnimatePresence mode="wait">
          {inFrame ? (
            // Frame nav items (e.g. REBiS sections)
            <motion.div
              key="frame-nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-0.5 md:gap-1"
            >
              {frameNav!.map(({ label, hash }) => {
                const isActive = activeFrameHash === hash;
                return (
                  <button
                    key={hash}
                    onClick={() => onFrameNav?.(hash)}
                    className="relative px-2 md:px-3 py-1 text-[9px] md:text-[10px] font-mono tracking-[0.18em] uppercase transition-all duration-200"
                    style={{ color: isActive ? theme.accent : 'rgba(216,232,216,0.28)' }}
                    onMouseEnter={e => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(216,232,216,0.58)';
                    }}
                    onMouseLeave={e => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(216,232,216,0.28)';
                    }}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-2 right-2 h-px"
                        style={{ background: theme.accent, opacity: 0.75 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          ) : (
            // ConsMAP nav items
            <motion.div
              key="consmap-nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-0.5 md:gap-1"
            >
              {CONSMAP_NAV.map(({ key, label }) => {
                const isActive = state === key;
                return (
                  <button
                    key={key}
                    onClick={() => onNavigate(key)}
                    className="relative px-2 md:px-3 py-1 text-[9px] md:text-[10px] font-mono tracking-[0.18em] uppercase transition-all duration-200"
                    style={{ color: isActive ? theme.accent : 'rgba(216,232,216,0.28)' }}
                    onMouseEnter={e => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(216,232,216,0.58)';
                    }}
                    onMouseLeave={e => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(216,232,216,0.28)';
                    }}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-2 right-2 h-px"
                        style={{ background: theme.accent, opacity: 0.75 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings gear */}
        <div className="relative ml-1">
          <button
            onClick={() => setSettingsOpen(o => !o)}
            className="px-2 py-1 text-[11px] transition-all duration-200 hover:opacity-80"
            style={{ color: settingsOpen ? 'rgba(216,232,216,0.75)' : 'rgba(216,232,216,0.45)' }}
            title="Settings"
          >
            ⚙
          </button>
          <AnimatePresence>
            {settingsOpen && <SettingsPanel onClose={() => setSettingsOpen(false)} />}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default GlobalNav;
