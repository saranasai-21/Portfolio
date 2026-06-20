'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { GitPullRequest, Star, Users, BookOpen } from 'lucide-react';

interface CounterProps {
  value: number;
  duration?: number;
}

function StatsCounter({ value, duration = 1.5 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }
    const stepTime = Math.max(Math.floor((duration * 1000) / end), 15);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref} className="font-mono">{count}</span>;
}

export default function GithubStats() {
  const [weeks, setWeeks] = useState<number[][]>([]);

  useEffect(() => {
    // Generate contribution grid values (0 = none, 1-4 = level of green)
    const grid: number[][] = [];
    for (let day = 0; day < 7; day++) {
      const row: number[] = [];
      for (let week = 0; week < 26; week++) {
        // Create an organic looking active pattern
        const randomVal = Math.random();
        if (randomVal < 0.25) row.push(0);
        else if (randomVal < 0.55) row.push(1);
        else if (randomVal < 0.78) row.push(2);
        else if (randomVal < 0.92) row.push(3);
        else row.push(4);
      }
      grid.push(row);
    }
    setWeeks(grid);
  }, []);

  const getGreenColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-neutral-900/60 border border-card-border/20';
      case 1: return 'bg-emerald-950/80';
      case 2: return 'bg-emerald-800/80';
      case 3: return 'bg-emerald-600/80';
      case 4: return 'bg-emerald-400/80';
      default: return 'bg-neutral-900';
    }
  };

  const topLanguages = [
    { name: 'Python', percentage: 48, color: 'bg-blue-500' },
    { name: 'TypeScript / JS', percentage: 32, color: 'bg-yellow-500' },
    { name: 'HTML / CSS', percentage: 12, color: 'bg-purple-500' },
    { name: 'Bash / Shell', percentage: 8, color: 'bg-emerald-500' }
  ];

  return (
    <section id="github-stats" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            Telemetry
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            GitHub Activity
          </h2>
          <div className="h-0.5 w-12 bg-accent mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: Contribution Grid Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 p-6 rounded-2xl border border-card-border bg-card-bg flex flex-col justify-between shadow-md glass"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-mono tracking-wider text-fg-custom">
                  contributions_heatmap.sh
                </h3>
                <span className="text-[10px] font-mono text-text-muted">
                  saranasai-21 / 2025 Contributions
                </span>
              </div>

              {/* Contribution Grid */}
              <div className="overflow-x-auto no-scrollbar py-2 w-full">
                <div className="flex flex-col gap-1.5 min-w-[380px]">
                  {weeks.map((row, dayIdx) => (
                    <div key={dayIdx} className="flex gap-1.5">
                      {row.map((level, weekIdx) => (
                        <div
                          key={weekIdx}
                          className={`w-3.5 h-3.5 rounded-sm shrink-0 transition-all hover:scale-125 duration-100 ${getGreenColor(level)}`}
                          title={`Contribution level: ${level}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-card-border/40 text-[10px] font-mono text-neutral-500">
              <span>Less</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-neutral-900/60" />
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-950/80" />
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-800/80" />
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600/80" />
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400/80" />
              </div>
              <span>More</span>
            </div>
          </motion.div>

          {/* Card 2: Numeric stats counters */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 grid grid-cols-2 gap-4 w-full"
          >
            {/* Repos */}
            <div className="p-4 rounded-xl border border-card-border bg-card-bg flex flex-col justify-between shadow-sm glass">
              <BookOpen className="text-blue-500 mb-4" size={18} />
              <div>
                <div className="text-2xl font-extrabold text-fg-custom">
                  <StatsCounter value={24} />
                </div>
                <p className="text-[10px] font-mono text-text-muted mt-1 uppercase">Repositories</p>
              </div>
            </div>

            {/* Stars */}
            <div className="p-4 rounded-xl border border-card-border bg-card-bg flex flex-col justify-between shadow-sm glass">
              <Star className="text-yellow-500 mb-4" size={18} />
              <div>
                <div className="text-2xl font-extrabold text-fg-custom">
                  <StatsCounter value={45} />
                </div>
                <p className="text-[10px] font-mono text-text-muted mt-1 uppercase">Stars</p>
              </div>
            </div>

            {/* Followers */}
            <div className="p-4 rounded-xl border border-card-border bg-card-bg flex flex-col justify-between shadow-sm glass">
              <Users className="text-purple-500 mb-4" size={18} />
              <div>
                <div className="text-2xl font-extrabold text-fg-custom">
                  <StatsCounter value={120} />
                </div>
                <p className="text-[10px] font-mono text-text-muted mt-1 uppercase">Followers</p>
              </div>
            </div>

            {/* Commits */}
            <div className="p-4 rounded-xl border border-card-border bg-card-bg flex flex-col justify-between shadow-sm glass">
              <GitPullRequest className="text-emerald-500 mb-4" size={18} />
              <div>
                <div className="text-2xl font-extrabold text-fg-custom">
                  <StatsCounter value={980} />
                </div>
                <p className="text-[10px] font-mono text-text-muted mt-1 uppercase">Total Commits</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Card 3: Top Languages Bar metrics */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 rounded-2xl border border-card-border bg-card-bg shadow-md mt-8 w-full glass"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-mono tracking-wider text-fg-custom">
              repository_language_shares.json
            </h3>
            <span className="text-[10px] font-mono text-text-muted">
              Aggregate metrics
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {/* Unified aggregate progress bar */}
            <div className="h-4 w-full bg-neutral-900 rounded-full overflow-hidden flex border border-card-border/40">
              {topLanguages.map((lang, idx) => (
                <div
                  key={idx}
                  className={`h-full ${lang.color} transition-all duration-300`}
                  style={{ width: `${lang.percentage}%` }}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>

            {/* Legend Labels Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
              {topLanguages.map((lang, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${lang.color}`} />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-fg-custom">{lang.name}</span>
                    <span className="text-[10px] font-mono text-text-muted">{lang.percentage}% share</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
