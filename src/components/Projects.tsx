import React, { useState, useEffect, lazy, Suspense } from 'react';
import { projectsData } from '../data/portfolioData';
import type { Project } from '../types/portfolio';
import { ExternalLink, ArrowRight, Zap, Clock, Network } from 'lucide-react';

const ProjectModal = lazy(() => import('./ProjectModal').then(m => ({ default: m.ProjectModal })));
const LectureLensArchitecture = lazy(() => import('./LectureLensArchitecture').then(m => ({ default: m.LectureLensArchitecture })));
import { GithubIcon } from './Icons';
import { useMode } from '../context/ModeContext';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showArchExplorer, setShowArchExplorer] = useState<boolean>(true);
  const { isHacker } = useMode();

  // Listen to open-project-modal event from terminal or other components
  useEffect(() => {
    const handleOpenModal = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const pId = customEvent.detail;
      const found = projectsData.find(p => p.id === pId);
      if (found) setActiveProject(found);
    };
    window.addEventListener('open-project-modal', handleOpenModal);
    return () => window.removeEventListener('open-project-modal', handleOpenModal);
  }, []);

  const categories = ['All', 'Full-Stack', 'AI / ML', 'Systems'];

  // Separate BE featured project from rest
  const beProject = projectsData.find(p => p.isFeaturedBE);
  const otherProjects = projectsData.filter(p => !p.isFeaturedBE);

  const filteredProjects = selectedCategory === 'All'
    ? otherProjects
    : otherProjects.filter(p => p.category === selectedCategory);

  const accent = isHacker ? {
    pill: 'bg-[#B7FF5A]/10 border-[#B7FF5A]/25 text-[#B7FF5A]',
    text: 'text-[#B7FF5A]',
    border: 'border-[#B7FF5A]/30',
    badgeBg: 'bg-[#B7FF5A]/10 border-[#B7FF5A]/30 text-[#B7FF5A]',
    btn: 'bg-gradient-to-r from-[#B7FF5A] to-[#8ae032] hover:from-[#c8ff75] hover:to-[#9df245] text-black font-mono font-bold shadow-md shadow-[#B7FF5A]/20',
    ghost: 'bg-[#B7FF5A]/10 hover:bg-[#B7FF5A]/20 text-[#B7FF5A] border-[#B7FF5A]/30 font-mono',
    tag: 'bg-[#050806] border-[#B7FF5A]/20 text-[#B7FF5A]',
    card: 'bg-[#050806]/90 border-[#B7FF5A]/20 hover:border-[#B7FF5A]/50 shadow-black/80',
    arrow: 'text-[#B7FF5A] hover:text-white',
    active: 'bg-[#B7FF5A] text-black font-bold shadow-md shadow-[#B7FF5A]/20',
    glow: 'from-[#B7FF5A]/20 via-[#8ae032]/10 to-[#B7FF5A]/5',
  } : {
    pill: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
    text: 'text-sky-400',
    border: 'border-sky-500/30',
    badgeBg: 'bg-sky-500/10 border-sky-500/30 text-sky-300',
    btn: 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-black',
    ghost: 'bg-white/[0.08] hover:bg-white/[0.14] text-white border-white/15 hover:border-sky-500/40',
    tag: 'bg-white/[0.04] border-white/5 text-slate-300',
    card: 'bg-[#0e1118]/80 border-white/10 hover:border-sky-500/30',
    arrow: 'text-sky-400 hover:text-sky-300',
    active: 'bg-sky-500 text-black font-semibold shadow-glow-sky',
    glow: 'from-sky-500/20 via-indigo-500/15 to-sky-600/10',
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono ${accent.pill}`}>
              <span>{isHacker ? '> 04 // FEATURED ENGINEERING PROJECTS' : '04 // FEATURED ENGINEERING PROJECTS'}</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${isHacker ? 'text-green-100' : 'text-white'}`}>
              Systems, Toolkits & Architectures
            </h2>
            <p className={`text-sm max-w-xl ${isHacker ? 'text-green-400/70' : 'text-slate-400'}`}>
              Real projects engineered with Java 21, Spring Boot, React, relational databases, and pragmatic AI integrations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className={`flex flex-wrap gap-1.5 p-1 rounded-xl border ${isHacker ? 'bg-[#011001] border-green-500/20' : 'bg-[#12141c] border-white/10'}`}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedCategory === cat
                    ? accent.active
                    : isHacker ? 'text-green-400/60 hover:text-green-300 hover:bg-green-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            FEATURED BE PROJECT — Full-Width Hero Card
        ═══════════════════════════════════════════════════ */}
        {beProject && (selectedCategory === 'All' || selectedCategory === beProject.category) && (
          <div className={`relative rounded-2xl border overflow-hidden mb-8 group transition-all duration-300 ${
            isHacker
              ? 'bg-[#010f01]/90 border-green-500/25 hover:border-green-400/50 shadow-[0_0_40px_rgba(0,255,65,0.05)]'
              : 'bg-[#0b0f1a]/90 border-white/10 hover:border-sky-500/30 shadow-2xl'
          }`}>

            {/* Ambient top glow */}
            <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent.glow} opacity-60`} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

              {/* LEFT: Banner image */}
              <div className="relative overflow-hidden min-h-[260px] lg:min-h-[380px]">
                {beProject.bannerImage ? (
                  <img
                    src={beProject.bannerImage}
                    alt="LectureLens Platform Screenshot"
                    className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${isHacker ? 'bg-[#011001]' : 'bg-[#0d1117]'}`}>
                    <Zap className={`w-16 h-16 opacity-20 ${accent.text}`} />
                  </div>
                )}
                {/* Gradient overlay toward right */}
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  isHacker ? 'from-transparent to-[#010f01]' : 'from-transparent to-[#0b0f1a]'
                } opacity-70 pointer-events-none`} />
                {/* Bottom gradient */}
                <div className={`absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t ${
                  isHacker ? 'from-[#010f01]' : 'from-[#0b0f1a]'
                } to-transparent pointer-events-none`} />

                {/* In Progress badge on image */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-mono font-semibold">
                  <Clock className="w-3 h-3" />
                  <span>IN PROGRESS</span>
                </div>
              </div>

              {/* RIGHT: Content */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  {/* Top labels */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-semibold ${
                      isHacker ? 'bg-green-500/15 border-green-400/40 text-green-300' : 'bg-violet-500/15 border-violet-400/40 text-violet-300'
                    }`}>
                      🎓 Final-Year BE Capstone
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono ${accent.pill}`}>
                      {beProject.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
                      isHacker ? 'bg-green-500/5 text-green-600' : 'bg-white/5 text-slate-500'
                    }`}>
                      {beProject.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-1 ${
                    isHacker ? 'text-green-100' : 'text-white'
                  } group-hover:${accent.text} transition-colors`}>
                    {beProject.title}
                  </h3>
                  <p className={`text-sm font-mono mb-4 ${accent.text}`}>{beProject.tagline}</p>

                  {/* Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-5 line-clamp-4 ${
                    isHacker ? 'text-green-300/80' : 'text-slate-300/90'
                  }`}>
                    {beProject.description}
                  </p>

                  {/* Top 4 features */}
                  <div className="space-y-2 mb-6">
                    {beProject.features.slice(0, 4).map((feat, i) => (
                      <div key={i} className={`flex items-start gap-2 text-xs ${isHacker ? 'text-green-300/80' : 'text-slate-400'}`}>
                        <span className={`mt-0.5 shrink-0 ${accent.text}`}>❯</span>
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                    <p className={`text-xs font-mono ${isHacker ? 'text-green-600' : 'text-slate-600'}`}>
                      + {beProject.features.length - 4} more capabilities →
                    </p>
                  </div>
                </div>

                {/* Bottom: tech tags + actions */}
                <div className={`pt-4 border-t space-y-4 ${isHacker ? 'border-green-500/15' : 'border-white/10'}`}>
                  <div className="flex flex-wrap gap-1.5">
                    {beProject.technologies.slice(0, 8).map((tech, i) => (
                      <span key={i} className={`px-2 py-0.5 rounded-md border text-[11px] font-mono ${accent.tag}`}>
                        {tech}
                      </span>
                    ))}
                    {beProject.technologies.length > 8 && (
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono ${isHacker ? 'text-green-600' : 'text-slate-500'}`}>
                        +{beProject.technologies.length - 8} more
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setActiveProject(beProject)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-xs transition-all duration-200 ${accent.btn}`}
                      data-cursor="btn"
                    >
                      <span>{isHacker ? '$ ./architecture.sh' : 'Full Architecture Deep-Dive'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setShowArchExplorer(!showArchExplorer)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs border transition-all ${accent.ghost}`}
                      data-cursor="inspect"
                    >
                      <Network className="w-3.5 h-3.5" />
                      <span>{showArchExplorer ? 'Hide Topology Diagram' : 'Inspect 4-Tier Topology'}</span>
                    </button>

                    {beProject.githubUrl && (
                      <a
                        href={beProject.githubUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs border transition-all ${accent.ghost}`}
                        data-cursor="ext"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LectureLens 4-Tier Interactive Architecture Topology */}
        {showArchExplorer && (
          <div className="mb-14">
            <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-500 font-mono text-xs">Loading architecture diagram...</div>}>
              <LectureLensArchitecture />
            </Suspense>
          </div>
        )}

        {/* ══════════════════════════════
            Other Project Cards Grid
        ══════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-all duration-300 shadow-xl group ${accent.card}`}
              data-cursor="view"
            >
              <div>
                {/* Card Top Pill & Year */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-medium ${accent.pill}`}>
                      {project.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full border text-[11px] font-mono ${
                      isHacker ? 'bg-green-500/5 border-green-500/10 text-green-600' : 'bg-white/5 border-white/10 text-slate-400'
                    }`}>
                      {project.year}
                    </span>
                  </div>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isHacker
                          ? 'bg-green-500/5 hover:bg-green-500/15 text-green-400 hover:text-green-300 border-green-500/20'
                          : 'bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white border-white/10'
                      }`}
                      title="View GitHub Repository"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Title & Tagline */}
                <h3 className={`text-xl sm:text-2xl font-bold transition-colors mb-1 ${
                  isHacker ? 'text-green-100 group-hover:text-green-300' : 'text-white group-hover:text-sky-300'
                }`}>
                  {project.title}
                </h3>
                <p className={`text-xs sm:text-sm font-mono mt-1 mb-3 ${accent.text} opacity-80`}>
                  {project.tagline}
                </p>

                {/* Description */}
                <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${isHacker ? 'text-green-300/80' : 'text-slate-300/90'}`}>
                  {project.description}
                </p>

                {/* Top Features */}
                <div className="space-y-1.5 mb-6">
                  {project.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className={`flex items-start gap-2 text-xs ${isHacker ? 'text-green-300/70' : 'text-slate-400'}`}>
                      <span className={`mt-0.5 ${accent.text}`}>❯</span>
                      <span className="line-clamp-2">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tech Tags & Action */}
              <div className={`pt-4 border-t space-y-4 ${isHacker ? 'border-green-500/15' : 'border-white/10'}`}>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 6).map((tech, i) => (
                    <span key={i} className={`px-2 py-0.5 rounded-md border text-[11px] font-mono ${accent.tag}`}>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 6 && (
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono ${isHacker ? 'text-green-600' : 'text-slate-500'}`}>
                      +{project.technologies.length - 6} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setActiveProject(project)}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold font-mono transition-colors group/btn ${accent.arrow}`}
                  >
                    <span>{isHacker ? '$ deep_dive' : 'Architecture Deep-Dive'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={`inline-flex items-center gap-1 text-[11px] font-mono transition-colors ${
                        isHacker ? 'text-green-500/70 hover:text-green-300' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>Code</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Deep-Dive Modal */}
      <Suspense fallback={null}>
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </Suspense>
    </section>
  );
};
