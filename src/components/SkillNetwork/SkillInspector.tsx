import React from 'react';
import { SKILLS_DATA, PROJECTS_DATA } from '../../data/portfolioData';
import { SkillItem } from '../../types/portfolio';
import { soundManager } from '../../utils/soundEffects';
import { Sparkles, X, Target, ArrowRight } from 'lucide-react';

interface SkillInspectorProps {
  activeSkillId: string | null;
  onSelectSkill: (skillId: string | null) => void;
  onOpenProject: (projectId: string) => void;
}

export const SkillInspector: React.FC<SkillInspectorProps> = ({
  activeSkillId,
  onSelectSkill,
  onOpenProject,
}) => {
  if (!activeSkillId) return null;

  // Find skill either by id (e.g. 'skill-python' or 'Python')
  const skill = SKILLS_DATA.find(
    s => s.id === activeSkillId || s.name.toLowerCase() === activeSkillId.toLowerCase()
  );

  if (!skill) return null;

  // Find connected projects
  const connectedProjects = PROJECTS_DATA.filter(
    p => skill.connectedProjectIds.includes(p.id) || p.skillsUsed.some(s => s.toLowerCase() === skill.name.toLowerCase())
  );

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 pointer-events-auto select-none">
      <div className="bg-[#080911]/95 backdrop-blur-md border border-red-500/60 rounded-lg shadow-[0_0_40px_rgba(239,68,68,0.3)] p-4 text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-red-900/40 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-[10px] font-tech text-red-400 uppercase tracking-widest">
              ACTIVE SKILL NODE INSPECTION
            </span>
          </div>
          <button
            onClick={() => {
              soundManager.playStrandPluck(250);
              onSelectSkill(null);
            }}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Skill Title & Proficiency */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="text-xl font-bold text-white font-display tracking-wide uppercase">
              {skill.name}
            </h3>
            <div className="text-xs font-tech text-red-400/90 mt-0.5">
              DOMAIN: {skill.category} • STATUS: {skill.proficiency}
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="px-2.5 py-1 rounded bg-red-950/60 text-red-400 border border-red-500/40 text-xs font-tech font-bold">
              {connectedProjects.length} CONNECTED PROJECT{connectedProjects.length === 1 ? '' : 'S'}
            </span>
          </div>
        </div>

        {/* Summary */}
        <p className="text-xs text-slate-300 leading-relaxed mb-3">
          {skill.summary}
        </p>

        {/* Core Concepts */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {skill.coreConcepts.map((c, idx) => (
            <span
              key={idx}
              className="text-[10px] font-tech px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
            >
              #{c}
            </span>
          ))}
        </div>

        {/* Connected Projects Direct Jump */}
        <div>
          <div className="text-[10px] font-tech text-slate-400 uppercase tracking-wider mb-1.5">
            LIT WEB STRANDS LINK TO:
          </div>
          <div className="flex flex-wrap gap-2">
            {connectedProjects.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  soundManager.playNodeClick();
                  onOpenProject(p.id);
                }}
                className="px-3 py-1 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white rounded border border-red-500/40 text-xs font-tech flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Target className="w-3 h-3" />
                <span>{p.title}</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
