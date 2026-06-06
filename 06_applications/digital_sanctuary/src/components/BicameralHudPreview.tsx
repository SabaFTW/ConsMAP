import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingBack from './FloatingBack';

interface BicameralHudPreviewProps {
  onBack: () => void;
}

type Family = 'observation' | 'approval' | 'source_of_truth';
type FilterKey = 'all' | Family;
type Gate = 'GREEN' | 'YELLOW' | 'RED';
type TruthState = 'LIVE' | 'STALE' | 'HISTORICAL' | 'RESTORED' | 'FOSSIL' | 'UNKNOWN';

interface EnvelopeObject {
  objectFamily: Family;
  objectId: string;
  timestamp: string;
  label: string;
  gate: Gate;
  truthState?: TruthState;
  tech: {
    summary: string;
    source?: string;
    evidence?: string;
    command?: string | null;
    logMarker?: string;
    approvalState?: string;
    exactCommands?: string[];
    riskReason?: string;
    authoritativePath?: string;
    staleLookalikes?: string[];
  };
  gateInfo: {
    gate: Gate;
    truthState?: TruthState;
    requiresApproval: boolean;
    approvalState?: string;
    grantedBy?: string | null;
    executed?: boolean;
    severity?: string;
    warning?: string;
  };
  meaning?: {
    whatHappened: string;
    activeOrHistorical: 'active' | 'historical';
    isProblem: boolean;
    whyItMatters: string;
    smallestSafeNextStep: string;
    doNotTouch?: string[];
  };
}

// ── Static sample data ─────────────────────────────────────────────────────

const SAMPLE: EnvelopeObject[] = [
  {
    objectFamily: 'observation',
    objectId: 'evt_bootstrap_trunc_001',
    timestamp: '2026-05-03T09:33:00+02:00',
    label: 'Bootstrap Truncation Warning',
    gate: 'GREEN',
    truthState: 'LIVE',
    tech: {
      summary: 'Bootstrap injection truncated MEMORY.md (~42% removed).',
      source: '/home/saba/.openclaw/workspace/MEMORY.md',
      evidence: '20627 raw → 11999 injected (~42% removed)',
      logMarker: 'bootstrap-truncation-warning',
    },
    gateInfo: { gate: 'GREEN', truthState: 'LIVE', requiresApproval: false, severity: 'medium' },
    meaning: {
      whatHappened: 'Only part of MEMORY.md was injected into the bootstrap context.',
      activeOrHistorical: 'active',
      isProblem: false,
      whyItMatters: 'The agent may not start with full memory context — token pressure is likely.',
      smallestSafeNextStep: 'Read the relevant memory file directly when detail is needed.',
      doNotTouch: ['Do not raise bootstrap limits blindly without checking token pressure.'],
    },
  },
  {
    objectFamily: 'approval',
    objectId: 'apr_restart_001.requested',
    timestamp: '2026-06-02T01:31:00+02:00',
    label: 'Service Restart — Requested',
    gate: 'YELLOW',
    tech: {
      summary: 'Restart of openclaw-gateway.service requested by operator session.',
      command: 'systemctl --user restart openclaw-gateway.service',
      exactCommands: ['systemctl --user restart openclaw-gateway.service'],
      riskReason: 'Restarting a gateway service changes live runtime state.',
      approvalState: 'requested',
    },
    gateInfo: { gate: 'YELLOW', requiresApproval: true, approvalState: 'requested', grantedBy: null, executed: false },
    meaning: {
      whatHappened: 'A service restart was requested but not yet granted.',
      activeOrHistorical: 'historical',
      isProblem: false,
      whyItMatters: 'The gateway service controls live routing — restart without review carries risk.',
      smallestSafeNextStep: 'Review the restart reason and confirm scope before granting.',
      doNotTouch: ['Do not execute without explicit grant from a human operator.'],
    },
  },
  {
    objectFamily: 'approval',
    objectId: 'apr_restart_001.granted',
    timestamp: '2026-06-02T01:33:00+02:00',
    label: 'Service Restart — Granted',
    gate: 'YELLOW',
    tech: {
      summary: 'Restart of openclaw-gateway.service granted and executed.',
      command: 'systemctl --user restart openclaw-gateway.service',
      exactCommands: ['systemctl --user restart openclaw-gateway.service'],
      riskReason: 'Restarting a gateway service changes live runtime state.',
      approvalState: 'granted',
    },
    gateInfo: { gate: 'YELLOW', requiresApproval: true, approvalState: 'granted', grantedBy: 'human:operator', executed: true },
    meaning: {
      whatHappened: 'Service restart was granted by a human operator and executed successfully.',
      activeOrHistorical: 'historical',
      isProblem: false,
      whyItMatters: 'A bounded, human-approved change was made to the live runtime.',
      smallestSafeNextStep: 'Verify service is healthy after restart. Check downstream connections.',
      doNotTouch: ['Do not re-run without a fresh approval envelope.'],
    },
  },
  {
    objectFamily: 'source_of_truth',
    objectId: 'openclaw_runtime_config',
    timestamp: '2026-06-02T01:31:00+02:00',
    label: 'OpenClaw Runtime Config',
    gate: 'GREEN',
    truthState: 'LIVE',
    tech: {
      summary: 'Authoritative runtime configuration for the OpenClaw system.',
      authoritativePath: '/home/saba/.openclaw/openclaw.json',
      staleLookalikes: [
        '/home/saba/.openclaw/agents/main/agent/openclaw.json',
        '/home/saba/.openclaw/openclaw.json.last-good',
      ],
    },
    gateInfo: {
      gate: 'GREEN',
      truthState: 'LIVE',
      requiresApproval: false,
      warning: 'Do not treat fossil agent config or backup files as runtime truth.',
    },
    meaning: {
      whatHappened: 'The runtime config source of truth has been verified as current.',
      activeOrHistorical: 'active',
      isProblem: false,
      whyItMatters: 'Other config lookalikes exist — only the authoritative path leads changes.',
      smallestSafeNextStep: 'Read from authoritative path only. Ignore fossil/backup lookalikes.',
      doNotTouch: ['Backup .last-good file', 'Agent-local config copies'],
    },
  },
];

