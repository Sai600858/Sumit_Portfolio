import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  X, 
  Maximize2, 
  Minimize2, 
  CornerDownLeft, 
  ExternalLink
} from 'lucide-react';
import { personalInfo, projectsData, skillsData, codingProfilesData, educationData, experienceData } from '../data/portfolioData';
import { useMode } from '../context/ModeContext';
import { soundFx } from '../utils/soundEffects';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject?: (projectId: string) => void;
  onToggleMode?: () => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

const ALL_COMMANDS = [
  'help',
  'whoami',
  'about',
  'benchmarks',
  'rag-pipeline',
  'specs',
  'neofetch',
  'matrix',
  'projects',
  'project lecturelens',
  'project pageforge',
  'project canteen',
  'skills',
  'experience',
  'education',
  'coding',
  'architecture',
  'resume',
  'contact',
  'gui',
  'clear',
  'history'
];

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  onOpenProject,
  onToggleMode,
}) => {
  const { isHacker, toggleMode } = useMode();
  const [inputVal, setInputVal] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      command: 'init',
      output: (
        <div className="space-y-1 text-slate-300 font-mono text-xs">
          <p className={isHacker ? 'text-[#B7FF5A] font-bold' : 'text-sky-400 font-bold'}>
            SUMIT.OS Workstation CLI [v2.4.0 — PICT Pune]
          </p>
          <p className="text-slate-400">
            Type <span className={isHacker ? 'text-[#B7FF5A] font-bold' : 'text-amber-300 font-bold'}>help</span> for commands, use <span className="text-white font-bold">Tab</span> for autocomplete, or click chips below.
          </p>
        </div>
      )
    }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Auto-scroll on logs update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Autocomplete matching suggestions
  const suggestions = inputVal.trim()
    ? ALL_COMMANDS.filter(c => c.startsWith(inputVal.trim().toLowerCase()))
    : [];

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim().toLowerCase();
    if (!trimmed) return;

    // Track command history
    setCommandHistory(prev => [...prev, rawCmd.trim()]);
    setHistoryPointer(-1);

    let response: React.ReactNode = null;

    if (trimmed === 'clear') {
      setLogs([]);
      setInputVal('');
      return;
    }

    if (trimmed === 'help') {
      response = (
        <div className="space-y-2 text-xs font-mono">
          <p className={isHacker ? 'text-[#B7FF5A] font-bold' : 'text-sky-400 font-bold'}>
            SUMIT.OS Command Palette & Quick Reference:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-300">
            <div><span className="text-[#B7FF5A] font-bold">benchmarks</span> — Live Java 21 Loom & WebRTC SFU telemetry</div>
            <div><span className="text-[#B7FF5A] font-bold">rag-pipeline</span> — Interactive LectureLens AI flow trace</div>
            <div><span className="text-[#B7FF5A] font-bold">specs / neofetch</span> — Engineering machine & kernel stats</div>
            <div><span className="text-[#B7FF5A] font-bold">matrix</span> — Digital cyber rain console stream</div>
            <div><span className="text-white font-bold">whoami</span> — Identity & verified student profile</div>
            <div><span className="text-white font-bold">about</span> — Engineering philosophy & background</div>
            <div><span className="text-white font-bold">projects</span> — List all portfolio projects</div>
            <div><span className="text-white font-bold">project &lt;name&gt;</span> — Deep-dive modal (lecturelens, pageforge)</div>
            <div><span className="text-white font-bold">architecture</span> — Interactive LectureLens system diagram</div>
            <div><span className="text-white font-bold">skills</span> — Categorized backend & systems skill matrix</div>
            <div><span className="text-white font-bold">education</span> — Academic record & PICT Pune credentials</div>
            <div><span className="text-white font-bold">coding</span> — LeetCode Knight & CodeChef stats</div>
            <div><span className="text-white font-bold">resume</span> — Download official resume PDF</div>
            <div><span className="text-white font-bold">contact</span> — Email, LinkedIn, GitHub details</div>
            <div><span className="text-white font-bold">gui</span> — Toggle between Default & Hacker Mode</div>
            <div><span className="text-white font-bold">clear</span> — Wipe terminal output</div>
          </div>
        </div>
      );
    } else if (trimmed === 'whoami') {
      response = (
        <div className="text-xs space-y-1 font-mono">
          <p className="text-white font-bold">{personalInfo.name}</p>
          <p className="text-slate-300">{personalInfo.currentRole} @ {personalInfo.institution}</p>
          <p className={isHacker ? 'text-[#B7FF5A]' : 'text-sky-400'}>
            Academic Index: 9.45 / 10.0 CGPA · LeetCode Knight (1950) · 700+ DSA Solved
          </p>
          <p className="text-slate-400">Location: {personalInfo.location}</p>
        </div>
      );
    } else if (trimmed === 'about') {
      response = (
        <div className="text-xs space-y-1.5 font-mono text-slate-300">
          <p className="text-white font-semibold">{personalInfo.headline}</p>
          {personalInfo.aboutBio.slice(0, 2).map((p, idx) => (
            <p key={idx} className="text-slate-400 leading-relaxed">{p}</p>
          ))}
        </div>
      );
    } else if (trimmed === 'projects') {
      response = (
        <div className="text-xs space-y-2 font-mono">
          <p className={isHacker ? 'text-[#B7FF5A] font-bold' : 'text-sky-400 font-bold'}>
            Verified Projects in Engineering Portfolio:
          </p>
          {projectsData.map(p => (
            <div key={p.id} className="p-2 rounded bg-white/[0.03] border border-white/5 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">{p.title}</span>
                <span className="text-[10px] text-slate-400">[{p.category} · {p.year}]</span>
              </div>
              <p className="text-slate-400 text-[11px]">{p.tagline}</p>
              <div className="pt-1 flex items-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenProject?.(p.id);
                  }}
                  className={`text-[10px] underline ${isHacker ? 'text-[#B7FF5A]' : 'text-sky-400'}`}
                >
                  inspect details modal ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (trimmed.startsWith('project ')) {
      const targetName = trimmed.replace('project ', '').trim();
      const matched = projectsData.find(p => 
        p.id.toLowerCase().includes(targetName) || p.title.toLowerCase().includes(targetName)
      );

      if (matched) {
        response = (
          <div className="text-xs space-y-1.5 font-mono">
            <div className="flex items-center justify-between">
              <span className={`font-bold ${isHacker ? 'text-[#B7FF5A]' : 'text-sky-400'}`}>
                {matched.title}
              </span>
              <span className="text-[10px] text-slate-400">{matched.statusBadge}</span>
            </div>
            <p className="text-slate-300">{matched.description}</p>
            <div className="text-slate-400 text-[11px]">
              <span className="text-white font-semibold">Stack: </span>
              {matched.technologies.slice(0, 8).join(', ')}
            </div>
            <div className="pt-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenProject?.(matched.id);
                }}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs border ${
                  isHacker 
                    ? 'bg-[#B7FF5A]/15 border-[#B7FF5A]/30 text-[#B7FF5A]' 
                    : 'bg-sky-500/20 border-sky-500/30 text-sky-300'
                }`}
              >
                <span>Launch Deep-Dive Modal</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        );
      } else {
        response = (
          <div className="text-xs text-rose-400 font-mono">
            Project "{targetName}" not found. Available: <span className="text-white">lecturelens</span>, <span className="text-white">pageforge</span>, <span className="text-white">canteen</span>, <span className="text-white">resume-parser</span>, <span className="text-white">aluminate</span>.
          </div>
        );
      }
    } else if (trimmed === 'architecture') {
      response = (
        <div className="text-xs space-y-1 font-mono text-slate-300">
          <p className={isHacker ? 'text-[#B7FF5A] font-bold' : 'text-sky-400 font-bold'}>
            Navigating to LectureLens Architecture Explorer...
          </p>
          <p className="text-slate-400">
            Opening 4-tier distributed topology: WebRTC SFU + Spring Boot 3.3 + Python FastAPI + PostgreSQL.
          </p>
        </div>
      );
      setTimeout(() => {
        onClose();
        const el = document.getElementById('lecturelens-architecture');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    } else if (trimmed === 'skills') {
      response = (
        <div className="text-xs space-y-2 font-mono">
          <p className={isHacker ? 'text-[#B7FF5A] font-bold' : 'text-sky-400 font-bold'}>
            Verified Technical Capabilities:
          </p>
          <div className="space-y-1 text-slate-300">
            {skillsData.map((cat, i) => (
              <div key={i}>
                <span className="text-white font-semibold">{cat.title}: </span>
                <span className="text-slate-400">{cat.skills.map(s => s.name).join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (trimmed === 'experience') {
      response = (
        <div className="text-xs space-y-2 font-mono">
          <p className={isHacker ? 'text-[#B7FF5A] font-bold' : 'text-sky-400 font-bold'}>
            Professional Experience & Internships:
          </p>
          {experienceData.map((exp, i) => (
            <div key={i} className="space-y-1 text-slate-300">
              <div className="text-white font-bold">{exp.role} — {exp.company}</div>
              <div className="text-slate-500 text-[11px]">{exp.period} · {exp.location}</div>
              <p className="text-slate-400">{exp.description}</p>
            </div>
          ))}
        </div>
      );
    } else if (trimmed === 'education') {
      response = (
        <div className="text-xs space-y-1 font-mono text-slate-300">
          <p className="text-white font-bold">{educationData.degree}</p>
          <p className={isHacker ? 'text-[#B7FF5A]' : 'text-sky-400'}>{educationData.institution}</p>
          <p>Period: {educationData.period} · Status: {educationData.status}</p>
          <p>Cumulative GPA: <span className="text-white font-bold">{educationData.cgpa}</span></p>
          <p className="text-slate-400">Coursework: {educationData.coursework.join(', ')}</p>
        </div>
      );
    } else if (trimmed === 'coding') {
      response = (
        <div className="text-xs space-y-1.5 font-mono text-slate-300">
          <p className={isHacker ? 'text-[#B7FF5A] font-bold' : 'text-sky-400 font-bold'}>
            Competitive Programming Profile:
          </p>
          {codingProfilesData.map((cp, idx) => (
            <div key={idx} className="p-2 rounded bg-white/[0.03] border border-white/5">
              <span className="text-white font-bold">{cp.platform}: </span>
              <span className={isHacker ? 'text-[#B7FF5A]' : 'text-amber-400'}>{cp.rank}</span>
              <span className="text-slate-400"> ({cp.badge}) · {cp.problemsSolved}</span>
            </div>
          ))}
          <p className="text-slate-400 pt-1">Total Solved: 700+ algorithmic problems across LeetCode & CodeChef.</p>
        </div>
      );
    } else if (trimmed === 'resume') {
      response = (
        <div className="text-xs font-mono text-emerald-400 space-y-1">
          <p>Initiating download of Sumit-Karkhile-Resume.pdf...</p>
        </div>
      );
      const link = document.createElement('a');
      link.href = personalInfo.resumeUrl;
      link.download = 'Sumit-Karkhile-Resume.pdf';
      link.click();
    } else if (trimmed === 'contact') {
      response = (
        <div className="text-xs space-y-1 font-mono text-slate-300">
          <p>Email: <a href={`mailto:${personalInfo.email}`} className="text-sky-400 underline">{personalInfo.email}</a></p>
          <p>Phone: <span className="text-white">{personalInfo.phone}</span></p>
          <p>GitHub: <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="text-sky-400 underline">{personalInfo.socials.github}</a></p>
          <p>LinkedIn: <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="text-sky-400 underline">{personalInfo.socials.linkedin}</a></p>
          <p>LeetCode: <a href={personalInfo.socials.leetcode} target="_blank" rel="noreferrer" className="text-sky-400 underline">{personalInfo.socials.leetcode}</a></p>
        </div>
      );
    } else if (trimmed === 'gui') {
      if (onToggleMode) onToggleMode();
      else toggleMode();
      response = (
        <div className="text-xs font-mono text-[#B7FF5A]">
          Mode toggled successfully. Switched visual theme.
        </div>
      );
    } else if (trimmed === 'benchmarks') {
      response = (
        <div className="space-y-3 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-[#0a120b] border border-[#B7FF5A]/30 space-y-1.5">
            <div className="flex items-center justify-between text-[#B7FF5A] font-bold">
              <span>BENCHMARK 01 // Java 21 Virtual Threads vs OS Platform Threads</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#B7FF5A]/20">10,000 Concurrent I/O Tasks</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="p-2 rounded bg-black/50 border border-[#B7FF5A]/20">
                <div className="text-emerald-400 font-bold">Virtual Threads (Project Loom)</div>
                <div className="text-white mt-1">Throughput: <span className="text-[#B7FF5A] font-bold">124 ms total</span></div>
                <div className="text-slate-400">RAM: <span className="text-emerald-300">32.4 MB</span></div>
                <div className="text-slate-400">Context Switches: <span className="text-emerald-300">0 (User-space fibers)</span></div>
              </div>
              <div className="p-2 rounded bg-black/50 border border-rose-500/20">
                <div className="text-rose-400 font-bold">OS Platform Threads</div>
                <div className="text-white mt-1">Throughput: <span className="text-rose-300 font-bold">2,840 ms</span></div>
                <div className="text-slate-400">RAM: <span className="text-rose-300">1.2 GB (High memory pressure)</span></div>
                <div className="text-slate-400">Context Switches: <span className="text-rose-300">10,000 kernel traps</span></div>
              </div>
            </div>
            <div className="text-[10px] text-emerald-300">
              ✦ Result: 95.6% Latency Reduction · 97% Memory Footprint Reduction in Spring Boot 3.4
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#0a120b] border border-cyan-500/30 space-y-1.5">
            <div className="flex items-center justify-between text-cyan-400 font-bold">
              <span>BENCHMARK 02 // Mediasoup SFU vs P2P Full Mesh</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20">50 Classroom WebRTC Peers</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="p-2 rounded bg-black/50 border border-cyan-500/20">
                <div className="text-cyan-400 font-bold">LectureLens SFU Architecture</div>
                <div className="text-white mt-1">Client Upload: <span className="text-cyan-300 font-bold">1 stream (~2.4 Mbps)</span></div>
                <div className="text-slate-400">Packet Drop Rate: <span className="text-cyan-300">&lt; 0.2%</span></div>
              </div>
              <div className="p-2 rounded bg-black/50 border border-rose-500/20">
                <div className="text-rose-400 font-bold">Standard P2P Mesh Network</div>
                <div className="text-white mt-1">Client Upload: <span className="text-rose-300 font-bold">49 streams (~117.6 Mbps)</span></div>
                <div className="text-slate-400">Packet Drop Rate: <span className="text-rose-300">&gt; 38% (Severe Congestion)</span></div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (trimmed === 'rag-pipeline') {
      response = (
        <div className="p-3 rounded-xl bg-[#030a05] border border-[#B7FF5A]/30 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between text-[#B7FF5A] font-bold border-b border-[#B7FF5A]/20 pb-1.5">
            <span>LECTURELENS // MULTIMODAL AI PIPELINE TRACE</span>
            <span className="text-[10px] text-cyan-400">LATENCY: ~2.1s END-TO-END</span>
          </div>
          <div className="space-y-1.5 text-[11px] text-slate-300">
            <div className="flex items-start gap-2">
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#B7FF5A] font-bold text-[10px] shrink-0">STEP 1</span>
              <span>WebRTC Audio Ingestion: 48kHz Opus stream packetized into 30s rolling buffers</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px] shrink-0">STEP 2</span>
              <span>Whisper STT via vLLM inference produces word-level timestamps & speech confidence</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 font-bold text-[10px] shrink-0">STEP 3</span>
              <span>AST math parser detects equations and compiles into sanitized KaTeX expressions</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] shrink-0">STEP 4</span>
              <span>Weaviate vector DB indexes chunk embeddings via HNSW graph for sub-5ms semantic search</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#B7FF5A] font-bold text-[10px] shrink-0">STEP 5</span>
              <span>DeepSeek / Llama-3 streams lecture notes & flashcards directly into the study hub</span>
            </div>
          </div>
        </div>
      );
    } else if (trimmed === 'specs' || trimmed === 'neofetch') {
      response = (
        <div className="flex flex-col sm:flex-row gap-4 text-xs font-mono text-slate-200">
          <pre className="text-[#B7FF5A] text-[10px] leading-tight select-none font-bold">
{`
   ____  __  ____  _______________
  / __ \\/ / / /  |/  /  _/_  __/
 / /_/ / / / / /|_/ // /  / /   
/ ____/ /_/ / /  / // /  / /    
/_/    \\____/_/  /_/___/ /_/     
`}
          </pre>
          <div className="space-y-1 text-[11px]">
            <p className="text-white font-bold">{personalInfo.name} <span className="text-[#B7FF5A]">@ PICT-Pune</span></p>
            <p className="text-slate-500">------------------------------------</p>
            <p><span className="text-[#B7FF5A] font-bold">OS:</span> SUMIT.OS v2.4 (React 18 + Vite)</p>
            <p><span className="text-[#B7FF5A] font-bold">Host:</span> Pune Institute of Computer Technology (9.45 CGPA)</p>
            <p><span className="text-[#B7FF5A] font-bold">Kernel:</span> Java 21 LTS / Spring Boot 3.4 / Virtual Threads</p>
            <p><span className="text-[#B7FF5A] font-bold">Algorithms:</span> LeetCode Knight (1950 Rating) · Top 5%</p>
            <p><span className="text-[#B7FF5A] font-bold">Problem Stats:</span> 700+ DSA (600+ LeetCode · 100+ CodeChef)</p>
            <p><span className="text-[#B7FF5A] font-bold">Databases:</span> PostgreSQL 16 (HikariCP) · Redis 7 · Weaviate</p>
            <p><span className="text-[#B7FF5A] font-bold">Protocols:</span> WebRTC (Mediasoup SFU) · WebSocket · REST</p>
            <p><span className="text-[#B7FF5A] font-bold">Editor:</span> VS Code / Antigravity IDE</p>
          </div>
        </div>
      );
    } else if (trimmed === 'matrix') {
      response = (
        <div className="p-3 rounded bg-black border border-[#B7FF5A]/40 font-mono text-xs text-[#B7FF5A] space-y-1 animate-pulse">
          <div className="text-[10px] tracking-widest text-[#B7FF5A]/60">01001001 01001110 01010011 01010000 01000101 01000011 01010100</div>
          <div>Wake up, engineer... The system is running.</div>
          <div className="text-slate-400 text-[11px]">Sumit Karkhile distributed services active on local node.</div>
          <div className="text-[#B7FF5A]/80 text-[10px]">PICT Pune [9.45 CGPA] · LeetCode Knight [1950] · Java 21 LTS</div>
        </div>
      );
    } else if (trimmed === 'history') {
      response = (
        <div className="text-xs space-y-1 font-mono text-slate-300">
          <p className="text-slate-400 font-bold">Command Execution History:</p>
          {commandHistory.length > 0 ? (
            commandHistory.map((cmd, i) => (
              <div key={i} className="text-slate-300">
                <span className="text-slate-500">{i + 1}.</span> {cmd}
              </div>
            ))
          ) : (
            <p className="text-slate-500">No previous commands executed in this session.</p>
          )}
        </div>
      );
    } else {
      // Invalid command feedback with closest suggestion
      const match = ALL_COMMANDS.find(c => c.includes(trimmed) || trimmed.includes(c));
      response = (
        <div className="text-xs text-rose-400 font-mono space-y-1">
          <p>Command not recognized: <span className="text-white font-bold">{trimmed}</span></p>
          {match && (
            <p className="text-slate-400">
              Did you mean: <button onClick={() => handleCommand(match)} className="text-[#B7FF5A] underline font-bold">{match}</button>?
            </p>
          )}
          <p className="text-slate-500">Type <span className="text-amber-300 font-bold">help</span> to view all commands.</p>
        </div>
      );
    }

    setLogs(prev => [...prev, { command: rawCmd, output: response }]);
    setInputVal('');
    soundFx.playSuccessChime();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyPointer === -1 
        ? commandHistory.length - 1 
        : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextIndex);
      setInputVal(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextIndex = historyPointer + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryPointer(-1);
        setInputVal('');
      } else {
        setHistoryPointer(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInputVal(suggestions[0]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      <div 
        className={`relative w-full ${
          isExpanded ? 'max-w-5xl h-[88vh]' : 'max-w-2xl h-[520px]'
        } flex flex-col rounded-2xl border transition-all duration-200 font-mono z-10 overflow-hidden shadow-2xl ${
          isHacker
            ? 'bg-[#050806] border-[#B7FF5A]/30 shadow-[#B7FF5A]/10'
            : 'bg-[#0a0c12] border-white/20 shadow-black/80'
        }`}
      >
        {/* Terminal Header */}
        <div className={`flex items-center justify-between px-4 py-3 border-b select-none ${
          isHacker ? 'bg-[#080d09] border-[#B7FF5A]/20' : 'bg-[#11141e] border-white/10'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block cursor-pointer hover:opacity-80" onClick={onClose} title="Close" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block cursor-pointer hover:opacity-80" onClick={() => setIsExpanded(!isExpanded)} title="Toggle Size" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className={`text-xs ml-2 flex items-center gap-1.5 font-bold ${
              isHacker ? 'text-[#B7FF5A]' : 'text-sky-400'
            }`}>
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>sumit@pict-workstation:~$</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="hidden sm:inline text-[10px] text-slate-500 font-mono">
              [Ctrl+K to toggle]
            </span>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:text-white rounded hover:bg-white/5 transition-colors"
              title={isExpanded ? 'Minimize' : 'Maximize'}
              data-cursor="btn"
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button 
              onClick={onClose}
              className="p-1 hover:text-rose-400 rounded hover:bg-white/5 transition-colors"
              title="Close Terminal"
              data-cursor="btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Chips Toolbar */}
        <div className={`flex items-center gap-1.5 px-4 py-2 border-b overflow-x-auto text-[11px] ${
          isHacker ? 'bg-[#060a07] border-[#B7FF5A]/15' : 'bg-[#0e111a] border-white/5'
        }`}>
          <span className="text-slate-500 uppercase tracking-wider shrink-0 text-[10px] font-bold">
            Actions:
          </span>
          {['help', 'whoami', 'projects', 'architecture', 'skills', 'coding', 'resume', 'gui', 'clear'].map(cmd => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className={`px-2 py-0.5 rounded text-xs transition-colors shrink-0 border ${
                isHacker
                  ? 'bg-[#080d09] hover:bg-[#B7FF5A]/20 text-[#B7FF5A] border-[#B7FF5A]/25'
                  : 'bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-sky-300 border-white/10'
              }`}
              data-cursor="btn"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Logs Viewport */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
          {logs.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.command && (
                <div className="flex items-center gap-2 text-slate-400">
                  <span className={isHacker ? 'text-[#B7FF5A] font-bold' : 'text-sky-400 font-bold'}>
                    sumit@pict:~$
                  </span>
                  <span className="text-white font-semibold">{item.command}</span>
                </div>
              )}
              <div className={`pl-3 border-l ${
                isHacker ? 'border-[#B7FF5A]/20' : 'border-white/10'
              }`}>
                {item.output}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Autocomplete Suggestions Bar while typing */}
        {suggestions.length > 0 && inputVal.trim() && (
          <div className={`px-4 py-1.5 border-t flex items-center gap-2 text-[11px] ${
            isHacker ? 'bg-[#080d09] border-[#B7FF5A]/20' : 'bg-[#0f121b] border-white/10'
          }`}>
            <span className="text-slate-500">Auto [Tab]:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {suggestions.slice(0, 4).map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCommand(s)}
                  className={`px-1.5 py-0.5 rounded border text-[10px] ${
                    idx === 0
                      ? isHacker 
                        ? 'bg-[#B7FF5A]/20 border-[#B7FF5A] text-[#B7FF5A]' 
                        : 'bg-sky-500/20 border-sky-400 text-sky-300'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                  data-cursor="btn"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className={`p-3 border-t flex items-center gap-2 ${
          isHacker ? 'bg-[#050806] border-[#B7FF5A]/20' : 'bg-[#0d1017] border-white/10'
        }`}>
          <span className={`text-xs font-bold pl-2 ${
            isHacker ? 'text-[#B7FF5A]' : 'text-sky-400'
          }`}>
            sumit@pict:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              soundFx.playKeyClick();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'architecture', or 'project lecturelens'..."
            className={`flex-1 bg-transparent text-white text-xs font-mono focus:outline-none placeholder:text-slate-600 ${
              isHacker ? 'caret-[#B7FF5A]' : 'caret-sky-400'
            }`}
            autoComplete="off"
            spellCheck="false"
          />
          <button
            onClick={() => inputVal.trim() && handleCommand(inputVal)}
            className={`p-1.5 rounded-lg transition-colors ${
              isHacker
                ? 'bg-[#B7FF5A]/20 text-[#B7FF5A] hover:bg-[#B7FF5A]/30'
                : 'bg-sky-500/20 text-sky-400 hover:bg-sky-500/30'
            }`}
            title="Execute Command"
            data-cursor="btn"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
