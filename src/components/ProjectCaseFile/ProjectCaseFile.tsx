import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectDetail } from '../../types/portfolio';
import { soundManager } from '../../utils/soundEffects';
import { 
  X, ExternalLink, Github, ChevronRight, Layers, Cpu, ShieldCheck, 
  Wheat, Truck, Factory, Users, Terminal, CheckCircle2, Sparkles, 
  FileCode2, ArrowLeft, Activity
} from 'lucide-react';

interface ProjectCaseFileProps {
  project: ProjectDetail | null;
  onClose: () => void;
  onSelectSkill: (skillId: string) => void;
}

export const ProjectCaseFile: React.FC<ProjectCaseFileProps> = ({
  project,
  onClose,
  onSelectSkill
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ai-architecture' | 'sectors' | 'tech' | 'builds'>('overview');
  const [activeSectorIdx, setActiveSectorIdx] = useState<number>(0);
  const [showOtherBuilds, setShowOtherBuilds] = useState<boolean>(false);

  if (!project) return null;

  const isArtha = project.id === 'artha';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#07080e] border border-red-500/40 rounded-lg shadow-[0_0_60px_rgba(239,68,68,0.2)] flex flex-col overflow-hidden text-slate-200"
      >
        {/* Dossier Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0b0d17] border-b border-red-900/40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundManager.playStrandPluck(300);
                onClose();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-white border border-red-500/40 rounded text-xs font-tech tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO WEB</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-2 text-xs font-tech text-slate-400">
              <span className="px-2 py-0.5 rounded bg-red-950/70 text-red-400 border border-red-500/30 uppercase text-[10px]">
                {project.clearanceLevel}
              </span>
              <span className="font-mono text-slate-500">{project.codeName}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[11px] font-tech text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {project.status}
            </span>
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
        </div>

        {/* Project Title Banner */}
        <div className="px-6 py-4 bg-[#090b14] border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-white tracking-tight uppercase">
                {project.title}
              </h2>
              {isArtha && (
                <span className="px-2 py-0.5 rounded bg-red-600 text-white font-tech text-[10px] font-bold tracking-widest shadow-[0_0_10px_#ef4444]">
                  FLAGSHIP
                </span>
              )}
            </div>
            <p className="text-xs md:text-sm font-tech text-red-400/90 mt-0.5 tracking-wide">
              {project.tagline}
            </p>
          </div>

          {/* Quick Action Links */}
          <div className="flex items-center gap-2 shrink-0">
            {project.primaryLiveUrl && (
              <a
                href={project.primaryLiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playNodeClick()}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-tech text-xs font-bold tracking-wider flex items-center gap-2 border border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LIVE EXPERIENCE</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playNodeClick()}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white rounded font-tech text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>REPOSITORY</span>
              </a>
            )}
          </div>
        </div>

        {/* Dossier Tabs */}
        <div className="flex items-center border-b border-slate-800 bg-[#05060b] px-6 overflow-x-auto">
          {[
            { id: 'overview', label: '1. PROBLEM & SOLUTION' },
            ...(project.aiArchitecture ? [{ id: 'ai-architecture', label: '2. AI & LOCAL INFERENCE' }] : []),
            ...(project.sectorViews ? [{ id: 'sectors', label: '3. SECTOR ARCHITECTURE (4 VIEWS)' }] : []),
            { id: 'tech', label: '4. TECH ARSENAL' },
            ...(project.otherBuilds ? [{ id: 'builds', label: '5. DEPLOYMENTS / BUILDS' }] : [])
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playStrandPluck(440);
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`py-3 px-4 font-tech text-xs font-medium uppercase border-b-2 tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                  isActive ? 'border-red-500 text-red-400 font-bold bg-red-950/20' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Scrollable Case Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Problem Section */}
              <div className="p-4 rounded bg-[#090b14] border border-red-900/30">
                <div className="flex items-center gap-2 text-xs font-tech text-red-400 font-bold tracking-widest uppercase mb-2">
                  <span className="w-2 h-2 rounded bg-red-500" />
                  PROBLEM STATEMENT & INDUSTRY OPACITY
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Solution Section */}
              <div className="p-4 rounded bg-[#090b14] border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-tech text-emerald-400 font-bold tracking-widest uppercase mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ENGINEERED SOLUTION & APPROACH
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* Role & Contributions */}
              <div className="p-4 rounded bg-[#090b14] border border-slate-800">
                <div className="text-xs font-tech text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-between">
                  <span>CONTRIBUTION DOSSIER</span>
                  <span className="text-red-400 font-bold">{project.teamRole}</span>
                </div>
                <ul className="space-y-2">
                  {project.keyContributions.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <ChevronRight className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'ai-architecture' && project.aiArchitecture && (
            <div className="space-y-6">
              <div className="p-4 rounded bg-[#090b14] border border-purple-900/40">
                <div className="flex items-center gap-2 text-xs font-tech text-purple-400 font-bold tracking-widest uppercase mb-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  AI & NEURAL PIPELINE ARCHITECTURE
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {project.aiArchitecture}
                </p>
                {project.localAiDetails && (
                  <div className="p-3 bg-black/60 rounded border border-purple-500/30 text-xs text-slate-300 font-tech">
                    <span className="text-purple-400 font-bold uppercase block mb-1">LOCAL & EDGE INFERENCE SPEC:</span>
                    {project.localAiDetails}
                  </div>
                )}
              </div>

              {/* Visual System Architecture representation */}
              <div className="p-5 rounded bg-[#05070c] border border-slate-800">
                <div className="text-xs font-tech text-slate-400 uppercase tracking-wider mb-4">
                  DATA INFERENCE & TELEMETRY STREAM
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] font-tech text-red-400 uppercase">Input Capture</div>
                    <div className="text-xs font-bold text-white mt-1">Multi-Modal Sensor / Image</div>
                  </div>
                  <div className="p-3 rounded bg-slate-900/90 border border-purple-800/40">
                    <div className="text-[10px] font-tech text-purple-400 uppercase">Edge Quantization</div>
                    <div className="text-xs font-bold text-white mt-1">Lightweight Vision Model</div>
                  </div>
                  <div className="p-3 rounded bg-slate-900/90 border border-blue-800/40">
                    <div className="text-[10px] font-tech text-blue-400 uppercase">Dynamic Pricing</div>
                    <div className="text-xs font-bold text-white mt-1">Time-Series Forecast Engine</div>
                  </div>
                  <div className="p-3 rounded bg-slate-900/90 border border-emerald-800/40">
                    <div className="text-[10px] font-tech text-emerald-400 uppercase">Trade Settlement</div>
                    <div className="text-xs font-bold text-white mt-1">Direct Contract Matching</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sectors' && project.sectorViews && (
            <div className="space-y-4">
              <div className="text-xs font-tech text-slate-400">
                SELECT A SECTOR TO INSPECT THE DEDICATED WORKFLOW & TELEMETRY:
              </div>

              {/* Sector selector pills */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {project.sectorViews.map((sec, sIdx) => {
                  const isSecActive = activeSectorIdx === sIdx;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => {
                        soundManager.playStrandPluck(380 + sIdx * 40);
                        setActiveSectorIdx(sIdx);
                      }}
                      className={`p-3 rounded text-left border transition-all cursor-pointer ${
                        isSecActive
                          ? 'bg-red-950/30 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                          : 'bg-[#090b14] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[9px] font-tech text-red-400 uppercase tracking-widest">{sec.badge}</div>
                      <div className="text-xs font-bold text-white mt-1">{sec.name}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Sector Deep Dive */}
              {project.sectorViews[activeSectorIdx] && (
                <div className="p-5 rounded bg-[#090b14] border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-tech text-red-400 uppercase tracking-wider">
                        {project.sectorViews[activeSectorIdx].role}
                      </span>
                      <h4 className="text-lg font-bold text-white font-display">
                        {project.sectorViews[activeSectorIdx].name}
                      </h4>
                    </div>
                    <span className="text-xs font-tech text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-500/30">
                      {project.sectorViews[activeSectorIdx].metrics}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-slate-300">
                    {project.sectorViews[activeSectorIdx].description}
                  </p>

                  <div>
                    <div className="text-xs font-tech text-slate-400 uppercase tracking-wider mb-2">
                      CORE SECTOR CAPABILITIES:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.sectorViews[activeSectorIdx].features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 p-2 rounded bg-black/50 border border-slate-800 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="space-y-6">
              <div>
                <div className="text-xs font-tech text-slate-400 uppercase tracking-wider mb-3">
                  ENGINEERED TECH STACK (CLICK TO HIGHLIGHT ON SPIDER WEB):
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        soundManager.playNodeClick();
                        onSelectSkill(tech.name);
                        onClose();
                      }}
                      className={`px-3 py-1.5 rounded text-xs font-tech flex items-center gap-2 border transition-all cursor-pointer ${
                        tech.highlight
                          ? 'bg-red-950/40 text-red-300 border-red-500/40 hover:bg-red-600 hover:text-white'
                          : 'bg-[#090b14] text-slate-300 border-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span>{tech.name}</span>
                      <span className="text-[10px] text-slate-500 uppercase">({tech.category})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills cross links */}
              <div className="p-4 rounded bg-[#090b14] border border-slate-800">
                <div className="text-xs font-tech text-slate-400 uppercase tracking-wider mb-2">
                  CONNECTED SKILL DOMAINS:
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.skillsUsed.map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-black/60 text-slate-300 border border-slate-800 text-xs font-tech">
                      #{s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'builds' && project.otherBuilds && (
            <div className="space-y-4">
              <div className="p-4 rounded bg-[#090b14] border border-red-900/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-tech text-red-400 font-bold uppercase tracking-wider">
                    PRIMARY PRODUCTION LIVE BUILD
                  </div>
                  <span className="text-[10px] font-tech text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                    CANONICAL RELEASE
                  </span>
                </div>
                <p className="text-xs text-slate-300 mb-3">
                  The primary comprehensive story deck and product experience demonstrating all 4 sectors.
                </p>
                <a
                  href={project.primaryLiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-tech text-xs font-bold tracking-wider uppercase border border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>OPEN PRIMARY LIVE EXPERIENCE</span>
                </a>
              </div>

              {/* Other Builds / Versions Section */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-tech text-slate-400 uppercase tracking-wider">
                  OTHER BUILDS / VERSIONS:
                </div>
                {project.otherBuilds.map((build, bIdx) => (
                  <div key={bIdx} className="p-3.5 rounded bg-[#090b14] border border-slate-800 flex items-center justify-between gap-4">
                    <div>
                      <h5 className="text-xs font-bold text-white font-tech">{build.label}</h5>
                      <p className="text-[11px] text-slate-400 mt-0.5">{build.note}</p>
                    </div>
                    <a
                      href={build.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-tech rounded border border-slate-700 flex items-center gap-1.5 shrink-0 transition-colors"
                    >
                      <span>LAUNCH</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="px-6 py-2.5 bg-[#05060a] border-t border-slate-900 flex items-center justify-between text-[10px] font-tech text-slate-500">
          <span>PROJECT ARCHIVE REF: #{project.id.toUpperCase()}</span>
          <span>SPIDER//WEB RECONSTRUCTION READY</span>
        </div>
      </motion.div>
    </div>
  );
};
