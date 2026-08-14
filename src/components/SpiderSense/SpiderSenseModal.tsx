import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, Zap, Cpu, Brain, ShieldAlert, Globe, Trophy, ArrowRight } from 'lucide-react';
import { PROJECTS_DATA, HACKATHONS_DATA, SKILLS_DATA, PROFILE_DATA } from '../../data/portfolioData';
import { GraphNode } from '../../types/portfolio';
import { soundManager } from '../../utils/soundEffects';

interface SpiderSenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (nodeId: string) => void;
  onQueryChange: (query: string) => void;
}

interface SearchResultItem {
  id: string;
  nodeTargetId: string;
  title: string;
  category: string;
  type: 'project' | 'skill' | 'mission' | 'identity';
  snippet: string;
  matchScore: number;
  tags: string[];
}

export const SpiderSenseModal: React.FC<SpiderSenseModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
  onQueryChange,
}) => {
  const [query, setQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
      onQueryChange('');
    }
  }, [isOpen, onQueryChange]);

  // Handle live search
  const handleInputChange = (val: string) => {
    setQuery(val);
    onQueryChange(val);
    setIsScanning(true);
    soundManager.playStrandPluck(400);
    setTimeout(() => setIsScanning(false), 200);
  };

  const quickPrompts = [
    { label: "FRIDAY (1st Prize)", query: "Show FRIDAY AI Assistant" },
    { label: "ARTHA Flagship", query: "Show me ARTHA" },
    { label: "SmartKisan (AI Farmers)", query: "SmartKisan crop advisory" },
    { label: "MINDKRAFT 2026", query: "MINDKRAFT 2026 hackathon prizes" },
    { label: "IoT Smart Grids", query: "IoT Smart Garage, Classroom, Health & Weather" },
    { label: "Custom-CTF & Crypto", query: "Custom CTF and Cryptography toolkit" },
    { label: "Vision & Gestures", query: "Touchless cursor and PoseAssist vision" },
  ];

  // Semantic query matching engine
  const results = useMemo(() => {
    const raw = query.toLowerCase().trim();
    if (!raw) {
      // Default recommended flagship items
      return [
        {
          id: 'res-friday',
          nodeTargetId: 'friday-ai',
          title: 'FRIDAY AI Assistant (1st Prize Winner @ MINDKRAFT 2026)',
          category: 'FLAGSHIP MULTIMODAL AI & TOUCHLESS HCI',
          type: 'project' as const,
          snippet: 'Iron Man inspired AI assistant with voice recognition, facial identification, touchless hand-gesture cursor control, and laptop navigation.',
          matchScore: 10,
          tags: ['Python', 'MediaPipe', 'OpenCV', 'Gesture OS Control', 'MINDKRAFT 1st Prize']
        },
        {
          id: 'res-artha',
          nodeTargetId: 'artha',
          title: 'ARTHA (Agricultural Resource Trading & Harvest Analytics)',
          category: 'FLAGSHIP AI SUPPLY CHAIN',
          type: 'project' as const,
          snippet: 'Flagship multi-sector agricultural intelligence ecosystem with local AI inference, price telemetry, and 4 sector views.',
          matchScore: 10,
          tags: ['React', 'Python', 'Local AI', 'Supply Chain', 'T4G Finalist']
        },
        {
          id: 'res-smartkisan',
          nodeTargetId: 'smart-kissan',
          title: 'SmartKisan (AI for Agriculture)',
          category: 'AGRI-TECH & AI',
          type: 'project' as const,
          snippet: 'AI crop recommendations, market-price insights, profit analysis, yield comparison, risk analysis, and multilingual support.',
          matchScore: 9,
          tags: ['AI Models', 'Crop Advisory', 'Market Insights', 'Multilingual']
        },
        {
          id: 'res-iot',
          nodeTargetId: 'iot-smart-grid',
          title: 'IoT Smart Grid: Smart Garage & Classroom',
          category: 'IoT & EMBEDDED SYSTEMS',
          type: 'project' as const,
          snippet: 'Automated embedded systems using ESP32, ESP8266, Arduino, MQTT, CoAP, Blynk and ThingSpeak.',
          matchScore: 8,
          tags: ['ESP32', 'Arduino', 'MQTT', 'Blynk', 'ThingSpeak']
        },
        {
          id: 'res-profile',
          nodeTargetId: 'profile-dossier',
          title: 'Nandipalle Parthu — Core Identity Dossier',
          category: 'DEVELOPER PROFILE',
          type: 'identity' as const,
          snippet: 'B.Tech CSE (AI & ML) @ Karunya (2025–2029). Builder across Multimodal AI, Web, Cybersecurity, IoT & Systems.',
          matchScore: 7,
          tags: ['Student Builder', 'AI/ML', 'MINDKRAFT 1st Prize', '1K+ Network']
        }
      ];
    }

    // Tokenized search
    const tokens = raw.split(/\s+/).filter(t => t.length > 1 && !['what', 'has', 'built', 'show', 'me', 'the', 'is', 'and', 'with', 'using', 'work', 'available'].includes(t));

    const scored: SearchResultItem[] = [];

    // 1. Search Projects
    PROJECTS_DATA.forEach(proj => {
      let score = 0;
      const haystack = `${proj.title} ${proj.tagline} ${proj.problem} ${proj.solution} ${proj.category} ${proj.skillsUsed.join(' ')} ${proj.techStack.map(t => t.name).join(' ')}`.toLowerCase();

      tokens.forEach(token => {
        if (haystack.includes(token)) score += 3;
      });

      if (raw.includes('artha') && proj.id === 'artha') score += 10;
      if (raw.includes('ai') && proj.domain === 'ai') score += 4;
      if (raw.includes('cyber') && proj.domain === 'cyber') score += 4;
      if (raw.includes('iot') && proj.domain === 'iot') score += 4;
      if (raw.includes('web') && proj.domain === 'web') score += 4;
      if (raw.includes('python') && proj.skillsUsed.includes('Python')) score += 5;

      if (score > 0 || haystack.includes(raw)) {
        scored.push({
          id: `proj-${proj.id}`,
          nodeTargetId: proj.id,
          title: proj.title,
          category: proj.category,
          type: 'project',
          snippet: proj.tagline,
          matchScore: score,
          tags: proj.skillsUsed
        });
      }
    });

    // 2. Search Skills
    SKILLS_DATA.forEach(skill => {
      let score = 0;
      const haystack = `${skill.name} ${skill.category} ${skill.summary} ${skill.coreConcepts.join(' ')}`.toLowerCase();

      tokens.forEach(token => {
        if (haystack.includes(token)) score += 3;
      });

      if (raw.includes(skill.name.toLowerCase())) score += 6;

      if (score > 0 || haystack.includes(raw)) {
        scored.push({
          id: `skill-${skill.id}`,
          nodeTargetId: skill.id,
          title: skill.name,
          category: `SKILL // ${skill.category}`,
          type: 'skill',
          snippet: skill.summary,
          matchScore: score,
          tags: skill.coreConcepts.slice(0, 4)
        });
      }
    });

    // 3. Search Missions
    HACKATHONS_DATA.forEach(mission => {
      let score = 0;
      const haystack = `${mission.name} ${mission.event} ${mission.problem} ${mission.project} ${mission.outcome}`.toLowerCase();

      tokens.forEach(token => {
        if (haystack.includes(token)) score += 3;
      });

      if (raw.includes('hackathon') || raw.includes('mission') || raw.includes('t4g')) score += 4;

      if (score > 0 || haystack.includes(raw)) {
        scored.push({
          id: `mission-${mission.id}`,
          nodeTargetId: mission.id,
          title: mission.name,
          category: `MISSION // ${mission.status}`,
          type: 'mission',
          snippet: mission.outcome,
          matchScore: score,
          tags: mission.technologies
        });
      }
    });

    return scored.sort((a, b) => b.matchScore - a.matchScore);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#08090f] border border-red-500/40 rounded-lg shadow-[0_0_50px_rgba(239,68,68,0.25)] overflow-hidden flex flex-col max-h-[80vh]">
        {/* Top Scanner HUD header */}
        <div className="flex items-center justify-between px-4 py-3 bg-red-950/20 border-b border-red-900/40 text-xs font-tech text-red-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-bold tracking-widest uppercase">SPIDER-SENSE SCANNER v2.4</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span>PRESS ESC TO CLOSE</span>
            <button
              onClick={onClose}
              className="p-1 hover:text-white text-slate-400 rounded hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Input Box */}
        <div className="p-4 border-b border-slate-800/80 bg-black/40">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-5 h-5 text-red-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Type a query (e.g. 'Show me ARTHA', 'Python projects', 'Cybersecurity')..."
              className="w-full bg-[#030306] border border-slate-700/80 focus:border-red-500 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 rounded font-tech tracking-wide focus:outline-none focus:ring-1 focus:ring-red-500 shadow-inner"
            />
          </div>

          {/* Quick Filter Chips */}
          <div className="mt-3 flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] font-tech text-slate-500 mr-1 uppercase">PRESETS:</span>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleInputChange(p.query)}
                className="text-[11px] font-tech px-2.5 py-1 bg-slate-900 hover:bg-red-950/50 text-slate-300 hover:text-red-400 border border-slate-800 hover:border-red-500/40 rounded transition-colors cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scan Status Readout */}
        <div className="px-4 py-2 bg-[#05060b] border-b border-slate-900 flex items-center justify-between text-[11px] font-tech text-slate-400">
          <div className="flex items-center gap-2">
            <Zap className={`w-3.5 h-3.5 ${isScanning ? 'text-amber-400 animate-spin' : 'text-red-500'}`} />
            <span>{isScanning ? 'SCANNING WEB GRAPH...' : `RADAR DETECTED: ${results.length} CONNECTED NODES`}</span>
          </div>
          {query && (
            <span className="text-red-400/80 font-mono">QUERY: &ldquo;{query}&rdquo;</span>
          )}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 font-tech text-xs">
              NO DIRECT NODES FOUND FOR THIS VECTOR. TRY &ldquo;ARTHA&rdquo;, &ldquo;PYTHON&rdquo; OR &ldquo;CYBER&rdquo;.
            </div>
          ) : (
            results.map((res) => (
              <div
                key={res.id}
                onClick={() => {
                  soundManager.playNodeClick();
                  onSelectResult(res.nodeTargetId);
                  onClose();
                }}
                className="group p-3.5 rounded border border-slate-800/80 hover:border-red-500/60 bg-[#06070d] hover:bg-[#0c0d18] transition-all duration-150 cursor-pointer flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-red-950/60 text-red-400 border border-red-500/30 uppercase tracking-wider">
                      {res.category}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors font-display">
                      {res.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {res.snippet}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {res.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-tech px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="shrink-0 mt-2 px-3 py-1.5 bg-red-600/20 group-hover:bg-red-600 text-red-400 group-hover:text-white border border-red-500/40 rounded text-xs font-tech flex items-center gap-1.5 transition-colors">
                  <span>ENGAGE</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
