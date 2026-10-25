import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './Icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-white/10 bg-[#06070a] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Left: Identity & Year */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-center gap-2 font-mono text-sm font-semibold text-white">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              <span>{personalInfo.name}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">© {currentYear}</span>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Designed with precision · Built with React 19, TypeScript & Tailwind CSS
            </p>
          </div>

          {/* Center/Right: Socials & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
                title="GitHub @Sai600858"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-sky-400 border border-white/10 transition-colors"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.leetcode}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-amber-400 border border-white/10 transition-colors"
                title="LeetCode Knight"
                aria-label="LeetCode Profile"
              >
                <LeetCodeIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="h-5 w-px bg-white/10" />

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-colors group"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