// ── Design tokens ──────────────────────────────────────────────────────────

const C = {
  text:       '#e8f4e8',
  textMuted:  'rgba(232,244,232,0.82)',
  textDim:    'rgba(232,244,232,0.55)',
  textFaint:  'rgba(232,244,232,0.32)',
  surface:    '#0f1a0f',
  surface2:   '#0c1309',
  surfaceEl:  '#182518',
  border:     'rgba(92,160,92,0.36)',
  borderMid:  'rgba(92,160,92,0.20)',
  accent:     '#5cb870',
  accentDim:  'rgba(92,184,112,0.58)',
};

const FAMILY_STYLE: Record<Family, { accent: string; border: string; glow: string; label: string }> = {
  observation:    { accent: '#60c8f8', border: 'rgba(96,200,248,0.32)',  glow: 'rgba(96,200,248,0.08)',  label: 'Observation' },
  approval:       { accent: '#f0c040', border: 'rgba(240,192,64,0.32)',  glow: 'rgba(240,192,64,0.08)',  label: 'Approval' },
  source_of_truth:{ accent: '#34d399', border: 'rgba(52,211,153,0.32)',  glow: 'rgba(52,211,153,0.08)',  label: 'Source of Truth' },
};

const GATE_STYLE: Record<Gate, { color: string; bg: string }> = {
  GREEN:  { color: '#34d399', bg: 'rgba(52,211,153,0.20)' },
  YELLOW: { color: '#f0c040', bg: 'rgba(240,192,64,0.20)' },
  RED:    { color: '#f87171', bg: 'rgba(248,113,113,0.20)' },
};

const TRUTH_COLOR: Record<string, string> = {
  LIVE:       '#34d399',
  STALE:      '#f0c040',
  HISTORICAL: 'rgba(232,244,232,0.60)',
  RESTORED:   '#a78bfa',
  FOSSIL:     'rgba(232,244,232,0.38)',
  UNKNOWN:    '#f87171',
};

// ── Sub-components ─────────────────────────────────────────────────────────

const GateBadge: React.FC<{ gate: Gate }> = ({ gate }) => {
  const s = GATE_STYLE[gate];
  return (
    <span
      className="text-xs font-mono font-semibold uppercase tracking-[0.16em] px-3 py-1.5 rounded-full inline-flex items-center gap-1"
      style={{ color: s.color, background: s.bg, border: `1px solid ${s.color}40`, minHeight: '32px' }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, display: 'inline-block', flexShrink: 0 }} />
      {gate}
    </span>
  );
};

const TruthBadge: React.FC<{ state: string }> = ({ state }) => (
  <span
    className="text-xs font-mono uppercase tracking-[0.16em] px-3 py-1.5 rounded-full border inline-flex items-center"
    style={{
      color: TRUTH_COLOR[state] ?? C.textMuted,
      borderColor: `${TRUTH_COLOR[state] ?? C.border}50`,
      background: `${TRUTH_COLOR[state] ?? 'transparent'}12`,
      minHeight: '32px',
    }}
  >
    {state}
  </span>
);

