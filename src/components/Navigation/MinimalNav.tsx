import React from 'react';
import { Search, Github, Linkedin, Mail } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import { PROFILE_DATA } from '../../data/portfolioData';

interface MinimalNavProps {
  activeView: 'web' | 'projects' | 'missions' | 'skills' | 'identity';
  onSelectView: (view: 'web' | 'projects' | 'missions' | 'skills' | 'identity') => void;
  onOpenSpiderSense: () => void;
}

export const MinimalNav: React.FC<MinimalNavProps> = ({
  activeView,
  onSelectView,
  onOpenSpiderSense
}) => {
  const navItems: { id: typeof activeView; label: string }[] = [
    { id: 'web', label: 'WEB' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'missions', label: 'MISSIONS' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'identity', label: 'IDENTITY' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-black/80 backdrop-blur-md border-b border-red-950/40 px-4 md:px-8 flex items-center justify-between pointer-events-auto select-none">
      {/* Zone 1: Brand Title (Single line, no subtitles/descriptors) */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => {
            soundManager.playNodeClick();
            onSelectView('web');
          }}
          className="text-sm md:text-base font-bold font-display text-white tracking-widest uppercase hover:text-red-400 transition-colors whitespace-nowrap cursor-pointer"
        >
          SPIDER // PARTHU
        </button>
      </div>

      {/* Zone 2: 4-6 Nav links, 1-2 words, single-line */}
      <nav className="hidden md:flex items-center gap-1.5">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundManager.playStrandPluck(360);
                onSelectView(item.id);
              }}
              className={`px-3 py-1.5 rounded text-xs font-tech font-medium uppercase tracking-wider whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-red-600/20 text-red-400 border border-red-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              [ {item.label} ]
            </button>
          );
        })}
      </nav>

      {/* Zone 3: 1-2 Primary actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => {
            soundManager.playSpiderSense();
            onOpenSpiderSense();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-tech font-bold tracking-wider uppercase border border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.4)] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">SPIDER-SENSE</span>
        </button>

        <a
          href={PROFILE_DATA.socialLinks[0].url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundManager.playStrandPluck(500)}
          className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 transition-colors"
          title="GitHub: nandipalleparthu-eng"
        >
          <Github className="w-4 h-4" />
        </a>

        <a
          href={PROFILE_DATA.socialLinks[1].url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundManager.playStrandPluck(500)}
          className="p-1.5 bg-sky-950/50 hover:bg-sky-900/70 text-sky-400 hover:text-white rounded border border-sky-700/50 transition-colors"
          title="LinkedIn: nandipalle-parthu-ai"
        >
          <Linkedin className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
};
