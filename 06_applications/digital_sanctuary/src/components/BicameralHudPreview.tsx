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

// ── Static sample data from frozen ledger ──────────────────────────────────

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
    gateInfo: {
      gate: 'GREEN',
      truthState: 'LIVE',
      requiresApproval: false,
      severity: 'medium',
    },
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
    gateInfo: {
      gate: 'YELLOW',
      requiresApproval: true,
      approvalState: 'requested',
      grantedBy: null,
      executed: false,
    },
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
    gateInfo: {
      gate: 'YELLOW',
      requiresApproval: true,
      approvalState: 'granted',
      grantedBy: 'human:operator',
      executed: true,
    },
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

// ── Style maps ─────────────────────────────────────────────────────────────

const FAMILY_STYLE: Record<Family, { accent: string; border: string; glow: string; label: string; filterLabel: string }> = {
  observation:    { accent: '#7dd3fc', border: 'rgba(125,211,252,0.22)', glow: 'rgba(125,211,252,0.09)', label: 'Observation',    filterLabel: 'Observation' },
  approval:       { accent: '#f4c96a', border: 'rgba(244,201,106,0.22)', glow: 'rgba(244,201,106,0.09)', label: 'Approval',       filterLabel: 'Approval' },
  source_of_truth:{ accent: '#34d399', border: 'rgba(52,211,153,0.22)',  glow: 'rgba(52,211,153,0.09)',  label: 'Source of Truth', filterLabel: 'Source of Truth' },
};

const GATE_STYLE: Record<Gate, { color: string; bg: string }> = {
  GREEN:  { color: '#34d399', bg: 'rgba(52,211,153,0.14)' },
  YELLOW: { color: '#f4c96a', bg: 'rgba(244,201,106,0.14)' },
  RED:    { color: '#f87171', bg: 'rgba(248,113,113,0.14)' },
};

const TRUTH_COLOR: Record<string, string> = {
  LIVE:      '#34d399',
  STALE:     '#f4c96a',
  HISTORICAL:'rgba(216,232,216,0.45)',
  RESTORED:  '#a78bfa',
  FOSSIL:    'rgba(216,232,216,0.28)',
  UNKNOWN:   '#f87171',
};

// ── Sub-components ─────────────────────────────────────────────────────────

const GateBadge: React.FC<{ gate: Gate }> = ({ gate }) => {
  const s = GATE_STYLE[gate];
  return (
    <span
      className="text-[9px] font-mono uppercase tracking-[0.22em] px-2.5 py-0.5 rounded-full"
      style={{ color: s.color, background: s.bg }}
    >
      {gate}
    </span>
  );
};

const TruthBadge: React.FC<{ state: string }> = ({ state }) => (
  <span
    className="text-[9px] font-mono uppercase tracking-[0.22em] px-2.5 py-0.5 rounded-full border"
    style={{ color: TRUTH_COLOR[state] ?? 'rgba(216,232,216,0.45)', borderColor: `${TRUTH_COLOR[state] ?? 'rgba(216,232,216,0.28)'}44` }}
  >
    {state}
  </span>
);

const LaneCard: React.FC<{ title: string; accent: string; border: string; children: React.ReactNode }> = ({ title, accent, border, children }) => (
  <div
    className="rounded-2xl border flex flex-col h-full"
    style={{ borderColor: border, background: 'rgba(10,16,10,0.65)' }}
  >
    <div
      className="px-4 py-3 text-[9px] font-mono uppercase tracking-[0.26em] shrink-0"
      style={{ color: accent, borderBottom: `1px solid ${border}`, background: 'rgba(8,12,8,0.4)' }}
    >
      {title}
    </div>
    <div className="px-4 py-4 space-y-3 flex-1">
      {children}
    </div>
  </div>
);

const Field: React.FC<{ label: string; value: React.ReactNode; mono?: boolean }> = ({ label, value, mono }) => (
  <div>
    <div className="text-[9px] font-mono uppercase tracking-[0.2em] mb-0.5" style={{ color: 'rgba(92,184,112,0.5)' }}>{label}</div>
    <div className={`text-xs leading-[1.7] break-all ${mono ? 'font-mono' : 'font-light'}`} style={{ color: 'rgba(216,232,216,0.75)' }}>{value}</div>
  </div>
);

// ── Kernel Saga data ───────────────────────────────────────────────────────

