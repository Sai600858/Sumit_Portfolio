import React, { useEffect, useState, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  maxIterations?: number;
  trigger?: boolean;
  characters?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

const DEFAULT_CHARS = '01#@$%&*<>~/[]{}+=_-0xABCDEFλ§ΞΨ⌘';

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  className = '',
  speed = 25,
  trigger = true,
  characters = DEFAULT_CHARS,
  as: Component = 'span'
}) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const targetLength = text.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
      });

      if (iteration >= targetLength) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 2; // controls resolution speed
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, trigger, speed, characters]);

  return <Component className={className}>{displayText}</Component>;
};
