import React from 'react';
import { motion } from 'motion/react';
import { PROFILE_DATA } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundEffects';
import { X, ArrowLeft, Brain, Globe, ShieldAlert, Cpu, Trophy, GraduationCap, Github, Linkedin, Mail, Sparkles, Award, Wheat, ExternalLink } from 'lucide-react';

interface IdentityCaseFileProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IdentityCaseFile: React.FC<IdentityCaseFileProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#07080e] border border-cyan-500/40 rounded-lg shadow-[0_0_60px_rgba(6,182,212,0.2)] flex flex-col overflow-hidden text-slate-200"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0a0c16] border-b border-cyan-900/40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundManager.playStrandPluck(300);
                onClose();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-400 hover:text-white border border-cyan-500/40 rounded text-xs font-tech tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO WEB</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-xs font-tech text-cyan-400 uppercase tracking-wider">
              CENTRAL IDENTITY DOSSIER // LEVEL-00
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

        {/* Identity Title Banner */}
        <div className="px-6 py-5 bg-[#080a13] border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-white tracking-tight uppercase">
                {PROFILE_DATA.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-400 font-tech text-xs font-bold border border-cyan-500/40">
                ACTIVE BUILDER
              </span>
              <span className="px-2 py-0.5 rounded bg-purple-950/70 text-purple-300 font-tech text-xs border border-purple-500/40 flex items-center gap-1">
                <Trophy className="w-3 h-3 text-yellow-400" />
                <span>MINDKRAFT 2026 1ST PRIZE</span>
              </span>
            </div>
            <p className="text-xs md:text-sm font-tech text-cyan-300/80 mt-1 tracking-wide">
              {PROFILE_DATA.title}
            </p>
          </div>

          {/* Social / Direct Contacts & LinkedIn Stats */}
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={PROFILE_DATA.socialLinks[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-tech rounded border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-white" />
              <span>GITHUB</span>
            </a>
            <a
              href={PROFILE_DATA.socialLinks[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-sky-950/60 hover:bg-sky-900 text-sky-300 text-xs font-tech rounded border border-sky-600/40 flex items-center gap-1.5 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-sky-400" />
              <span>LINKEDIN (1K+)</span>
            </a>
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-tech rounded border border-red-600/40 flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-red-400" />
              <span>EMAIL</span>
            </a>
          </div>
        </div>

        {/* Dossier Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Identity Manifesto */}
          <div className="p-4 rounded bg-[#090c17] border border-cyan-900/30">
            <div className="text-xs font-tech text-cyan-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>BUILDER PROFILE & TECHNICAL HORIZON</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              &ldquo;{PROFILE_DATA.identityStatement}&rdquo;
            </p>
          </div>

          {/* Academic Profile & LinkedIn Reach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 rounded bg-[#090b14] border border-slate-800 flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-tech text-slate-400 uppercase">ACADEMIC FOUNDATION:</div>
                <div className="text-sm font-bold text-white mt-0.5">{PROFILE_DATA.education.degree}</div>
                <div className="text-xs text-cyan-400">{PROFILE_DATA.education.specialization}</div>
                <div className="text-xs text-slate-400 mt-1">{PROFILE_DATA.education.institution} ({PROFILE_DATA.education.period})</div>
              </div>
            </div>

            {PROFILE_DATA.linkedInMetrics && (
              <div className="p-4 rounded bg-[#090b14] border border-slate-800 flex items-start gap-3">
                <Linkedin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-tech text-slate-400 uppercase">PROFESSIONAL REACH & CREDENTIALS:</div>
                  <div className="text-sm font-bold text-white mt-0.5 flex items-center gap-2">
                    <span>{PROFILE_DATA.linkedInMetrics.followers}</span>
                    <span className="text-slate-600">•</span>
                    <span>{PROFILE_DATA.linkedInMetrics.connections}</span>
                  </div>
                  <div className="text-xs text-sky-300 mt-1">{PROFILE_DATA.linkedInMetrics.status}</div>
                </div>
              </div>
            )}
          </div>

          {/* Verified Accolades & Hackathon Honors */}
          {PROFILE_DATA.accolades && (
            <div>
              <div className="text-xs font-tech text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                <span>MAJOR HONORS & HACKATHON ACCOLADES:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PROFILE_DATA.accolades.map((acc, idx) => (
                  <div key={idx} className="p-3.5 rounded bg-[#060912] border border-yellow-500/20 hover:border-yellow-500/50 transition-colors flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-tech text-yellow-400 font-bold px-2 py-0.5 rounded bg-yellow-950/60 border border-yellow-500/30 uppercase">
                          {acc.badge}
                        </span>
                        <span className="text-[11px] font-tech text-slate-500">{acc.event.split('(')[0]}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-display mt-1">{acc.title}</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{acc.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* The Evolution: LEARN ➔ BUILD ➔ EXPERIMENT ➔ COMPETE ➔ SHIP */}
          <div>
            <div className="text-xs font-tech text-slate-400 uppercase tracking-wider mb-3">
              THE DEVELOPER EVOLUTION TRAJECTORY:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {PROFILE_DATA.evolutionSteps.map((step, idx) => (
                <div key={idx} className="p-3.5 rounded bg-[#060810] border border-slate-800 relative group hover:border-cyan-500/50 transition-colors">
                  <div className="text-[10px] font-tech text-cyan-400 font-bold tracking-widest uppercase">
                    PHASE 0{idx + 1}
                  </div>
                  <div className="text-sm font-bold text-white font-display mt-0.5">
                    {step.phase}
                  </div>
                  <div className="text-[11px] font-tech text-slate-400 mt-1 leading-snug">
                    {step.tagline}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Mastery Domains */}
          <div>
            <div className="text-xs font-tech text-slate-400 uppercase tracking-wider mb-3">
              CORE SPHERES OF SPECIALIZATION:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PROFILE_DATA.coreDomains.map((dom, idx) => (
                <div key={idx} className="p-3.5 rounded bg-[#090b14] border border-slate-800 flex items-start gap-3">
                  <div className="p-2 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/30 shrink-0">
                    {dom.title.includes('AI') || dom.title.includes('Multimodal') ? <Brain className="w-4 h-4" /> : dom.title.includes('Agri') ? <Wheat className="w-4 h-4" /> : dom.title.includes('Web') ? <Globe className="w-4 h-4" /> : dom.title.includes('Cyber') ? <ShieldAlert className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white font-tech uppercase">{dom.title}</h5>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{dom.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info strip */}
        <div className="px-6 py-2.5 bg-[#05060a] border-t border-slate-900 flex items-center justify-between text-[10px] font-tech text-slate-500">
          <span>NANDIPALLE PARTHU // IDENTITY MATRIX VERIFIED</span>
          <span>EMAIL: {PROFILE_DATA.email}</span>
        </div>
      </motion.div>
    </div>
  );
};
