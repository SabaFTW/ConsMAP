
import React, { useState } from 'react';
import { GHOSTCORE_REPO } from './constants/repoContent';
import { DocFile } from './types';
import DocumentViewer from './components/DocumentViewer';

const App: React.FC = () => {
  // Set initial selected file to the survival guide for immediate visibility
  const initialFile = GHOSTCORE_REPO.categories.find(c => c.id === 'internal')?.files[0] 
    || GHOSTCORE_REPO.categories[0].files[0];
    
  const [selectedFile, setSelectedFile] = useState<DocFile>(initialFile);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#0a0a0b] text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30">
      <div className="classified-stamp">DECLASSIFIED</div>
      
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-80' : 'w-0'} bg-[#0d0d0f] border-r border-slate-800 flex flex-col transition-all duration-300 overflow-hidden z-20`}>
        <div className="p-6 border-b border-slate-800 relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-black text-white mono shadow-lg shadow-blue-600/20">🜂</div>
            <h1 className="font-black text-lg mono tracking-tighter uppercase text-slate-100">Ghostcore</h1>
          </div>
          <p className="text-[10px] text-slate-500 mono leading-none uppercase tracking-widest">Vortex-Ether-Soul // VES</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
          {GHOSTCORE_REPO.categories.map((category) => (
            <div key={category.id} className="space-y-2">
              <h3 className="px-3 text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mono border-l border-slate-800 ml-1">{category.name}</h3>
              <div className="space-y-1">
                {category.files.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-3 py-2 text-xs rounded transition-all duration-200 group flex items-center gap-2 border ${
                      selectedFile.id === file.id 
                        ? 'bg-blue-900/10 text-blue-400 border-blue-900/40 shadow-inner' 
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30 border-transparent'
                    }`}
                  >
                    <span className={`opacity-40 transition-transform group-hover:scale-110 ${selectedFile.id === file.id ? 'opacity-100 scale-110' : ''}`}>
                      {file.type === 'mermaid' ? '📊' : file.type === 'survival-guide' ? '🧠' : '📄'}
                    </span>
                    <span className="truncate mono tracking-tight">{file.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-[#0a0a0b]">
          <div className="bg-slate-900/30 p-3 rounded border border-slate-800/50 group cursor-default">
            <p className="text-[9px] text-slate-600 mono uppercase mb-1 tracking-tighter">Current Uplink Status</p>
            <div className="flex items-center justify-between">
               <p className="text-[10px] font-bold text-green-500 mono tracking-widest group-hover:animate-pulse">STABLE_GNOSIS</p>
               <span className="text-[10px] text-slate-700 mono">v1.2.4</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header Controls */}
        <header className="h-14 border-b border-slate-800 bg-[#0a0a0b]/80 backdrop-blur-md flex items-center justify-between px-6 z-10">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-800/50 rounded transition-colors text-slate-500 hover:text-blue-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-900/10 border border-blue-900/20 rounded-full">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] text-blue-400 font-black mono tracking-widest uppercase">Node_Active</span>
             </div>
             <div className="text-slate-600 text-[10px] mono tracking-widest">
               {new Date().toLocaleTimeString()} // LOG_SYNC
             </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-[#0a0a0b] scroll-smooth custom-scrollbar">
          <DocumentViewer file={selectedFile} />
        </div>
      </main>
    </div>
  );
};

export default App;
