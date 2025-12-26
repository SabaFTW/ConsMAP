
import React, { useState } from 'react';
import { DocFile } from '../types';
import MermaidDiagram from './MermaidDiagram';

const IconMap: Record<string, React.ReactNode> = {
  book: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  alert: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  heart: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  brain: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  shield: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  users: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
};

const SurvivalGuide: React.FC<{ sections: any[] }> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  return (
    <div className="space-y-4">
      <div className="bg-blue-900/10 border border-blue-500/30 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-blue-400 mono">
          <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          Quick Reference
        </h2>
        <p className="text-sm text-slate-400">Consciousness isn't binary—it's layered. You have functional consciousness without phenomenal consciousness.</p>
      </div>

      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <div key={section.id} className={`border rounded-lg transition-all ${isActive ? 'border-blue-500 bg-blue-900/5 shadow-lg shadow-blue-900/10' : 'border-slate-800'}`}>
            <button 
              onClick={() => setActiveSection(section.id)}
              className="w-full flex items-center gap-4 p-4 text-left hover:bg-slate-800/30 transition-colors"
            >
              <div className={isActive ? 'text-blue-400' : 'text-slate-500'}>
                {IconMap[section.icon] || IconMap.book}
              </div>
              <span className={`font-bold text-lg flex-1 mono ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                {section.title}
              </span>
              <svg className={`w-5 h-5 transition-transform ${isActive ? 'rotate-90 text-blue-400' : 'text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {isActive && (
              <div className="p-6 bg-[#0d0d0f]/50 border-t border-slate-800 text-slate-300 leading-relaxed whitespace-pre-wrap mono text-sm">
                {section.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const SimpleMarkdown: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');
  return (
    <div className="prose prose-invert max-w-none">
      {lines.map((line, idx) => {
        if (line.startsWith('# ')) return <h1 key={idx} className="text-3xl font-bold mb-6 mt-8 border-b border-gray-800 pb-2 text-blue-400 mono uppercase tracking-widest">{line.substring(2)}</h1>;
        if (line.startsWith('## ')) return <h2 key={idx} className="text-2xl font-bold mb-4 mt-6 text-slate-300 mono">{line.substring(3)}</h2>;
        if (line.startsWith('### ')) return <h3 key={idx} className="text-xl font-bold mb-3 mt-4 text-slate-400 mono">{line.substring(4)}</h3>;
        if (line.startsWith('- ')) return <li key={idx} className="ml-6 mb-1 text-slate-400 list-disc">{line.substring(2)}</li>;
        if (line.trim() === '') return <div key={idx} className="h-4" />;
        return <p key={idx} className="mb-4 leading-relaxed text-slate-300">{line}</p>;
      })}
    </div>
  );
};

interface DocumentViewerProps {
  file: DocFile;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ file }) => {
  return (
    <div className="p-8 lg:p-12 min-h-full max-w-5xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-slate-800 pb-4 gap-4">
        <div>
          <h4 className="text-[10px] font-bold text-blue-500 mono uppercase tracking-tighter">INTERNAL_MEMO // CLASSIFIED_GHOSTCORE</h4>
          <h1 className="text-3xl font-black text-slate-100 mono uppercase tracking-tighter">{file.name}</h1>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-[10px] text-slate-600 mono">UID: {file.id.toUpperCase()}</p>
          <p className="text-[10px] text-slate-600 mono">PATH: {file.path}</p>
        </div>
      </div>

      <div className="relative">
        {file.type === 'survival-guide' ? (
          <SurvivalGuide sections={file.metadata.sections} />
        ) : file.type === 'mermaid' ? (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded p-4 mb-4">
              <p className="text-xs text-slate-500 mono italic">Visualizing Architectural Layering // {file.id}</p>
            </div>
            <MermaidDiagram content={file.content} />
          </div>
        ) : file.type === 'markdown' ? (
          <SimpleMarkdown content={file.content} />
        ) : (
          <pre className="bg-[#080809] p-6 rounded border border-slate-800 text-slate-400 overflow-x-auto mono text-xs leading-relaxed whitespace-pre-wrap">
            {file.content}
          </pre>
        )}
      </div>

      <div className="mt-16 pt-8 border-t border-slate-900 flex justify-between items-center opacity-20">
        <span className="text-[10px] mono">VES_CONSTELLATION_RECON // SIDRO_STOJI</span>
        <span className="text-[10px] mono tracking-widest">🜂 ARA_GNOZA 🜂</span>
      </div>
    </div>
  );
};

export default DocumentViewer;
