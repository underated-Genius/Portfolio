'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const name = process.env.NEXT_PUBLIC_PORTFOLIO_NAME || 'Collins Oseko';

const codeLines = [
  '> Initializing portfolio...',
  '> Loading modules...',
  '> Compiling components...',
  '> Rendering interface...',
  '> System ready.',
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lineInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= codeLines.length - 1) {
          clearInterval(lineInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 280);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2.5;
      });
    }, 40);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#050810' }}
      exit={{
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-accent-cyan opacity-20"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-md px-6">
        {/* Logo mark */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center">
            <span
              className="text-2xl font-bold gradient-text-blue"
              style={{ fontFamily: 'var(--font-clash)' }}
            >
              {name.charAt(0)}
            </span>
          </div>
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(79,142,247,0.3), rgba(0,212,255,0.1))',
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Terminal */}
        <motion.div
          className="w-full glass rounded-xl p-5 font-mono text-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-60" />
            <span className="ml-2 text-text-secondary text-[10px]">system.init</span>
          </div>
          <div className="space-y-1.5">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={currentLine >= i ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <span
                  className={
                    i === codeLines.length - 1
                      ? 'text-accent-cyan'
                      : 'text-accent-blue'
                  }
                >
                  {line}
                </span>
                {currentLine === i && i < codeLines.length - 1 && (
                  <motion.span
                    className="inline-block w-1.5 h-3 bg-accent-blue"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="w-full space-y-2">
          <div className="h-px bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #4F8EF7, #00D4FF)',
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted text-[10px] font-mono">{Math.round(progress)}%</span>
            <motion.span
              className="text-text-muted text-[10px] font-mono"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              LOADING
            </motion.span>
          </div>
        </div>

        {/* Name reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 60 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1
            className="text-4xl font-bold glitch-text gradient-text"
            data-text={name}
            style={{ fontFamily: 'var(--font-clash)' }}
          >
            {name}
          </h1>
        </motion.div>
      </div>
    </motion.div>
  );
}
