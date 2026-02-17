'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const update = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', update);

    const addHover = () => setIsHovering(true);
    const removeHover = () => setIsHovering(false);

    const interactable = document.querySelectorAll('a, button, [role="button"]');
    interactable.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', update);
      interactable.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed z-[99998] pointer-events-none mix-blend-difference rounded-full bg-white hidden lg:block"
        animate={{
          x: pos.x - (isHovering ? 20 : 6),
          y: pos.y - (isHovering ? 20 : 6),
          width: isHovering ? 40 : 12,
          height: isHovering ? 40 : 12,
        }}
        transition={{ type: 'spring', mass: 0.3, stiffness: 200, damping: 20 }}
      />
    </>
  );
}
