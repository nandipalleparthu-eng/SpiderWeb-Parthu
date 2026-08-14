import React from 'react';
import { Brain, Globe, ShieldAlert, Cpu, Trophy, User, FolderGit2, Search, Compass } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

interface MobileRadialControlsProps {
  onSelectBranch: (branchId: string) => void;
  onOpenSpiderSense: () => void;
  onCenterNexus: () => void;
}

export const MobileRadialControls: React.FC<MobileRadialControlsProps> = ({
  onSelectBranch,
  onOpenSpiderSense,
  onCenterNexus
}) => {
  const branches = [
    { id: 'branch-ai', label: 'AI/ML', icon: Brain, color: 'text-purple-400 border-purple-500/40 bg-purple-950/40' },
    { id: 'branch-web', label: 'WEB', icon: Globe, color: 'text-blue-400 border-blue-500/40 bg-blue-950/40' },
    { id: 'branch-cyber', label: 'CYBER', icon: ShieldAlert, color: 'text-red-400 border-red-500/40 bg-red-950/40' },
    { id: 'branch-iot', label: 'IoT', icon: Cpu, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40' },
    { id: 'node-proj-artha', label: 'ARTHA', icon: FolderGit2, color: 'text-red-400 border-red-500 bg-red-950/60' },
    { id: 'branch-hackathons', label: 'HACKS', icon: Trophy, color: 'text-pink-400 border-pink-500/40 bg-pink-950/40' },
    { id: 'branch-about', label: 'ABOUT', icon: User, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-[#05060c]/90 backdrop-blur-lg border-t border-slate-800 p-2.5 flex flex-col gap-2">
      {/* Mobile Radial / Horizontal Quick Bar */}
      <div className="flex items-center justify-between overflow-x-auto gap-2 pb-1 no-scrollbar">
        <button
          onClick={() => {
            soundManager.playSpiderSense();
            onCenterNexus();
          }}
          className="px-2.5 py-1.5 bg-red-600 text-white rounded text-[10px] font-tech font-bold uppercase flex items-center gap-1 shrink-0 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
        >
          <Compass className="w-3 h-3" />
          <span>PARTHU</span>
        </button>

        {branches.map((b) => {
          const Icon = b.icon;
          return (
            <button
              key={b.id}
              onClick={() => {
                soundManager.playNodeClick();
                onSelectBranch(b.id);
              }}
              className={`px-2.5 py-1 rounded text-[10px] font-tech font-semibold uppercase flex items-center gap-1.5 shrink-0 border transition-all ${b.color}`}
            >
              <Icon className="w-3 h-3" />
              <span>{b.label}</span>
            </button>
          );
        })}

        <button
          onClick={() => {
            soundManager.playSpiderSense();
            onOpenSpiderSense();
          }}
          className="p-1.5 bg-slate-900 text-red-400 rounded border border-slate-700 shrink-0"
        >
          <Search className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
