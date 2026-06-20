'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.classList.add('overflow-hidden', 'no-scrollbar');
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            document.body.classList.remove('overflow-hidden', 'no-scrollbar');
            onComplete();
          }, 500);
          return 100;
        }
        const step = Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + step, 100);
      });
    }, 70);

    return () => {
      clearInterval(interval);
      document.body.classList.remove('overflow-hidden', 'no-scrollbar');
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303] text-white"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: '-100vh',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <div className="flex flex-col items-center gap-5 max-w-[280px] w-full px-6">
        <motion.div 
          className="text-xs font-mono tracking-[0.25em] text-accent"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          SARANA_SAI.INIT
        </motion.div>
        
        {/* Loading Progress bar wrapper */}
        <div className="h-[2px] w-full bg-neutral-900 overflow-hidden relative rounded-full">
          <motion.div 
            className="h-full bg-accent absolute left-0 top-0"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
          />
        </div>
        
        <div className="flex justify-between w-full text-[10px] font-mono text-neutral-500">
          <span className="animate-pulse">FETCHING RESOURCES</span>
          <span>{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
