import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../utils/soundEffects';

interface LandingIntroProps {
  onComplete: () => void;
}

export const LandingIntro: React.FC<LandingIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(0);
  // Phase 0: Void / Pitch-black Screen
  // Phase 1: SYSTEM INITIALIZING... & WEB NETWORK: OFFLINE
  // Phase 2: Gradual Formation of the Web Network (Strands & Nodes Weaving)
  // Phase 3: Reveal Central Node "PARTHU // ONLINE" with Pulsing Shockwave
  // Phase 4: Ready with "Explore the web." prompt and Enter Action

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Stage 1: Initializing & Offline readout (after 500ms)
    const t1 = setTimeout(() => {
      setPhase(1);
      soundManager.playStrandPluck(200);
    }, 500);

    // Stage 2: Web Network gradual formation & weaving (after 1800ms)
    const t2 = setTimeout(() => {
      setPhase(2);
      soundManager.playStrandPluck(340);
    }, 1800);

    // Stage 3: Reveal PARTHU // ONLINE & Pulsing Central Nexus (after 3600ms)
    const t3 = setTimeout(() => {
      setPhase(3);
      soundManager.playPulseShockwave();
    }, 3600);

    // Stage 4: "Explore the web." Prompt & Interactive Enter CTA (after 4800ms)
    const t4 = setTimeout(() => {
      setPhase(4);
      soundManager.playSpiderSense();
    }, 4800);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        soundManager.playNodeClick();
        soundManager.playPulseShockwave();
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  // Procedural Web Formation Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const radialStrands = Array.from({ length: 18 }).map((_, i) => ({
      angle: (i / 18) * Math.PI * 2,
      currentLength: 0,
      targetLength: Math.min(width, height) * 0.46,
      speed: 4.5 + (i % 3) * 1.5,
      nodeSpawned: false
    }));

    // Pulsing shockwaves for Phase 3
    const shockwaves: { radius: number; maxRadius: number; opacity: number }[] = [];

    let webGrowthProgress = 0;
    let ringRotateAngle = 0;

    const render = () => {
      // Dark screen trail fade
      ctx.fillStyle = 'rgba(3, 3, 5, 0.28)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Phase 2 & onwards: Weave Web Network
      if (phase >= 2) {
        webGrowthProgress = Math.min(webGrowthProgress + 0.012, 1);
        ringRotateAngle += 0.003;

        // Draw Concentric Web Rings (Forming outward)
        const ringRadii = [70, 140, 220, 310, 410, 520];
        ringRadii.forEach((r, idx) => {
          const ringProgress = Math.max(0, Math.min(1, (webGrowthProgress - idx * 0.12) / 0.4));
          if (ringProgress <= 0) return;

          const currentRad = r * ringProgress;

          // Circular Strand
          ctx.beginPath();
          ctx.strokeStyle = `rgba(239, 68, 68, ${0.18 * ringProgress})`;
          ctx.lineWidth = 1;
          ctx.arc(cx, cy, currentRad, 0, Math.PI * 2);
          ctx.stroke();

          // Spider-Verse Polygon Segment Cross-Wires
          if (ringProgress > 0.5) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(239, 68, 68, ${0.12 * (ringProgress - 0.4)})`;
            const segments = 18;
            for (let s = 0; s <= segments; s++) {
              const ang = (s / segments) * Math.PI * 2 + (idx % 2 === 0 ? ringRotateAngle : -ringRotateAngle);
              const px = cx + Math.cos(ang) * currentRad;
              const py = cy + Math.sin(ang) * currentRad;
              if (s === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
          }
        });

        // Radial Filaments shooting outwards
        radialStrands.forEach((strand, sIdx) => {
          strand.currentLength = Math.min(strand.currentLength + strand.speed, strand.targetLength * webGrowthProgress);
          const ex = cx + Math.cos(strand.angle) * strand.currentLength;
          const ey = cy + Math.sin(strand.angle) * strand.currentLength;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(239, 68, 68, ${0.4 * webGrowthProgress})`;
          ctx.lineWidth = sIdx % 3 === 0 ? 1.8 : 1.1;
          ctx.moveTo(cx, cy);
          ctx.lineTo(ex, ey);
          ctx.stroke();

          // Node synthesis sparks at filament ends
          if (strand.currentLength > 20) {
            ctx.beginPath();
            ctx.fillStyle = sIdx % 4 === 0 ? '#c084fc' : sIdx % 4 === 1 ? '#60a5fa' : sIdx % 4 === 2 ? '#34d399' : '#ef4444';
            ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // Phase 3 & 4: Pulsing Central Shockwaves
      if (phase >= 3) {
        if (Math.random() < 0.05) {
          shockwaves.push({ radius: 10, maxRadius: 180, opacity: 0.85 });
        }

        for (let i = shockwaves.length - 1; i >= 0; i--) {
          const sw = shockwaves[i];
          sw.radius += 2.2;
          sw.opacity -= 0.015;
          if (sw.opacity <= 0 || sw.radius >= sw.maxRadius) {
            shockwaves.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.strokeStyle = `rgba(239, 68, 68, ${sw.opacity})`;
          ctx.lineWidth = 1.6;
          ctx.arc(cx, cy, sw.radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Central Core Glow Point
      if (phase >= 1) {
        const pulseR = phase >= 3 ? 36 + Math.sin(Date.now() * 0.005) * 4 : 12;
        ctx.beginPath();
        const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, pulseR);
        glowGrad.addColorStop(0, '#ffffff');
        glowGrad.addColorStop(0.35, '#ef4444');
        glowGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = glowGrad;
        ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [phase]);

  const handleEnter = () => {
    soundManager.playNodeClick();
    soundManager.playPulseShockwave();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#030305] flex flex-col items-center justify-center select-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Spider-Verse Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#030305]/60 to-[#030305] pointer-events-none z-10" />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none z-10" />

      {/* Cinematic HUD Readout */}
      <div className="relative z-20 flex flex-col items-center max-w-xl text-center px-6">
        <AnimatePresence mode="wait">
          {/* Phase 0: Void */}
          {phase === 0 && (
            <motion.div
              key="phase-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs font-tech text-red-500/50 tracking-[0.4em] uppercase"
            >
              INITIALIZING VOID PROTOCOL...
            </motion.div>
          )}

          {/* Phase 1: SYSTEM INITIALIZING... & WEB NETWORK: OFFLINE */}
          {phase === 1 && (
            <motion.div
              key="phase-1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center space-y-2.5"
            >
              <div className="text-sm font-tech text-red-400 font-bold tracking-[0.45em] uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                SYSTEM INITIALIZING...
              </div>
              <div className="text-xs font-tech text-slate-500 tracking-[0.3em] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-950 border border-red-500/60" />
                WEB NETWORK: OFFLINE
              </div>
            </motion.div>
          )}

          {/* Phase 2: Gradual Formation of the Web Network */}
          {phase === 2 && (
            <motion.div
              key="phase-2"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center space-y-3"
            >
              <div className="text-xs font-tech text-red-400 tracking-[0.35em] uppercase font-bold animate-pulse">
                SYNAPSING STRANDS // FORMING WEB NETWORK...
              </div>
              <div className="text-xs font-tech text-slate-400 tracking-wider flex items-center gap-2">
                <span className="text-purple-400">AI</span> • 
                <span className="text-blue-400">WEB</span> • 
                <span className="text-red-400">CYBER</span> • 
                <span className="text-emerald-400">IoT</span> • 
                <span className="text-amber-400">MISSIONS</span>
              </div>
            </motion.div>
          )}

          {/* Phase 3 & 4: Central Node PARTHU // ONLINE & Explore the Web */}
          {phase >= 3 && (
            <motion.div
              key="phase-3"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col items-center space-y-4"
            >
              {/* Central Node Badge */}
              <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-red-500/50 bg-red-950/40 text-red-400 text-xs font-tech tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444] animate-pulse" />
                <span>PARTHU // ONLINE</span>
              </div>

              {/* Central Identity Header */}
              <div className="space-y-1">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase drop-shadow-[0_0_35px_rgba(239,68,68,0.6)] font-display">
                  PARTHU
                </h1>
                <p className="text-xs md:text-sm font-tech text-slate-400 tracking-[0.25em] uppercase">
                  B.Tech CSE (AI & ML) • Builder • Hackathon Creator
                </p>
              </div>

              {/* Phase 4: Explore the web. */}
              {phase >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="pt-5 flex flex-col items-center space-y-4"
                >
                  <p className="text-base text-red-300 font-medium italic tracking-widest font-tech">
                    &ldquo;Explore the web.&rdquo;
                  </p>

                  <button
                    onClick={handleEnter}
                    className="group relative px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-tech font-bold tracking-[0.25em] uppercase rounded border border-red-400 shadow-[0_0_25px_rgba(239,68,68,0.7)] hover:shadow-[0_0_40px_rgba(239,68,68,1)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      ENTER WEB NETWORK
                      <span className="text-white group-hover:translate-x-1 transition-transform">➔</span>
                    </span>
                  </button>

                  <div className="text-[10px] font-tech text-slate-500 tracking-wider">
                    CLICK NODES TO EXPAND DOSSIERS • PRESS ENTER TO ENGAGE
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button in top corner */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 z-30 text-[11px] font-tech text-slate-500 hover:text-red-400 tracking-wider uppercase border border-slate-800 hover:border-red-500/40 px-3 py-1.5 rounded bg-black/50 backdrop-blur transition-colors cursor-pointer"
      >
        SKIP_SEQUENCE [ESC]
      </button>
    </div>
  );
};
