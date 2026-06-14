import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConstellationField from './components/ConstellationField';
import DeepBackground from './components/DeepBackground';
import WelcomeRitual from './components/WelcomeRitual';
import HeroLanding from './components/HeroLanding';
import RegisterDial from './components/RegisterDial';
import BedtimeStory from './components/BedtimeStory';
import BusStory from './components/BusStory';
import SoulGlitch from './components/SoulGlitch';
import ClaimAnalyzer from './components/ClaimAnalyzer';
import DocsViewer from './components/DocsViewer';
import BicameralHudPreview from './components/BicameralHudPreview';
import GlobalNav, { type FrameNavItem } from './components/GlobalNav';
import { THEMES, type Theme } from './lib/themes';

type AppState = 'ritual' | 'home' | 'mirror' | 'story' | 'busStory' | 'analyzer' | 'docs' | 'aimode' | 'frame';

// Frame-specific nav items per context key
const FRAME_NAV: Record<string, FrameNavItem[]> = {
  rebis: [
    { label: 'PROBLEM', hash: '#problem' },
    { label: 'TYPES',   hash: '#types' },
    { label: 'DEMO',    hash: '#theater' },
    { label: 'PROMPT',  hash: '#prompt' },
    { label: 'STONE',   hash: '#stone' },
  ],
  faq: [
    { label: 'TOP',     hash: '#hero' },
    { label: 'ROLES',   hash: '#roles' },
    { label: 'ARCHIVE', hash: '#archive' },
  ],
  pravljica: [
    { label: 'ARCHIVE', hash: '#stories' },
    { label: 'ABOUT',   hash: '#about' },
  ],
};

// CSS to inject into REBiS iframe to hide its own nav (same-origin)
const REBIS_HIDE_NAV_CSS = 'nav { display: none !important; } body { padding-top: 0 !important; }';
// CSS to inject into FAQ iframe to hide breadcrumbs and back link
const FAQ_HIDE_NAV_CSS = '.crumbs { display: none !important; } .back { display: none !important; }';

function themeForUrl(url: string): { theme: Theme; label: string; frameKey: string } {
  if (url.includes('rebis'))    return { theme: THEMES.rebis,   label: 'REBiS',   frameKey: 'rebis' };
  if (url.includes('forge_faq') || url.includes('faq'))
                                 return { theme: THEMES.faq,     label: 'FAQ',     frameKey: 'faq' };
  if (url.includes('pravljica')) return { theme: THEMES.factory, label: 'STORIES', frameKey: 'pravljica' };
  if (url.includes('grandbus')) return { theme: THEMES.factory, label: 'FACTORY', frameKey: 'factory' };
  return { theme: THEMES.consmap, label: '', frameKey: '' };
}

const FramedView: React.FC<{
  url: string;
  frameKey: string;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  onLoad: () => void;
}> = ({ url, iframeRef, onLoad }) => (
  <div className="w-full" style={{ height: 'calc(100vh - 44px)' }}>
    <iframe
      ref={iframeRef}
      src={url}
      title="In-app view"
      onLoad={onLoad}
      style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
    />
  </div>
);

