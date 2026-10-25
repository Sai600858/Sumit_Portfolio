import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { personalInfo, projectsData } from '../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-sky-400 font-bold">Sumit Karkhile [CLI v1.0.0]</p>
          <p className="text-slate-400">Type <span className="text-amber-300 font-bold">help</span> to view available commands or click quick action chips below.</p>
        </div>
      )
    }
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        response = (
          <div className="space-y-1 text-xs">
            <p className="text-sky-400 font-semibold">Available commands:</p>
            <div className="grid grid-cols-2 gap-1 text-slate-300">
              <div><span className="text-amber-300 font-mono">about</span> : Brief professional summary</div>
              <div><span className="text-amber-300 font-mono">projects</span> : List featured projects</div>
              <div><span className="text-amber-300 font-mono">skills</span> : Key technical skills</div>
              <div><span className="text-amber-300 font-mono">stats</span> : Competitive programming stats</div>
              <div><span className="text-amber-300 font-mono">contact</span> : Contact info & location</div>
              <div><span className="text-amber-300 font-mono">resume</span> : Download official PDF resume</div>
              <div><span className="text-amber-300 font-mono">clear</span> : Clear terminal screen</div>
            </div>
          </div>
        );
        break;

      case 'about':
        response = (
          <div className="text-xs text-slate-300 space-y-1">
            <p className="text-white font-semibold">Sumit Karkhile — Computer Engineering @ PICT Pune (CGPA: 9.45/10)</p>
            <p className="text-slate-400">{personalInfo.subheadline}</p>
          </div>
        );
        break;

      case 'projects':
        response = (
          <div className="text-xs space-y-1.5">
            <p className="text-sky-400 font-semibold">Featured Projects:</p>
            {projectsData.map(p => (
              <div key={p.id} className="text-slate-300">
                <span className="text-white font-bold">{p.title}</span> ({p.category}, {p.year}): {p.tagline}
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        response = (
          <div className="text-xs space-y-1 text-slate-300">
            <p className="text-sky-400 font-semibold">Core Technical Stack:</p>
            <p><span className="text-amber-300">Backend:</span> Spring Boot, Spring MVC, Spring Security, JWT, JPA, Hibernate, REST</p>
            <p><span className="text-emerald-300">Languages:</span> Java (21), C++, Python, JavaScript, SQL</p>
            <p><span className="text-indigo-300">Frontend:</span> React 19, HTML5, CSS3, Tailwind CSS</p>
            <p><span className="text-sky-300">Cloud & Tools:</span> Docker, AWS (S3, EC2), MySQL, GitHub Actions, Nginx</p>
          </div>
        );
        break;

      case 'stats':
        response = (
          <div className="text-xs space-y-1 text-slate-300">
            <p className="text-emerald-400 font-semibold">Algorithmic Milestones:</p>
            <p>• LeetCode: <span className="text-white font-bold">Knight (1950 Max Rating)</span></p>
            <p>• CodeChef: <span className="text-white font-bold">3-Star (1650 Rating)</span></p>
            <p>• DSA Solved: <span className="text-white font-bold">700+ problems across platforms</span></p>
          </div>
        );
        break;

      case 'contact':
        response = (
          <div className="text-xs space-y-1 text-slate-300">
            <p>Email: <a href="mailto:karkhilesumit5654@gmail.com" className="text-sky-400 underline">{personalInfo.email}</a></p>
            <p>Location: <span className="text-white">{personalInfo.location}</span></p>
            <p>GitHub: <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="text-sky-400 underline">{personalInfo.socials.github}</a></p>
            <p>LinkedIn: <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="text-sky-400 underline">{personalInfo.socials.linkedin}</a></p>
          </div>
        );
        break;

      case 'resume':
        response = (
          <div className="text-xs text-emerald-400">
            Initiating download of Sumit-Karkhile-Resume.pdf...
          </div>
        );
        const link = document.createElement('a');
        link.href = personalInfo.resumeUrl;
        link.download = 'Sumit-Karkhile-Resume.pdf';
        link.click();
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        response = (
          <div className="text-xs text-rose-400">
            Command not recognized: <span className="text-white">{trimmed}</span>. Type <span className="text-amber-300 font-mono">help</span> for commands.
          </div>
        );
    }

    setHistory(prev => [...prev, { command: cmd, output: response }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputVal.trim()) {
      handleCommand(inputVal);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className={`relative w-full ${isExpanded ? 'max-w-5xl h-[85vh]' : 'max-w-2xl h-[480px]'} bg-[#0a0c12] border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 font-mono z-10`}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#11141e] border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block cursor-pointer" onClick={onClose}></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="text-xs text-slate-400 ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>sumit@pict-workstation:~</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:text-white rounded hover:bg-white/5 transition-colors"
              title={isExpanded ? 'Minimize' : 'Maximize'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button 
              onClick={onClose}
              className="p-1 hover:text-rose-400 rounded hover:bg-white/5 transition-colors"
              title="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Action Chips */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#0e111a] border-b border-white/5 overflow-x-auto text-[11px]">
          <span className="text-slate-500 uppercase tracking-wider shrink-0 text-[10px]">Chips:</span>
          {['help', 'about', 'projects', 'skills', 'stats', 'contact', 'resume', 'clear'].map(cmd => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-sky-300 border border-white/10 text-xs transition-colors shrink-0"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Output Screen */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.command && (
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-sky-400">sumit@pict:~$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                </div>
              )}
              <div className="pl-4 border-l border-white/5 text-slate-300">
                {item.output}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Field */}
        <div className="p-3 bg-[#0d1017] border-t border-white/10 flex items-center gap-2">
          <span className="text-sky-400 text-xs font-bold pl-2">sumit@pict:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or click a command..."
            className="flex-1 bg-transparent text-white text-xs font-mono focus:outline-none placeholder:text-slate-600"
          />
          <button
            onClick={() => inputVal.trim() && handleCommand(inputVal)}
            className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 hover:bg-sky-500/30 transition-colors"
            title="Execute Command"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
