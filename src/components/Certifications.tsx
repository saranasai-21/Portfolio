'use client';

import { motion } from 'framer-motion';
import { Award, CheckCircle2, ShieldCheck, Link as LinkIcon } from 'lucide-react';

interface Cert {
  title: string;
  issuer: string;
  date: string;
  credId: string;
  link: string;
  icon: React.ReactNode;
}

export default function Certifications() {
  const certs: Cert[] = [
    {
      title: 'Generative AI Developer',
      issuer: 'DeepLearning.AI & Google',
      date: '2024',
      credId: 'CRED-GENAI-9941',
      link: '#',
      icon: <ShieldCheck className="text-blue-500" size={20} />
    },
    {
      title: 'LangChain & LangGraph Specialist',
      issuer: 'DeepLearning.AI',
      date: '2024',
      credId: 'CRED-LC-4482',
      link: '#',
      icon: <Award className="text-purple-500" size={20} />
    },
    {
      title: 'Advanced Python Programming',
      issuer: 'HackerRank / Coursera',
      date: '2024',
      credId: 'CRED-PY-8841',
      link: '#',
      icon: <CheckCircle2 className="text-emerald-500" size={20} />
    },
    {
      title: 'SQL Database Tuning & Analytics',
      issuer: 'HackerRank',
      date: '2024',
      credId: 'CRED-SQL-1209',
      link: '#',
      icon: <ShieldCheck className="text-amber-500" size={20} />
    },
    {
      title: 'Applied Machine Learning',
      issuer: 'Coursera / Stanford',
      date: '2024',
      credId: 'CRED-ML-3329',
      link: '#',
      icon: <Award className="text-red-500" size={20} />
    },
    {
      title: 'Docker & Container Infrastructure',
      issuer: 'Docker Academy',
      date: '2024',
      credId: 'CRED-DKR-7751',
      link: '#',
      icon: <CheckCircle2 className="text-cyan-500" size={20} />
    },
    {
      title: 'Cloud Computing & MLOps Foundations',
      issuer: 'Google Cloud Platform (GCP)',
      date: '2024',
      credId: 'CRED-GCP-8849',
      link: '#',
      icon: <ShieldCheck className="text-blue-400" size={20} />
    }
  ];

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Certifications
          </h2>
          <div className="h-0.5 w-12 bg-accent mt-4" />
        </div>

        {/* Certs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certs.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="p-5 rounded-2xl border border-card-border bg-card-bg flex flex-col justify-between shadow-md relative hover:scale-[1.02] transition-transform duration-200 group glass"
            >
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-card-border/40 pb-3">
                  <div className="p-2 rounded-lg border border-card-border/60 bg-neutral-950/20">
                    {cert.icon}
                  </div>
                  <span className="text-[10px] font-mono text-text-muted">
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-sm font-bold tracking-tight text-fg-custom leading-tight group-hover:text-accent transition-colors mb-1.5">
                  {cert.title}
                </h3>
                
                <p className="text-xs font-mono text-accent">
                  {cert.issuer}
                </p>
              </div>

              <div className="flex items-center justify-between mt-5 pt-3 border-t border-card-border/20">
                <span className="text-[9px] font-mono text-neutral-500 uppercase">
                  ID: {cert.credId}
                </span>
                <a
                  href={cert.link}
                  className="inline-flex items-center gap-1 text-[10px] font-mono text-text-muted hover:text-fg-custom transition-colors cursor-pointer"
                >
                  <LinkIcon size={10} />
                  Verify
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
