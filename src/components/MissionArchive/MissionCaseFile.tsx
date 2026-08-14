import React from 'react';
import { motion } from 'motion/react';
import { HACKATHONS_DATA } from '../../data/portfolioData';
import { HackathonMission } from '../../types/portfolio';
import { soundManager } from '../../utils/soundEffects';
import { X, ArrowLeft, Trophy, ExternalLink, Github, ChevronRight, CheckCircle, Target } from 'lucide-react';

interface MissionCaseFileProps {
  mission: HackathonMission | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenProject: (projectId: string) => void;
}

export const MissionCaseFile: React.FC<MissionCaseFileProps> = ({
  mission,
  isOpen,
  onClose,
  onOpenProject
}) => {
  if (!isOpen && !mission) return null;

  const currentMissions = mission ? [mission] : HACKATHONS_DATA;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#07080e] border border-pink-500/40 rounded-lg shadow-[0_0_60px_rgba(236,72,153,0.2)] flex flex-col overflow-hidden text-slate-200"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0a0c16] border-b border-pink-900/40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundManager.playStrandPluck(300);
                onClose();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-pink-950/40 hover:bg-pink-900/60 text-pink-400 hover:text-white border border-pink-500/40 rounded text-xs font-tech tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO WEB</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-xs font-tech text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              MISSION ARCHIVE // HACKATHON SPRINTS
            </span>
          </div>

          <button
            onClick={() => {
              soundManager.playStrandPluck(280);
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Missions List / Deep View */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {currentMissions.map((m) => (
            <div
              key={m.id}
              className="p-5 rounded-lg bg-[#090b14] border border-slate-800 hover:border-pink-500/40 transition-colors space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-pink-950/60 text-pink-400 border border-pink-500/30 font-bold uppercase">
                      {m.status}
                    </span>
                    <span className="text-xs font-tech text-slate-400">{m.date}</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white mt-1">
                    {m.name}
                  </h3>
                  <div className="text-xs font-tech text-pink-300/80">
                    EVENT: {m.event} • ROLE: {m.role}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {m.projectId && (
                    <button
                      onClick={() => {
                        soundManager.playNodeClick();
                        onOpenProject(m.projectId!);
                      }}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-tech font-bold tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Target className="w-3.5 h-3.5" />
                      <span>VIEW {m.project}</span>
                    </button>
                  )}
                  {m.demoUrl && (
                    <a
                      href={m.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-pink-950/40 hover:bg-pink-900/60 text-pink-300 text-xs font-tech rounded border border-pink-500/40 flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>DEMO</span>
                    </a>
                  )}
                  {m.githubUrl && (
                    <a
                      href={m.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-700 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Problem & Outcome */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded bg-black/40 border border-slate-800/80">
                  <div className="text-xs font-tech text-slate-400 uppercase mb-1">MISSION PROBLEM:</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{m.problem}</p>
                </div>
                <div className="p-3.5 rounded bg-black/40 border border-slate-800/80">
                  <div className="text-xs font-tech text-emerald-400 uppercase mb-1">OUTCOME & DEPLOYMENT:</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{m.outcome}</p>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <div className="text-xs font-tech text-slate-400 uppercase tracking-wider mb-2">
                  TECHNOLOGY STACK DEPLOYED:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {m.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-tech px-2 py-0.5 rounded bg-pink-950/30 text-pink-300 border border-pink-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Learnings */}
              <div>
                <div className="text-xs font-tech text-slate-400 uppercase tracking-wider mb-2">
                  SPRINT TAKEAWAYS & ARCHITECTURAL LEARNINGS:
                </div>
                <ul className="space-y-1.5">
                  {m.learnings.map((lrn, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <ChevronRight className="w-3.5 h-3.5 text-pink-500 shrink-0 mt-0.5" />
                      <span>{lrn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info strip */}
        <div className="px-6 py-2.5 bg-[#05060a] border-t border-slate-900 flex items-center justify-between text-[10px] font-tech text-slate-500">
          <span>HACKATHON MISSIONS LOGGED: {HACKATHONS_DATA.length}</span>
          <span>HIGH-SPEED RAPID PROTOTYPING VERIFIED</span>
        </div>
      </motion.div>
    </div>
  );
};
