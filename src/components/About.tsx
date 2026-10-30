import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { Server, Cpu, Brain, Rocket, CheckCircle } from 'lucide-react';
import { useMode } from '../context/ModeContext';
import { DecryptedText } from './DecryptedText';

export const About: React.FC = () => {
  const { isHacker } = useMode();

  const highlights = [
    {
      icon: <Server className={`w-5 h-5 ${isHacker ? 'text-[#B7FF5A]' : 'text-sky-400'}`} />,
      title: 'Backend Engineering',
      desc: 'Architecting secure Spring Boot microservices, RESTful APIs, JWT authentication, and transactional MySQL/PostgreSQL persistence.'
    },
    {
      icon: <Cpu className={`w-5 h-5 ${isHacker ? 'text-emerald-400' : 'text-amber-400'}`} />,
      title: 'Algorithmic Problem Solving',
      desc: 'LeetCode Knight (1950 max rating) with 700+ solved algorithmic problems focusing on graphs, dynamic programming, and optimal complexity.'
    },
    {
      icon: <Brain className={`w-5 h-5 ${isHacker ? 'text-cyan-400' : 'text-emerald-400'}`} />,
      title: 'AI & Document Systems',
      desc: 'Integrating Google Gemini API for conversational RAG document chat and Sentence-BERT transformers for semantic matching.'
    },
    {
      icon: <Rocket className={`w-5 h-5 ${isHacker ? 'text-[#B7FF5A]' : 'text-indigo-400'}`} />,
      title: 'Production Deployment',
      desc: 'Containerizing Java backends with Docker, orchestrating GitHub Actions CI/CD pipelines, and deploying to AWS EC2 behind Nginx.'
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-12">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono ${
            isHacker ? 'bg-[#B7FF5A]/10 border-[#B7FF5A]/30 text-[#B7FF5A]' : 'bg-white/[0.04] border-white/10 text-sky-400'
          }`}>
            <span>{isHacker ? '> 01 // SYSTEM_PROFILE' : '01 // ABOUT ME'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            <DecryptedText 
              text={isHacker ? "Kernel philosophy & algorithmic systems from first principles." : "Engineering reliable software from first principles."} 
              trigger={isHacker}
            />
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-5 text-slate-300 text-sm sm:text-base leading-relaxed">
            {personalInfo.aboutBio.map((paragraph, index) => (
              <p key={index} className="text-slate-300/90">
                {paragraph}
              </p>
            ))}

            <div className="pt-4 border-t border-white/10">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Core Engineering Values
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Strict data integrity & concurrency safety',
                  'Clean layered architecture & OOP principles',
                  'End-to-end security (JWT, RBAC, HTTPS)',
                  'Automated builds, Dockerization & CI/CD'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
                    <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Highlights Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[#0e1118]/80 border border-white/10 hover:border-white/20 transition-all duration-200 group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10 group-hover:scale-105 transition-transform shrink-0">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
