import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AIQuickStartProps {
  onBack: () => void;
}

const AI_BOOTSTRAP_PROMPT = `We are going to analyze a claim using a structured method from the ConsMAP framework.

Before giving a conclusion, first follow this process:

1. Classify the claim type (empirical / theoretical / symbolic / practical).
2. Identify possible failure modes (Confidence Integrity Layer):
   - stale data
   - proxy-reality drift
   - missing feedback loop
   - source uncertainty
3. Evaluate the claim against the 5 Claim Hygiene questions.
4. Only then give a conclusion with an adjusted confidence level.

Claim:`;

const AIQuickStart: React.FC<AIQuickStartProps> = ({ onBack }) => {
  const [claim, setClaim] = useState('');
  const [copied, setCopied] = useState(false);

  const fullPrompt = `${AI_BOOTSTRAP_PROMPT}\n"${claim}"`;

  const handleCopy = () => {
    if (!claim.trim()) return;
    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 md:py-14 px-5 relative">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        onClick={onBack}
        className="text-[10px] font-mono tracking-[0.2em] uppercase mb-8 block hover:opacity-100 transition-opacity duration-300"
        style={{ color: '#5cb870' }}
      >
        ← back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        className="mb-8"
      >
        <div className="text-[10px] font-mono uppercase tracking-[0.28em] mb-3" style={{ color: 'rgba(92,184,112,0.55)' }}>
          ConsMAP / AI Mode
        </div>
        <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-2" style={{ color: '#d8e8d8' }}>
          AI Mode
        </h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(216,232,216,0.72)' }}>
          Give another model a clean map before it starts guessing.
        </p>
        <p className="text-[10px] font-mono tracking-[0.22em] uppercase mt-2" style={{ color: 'rgba(92,184,112,0.42)' }}>
          Guided evaluation prompt generator
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.0 }}
        className="space-y-6"
      >
        <p className="text-sm font-light leading-[1.75]" style={{ color: 'rgba(216,232,216,0.75)' }}>
          Paste a claim. Copy the generated prompt. Paste it into any AI assistant.
        </p>
        <p className="text-xs leading-[1.7]" style={{ color: 'rgba(216,232,216,0.52)' }}>
          What you'll get: the other model will classify the claim type, check for stale data / proxy drift / missing loops, apply the 5 Claim Hygiene questions, and give an adjusted confidence — instead of just answering as if the claim were true.
        </p>

        {/* Step 1 */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(92,184,112,0.7)' }}>
            1. Enter Claim
          </label>
          <textarea
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            placeholder="Type or paste the claim here..."
            className="w-full bg-slate-950/50 rounded-2xl border p-5 text-sm font-light min-h-[110px] focus:outline-none resize-none transition-colors duration-300"
            style={{
              borderColor: 'rgba(71,85,105,0.5)',
              color: 'rgba(216,232,216,0.85)',
            }}
          />
        </div>

        {/* Step 2 */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(92,184,112,0.7)' }}>
            2. Generated Prompt
          </label>
          <div
            className="rounded-2xl border p-5 relative overflow-hidden"
            style={{
              borderColor: 'rgba(71,85,105,0.35)',
              background: 'rgba(15,20,15,0.5)',
            }}
          >
            <pre className="text-xs font-mono whitespace-pre-wrap break-words leading-[1.8]" style={{ color: 'rgba(216,232,216,0.42)' }}>
              {fullPrompt}
            </pre>
          </div>
        </div>

        {/* Copy action */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleCopy}
            disabled={!claim.trim()}
            className="px-5 py-2.5 text-[10px] font-mono tracking-[0.2em] uppercase rounded-full border transition-all duration-300"
            style={{
              color: copied ? '#080c08' : (claim.trim() ? '#5cb870' : 'rgba(92,184,112,0.3)'),
              borderColor: copied ? '#5cb870' : (claim.trim() ? 'rgba(92,184,112,0.4)' : 'rgba(92,184,112,0.12)'),
              background: copied ? '#5cb870' : 'transparent',
              opacity: claim.trim() ? 1 : 0.5,
              cursor: claim.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            {copied ? 'Copied ✓' : 'Copy for AI →'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AIQuickStart;
