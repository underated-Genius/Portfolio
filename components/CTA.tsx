'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const email = process.env.NEXT_PUBLIC_EMAIL || 'collinsoseko@example.com';
const linkedin = process.env.NEXT_PUBLIC_LINKEDIN || 'https://linkedin.com/in/collins-oseko';
const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'underated-Genius';
const cvUrl = process.env.NEXT_PUBLIC_CV_URL || '#';
const name = process.env.NEXT_PUBLIC_PORTFOLIO_NAME || 'Collins Oseko';

const socialLinks = [
  {
    label: 'GitHub',
    href: `https://github.com/${githubUsername}`,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: '#FFFFFF',
  },
  {
    label: 'LinkedIn',
    href: linkedin,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: '#0A66C2',
  },
  {
    label: 'Email',
    href: `mailto:${email}`,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: '#4F8EF7',
  },
];

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className="section-padding relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(79,142,247,0.08), transparent)',
              'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(139,92,246,0.08), transparent)',
              'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,212,255,0.08), transparent)',
              'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(79,142,247,0.08), transparent)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Section label */}
        <motion.div
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-mono text-text-secondary mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
          Available for Opportunities
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none mb-8"
          style={{ fontFamily: 'var(--font-clash)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Let's Build{' '}
          <span className="gradient-text block sm:inline">Something</span>{' '}
          <span className="gradient-text block sm:inline">Remarkable</span>
        </motion.h2>

        <motion.p
          className="text-lg text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Whether you're looking for a collaborator, intern, or full-time engineer — I'm here to build
          intelligent systems that make an impact. Let's talk.
        </motion.p>

        {/* Email click to copy */}
        <motion.button
          onClick={copyEmail}
          className="group mb-10 inline-flex items-center gap-3 glass px-6 py-4 rounded-2xl text-base hover:border-accent-blue/30 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
          <span className="font-mono text-text-secondary group-hover:text-text-primary transition-colors">
            {email}
          </span>
          <span className="text-xs text-text-muted glass px-2 py-1 rounded-lg">
            {copied ? '✓ Copied!' : 'Click to copy'}
          </span>
        </motion.button>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.a
            href={`mailto:${email}`}
            className="px-8 py-4 rounded-2xl text-sm font-semibold text-white relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #4F8EF7, #00D4FF)',
              boxShadow: '0 0 30px rgba(79,142,247,0.3)',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(79,142,247,0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Me
          </motion.a>

          <motion.a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl text-sm font-semibold text-text-primary glass hover:border-accent-blue/30 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CV
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 + i * 0.05 }}
              title={link.label}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <span>© {new Date().getFullYear()} {name}. All rights reserved.</span>
          <span className="flex items-center gap-2">
            Built with Next.js · Deployed on Vercel
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
