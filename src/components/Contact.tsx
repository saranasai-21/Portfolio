'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, AlertCircle, CheckCircle } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!form.name.trim()) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!form.email.trim()) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Email address is invalid';
      isValid = false;
    }

    if (!form.message.trim()) {
      tempErrors.message = 'Message is required';
      isValid = false;
    } else if (form.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error dynamically as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setForm({ name: '', email: '', message: '' });
  };

  const socials = [
    { icon: <Mail size={16} />, label: 'Email', val: 'saranasaibagadi@gmail.com', href: 'mailto:saranasaibagadi@gmail.com' },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      label: 'LinkedIn',
      val: 'linkedin.com/in/sarana-sai-bagadi',
      href: 'https://linkedin.com/in/sarana-sai-bagadi'
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
      label: 'GitHub',
      val: 'github.com/SaranaSaiBagadi',
      href: 'https://github.com/SaranaSaiBagadi'
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      label: 'Twitter',
      val: 'x.com/saranasai',
      href: '#'
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            Connection
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Get In Touch
          </h2>
          <div className="h-0.5 w-12 bg-accent mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-6">
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                Let&apos;s build something intelligent.
              </h3>
              <p className="text-text-muted leading-relaxed text-sm sm:text-base">
                Whether you want to discuss full-time roles, contract AI systems design, RAG pipelines, or quantization workloads — drop a message.
              </p>
              
              <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-card-bg/50 max-w-fit text-[10px] font-mono text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                Response time: &lt;24 hours
              </div>
            </div>

            {/* Social List */}
            <div className="flex flex-col gap-4 mt-8 lg:mt-0">
              {socials.map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  target={soc.href.startsWith('http') ? '_blank' : undefined}
                  rel={soc.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-3.5 rounded-xl border border-card-border/60 bg-card-bg/40 hover:bg-neutral-100 dark:hover:bg-neutral-900/50 hover:border-accent/40 transition-all duration-200 group glass"
                >
                  <div className="p-2.5 rounded-lg border border-card-border bg-card-bg text-text-muted group-hover:text-accent group-hover:border-accent/40 transition-colors">
                    {soc.icon}
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-neutral-500 uppercase">{soc.label}</p>
                    <p className="text-xs sm:text-sm font-semibold text-fg-custom mt-0.5">{soc.val}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-6 rounded-2xl border border-card-border bg-card-bg glass shadow-lg min-h-[380px] flex flex-col justify-center relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        placeholder="John Doe"
                        className={`w-full h-11 px-4 text-xs font-mono bg-neutral-950/20 border rounded-xl outline-none transition-colors ${
                          errors.name ? 'border-red-500 focus:border-red-500' : 'border-card-border focus:border-accent'
                        } text-fg-custom`}
                      />
                      {errors.name && (
                        <span className="flex items-center gap-1 text-[10px] text-red-500 font-mono mt-1">
                          <AlertCircle size={10} />
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        placeholder="john@example.com"
                        className={`w-full h-11 px-4 text-xs font-mono bg-neutral-950/20 border rounded-xl outline-none transition-colors ${
                          errors.email ? 'border-red-500 focus:border-red-500' : 'border-card-border focus:border-accent'
                        } text-fg-custom`}
                      />
                      {errors.email && (
                        <span className="flex items-center gap-1 text-[10px] text-red-500 font-mono mt-1">
                          <AlertCircle size={10} />
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        placeholder="Hi Sarana, let's discuss..."
                        className={`w-full p-4 text-xs font-mono bg-neutral-950/20 border rounded-xl outline-none transition-colors resize-none ${
                          errors.message ? 'border-red-500 focus:border-red-500' : 'border-card-border focus:border-accent'
                        } text-fg-custom`}
                      />
                      {errors.message && (
                        <span className="flex items-center gap-1 text-[10px] text-red-500 font-mono mt-1">
                          <AlertCircle size={10} />
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-fg-custom text-bg-custom hover:opacity-90 disabled:opacity-50 transition-opacity font-semibold text-sm cursor-pointer mt-2 shadow-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin h-4 w-4 border-2 border-bg-custom border-t-transparent rounded-full" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={13} />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center text-center gap-4 py-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <CheckCircle className="text-emerald-500 h-12 w-12" />
                    <div>
                      <h4 className="text-lg font-bold text-fg-custom">Message Sent Successfully</h4>
                      <p className="text-xs text-text-muted mt-2 max-w-[280px]">
                        Thank you for reaching out. Sarana will get back to you shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-4 text-xs font-mono font-bold text-accent hover:underline cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