function App() {
  const [state, setState] = useState<AppState>('ritual');
  const [frameUrl, setFrameUrl] = useState('');
  const [frameKey, setFrameKey] = useState('');
  const [docPath, setDocPath] = useState('');
  const [theme, setTheme] = useState<Theme>(THEMES.consmap);
  const [frameLabel, setFrameLabel] = useState('');
  const [activeFrameHash, setActiveFrameHash] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Track visits
  useEffect(() => {
    const visits = parseInt(localStorage.getItem('consmap_visits') || '0', 10);
    localStorage.setItem('consmap_visits', String(visits + 1));
    localStorage.setItem('consmap_last_visit', new Date().toISOString());
  }, []);

  // Listen for iframe navigation messages
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'PRAVLJICA_NAVIGATE') {
        if (e.data.story === 'factory') {
          navigate('story');
        } else if (e.data.story === 'bus') {
          navigate('busStory');
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const navigate = (view: AppState, meta?: string) => {
    if (view === 'docs' && meta) setDocPath(meta);
    if (view === 'frame' && meta) {
      setFrameUrl(meta);
      const { theme: t, label, frameKey: fk } = themeForUrl(meta);
      setTheme(t);
      setFrameLabel(label);
      setFrameKey(fk);
      setActiveFrameHash('');
    } else {
      setTheme(THEMES.consmap);
      setFrameLabel('');
      setFrameKey('');
      setActiveFrameHash('');
    }
    setState(view);
  };

  // Hide internal navs after iframe loads (same-origin injection)
  const handleFrameLoad = useCallback(() => {
    try {
      const doc = iframeRef.current?.contentDocument;
      if (!doc) return;
      const existing = doc.getElementById('__consmap_nav_hide__');
      if (existing) return;
      const style = doc.createElement('style');
      style.id = '__consmap_nav_hide__';
      if (frameUrl.includes('rebis') || frameUrl.includes('pravljica') || frameUrl.includes('grandbus')) {
        style.textContent = REBIS_HIDE_NAV_CSS;
      } else if (frameUrl.includes('forge_faq') || frameUrl.includes('faq')) {
        style.textContent = FAQ_HIDE_NAV_CSS;
      } else {
        return;
      }
      doc.head.appendChild(style);
    } catch {
      // cross-origin: can't inject (shouldn't happen since same-origin)
    }
  }, [frameUrl]);

  // Navigate within iframe to a hash section
  const navigateInFrame = useCallback((hash: string) => {
    setActiveFrameHash(hash);
    try {
      const doc = iframeRef.current?.contentDocument;
      if (!doc) return;
      const id = hash.replace('#', '');
      const el = doc.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.location.hash = hash;
      }
    } catch {
      // fallback: just set hash
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.location.hash = hash;
      }
    }
  }, []);

  const showNav = state !== 'ritual';
  const navState = (state === 'frame' ? 'home' : state) as Exclude<AppState, 'ritual' | 'frame'>;
  const currentFrameNav = state === 'frame' ? (FRAME_NAV[frameKey] ?? []) : [];

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden noise-overlay"
      style={{ background: '#080c08', color: '#d8e8d8', fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <DeepBackground />
      <ConstellationField />

      {showNav && (
        <GlobalNav
          state={navState}
          theme={theme}
          frameLabel={state === 'frame' ? frameLabel : undefined}
          frameNav={currentFrameNav}
          activeFrameHash={activeFrameHash}
          onNavigate={(view) => navigate(view as AppState)}
          onFrameNav={navigateInFrame}
        />
      )}

      <div style={{ paddingTop: showNav ? '44px' : '0' }}>
        <AnimatePresence mode="wait">
          {state === 'ritual' && (
            <motion.div key="ritual" exit={{ opacity: 0 }} transition={{ duration: 2 }}>
              <WelcomeRitual onComplete={() => setState('home')} />
            </motion.div>
          )}

          {state === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }} className="relative z-10">
              <HeroLanding theme={THEMES.consmap} onNavigate={navigate} />
            </motion.div>
          )}

          {state === 'mirror' && (
            <motion.div key="mirror" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="relative z-10 min-h-screen">
              <RegisterDial onBack={() => navigate('home')} />
            </motion.div>
          )}

          {state === 'story' && (
            <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="relative z-10 min-h-screen">
              <BedtimeStory onBack={() => setState('home')} />
            </motion.div>
          )}

          {state === 'busStory' && (
            <motion.div key="busStory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="relative z-10 min-h-screen">
              <BusStory onBack={() => setState('home')} />
            </motion.div>
          )}

          {state === 'analyzer' && (
            <motion.div key="analyzer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="relative z-10 min-h-screen">
              <ClaimAnalyzer onBack={() => setState('home')} />
            </motion.div>
          )}

          {state === 'docs' && (
            <motion.div key={`docs-${docPath}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="relative z-10 min-h-screen">
              <DocsViewer onBack={() => setState('home')} initialDoc={docPath} />
            </motion.div>
          )}

          {state === 'aimode' && (
            <motion.div key="aimode" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="relative z-10 min-h-screen">
              <BicameralHudPreview onBack={() => setState('home')} />
            </motion.div>
          )}

          {state === 'frame' && (
            <motion.div key={`frame-${frameUrl}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="relative z-10">
              <FramedView
                url={frameUrl}
                frameKey={frameKey}
                iframeRef={iframeRef}
                onLoad={handleFrameLoad}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {state !== 'ritual' && <SoulGlitch />}
    </div>
  );
}

export default App;
