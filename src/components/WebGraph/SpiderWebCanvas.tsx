import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3Force from 'd3-force';
import { GraphEdge, GraphNode } from '../../types/portfolio';
import { soundManager } from '../../utils/soundEffects';

interface SpiderWebCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onNodeClick: (node: GraphNode) => void;
  onNodeHover: (node: GraphNode | null) => void;
  activeDomain: string | null;
  activeFilterSkillId: string | null;
  activeSearchQuery: string;
  focusedNodeId: string | null;
  resetViewTrigger: number;
}

interface EdgeParticle {
  edgeIndex: number;
  progress: number;
  speed: number;
  color: string;
}

interface CursorTrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  alpha: number;
}

export const SpiderWebCanvas: React.FC<SpiderWebCanvasProps> = ({
  nodes,
  edges,
  onNodeClick,
  onNodeHover,
  activeDomain,
  activeFilterSkillId,
  activeSearchQuery,
  focusedNodeId,
  resetViewTrigger,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Viewport Transform (Pan & Zoom)
  const transformRef = useRef<{ x: number; y: number; k: number }>({ x: 0, y: 0, k: 1 });
  const isDraggingCanvasRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Mouse & Hover state
  const mousePosRef = useRef<{ x: number; y: number; screenX: number; screenY: number }>({ x: 0, y: 0, screenX: 0, screenY: 0 });
  const hoveredNodeRef = useRef<GraphNode | null>(null);
  const draggedNodeRef = useRef<GraphNode | null>(null);

  // D3 Force Simulation Reference
  const simulationRef = useRef<d3Force.Simulation<GraphNode, d3Force.SimulationLinkDatum<GraphNode>> | null>(null);
  const nodesRef = useRef<GraphNode[]>(nodes);
  const edgesRef = useRef<GraphEdge[]>(edges);

  // Edge traveling particles & ripple shockwaves
  const edgeParticlesRef = useRef<EdgeParticle[]>([]);
  const cursorTrailRef = useRef<CursorTrailParticle[]>([]);
  const radarSweepAngleRef = useRef<number>(0);
  const rippleWavesRef = useRef<{ x: number; y: number; radius: number; maxRadius: number; opacity: number; color: string }[]>([]);

  // Pulse animation phase for highlights
  const pulsePhaseRef = useRef<number>(0);

  // Initialize and update simulation
  useEffect(() => {
    nodesRef.current = nodes;

    // Filter valid edges to prevent d3-force "node not found" errors
    const nodeIds = new Set(nodes.map(n => n.id));
    const validEdges = edges.filter(e => {
      const srcId = typeof e.source === 'object' ? (e.source as GraphNode).id : e.source;
      const tgtId = typeof e.target === 'object' ? (e.target as GraphNode).id : e.target;
      return nodeIds.has(srcId) && nodeIds.has(tgtId);
    });

    edgesRef.current = validEdges;

    // Build edge particle stream
    edgeParticlesRef.current = validEdges.map((e, idx) => ({
      edgeIndex: idx,
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.007,
      color: e.color || '#ef4444'
    }));

    // Setup force simulation
    const links = validEdges.map(e => ({
      source: typeof e.source === 'object' ? (e.source as GraphNode).id : e.source,
      target: typeof e.target === 'object' ? (e.target as GraphNode).id : e.target,
      distance: e.distance || 150,
      strength: e.strength || 0.4
    }));

    const sim = d3Force.forceSimulation<GraphNode>(nodesRef.current)
      .force('link', d3Force.forceLink<GraphNode, d3Force.SimulationLinkDatum<GraphNode>>(links).id(d => d.id).distance(d => (d as unknown as { distance: number }).distance).strength(0.35))
      .force('charge', d3Force.forceManyBody().strength(-280).distanceMax(500))
      .force('collide', d3Force.forceCollide().radius(d => (d as GraphNode).radius + 15).iterations(2))
      .alphaDecay(0.02)
      .velocityDecay(0.35);

    // Keep central node fixed at origin
    const central = nodesRef.current.find(n => n.id === 'node-parthu');
    if (central) {
      central.fx = 0;
      central.fy = 0;
    }

    simulationRef.current = sim;

    return () => {
      sim.stop();
    };
  }, [nodes, edges]);

  // Center & Reset Viewport
  const centerViewport = useCallback(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    transformRef.current = {
      x: width / 2,
      y: height / 2,
      k: window.innerWidth < 768 ? 0.75 : 0.95
    };
  }, []);

  useEffect(() => {
    centerViewport();
  }, [centerViewport, resetViewTrigger]);

  // Camera tracking when a specific node is focused
  useEffect(() => {
    if (!focusedNodeId || !containerRef.current) return;
    const target = nodesRef.current.find(n => n.id === focusedNodeId || n.targetId === focusedNodeId);
    if (target && target.x !== undefined && target.y !== undefined) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      const targetK = target.type === 'project' ? 1.3 : 1.15;
      const targetX = width / 2 - target.x * targetK;
      const targetY = height / 2 - target.y * targetK;

      transformRef.current = {
        x: targetX,
        y: targetY,
        k: targetK
      };

      // Add ripple wave
      rippleWavesRef.current.push({
        x: target.x,
        y: target.y,
        radius: target.radius,
        maxRadius: 180,
        opacity: 0.9,
        color: target.color
      });
      soundManager.playSpiderSense();
    }
  }, [focusedNodeId]);

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      if (!containerRef.current) return;
      const width = (canvas.width = containerRef.current.clientWidth);
      const height = (canvas.height = containerRef.current.clientHeight);

      const { x: panX, y: panY, k: scale } = transformRef.current;
      pulsePhaseRef.current += 0.05;

      ctx.clearRect(0, 0, width, height);

      // Save global transform
      ctx.save();
      ctx.translate(panX, panY);
      ctx.scale(scale, scale);

      // Convert mouse coords to world space
      const worldMouseX = (mousePosRef.current.screenX - panX) / scale;
      const worldMouseY = (mousePosRef.current.screenY - panY) / scale;
      mousePosRef.current.x = worldMouseX;
      mousePosRef.current.y = worldMouseY;

      // 1. Draw Spider-Verse Concentric Web Background
      ctx.lineWidth = 1;
      const concentricRadii = [80, 160, 260, 380, 520, 680];
      concentricRadii.forEach((r, idx) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(239, 68, 68, ${0.04 + idx * 0.015})`;
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();

        // Polygon Weave
        ctx.beginPath();
        ctx.strokeStyle = `rgba(239, 68, 68, ${0.02 + idx * 0.01})`;
        for (let a = 0; a <= Math.PI * 2; a += Math.PI / 8) {
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      });

      // 2. Draw Radar Sweep
      radarSweepAngleRef.current += 0.012;
      const sweepRad = 620;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, sweepRad, radarSweepAngleRef.current, radarSweepAngleRef.current + 0.35);
      ctx.closePath();
      const sweepGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, sweepRad);
      sweepGrad.addColorStop(0, 'rgba(239, 68, 68, 0.15)');
      sweepGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = sweepGrad;
      ctx.fill();
      ctx.restore();

      // 3. Draw Ripple Waves (from clicks / interactions)
      for (let i = rippleWavesRef.current.length - 1; i >= 0; i--) {
        const wave = rippleWavesRef.current[i];
        wave.radius += 3.5;
        wave.opacity -= 0.02;
        if (wave.opacity <= 0 || wave.radius >= wave.maxRadius) {
          rippleWavesRef.current.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.strokeStyle = `rgba(239, 68, 68, ${wave.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Check Active Highlight Filters
      const activeFilterId = activeFilterSkillId;
      const searchQuery = activeSearchQuery.trim().toLowerCase();
      const searchTokens = searchQuery ? searchQuery.split(/\s+/).filter(t => t.length > 0) : [];

      // Query Helper
      const isNodeMatchedBySearch = (n: GraphNode): boolean => {
        if (!searchTokens.length) return false;
        const haystack = `${n.label} ${n.subtitle || ''} ${n.description || ''} ${n.category} ${n.targetId || ''}`.toLowerCase();
        
        // Exact or token match
        if (searchTokens.some(token => haystack.includes(token))) return true;
        
        // Category alias matching
        if (searchQuery.includes('ai') && (n.category === 'ai' || n.id === 'branch-ai')) return true;
        if (searchQuery.includes('web') && (n.category === 'web' || n.id === 'branch-web')) return true;
        if (searchQuery.includes('cyber') && (n.category === 'cyber' || n.id === 'branch-cyber')) return true;
        if (searchQuery.includes('iot') && (n.category === 'iot' || n.id === 'branch-iot')) return true;
        if (searchQuery.includes('mindkraft') && (n.label.includes('FRIDAY') || n.label.includes('MINDKRAFT') || n.id === 'branch-hackathons')) return true;
        if (searchQuery.includes('hackathon') && (n.category === 'hackathon' || n.id === 'branch-hackathons')) return true;

        return false;
      };

      const isNodeHighlighted = (n: GraphNode): boolean => {
        if (activeDomain) {
          if (n.category !== activeDomain && n.type !== 'central' && n.id !== 'branch-about' && n.id !== `branch-${activeDomain}`) {
            return false;
          }
        }
        if (searchQuery) {
          return isNodeMatchedBySearch(n);
        }
        if (activeFilterId) {
          // Check if it's the active skill node itself
          if (n.id === activeFilterId || n.targetId === activeFilterId || n.id === `node-skill-${activeFilterId}`) return true;
          
          // Check if connected via edges
          const isConnected = edgesRef.current.some(e => {
            const srcId = typeof e.source === 'object' ? (e.source as GraphNode).id : e.source;
            const tgtId = typeof e.target === 'object' ? (e.target as GraphNode).id : e.target;
            
            const matchSrc = srcId === activeFilterId || srcId === `node-skill-${activeFilterId}`;
            const matchTgt = tgtId === activeFilterId || tgtId === `node-skill-${activeFilterId}`;
            
            return (
              (matchSrc && (tgtId === n.id || tgtId === n.targetId)) ||
              (matchTgt && (srcId === n.id || srcId === n.targetId))
            );
          });
          return isConnected;
        }
        if (hoveredNodeRef.current) {
          if (n.id === hoveredNodeRef.current.id) return true;
          const hId = hoveredNodeRef.current.id;
          return edgesRef.current.some(e => {
            const srcId = typeof e.source === 'object' ? (e.source as GraphNode).id : e.source;
            const tgtId = typeof e.target === 'object' ? (e.target as GraphNode).id : e.target;
            return (srcId === hId && tgtId === n.id) || (tgtId === hId && srcId === n.id);
          });
        }
        return true;
      };

      // 4. Draw Web Strands (Edges)
      edgesRef.current.forEach((edge) => {
        const sourceNode = typeof edge.source === 'object' ? (edge.source as GraphNode) : nodesRef.current.find(n => n.id === edge.source);
        const targetNode = typeof edge.target === 'object' ? (edge.target as GraphNode) : nodesRef.current.find(n => n.id === edge.target);

        if (!sourceNode || !targetNode || sourceNode.x === undefined || sourceNode.y === undefined || targetNode.x === undefined || targetNode.y === undefined) return;

        const srcHighlighted = isNodeHighlighted(sourceNode);
        const tgtHighlighted = isNodeHighlighted(targetNode);
        const isEdgeActive = srcHighlighted && tgtHighlighted;

        let alpha = isEdgeActive ? 0.65 : 0.06;
        
        // When searching or filtering a skill, heavily illuminate connecting strands
        if ((searchQuery || activeFilterId) && isEdgeActive) {
          alpha = 0.85;
        }

        if (hoveredNodeRef.current) {
          const hId = hoveredNodeRef.current.id;
          const connectsToHover = sourceNode.id === hId || targetNode.id === hId;
          alpha = connectsToHover ? 0.9 : 0.05;
        }

        ctx.beginPath();
        if (edge.dashed) {
          ctx.setLineDash([4, 4]);
        } else {
          ctx.setLineDash([]);
        }

        // Draw elastic curved web strand
        const midX = (sourceNode.x + targetNode.x) / 2;
        const midY = (sourceNode.y + targetNode.y) / 2;
        const dx = targetNode.x - sourceNode.x;
        const dy = targetNode.y - sourceNode.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const perpX = -dy / (dist || 1) * 6;
        const perpY = dx / (dist || 1) * 6;

        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.quadraticCurveTo(midX + perpX, midY + perpY, targetNode.x, targetNode.y);

        ctx.strokeStyle = edge.color ? `${edge.color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}` : `rgba(239, 68, 68, ${alpha})`;
        ctx.lineWidth = (edge.width || 1.5) * (isEdgeActive ? 1.4 : 0.7);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 5. Draw Traveling Particles on Strands
      edgeParticlesRef.current.forEach(p => {
        const edge = edgesRef.current[p.edgeIndex];
        if (!edge) return;
        const sourceNode = typeof edge.source === 'object' ? (edge.source as GraphNode) : nodesRef.current.find(n => n.id === edge.source);
        const targetNode = typeof edge.target === 'object' ? (edge.target as GraphNode) : nodesRef.current.find(n => n.id === edge.target);
        if (!sourceNode || !targetNode || sourceNode.x === undefined || sourceNode.y === undefined || targetNode.x === undefined || targetNode.y === undefined) return;

        const isEdgeActive = isNodeHighlighted(sourceNode) && isNodeHighlighted(targetNode);
        
        p.progress = (p.progress + p.speed * (isEdgeActive ? 1.5 : 1)) % 1;
        const px = sourceNode.x + (targetNode.x - sourceNode.x) * p.progress;
        const py = sourceNode.y + (targetNode.y - sourceNode.y) * p.progress;

        ctx.beginPath();
        ctx.fillStyle = isEdgeActive ? p.color : 'rgba(100, 116, 139, 0.2)';
        ctx.arc(px, py, isEdgeActive ? 2.2 : 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // 6. Spider-Sense Cursor Particle Trail Effect
      for (let i = cursorTrailRef.current.length - 1; i >= 0; i--) {
        const p = cursorTrailRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.life--;
        p.alpha = Math.max(0, p.life / p.maxLife);

        if (p.life <= 0) {
          cursorTrailRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        const pGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        pGrad.addColorStop(0, `${p.color}`);
        pGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = pGrad;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.8})`;
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // 7. Spider-Sense Scanner Cursor Holographic targeting lines & reticle
      if (!isDraggingCanvasRef.current && !draggedNodeRef.current) {
        // Find 3 closest nodes to mouse
        const nodeDistances = nodesRef.current
          .filter(n => n.x !== undefined && n.y !== undefined)
          .map(n => {
            const dx = (n.x || 0) - worldMouseX;
            const dy = (n.y || 0) - worldMouseY;
            return { node: n, dist: Math.sqrt(dx * dx + dy * dy) };
          })
          .filter(item => item.dist < 240)
          .sort((a, b) => a.dist - b.dist);

        nodeDistances.slice(0, 3).forEach(item => {
          const { node, dist } = item;
          const proximityAlpha = Math.max(0, 1 - dist / 240) * 0.5;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(239, 68, 68, ${proximityAlpha})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 4]);
          ctx.moveTo(worldMouseX, worldMouseY);
          ctx.lineTo(node.x!, node.y!);
          ctx.stroke();
          ctx.setLineDash([]);
        });

        // Spider-Sense Reticle at cursor
        const reticlePulse = 14 + Math.sin(pulsePhaseRef.current * 2) * 2;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.arc(worldMouseX, worldMouseY, reticlePulse, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = '#ef4444';
        ctx.arc(worldMouseX, worldMouseY, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 8. Draw Nodes
      nodesRef.current.forEach((node) => {
        if (node.x === undefined || node.y === undefined) return;

        const isHighlighted = isNodeHighlighted(node);
        const isHovered = hoveredNodeRef.current?.id === node.id;
        const isCentral = node.type === 'central';
        const isFlagship = node.targetId === 'artha' || node.targetId === 'friday-ai';

        const r = node.radius * (isHovered ? 1.2 : 1.0) * (isFlagship ? 1.1 : 1.0);

        // Node Glow Ring
        if (isHighlighted || isHovered) {
          const pulseAdd = (searchQuery || activeFilterId) ? Math.sin(pulsePhaseRef.current * 3) * 4 : 0;
          ctx.beginPath();
          const glowGrad = ctx.createRadialGradient(node.x, node.y, r * 0.4, node.x, node.y, (r * 2.2) + pulseAdd);
          glowGrad.addColorStop(0, `${node.color}${Math.round(0.45 * 255).toString(16).padStart(2, '0')}`);
          glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glowGrad;
          ctx.arc(node.x, node.y, (r * 2.2) + pulseAdd, 0, Math.PI * 2);
          ctx.fill();
        }

        // Active Search / Skill Shockwave Electric Ring
        if ((searchQuery || activeFilterId) && isHighlighted) {
          ctx.beginPath();
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 1.8;
          const searchRingR = r + 8 + (Math.sin(pulsePhaseRef.current * 4) * 3);
          ctx.arc(node.x, node.y, searchRingR, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Spider-Verse Glitch/Polygon Outer Shield for Central & Flagship Nodes
        if (isCentral || isFlagship) {
          ctx.save();
          ctx.beginPath();
          ctx.strokeStyle = node.color;
          ctx.lineWidth = isCentral ? 2.5 : 1.8;
          ctx.arc(node.x, node.y, r + (isCentral ? 7 : 5), 0, Math.PI * 2);
          ctx.stroke();

          // Hexagonal / Tech corners
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255,255,255,0.7)';
          ctx.lineWidth = 1;
          for (let i = 0; i < 6; i++) {
            const ang = (i * Math.PI) / 3 + radarSweepAngleRef.current * 0.5;
            const px = node.x + Math.cos(ang) * (r + 11);
            const py = node.y + Math.sin(ang) * (r + 11);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }

        // Inner Circle Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted ? '#0d0e15' : '#050608';
        ctx.fill();

        ctx.strokeStyle = isHighlighted ? node.color : '#334155';
        ctx.lineWidth = isHovered ? 3 : isCentral ? 3.5 : 2;
        ctx.stroke();

        // Node Center Dot / Core light
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted ? node.color : '#475569';
        ctx.fill();

        // Node Label Typography
        ctx.save();
        ctx.font = isCentral ? '700 13px "Chakra Petch", sans-serif' : node.type === 'project' ? '600 11px "Chakra Petch", sans-serif' : '500 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        // Draw label with subtle tech background pill
        const labelY = node.y + r + 6;
        const textMetrics = ctx.measureText(node.label);
        const textWidth = textMetrics.width;

        if (isHighlighted || isHovered) {
          ctx.fillStyle = 'rgba(5, 7, 12, 0.88)';
          ctx.fillRect(node.x - textWidth / 2 - 4, labelY - 2, textWidth + 8, 16);
          ctx.strokeStyle = isHovered ? node.color : 'rgba(239, 68, 68, 0.3)';
          ctx.lineWidth = 1;
          ctx.strokeRect(node.x - textWidth / 2 - 4, labelY - 2, textWidth + 8, 16);
        }

        ctx.fillStyle = isHighlighted ? (isHovered ? '#ffffff' : '#cbd5e1') : '#475569';
        ctx.fillText(node.label, node.x, labelY);

        // Subtitle badge for key nodes
        if ((isFlagship || isCentral) && isHighlighted) {
          ctx.font = '500 8.5px "JetBrains Mono", monospace';
          ctx.fillStyle = node.color;
          ctx.fillText(isCentral ? 'CORE NEXUS' : node.targetId === 'friday-ai' ? '1ST PRIZE @ MINDKRAFT' : 'FLAGSHIP BUILD', node.x, labelY + 18);
        }

        ctx.restore();
      });

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeDomain, activeFilterSkillId, activeSearchQuery]);

  // Pointer Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const { x: panX, y: panY, k: scale } = transformRef.current;
    const worldX = (clientX - panX) / scale;
    const worldY = (clientY - panY) / scale;

    // Check if clicked on a node
    const clickedNode = nodesRef.current.find(n => {
      if (n.x === undefined || n.y === undefined) return false;
      const dx = n.x - worldX;
      const dy = n.y - worldY;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 10;
    });

    if (clickedNode) {
      draggedNodeRef.current = clickedNode;
      clickedNode.fx = clickedNode.x;
      clickedNode.fy = clickedNode.y;
      soundManager.playNodeClick();

      // Ripple effect
      rippleWavesRef.current.push({
        x: clickedNode.x!,
        y: clickedNode.y!,
        radius: clickedNode.radius,
        maxRadius: 140,
        opacity: 0.8,
        color: clickedNode.color
      });

      if (simulationRef.current) {
        simulationRef.current.alphaTarget(0.3).restart();
      }
    } else {
      isDraggingCanvasRef.current = true;
      dragStartRef.current = { x: clientX - panX, y: clientY - panY };
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    mousePosRef.current.screenX = clientX;
    mousePosRef.current.screenY = clientY;

    const { x: panX, y: panY, k: scale } = transformRef.current;
    const worldX = (clientX - panX) / scale;
    const worldY = (clientY - panY) / scale;

    // Emit subtle particle trail following cursor movement
    const trailColors = ['#ef4444', '#f43f5e', '#38bdf8', '#c084fc', '#ffffff', '#fbbf24'];
    for (let i = 0; i < 2; i++) {
      cursorTrailRef.current.push({
        x: worldX + (Math.random() - 0.5) * 6,
        y: worldY + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        life: 20 + Math.floor(Math.random() * 15),
        maxLife: 35,
        size: 1.5 + Math.random() * 2,
        color: trailColors[Math.floor(Math.random() * trailColors.length)],
        alpha: 1
      });
    }
    // Cap trail particles array size for high performance
    if (cursorTrailRef.current.length > 60) {
      cursorTrailRef.current.splice(0, cursorTrailRef.current.length - 60);
    }

    if (draggedNodeRef.current) {
      // Drag node physics
      if (draggedNodeRef.current.type !== 'central') {
        draggedNodeRef.current.fx = worldX;
        draggedNodeRef.current.fy = worldY;
      }
    } else if (isDraggingCanvasRef.current) {
      // Pan canvas
      transformRef.current.x = clientX - dragStartRef.current.x;
      transformRef.current.y = clientY - dragStartRef.current.y;
    } else {
      // Check node hover
      const hovered = nodesRef.current.find(n => {
        if (n.x === undefined || n.y === undefined) return false;
        const dx = n.x - worldX;
        const dy = n.y - worldY;
        return Math.sqrt(dx * dx + dy * dy) <= n.radius + 8;
      });

      if (hovered !== hoveredNodeRef.current) {
        if (hovered && !hoveredNodeRef.current) {
          soundManager.playStrandPluck(380);
        }
        hoveredNodeRef.current = hovered || null;
        onNodeHover(hovered || null);
      }
    }
  };

  const handlePointerUp = () => {
    if (draggedNodeRef.current) {
      if (draggedNodeRef.current.type !== 'central') {
        draggedNodeRef.current.fx = null;
        draggedNodeRef.current.fy = null;
      }
      draggedNodeRef.current = null;
      if (simulationRef.current) {
        simulationRef.current.alphaTarget(0);
      }
    }
    isDraggingCanvasRef.current = false;
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const { x: panX, y: panY, k: scale } = transformRef.current;
    const worldX = (clientX - panX) / scale;
    const worldY = (clientY - panY) / scale;

    const clickedNode = nodesRef.current.find(n => {
      if (n.x === undefined || n.y === undefined) return false;
      const dx = n.x - worldX;
      const dy = n.y - worldY;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 12;
    });

    if (clickedNode) {
      onNodeClick(clickedNode);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
    const newK = Math.max(0.35, Math.min(2.8, transformRef.current.k * zoomFactor));

    // Zoom centered on cursor
    const mouseWorldX = (clientX - transformRef.current.x) / transformRef.current.k;
    const mouseWorldY = (clientY - transformRef.current.y) / transformRef.current.k;

    transformRef.current = {
      k: newK,
      x: clientX - mouseWorldX * newK,
      y: clientY - mouseWorldY * newK
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-[#030305] overflow-hidden select-none cursor-crosshair touch-none"
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={handleClick}
        onWheel={handleWheel}
        className="w-full h-full block"
      />

      {/* Floating Canvas Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-black/70 backdrop-blur border border-red-500/20 px-3 py-1.5 rounded text-xs font-tech text-slate-300">
        <button
          onClick={() => {
            transformRef.current.k = Math.min(2.5, transformRef.current.k * 1.25);
            soundManager.playStrandPluck(420);
          }}
          className="px-2 py-1 hover:text-red-400 hover:bg-red-950/40 rounded transition-colors"
          title="Zoom In"
        >
          +
        </button>
        <span className="text-slate-600">|</span>
        <button
          onClick={() => {
            transformRef.current.k = Math.max(0.4, transformRef.current.k * 0.8);
            soundManager.playStrandPluck(300);
          }}
          className="px-2 py-1 hover:text-red-400 hover:bg-red-950/40 rounded transition-colors"
          title="Zoom Out"
        >
          -
        </button>
        <span className="text-slate-600">|</span>
        <button
          onClick={() => {
            centerViewport();
            soundManager.playSpiderSense();
          }}
          className="px-2.5 py-1 text-[11px] text-red-400 hover:text-white hover:bg-red-600/30 rounded transition-colors"
        >
          RE-CENTER [PARTHU]
        </button>
      </div>

      {/* Interactive Helper Overlay hint */}
      <div className="absolute top-20 left-6 z-20 pointer-events-none hidden md:flex items-center gap-3 text-[11px] font-tech text-slate-500 bg-black/40 px-3 py-1.5 rounded border border-slate-800/60">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span>HOVER TO EMIT SPIDER-SENSE TRAIL • DRAG TO DISTORT WEB • CLICK TO EXPAND DOSSIER</span>
      </div>
    </div>
  );
};
