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
    <div className="max-w-3xl mx-auto py-16 px-6 relative">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        onClick={onBack}
        className="text-[10px] font-mono tracking-[0.2em] uppercase mb-12 block transition-colors duration-500 hover:opacity-70"
        style={{ color: '#2a4a25' }}
      >
        ← back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="mb-10"
      >
        <h1 className="text-2xl md:text-3xl font-extralight tracking-tight mb-3" style={{ color: '#d8e8d8' }}>
          AI Quick Start
        </h1>
        <p className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: '#2a4a25' }}>
          Guided Evaluation Prompt Generator
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.2 }}
        className="space-y-8"
      >
        <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(216, 232, 216, 0.62)' }}>
          Paste a claim below. This creates a copy-ready prompt for another AI assistant (like Claude, Grok, or DeepSeek) to evaluate the claim with ConsMAP's cognitive constraints: claim classification, Claim Hygiene, Confidence Integrity checks, and adjusted confidence.
        </p>

        <div>
          <label className="block text-[10px] font-mono uppercase mb-3" style={{ color: '#5cb870' }}>
            1. Enter Claim
          </label>
          <textarea
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            placeholder="Type or paste the claim here..."
            className="w-full bg-transparent border p-4 text-sm font-light min-h-[120px] focus:outline-none transition-colors"
            style={{ 
              borderColor: 'rgba(92, 184, 112, 0.2)', 
              color: '#d8e8d8',
            }}
          />
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase mb-3" style={{ color: '#5cb870' }}>
            2. Generated Prompt
          </label>
          <div 
            className="p-5 border relative overflow-hidden" 
            style={{ 
              borderColor: 'rgba(92, 184, 112, 0.08)',
              background: 'rgba(92, 184, 112, 0.03)'
            }}
          >
            <pre className="text-xs font-mono whitespace-pre-wrap break-words leading-[1.8]" style={{ color: 'rgba(216, 232, 216, 0.4)' }}>
              {fullPrompt}
            </pre>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={handleCopy}
            disabled={!claim.trim()}
            className="px-6 py-3 text-[10px] font-mono tracking-[0.2em] uppercase border transition-all duration-300"
            style={{ 
              color: copied ? '#0a0a0b' : (claim.trim() ? '#5cb870' : '#2a4a25'), 
              borderColor: copied ? '#5cb870' : (claim.trim() ? 'rgba(92, 184, 112, 0.3)' : 'rgba(92, 184, 112, 0.1)'),
              background: copied ? '#5cb870' : 'transparent',
              opacity: claim.trim() ? 1 : 0.5,
              cursor: claim.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            {copied ? 'Copied to Clipboard' : 'Copy for AI'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AIQuickStart;
