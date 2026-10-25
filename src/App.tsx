import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { CodingProfiles } from './components/CodingProfiles';
import { Leadership } from './components/Leadership';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { Terminal } from 'lucide-react';

export function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#08090c] text-slate-100 flex flex-col relative selection:bg-sky-500/30 selection:text-sky-200">
      
      {/* Top Navigation */}
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <CodingProfiles />
        <Leadership />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive CLI Terminal Drawer */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Floating CLI Launch Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#121520]/90 hover:bg-[#1a1f30] border border-white/15 hover:border-sky-500/50 shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-105"
          aria-label="Launch Developer Terminal"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <Terminal className="w-4 h-4 text-sky-400" />
          <span className="hidden sm:inline font-mono text-xs text-slate-300 group-hover:text-white">
            Developer CLI
          </span>
        </button>
      </div>

    </div>
  );
}

export default App;
