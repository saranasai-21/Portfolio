'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'hover'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    const updateHoverState = () => {
      const hoverables = document.querySelectorAll(
        'a, button, select, input, textarea, [role="button"], .project-card, .skill-card, .timeline-node'
      );
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => setCursorType('hover'));
        el.addEventListener('mouseleave', () => setCursorType('default'));
      });
    };

    updateHoverState();

    // Dynamically bind to elements added to the DOM later
    const observer = new MutationObserver(updateHoverState);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 rounded-full mix-blend-difference hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
        width: cursorType === 'hover' ? 48 : 12,
        height: cursorType === 'hover' ? 48 : 12,
        backgroundColor: cursorType === 'hover' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(59, 130, 246, 0.5)',
        border: cursorType === 'hover' ? '1px solid rgba(255, 255, 255, 1)' : '1px solid rgba(59, 130, 246, 0.8)',
      }}
      layout
    />
  );
}
