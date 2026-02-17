'use client';

import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroScene = lazy(() => import('./HeroScene'));

const name = process.env.NEXT_PUBLIC_PORTFOLIO_NAME || 'Collins Oseko';
const title = process.env.NEXT_PUBLIC_PORTFOLIO_TITLE || 'IT Undergraduate & Full-Stack Engineer';

const words = ['Engineering', 'Digital', 'Systems', 'with', 'Intelligence'];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale3d = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 2);
      setMouseY((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-hero-glow" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #4F8EF7, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8"
        style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }} />

      {/* 3D Scene */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: scale3d }}
      >
        <Suspense fallback={null}>
          <HeroScene mouseX={mouseX} mouseY={mouseY} />
        </Suspense>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ y, opacity }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-medium text-text-secondary mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
          Open to Opportunities · Building in Public
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
        </motion.div>

        {/* Headline */}
        <div className="mb-6 overflow-hidden">
          <div
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight"
            style={{ fontFamily: 'var(--font-clash)' }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                className={`inline-block mr-4 ${
                  word === 'Intelligence' ? 'gradient-text' : 'text-text-primary'
                }`}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.3 + i * 0.08,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subtext */}
        <motion.p
          className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {name} — {title}. I build scalable systems, beautiful interfaces,
          and intelligent applications that push the boundaries of what's possible.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <motion.button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 rounded-2xl text-sm font-semibold text-white relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #4F8EF7, #00D4FF)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"
            />
          </motion.button>

          <motion.button
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 rounded-2xl text-sm font-semibold text-text-primary glass border-glass hover:border-accent-blue/40 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            About Me
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-accent-blue to-transparent"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>
      </motion.div>

      {/* Tech badges floating */}
      {[
        { tech: 'React', x: '-18%', y: '35%', delay: 1.2 },
        { tech: 'Python', x: '16%', y: '22%', delay: 1.4 },
        { tech: 'Next.js', x: '-14%', y: '68%', delay: 1.3 },
        { tech: 'TypeScript', x: '18%', y: '65%', delay: 1.5 },
      ].map((item) => (
        <motion.div
          key={item.tech}
          className="absolute glass px-3 py-1.5 rounded-xl text-xs font-mono text-text-secondary border-glass hidden lg:block"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ delay: item.delay }}
          whileHover={{ opacity: 1, scale: 1.05 }}
        >
          {item.tech}
        </motion.div>
      ))}
    </section>
  );
}