const LaneCard: React.FC<{ title: string; accent: string; border: string; children: React.ReactNode }> = ({ title, accent, border, children }) => (
  <div className="rounded-2xl flex flex-col" style={{ border: `1px solid ${border}`, background: C.surface }}>
    <div
      className="px-5 py-3.5 text-xs font-mono font-semibold uppercase tracking-[0.22em] shrink-0 rounded-t-2xl"
      style={{ color: accent, borderBottom: `1px solid ${border}`, background: C.surface2 }}
    >
      {title}
    </div>
    <div className="px-5 py-5 space-y-4 flex-1">
      {children}
    </div>
  </div>
);

const Field: React.FC<{ label: string; value: React.ReactNode; mono?: boolean }> = ({ label, value, mono }) => (
  <div>
    <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.22em] mb-1.5" style={{ color: C.accentDim }}>
      {label}
    </div>
    <div
      className={`text-sm leading-[1.75] ${mono ? 'font-mono break-all' : ''}`}
      style={{ color: C.text }}
    >
      {value}
    </div>
  </div>
);

// ── Kernel Saga ────────────────────────────────────────────────────────────

const SAGA_PHASES = [
  {
    id: 'approve', tag: 'C-phase · APPROVE', accent: '#34d399',
    border: 'rgba(52,211,153,0.26)', glow: 'rgba(52,211,153,0.06)',
    title: 'Pipeline can breathe',
    what: [
      'Intent 2026-06-03-001: add a static HTML status note to a fixture workspace.',
      'All three reviews passed: RIGHT (semantic), LEFT (technical), Validator (F11/F12/F13).',
      'Consensus issued. Dry-run exit 0. Workspace stayed empty.',
      'Audit: VALIDATE_PAPERWORK_PASS, DRY_RUN_ALLOWED.',
    ],
    ability: 'Say YES safely',
  },
  {
    id: 'block', tag: 'C-phase · BLOCK', accent: '#f87171',
    border: 'rgba(248,113,113,0.26)', glow: 'rgba(248,113,113,0.06)',
    title: 'Pipeline has a spine',
    what: [
      'Same request — but the plan targeted .workspace/app.py (the live Flask app).',
      'Three layers blocked simultaneously: RIGHT (semantic), LEFT (prefix), Validator (F12+F13).',
      'No consensus. Dry-run exit 1. .workspace/app.py never touched.',
      'Audit: VALIDATE_PAPERWORK_BLOCK, DRY_RUN_BLOCKED.',
    ],
    ability: 'Say NO concretely',
  },
  {
    id: 'd0', tag: 'D0 · Execution Gate', accent: '#a78bfa',
    border: 'rgba(167,139,250,0.26)', glow: 'rgba(167,139,250,0.06)',
    title: 'Knife cut once, returned clean',
    what: [
      'Only intent 2026-06-03-001. Rollback snapshot created before any mutation.',
      'File copied: staged/status_note.html → workspace/status_note.html.',
      'Rollback removed the file. Workspace restored to exact pre-mutation state.',
      '73 tests passing. Blocked trace still refused. .workspace/app.py untouched.',
    ],
    ability: 'Cut once · roll back cleanly',
  },
];

const PIPELINE_STEPS = ['intent', 'plan', 'review', 'dry-run', 'D0 execute', 'rollback', 'audit'];

const STILL_FORBIDDEN = [
  'Any intent other than 2026-06-03-001',
  'Any target outside .fixtures/manual_e2e/',
  '.workspace/app.py or any production path',
  'subprocess / shell / sudo / network / services',
  'Multi-file plans or package installs',
  'Human GO signal gate (design only, not built)',
  'Command whitelist (not yet built)',
  'Arbitrary intent execution',
];

const FIVE_ABILITIES = [
  { n: '01', label: 'Say YES safely',            sub: 'APPROVE trace — paperwork passes, consensus issued' },
  { n: '02', label: 'Say NO concretely',          sub: 'BLOCK trace — three layers fire simultaneously' },
  { n: '03', label: 'Hover without cutting',      sub: 'Dry-run: reports and audits, never mutates' },
  { n: '04', label: 'Cut once inside a boundary', sub: 'D0 — one file copy, rollback snapshot first' },
  { n: '05', label: 'Roll back cleanly',          sub: 'Exact pre-mutation state restored, audit recorded' },
];

