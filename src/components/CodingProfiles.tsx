import React from 'react';
import { codingProfilesData } from '../data/portfolioData';
import { Award, Code2, ExternalLink, Flame, CheckCircle, Trophy } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './Icons';
import { useMode } from '../context/ModeContext';
import { DecryptedText } from './DecryptedText';

export const CodingProfiles: React.FC = () => {
  const { isHacker } = useMode();

  return (
    <section id="profiles" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-12">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono ${
            isHacker ? 'bg-[#B7FF5A]/10 border-[#B7FF5A]/30 text-[#B7FF5A]' : 'bg-white/[0.04] border-white/10 text-sky-400'
          }`}>
            <span>{isHacker ? '> 06 // ALGORITHMIC_TELEMETRY' : '06 // COMPETITIVE PROGRAMMING & PROFILES'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            <DecryptedText 
              text={isHacker ? "Algorithmic Complexity & Competitive Benchmarks" : "Problem Solving & Algorithmic Grit"}
              trigger={isHacker}
            />
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl">
            Verified competitive programming ratings across LeetCode and CodeChef with over 700+ algorithmic problems solved.
          </p>
        </div>

        {/* Global Stats Callout Banner */}
        <div className={`p-6 sm:p-8 rounded-2xl border shadow-2xl mb-10 ${
          isHacker 
            ? 'bg-gradient-to-r from-[#030904] via-[#050e06] to-[#030904] border-[#B7FF5A]/30 shadow-[#B7FF5A]/5'
            : 'bg-gradient-to-r from-[#121624] via-[#0e111a] to-[#121624] border-sky-500/20'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            
            <div className="pt-4 sm:pt-0 sm:px-4 first:pl-0">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-amber-400 mb-1">
                <Trophy className="w-4 h-4" />
                <span>LEETCODE KNIGHT</span>
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">
                1950
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Peak rating (Top ~5% globally)
              </div>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-4">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-emerald-400 mb-1">
                <Flame className="w-4 h-4" />
                <span>DSA PROBLEMS SOLVED</span>
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">
                700+
              </div>
              <div className="text-xs text-slate-400 mt-1">
                LeetCode & CodeChef combined
              </div>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-4">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-sky-400 mb-1">
                <Award className="w-4 h-4" />
                <span>CODECHEF 3-STAR</span>
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">
                1650
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Division 2 contest competitor
              </div>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-4">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-indigo-400 mb-1">
                <Code2 className="w-4 h-4" />
                <span>CORE STRENGTHS</span>
              </div>
              <div className="text-lg font-bold text-white font-mono mt-1">
                Graphs & DP
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Binary Search, Trees, Heaps
              </div>
            </div>

          </div>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {codingProfilesData.map((profile, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#0e1118]/80 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 group-hover:scale-105 transition-transform">
                      {profile.platform === 'LeetCode' && <LeetCodeIcon className="w-6 h-6 text-amber-400" />}
                      {profile.platform === 'CodeChef' && <Flame className="w-6 h-6 text-sky-400" />}
                      {profile.platform === 'GitHub' && <GithubIcon className="w-6 h-6 text-emerald-400" />}
                      {profile.platform === 'LinkedIn' && <LinkedinIcon className="w-6 h-6 text-blue-400" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                        {profile.platform}
                      </h3>
                      <div className="text-xs font-mono text-slate-400">
                        {profile.rank}
                      </div>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${profile.color}`}>
                    {profile.badge}
                  </span>
                </div>

                {/* Rating / Problems metric */}
                <div className="my-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between font-mono">
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase block">Verified Rating</span>
                    <span className="text-xl font-bold text-white">{profile.rating}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-500 uppercase block">Milestone</span>
                    <span className="text-sm font-semibold text-slate-300">{profile.problemsSolved}</span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 mb-5">
                  {profile.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 hover:border-sky-500/40 text-xs font-mono font-semibold transition-all group/btn"
                >
                  <span>Open {profile.platform} Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
