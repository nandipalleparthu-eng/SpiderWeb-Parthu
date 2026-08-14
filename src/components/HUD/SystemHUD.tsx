import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Search, RotateCcw, Shield, Terminal, Activity } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

interface SystemHUDProps {
  totalNodes: number;
  totalProjects: number;
  totalMissions: number;
  totalSkills: number;
  onOpenSpiderSense: () => void;
  onResetView: () => void;
  activeDomain: string | null;
  onSelectDomain: (domain: string | null) => void;
}

export const SystemHUD: React.FC<SystemHUDProps> = ({
  totalNodes,
  totalProjects,
  totalMissions,
  totalSkills,
  onOpenSpiderSense,
  onResetView,
  activeDomain,
  onSelectDomain
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());
  const [latency, setLatency] = useState<number>(14);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(12 + Math.random() * 8));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAudio = () => {
    const nextMute = soundManager.toggleMute();
    setIsMuted(nextMute);
    if (!nextMute) {
      soundManager.playStrandPluck(500);
    }
  };

  const domains = [
    { id: 'ai', label: 'AI / ML', color: 'text-purple-400 border-purple-500/40 bg-purple-950/20' },
    { id: 'web', label: 'WEB', color: 'text-blue-400 border-blue-500/40 bg-blue-950/20' },
    { id: 'cyber', label: 'CYBER', color: 'text-red-400 border-red-500/40 bg-red-950/20' },
    { id: 'iot', label: 'IoT', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20' }
  ];

  return (
    <div className="fixed top-4 left-4 z-30 pointer-events-auto flex flex-col gap-2">
      {/* Top Left Main Status Panel */}
      <div className="bg-[#05060a]/90 backdrop-blur-md border border-red-500/30 rounded p-3 text-xs font-tech text-slate-300 shadow-[0_4px_25px_rgba(0,0,0,0.8)] max-w-xs">
        {/* Header Branding */}
        <div className="flex items-center justify-between border-b border-red-900/40 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
            <span className="font-bold text-white tracking-widest text-sm">SPIDER // WEB</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>ONLINE</span>
            <span className="text-slate-500 font-mono">({latency}ms)</span>
          </div>
        </div>

        {/* User Identity Details */}
        <div className="grid grid-cols-2 gap-y-1 gap-x-3 text-[11px] text-slate-400 py-1">
          <div>
            <span className="text-slate-500 uppercase">USER:</span>
            <div className="text-white font-semibold tracking-wider">PARTHU</div>
          </div>
          <div>
            <span className="text-slate-500 uppercase">NODES:</span>
            <div className="text-red-400 font-bold">{totalNodes} ACTIVE</div>
          </div>
          <div>
            <span className="text-slate-500 uppercase">PROJECTS:</span>
            <div className="text-amber-400 font-bold">{totalProjects} DEPLOYED</div>
          </div>
          <div>
            <span className="text-slate-500 uppercase">MISSIONS:</span>
            <div className="text-pink-400 font-bold">{totalMissions} HACKS</div>
          </div>
        </div>

        {/* Dynamic Connected Badges */}
        <div className="pt-2 mt-1 border-t border-slate-800/80">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>CONNECTED DOMAINS:</span>
            {activeDomain && (
              <button
                onClick={() => onSelectDomain(null)}
                className="text-[9px] text-red-400 hover:underline"
              >
                RESET FILTER
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {domains.map((dom) => {
              const isSelected = activeDomain === dom.id;
              return (
                <button
                  key={dom.id}
                  onClick={() => {
                    soundManager.playNodeClick();
                    onSelectDomain(isSelected ? null : dom.id);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-tech font-medium uppercase border transition-all cursor-pointer ${
                    isSelected ? 'bg-red-600 text-white border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.5)]' : dom.color
                  }`}
                >
                  {dom.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick HUD Tool Buttons */}
        <div className="pt-2 mt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <button
            onClick={() => {
              soundManager.playSpiderSense();
              onOpenSpiderSense();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-red-950/40 hover:bg-red-900/50 text-red-400 hover:text-white rounded border border-red-500/40 text-[10px] font-bold tracking-wider transition-colors cursor-pointer"
            title="Spider-Sense Scanner (Ctrl+K)"
          >
            <Search className="w-3 h-3" />
            <span>SPIDER-SENSE</span>
          </button>

          <button
            onClick={handleToggleAudio}
            className={`p-1.5 rounded border transition-colors cursor-pointer ${
              isMuted ? 'text-slate-500 border-slate-800 bg-black/40' : 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
            }`}
            title={isMuted ? "Unmute Audio Synthesis" : "Mute Audio Synthesis"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => {
              soundManager.playStrandPluck(350);
              onResetView();
            }}
            className="p-1.5 text-slate-400 hover:text-red-400 bg-black/40 hover:bg-slate-900 border border-slate-800 rounded transition-colors cursor-pointer"
            title="Re-Center Camera on Central Nexus"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
