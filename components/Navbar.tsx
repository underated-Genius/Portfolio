'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const name = process.env.NEXT_PUBLIC_PORTFOLIO_NAME || 'Collins Oseko';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, #4F8EF7, #00D4FF, #8B5CF6)',
        }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`mx-auto max-w-6xl px-6 transition-all duration-500 ${
            isScrolled ? 'glass rounded-2xl shadow-card' : ''
          }`}
          style={isScrolled ? { margin: '0 auto' } : {}}
        >
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-9 h-9 rounded-xl glass flex items-center justify-center border border-accent-blue/20 group-hover:border-accent-blue/50 transition-colors">
                <span
                  className="text-sm font-bold gradient-text-blue"
                  style={{ fontFamily: 'var(--font-clash)' }}
                >
                  {name.charAt(0)}
                </span>
              </div>
              <span
                className="text-sm font-semibold text-text-primary hidden sm:block"
                style={{ fontFamily: 'var(--font-clash)' }}
              >
                {name.split(' ')[0]}<span className="text-accent-blue">.</span>
              </span>
            </motion.a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="relative px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-white/5"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => scrollTo('#contact')}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all"
                style={{
                  background: 'linear-gradient(135deg, #4F8EF7, #00D4FF)',
                  boxShadow: '0 0 20px rgba(79,142,247,0.3)',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(79,142,247,0.5)' }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Available
              </motion.button>

              {/* Mobile hamburger */}
              <button
                className="md:hidden w-9 h-9 glass rounded-xl flex flex-col items-center justify-center gap-1.5"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                <motion.span
                  className="w-4 h-px bg-text-primary block"
                  animate={isMobileOpen ? { rotate: 45, y: 2 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="w-4 h-px bg-text-primary block"
                  animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="w-4 h-px bg-text-primary block"
                  animate={isMobileOpen ? { rotate: -45, y: -2 } : { rotate: 0, y: 0 }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 glass-strong flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-3xl font-bold text-text-primary hover:gradient-text transition-colors"
                style={{ fontFamily: 'var(--font-clash)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
