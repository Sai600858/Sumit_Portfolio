import React, { useState } from 'react';
import { 
  Layers, 
  Server, 
  Cpu, 
  Database, 
  Cloud, 
  Activity, 
  Radio, 
  Sparkles
} from 'lucide-react';
import { useMode } from '../context/ModeContext';

interface ArchitectureNode {
  id: string;
  name: string;
  tier: 'client' | 'media' | 'backend' | 'storage_ai';
  tierLabel: string;
  badge: string;
  port?: string;
  icon: 'client' | 'media' | 'backend' | 'ai' | 'db' | 'cloud';
  technologies: string[];
  responsibility: string;
  systemRole: string;
  connections: {
    upstream: string[];
    downstream: string[];
  };
}

const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'client-spa',
    name: 'React 18 + Vite SPA',
    tier: 'client',
    tierLabel: '01 // Client Tier',
    badge: 'Browser Client',
    icon: 'client',
    technologies: ['React 18', 'Vite', 'mediasoup-client', 'Socket.IO Client', 'KaTeX', 'DOMPurify'],
    responsibility: 'Multiparty video/audio classroom stage, screen sharing view, live room chat, KaTeX LaTeX math formula rendering, and synchronized 8-tab post-lecture study hub.',
    systemRole: 'Primary user interface for students and instructors with client-side WebRTC RTP negotiation and JWT role-based routing.',
    connections: {
      upstream: ['mediasoup-sfu', 'stt-router', 'spring-backend'],
      downstream: [],
    },
  },
  {
    id: 'mediasoup-sfu',
    name: 'Node.js Media SFU & Gateway',
    tier: 'media',
    tierLabel: '02 // Media & Ingestion Tier',
    badge: 'Port 3001',
    port: '3001',
    icon: 'media',
    technologies: ['Node.js', 'Express', 'mediasoup (C++ Workers)', 'Socket.IO Signaling'],
    responsibility: 'WebRTC Selective Forwarding Unit (SFU) managing RTP audio/video packet transport between peers, signaling negotiation, and reverse API gateway proxying /api/* to Spring Boot.',
    systemRole: 'Routes high-bandwidth multi-party media streams with low latency without transcoding on server; maintains room peer states.',
    connections: {
      upstream: ['spring-backend'],
      downstream: ['client-spa'],
    },
  },
  {
    id: 'stt-router',
    name: 'Unified STT Server',
    tier: 'media',
    tierLabel: '02 // Media & Ingestion Tier',
    badge: 'Port 5000',
    port: '5000',
    icon: 'ai',
    technologies: ['Node.js', 'Socket.IO', 'MediaRecorder Chunking', 'Provider Routing'],
    responsibility: 'Receives 3-second live audio chunks from instructor mic, checks STT_PROVIDER env config, and routes audio to Google Gemini STT (primary) or Faster-Whisper (fallback).',
    systemRole: 'Decoupled streaming ingestion pipe ensuring uninterrupted transcription even during transient cloud network drops.',
    connections: {
      upstream: ['python-ai', 'gemini-cloud'],
      downstream: ['client-spa'],
    },
  },
  {
    id: 'spring-backend',
    name: 'Spring Boot 3.3 Core Backend',
    tier: 'backend',
    tierLabel: '03 // Core Services Tier',
    badge: 'Port 8080',
    port: '8080',
    icon: 'backend',
    technologies: ['Java 21', 'Spring Boot 3.3', 'Spring Security', 'JWT (HS256)', 'Spring Data JPA', 'Apache PDFBox', 'Actuator'],
    responsibility: 'Authoritative REST API for authentication (AuthController), RBAC enforcement, lecture sessions, transcript persistence, quizzes, flashcards, study notes, RAG Q&A, and PDF export.',
    systemRole: 'Enterprise system core providing stateless auth verification, database transactions, Flyway schema migrations, and secure RAG prompt sanitization.',
    connections: {
      upstream: ['postgres-db', 'gemini-cloud'],
      downstream: ['mediasoup-sfu', 'client-spa'],
    },
  },
  {
    id: 'python-ai',
    name: 'Python AI Microservice',
    tier: 'backend',
    tierLabel: '03 // Core Services Tier',
    badge: 'Port 8000',
    port: '8000',
    icon: 'ai',
    technologies: ['Python 3.11', 'FastAPI', 'Faster-Whisper (CUDA/CPU)', 'OpenCV', 'Gemini Vision SDK'],
    responsibility: 'Exposes /stt/transcribe for local audio chunk transcription fallback, and /vision/board-ocr for extracting LaTeX mathematical formulas and diagram descriptions from whiteboard frames.',
    systemRole: 'Specialized local inference worker decoupled from main servers; operates asynchronously without blocking web requests.',
    connections: {
      upstream: ['gemini-cloud'],
      downstream: ['stt-router', 'spring-backend'],
    },
  },
  {
    id: 'postgres-db',
    name: 'PostgreSQL + Flyway',
    tier: 'storage_ai',
    tierLabel: '04 // Storage & AI Cloud Tier',
    badge: 'Port 5432 (Authoritative)',
    port: '5432',
    icon: 'db',
    technologies: ['PostgreSQL 16', 'Flyway Schema Versioning', 'Spring Data JPA / Hibernate'],
    responsibility: 'Stores users, BCrypt credentials, lecture session metadata, speaker-tagged transcripts, chapter timestamps, quiz questions, spaced-repetition flashcard mastery, and audit logs.',
    systemRole: 'Authoritative transactional persistence layer with foreign key cascades, unique indexes, and version-controlled migration scripts.',
    connections: {
      upstream: [],
      downstream: ['spring-backend'],
    },
  },
  {
    id: 'gemini-cloud',
    name: 'Google Gemini 1.5 Flash Cloud',
    tier: 'storage_ai',
    tierLabel: '04 // Storage & AI Cloud Tier',
    badge: 'Cloud Foundation Model',
    icon: 'cloud',
    technologies: ['Google Gemini 1.5 Flash API', 'Multimodal Vision', 'RAG Context Grounding'],
    responsibility: 'Real-time speech-to-text transcription, slide/whiteboard LaTeX formula extraction, RAG Q&A answers with exact transcript timestamp citations, 4-tier lecture summarization, and quiz generation.',
    systemRole: 'External multimodal cognitive engine queried securely with sanitized system prompts.',
    connections: {
      upstream: [],
      downstream: ['stt-router', 'spring-backend', 'python-ai'],
    },
  },
];

