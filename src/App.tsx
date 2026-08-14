/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { LandingIntro } from './components/LandingIntro';
import { SpiderWebCanvas } from './components/WebGraph/SpiderWebCanvas';
import { MinimalNav } from './components/Navigation/MinimalNav';
import { SystemHUD } from './components/HUD/SystemHUD';
import { SpiderSenseSearchBar } from './components/SpiderSense/SpiderSenseSearchBar';
import { SpiderSenseModal } from './components/SpiderSense/SpiderSenseModal';
import { SkillsModal } from './components/SkillNetwork/SkillsModal';
import { ProjectCaseFile } from './components/ProjectCaseFile/ProjectCaseFile';
import { IdentityCaseFile } from './components/IdentityNode/IdentityCaseFile';
import { MissionCaseFile } from './components/MissionArchive/MissionCaseFile';
import { SkillInspector } from './components/SkillNetwork/SkillInspector';
import { MobileRadialControls } from './components/Mobile/MobileRadialControls';
import { TerminationFooter } from './components/Footer/TerminationFooter';

import { buildPortfolioGraph, PROJECTS_DATA, HACKATHONS_DATA, SKILLS_DATA, PROFILE_DATA } from './data/portfolioData';
import { GraphNode, ProjectDetail, HackathonMission } from './types/portfolio';
import { soundManager } from './utils/soundEffects';