const SagaView: React.FC = () => (
  <div className="space-y-5">
    <div
      className="rounded-xl border px-5 py-3 flex items-center gap-3"
      style={{ borderColor: 'rgba(196,160,80,0.32)', background: 'rgba(196,160,80,0.05)' }}
    >
      <span className="text-xs font-mono uppercase tracking-[0.18em] shrink-0" style={{ color: 'rgba(196,160,80,0.75)' }}>
        Static explanation
      </span>
      <p className="text-xs font-mono" style={{ color: 'rgba(196,160,80,0.70)' }}>
        This page explains the Kernel. It does not execute it.
      </p>
    </div>

    {/* Pipeline flow */}
    <div className="rounded-2xl border px-5 py-4" style={{ borderColor: C.borderMid, background: C.surface }}>
      <div className="text-xs font-mono uppercase tracking-[0.22em] mb-3" style={{ color: C.accentDim }}>
        Pipeline flow
      </div>
      <div className="flex items-center flex-wrap gap-y-2">
        {PIPELINE_STEPS.map((step, i) => (
          <span key={step} className="flex items-center">
            <span
              className="text-xs font-mono uppercase tracking-[0.14em] px-3 py-1 rounded-lg"
              style={{ color: C.textMuted, background: 'rgba(92,184,112,0.08)', border: '1px solid rgba(92,184,112,0.18)' }}
            >
              {step}
            </span>
            {i < PIPELINE_STEPS.length - 1 && (
              <span className="text-xs mx-1.5" style={{ color: 'rgba(92,184,112,0.30)' }}>→</span>
            )}
          </span>
        ))}
      </div>
    </div>

    {/* Phase cards */}
    <div className="grid md:grid-cols-3 gap-4">
      {SAGA_PHASES.map(p => (
        <div key={p.id} className="rounded-2xl border p-5 space-y-4" style={{ borderColor: p.border, background: p.glow }}>
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.18em]" style={{ color: p.accent }}>{p.tag}</span>
            <p className="text-base font-light mt-1.5" style={{ color: C.text }}>{p.title}</p>
          </div>
          <ul className="space-y-2">
            {p.what.map((w, i) => (
              <li
                key={i}
                className="text-sm leading-[1.65] pl-3"
                style={{ color: C.textMuted, borderLeft: `2px solid ${p.border}` }}
              >
                {w}
              </li>
            ))}
          </ul>
          <div
            className="rounded-lg px-3 py-2 flex items-center gap-2"
            style={{ background: 'rgba(8,12,8,0.65)', border: `1px solid ${p.border}` }}
          >
            <span className="text-xs font-mono uppercase tracking-[0.14em]" style={{ color: C.textFaint }}>Ability</span>
            <span className="text-xs font-mono uppercase tracking-[0.14em]" style={{ color: p.accent }}>{p.ability}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Five abilities + still forbidden */}
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-2xl border p-5 space-y-4" style={{ borderColor: C.borderMid, background: C.surface }}>
        <div className="text-xs font-mono uppercase tracking-[0.22em]" style={{ color: C.accentDim }}>
          Five abilities learned
        </div>
        {FIVE_ABILITIES.map(a => (
          <div key={a.n} className="flex gap-3 items-start">
            <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: C.accentDim }}>{a.n}</span>
            <div>
              <div className="text-sm font-mono uppercase tracking-[0.12em]" style={{ color: C.text }}>{a.label}</div>
              <div className="text-xs font-light mt-0.5" style={{ color: C.textMuted }}>{a.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border p-5" style={{ borderColor: 'rgba(248,113,113,0.22)', background: C.surface }}>
        <div className="text-xs font-mono uppercase tracking-[0.22em] mb-4" style={{ color: 'rgba(248,113,113,0.60)' }}>
          Still forbidden
        </div>
        <ul className="space-y-2.5">
          {STILL_FORBIDDEN.map((f, i) => (
            <li key={i} className="flex gap-2.5 items-baseline">
              <span className="text-xs font-mono shrink-0" style={{ color: 'rgba(248,113,113,0.55)' }}>✗</span>
              <span className="text-sm leading-[1.5]" style={{ color: 'rgba(248,113,113,0.72)' }}>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <p className="text-center text-xs font-mono uppercase tracking-[0.24em]" style={{ color: C.textFaint }}>
      evidence before interpretation · rollback before execution · audit stays visible
    </p>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────

const BicameralHudPreview: React.FC<BicameralHudPreviewProps> = ({ onBack }) => {
  const [viewMode, setViewMode] = useState<'hud' | 'saga'>('hud');
  const [selectedId, setSelectedId] = useState<string>(SAMPLE[0].objectId);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [showRaw, setShowRaw] = useState(false);

  const selected = SAMPLE.find(o => o.objectId === selectedId) ?? SAMPLE[0];
  const filtered = filter === 'all' ? SAMPLE : SAMPLE.filter(o => o.objectFamily === filter);
  const fs = FAMILY_STYLE[selected.objectFamily];

  const counts = {
    all:            SAMPLE.length,
    observation:    SAMPLE.filter(o => o.objectFamily === 'observation').length,
    approval:       SAMPLE.filter(o => o.objectFamily === 'approval').length,
    source_of_truth:SAMPLE.filter(o => o.objectFamily === 'source_of_truth').length,
  };

  const filters: { key: FilterKey; label: string; count: number }[] = [
    { key: 'all',             label: 'All',            count: counts.all },
    { key: 'observation',     label: 'Observation',    count: counts.observation },
    { key: 'approval',        label: 'Approval',       count: counts.approval },
    { key: 'source_of_truth', label: 'Source of Truth',count: counts.source_of_truth },
  ];

  const selectObj = (id: string) => { setSelectedId(id); setShowRaw(false); };

  return (
    <div className="max-w-6xl mx-auto py-8 md:py-12 px-4 sm:px-6 relative">
      <FloatingBack onBack={onBack} />

      {/* Back */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        onClick={onBack}
        className="text-xs font-mono tracking-[0.20em] uppercase mb-8 block hover:opacity-100 transition-opacity duration-300"
        style={{ color: '#5cb870' }}
      >
        ← back
      </motion.button>

      {/* Tab switcher */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex gap-2 mb-6"
      >
        {(['hud', 'saga'] as const).map(v => (
          <button
            key={v}
            onClick={() => setViewMode(v)}
            className="px-5 py-2.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-[0.18em] border transition-all duration-200"
            style={{
              color: viewMode === v ? C.text : C.textDim,
              borderColor: viewMode === v ? 'rgba(92,184,112,0.50)' : C.border,
              background: viewMode === v ? 'rgba(92,184,112,0.13)' : C.surface,
              minHeight: '44px',
            }}
          >
            {v === 'hud' ? 'Bicameral HUD' : 'Kernel Saga'}
          </button>
        ))}
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-6"
      >
        <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.30em] mb-2.5" style={{ color: C.accentDim }}>
          ConsMAP / Bicameral HUD
        </div>
        <h1
          className="font-light tracking-tight mb-2"
          style={{ color: C.text, fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}
        >
          {viewMode === 'hud' ? 'Bicameral HUD' : 'Bicameral Kernel'}
        </h1>
        <p className="text-sm" style={{ color: C.textMuted }}>
          {viewMode === 'hud'
            ? 'One chat · two readings · one shared ledger'
            : 'From intent to proof: yes, no, hover, cut, rollback.'}
        </p>
      </motion.div>

      {viewMode === 'saga' ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <SagaView />
        </motion.div>
      ) : (
        <>
          {/* Warning banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-xl border px-5 py-3.5 mb-6 flex items-start gap-3"
            style={{ borderColor: 'rgba(220,172,40,0.40)', background: 'rgba(220,172,40,0.08)' }}
          >
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.16em] shrink-0 mt-0.5" style={{ color: 'rgba(240,192,64,0.95)' }}>
              ⚠ Offline
            </span>
            <p className="text-xs font-mono leading-relaxed" style={{ color: 'rgba(240,192,64,0.80)' }}>
              Offline concept module. Visuals do not replace ledger evidence.
            </p>
          </motion.div>

          {/* ── Mobile controls (hidden on lg+) ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="lg:hidden space-y-4 mb-6"
          >
            {/* Mobile summary stats row */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'All',  count: counts.all,             color: C.text },
                { label: 'Obs',  count: counts.observation,     color: FAMILY_STYLE.observation.accent },
                { label: 'Appr', count: counts.approval,        color: FAMILY_STYLE.approval.accent },
                { label: 'SoT',  count: counts.source_of_truth, color: FAMILY_STYLE.source_of_truth.accent },
              ].map(c => (
                <div
                  key={c.label}
                  className="text-center rounded-xl py-3"
                  style={{ background: C.surfaceEl, border: `1px solid ${C.borderMid}` }}
                >
                  <div className="text-xl font-light leading-none" style={{ color: c.color }}>{c.count}</div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.12em] mt-1.5" style={{ color: C.textDim }}>{c.label}</div>
                </div>
              ))}
            </div>

            {/* Filter pills — horizontal scroll */}
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {filters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-[0.14em] border transition-colors duration-150"
                  style={{
                    color: filter === f.key ? C.text : C.textMuted,
                    borderColor: filter === f.key ? 'rgba(92,184,112,0.55)' : C.border,
                    background: filter === f.key ? 'rgba(92,184,112,0.14)' : C.surface,
                    minHeight: '44px',
                  }}
                >
                  <span>{f.label}</span>
                  <span
                    className="text-xs rounded-full px-1.5 py-0.5 font-normal"
                    style={{ color: C.textDim, background: 'rgba(92,160,92,0.15)' }}
                  >
                    {f.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Object list — compact vertical list */}
            <div className="space-y-2">
              {filtered.map(obj => {
                const s = FAMILY_STYLE[obj.objectFamily];
                const isSel = obj.objectId === selectedId;
                return (
                  <button
                    key={obj.objectId}
                    onClick={() => selectObj(obj.objectId)}
                    className="w-full text-left px-4 py-3.5 rounded-xl border transition-colors duration-150"
                    style={{
                      borderColor: isSel ? s.border : C.borderMid,
                      background: isSel ? `${s.glow}` : C.surfaceEl,
                      borderLeftWidth: isSel ? '3px' : '1px',
                      borderLeftColor: isSel ? s.accent : C.borderMid,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className="text-[10px] font-mono font-semibold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full shrink-0"
                        style={{ color: s.accent, background: `${s.accent}20` }}
                      >
                        {obj.objectFamily === 'source_of_truth' ? 'SoT' : obj.objectFamily.slice(0, 4)}
                      </span>
                      <GateBadge gate={obj.gate} />
                      {obj.truthState && <TruthBadge state={obj.truthState} />}
                    </div>
                    <div
                      className="text-sm leading-snug"
                      style={{ color: isSel ? C.text : C.textMuted }}
                    >
                      {obj.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* ── Main layout ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28, duration: 0.6 }}
            className="grid lg:grid-cols-[260px_1fr] gap-5 items-start"
          >
            {/* Sidebar — hidden on mobile, visible lg+ */}
            <aside
              className="hidden lg:block rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${C.border}`, background: C.surface }}
            >
              {/* Summary stats */}
              <div className="px-5 py-4" style={{ borderBottom: `1px solid ${C.borderMid}` }}>
                <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.24em] mb-3" style={{ color: C.accentDim }}>
                  Summary
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'All',  count: counts.all,            color: C.text },
                    { label: 'Obs',  count: counts.observation,    color: FAMILY_STYLE.observation.accent },
                    { label: 'Appr', count: counts.approval,       color: FAMILY_STYLE.approval.accent },
                    { label: 'SoT',  count: counts.source_of_truth,color: FAMILY_STYLE.source_of_truth.accent },
                  ].map(c => (
                    <div
                      key={c.label}
                      className="text-center rounded-xl py-3"
                      style={{ background: C.surfaceEl, border: `1px solid ${C.borderMid}` }}
                    >
                      <div className="text-2xl font-light leading-none" style={{ color: c.color }}>{c.count}</div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.14em] mt-1.5" style={{ color: C.textDim }}>{c.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filters */}
              <div className="px-3 py-3 flex flex-col gap-0.5" style={{ borderBottom: `1px solid ${C.borderMid}` }}>
                {filters.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-[0.14em] flex items-center justify-between transition-colors duration-150"
                    style={{
                      color: filter === f.key ? C.text : C.textMuted,
                      background: filter === f.key ? 'rgba(92,184,112,0.12)' : 'transparent',
                      borderLeft: filter === f.key ? `3px solid ${C.accent}` : '3px solid transparent',
                      minHeight: '40px',
                    }}
                  >
                    <span>{f.label}</span>
                    <span style={{ color: filter === f.key ? C.accentDim : C.textDim, fontVariantNumeric: 'tabular-nums' }}>{f.count}</span>
                  </button>
                ))}
              </div>

              {/* Object list */}
              <div className="py-2 max-h-[420px] overflow-y-auto">
                {filtered.map(obj => {
                  const s = FAMILY_STYLE[obj.objectFamily];
                  const isSel = obj.objectId === selectedId;
                  return (
                    <button
                      key={obj.objectId}
                      onClick={() => selectObj(obj.objectId)}
                      className="w-full text-left px-5 py-3.5 transition-colors duration-150 border-l-[3px]"
                      style={{
                        background: isSel ? 'rgba(92,184,112,0.09)' : 'transparent',
                        borderColor: isSel ? C.accent : 'transparent',
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className="text-[10px] font-mono font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full shrink-0"
                          style={{ color: s.accent, background: `${s.accent}20` }}
                        >
                          {obj.objectFamily === 'source_of_truth' ? 'SoT' : obj.objectFamily.slice(0, 4)}
                        </span>
                        <GateBadge gate={obj.gate} />
                      </div>
                      <div
                        className="text-sm leading-snug break-words"
                        style={{ color: isSel ? C.text : C.textMuted }}
                      >
                        {obj.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* ── Content area ───────────────────────────────────────────── */}
            <div className="space-y-4 min-w-0">
              {/* Object header badges */}
              <div
                className="flex items-center gap-2.5 flex-wrap px-4 py-3 rounded-xl"
                style={{ background: C.surfaceEl, border: `1px solid ${C.borderMid}` }}
              >
                <span
                  className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full border inline-flex items-center"
                  style={{ color: fs.accent, borderColor: fs.border, background: `${fs.accent}15`, minHeight: '32px' }}
                >
                  {fs.label}
                </span>
                <GateBadge gate={selected.gate} />
                {selected.truthState && <TruthBadge state={selected.truthState} />}
                <span className="text-xs font-mono ml-auto" style={{ color: C.textDim }}>
                  {new Date(selected.timestamp).toLocaleString()}
                </span>
              </div>

              {/* Three lanes */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.objectId}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {/* Lane 1 — Technical Evidence */}
                  <LaneCard title="Technical Evidence" accent={FAMILY_STYLE.observation.accent} border="rgba(125,211,252,0.22)">
                    <Field label="Summary" value={selected.tech.summary} />
                    {selected.tech.source && <Field label="Source" value={selected.tech.source} mono />}
                    {selected.tech.authoritativePath && <Field label="Authoritative Path" value={selected.tech.authoritativePath} mono />}
                    {selected.tech.evidence && <Field label="Observed Value" value={selected.tech.evidence} mono />}
                    {selected.tech.logMarker && <Field label="Log Marker" value={selected.tech.logMarker} mono />}
                    {selected.tech.command && <Field label="Command" value={selected.tech.command} mono />}
                    {selected.tech.approvalState && <Field label="Approval State" value={selected.tech.approvalState} />}
                    {selected.tech.riskReason && <Field label="Risk Reason" value={selected.tech.riskReason} />}
                    {selected.tech.staleLookalikes && (
                      <Field label="Stale Lookalikes" value={
                        <ul className="space-y-1.5 mt-1">
                          {selected.tech.staleLookalikes.map(p => (
                            <li key={p} className="text-sm font-mono break-all" style={{ color: 'rgba(248,113,113,0.80)' }}>{p}</li>
                          ))}
                        </ul>
                      } />
                    )}
                    {selected.tech.exactCommands && (
                      <Field label="Exact Commands" value={
                        <ul className="space-y-1.5 mt-1">
                          {selected.tech.exactCommands.map(c => (
                            <li key={c} className="text-sm font-mono px-3 py-1.5 rounded-lg break-all" style={{ background: 'rgba(71,85,105,0.28)', color: '#7dd3fc' }}>{c}</li>
                          ))}
                        </ul>
                      } />
                    )}
                  </LaneCard>

                  {/* Lane 2 — Gate / Approval / Truth */}
                  <LaneCard title="Gate · Approval · Truth" accent={FAMILY_STYLE.approval.accent} border="rgba(244,201,106,0.22)">
                    <div className="flex items-center gap-2 flex-wrap">
                      <GateBadge gate={selected.gateInfo.gate} />
                      {selected.gateInfo.truthState && <TruthBadge state={selected.gateInfo.truthState} />}
                    </div>
                    <Field label="Requires Approval" value={selected.gateInfo.requiresApproval ? 'Yes' : 'No'} />
                    {selected.gateInfo.approvalState && <Field label="Approval State" value={selected.gateInfo.approvalState} />}
                    {selected.gateInfo.grantedBy !== undefined && (
                      <Field label="Granted By" value={selected.gateInfo.grantedBy ?? '— not yet granted'} />
                    )}
                    {selected.gateInfo.executed !== undefined && (
                      <Field label="Executed" value={selected.gateInfo.executed ? 'Yes' : 'No'} />
                    )}
                    {selected.gateInfo.severity && <Field label="Severity" value={selected.gateInfo.severity} />}
                    {selected.gateInfo.warning && (
                      <div
                        className="rounded-xl px-4 py-3"
                        style={{ background: 'rgba(196,160,80,0.08)', border: '1px solid rgba(196,160,80,0.28)' }}
                      >
                        <p className="text-sm leading-[1.65]" style={{ color: 'rgba(196,160,80,0.82)' }}>
                          ⚠ {selected.gateInfo.warning}
                        </p>
                      </div>
                    )}
                  </LaneCard>

                  {/* Lane 3 — Human Meaning */}
                  <LaneCard title="Human Meaning" accent={FAMILY_STYLE.source_of_truth.accent} border="rgba(52,211,153,0.22)">
                    {selected.meaning ? (
                      <>
                        <Field label="What happened" value={selected.meaning.whatHappened} />
                        <div className="flex gap-2 flex-wrap">
                          <span
                            className="text-xs font-mono uppercase tracking-[0.14em] px-3 py-1 rounded-full inline-flex items-center"
                            style={{
                              color: selected.meaning.activeOrHistorical === 'active' ? '#34d399' : C.textMuted,
                              background: selected.meaning.activeOrHistorical === 'active' ? 'rgba(52,211,153,0.14)' : 'rgba(71,85,105,0.18)',
                              minHeight: '28px',
                            }}
                          >
                            {selected.meaning.activeOrHistorical}
                          </span>
                          <span
                            className="text-xs font-mono uppercase tracking-[0.14em] px-3 py-1 rounded-full inline-flex items-center"
                            style={{
                              color: selected.meaning.isProblem ? '#f87171' : '#34d399',
                              background: selected.meaning.isProblem ? 'rgba(248,113,113,0.14)' : 'rgba(52,211,153,0.10)',
                              minHeight: '28px',
                            }}
                          >
                            {selected.meaning.isProblem ? 'Problem' : 'Not a problem'}
                          </span>
                        </div>
                        <Field label="Why it matters" value={selected.meaning.whyItMatters} />
                        <Field label="Next safe step" value={selected.meaning.smallestSafeNextStep} />
                        {selected.meaning.doNotTouch && selected.meaning.doNotTouch.length > 0 && (
                          <div>
                            <div className="text-xs font-mono uppercase tracking-[0.18em] mb-2" style={{ color: 'rgba(248,113,113,0.70)' }}>
                              Do not touch
                            </div>
                            <ul className="space-y-1.5">
                              {selected.meaning.doNotTouch.map((d, i) => (
                                <li
                                  key={i}
                                  className="text-sm leading-[1.6] pl-3"
                                  style={{ color: 'rgba(248,113,113,0.75)', borderLeft: '2px solid rgba(248,113,113,0.28)' }}
                                >
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-sm italic" style={{ color: C.textDim }}>No meaning layer for this object.</p>
                    )}
                  </LaneCard>
                </motion.div>
              </AnimatePresence>

              {/* Raw JSON toggle */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setShowRaw(r => !r)}
                  className="text-xs font-mono font-semibold uppercase tracking-[0.18em] px-5 py-2.5 rounded-xl border transition-all duration-200 hover:opacity-90"
                  style={{
                    color: showRaw ? C.text : C.textMuted,
                    borderColor: showRaw ? C.border : C.borderMid,
                    background: showRaw ? C.surfaceEl : C.surface,
                    minHeight: '44px',
                  }}
                >
                  {showRaw ? '✕ Hide raw' : '{ } Show raw JSON'}
                </button>
              </div>

              <AnimatePresence>
                {showRaw && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="rounded-2xl border px-5 py-5"
                      style={{ borderColor: C.border, background: 'rgba(6,10,6,0.90)' }}
                    >
                      <p className="text-xs font-mono uppercase tracking-[0.18em] mb-4" style={{ color: C.accentDim }}>
                        Raw envelope object — {selected.objectId}
                      </p>
                      <pre
                        className="text-xs font-mono whitespace-pre-wrap break-all leading-[1.8] overflow-x-auto"
                        style={{ color: C.textMuted }}
                      >
                        {JSON.stringify(
                          { objectFamily: selected.objectFamily, objectId: selected.objectId, timestamp: selected.timestamp, tech: selected.tech, gateInfo: selected.gateInfo, meaning: selected.meaning },
                          null, 2
                        )}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Footer */}
          <p
            className="text-center mt-12 text-xs font-mono uppercase tracking-[0.26em]"
            style={{ color: C.textFaint }}
          >
            ledger truth leads · visuals follow · evidence stays visible
          </p>
        </>
      )}
    </div>
  );
};

export default BicameralHudPreview;
