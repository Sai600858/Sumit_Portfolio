import React, { createContext, useContext, useState, useCallback } from 'react';

export type SiteMode = 'default' | 'hacker';

interface ModeContextType {
  mode: SiteMode;
  toggleMode: () => void;
  isHacker: boolean;
}

const ModeContext = createContext<ModeContextType>({
  mode: 'default',
  toggleMode: () => {},
  isHacker: false,
});

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<SiteMode>(() => {
    try {
      const saved = localStorage.getItem('sumit_portfolio_mode');
      return saved === 'hacker' ? 'hacker' : 'default';
    } catch {
      return 'default';
    }
  });

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next: SiteMode = prev === 'default' ? 'hacker' : 'default';
      try {
        localStorage.setItem('sumit_portfolio_mode', next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return (
    <ModeContext.Provider value={{ mode, toggleMode, isHacker: mode === 'hacker' }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => useContext(ModeContext);
