import { useState, useEffect, lazy, Suspense } from 'react';
import { ModeProvider, useMode } from './context/ModeContext';
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
import { CyberCursor } from './components/CyberCursor';
import { TelemetryHUD } from './components/TelemetryHUD';
import { Terminal } from 'lucide-react';
import { soundFx } from './utils/soundEffects';

const InteractiveTerminal = lazy(() => 
  import('./components/InteractiveTerminal').then(m => ({ default: m.InteractiveTerminal }))
);

function AppInner() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const { mode, toggleMode, isHacker } = useMode();

  const handleToggleMode = () => {
    if (isHacker) {
      soundFx.playExitSound();
    } else {
      soundFx.playBootSound();
    }
    toggleMode();
  };

  // Global Ctrl+K / Cmd+K listener for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundFx.playKeyClick();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col relative transition-colors duration-500 ${
        isHacker
          ? 'bg-[#050806] text-slate-200 selection:bg-[#B7FF5A]/30 selection:text-[#B7FF5A]'
          : 'bg-[#08090c] text-slate-100 selection:bg-sky-500/30 selection:text-sky-200'
      }`}
      data-mode={mode}
    >
      {/* Custom Cyber Reticle Cursor (Active on Hacker Mode desktop) */}
      <CyberCursor />

      {/* Subtle Ambient Workstation Lighting for SUMIT.OS */}
      {isHacker && <SubtleWorkstationLighting />}

      {/* Live Observability Telemetry HUD (Active on SUMIT.OS) */}
      <TelemetryHUD onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Skip to Main Content Link for Accessibility */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-sky-500 focus:text-white focus:rounded-lg focus:font-mono focus:text-xs focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Top Navigation */}
      <div className={isHacker ? 'pt-7' : ''}>
        <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} onToggleMode={handleToggleMode} />
      </div>

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
      <Suspense fallback={null}>
        <InteractiveTerminal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          onOpenProject={(projectId) => {
            window.dispatchEvent(new CustomEvent('open-project-modal', { detail: projectId }));
          }}
          onToggleMode={handleToggleMode}
        />
      </Suspense>

      {/* Floating CLI Launch Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsTerminalOpen(true)}
          className={`group flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 ${
            isHacker
              ? 'bg-[#080d09]/95 hover:bg-[#0d140e] border border-[#B7FF5A]/30 hover:border-[#B7FF5A]/60 shadow-[#B7FF5A]/10 focus-visible:ring-[#B7FF5A]'
              : 'bg-[#121520]/90 hover:bg-[#1a1f30] border border-white/15 hover:border-sky-500/50 shadow-black/60 focus-visible:ring-sky-400'
          }`}
          aria-label="Launch Developer Terminal (Ctrl+K)"
          data-cursor="btn"
        >
          <div className={`w-2 h-2 rounded-full animate-pulse ${isHacker ? 'bg-[#B7FF5A] shadow-[0_0_6px_#B7FF5A]' : 'bg-emerald-400'}`} />
          <Terminal className={`w-4 h-4 ${isHacker ? 'text-[#B7FF5A]' : 'text-sky-400'}`} />
          <span className={`hidden sm:inline font-mono text-xs group-hover:text-white ${isHacker ? 'text-[#B7FF5A]' : 'text-slate-300'}`}>
            {isHacker ? 'root@sumit:~$ [Ctrl+K]' : 'Developer CLI'}
          </span>
        </button>
      </div>
    </div>
  );
}

/** Subtle, elegant ambient lighting for SUMIT.OS without heavy scanlines or fake animations */
function SubtleWorkstationLighting() {
  return (
    <>
      {/* Corner glows with phosphor-lime */}
      <div 
        className="pointer-events-none fixed top-0 left-0 w-80 h-80 z-[1] opacity-[0.06]"
        style={{ background: 'radial-gradient(circle at 0% 0%, #B7FF5A, transparent 70%)' }} 
      />
      <div 
        className="pointer-events-none fixed bottom-0 right-0 w-80 h-80 z-[1] opacity-[0.05]"
        style={{ background: 'radial-gradient(circle at 100% 100%, #B7FF5A, transparent 70%)' }} 
      />
      {/* Ultra-subtle top border line */}
      <div 
        className="pointer-events-none fixed top-0 left-0 right-0 h-px z-[2]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(183, 255, 90, 0.4), transparent)' }} 
      />
    </>
  );
}

export function App() {
  return (
    <ModeProvider>
      <AppInner />
    </ModeProvider>
  );
}

export default App;
