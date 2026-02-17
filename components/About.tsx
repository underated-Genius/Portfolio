'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const name = process.env.NEXT_PUBLIC_PORTFOLIO_NAME || 'Collins Oseko';

const timeline = [
  {
    year: '2021',
    title: 'Started IT Journey',
    desc: 'Enrolled in BSc Information Technology. First line of code written. Never looked back.',
    color: '#4F8EF7',
  },
  {
    year: '2022',
    title: 'Full-Stack Development',
    desc: 'Mastered React, Node.js, and databases. Built first production app serving 1K+ users.',
    color: '#8B5CF6',
  },
  {
    year: '2023',
    title: 'Cloud & DevOps',
    desc: 'AWS certification. Docker, CI/CD pipelines. Started open-source contributions.',
    color: '#00D4FF',
  },
  {
    year: '2024',
    title: 'AI & ML Integration',
    desc: 'Integrated LLMs into products. Built ML pipelines. Internship at tech startup.',
    color: '#4F8EF7',
  },
  {
    year: '2025',
    title: 'Industry Ready',
    desc: 'Multiple live projects. Actively contributing to open source. Seeking full-time roles.',
    color: '#00D4FF',
  },
];

const skills = [
  { name: 'React / Next.js', level: 92, color: '#61DAFB' },
  { name: 'TypeScript', level: 88, color: '#3178C6' },
  { name: 'Node.js / Express', level: 85, color: '#68A063' },
  { name: 'Python / FastAPI', level: 82, color: '#3572A5' },
  { name: 'PostgreSQL / MongoDB', level: 78, color: '#336791' },
  { name: 'AWS / Docker', level: 75, color: '#FF9900' },
];

const traits = [
  { emoji: '⚡', label: 'Fast Learner' },
  { emoji: '🎯', label: 'Problem Solver' },
  { emoji: '🔬', label: 'Research Minded' },
  { emoji: '🤝', label: 'Team Player' },
  { emoji: '🚀', label: 'Shipped Projects' },
  { emoji: '📖', label: 'Open Source' },
];

function SkillBar({ name, level, color, index }: { name: string; level: number; color: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="group glass rounded-2xl p-4 hover:border-white/15 transition-all duration-300 cursor-default"
      style={{
        boxShadow: 'none',
      }}
      whileHover={{
        y: -4,
        boxShadow: `0 8px 32px ${color}15`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-text-primary">{name}</span>
        <span className="text-xs font-mono" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ delay: 0.3 + index * 0.05, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Left connector */}
      <div className="flex flex-col items-center">
        <motion.div
          className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
          style={{ background: item.color, boxShadow: `0 0 12px ${item.color}60` }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />
        {index < timeline.length - 1 && (
          <div className="w-px flex-1 mt-2 timeline-line" style={{ minHeight: '3rem' }} />
        )}
      </div>

      {/* Content */}
      <div className="pb-8">
        <div
          className="text-xs font-mono mb-1 px-2 py-0.5 rounded-md inline-block"
          style={{ color: item.color, background: `${item.color}15` }}
        >
          {item.year}
        </div>
        <h4 className="text-base font-semibold text-text-primary mb-1">{item.title}</h4>
        <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-mono text-text-secondary mb-5">
            <span className="text-accent-cyan">{'<'}</span>
            About Me
            <span className="text-accent-cyan">{'/>'}</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold"
            style={{ fontFamily: 'var(--font-clash)' }}
          >
            The Story{' '}
            <span className="gradient-text">Behind the Code</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio + traits */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                I'm <span className="text-text-primary font-semibold">{name}</span>, an IT undergraduate obsessed with building products that matter.
                I operate at the intersection of engineering rigor and creative problem-solving—translating complex ideas into
                <span className="text-accent-cyan"> elegant, scalable systems</span>.
              </p>
              <p className="text-base text-text-secondary leading-relaxed">
                From architecting full-stack applications to experimenting with machine learning pipelines,
                I bring end-to-end ownership to every project. Currently focused on AI-powered web applications
                and distributed systems.
              </p>
            </motion.div>

            {/* Trait chips */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              {traits.map((trait, i) => (
                <motion.div
                  key={trait.label}
                  className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary hover:border-accent-blue/30 transition-all cursor-default"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  <span>{trait.emoji}</span>
                  <span>{trait.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Skills */}
            <div>
              <motion.h3
                className="text-sm font-mono text-text-secondary mb-5 uppercase tracking-widest"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
              >
                Core Skills
              </motion.h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Timeline */}
          <div>
            <motion.h3
              className="text-sm font-mono text-text-secondary mb-8 uppercase tracking-widest"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Journey Timeline
            </motion.h3>
            <div>
              {timeline.map((item, i) => (
                <TimelineItem key={item.year} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
