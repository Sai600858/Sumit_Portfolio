import React from 'react';
import { 
  FileDown, 
  ArrowRight, 
  Mail, 
  Award, 
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background Subtle Gradient & Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Intro */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-400 uppercase tracking-wider font-semibold text-[11px]">
                COMPUTER ENGINEERING · PICT PUNE
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-sky-400 font-medium text-[11px]">2023–2027</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-indigo-300">
                  {personalInfo.name}
                </span>
                .
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-300 leading-snug">
                {personalInfo.headline}
              </p>
            </div>

            {/* Supporting Bio */}
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
              {personalInfo.subheadline}
            </p>

            {/* Resume Verified Metric Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-2.5 rounded-xl bg-[#0f121a]/80 border border-white/10 flex flex-col">
                <span className="text-xs font-mono text-slate-400">Academic CGPA</span>
                <span className="text-lg sm:text-xl font-bold text-sky-400 font-mono">9.45<span className="text-xs text-slate-500">/10</span></span>
                <span className="text-[10px] text-slate-500">PICT Pune</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0f121a]/80 border border-amber-500/20 flex flex-col">
                <span className="text-xs font-mono text-amber-400/90 flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" /> LeetCode
                </span>
                <span className="text-lg sm:text-xl font-bold text-amber-300 font-mono">Knight</span>
                <span className="text-[10px] text-slate-500">1950 Max Rating</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0f121a]/80 border border-white/10 flex flex-col">
                <span className="text-xs font-mono text-slate-400">DSA Solved</span>
                <span className="text-lg sm:text-xl font-bold text-emerald-400 font-mono">700+</span>
                <span className="text-[10px] text-slate-500">LeetCode + CodeChef</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0f121a]/80 border border-sky-500/20 flex flex-col">
                <span className="text-xs font-mono text-sky-400">CodeChef</span>
                <span className="text-lg sm:text-xl font-bold text-sky-300 font-mono">3-Star</span>
                <span className="text-[10px] text-slate-500">1650 Max Rating</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-black font-semibold text-sm shadow-glow-sky transition-all duration-200"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.resumeUrl}
                download="Sumit-Karkhile-Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-medium text-sm border border-white/15 hover:border-sky-500/40 transition-all duration-200"
              >
                <FileDown className="w-4 h-4 text-sky-400" />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-300 hover:text-white font-medium text-sm hover:bg-white/5 transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Verified Social Profile Icons */}
            <div className="pt-2 flex items-center gap-3 text-slate-400 text-xs">
              <span className="font-mono text-slate-500">Profiles:</span>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors"
                title="GitHub @Sai600858"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-sky-400 border border-white/10 transition-colors"
                title="LinkedIn Sumit Karkhile"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.leetcode}
                target="_blank"
                rel="noreferrer noopener"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-amber-400 border border-white/10 transition-colors"
                title="LeetCode @sumit_307 (Knight 1950)"
                aria-label="LeetCode Profile"
              >
                <LeetCodeIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.codechef}
                target="_blank"
                rel="noreferrer noopener"
                className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-sky-300 border border-white/10 text-xs font-mono font-medium transition-colors"
                title="CodeChef @sai_812 (3-Star)"
                aria-label="CodeChef Profile"
              >
                CodeChef
              </a>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Pune, India</span>
              </div>
            </div>

          </div>

          {/* Right Column: Prominent Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm sm:max-w-md w-full">
              
              {/* Soft ambient back glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-sky-600/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition duration-500"></div>

              {/* Main Photo Card Frame */}
              <div className="relative rounded-2xl bg-[#0e1017] border border-white/10 p-3 sm:p-3.5 shadow-2xl">
                
                {/* Photo Container */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                  <img
                    src={personalInfo.profilePhoto}
                    alt="Sumit Karkhile - Software Engineer & Backend Developer"
                    className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500"
                    loading="eager"
                  />
                  
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* Top-Right Badge: PICT */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/75 border border-white/15 backdrop-blur-md text-[11px] font-mono text-slate-200 flex items-center gap-1.5 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                    <span>PICT 2027</span>
                  </div>

                  {/* Bottom Overlay Info */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0c0e14]/90 border border-white/10 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-white">Sumit Karkhile</div>
                        <div className="text-[10px] text-slate-400 font-mono">Computer Engineering · Pune</div>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Available SDE</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Tech Chips around photo */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                  <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-slate-300">
                    <span className="text-sky-400 font-semibold">Java 21</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-slate-300">
                    <span className="text-emerald-400 font-semibold">Spring Boot</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-slate-300">
                    <span className="text-indigo-300 font-semibold">React 19</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
