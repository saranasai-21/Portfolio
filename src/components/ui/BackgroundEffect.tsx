'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundEffect() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      containerRef.current.style.setProperty('--mouse-x', `${clientX}px`);
      containerRef.current.style.setProperty('--mouse-y', `${clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Grid Mesh lines */}
      <div className="absolute inset-0 grid-mesh opacity-100" />
      
      {/* Mouse follow radial glow */}
      <div
        className="absolute inset-0 opacity-80 mix-blend-screen transition-opacity duration-300 dark:opacity-60"
        style={{
          background: 'radial-gradient(500px circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), var(--color-accent, #3b82f6) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)',
          opacity: 0.12
        }}
      />

      {/* Ambient static color glows to create depth */}
      <div className="absolute -top-[200px] -left-[100px] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[130px] pulse-glow dark:bg-blue-600/5" />
      <div className="absolute top-[20%] right-[-100px] h-[650px] w-[650px] rounded-full bg-purple-500/10 blur-[150px] pulse-glow dark:bg-purple-600/5" />
      <div className="absolute bottom-[-100px] left-[10%] h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px] pulse-glow dark:bg-emerald-600/3" />
    </div>
  );
}
