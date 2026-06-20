'use client';

import { motion } from 'framer-motion';
import { Star, MessageSquareQuote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  org: string;
  quote: string;
  rating: number;
  avatarLetter: string;
  avatarColor: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: 'Aravind Kumar',
      role: 'Engineering Lead',
      org: 'TechScale Analytics',
      quote: 'Sarana is an exceptional developer. He took our manual document querying processes and built an automated RAG search engine that saves our analyst team 15+ hours every week. Extremely proactive!',
      rating: 5,
      avatarLetter: 'A',
      avatarColor: 'bg-blue-500'
    },
    {
      name: 'Priya Sharma',
      role: 'Product Manager',
      org: 'MedCore Solutions',
      quote: 'Working with Sarana on our Medical Coding triage helper was seamless. He quantized our ResNet models to run locally on standard edge CPUs, speeding up classification 4x while maintaining high sensitivity.',
      rating: 5,
      avatarLetter: 'P',
      avatarColor: 'bg-emerald-500'
    },
    {
      name: 'Michael Chen',
      role: 'AI Infrastructure Architect',
      org: 'Vercel Advisor',
      quote: 'Sarana builds systems, not just code. His SQL AI assistant shows a deep understanding of database security, schema grounding, and AST query validation. A developer who understands production requirements.',
      rating: 5,
      avatarLetter: 'M',
      avatarColor: 'bg-purple-500'
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-neutral-950/10">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            Endorsements
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Testimonials
          </h2>
          <div className="h-0.5 w-12 bg-accent mt-4" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-card-border bg-card-bg shadow-md flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200 glass"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: test.rating }).map((_, sidx) => (
                      <Star key={sidx} size={13} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <MessageSquareQuote className="text-accent/30" size={24} />
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-text-muted italic mb-6">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              {/* Profile Details */}
              <div className="flex items-center gap-3 border-t border-card-border/30 pt-4">
                <div className={`w-9 h-9 rounded-full ${test.avatarColor} text-white flex items-center justify-center font-bold text-xs uppercase font-mono`}>
                  {test.avatarLetter}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-fg-custom leading-tight">
                    {test.name}
                  </h4>
                  <p className="text-[10px] text-text-muted mt-0.5">
                    {test.role} · <span className="font-semibold text-accent">{test.org}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
