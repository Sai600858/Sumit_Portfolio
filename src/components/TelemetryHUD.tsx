import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  Server, 
  Database, 
  Radio, 
  Terminal,
  Layers
} from 'lucide-react';
import { useMode } from '../context/ModeContext';
import { soundFx } from '../utils/soundEffects';

export const TelemetryHUD: React.FC<{
  onOpenTerminal: () => void;
}> = ({ onOpenTerminal }) => {
  const { isHacker, toggleMode } = useMode();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFx.getIsMuted());

  // Dynamic realistic telemetry state
  const [latency, setLatency] = useState(11.4);
  const [sfuBitrate, setSfuBitrate] = useState(2.42);
  const [cacheHitRate, setCacheHitRate] = useState(98.8);
  const [qps, setQps] = useState(1420);
  const [sparkPoints, setSparkPoints] = useState<number[]>([12, 14, 11, 15, 13, 16, 12, 11, 14, 12]);

  // Fluctuating realistic metrics ticker
  useEffect(() => {
    if (!isHacker) return;
    const interval = setInterval(() => {
      setLatency(+(11.0 + Math.random() * 1.8).toFixed(1));
      setSfuBitrate(+(2.35 + Math.random() * 0.22).toFixed(2));
      setCacheHitRate(+(98.4 + Math.random() * 0.8).toFixed(1));
      setQps(Math.floor(1380 + Math.random() * 120));
      setSparkPoints(prev => [...prev.slice(1), Math.floor(10 + Math.random() * 8)]);
    }, 2400);

    return () => clearInterval(interval);
  }, [isHacker]);

  if (!isHacker) return null;

  const handleToggleSound = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleToggleModeWithAudio = () => {
    soundFx.playExitSound();
    toggleMode();
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          Fixed Top Telemetry Streaming Bar
      ══════════════════════════════════════════════════════ */}
      <aside aria-label="SUMIT.OS Telemetry Bar" className="fixed top-0 left-0 right-0 z-[60] bg-[#030804]/95 border-b border-[#B7FF5A]/30 py-1.5 px-3 sm:px-4 text-[11px] font-mono text-[#B7FF5A]/90 select-none backdrop-blur-md shadow-[0_2px_15px_rgba(183,255,90,0.08)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left: Node status & Identity */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B7FF5A] shadow-[0_0_8px_#B7FF5A] animate-pulse" />
              <span className="font-bold tracking-widest text-[#B7FF5A] text-xs">SUMIT.OS v2.4</span>
            </span>

            <span className="text-emerald-800">|</span>
            <span className="hidden md:inline text-slate-400">
              NODE: <span className="text-emerald-300 font-semibold">PICT-PUNE</span> (9.45 CGPA)
            </span>

            <span className="hidden lg:inline text-emerald-800">|</span>
            <span className="hidden lg:inline text-slate-400">
              LEETCODE: <span className="text-amber-400 font-semibold">1950 KNIGHT</span>
            </span>

            {/* Live Streaming Metrics Ticker */}
            <span className="hidden sm:inline text-emerald-800">|</span>
            <div className="hidden sm:flex items-center gap-3 text-[10px]">
              <span className="text-slate-400">
                p99: <span className="text-[#B7FF5A]">{latency}ms</span>
              </span>
              <span className="hidden xl:inline text-slate-400">
                SFU: <span className="text-cyan-400">{sfuBitrate} Mbps</span>
              </span>
              <span className="hidden 2xl:inline text-slate-400">
                CACHE: <span className="text-emerald-300">{cacheHitRate}%</span>
              </span>
            </div>
          </div>

          {/* Right: Controls (Metrics Drawer, Sound Toggle, CLI Palette, Exit) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Expand Observability Drawer */}
            <button
              onClick={() => {
                soundFx.playKeyClick();
                setIsExpanded(prev => !prev);
              }}
              className="flex items-center gap-1 px-2 py-0.5 rounded border border-[#B7FF5A]/30 bg-[#B7FF5A]/10 hover:bg-[#B7FF5A]/20 text-[#B7FF5A] transition-colors text-[10px]"
              title="Inspect Distributed Architecture Telemetry"
              data-cursor="inspect"
            >
              <Activity className="w-3 h-3 animate-spin-slow" />
              <span className="hidden sm:inline font-semibold">DIAGNOSTICS</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-1 rounded border border-white/10 hover:border-[#B7FF5A]/40 bg-black/40 hover:bg-[#B7FF5A]/10 text-slate-400 hover:text-[#B7FF5A] transition-colors"
              title={isMuted ? 'Unmute Audio Synthesis' : 'Mute Audio Synthesis'}
              data-cursor="btn"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-[#B7FF5A]" />}
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                soundFx.playKeyClick();
                onOpenTerminal();
              }}
              className="hover:text-white transition-colors flex items-center gap-1 text-[10px] bg-black/50 px-2 py-0.5 rounded border border-[#B7FF5A]/30"
              data-cursor="btn"
              title="Launch Terminal Command Palette (Ctrl+K)"
            >
              <Terminal className="w-3 h-3 text-[#B7FF5A]" />
              <span className="text-slate-300 hidden md:inline">Ctrl+K</span>
            </button>

            {/* Exit to GUI */}
            <button
              onClick={handleToggleModeWithAudio}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors text-[10px]"
              data-cursor="btn"
            >
              GUI Mode
            </button>
          </div>
        </div>
      </aside>

      {/* ══════════════════════════════════════════════════════
          Expandable Observability & System Diagnostics Drawer
      ══════════════════════════════════════════════════════ */}
      {isExpanded && (
        <div 
          className="fixed top-9 left-0 right-0 z-50 bg-[#040804]/98 border-b border-[#B7FF5A]/30 backdrop-blur-xl p-4 sm:p-6 text-slate-200 font-mono shadow-2xl animate-in slide-in-from-top-2 duration-300"
          role="region"
          aria-label="System Diagnostics Panel"
        >
          <div className="max-w-7xl mx-auto space-y-4">
            
            {/* Header with Sparkline */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#B7FF5A]/20 gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#B7FF5A]">
                  <Cpu className="w-4 h-4" />
                  <span>SUMIT.OS // DISTRIBUTED ARCHITECTURE & KERNEL PROBES</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Live runtime telemetry simulating Sumit's high-throughput backend services and algorithmic throughput.
                </p>
              </div>

              {/* Sparkline Visualizer */}
              <div className="flex items-center gap-3 bg-black/60 px-3 py-1.5 rounded-lg border border-[#B7FF5A]/20">
                <span className="text-[10px] text-slate-400">THROUGHPUT:</span>
                <span className="text-xs font-bold text-[#B7FF5A]">{qps} QPS</span>
                <svg className="w-24 h-6 text-[#B7FF5A]" viewBox="0 0 100 24" fill="none">
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={sparkPoints.map((val, idx) => `${idx * 11},${24 - val}`).join(' ')}
                  />
                </svg>
              </div>
            </div>

            {/* 4 Architectural Probes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              
              {/* Probe 1: LectureLens WebRTC SFU */}
              <div className="p-3 rounded-xl bg-black/50 border border-[#B7FF5A]/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-cyan-400 flex items-center gap-1.5 font-bold">
                    <Radio className="w-3.5 h-3.5" />
                    <span>MEDIASOUP SFU</span>
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                    HEALTHY
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 space-y-1">
                  <div>Topology: <span className="text-white">Selective Forwarding Unit</span></div>
                  <div>Bitrate: <span className="text-cyan-300 font-semibold">{sfuBitrate} Mbps</span></div>
                  <div>Codecs: <span className="text-slate-300">Opus 48kHz, VP8</span></div>
                  <div>Signaling: <span className="text-emerald-400">WebSocket / JSON-RPC</span></div>
                </div>
              </div>

              {/* Probe 2: Spring Boot 3.4 & Java 21 */}
              <div className="p-3 rounded-xl bg-black/50 border border-[#B7FF5A]/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#B7FF5A] flex items-center gap-1.5 font-bold">
                    <Server className="w-3.5 h-3.5" />
                    <span>JAVA 21 / SPRING</span>
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#B7FF5A]/20 text-[#B7FF5A] border border-[#B7FF5A]/30 font-semibold">
                    VIRTUAL THREADS
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 space-y-1">
                  <div>Engine: <span className="text-white">Amazon Corretto 21 LTS</span></div>
                  <div>Concurrency: <span className="text-[#B7FF5A] font-semibold">Project Loom Fibers</span></div>
                  <div>Pool p99: <span className="text-emerald-300 font-semibold">{latency} ms</span></div>
                  <div>Security: <span className="text-slate-300">Spring Security + JWT</span></div>
                </div>
              </div>

              {/* Probe 3: Storage & RAG Vector Engine */}
              <div className="p-3 rounded-xl bg-black/50 border border-[#B7FF5A]/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-violet-400 flex items-center gap-1.5 font-bold">
                    <Database className="w-3.5 h-3.5" />
                    <span>DATA & RAG LAYER</span>
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 font-semibold">
                    HYBRID
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 space-y-1">
                  <div>Primary DB: <span className="text-white">PostgreSQL 16 (HikariCP)</span></div>
                  <div>Vector DB: <span className="text-violet-300 font-semibold">Weaviate HNSW Index</span></div>
                  <div>Cache Layer: <span className="text-emerald-300">Redis 7 ({cacheHitRate}%)</span></div>
                  <div>Embeddings: <span className="text-slate-300">Text-Embedding-3-Small</span></div>
                </div>
              </div>

              {/* Probe 4: Algorithmic Complexity Specs */}
              <div className="p-3 rounded-xl bg-black/50 border border-[#B7FF5A]/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-amber-400 flex items-center gap-1.5 font-bold">
                    <Layers className="w-3.5 h-3.5" />
                    <span>DSA BENCHMARK</span>
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                    TOP 5%
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 space-y-1">
                  <div>LeetCode Rank: <span className="text-amber-300 font-semibold">Knight (1950)</span></div>
                  <div>CodeChef: <span className="text-sky-300">3-Star (1650)</span></div>
                  <div>Problems Solved: <span className="text-white font-semibold">700+ DSA</span></div>
                  <div>Core: <span className="text-slate-300">DP, Graphs, Binary Search</span></div>
                </div>
              </div>

            </div>

            {/* Bottom quick actions */}
            <div className="flex items-center justify-between pt-2 text-[10px] text-slate-400 border-t border-white/5">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[#B7FF5A] font-bold">Ctrl+K</kbd> to launch interactive CLI with benchmarks</span>
              <button
                onClick={() => setIsExpanded(false)}
                className="hover:text-white transition-colors text-slate-400 underline decoration-slate-600"
              >
                Close Drawer
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
