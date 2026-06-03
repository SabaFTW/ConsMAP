import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConstellationField from './components/ConstellationField';
import DeepBackground from './components/DeepBackground';
import WelcomeRitual from './components/WelcomeRitual';
import HeroLanding from './components/HeroLanding';
import EpistemicMirror from './components/EpistemicMirror';
import BedtimeStory from './components/BedtimeStory';
import SoulGlitch from './components/SoulGlitch';
import ClaimAnalyzer from './components/ClaimAnalyzer';
import DocsViewer from './components/DocsViewer';
import BicameralHudPreview from './components/BicameralHudPreview';

type AppState = 'ritual' | 'home' | 'mirror' | 'story' | 'analyzer' | 'docs' | 'aimode' | 'frame';

const FramedView: React.FC<{ url: string; onBack: () => void }> = ({ url, onBack }) => (
  <div className="relative w-full flex flex-col" style={{ minHeight: '100vh' }}>
    <div
      className="sticky top-0 z-50 flex items-center gap-3 px-4 py-2.5"
      style={{
        background: 'rgba(7,11,7,0.94)',
        borderBottom: '1px solid rgba(92,184,112,0.16)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <button
        onClick={onBack}
        className="text-[10px] font-mono tracking-[0.22em] uppercase hover:opacity-100 transition-opacity duration-200"
        style={{ color: '#5cb870', opacity: 0.65 }}
      >
        ← back
      </button>
      <div className="flex-1 h-px" style={{ background: 'rgba(92,184,112,0.1)' }} />
      <span className="text-[9px] font-mono tracking-[0.2em] uppercase" style={{ color: 'rgba(92,184,112,0.3)' }}>
        ConsMAP
      </span>
    </div>
    <iframe
      src={url}
      title="In-app view"
      style={{ flex: 1, width: '100%', border: 'none', minHeight: 'calc(100vh - 41px)' }}
    />
  </div>
);

function App() {
  const [state, setState] = useState<AppState>('ritual');
  const [frameUrl, setFrameUrl] = useState('');
  const [docPath, setDocPath] = useState('');

  const navigate = (view: AppState, meta?: string) => {
    if (view === 'docs' && meta) setDocPath(meta);
    if (view === 'frame' && meta) setFrameUrl(meta);
    setState(view);
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden noise-overlay"
      style={{
        background: '#080c08',
        color: '#d8e8d8',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Depth blobs — GPU-composited, pure CSS animation */}
      <DeepBackground />
      {/* Constellation — always present, very quiet */}
      <ConstellationField />

      <AnimatePresence mode="wait">
        {state === 'ritual' && (
          <motion.div
            key="ritual"
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <WelcomeRitual onComplete={() => setState('home')} />
          </motion.div>
        )}

        {state === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="relative z-10"
          >
            <HeroLanding onNavigate={navigate} />
          </motion.div>
        )}

        {state === 'mirror' && (
          <motion.div
            key="mirror"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 min-h-screen"
          >
            <EpistemicMirror onBack={() => setState('home')} />
          </motion.div>
        )}

        {state === 'story' && (
          <motion.div
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 min-h-screen"
          >
            <BedtimeStory onBack={() => setState('home')} />
          </motion.div>
        )}

        {state === 'analyzer' && (
          <motion.div
            key="analyzer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 min-h-screen"
          >
            <ClaimAnalyzer
              onBack={() => setState('home')}
            />
          </motion.div>
        )}

        {state === 'docs' && (
          <motion.div
            key={`docs-${docPath}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 min-h-screen"
          >
            <DocsViewer onBack={() => setState('home')} initialDoc={docPath} />
          </motion.div>
        )}

        {state === 'aimode' && (
          <motion.div
            key="aimode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 min-h-screen"
          >
            <BicameralHudPreview onBack={() => setState('home')} />
          </motion.div>
        )}

        {state === 'frame' && (
          <motion.div
            key={`frame-${frameUrl}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 min-h-screen"
          >
            <FramedView url={frameUrl} onBack={() => setState('home')} />
          </motion.div>
        )}
      </AnimatePresence>

      {state !== 'ritual' && <SoulGlitch />}
    </div>
  );
}

export default App;