const SAGA_PHASES = [
  {
    id: 'approve',
    tag: 'C-phase · APPROVE',
    accent: '#34d399',
    border: 'rgba(52,211,153,0.22)',
    glow: 'rgba(52,211,153,0.05)',
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
    id: 'block',
    tag: 'C-phase · BLOCK',
    accent: '#f87171',
    border: 'rgba(248,113,113,0.22)',
    glow: 'rgba(248,113,113,0.05)',
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
    id: 'd0',
    tag: 'D0 · Execution Gate',
    accent: '#a78bfa',
    border: 'rgba(167,139,250,0.22)',
    glow: 'rgba(167,139,250,0.05)',
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
  { n: '01', label: 'Say YES safely', sub: 'APPROVE trace — paperwork passes, consensus issued' },
  { n: '02', label: 'Say NO concretely', sub: 'BLOCK trace — three layers fire simultaneously' },
  { n: '03', label: 'Hover without cutting', sub: 'Dry-run: reports and audits, never mutates' },
  { n: '04', label: 'Cut once inside a boundary', sub: 'D0 — one file copy, rollback snapshot first' },
  { n: '05', label: 'Roll back cleanly', sub: 'Exact pre-mutation state restored, audit recorded' },
];

const SagaView: React.FC = () => (
  <div className="space-y-5">
    <div
      className="rounded-xl border px-4 py-2.5 flex items-center gap-3"
      style={{ borderColor: 'rgba(196,160,80,0.28)', background: 'rgba(196,160,80,0.04)' }}
    >
      <span className="text-[9px] font-mono uppercase tracking-[0.18em]" style={{ color: 'rgba(196,160,80,0.55)' }}>
        Static explanation
      </span>
      <p className="text-xs font-mono" style={{ color: 'rgba(196,160,80,0.65)' }}>
        This page explains the Kernel. It does not execute it.
      </p>
    </div>

    {/* Pipeline flow */}
    <div
      className="rounded-2xl border px-5 py-4"
      style={{ borderColor: 'rgba(92,184,112,0.16)', background: 'rgba(10,16,10,0.65)' }}
    >
      <div className="text-[9px] font-mono uppercase tracking-[0.24em] mb-3" style={{ color: 'rgba(92,184,112,0.45)' }}>
        Pipeline flow
      </div>
      <div className="flex items-center flex-wrap gap-y-2">
        {PIPELINE_STEPS.map((step, i) => (
          <span key={step} className="flex items-center">
            <span
              className="text-[9px] font-mono uppercase tracking-[0.14em] px-2.5 py-1 rounded-lg"
              style={{ color: 'rgba(216,232,216,0.65)', background: 'rgba(92,184,112,0.08)', border: '1px solid rgba(92,184,112,0.14)' }}
            >
              {step}
            </span>
            {i < PIPELINE_STEPS.length - 1 && (
              <span className="text-[9px] mx-1" style={{ color: 'rgba(92,184,112,0.25)' }}>→</span>
            )}
          </span>
        ))}
      </div>
    </div>

    {/* Phase cards */}
    <div className="grid md:grid-cols-3 gap-3">
      {SAGA_PHASES.map(p => (
        <div
          key={p.id}
          className="rounded-2xl border p-4 space-y-3"
          style={{ borderColor: p.border, background: p.glow }}
        >
          <div>
            <span className="text-[9px] font-mono uppercase tracking-[0.2em]" style={{ color: p.accent }}>{p.tag}</span>
            <p className="text-sm font-light mt-1" style={{ color: '#d8e8d8' }}>{p.title}</p>
          </div>
          <ul className="space-y-1.5">
            {p.what.map((w, i) => (
              <li
                key={i}
                className="text-[10px] leading-[1.6] pl-2.5"
                style={{ color: 'rgba(216,232,216,0.58)', borderLeft: `1px solid ${p.border}` }}
              >
                {w}
              </li>
            ))}
          </ul>
          <div
            className="rounded-lg px-2.5 py-1.5 flex items-center gap-2"
            style={{ background: 'rgba(8,12,8,0.6)', border: `1px solid ${p.border}` }}
          >
            <span className="text-[9px] font-mono uppercase tracking-[0.14em]" style={{ color: 'rgba(216,232,216,0.28)' }}>Ability</span>
            <span className="text-[9px] font-mono uppercase tracking-[0.14em]" style={{ color: p.accent }}>{p.ability}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Five abilities + still forbidden */}
    <div className="grid md:grid-cols-2 gap-3">
      <div
        className="rounded-2xl border p-4 space-y-3"
        style={{ borderColor: 'rgba(92,184,112,0.16)', background: 'rgba(10,16,10,0.65)' }}
      >
        <div className="text-[9px] font-mono uppercase tracking-[0.24em]" style={{ color: 'rgba(92,184,112,0.45)' }}>
          Five abilities learned
        </div>
        {FIVE_ABILITIES.map(a => (
          <div key={a.n} className="flex gap-3 items-start">
            <span className="text-[10px] font-mono shrink-0 mt-0.5" style={{ color: 'rgba(92,184,112,0.35)' }}>{a.n}</span>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.14em]" style={{ color: '#d8e8d8' }}>{a.label}</div>
              <div className="text-[10px] font-light" style={{ color: 'rgba(216,232,216,0.45)' }}>{a.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="rounded-2xl border p-4"
        style={{ borderColor: 'rgba(248,113,113,0.16)', background: 'rgba(10,16,10,0.65)' }}
      >
        <div className="text-[9px] font-mono uppercase tracking-[0.24em] mb-3" style={{ color: 'rgba(248,113,113,0.45)' }}>
          Still forbidden
        </div>
        <ul className="space-y-1.5">
          {STILL_FORBIDDEN.map((f, i) => (
            <li key={i} className="flex gap-2 items-baseline">
              <span className="text-[9px] font-mono shrink-0" style={{ color: 'rgba(248,113,113,0.4)' }}>✗</span>
              <span className="text-[10px] leading-[1.5]" style={{ color: 'rgba(248,113,113,0.55)' }}>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <p
      className="text-center text-[9px] font-mono uppercase tracking-[0.28em]"
      style={{ color: 'rgba(216,232,216,0.15)' }}
    >
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
    all: SAMPLE.length,
    observation: SAMPLE.filter(o => o.objectFamily === 'observation').length,
    approval: SAMPLE.filter(o => o.objectFamily === 'approval').length,
    source_of_truth: SAMPLE.filter(o => o.objectFamily === 'source_of_truth').length,
  };

  const filters: { key: FilterKey; label: string; count: number }[] = [
    { key: 'all',            label: 'All',            count: counts.all },
    { key: 'observation',    label: 'Observation',    count: counts.observation },
    { key: 'approval',       label: 'Approval',       count: counts.approval },
    { key: 'source_of_truth',label: 'Source of Truth',count: counts.source_of_truth },
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 md:py-14 px-5 relative">
      <FloatingBack onBack={onBack} />

      {/* Static back */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        onClick={onBack}
        className="text-[10px] font-mono tracking-[0.2em] uppercase mb-8 block hover:opacity-100 transition-opacity duration-300"
        style={{ color: '#5cb870' }}
      >
        ← back
      </motion.button>

      {/* Tab switcher */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex gap-2 mb-6"
      >
        {(['hud', 'saga'] as const).map(v => (
          <button
            key={v}
            onClick={() => setViewMode(v)}
            className="px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-[0.2em] border transition-all duration-200"
            style={{
              color: viewMode === v ? '#d8e8d8' : 'rgba(216,232,216,0.35)',
              borderColor: viewMode === v ? 'rgba(92,184,112,0.35)' : 'rgba(71,85,105,0.25)',
              background: viewMode === v ? 'rgba(92,184,112,0.08)' : 'transparent',
            }}
          >
            {v === 'hud' ? 'Bicameral HUD' : 'Kernel Saga'}
          </button>
        ))}
      </motion.div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-6">
        <div className="text-[10px] font-mono uppercase tracking-[0.28em] mb-3" style={{ color: 'rgba(92,184,112,0.55)' }}>
          ConsMAP / Bicameral HUD
        </div>
        <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-1" style={{ color: '#d8e8d8' }}>
          {viewMode === 'hud' ? 'Bicameral HUD' : 'Bicameral Kernel'}
        </h1>
        <p className="text-sm font-light" style={{ color: 'rgba(216,232,216,0.55)' }}>
          {viewMode === 'hud' ? 'One chat · two readings · one shared ledger' : 'From intent to proof: yes, no, hover, cut, rollback.'}
        </p>
      </motion.div>

      {viewMode === 'saga' ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <SagaView />
        </motion.div>
      ) : (<>
      {/* Warning banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="rounded-xl border px-4 py-2.5 mb-8 flex items-center gap-3"
        style={{ borderColor: 'rgba(196,160,80,0.28)', background: 'rgba(196,160,80,0.04)' }}
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.18em]" style={{ color: 'rgba(196,160,80,0.55)' }}>⚠ Offline</span>
        <p className="text-xs font-mono" style={{ color: 'rgba(196,160,80,0.65)' }}>
          Offline concept module. Visuals do not replace ledger evidence.
        </p>
      </motion.div>

      {/* Main grid: sidebar + lanes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.28, duration: 0.7 }}
        className="grid md:grid-cols-[220px_1fr] gap-4 items-start"
      >
        {/* ── Sidebar ── */}
        <aside className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(71,85,105,0.28)', background: 'rgba(10,16,10,0.65)' }}>
          {/* Counts */}
          <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(71,85,105,0.20)' }}>
            <div className="text-[9px] font-mono uppercase tracking-[0.22em] mb-2" style={{ color: 'rgba(92,184,112,0.45)' }}>
              Summary
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: 'All', count: counts.all, color: '#d8e8d8' },
                { label: 'Obs', count: counts.observation, color: FAMILY_STYLE.observation.accent },
                { label: 'Appr', count: counts.approval, color: FAMILY_STYLE.approval.accent },
                { label: 'SoT', count: counts.source_of_truth, color: FAMILY_STYLE.source_of_truth.accent },
              ].map(c => (
                <div key={c.label} className="text-center rounded-lg py-1" style={{ background: 'rgba(71,85,105,0.12)' }}>
                  <div className="text-lg font-light" style={{ color: c.color }}>{c.count}</div>
                  <div className="text-[8px] font-mono uppercase tracking-[0.16em]" style={{ color: 'rgba(216,232,216,0.35)' }}>{c.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="px-3 py-2.5 flex flex-col gap-1" style={{ borderBottom: '1px solid rgba(71,85,105,0.20)' }}>
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="w-full text-left px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-[0.16em] flex items-center justify-between transition-colors duration-150"
                style={{
                  color: filter === f.key ? '#d8e8d8' : 'rgba(216,232,216,0.4)',
                  background: filter === f.key ? 'rgba(92,184,112,0.08)' : 'transparent',
                  borderLeft: filter === f.key ? '2px solid rgba(92,184,112,0.45)' : '2px solid transparent',
                }}
              >
                <span>{f.label}</span>
                <span style={{ color: 'rgba(216,232,216,0.28)', fontVariantNumeric: 'tabular-nums' }}>{f.count}</span>
              </button>
            ))}
          </div>

          {/* Object list */}
          <div className="py-2 max-h-[340px] overflow-y-auto">
            {filtered.map(obj => {
              const s = FAMILY_STYLE[obj.objectFamily];
              const isSelected = obj.objectId === selectedId;
              return (
                <button
                  key={obj.objectId}
                  onClick={() => { setSelectedId(obj.objectId); setShowRaw(false); }}
                  className="w-full text-left px-4 py-2.5 transition-colors duration-150"
                  style={{ background: isSelected ? 'rgba(92,184,112,0.06)' : 'transparent' }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[8px] font-mono uppercase tracking-[0.16em] px-1.5 py-0.5 rounded-full shrink-0"
                      style={{ color: s.accent, background: s.glow }}
                    >
                      {obj.objectFamily === 'source_of_truth' ? 'SoT' : obj.objectFamily.slice(0, 4)}
                    </span>
                    <GateBadge gate={obj.gate} />
                  </div>
                  <div
                    className="text-[10px] font-light leading-snug break-words"
                    style={{ color: isSelected ? '#d8e8d8' : 'rgba(216,232,216,0.55)' }}
                  >
                    {obj.label}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ── Three-lane view ── */}
        <div className="space-y-3">
          {/* Object header */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[9px] font-mono uppercase tracking-[0.22em] px-2.5 py-0.5 rounded-full border"
              style={{ color: fs.accent, borderColor: fs.border, background: fs.glow }}>
              {fs.label}
            </span>
            <GateBadge gate={selected.gate} />
            {selected.truthState && <TruthBadge state={selected.truthState} />}
            <span className="text-[9px] font-mono ml-auto" style={{ color: 'rgba(216,232,216,0.28)' }}>
              {new Date(selected.timestamp).toLocaleString()}
            </span>
          </div>

          {/* Lanes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.objectId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-3 gap-3"
            >
              {/* Lane 1: Technical Evidence */}
              <LaneCard title="Technical Evidence" accent={FAMILY_STYLE.observation.accent} border="rgba(125,211,252,0.18)">
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
                    <ul className="space-y-0.5">
                      {selected.tech.staleLookalikes.map(p => <li key={p} className="text-[10px] font-mono" style={{ color: 'rgba(248,113,113,0.7)' }}>{p}</li>)}
                    </ul>
                  } />
                )}
                {selected.tech.exactCommands && (
                  <Field label="Exact Commands" value={
                    <ul className="space-y-0.5">
                      {selected.tech.exactCommands.map(c => <li key={c} className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: 'rgba(71,85,105,0.25)', color: '#7dd3fc' }}>{c}</li>)}
                    </ul>
                  } />
                )}
              </LaneCard>

              {/* Lane 2: Gate / Approval / Truth */}
              <LaneCard title="Gate · Approval · Truth" accent={FAMILY_STYLE.approval.accent} border="rgba(244,201,106,0.18)">
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
                  <div className="rounded-lg px-3 py-2" style={{ background: 'rgba(196,160,80,0.07)', border: '1px solid rgba(196,160,80,0.22)' }}>
                    <p className="text-[10px] leading-[1.65]" style={{ color: 'rgba(196,160,80,0.72)' }}>
                      ⚠ {selected.gateInfo.warning}
                    </p>
                  </div>
                )}
              </LaneCard>

              {/* Lane 3: Human Meaning */}
              <LaneCard title="Human Meaning" accent={FAMILY_STYLE.source_of_truth.accent} border="rgba(52,211,153,0.18)">
                {selected.meaning ? (
                  <>
                    <Field label="What happened" value={selected.meaning.whatHappened} />
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-[9px] font-mono uppercase tracking-[0.16em] px-2 py-0.5 rounded-full"
                        style={{ color: selected.meaning.activeOrHistorical === 'active' ? '#34d399' : 'rgba(216,232,216,0.45)',
                          background: selected.meaning.activeOrHistorical === 'active' ? 'rgba(52,211,153,0.12)' : 'rgba(71,85,105,0.15)' }}>
                        {selected.meaning.activeOrHistorical}
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-[0.16em] px-2 py-0.5 rounded-full"
                        style={{ color: selected.meaning.isProblem ? '#f87171' : '#34d399',
                          background: selected.meaning.isProblem ? 'rgba(248,113,113,0.12)' : 'rgba(52,211,153,0.08)' }}>
                        {selected.meaning.isProblem ? 'Problem' : 'Not a problem'}
                      </span>
                    </div>
                    <Field label="Why it matters" value={selected.meaning.whyItMatters} />
                    <Field label="Next safe step" value={selected.meaning.smallestSafeNextStep} />
                    {selected.meaning.doNotTouch && selected.meaning.doNotTouch.length > 0 && (
                      <div>
                        <div className="text-[9px] font-mono uppercase tracking-[0.2em] mb-1" style={{ color: 'rgba(248,113,113,0.55)' }}>Do not touch</div>
                        <ul className="space-y-1">
                          {selected.meaning.doNotTouch.map((d, i) => (
                            <li key={i} className="text-[10px] leading-[1.6] pl-2" style={{ color: 'rgba(248,113,113,0.6)', borderLeft: '1px solid rgba(248,113,113,0.22)' }}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-xs italic" style={{ color: 'rgba(216,232,216,0.35)' }}>No meaning layer for this object.</p>
                )}
              </LaneCard>
            </motion.div>
          </AnimatePresence>

          {/* Raw JSON toggle */}
          <div className="flex justify-end pt-1">
            <button
              onClick={() => setShowRaw(r => !r)}
              className="text-[9px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl border transition-colors duration-200"
              style={{
                color: showRaw ? '#d8e8d8' : 'rgba(216,232,216,0.35)',
                borderColor: showRaw ? 'rgba(71,85,105,0.5)' : 'rgba(71,85,105,0.25)',
                background: showRaw ? 'rgba(71,85,105,0.15)' : 'transparent',
              }}
            >
              {showRaw ? 'Hide raw' : 'Show raw JSON'}
            </button>
          </div>

          <AnimatePresence>
            {showRaw && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="rounded-2xl border px-4 py-4" style={{ borderColor: 'rgba(71,85,105,0.3)', background: 'rgba(8,12,8,0.85)' }}>
                  <p className="text-[9px] font-mono uppercase tracking-[0.2em] mb-3" style={{ color: 'rgba(92,184,112,0.4)' }}>
                    Raw envelope object — {selected.objectId}
                  </p>
                  <pre className="text-[10px] font-mono whitespace-pre-wrap break-all leading-[1.8] overflow-x-auto"
                    style={{ color: 'rgba(216,232,216,0.52)' }}>
                    {JSON.stringify({ objectFamily: selected.objectFamily, objectId: selected.objectId, timestamp: selected.timestamp, tech: selected.tech, gateInfo: selected.gateInfo, meaning: selected.meaning }, null, 2)}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Footer law */}
      <p className="text-center mt-10 text-[9px] font-mono uppercase tracking-[0.28em]"
        style={{ color: 'rgba(216,232,216,0.15)' }}>
        ledger truth leads · visuals follow · evidence stays visible
      </p>
      </>)}
    </div>
  );
};

export default BicameralHudPreview;
