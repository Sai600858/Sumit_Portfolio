import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Copy, 
  Check, 
  Send, 
  FileDown, 
  Sparkles
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './Icons';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [statusMsg, setStatusMsg] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMsg('Please complete all fields before sending.');
      return;
    }

    const emailSubject = encodeURIComponent(
      formData.subject || `SDE Opportunity / Inquiry from ${formData.name}`
    );
    const emailBody = encodeURIComponent(
      `Hi Sumit,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nSent from your portfolio website.`
    );

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch {
      // ignore
    }

    // Open real email client
    window.location.href = `mailto:${personalInfo.email}?subject=${emailSubject}&body=${emailBody}`;
    setStatusMsg('Opening your default mail client...');
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-sky-400">
            <span>08 // GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's build something meaningful.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mt-1">
            I'm interested in software engineering opportunities and projects involving backend development, full-stack engineering, and AI-powered applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Email Card */}
            <div className="p-6 rounded-2xl bg-[#0e1118]/80 border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Direct Inquiries
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Response
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-2.5 truncate text-white">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="truncate">{personalInfo.email}</span>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {copied && (
                <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Email copied to clipboard!</span>
                </div>
              )}

              {/* Verified Phone & Location */}
              <div className="space-y-2 pt-2 text-xs font-mono text-slate-400 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{personalInfo.location}</span>
                </div>
              </div>

              {/* Download Resume Action */}
              <div className="pt-2">
                <a
                  href={personalInfo.resumeUrl}
                  download="Sumit-Karkhile-Resume.pdf"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-sky-500/40 text-xs font-mono font-semibold transition-all"
                >
                  <FileDown className="w-4 h-4 text-sky-400" />
                  <span>Download Verified Resume (PDF)</span>
                </a>
              </div>
            </div>

            {/* Social Connect Matrix */}
            <div className="p-6 rounded-2xl bg-[#0e1118]/80 border border-white/10 space-y-3 shadow-xl">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Connect Across Networks
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/5 text-slate-300 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-emerald-400" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/5 text-slate-300 hover:text-sky-400 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-sky-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.socials.leetcode}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/5 text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <LeetCodeIcon className="w-4 h-4 text-amber-400" />
                  <span>LeetCode</span>
                </a>
                <a
                  href={personalInfo.socials.codechef}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/10 border border-white/5 text-slate-300 hover:text-sky-300 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>CodeChef</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Working Mailto Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0e1118]/80 border border-white/10 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-1">
                Send a Direct Message
              </h3>
              <p className="text-xs text-slate-400 mb-6 font-mono">
                Submitting opens your native mail client with the formatted message payload.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="name">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Miller"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141724] border border-white/10 text-white text-xs sm:text-sm font-sans focus:outline-none focus:border-sky-500 placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="email">
                      Your Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#141724] border border-white/10 text-white text-xs sm:text-sm font-sans focus:outline-none focus:border-sky-500 placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="subject">
                    Subject / Role Title
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. SDE Internship Opportunity at ..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141724] border border-white/10 text-white text-xs sm:text-sm font-sans focus:outline-none focus:border-sky-500 placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="message">
                    Message Details *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about the engineering problem, tech stack, or opportunity..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141724] border border-white/10 text-white text-xs sm:text-sm font-sans focus:outline-none focus:border-sky-500 placeholder:text-slate-600 resize-none"
                  />
                </div>

                {statusMsg && (
                  <p className="text-xs font-mono text-sky-400">
                    {statusMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-black font-semibold text-xs sm:text-sm font-mono shadow-glow-sky transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                  <span>Dispatch Email to Sumit</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
