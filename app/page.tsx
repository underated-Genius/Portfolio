'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import FeaturedProjects from '@/components/FeaturedProjects';
import CTA from '@/components/CTA';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Prevent scroll during loader
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading && (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <main className="relative noise">
          <Navbar />
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <FeaturedProjects />
          <CTA />
        </main>
      )}
    </>
  );
}
