'use client';

import { motion } from 'framer-motion';
import { Calendar, Briefcase, ChevronRight } from 'lucide-react';

interface TimelineItem {
  role: string;
  org: string;
  period: string;
  desc: string[];
  tech: string[];
}

export default function Experience() {
  const experiences: TimelineItem[] = [
    {
      role: 'AI Developer & Systems Researcher',
      org: 'Self-Directed Ongoing Study',
      period: '2025 – Present',
      desc: [
        'Studying distributed model serving frameworks including Ray and vLLM for high-throughput serving infra.',
        'Implementing LLM evaluation frameworks (RAGAS, DeepEval) to systematically quantify retrieval precision and generation toxicity.',
        'Designing GitOps MLOps pipelines on local Kubernetes environments to monitor covariate drift and Population Stability Index (PSI).'
      ],
      tech: ['vLLM', 'Ray', 'RAGAS', 'DeepEval', 'Kubernetes', 'MLOps']
    },
    {
      role: 'AI/ML Engineer Intern',
      org: 'Edunet Foundation',
      period: 'Jan – Mar 2025',
      desc: [
        'Led development of a clinical chest radiography classification pipeline, delivering a ResNet-50 architecture with 96.1% triage recall.',
        'Compiled and quantized PyTorch weights to INT8 via ONNX Runtime, reducing edge CPU inference latency from 52ms to 12ms (4.2x speedup).',
        'Deployed containerized inference pipeline on Triton Inference Server, embedding Grad-CAM attention heatmap layers for auditability.'
      ],
      tech: ['PyTorch', 'ONNX Runtime', 'Triton Server', 'Docker', 'Grad-CAM', 'OpenCV']
    },
    {
      role: 'Full Stack & Automation Developer',
      org: 'Independent AI Engineering Projects',
      period: '2024 – 2025',
      desc: [
        'Built a multi-agent text-to-SQL analytics compiler using LLaMA-3 (Groq) and LangChain multi-agent execution graphs.',
        'Architected a hybrid-search RAG pipeline fusing BGE-M3 dense embeddings and BM25 sparse vectors, achieving 91.2% retrieval accuracy.',
        'Integrated a local Redis semantic cache layer (GPTCache) to query duplicate contexts in sub-80ms, cutting LLM token costs by 32%.'
      ],
      tech: ['FastAPI', 'React', 'LangChain', 'Redis', 'Pinecone', 'SQLAlchemy']
    }
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            History
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Experience Timeline
          </h2>
          <div className="h-0.5 w-12 bg-accent mt-4" />
        </div>

        {/* Timeline wrapper */}
        <div className="relative border-l border-card-border/80 pl-6 sm:pl-8 ml-4 sm:ml-6 flex flex-col gap-12">
          
          {/* Vertical Track scale line */}
          <div className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-neutral-900 dark:bg-neutral-800 pointer-events-none" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-31px] sm:left-[-39px] top-1.5 z-10 w-4 h-4 rounded-full border border-accent bg-background flex items-center justify-center group-hover:scale-125 transition-transform duration-200 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              </div>

              {/* Card Container */}
              <div className="p-6 rounded-2xl border border-card-border bg-card-bg glass shadow-md flex flex-col gap-4">
                
                {/* Meta details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-card-border/60 pb-3">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-fg-custom">
                      {exp.role}
                    </h3>
                    <p className="text-xs font-semibold text-accent font-mono mt-0.5">
                      {exp.org}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-text-muted font-mono bg-neutral-950/20 px-2.5 py-1 rounded-full border border-card-border/60 max-w-fit">
                    <Calendar size={12} />
                    {exp.period}
                  </div>
                </div>

                {/* Achievements List */}
                <ul className="flex flex-col gap-2.5">
                  {exp.desc.map((bullet, bidx) => (
                    <li key={bidx} className="flex items-start gap-2 text-xs sm:text-sm text-text-muted leading-relaxed">
                      <ChevronRight className="text-accent shrink-0 mt-0.5" size={14} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mt-2 border-t border-card-border/40 pt-4">
                  {exp.tech.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-fg-custom px-2 py-0.5 rounded border border-card-border bg-neutral-950/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
