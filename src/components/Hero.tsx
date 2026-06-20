'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Download, Terminal, Cpu, Blocks, Code2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const roles = ['Software Engineer', 'AI Developer', 'Full Stack Developer'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentRole = roles[roleIndex];
    
    const tick = () => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length === currentRole.length) {
          timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
          return;
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }
      
      const speed = isDeleting ? 40 : 80;
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const floaters = [
    { icon: <Cpu className="text-blue-500" size={20} />, x: '10%', y: '18%', duration: 5, delay: 0 },
    { icon: <Sparkles className="text-purple-400" size={18} />, x: '82%', y: '22%', duration: 6, delay: 1 },
    { icon: <Terminal className="text-emerald-500" size={16} />, x: '15%', y: '72%', duration: 4.5, delay: 0.5 },
    { icon: <Blocks className="text-amber-500" size={22} />, x: '85%', y: '68%', duration: 7, delay: 2 },
    { icon: <Code2 className="text-cyan-400" size={18} />, x: '48%', y: '82%', duration: 5.5, delay: 1.5 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Floating technology items */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {floaters.map((floater, idx) => (
          <motion.div
            key={idx}
            className="absolute p-3 rounded-xl border border-card-border bg-card-bg glass flex items-center justify-center shadow-md"
            style={{ left: floater.x, top: floater.y }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: floater.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: floater.delay
            }}
          >
            {floater.icon}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Column - Intro */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-card-border bg-card-bg text-xs font-mono font-medium text-accent uppercase tracking-wider"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Available for new opportunities
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-400">Sarana Sai</span> 👋
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-text-muted mt-2 block h-[48px] font-mono">
              {displayText}
              <span className="animate-blink text-accent ml-1 border-r-2 border-accent" />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl text-base sm:text-lg text-text-muted leading-relaxed"
          >
            I build AI-powered applications, RAG systems, intelligent chatbots, and scalable web applications that solve real-world problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4"
          >
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 h-12 rounded-full bg-fg-custom text-bg-custom hover:opacity-90 transition-opacity font-semibold text-sm cursor-pointer shadow-md"
            >
              View Projects
              <ArrowRight size={16} />
            </a>
            <a
              href="/resume.pdf"
              download
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 h-12 rounded-full border border-card-border bg-card-bg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors font-semibold text-sm cursor-pointer"
            >
              <Download size={16} />
              Download Resume
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 h-12 rounded-full border border-card-border hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors font-semibold text-sm cursor-pointer"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right Column - Premium Code Block Frame */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-[420px] rounded-2xl glass shadow-2xl overflow-hidden text-left"
          >
            {/* Header */}
            <div className="bg-neutral-900/60 dark:bg-black/50 border-b border-card-border px-4 py-3.5 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] font-mono text-neutral-500">sarana_agent.py</span>
              <Terminal size={14} className="text-neutral-500" />
            </div>

            {/* Code */}
            <pre className="p-5 font-mono text-[11px] leading-relaxed overflow-x-auto text-neutral-400 bg-neutral-950/40">
              <code>
                <span className="text-purple-400">class</span> <span className="text-blue-400">AIEngineer</span>:
                {"\n"}    <span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(<span className="text-orange-400">self</span>):
                {"\n"}        <span className="text-orange-400">self</span>.name = <span className="text-emerald-400">&quot;Sarana Sai Bagadi&quot;</span>
                {"\n"}        <span className="text-orange-400">self</span>.stack = [<span className="text-emerald-400">&quot;Python&quot;</span>, <span className="text-emerald-400">&quot;FastAPI&quot;</span>, <span className="text-emerald-400">&quot;LangChain&quot;</span>]
                {"\n"}        <span className="text-orange-400">self</span>.db = [<span className="text-emerald-400">&quot;PostgreSQL&quot;</span>, <span className="text-emerald-400">&quot;Pinecone&quot;</span>]
                {"\n"}
                {"\n"}    <span className="text-purple-400">def</span> <span className="text-blue-400">run_rag_pipeline</span>(<span className="text-orange-400">self</span>, <span className="text-orange-400">pdf_path</span>):
                {"\n"}        <span className="text-neutral-500"># Initializing vector space Q&A</span>
                {"\n"}        db = ChromaDB.load(<span className="text-orange-400">self</span>.db)
                {"\n"}        model = Gemini.client()
                {"\n"}        agent = LangGraph.build(db, model)
                {"\n"}        <span className="text-purple-400">return</span> agent.retrieve(<span className="text-emerald-400">&quot;Query summary&quot;</span>)
                {"\n"}
                {"\n"}    <span className="text-purple-400">def</span> <span className="text-blue-400">get_status</span>(<span className="text-orange-400">self</span>):
                {"\n"}        <span className="text-purple-400">return</span> <span className="text-emerald-400">&quot;Building scalable AI agents.&quot;</span>
                {"\n"}
                {"\n"}me = AIEngineer()
                {"\n"}<span className="text-purple-400">print</span>(me.get_status())
              </code>
            </pre>
            
            {/* Terminal mock outputs */}
            <div className="bg-neutral-950/70 border-t border-card-border/60 p-4 font-mono text-[10px]">
              <div className="flex items-center gap-1.5 text-neutral-500">
                <span>$ python sarana_agent.py</span>
              </div>
              <div className="text-emerald-400 mt-1">&gt; Building scalable AI agents.</div>
              <div className="text-blue-400 mt-0.5">&gt; Loading hybrid cache hit (80ms).</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
