'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const techCategories = [
  {
    label: 'Frontend',
    items: [
      { name: 'React', icon: '⚛️', color: '#61DAFB' },
      { name: 'Next.js', icon: '▲', color: '#FFFFFF' },
      { name: 'TypeScript', icon: 'TS', color: '#3178C6' },
      { name: 'Tailwind', icon: '🎨', color: '#38BDF8' },
      { name: 'Framer', icon: '✦', color: '#BB86FC' },
      { name: 'Three.js', icon: '🔺', color: '#000000', bg: '#FFFFFF' },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js', icon: '🟢', color: '#68A063' },
      { name: 'Python', icon: '🐍', color: '#3572A5' },
      { name: 'FastAPI', icon: '⚡', color: '#009688' },
      { name: 'GraphQL', icon: '◈', color: '#E535AB' },
      { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
      { name: 'MongoDB', icon: '🍃', color: '#4CAF50' },
    ],
  },
  {
    label: 'DevOps & Cloud',
    items: [
      { name: 'AWS', icon: '☁️', color: '#FF9900' },
      { name: 'Docker', icon: '🐳', color: '#2496ED' },
      { name: 'GitHub CI', icon: '⚙️', color: '#FFFFFF' },
      { name: 'Vercel', icon: '▲', color: '#FFFFFF' },
      { name: 'Redis', icon: '🔴', color: '#DC382D' },
      { name: 'Nginx', icon: '🌿', color: '#009639' },
    ],
  },
  {
    label: 'AI & Data',
    items: [
      { name: 'OpenAI', icon: '🤖', color: '#412991' },
      { name: 'LangChain', icon: '🦜', color: '#1C3A5E' },
      { name: 'PyTorch', icon: '🔥', color: '#EE4C2C' },
      { name: 'Pandas', icon: '🐼', color: '#150458' },
      { name: 'Scikit', icon: '🧬', color: '#F7931E' },
      { name: 'Jupyter', icon: '📓', color: '#F37626' },
    ],
  },
];

const stats = [
  { value: 24, suffix: '+', label: 'Projects Built', color: '#4F8EF7' },
  { value: 1400, suffix: '+', label: 'GitHub Contributions', color: '#00D4FF' },
  { value: 12, suffix: '', label: 'Live Deployments', color: '#8B5CF6' },
  { value: 3, suffix: ' yrs', label: 'Experience', color: '#00D4FF' },
];

function Counter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-bold" style={{ color, fontFamily: 'var(--font-clash)' }}>
      {count}{suffix}
    </div>
  );
}

function TechBadge({ item, index }: { item: { name: string; icon: string; color: string; bg?: string }; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="glass rounded-2xl p-4 flex flex-col items-center gap-2.5 cursor-default relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ y: -6, scale: 1.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        boxShadow: hovered ? `0 8px 32px ${item.color}25` : 'none',
        borderColor: hovered ? `${item.color}40` : 'rgba(255,255,255,0.06)',
      }}
    >
      {/* Glow overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{
          background: `radial-gradient(circle at center, ${item.color}12, transparent)`,
        }}
      />

      <span
        className="text-2xl"
        style={{ filter: hovered ? `drop-shadow(0 0 8px ${item.color})` : 'none' }}
      >
        {item.icon.length > 2 ? (
          <span className="text-xs font-bold font-mono" style={{ color: item.color }}>
            {item.icon}
          </span>
        ) : (
          item.icon
        )}
      </span>
      <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors text-center leading-tight">
        {item.name}
      </span>
    </motion.div>
  );
}

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="stack" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/3 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-mono text-text-secondary mb-5">
            <span className="text-accent-blue">{'// '}</span>
            Tech Stack
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-clash)' }}
          >
            My <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            A curated collection of tools and technologies I use to build intelligent systems.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-6 text-center"
              style={{ boxShadow: `0 0 40px ${stat.color}10` }}
            >
              <Counter value={stat.value} suffix={stat.suffix} color={stat.color} />
              <p className="text-xs text-text-secondary mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Tech categories */}
        <div className="space-y-12">
          {techCategories.map((category, catIndex) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + catIndex * 0.1, duration: 0.6 }}
            >
              <h3 className="text-xs font-mono text-text-muted uppercase tracking-widest mb-5 flex items-center gap-3">
                <span className="text-accent-cyan">//</span>
                {category.label}
                <div className="flex-1 h-px bg-white/5" />
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {category.items.map((item, i) => (
                  <TechBadge key={item.name} item={item} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
