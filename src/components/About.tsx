'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { Award, Briefcase, Flame } from 'lucide-react';

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ value, suffix = '', duration = 1.5 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMs = duration * 1000;
    const stepTime = Math.max(Math.floor(totalMs / end), 15);

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

  return (
    <span ref={ref} className="font-mono">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const stats = [
    {
      icon: <Briefcase className="text-blue-500 mb-2" size={24} />,
      label: 'Years of Experience',
      value: 2,
      suffix: '+',
      desc: 'Developing software & AI solutions.'
    },
    {
      icon: <Award className="text-purple-500 mb-2" size={24} />,
      label: 'Projects Completed',
      value: 10,
      suffix: '+',
      desc: 'RAG pipelines, agents, dashboards.'
    },
    {
      icon: <Flame className="text-emerald-500 mb-2" size={24} />,
      label: 'Technologies Mastered',
      value: 15,
      suffix: '+',
      desc: 'Python, React, FastAPI, Docker.'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Engineering the Intelligence Interface
          </h2>
          <div className="h-0.5 w-12 bg-accent mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Bio text column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Software Engineer passionate about AI and Full Stack Development.
            </h3>
            
            <p className="text-text-muted leading-relaxed text-sm sm:text-base">
              I specialize in bridging the gap between cutting-edge foundational models and robust, user-facing production systems. I build practical AI applications, retrieval-augmented generation (RAG) models, and agentic workflows that optimize complexity and bring automated value to teams.
            </p>

            <p className="text-text-muted leading-relaxed text-sm sm:text-base">
              My engineering stack focuses on **Python**, **React**, **FastAPI**, **LangChain**, and **Docker**. I build for low latency, secure database interactions, and auditable telemetry, ensuring every pipeline handles real-world workloads seamlessly.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="p-4 rounded-xl border border-card-border/60 bg-card-bg/40 glass">
                <p className="text-xs font-mono text-neutral-500 uppercase">Core Focus</p>
                <p className="text-sm font-semibold mt-1">Practical AI Agents</p>
              </div>
              <div className="p-4 rounded-xl border border-card-border/60 bg-card-bg/40 glass">
                <p className="text-xs font-mono text-neutral-500 uppercase">Architecture</p>
                <p className="text-sm font-semibold mt-1">Robust Orchestration</p>
              </div>
            </div>
          </motion.div>

          {/* Stats grid column */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 w-full">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-card-border bg-card-bg glass flex flex-col items-center text-center lg:items-start lg:text-left shadow-md hover:scale-[1.02] transition-transform duration-200"
              >
                {stat.icon}
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-fg-custom">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <h4 className="text-sm font-semibold tracking-wide text-fg-custom mt-2">
                  {stat.label}
                </h4>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
