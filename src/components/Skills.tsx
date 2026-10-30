import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';
import { 
  Code2, 
  Server, 
  Layout, 
  Database, 
  Cloud, 
  Wrench, 
  Cpu,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useMode } from '../context/ModeContext';
import { DecryptedText } from './DecryptedText';

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const { isHacker } = useMode();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className={`w-5 h-5 ${isHacker ? 'text-[#B7FF5A]' : 'text-amber-400'}`} />;
      case 'Server': return <Server className={`w-5 h-5 ${isHacker ? 'text-emerald-400' : 'text-sky-400'}`} />;
      case 'Layout': return <Layout className={`w-5 h-5 ${isHacker ? 'text-cyan-400' : 'text-indigo-400'}`} />;
      case 'Database': return <Database className={`w-5 h-5 ${isHacker ? 'text-[#B7FF5A]' : 'text-emerald-400'}`} />;
      case 'Cloud': return <Cloud className={`w-5 h-5 ${isHacker ? 'text-cyan-400' : 'text-cyan-400'}`} />;
      case 'Wrench': return <Wrench className={`w-5 h-5 ${isHacker ? 'text-emerald-400' : 'text-rose-400'}`} />;
      case 'Cpu': return <Cpu className={`w-5 h-5 ${isHacker ? 'text-[#B7FF5A]' : 'text-purple-400'}`} />;
      default: return <Sparkles className={`w-5 h-5 ${isHacker ? 'text-[#B7FF5A]' : 'text-sky-400'}`} />;
    }
  };

  const tabs = ['All', 'Backend', 'Languages', 'Frontend', 'Databases & Cloud', 'Core CS'];

  const filteredCategories = skillsData.filter((cat) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Backend') return cat.title.includes('Backend');
    if (activeTab === 'Languages') return cat.title.includes('Languages');
    if (activeTab === 'Frontend') return cat.title.includes('Frontend');
    if (activeTab === 'Databases & Cloud') return cat.title.includes('Databases') || cat.title.includes('Cloud');
    if (activeTab === 'Core CS') return cat.title.includes('Core Computer');
    return true;
  });

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono ${
              isHacker ? 'bg-[#B7FF5A]/10 border-[#B7FF5A]/30 text-[#B7FF5A]' : 'bg-white/[0.04] border-white/10 text-sky-400'
            }`}>
              <span>{isHacker ? '> 05 // SYSTEM_CAPABILITIES' : '05 // TECHNICAL CAPABILITIES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              <DecryptedText 
                text={isHacker ? "System Stack & Engineering Matrix" : "Skills & Technology Matrix"}
                trigger={isHacker}
              />
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Categorized technical competencies verified by real software projects, competitive programming, and academic foundations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className={`flex flex-wrap gap-1.5 p-1 rounded-xl border ${
            isHacker ? 'bg-[#030804] border-[#B7FF5A]/30' : 'bg-[#12141c] border-white/10'
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeTab === tab
                    ? isHacker 
                      ? 'bg-[#B7FF5A] text-black font-bold shadow-[0_0_12px_rgba(183,255,90,0.3)]' 
                      : 'bg-sky-500 text-black font-semibold shadow-glow-sky'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl border transition-all duration-200 group flex flex-col justify-between ${
                isHacker 
                  ? 'bg-[#050a06]/90 border-[#B7FF5A]/20 hover:border-[#B7FF5A]/50 hover:shadow-[0_4px_25px_rgba(183,255,90,0.06)]' 
                  : 'bg-[#0e1118]/80 border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl border group-hover:scale-105 transition-transform ${
                    isHacker ? 'bg-[#B7FF5A]/10 border-[#B7FF5A]/30' : 'bg-white/[0.04] border-white/10'
                  }`}>
                    {getIcon(cat.iconName)}
                  </div>
                  <h3 className={`text-base font-bold transition-colors ${
                    isHacker ? 'text-white group-hover:text-[#B7FF5A]' : 'text-white group-hover:text-sky-300'
                  }`}>
                    {cat.title}
                  </h3>
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                        skill.highlight
                          ? isHacker 
                            ? 'bg-[#B7FF5A]/15 border border-[#B7FF5A]/35 text-[#B7FF5A] font-semibold' 
                            : 'bg-sky-500/10 border border-sky-500/30 text-sky-300 font-medium'
                          : isHacker
                            ? 'bg-black/40 border border-emerald-950/80 text-slate-300 hover:border-[#B7FF5A]/30'
                            : 'bg-white/[0.03] border border-white/5 text-slate-300 hover:border-white/15'
                      }`}
                    >
                      {skill.highlight && (
                        <span className={`w-1 h-1 rounded-full ${isHacker ? 'bg-[#B7FF5A] shadow-[0_0_4px_#B7FF5A]' : 'bg-sky-400'}`}></span>
                      )}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{cat.skills.length} competencies</span>
                {cat.skills.some(s => s.highlight) && (
                  <span className={`flex items-center gap-1 ${isHacker ? 'text-[#B7FF5A]/90' : 'text-sky-400/80'}`}>
                    <CheckCircle2 className="w-3 h-3" /> Primary focus
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
