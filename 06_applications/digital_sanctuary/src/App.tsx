import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConstellationField from './components/ConstellationField';
import WelcomeRitual from './components/WelcomeRitual';
import HeroLanding from './components/HeroLanding';
import EpistemicMirror from './components/EpistemicMirror';
import BedtimeStory from './components/BedtimeStory';
import SoulGlitch from './components/SoulGlitch';
import ClaimAnalyzer from './components/ClaimAnalyzer';

type AppState = 'ritual' | 'home' | 'mirror' | 'story' | 'analyzer';

function App() {
  const [state, setState] = useState<AppState>('ritual');

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden noise-overlay"
      style={{
        background: '#080c08',
        color: '#d8e8d8',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
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
            <HeroLanding onNavigate={(view) => setState(view)} />
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
            <ClaimAnalyzer onBack={() => setState('home')} />
          </motion.div>
        )}
      </AnimatePresence>

      {state !== 'ritual' && <SoulGlitch />}
    </div>
  );
}

export default App;
