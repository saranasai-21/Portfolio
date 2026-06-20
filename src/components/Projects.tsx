'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, FileSpreadsheet, MessageSquare, ShieldAlert, Database } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  features: string[];
  tech: string[];
  category: 'AI/ML' | 'Backend';
  github: string;
  demo: string;
  icon: React.ReactNode;
}

export default function Projects() {
  const [filter, setFilter] = useState<'All' | 'AI/ML' | 'Backend'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const projects: Project[] = [
    {
      title: 'AI Data Analyst',
      description: 'Enables users to upload structured tabular spreadsheets, automatically run statistical analyses, query telemetry, and generate downloadable PowerPoint presentations and interactive dashboards.',
      features: [
        'Interactive Excel & CSV Ingests',
        'Data Profiling & Correlation Analysis',
        'Dynamic Plotly Chart Rendering',
        'PPTX Export Generation'
      ],
      tech: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'PPTX Gen'],
      category: 'AI/ML',
      github: 'https://github.com/SaranaSaiBagadi',
      demo: '#',
      icon: <FileSpreadsheet className="text-blue-500" size={28} />
    },
    {
      title: 'Enterprise RAG Chatbot',
      description: 'A secure, high-precision retrieval-augmented generation question-answering agent designed for querying multiple legal, financial, or clinical PDF files.',
      features: [
        'Multi-PDF Chunking & Parsing',
        'ChromaDB Semantic Retrieval',
        'Persistent Session Memory',
        'Gemini Grounded Reasoning'
      ],
      tech: ['LangChain', 'Gemini API', 'ChromaDB', 'FastAPI'],
      category: 'AI/ML',
      github: 'https://github.com/SaranaSaiBagadi',
      demo: '#',
      icon: <MessageSquare className="text-purple-500" size={28} />
    },
    {
      title: 'Medical Coding Assistant',
      description: 'A clinical decision support tool designed to streamline auditing, lookup ICD coding classifications, and interpret unstructured electronic health records (EHR).',
      features: [
        'ICD-10 clinical code lookup',
        'Automated triage tags & alerts',
        'Unstructured medical text parsing',
        'Few-shot LLM grounding'
      ],
      tech: ['Python', 'Gemini API', 'Streamlit', 'Medical EHR'],
      category: 'AI/ML',
      github: 'https://github.com/SaranaSaiBagadi',
      demo: '#',
      icon: <ShieldAlert className="text-emerald-500" size={28} />
    },
    {
      title: 'SQL AI Assistant',
      description: 'A backend agent that translates raw English query intents into clean, optimized executable SQL queries and visualizes database schematics.',
      features: [
        'English to SQL compiler',
        'AST validation query shielding',
        'FastAPI API endpoints',
        'SQLAlchemy model layer'
      ],
      tech: ['FastAPI', 'SQLAlchemy', 'PostgreSQL', 'LangChain'],
      category: 'Backend',
      github: 'https://github.com/SaranaSaiBagadi',
      demo: '#',
      icon: <Database className="text-amber-500" size={28} />
    }
  ];

  // Filtering & Query logic
  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === 'All' || project.category === filter;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            Projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Featured Systems
          </h2>
          <div className="h-0.5 w-12 bg-accent mt-4" />
        </div>

        {/* Controls Layout */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 w-full">
          {/* Filters */}
          <div className="flex gap-2 p-1.5 rounded-full border border-card-border bg-card-bg glass w-full md:w-auto overflow-x-auto no-scrollbar">
            {(['All', 'AI/ML', 'Backend'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold font-mono tracking-wider transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-fg-custom text-bg-custom'
                    : 'text-text-muted hover:text-fg-custom'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 text-xs font-mono bg-card-bg border border-card-border rounded-full outline-none focus:border-accent text-fg-custom placeholder:text-neutral-500 glass"
            />
          </div>
        </div>

        {/* Grid Area */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="project-card p-6 rounded-2xl border border-card-border bg-card-bg flex flex-col justify-between shadow-lg relative group glass"
              >
                <div>
                  {/* Card Title & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl border border-card-border/80 bg-neutral-950/20">
                      {project.icon}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted px-2.5 py-1 rounded-full border border-card-border bg-card-bg/50">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-fg-custom mb-3 group-hover:text-accent transition-colors duration-200">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm leading-relaxed text-text-muted mb-5">
                    {project.description}
                  </p>

                  {/* Highlights list */}
                  <ul className="flex flex-col gap-2 mb-6">
                    {project.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-xs text-fg-custom font-mono">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono text-fg-custom px-2 py-0.5 rounded border border-card-border/60 bg-neutral-950/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-3 border-t border-card-border/40 pt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-fg-custom transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                      Code
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-fg-custom transition-colors cursor-pointer"
                    >
                      <ExternalLink size={13} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state query results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center gap-2"
          >
            <p className="text-sm font-mono text-neutral-500">No systems found matching query &quot;{searchQuery}&quot;</p>
          </motion.div>
        )}

      </div>
    </section>
  );
}
