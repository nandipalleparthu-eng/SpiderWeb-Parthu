import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, Zap, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { PROJECTS_DATA, SKILLS_DATA, HACKATHONS_DATA } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundEffects';

interface SpiderSenseSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectTarget: (targetId: string) => void;
}

export const SpiderSenseSearchBar: React.FC<SpiderSenseSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onSelectTarget,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Quick preset filter queries
  const presets = [
    { label: "FRIDAY (1st Prize)", query: "FRIDAY AI" },
    { label: "ARTHA (Flagship)", query: "ARTHA" },
    { label: "AI Projects", query: "AI projects" },
    { label: "Python", query: "Python" },
    { label: "SmartKisan", query: "SmartKisan" },
    { label: "Cybersecurity", query: "Cybersecurity CTF" },
    { label: "IoT Smart Grids", query: "IoT Smart Garage" },
  ];

  // Process query metrics and match count summary
  const summary = useMemo(() => {
    const raw = searchQuery.trim().toLowerCase();
    if (!raw) return null;

    const tokens = raw.split(/\s+/).filter(t => t.length > 0);

    const matchedProjects = PROJECTS_DATA.filter(p => {
      const haystack = `${p.title} ${p.tagline} ${p.category} ${p.domain} ${p.skillsUsed.join(' ')}`.toLowerCase();
      if (raw.includes('ai') && p.domain === 'ai') return true;
      if (raw.includes('web') && p.domain === 'web') return true;
      if (raw.includes('cyber') && p.domain === 'cyber') return true;
      if (raw.includes('iot') && p.domain === 'iot') return true;
      return tokens.some(t => haystack.includes(t));
    });

    const matchedSkills = SKILLS_DATA.filter(s => {
      const haystack = `${s.name} ${s.category} ${s.domain} ${s.summary}`.toLowerCase();
      if (raw.includes('ai') && s.domain === 'ai') return true;
      if (raw.includes('cyber') && s.domain === 'cyber') return true;
      if (raw.includes('iot') && s.domain === 'iot') return true;
      return tokens.some(t => haystack.includes(t));
    });

    const matchedMissions = HACKATHONS_DATA.filter(m => {
      const haystack = `${m.name} ${m.event} ${m.project} ${m.outcome}`.toLowerCase();
      return tokens.some(t => haystack.includes(t)) || raw.includes('hackathon') || raw.includes('mindkraft');
    });

    const totalMatches = matchedProjects.length + matchedSkills.length + matchedMissions.length;

    let badgeText = `${totalMatches} Nodes Matched`;
    if (matchedProjects.length > 0 && matchedSkills.length === 0) {
      badgeText = `${matchedProjects.length} ${matchedProjects.length === 1 ? 'Project' : 'Projects'} Found`;
    } else if (matchedProjects.length > 0 && matchedSkills.length > 0) {
      badgeText = `${matchedProjects.length} Projects & ${matchedSkills.length} Skills Identified`;
    } else if (matchedSkills.length > 0) {
      badgeText = `${matchedSkills.length} Skills Identified`;
    } else if (matchedMissions.length > 0) {
      badgeText = `${matchedMissions.length} Hackathon Missions Found`;
    }

    return {
      totalMatches,
      badgeText,
      projects: matchedProjects,
      skills: matchedSkills,
      missions: matchedMissions,
    };
  }, [searchQuery]);

  const handleInputChange = (val: string) => {
    onSearchChange(val);
    if (val) {
      soundManager.playStrandPluck(420);
    }
  };

  const handleClear = () => {
    onSearchChange('');
    soundManager.playStrandPluck(240);
    inputRef.current?.focus();
  };

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-30 w-full max-w-xl px-4 pointer-events-auto select-none">
      <div className="bg-[#05060b]/92 backdrop-blur-md border border-red-500/40 rounded-lg shadow-[0_4px_30px_rgba(0,0,0,0.7)] p-2">
        {/* Main Input Row */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-red-500" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => setIsOpen(true)}
              placeholder="Spider-Sense Search (e.g., 'AI projects', 'ARTHA', 'Python', 'Cyber')..."
              className="w-full bg-[#030307] border border-slate-800 focus:border-red-500/80 pl-9 pr-8 py-2 text-xs font-tech text-slate-100 placeholder-slate-500 rounded focus:outline-none focus:ring-1 focus:ring-red-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={handleClear}
                className="absolute right-2.5 p-1 text-slate-400 hover:text-white rounded transition-colors"
                title="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setIsOpen(prev => !prev)}
            className={`px-2.5 py-2 rounded text-[11px] font-tech flex items-center gap-1 border transition-colors cursor-pointer ${
              isOpen || searchQuery ? 'bg-red-950/50 text-red-400 border-red-500/40' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Toggle Quick Scanner Presets"
          >
            <Filter className="w-3 h-3" />
            <span className="hidden sm:inline">PRESETS</span>
          </button>
        </div>

        {/* Dynamic Summary Readout Pill */}
        {summary && summary.totalMatches > 0 && (
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-tech">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span className="font-bold tracking-wider uppercase">
                {summary.badgeText}
              </span>
              <span className="text-slate-500 font-mono">// WEB STRANDS ILLUMINATED</span>
            </div>
            <button
              onClick={handleClear}
              className="text-[10px] text-red-400 hover:underline tracking-wider"
            >
              CLEAR HIGHLIGHTS
            </button>
          </div>
        )}

        {summary && summary.totalMatches === 0 && (
          <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px] font-tech text-amber-400/80 flex items-center gap-1.5">
            <Zap className="w-3 h-3" />
            <span>NO DIRECT NODES FOUND. TRY &ldquo;ARTHA&rdquo;, &ldquo;PYTHON&rdquo;, OR &ldquo;AI PROJECTS&rdquo;.</span>
          </div>
        )}

        {/* Preset Chips & Matched Results Tray */}
        {(isOpen || (summary && summary.totalMatches > 0)) && (
          <div className="mt-2 pt-2 border-t border-slate-800/60 flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] font-tech text-slate-500 uppercase mr-1">QUICK SCAN:</span>
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  handleInputChange(p.query);
                }}
                className={`text-[10px] font-tech px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  searchQuery.toLowerCase() === p.query.toLowerCase()
                    ? 'bg-red-600 text-white border-red-400 font-bold'
                    : 'bg-slate-900/90 text-slate-300 hover:text-red-400 border-slate-800 hover:border-red-500/40'
                }`}
              >
                {p.label}
              </button>
            ))}

            {/* Quick direct jumps for top matched projects */}
            {summary && summary.projects.slice(0, 3).map(proj => (
              <button
                key={proj.id}
                onClick={() => {
                  soundManager.playNodeClick();
                  onSelectTarget(proj.id);
                }}
                className="text-[10px] font-tech px-2 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-500/50 hover:bg-red-600 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>{proj.title}</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
