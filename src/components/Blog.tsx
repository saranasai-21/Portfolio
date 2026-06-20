'use client';

import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';

interface Article {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  link: string;
}

export default function Blog() {
  const articles: Article[] = [
    {
      title: 'Quantizing LLM Backbone Inference for Edge CPU Deployments',
      excerpt: 'How we used ONNX Runtime quantization to convert clinical CNN parameters to INT8, achieving a 4.2x speedup and reducing inference execution latency from 52ms to 12ms.',
      category: 'Inference Engineering',
      date: 'Jun 12, 2025',
      readTime: '6 min read',
      link: '#'
    },
    {
      title: 'Preventing Data Leakage in Loan Delinquency Classifications',
      excerpt: 'A deep dive into why applying minority oversampling (SMOTE) before doing your cross-validation folds ruins test reliability, and how to apply SMOTE correctly inside validation steps.',
      category: 'Data Science',
      date: 'May 28, 2025',
      readTime: '5 min read',
      link: '#'
    },
    {
      title: 'Fusing Sparse and Dense Retrieval Matrices for Enterprise RAG',
      excerpt: 'Implementing Reciprocal Rank Fusion (RRF) to combine BM25 exact lexicons and BGE-M3 semantic vectors. Plus, setting up Redis-based caching to serve answers in sub-80ms.',
      category: 'RAG & Search',
      date: 'Apr 15, 2025',
      readTime: '8 min read',
      link: '#'
    }
  ];

  return (
    <section id="blog" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            Publications
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Engineering Insights
          </h2>
          <div className="h-0.5 w-12 bg-accent mt-4" />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-card-border bg-card-bg shadow-md flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200 group glass"
            >
              <div>
                {/* Meta Category & Dates */}
                <div className="flex items-center justify-between mb-4 text-[10px] font-mono">
                  <span className="text-accent uppercase tracking-wider font-semibold">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-2 text-text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />
                      {art.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {art.readTime}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold tracking-tight text-fg-custom leading-tight group-hover:text-accent transition-colors mb-3">
                  {art.title}
                </h3>
                
                <p className="text-xs text-text-muted leading-relaxed mb-6">
                  {art.excerpt}
                </p>
              </div>

              {/* Action read button */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-card-border/20">
                <a
                  href={art.link}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-fg-custom font-semibold group-hover:text-accent transition-colors cursor-pointer"
                >
                  Read Article
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
