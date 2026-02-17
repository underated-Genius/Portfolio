'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { formatDate, getLanguageColor, isVercelDeployment } from '@/lib/github';
import type { GitHubRepo } from '@/lib/github';

function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  );
}

function ProjectCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const isLive = isVercelDeployment(repo.homepage);

  return (
    <motion.div
      ref={ref}
      className="gradient-border group"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        className="glass rounded-2xl p-6 h-full flex flex-col gap-4 relative overflow-hidden"
        animate={hovered ? { y: -4 } : { y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.5)' : '0 4px 24px rgba(0,0,0,0.3)',
        }}
      >
        {/* Card shine */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
            opacity: hovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {isLive && (
                <span className="flex items-center gap-1 text-[10px] font-mono text-accent-cyan px-2 py-0.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20">
                  <span className="w-1 h-1 rounded-full bg-accent-cyan animate-pulse" />
                  LIVE
                </span>
              )}
              {repo.language && (
                <span className="flex items-center gap-1 text-[10px] font-mono text-text-secondary">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: getLanguageColor(repo.language) }}
                  />
                  {repo.language}
                </span>
              )}
            </div>
            <h3
              className="text-base font-bold text-text-primary group-hover:gradient-text-blue transition-all"
              style={{ fontFamily: 'var(--font-clash)' }}
            >
              {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
            </h3>
          </div>
          <div className="flex items-center gap-3 text-text-muted text-xs">
            <span className="flex items-center gap-1">
              <StarIcon /> {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <ForkIcon /> {repo.forks_count}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed flex-1">
          {repo.description || 'A project built with passion and purpose.'}
        </p>

        {/* Topics */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md text-accent-blue"
                style={{ background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.15)' }}
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span className="text-[10px] font-mono text-text-muted">
            Updated {formatDate(repo.updated_at)}
          </span>
          <div className="flex items-center gap-2">
            {isLive && repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #4F8EF7, #00D4FF)' }}
                onClick={(e) => e.stopPropagation()}
              >
                Live Demo
              </a>
            )}
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl text-xs font-medium text-text-secondary glass hover:text-text-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              View Code
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SkeletonCard({ index }: { index: number }) {
  return (
    <motion.div
      className="glass rounded-2xl p-6 h-48"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="shimmer h-4 w-24 rounded mb-3 bg-white/5" />
      <div className="shimmer h-5 w-40 rounded mb-4 bg-white/5" />
      <div className="shimmer h-3 w-full rounded mb-2 bg-white/5" />
      <div className="shimmer h-3 w-3/4 rounded mb-6 bg-white/5" />
      <div className="flex gap-2">
        <div className="shimmer h-5 w-16 rounded bg-white/5" />
        <div className="shimmer h-5 w-16 rounded bg-white/5" />
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    fetch('/api/github')
      .then((res) => res.json())
      .then((data) => {
        if (data.repos) setRepos(data.repos);
        else setError('No repos found');
      })
      .catch(() => setError('Failed to load projects'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" ref={ref} className="section-padding relative">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-mono text-text-secondary mb-5">
            <span className="text-accent-purple">{'$ '}</span>
            git log --all
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-clash)' }}
          >
            Open Source{' '}
            <span className="gradient-text">Work</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Live projects pulled directly from GitHub. Each one built to solve real problems.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} index={i} />)
              : repos.map((repo, i) => (
                  <ProjectCard key={repo.id} repo={repo} index={i} />
                ))}
          </AnimatePresence>
        </div>

        {error && (
          <motion.p
            className="text-center text-text-muted font-mono text-sm mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error} — Configure NEXT_PUBLIC_GITHUB_USERNAME to show your repos.
          </motion.p>
        )}

        {/* GitHub link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <a
            href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 glass px-6 py-3 rounded-2xl text-sm text-text-secondary hover:text-text-primary hover:border-accent-blue/30 transition-all group"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View all repositories
            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
