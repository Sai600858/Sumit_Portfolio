import React, { useEffect, useRef, useState } from 'react';
import { useMode } from '../context/ModeContext';

export const CyberCursor: React.FC = () => {
  const { isHacker } = useMode();
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [cursorState, setCursorState] = useState<'normal' | 'card' | 'btn' | 'ext' | 'inspect'>('normal');
  const lastStateRef = useRef<string>('normal');
  const isVisibleRef = useRef<boolean>(false);

  useEffect(() => {
    // Only run on devices with fine pointer (mouse/trackpad), not touch screens
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isHacker || !isFinePointer) {
      document.body.classList.remove('hacker-cursor-active');
      return;
    }

    // Add scoped class to body to hide default pointer on interactive elements
    document.body.classList.add('hacker-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let animId: number;

    const handlePointerMove = (e: PointerEvent) => {
      let rawX = e.clientX;
      let rawY = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        if (cursorRef.current) cursorRef.current.style.opacity = '1';
      }

      // Inspect target element for contextual state
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Never obscure native text inputs or textareas
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.closest('input, textarea, [contenteditable="true"]')
      ) {
        if (cursorRef.current) cursorRef.current.style.opacity = '0';
        return;
      } else {
        if (cursorRef.current) cursorRef.current.style.opacity = '1';
      }

      // Optional subtle magnetic attraction on designated primary buttons
      const magneticEl = target.closest('[data-magnetic="true"]') as HTMLElement | null;
      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        rawX = rawX + (centerX - rawX) * 0.22;
        rawY = rawY + (centerY - rawY) * 0.22;
      }

      mouseX = rawX;
      mouseY = rawY;

      // Check explicit data-cursor or semantic elements
      let nextState: 'normal' | 'card' | 'btn' | 'ext' | 'inspect' = 'normal';
      let nextLabel = '';

      const explicitCursor = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (explicitCursor === 'inspect') {
        nextState = 'inspect';
        nextLabel = 'INSPECT';
      } else if (explicitCursor === 'view') {
        nextState = 'card';
        nextLabel = 'VIEW';
      } else if (target.closest('a[target="_blank"]')) {
        nextState = 'ext';
        nextLabel = 'EXTERNAL ↗';
      } else if (target.closest('button, [role="button"], .interactive-btn')) {
        nextState = 'btn';
        nextLabel = 'EXECUTE';
      } else if (target.closest('.project-card, [data-project-card]')) {
        nextState = 'card';
        nextLabel = 'OPEN';
      }

      // Avoid unnecessary React state updates for every pointer movement
      if (nextState !== lastStateRef.current) {
        lastStateRef.current = nextState;
        setCursorState(nextState);
        setCursorLabel(nextLabel);
      }
    };

    const handlePointerDown = () => {
      if (pulseRef.current && !prefersReducedMotion) {
        pulseRef.current.classList.remove('cursor-pulse-anim');
        // Force reflow
        void pulseRef.current.offsetWidth;
        pulseRef.current.classList.add('cursor-pulse-anim');
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    };

    // Smooth render loop using requestAnimationFrame
    const updateCursor = () => {
      // Linear interpolation for tight, responsive feel (0.4 factor = fast response, no lag)
      currentX += (mouseX - currentX) * 0.4;
      currentY += (mouseY - currentY) * 0.4;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      animId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animId = requestAnimationFrame(updateCursor);

    return () => {
      document.body.classList.remove('hacker-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isHacker]);

  if (!isHacker) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-150 select-none opacity-0"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      {/* Reticle Frame Centered exactly on pointer */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        
        {/* Luminous Lime Center Dot */}
        <div
          ref={dotRef}
          className="w-1.5 h-1.5 rounded-full bg-[#B7FF5A] shadow-[0_0_8px_#B7FF5A]"
        />

        {/* Circular Reticle Ring */}
        <div
          ref={ringRef}
          className={`absolute rounded-full border border-[#B7FF5A]/40 transition-all duration-200 ${
            cursorState === 'card'
              ? 'w-11 h-11 border-[#B7FF5A]/70 bg-[#B7FF5A]/[0.06] shadow-[0_0_12px_rgba(183,255,90,0.3)]'
              : cursorState === 'btn'
              ? 'w-10 h-10 border-[#B7FF5A]/80 bg-[#B7FF5A]/[0.1] shadow-[0_0_14px_rgba(183,255,90,0.4)]'
              : cursorState === 'inspect'
              ? 'w-12 h-12 border-[#B7FF5A]/70 border-dashed bg-[#B7FF5A]/[0.05]'
              : cursorState === 'ext'
              ? 'w-9 h-9 border-[#B7FF5A]/60'
              : 'w-7 h-7 border-[#B7FF5A]/30'
          }`}
        />

        {/* Four Technical Corner Brackets */}
        <div
          className={`absolute transition-all duration-200 ${
            cursorState === 'normal' ? 'w-8 h-8 opacity-40' : 'w-12 h-12 opacity-80'
          }`}
        >
          {/* Top-Left */}
          <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#B7FF5A]" />
          {/* Top-Right */}
          <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#B7FF5A]" />
          {/* Bottom-Left */}
          <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#B7FF5A]" />
          {/* Bottom-Right */}
          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#B7FF5A]" />
        </div>

        {/* Click Radial Pulse */}
        <div
          ref={pulseRef}
          className="absolute w-8 h-8 rounded-full border border-[#B7FF5A] pointer-events-none opacity-0 scale-50"
        />

        {/* Contextual Action Label Badge */}
        {cursorLabel && (
          <div className="absolute top-6 left-5 whitespace-nowrap">
            <span
              ref={labelRef}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase bg-[#050806]/95 border border-[#B7FF5A]/40 text-[#B7FF5A] shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              {cursorLabel}
            </span>
          </div>
        )}

      </div>
    </div>
  );
};
