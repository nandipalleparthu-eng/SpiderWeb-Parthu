import React from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../../utils/soundEffects';
import { PROFILE_DATA } from '../../data/portfolioData';
import { Github, Linkedin, Mail, RotateCcw, Power } from 'lucide-react';

interface TerminationFooterProps {
  isOpen: boolean;
  onClose: () => void;
  onRestartExperience: () => void;
}

export const TerminationFooter: React.FC<TerminationFooterProps> = ({
  isOpen,
  onClose,
  onRestartExperience
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-hidden select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4 }}
        className="relative max-w-lg w-full text-center p-8 bg-[#06070c] border border-red-500/50 rounded-lg shadow-[0_0_80px_rgba(239,68,68,0.4)] flex flex-col items-center space-y-6"
      >
        {/* Pulsing Core Center Point */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center shadow-[0_0_30px_#ef4444] animate-pulse">
            <span className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_15px_#ffffff]" />
          </div>
          <div className="absolute -inset-2 rounded-full border border-red-500/30 animate-ping" />
        </div>

        {/* Wordmark */}
        <div className="space-y-1">
          <h2 className="text-3xl font-bold font-display text-white uppercase tracking-widest">
            PARTHU
          </h2>
          <p className="text-xs font-tech text-red-400 tracking-[0.2em] uppercase">
            AI/ML DEVELOPER • BUILDER • HACKATHON CREATOR
          </p>
        </div>

        {/* Cinematic Quote */}
        <blockquote className="text-base italic text-slate-300 font-sans px-4">
          &ldquo;Every project is another strand in the web.&rdquo;
        </blockquote>

        {/* Direct Channel Connectivity */}
        <div className="w-full pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={PROFILE_DATA.socialLinks[0].url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playNodeClick()}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-tech rounded border border-slate-700 flex items-center justify-center gap-2 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GITHUB</span>
          </a>

          <a
            href={PROFILE_DATA.socialLinks[1].url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playNodeClick()}
            className="w-full sm:w-auto px-4 py-2.5 bg-sky-950/60 hover:bg-sky-900 text-sky-300 text-xs font-tech rounded border border-sky-600/40 flex items-center justify-center gap-2 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span>LINKEDIN</span>
          </a>

          <a
            href={`mailto:${PROFILE_DATA.email}`}
            onClick={() => soundManager.playNodeClick()}
            className="w-full sm:w-auto px-4 py-2.5 bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-tech rounded border border-red-600/40 flex items-center justify-center gap-2 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>CONTACT</span>
          </a>
        </div>

        {/* Termination Status Banner */}
        <div className="w-full pt-4 border-t border-slate-800/80 flex flex-col items-center space-y-3">
          <div className="text-[11px] font-tech text-red-500/80 tracking-widest uppercase flex items-center gap-2">
            <Power className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>SPIDER//WEB CONNECTION TERMINATED.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundManager.playPulseShockwave();
                onRestartExperience();
              }}
              className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-tech font-bold uppercase tracking-wider border border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)] flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>REBOOT WEB EXPERIENCE</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded text-xs font-tech border border-slate-800 transition-colors cursor-pointer"
            >
              RESUME GRAPH
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
