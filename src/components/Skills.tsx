'use client';

import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

export default function Skills() {
  const categories: SkillCategory[] = [
    {
      title: 'AI & Machine Learning',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'Generative AI', level: 92 },
        { name: 'LangChain & LangGraph', level: 90 },
        { name: 'Retrieval-Augmented Gen (RAG)', level: 88 },
        { name: 'Vector Databases (Pinecone/Chroma)', level: 85 },
        { name: 'Prompt Engineering', level: 90 },
        { name: 'Google Gemini', level: 92 }
      ]
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'FastAPI', level: 90 },
        { name: 'Flask', level: 85 },
        { name: 'Node.js', level: 75 },
        { name: 'SQLAlchemy', level: 85 },
        { name: 'PostgreSQL & MySQL', level: 88 }
      ]
    },
    {
      title: 'Frontend & UI',
      skills: [
        { name: 'React', level: 88 },
        { name: 'Next.js', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Streamlit', level: 92 }
      ]
    },
    {
      title: 'Tools & DevOps',
      skills: [
        { name: 'Docker', level: 85 },
        { name: 'Git & GitHub', level: 90 },
        { name: 'VS Code & Linux', level: 88 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            Skills
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Technical Arsenal
          </h2>
          <div className="h-0.5 w-12 bg-accent mt-4" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              className="p-6 rounded-2xl border border-card-border bg-card-bg glass shadow-md"
            >
              <h3 className="text-lg font-semibold tracking-tight text-fg-custom border-b border-card-border/60 pb-3 mb-5">
                {category.title}
              </h3>
              
              <div className="flex flex-col gap-4">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-fg-custom font-mono">{skill.name}</span>
                      <span className="text-text-muted font-mono">{skill.level}%</span>
                    </div>
                    
                    {/* Progress Bar Track */}
                    <div className="h-1.5 w-full bg-neutral-900/60 dark:bg-black/60 rounded-full overflow-hidden border border-card-border/20">
                      <motion.div
                        className="h-full bg-accent rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: skillIdx * 0.05 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
