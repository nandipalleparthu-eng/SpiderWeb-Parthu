import React, { useState } from 'react';
import { Sparkles, X, Target, ArrowRight, Layers, Cpu, Brain, Shield, Globe, Terminal } from 'lucide-react';
import { SKILLS_DATA, PROJECTS_DATA } from '../../data/portfolioData';
import { SkillItem, ProjectDetail } from '../../types/portfolio';
import { soundManager } from '../../utils/soundEffects';

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSkillId: string | null;
  onSelectSkill: (skillId: string) => void;
  onOpenProject: (projectId: string) => void;
}

export const SkillsModal: React.FC<SkillsModalProps> = ({
  isOpen,
  onClose,
  activeSkillId,
  onSelectSkill,
  onOpenProject,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');

  if (!isOpen) return null;

  const domains = [
    { id: 'ALL', label: 'ALL SKILLS', icon: Layers },
    { id: 'AI / ML', label: 'AI & MACHINE LEARNING', icon: Brain },
    { id: 'WEB DEVELOPMENT', label: 'WEB SYSTEMS', icon: Globe },
    { id: 'CYBERSECURITY', label: 'CYBERSECURITY & CRYPTO', icon: Shield },
    { id: 'IoT', label: 'IoT & HARDWARE', icon: Cpu },
    { id: 'LANGUAGES', label: 'LANGUAGES & ALGORITHMS', icon: Terminal },
  ];

  const filteredSkills = selectedDomain === 'ALL'
    ? SKILLS_DATA
    : SKILLS_DATA.filter(s => s.category === selectedDomain);

  const getConnectedProjects = (skill: SkillItem): ProjectDetail[] => {
    return PROJECTS_DATA.filter(
      p => skill.connectedProjectIds.includes(p.id) || p.skillsUsed.some(s => s.toLowerCase() === skill.name.toLowerCase())
    );
  };

  const handleSkillClick = (skill: SkillItem) => {
    soundManager.playNodeClick();
    soundManager.playStrandPluck(480);
    onSelectSkill(skill.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-[#070811] border border-red-500/40 rounded-lg shadow-[0_0_50px_rgba(239,68,68,0.25)] flex flex-col overflow-hidden text-slate-200">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-red-950/20 border-b border-red-900/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-red-950/60 border border-red-500/40 text-red-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-[10px] font-tech text-red-400 uppercase tracking-widest">
                  PORTFOLIO KNOWLEDGE MATRIX
                </span>
              </div>
              <h2 className="text-xl font-bold text-white font-display uppercase tracking-wider">
                SKILLS & CONNECTED NETWORK
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Domain Filter Bar */}
        <div className="px-6 py-2.5 bg-black/40 border-b border-slate-800/80 flex flex-wrap gap-1.5">
          {domains.map((dom) => {
            const Icon = dom.icon;
            const isSelected = selectedDomain === dom.id;
            return (
              <button
                key={dom.id}
                onClick={() => {
                  soundManager.playStrandPluck(320);
                  setSelectedDomain(dom.id);
                }}
                className={`px-3 py-1.5 rounded text-xs font-tech flex items-center gap-1.5 border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.4)] font-bold'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{dom.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Nodes Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((skill) => {
            const connected = getConnectedProjects(skill);
            const isSkillActive = activeSkillId === skill.id || activeSkillId === skill.name;

            return (
              <div
                key={skill.id}
                className={`p-4 rounded-lg border transition-all flex flex-col justify-between ${
                  isSkillActive
                    ? 'bg-[#101222] border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.35)]'
                    : 'bg-[#0a0c16] border-slate-800/90 hover:border-red-500/50 hover:bg-[#0e101e]'
                }`}
              >
                <div>
                  {/* Top line with category & connected projects count badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 uppercase tracking-wider">
                      {skill.category}
                    </span>
                    <span className="text-xs font-tech font-bold px-2.5 py-0.5 rounded bg-red-950/70 text-red-400 border border-red-500/40">
                      {connected.length} CONNECTED {connected.length === 1 ? 'PROJECT' : 'PROJECTS'}
                    </span>
                  </div>

                  {/* Skill Title & Proficiency */}
                  <h3 className="text-lg font-bold text-white font-display tracking-wide uppercase">
                    {skill.name}
                  </h3>
                  <div className="text-[11px] font-tech text-slate-400 mt-0.5 mb-2">
                    PROFICIENCY: <span className="text-emerald-400 font-bold">{skill.proficiency}</span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {skill.summary}
                  </p>

                  {/* Core Concepts */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {skill.coreConcepts.map((c, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-tech px-1.5 py-0.5 rounded bg-black/50 text-slate-400 border border-slate-800/80"
                      >
                        #{c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions: Connected Projects & Highlight Button */}
                <div className="pt-3 border-t border-slate-800/80 mt-2 space-y-2">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[9px] font-tech text-slate-500 uppercase">PROJECTS:</span>
                    {connected.slice(0, 3).map(p => (
                      <button
                        key={p.id}
                        onClick={() => {
                          soundManager.playNodeClick();
                          onOpenProject(p.id);
                          onClose();
                        }}
                        className="text-[10px] font-tech px-2 py-0.5 rounded bg-slate-900 text-red-300 border border-red-950 hover:bg-red-900/40 hover:text-white transition-colors"
                      >
                        {p.title}
                      </button>
                    ))}
                    {connected.length > 3 && (
                      <span className="text-[10px] font-tech text-slate-500">
                        +{connected.length - 3} more
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleSkillClick(skill)}
                    className="w-full py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/40 rounded text-xs font-tech font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Target className="w-3.5 h-3.5" />
                    <span>ILLUMINATE CONNECTIONS IN WEB GRAPH</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#05060b] border-t border-slate-900 flex items-center justify-between text-xs font-tech text-slate-500">
          <span>SELECTING A SKILL DIMS UNRELATED NODES & ENERGIZES CONNECTING STRANDS</span>
          <span className="text-red-400/80 font-mono">{SKILLS_DATA.length} TOTAL SKILL NODES</span>
        </div>
      </div>
    </div>
  );
};
