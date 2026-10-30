import React from 'react';
import { educationData } from '../data/portfolioData';
import { GraduationCap, MapPin, Calendar, Award, BookOpen } from 'lucide-react';
import { useMode } from '../context/ModeContext';

export const Education: React.FC = () => {
  const { isHacker } = useMode();

  return (
    <section id="education" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-10">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border ${
            isHacker 
              ? 'bg-green-500/10 border-green-500/30 text-green-300' 
              : 'bg-white/[0.04] border-white/10 text-sky-400'
          }`}>
            <span>{isHacker ? '> 02 // ACADEMIC FOUNDATION' : '02 // ACADEMIC FOUNDATION'}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight transition-colors duration-500 ${
            isHacker ? 'text-green-100 font-mono' : 'text-white'
          }`}>
            {isHacker ? '> Education.getDetails()' : 'Education & Core Computer Science'}
          </h2>
        </div>

        {/* Institution Card */}
        <div className={`p-6 sm:p-8 rounded-2xl border relative overflow-hidden group transition-all duration-300 shadow-xl ${
          isHacker 
            ? 'bg-[#010a01]/80 border-green-500/20 hover:border-green-400/40 shadow-green-950/20' 
            : 'bg-[#0e1118]/80 border-white/10 hover:border-sky-500/30 shadow-black/40'
        }`}>
          <div className={`absolute top-0 right-0 w-80 h-80 blur-[80px] rounded-full pointer-events-none ${
            isHacker ? 'bg-green-500/5' : 'bg-sky-500/5'
          }`} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
            
            {/* Left: Institution info */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className={`p-3 rounded-xl border ${
                  isHacker 
                    ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                    : 'bg-sky-500/10 border-sky-500/20 text-sky-400'
                }`}>
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${
                    isHacker ? 'text-green-200 font-mono' : 'text-white'
                  }`}>
                    {educationData.institution}
                  </h3>
                  <div className={`text-sm sm:text-base font-semibold ${
                    isHacker ? 'text-green-400 font-mono' : 'text-sky-400'
                  }`}>
                    {educationData.degree}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{educationData.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{educationData.location}</span>
                </div>
                <div className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${
                  isHacker 
                    ? 'bg-green-500/10 text-green-300 border-green-500/30 font-mono' 
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {educationData.status}
                </div>
              </div>

              {/* Verified Highlights */}
              <div className="space-y-2 pt-2">
                <h4 className={`text-xs font-mono uppercase tracking-wider ${
                  isHacker ? 'text-green-500' : 'text-slate-400'
                }`}>
                  Academic Milestones
                </h4>
                <ul className="space-y-1.5">
                  {educationData.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                        isHacker ? 'bg-green-400' : 'bg-sky-400'
                      }`}></span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Coursework Badges */}
              <div className="pt-2">
                <h4 className={`text-xs font-mono uppercase tracking-wider mb-2.5 flex items-center gap-1.5 ${
                  isHacker ? 'text-green-500' : 'text-slate-400'
                }`}>
                  <BookOpen className={`w-3.5 h-3.5 ${isHacker ? 'text-green-400' : 'text-sky-400'}`} />
                  <span>Key Coursework</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {educationData.coursework.map((c, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-mono ${
                        isHacker
                          ? 'bg-green-500/[0.04] border-green-500/20 text-green-300'
                          : 'bg-white/[0.03] border-white/5 text-slate-300'
                      }`}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Verified CGPA Score Box */}
            <div className={`lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl border text-center ${
              isHacker
                ? 'bg-[#011401]/90 border-green-500/30'
                : 'bg-[#141724]/90 border-white/10'
            }`}>
              <span className={`text-xs font-mono uppercase tracking-widest mb-1 ${
                isHacker ? 'text-green-400' : 'text-slate-400'
              }`}>
                Cumulative GPA
              </span>
              <div className={`text-4xl sm:text-5xl font-extrabold font-mono ${
                isHacker 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300' 
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300'
              }`}>
                9.45
              </div>
              <span className="text-xs text-slate-500 font-mono mt-1">Scale of 10.0</span>
              
              <div className="mt-4 pt-4 border-t border-white/10 w-full flex items-center justify-center gap-2 text-xs text-slate-300">
                <Award className={`w-4 h-4 ${isHacker ? 'text-green-400' : 'text-amber-400'}`} />
                <span>Premier Engineering Institute</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