export const LectureLensArchitecture: React.FC = () => {
  const { isHacker } = useMode();
  const [activeNodeId, setActiveNodeId] = useState<string>('mediasoup-sfu');
  const [viewMode, setViewMode] = useState<'diagram' | 'spec'>('diagram');

  const activeNode = ARCHITECTURE_NODES.find(n => n.id === activeNodeId) || ARCHITECTURE_NODES[1];

  const getNodeIcon = (type: ArchitectureNode['icon']) => {
    switch (type) {
      case 'client': return <Radio className="w-4 h-4" />;
      case 'media': return <Activity className="w-4 h-4" />;
      case 'backend': return <Server className="w-4 h-4" />;
      case 'ai': return <Cpu className="w-4 h-4" />;
      case 'db': return <Database className="w-4 h-4" />;
      case 'cloud': return <Cloud className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  const isConnected = (id: string) => {
    if (id === activeNodeId) return true;
    return (
      activeNode.connections.upstream.includes(id) ||
      activeNode.connections.downstream.includes(id)
    );
  };

  return (
    <div 
      id="lecturelens-architecture"
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isHacker
          ? 'bg-[#050806] border-[#B7FF5A]/25 shadow-2xl shadow-black/80'
          : 'bg-[#0b0e14] border-white/10 shadow-2xl backdrop-blur-md'
      }`}
    >
      {/* Workstation Header */}
      <div className={`flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b ${
        isHacker
          ? 'bg-[#080d09] border-[#B7FF5A]/20'
          : 'bg-[#0f131c] border-white/10'
      }`}>
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isHacker ? 'bg-[#B7FF5A]' : 'bg-sky-400'
            }`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              isHacker ? 'bg-[#B7FF5A]' : 'bg-sky-500'
            }`} />
          </span>
          <div>
            <h4 className={`text-xs sm:text-sm font-bold font-mono tracking-wide ${
              isHacker ? 'text-[#B7FF5A]' : 'text-white'
            }`}>
              {isHacker ? 'LECTURELENS.SYS // SYSTEM_TOPOLOGY_V2' : 'LectureLens — Distributed System Architecture'}
            </h4>
            <span className="text-[10px] font-mono text-slate-400">
              Documented Full-Stack Topology: Mediasoup WebRTC SFU + Spring Boot 3.3 + Gemini AI + PostgreSQL
            </span>
          </div>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setViewMode('diagram')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
              viewMode === 'diagram'
                ? isHacker
                  ? 'bg-[#B7FF5A]/20 text-[#B7FF5A] border border-[#B7FF5A]/40'
                  : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                : 'text-slate-400 hover:text-white bg-white/[0.03]'
            }`}
            data-cursor="inspect"
          >
            Diagram View
          </button>
          <button
            onClick={() => setViewMode('spec')}
            className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
              viewMode === 'spec'
                ? isHacker
                  ? 'bg-[#B7FF5A]/20 text-[#B7FF5A] border border-[#B7FF5A]/40'
                  : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                : 'text-slate-400 hover:text-white bg-white/[0.03]'
            }`}
            data-cursor="inspect"
          >
            Specification View
          </button>
        </div>
      </div>

      {viewMode === 'diagram' ? (
        <div className="p-4 sm:p-6 space-y-6">
          
          {/* Top Instruction Pill */}
          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className={`w-3.5 h-3.5 ${isHacker ? 'text-[#B7FF5A]' : 'text-sky-400'}`} />
              <span>Click any service node below to inspect real data flows, responsibilities, and connections:</span>
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded border ${
              isHacker ? 'bg-[#080d09] border-[#B7FF5A]/20 text-[#B7FF5A]' : 'bg-white/5 border-white/10 text-slate-300'
            }`}>
              Active: {activeNode.name}
            </span>
          </div>

          {/* 4-Tier Interactive Node Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
            
            {/* TIER 1: CLIENT */}
            <div className="space-y-2.5">
              <span className={`text-[10px] font-mono uppercase tracking-wider block font-semibold ${
                isHacker ? 'text-[#B7FF5A]/80' : 'text-sky-400'
              }`}>
                01. Client Layer
              </span>
              {ARCHITECTURE_NODES.filter(n => n.tier === 'client').map(node => (
                <NodeCard
                  key={node.id}
                  node={node}
                  isActive={node.id === activeNodeId}
                  isConnected={isConnected(node.id)}
                  isHacker={isHacker}
                  onSelect={() => setActiveNodeId(node.id)}
                  icon={getNodeIcon(node.icon)}
                />
              ))}
            </div>

            {/* TIER 2: MEDIA & INGESTION */}
            <div className="space-y-2.5">
              <span className={`text-[10px] font-mono uppercase tracking-wider block font-semibold ${
                isHacker ? 'text-[#B7FF5A]/80' : 'text-emerald-400'
              }`}>
                02. Media SFU & Ingest
              </span>
              {ARCHITECTURE_NODES.filter(n => n.tier === 'media').map(node => (
                <NodeCard
                  key={node.id}
                  node={node}
                  isActive={node.id === activeNodeId}
                  isConnected={isConnected(node.id)}
                  isHacker={isHacker}
                  onSelect={() => setActiveNodeId(node.id)}
                  icon={getNodeIcon(node.icon)}
                />
              ))}
            </div>

            {/* TIER 3: CORE BACKEND & AI */}
            <div className="space-y-2.5">
              <span className={`text-[10px] font-mono uppercase tracking-wider block font-semibold ${
                isHacker ? 'text-[#B7FF5A]/80' : 'text-indigo-400'
              }`}>
                03. Backend Services
              </span>
              {ARCHITECTURE_NODES.filter(n => n.tier === 'backend').map(node => (
                <NodeCard
                  key={node.id}
                  node={node}
                  isActive={node.id === activeNodeId}
                  isConnected={isConnected(node.id)}
                  isHacker={isHacker}
                  onSelect={() => setActiveNodeId(node.id)}
                  icon={getNodeIcon(node.icon)}
                />
              ))}
            </div>

            {/* TIER 4: STORAGE & AI CLOUD */}
            <div className="space-y-2.5">
              <span className={`text-[10px] font-mono uppercase tracking-wider block font-semibold ${
                isHacker ? 'text-[#B7FF5A]/80' : 'text-purple-400'
              }`}>
                04. Data & Cloud AI
              </span>
              {ARCHITECTURE_NODES.filter(n => n.tier === 'storage_ai').map(node => (
                <NodeCard
                  key={node.id}
                  node={node}
                  isActive={node.id === activeNodeId}
                  isConnected={isConnected(node.id)}
                  isHacker={isHacker}
                  onSelect={() => setActiveNodeId(node.id)}
                  icon={getNodeIcon(node.icon)}
                />
              ))}
            </div>

          </div>

          {/* Active Node Detail Inspector Panel */}
          <div className={`p-5 rounded-xl border transition-all duration-200 ${
            isHacker
              ? 'bg-[#080d09] border-[#B7FF5A]/30 shadow-lg'
              : 'bg-[#10141f] border-white/10 shadow-xl'
          }`}>
            <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
                    isHacker
                      ? 'bg-[#B7FF5A]/10 border-[#B7FF5A]/30 text-[#B7FF5A]'
                      : 'bg-sky-500/10 border-sky-500/20 text-sky-300'
                  }`}>
                    {activeNode.tierLabel}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeNode.badge}
                  </span>
                </div>
                <h5 className={`text-base sm:text-lg font-bold font-mono ${
                  isHacker ? 'text-white' : 'text-white'
                }`}>
                  {activeNode.name}
                </h5>
              </div>

              {/* Technologies Tags */}
              <div className="flex flex-wrap gap-1.5">
                {activeNode.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isHacker
                        ? 'bg-[#050806] border-[#B7FF5A]/20 text-[#B7FF5A]'
                        : 'bg-white/5 border-white/10 text-slate-300'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 text-xs leading-relaxed">
              <div>
                <span className={`font-mono text-[10px] uppercase tracking-wider block mb-1 ${
                  isHacker ? 'text-[#B7FF5A]' : 'text-sky-400'
                }`}>
                  Engineering Responsibility:
                </span>
                <p className="text-slate-300">
                  {activeNode.responsibility}
                </p>
              </div>

              <div>
                <span className={`font-mono text-[10px] uppercase tracking-wider block mb-1 ${
                  isHacker ? 'text-[#B7FF5A]' : 'text-emerald-400'
                }`}>
                  Role in Multimodal Pipeline:
                </span>
                <p className="text-slate-300">
                  {activeNode.systemRole}
                </p>
              </div>
            </div>

            {/* Direct Connectors Info */}
            <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400">
              <span className="font-semibold text-slate-300">Upstream Dependencies:</span>
              <div className="flex flex-wrap gap-1">
                {activeNode.connections.upstream.length > 0 ? (
                  activeNode.connections.upstream.map(uId => {
                    const uNode = ARCHITECTURE_NODES.find(n => n.id === uId);
                    return (
                      <button
                        key={uId}
                        onClick={() => setActiveNodeId(uId)}
                        className={`px-2 py-0.5 rounded text-[10px] transition-colors border ${
                          isHacker
                            ? 'bg-[#050806] hover:bg-[#B7FF5A]/15 border-[#B7FF5A]/25 text-[#B7FF5A]'
                            : 'bg-white/5 hover:bg-white/10 border-white/10 text-sky-300'
                        }`}
                        data-cursor="inspect"
                      >
                        {uNode?.name || uId} ↗
                      </button>
                    );
                  })
                ) : (
                  <span className="text-slate-500 text-[10px]">None (Root Sink)</span>
                )}
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Specification View (Accessible Tabular View) */
        <div className="p-4 sm:p-6 overflow-x-auto text-xs font-mono">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b ${isHacker ? 'border-[#B7FF5A]/20 text-[#B7FF5A]' : 'border-white/10 text-sky-400'}`}>
                <th className="py-2.5 px-3">Service Node</th>
                <th className="py-2.5 px-3">Port / Scope</th>
                <th className="py-2.5 px-3">Stack</th>
                <th className="py-2.5 px-3">Core Responsibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {ARCHITECTURE_NODES.map(node => (
                <tr key={node.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-2.5 px-3 font-bold text-white whitespace-nowrap">
                    {node.name}
                  </td>
                  <td className="py-2.5 px-3 text-[11px] text-slate-400 whitespace-nowrap">
                    {node.badge}
                  </td>
                  <td className="py-2.5 px-3 text-[11px] whitespace-nowrap">
                    {node.technologies.slice(0, 3).join(', ')}
                  </td>
                  <td className="py-2.5 px-3 text-[11px] leading-relaxed">
                    {node.responsibility}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

interface NodeCardProps {
  node: ArchitectureNode;
  isActive: boolean;
  isConnected: boolean;
  isHacker: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
}

const NodeCard: React.FC<NodeCardProps> = ({
  node,
  isActive,
  isConnected,
  isHacker,
  onSelect,
  icon,
}) => {
  return (
    <button
      onClick={onSelect}
      className={`w-full p-3 rounded-xl border text-left transition-all duration-200 relative group ${
        isActive
          ? isHacker
            ? 'bg-[#B7FF5A]/15 border-[#B7FF5A] shadow-md shadow-[#B7FF5A]/20 ring-1 ring-[#B7FF5A]/40'
            : 'bg-sky-500/20 border-sky-400 shadow-md shadow-sky-950/40 ring-1 ring-sky-400/40'
          : isConnected
          ? isHacker
            ? 'bg-[#080d09] border-[#B7FF5A]/30 hover:border-[#B7FF5A]/60'
            : 'bg-[#10141e] border-white/15 hover:border-white/30'
          : isHacker
          ? 'bg-[#050806] border-white/5 opacity-70 hover:opacity-100'
          : 'bg-[#0d1017] border-white/5 opacity-70 hover:opacity-100'
      }`}
      data-cursor="inspect"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className={`p-1 rounded-md ${
          isActive 
            ? isHacker ? 'bg-[#B7FF5A]/20 text-[#B7FF5A]' : 'bg-sky-500/20 text-sky-300'
            : 'bg-white/5 text-slate-400'
        }`}>
          {icon}
        </div>
        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
          isActive
            ? isHacker ? 'bg-[#B7FF5A] text-black font-bold' : 'bg-sky-400 text-black font-bold'
            : 'bg-white/5 text-slate-400'
        }`}>
          {node.badge}
        </span>
      </div>

      <div className={`text-xs font-bold font-mono leading-snug line-clamp-2 ${
        isActive
          ? isHacker ? 'text-[#B7FF5A]' : 'text-white'
          : 'text-slate-200 group-hover:text-white'
      }`}>
        {node.name}
      </div>

      <div className="text-[10px] text-slate-400 font-mono mt-1 line-clamp-1">
        {node.technologies.slice(0, 2).join(' · ')}
      </div>
    </button>
  );
};
