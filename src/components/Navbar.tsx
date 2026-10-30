import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown, Terminal } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useMode } from '../context/ModeContext';

interface NavbarProps {
  onOpenTerminal?: () => void;
  onToggleMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onToggleMode }) => {
  const { isHacker } = useMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'profiles', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Profiles', href: '#profiles' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? isHacker
            ? 'bg-[#050806]/95 backdrop-blur-md border-b border-[#B7FF5A]/20 shadow-lg shadow-black/80 py-2.5'
            : 'bg-[#08090c]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 text-white font-mono text-sm tracking-tight"
          aria-label="Sumit Karkhile Home"
          data-cursor="btn"
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-transform group-hover:scale-105 ${
            isHacker
              ? 'bg-[#B7FF5A] text-black shadow-[0_0_12px_rgba(183,255,90,0.4)]'
              : 'bg-gradient-to-br from-sky-400 to-blue-600 text-black shadow-glow-sky'
          }`}>
            SK
          </div>
          <div className="flex flex-col">
            <span className={`font-semibold transition-colors ${
              isHacker ? 'text-white group-hover:text-[#B7FF5A]' : 'text-slate-100 group-hover:text-sky-400'
            }`}>
              Sumit Karkhile
            </span>
            <span className={`text-[10px] flex items-center gap-1 font-mono ${
              isHacker ? 'text-[#B7FF5A]' : 'text-emerald-400'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                isHacker ? 'bg-[#B7FF5A]' : 'bg-emerald-400'
              }`}></span>
              {isHacker ? 'PICT COMP · SUMIT.OS' : 'SDE Aspirant · PICT'}
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav 
          className={`hidden md:flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-md ${
            isHacker
              ? 'bg-[#080d09]/80 border-[#B7FF5A]/20'
              : 'bg-[#12141c]/70 border-white/10'
          }`} 
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? isHacker
                      ? 'bg-[#B7FF5A]/20 text-[#B7FF5A] border border-[#B7FF5A]/40 font-mono font-bold'
                      : 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : isHacker
                    ? 'text-slate-400 hover:text-[#B7FF5A] hover:bg-[#B7FF5A]/5 font-mono'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                data-cursor="btn"
              >
                {isHacker ? `// ${link.name.toLowerCase()}` : link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className={`p-2 border rounded-lg transition-colors flex items-center gap-1.5 text-xs font-mono ${
                isHacker
                  ? 'text-[#B7FF5A] hover:text-white bg-[#080d09] hover:bg-[#0d140e] border-[#B7FF5A]/30'
                  : 'text-slate-400 hover:text-sky-400 bg-[#12141c] hover:bg-[#1a1e2b] border-white/10'
              }`}
              title="Open Interactive Terminal (Ctrl+K)"
              data-cursor="btn"
            >
              <Terminal className={`w-3.5 h-3.5 ${isHacker ? 'text-[#B7FF5A]' : 'text-sky-400'}`} />
              <span>{isHacker ? 'CLI' : 'CLI'}</span>
            </button>
          )}

          <a
            href={personalInfo.resumeUrl}
            download="Sumit-Karkhile-Resume.pdf"
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 ${
              isHacker
                ? 'bg-[#B7FF5A]/10 hover:bg-[#B7FF5A]/20 text-[#B7FF5A] border-[#B7FF5A]/30 hover:border-[#B7FF5A]/60 font-mono'
                : 'bg-white/10 hover:bg-white/15 text-white border-white/15 hover:border-sky-500/50 hover:shadow-glow-sky'
            }`}
            data-cursor="btn"
          >
            <FileDown className={`w-3.5 h-3.5 ${isHacker ? 'text-[#B7FF5A]' : 'text-sky-400'}`} />
            <span>Resume</span>
          </a>

          {/* Mode Toggle Pill */}
          {onToggleMode && (
            <button
              id="mode-toggle-btn"
              onClick={onToggleMode}
              title={isHacker ? 'Switch to Default Mode' : 'Switch to Hacker Mode (SUMIT.OS)'}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold border transition-all duration-300 ${
                isHacker
                  ? 'bg-[#B7FF5A]/15 border-[#B7FF5A]/40 text-[#B7FF5A] hover:bg-[#B7FF5A]/25 shadow-sm shadow-[#B7FF5A]/20'
                  : 'bg-white/8 border-white/15 text-slate-300 hover:bg-white/14 hover:border-sky-400/40'
              }`}
              data-cursor="btn"
            >
              <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                isHacker ? 'bg-[#B7FF5A] shadow-[0_0_8px_#B7FF5A]' : 'bg-slate-400'
              }`} />
              {isHacker ? 'SUMIT.OS' : 'HACKER'}
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={personalInfo.resumeUrl}
            download="Sumit-Karkhile-Resume.pdf"
            className="p-2 text-white bg-white/10 rounded-lg text-xs flex items-center"
            title="Download Resume"
          >
            <FileDown className="w-4 h-4 text-sky-400" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white bg-[#12141c] border border-white/10 rounded-lg"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0c12]/95 border-b border-white/10 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium rounded-lg text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 text-center transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            {onOpenTerminal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#151923] text-sky-300 border border-sky-500/20 text-xs font-mono"
              >
                <Terminal className="w-4 h-4" />
                <span>Launch Interactive Terminal</span>
              </button>
            )}
            <a
              href={personalInfo.resumeUrl}
              download="Sumit-Karkhile-Resume.pdf"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs transition-colors"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
