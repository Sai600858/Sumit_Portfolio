import React from 'react';
import { leadershipData } from '../data/portfolioData';
import { Users, Award, CheckCircle2, Flag } from 'lucide-react';

export const Leadership: React.FC = () => {
  return (
    <section id="leadership" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-sky-400">
            <span>07 // LEADERSHIP & HACKATHONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Hackathons & Campus Leadership
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Demonstrated technical coordination, national-level hackathon participation, and inter-collegiate event management.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadershipData.map((item, index) => (
            <div
              key={index}
              className="p-6 sm:p-7 rounded-2xl bg-[#0e1118]/80 border border-white/10 hover:border-sky-500/30 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:scale-105 transition-transform">
                      {index === 0 ? <Award className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                        {item.title}
                      </h3>
                      <div className="text-xs font-mono text-sky-400/90 font-medium">
                        {item.role}
                      </div>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono">
                    {item.period}
                  </span>
                </div>

                {/* Organization & Description */}
                <div className="text-xs font-mono text-slate-500 mb-2">
                  Organization: {item.organization}
                </div>
                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Impact bullets */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Impact & Responsibilities:
                  </h4>
                  <ul className="space-y-1.5">
                    {item.impact.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                <Flag className="w-3 h-3 text-sky-400" />
                <span>Verified resume credential</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
