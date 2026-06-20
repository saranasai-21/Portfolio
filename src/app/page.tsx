'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import BackgroundEffect from '../components/ui/BackgroundEffect';
import LoadingScreen from '../components/ui/LoadingScreen';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Visual background elements */}
      <BackgroundEffect />

      {/* Intro loading animation */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative min-h-screen flex flex-col z-10 w-full"
        >
          {/* Global Navbar */}
          <Navbar />

          {/* Main Layout Sections */}
          <main className="flex-1 w-full max-w-5xl mx-auto pt-6 px-4">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Certifications />
            <Contact />
          </main>

          {/* Footer credits block */}
          <footer className="w-full border-t border-card-border/50 py-8 bg-[#030303]/60 backdrop-blur-md relative z-10">
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
              <span>&copy; {new Date().getFullYear()} Sarana Sai Bagadi. All rights reserved.</span>
              <span>
                Built with React, Next.js, Tailwind CSS and Framer Motion.
              </span>
            </div>
          </footer>

          {/* Floating Back to Top Button */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 p-3 rounded-full bg-accent text-white hover:opacity-90 shadow-xl border border-accent/20 z-40 transition-opacity cursor-pointer"
                aria-label="Back to top"
              >
                <ArrowUp size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