export default function App() {
  // App State
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [activeNavView, setActiveNavView] = useState<'web' | 'projects' | 'missions' | 'skills' | 'identity'>('web');
  
  // Modals & Dossiers
  const [isSpiderSenseOpen, setIsSpiderSenseOpen] = useState<boolean>(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [isIdentityOpen, setIsIdentityOpen] = useState<boolean>(false);
  const [activeMission, setActiveMission] = useState<HackathonMission | null>(null);
  const [isMissionArchiveOpen, setIsMissionArchiveOpen] = useState<boolean>(false);
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);
  const [isTerminationOpen, setIsTerminationOpen] = useState<boolean>(false);

  // Filters & Web Focus
  const [activeDomain, setActiveDomain] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);
  const [resetViewTrigger, setResetViewTrigger] = useState<number>(0);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  // Build the network graph
  const { nodes, edges } = useMemo(() => buildPortfolioGraph(), []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundManager.playSpiderSense();
        setIsSpiderSenseOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsSpiderSenseOpen(false);
        setIsSkillsModalOpen(false);
        setActiveProject(null);
        setIsIdentityOpen(false);
        setIsMissionArchiveOpen(false);
        setActiveMission(null);
        setActiveSkillId(null);
        setIsTerminationOpen(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle clicking a node in the graph
  const handleNodeClick = useCallback((node: GraphNode) => {
    soundManager.playNodeClick();

    if (node.type === 'central' || node.targetId === 'profile-dossier' || node.id === 'branch-about') {
      setIsIdentityOpen(true);
    } else if (node.type === 'project' && node.targetId) {
      const proj = PROJECTS_DATA.find(p => p.id === node.targetId);
      if (proj) setActiveProject(proj);
    } else if (node.type === 'mission' && node.targetId) {
      const mission = HACKATHONS_DATA.find(m => m.id === node.targetId);
      if (mission) {
        setActiveMission(mission);
        setIsMissionArchiveOpen(true);
      }
    } else if (node.id === 'branch-hackathons') {
      setActiveMission(null);
      setIsMissionArchiveOpen(true);
    } else if (node.type === 'skill') {
      setActiveSkillId(node.targetId || node.label);
      setFocusedNodeId(node.id);
    } else if (node.id === 'branch-github') {
      window.open(PROFILE_DATA.socialLinks[0].url, '_blank');
    } else if (node.id === 'branch-linkedin') {
      window.open(PROFILE_DATA.socialLinks[1].url, '_blank');
    } else if (node.id === 'branch-projects') {
      // Focus flagship ARTHA
      const artha = PROJECTS_DATA.find(p => p.id === 'artha');
      if (artha) setActiveProject(artha);
    } else if (node.type === 'category') {
      // Focus on category
      setFocusedNodeId(node.id);
      setActiveDomain(node.category);
    }
  }, []);

  // Handle top navigation selections
  const handleNavSelect = useCallback((view: typeof activeNavView) => {
    setActiveNavView(view);
    if (view === 'web') {
      setFocusedNodeId('node-parthu');
      setResetViewTrigger(prev => prev + 1);
    } else if (view === 'projects') {
      const artha = PROJECTS_DATA.find(p => p.id === 'artha');
      if (artha) setActiveProject(artha);
    } else if (view === 'missions') {
      setActiveMission(null);
      setIsMissionArchiveOpen(true);
    } else if (view === 'skills') {
      setIsSkillsModalOpen(true);
    } else if (view === 'identity') {
      setIsIdentityOpen(true);
    }
  }, []);

  // Handle jumping to node from Spider-Sense or Search Bar
  const handleSelectSearchResult = useCallback((targetId: string) => {
    const proj = PROJECTS_DATA.find(p => p.id === targetId);
    if (proj) {
      setActiveProject(proj);
      setFocusedNodeId(`node-proj-${proj.id}`);
      return;
    }
    const mission = HACKATHONS_DATA.find(m => m.id === targetId);
    if (mission) {
      setActiveMission(mission);
      setIsMissionArchiveOpen(true);
      setFocusedNodeId(`node-mission-${mission.id}`);
      return;
    }
    const skill = SKILLS_DATA.find(s => s.id === targetId || s.name.toLowerCase() === targetId.toLowerCase());
    if (skill) {
      setActiveSkillId(skill.id);
      setFocusedNodeId(`node-skill-${skill.id}`);
      return;
    }
    if (targetId === 'profile-dossier') {
      setIsIdentityOpen(true);
    }
  }, []);

  // Restart Experience
  const handleRestart = () => {
    setIsTerminationOpen(false);
    setIsSkillsModalOpen(false);
    setActiveProject(null);
    setIsIdentityOpen(false);
    setIsMissionArchiveOpen(false);
    setActiveSkillId(null);
    setSearchQuery('');
    setHasEntered(false);
  };

  return (
    <div className="relative w-screen h-screen bg-[#030305] text-slate-100 overflow-hidden font-sans select-none">
      {/* Cinematic Landing Experience */}
      {!hasEntered && (
        <LandingIntro onComplete={() => setHasEntered(true)} />
      )}

      {/* Main Interactive Web Interface */}
      {hasEntered && (
        <>
          {/* Top Bar Minimal Navigation */}
          <MinimalNav
            activeView={activeNavView}
            onSelectView={handleNavSelect}
            onOpenSpiderSense={() => setIsSpiderSenseOpen(true)}
          />

          {/* Spider-Sense Search Bar & Highlight Summary */}
          <SpiderSenseSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectTarget={handleSelectSearchResult}
          />

          {/* Persistent System HUD */}
          <SystemHUD
            totalNodes={nodes.length}
            totalProjects={PROJECTS_DATA.length}
            totalMissions={HACKATHONS_DATA.length}
            totalSkills={SKILLS_DATA.length}
            onOpenSpiderSense={() => setIsSpiderSenseOpen(true)}
            onResetView={() => {
              setFocusedNodeId('node-parthu');
              setResetViewTrigger(prev => prev + 1);
            }}
            activeDomain={activeDomain}
            onSelectDomain={setActiveDomain}
          />

          {/* Interactive Physics Web Graph Canvas */}
          <main className="w-full h-full pt-14">
            <SpiderWebCanvas
              nodes={nodes}
              edges={edges}
              onNodeClick={handleNodeClick}
              onNodeHover={setHoveredNode}
              activeDomain={activeDomain}
              activeFilterSkillId={activeSkillId}
              activeSearchQuery={searchQuery}
              focusedNodeId={focusedNodeId}
              resetViewTrigger={resetViewTrigger}
            />
          </main>

          {/* Hovered Node Quick Tooltip Indicator */}
          {hoveredNode && (
            <div className="fixed top-20 right-6 z-20 hidden lg:flex flex-col gap-1 p-3 bg-black/85 backdrop-blur-md border border-red-500/40 rounded text-xs font-tech text-slate-300 max-w-xs shadow-[0_4px_25px_rgba(0,0,0,0.7)] pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredNode.color }} />
                <span className="font-bold text-white font-display text-sm">{hoveredNode.label}</span>
              </div>
              {hoveredNode.subtitle && (
                <div className="text-[11px] text-red-400/90 font-mono">{hoveredNode.subtitle}</div>
              )}
              <div className="text-[10px] text-slate-500 uppercase mt-0.5">CLICK TO EXPAND DOSSIER</div>
            </div>
          )}

          {/* Bottom Termination Trigger CTA */}
          <div className="fixed bottom-6 left-6 z-20 hidden md:block">
            <button
              onClick={() => {
                soundManager.playPulseShockwave();
                setIsTerminationOpen(true);
              }}
              className="px-3 py-1.5 bg-black/60 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-500/40 rounded text-[11px] font-tech uppercase tracking-wider transition-colors cursor-pointer"
            >
              [ TERMINATE / SUMMARY ]
            </button>
          </div>

          {/* Mobile Radial Controls */}
          <MobileRadialControls
            onSelectBranch={(branchId) => {
              const node = nodes.find(n => n.id === branchId);
              if (node) handleNodeClick(node);
            }}
            onOpenSpiderSense={() => setIsSpiderSenseOpen(true)}
            onCenterNexus={() => {
              setFocusedNodeId('node-parthu');
              setResetViewTrigger(prev => prev + 1);
            }}
          />

          {/* Skills Section Explorer Modal */}
          <SkillsModal
            isOpen={isSkillsModalOpen}
            onClose={() => setIsSkillsModalOpen(false)}
            activeSkillId={activeSkillId}
            onSelectSkill={(skillId) => {
              setActiveSkillId(skillId);
              setFocusedNodeId(`node-skill-${skillId}`);
            }}
            onOpenProject={(projId) => {
              const proj = PROJECTS_DATA.find(p => p.id === projId);
              if (proj) setActiveProject(proj);
            }}
          />

          {/* Skill Inspector Bottom Sheet / Bar */}
          <SkillInspector
            activeSkillId={activeSkillId}
            onSelectSkill={setActiveSkillId}
            onOpenProject={(projId) => {
              const proj = PROJECTS_DATA.find(p => p.id === projId);
              if (proj) setActiveProject(proj);
            }}
          />

          {/* Spider-Sense Natural Query & Search Scanner Modal */}
          <SpiderSenseModal
            isOpen={isSpiderSenseOpen}
            onClose={() => setIsSpiderSenseOpen(false)}
            onSelectResult={handleSelectSearchResult}
            onQueryChange={setSearchQuery}
          />

          {/* Project Case File Modal (ARTHA, FRIDAY, Cryptography, CTF, etc.) */}
          <ProjectCaseFile
            project={activeProject}
            onClose={() => setActiveProject(null)}
            onSelectSkill={(skillName) => {
              setActiveSkillId(skillName);
              setFocusedNodeId(null);
            }}
          />

          {/* Identity // Parthu Case File Modal */}
          <IdentityCaseFile
            isOpen={isIdentityOpen}
            onClose={() => setIsIdentityOpen(false)}
          />

          {/* Mission Archive (Hackathons) Modal */}
          <MissionCaseFile
            mission={activeMission}
            isOpen={isMissionArchiveOpen}
            onClose={() => {
              setIsMissionArchiveOpen(false);
              setActiveMission(null);
            }}
            onOpenProject={(projId) => {
              setIsMissionArchiveOpen(false);
              const proj = PROJECTS_DATA.find(p => p.id === projId);
              if (proj) setActiveProject(proj);
            }}
          />

          {/* Termination Footer Modal */}
          <TerminationFooter
            isOpen={isTerminationOpen}
            onClose={() => setIsTerminationOpen(false)}
            onRestartExperience={handleRestart}
          />
        </>
      )}
    </div>
  );
}
