import React from 'react';
import { experienceData } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-sky-400">
            <span>03 // EXPERIENCE & INTERNSHIPS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Applied Engineering & Research
          </h2>
        </div>

        {/* Experience Timeline / Cards */}
        <div className="space-y-6">
          {experienceData.map((exp, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-2xl bg-[#0e1118]/80 border border-white/10 relative overflow-hidden group hover:border-sky-500/30 transition-all duration-300 shadow-xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                
                {/* Role & Company */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm sm:text-base font-semibold text-slate-300 flex items-center gap-2">
                      <span>{exp.company}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs font-mono text-sky-400">{exp.type}</span>
                    </div>
                  </div>
                </div>

                {/* Date & Location Pill */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{exp.location}</span>
                  </div>
                </div>

              </div>

              {/* Summary */}
              <p className="text-sm text-slate-300/90 leading-relaxed mb-5">
                {exp.description}
              </p>

              {/* Verified Contributions */}
              <div className="space-y-2.5 mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Key Technical Contributions:
                </h4>
                <ul className="space-y-2">
                  {exp.contributions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-normal">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Used */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-500 mr-2">Tech Stack:</span>
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
