'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const featured = [
  {
    title: 'DevFlow — AI Code Review',
    desc: 'AI-powered code review platform that analyzes PRs, suggests improvements, and learns from your codebase. Built for engineering teams.',
    tech: ['Next.js', 'OpenAI', 'PostgreSQL', 'Redis'],
    url: 'https://devflow.vercel.app',
    github: 'https://github.com/username/devflow',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    accent: '#4F8EF7',
    mockColor: '#1a2744',
    mockAccent: '#4F8EF7',
    label: 'Full-Stack · AI',
    stats: ['2K+ PRs reviewed', '98% accuracy', '4.9★ rating'],
  },
  {
    title: 'NeuralMind — Learning OS',
    desc: 'Personalized learning platform using ML to adapt course content to individual cognitive patterns. Built on spaced repetition science.',
    tech: ['React', 'Python', 'FastAPI', 'TensorFlow'],
    url: 'https://neuralmind.vercel.app',
    github: 'https://github.com/username/neuralmind',
    gradient: 'from-purple-500/20 to-pink-500/20',
    accent: '#8B5CF6',
    mockColor: '#1a1044',
    mockAccent: '#8B5CF6',
    label: 'ML · EdTech',
    stats: ['500+ learners', '3x faster learning', 'Open source'],
  },
  {
    title: 'CloudSync — File Intelligence',
    desc: 'Smart file management system with AI search, auto-tagging, and cross-platform sync. Like Dropbox but actually intelligent.',
    tech: ['Next.js', 'AWS S3', 'LangChain', 'Prisma'],
    url: 'https://cloudsync.vercel.app',
    github: 'https://github.com/username/cloudsync',
    gradient: 'from-cyan-500/20 to-teal-500/20',
    accent: '#00D4FF',
    mockColor: '#0a2a2e',
    mockAccent: '#00D4FF',
    label: 'Cloud · AI',
    stats: ['10GB free tier', 'E2E encrypted', '99.9% uptime'],
  },
];

function BrowserMockup({ project }: { project: typeof featured[0] }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '16/10' }}>
      {/* Browser chrome */}
      <div className="absolute top-0 left-0 right-0 h-9 glass flex items-center px-4 gap-3 z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        </div>
        <div className="flex-1 h-5 glass rounded-md flex items-center px-3 mx-4">
          <span className="text-[9px] font-mono text-text-muted truncate">{project.url}</span>
        </div>
      </div>

      {/* Browser content */}
      <div
        className="absolute inset-0 pt-9 flex flex-col"
        style={{ background: project.mockColor }}
      >
        {/* Simulated UI */}
        <div className="flex-1 flex p-4 gap-3">
          {/* Sidebar */}
          <div className="w-1/4 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-7 rounded-lg opacity-20"
                style={{
                  background: i === 0 ? project.mockAccent : 'rgba(255,255,255,0.1)',
                  width: `${60 + Math.random() * 40}%`,
                }}
              />
            ))}
          </div>
          {/* Main content */}
          <div className="flex-1 space-y-3">
            <div className="h-8 rounded-xl opacity-30" style={{ background: project.mockAccent, width: '60%' }} />
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-16 rounded-xl opacity-15 bg-white" />
              ))}
            </div>
            <div className="h-2 rounded opacity-20 bg-white w-full" />
            <div className="h-2 rounded opacity-15 bg-white w-4/5" />
          </div>
        </div>
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, transparent 60%, ${project.mockColor} 100%)`,
        }}
      />

      {/* Glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: `inset 0 0 40px ${project.mockAccent}10`,
          border: `1px solid ${project.mockAccent}20`,
        }}
      />
    </div>
  );
}

function FeaturedCard({ project, index }: { project: typeof featured[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
        !isEven ? 'lg:[&>*:first-child]:order-2' : ''
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image side */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        {/* Glow halo */}
        <div
          className="absolute -inset-4 rounded-3xl blur-2xl opacity-20"
          style={{ background: `radial-gradient(circle, ${project.accent}, transparent)` }}
        />
        <BrowserMockup project={project} />
      </motion.div>

      {/* Content side */}
      <div className="space-y-5">
        <div>
          <span
            className="text-xs font-mono px-3 py-1 rounded-full"
            style={{ color: project.accent, background: `${project.accent}15`, border: `1px solid ${project.accent}30` }}
          >
            {project.label}
          </span>
        </div>

        <h3
          className="text-3xl sm:text-4xl font-bold text-text-primary"
          style={{ fontFamily: 'var(--font-clash)' }}
        >
          {project.title}
        </h3>

        <p className="text-base text-text-secondary leading-relaxed">
          {project.desc}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-4">
          {project.stats.map((stat) => (
            <div key={stat} className="flex items-center gap-1.5 text-sm text-text-secondary">
              <span className="w-1 h-1 rounded-full" style={{ background: project.accent }} />
              {stat}
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-3 py-1.5 rounded-xl glass text-text-secondary"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-2">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: `linear-gradient(135deg, ${project.accent}, ${project.accent}bb)` }}
          >
            Live Demo →
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-text-secondary glass hover:text-text-primary transition-colors"
          >
            View Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="featured" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-mono text-text-secondary mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
            Featured Work
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-clash)' }}
          >
            Flagship{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Handpicked projects that showcase full-stack depth and creative thinking.
          </p>
        </motion.div>

        <div className="space-y-28">
          {featured.map((project, i) => (
            <FeaturedCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
