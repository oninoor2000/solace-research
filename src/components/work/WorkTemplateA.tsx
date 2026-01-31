import type { Project, TechItem } from "@/types";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Box, Cloud, Cpu, Database, Github } from "lucide-react";
import { useRef } from "react";

interface TemplateAProps {
  project: Project;
}

export default function TemplateA({ project }: TemplateAProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const getCategoryIcon = (category: TechItem["category"]) => {
    const icons = {
      frontend: <Box size={14} />,
      backend: <Cpu size={14} />,
      database: <Database size={14} />,
      infrastructure: <Cloud size={14} />,
      tools: <Cpu size={14} />,
    };
    return icons[category];
  };

  return (
    <article className="bg-background text-foreground min-h-screen">
      {/* Grid Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Back Navigation */}
      <motion.a
        href="/work"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 font-mono text-sm text-white/60 transition-colors hover:text-white"
      >
        <ArrowLeft size={16} />
        <span className="text-xs tracking-widest uppercase">Archive</span>
      </motion.a>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex h-screen items-center justify-center overflow-hidden"
      >
        <motion.div style={{ y, opacity, scale }} className="absolute inset-0">
          {/* Wireframe Background Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              viewBox="0 0 800 600"
              className="w-full max-w-4xl opacity-10"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            >
              {/* Abstract system architecture wireframe */}
              <rect x="100" y="100" width="200" height="120" rx="4" />
              <rect x="350" y="80" width="150" height="80" rx="4" />
              <rect x="550" y="120" width="180" height="100" rx="4" />
              <rect x="200" y="280" width="160" height="100" rx="4" />
              <rect x="420" y="250" width="200" height="140" rx="4" />
              <rect x="150" y="440" width="180" height="100" rx="4" />
              <rect x="400" y="450" width="160" height="90" rx="4" />
              {/* Connection lines */}
              <path d="M200 220 L280 280" strokeDasharray="4,4" />
              <path d="M425 160 L360 280" strokeDasharray="4,4" />
              <path d="M520 250 L640 220" strokeDasharray="4,4" />
              <path d="M280 380 L240 440" strokeDasharray="4,4" />
              <path d="M520 390 L480 450" strokeDasharray="4,4" />
              {/* Decorative circles */}
              <circle cx="200" cy="160" r="8" />
              <circle cx="520" cy="320" r="8" />
              <circle cx="330" cy="490" r="8" />
            </svg>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex items-center justify-center gap-4"
          >
            <span className="font-mono text-sm text-white/40">
              [{project.id}]
            </span>
            <span className="h-px w-8 bg-white/20" />
            <span className="font-mono text-sm tracking-widest text-white/40 uppercase">
              {project.category}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-tech mb-8 text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-white/60 md:text-xl"
          >
            {project.domain}
          </motion.p>

          {/* Device Mockup Floating */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="perspective-1000 mt-16"
          >
            <div className="glass-panel relative mx-auto aspect-video w-full max-w-3xl transform overflow-hidden rounded-lg transition-transform duration-700 hover:rotate-x-2 hover:rotate-y-2">
              <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-sm text-white/20">
                  [ System Interface Preview ]
                </span>
              </div>
              {/* Window Chrome */}
              <div className="absolute top-0 right-0 left-0 flex h-8 items-center gap-2 bg-white/5 px-4">
                <div className="h-3 w-3 rounded-full bg-white/20" />
                <div className="h-3 w-3 rounded-full bg-white/20" />
                <div className="h-3 w-3 rounded-full bg-white/20" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meta Information */}
      <section className="border-t border-white/10 py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Year", value: project.year.toString() },
              { label: "Client", value: project.client || "—" },
              { label: "Duration", value: project.duration || "—" },
              { label: "Status", value: project.status || "completed" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="border-l border-white/20 pl-6"
              >
                <span className="mb-2 block font-mono text-[10px] tracking-widest text-white/40 uppercase">
                  {item.label}
                </span>
                <span className="font-tech text-lg text-white capitalize">
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Abstract / Overview */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h2 className="mb-8 font-mono text-xs tracking-widest text-white/40 uppercase">
              // Overview
            </h2>
            <p className="font-sans text-2xl leading-relaxed text-white/90 md:text-3xl">
              {project.abstract}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      {project.techStack && (
        <section className="border-t border-white/10 py-24">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12 font-mono text-xs tracking-widest text-white/40 uppercase"
            >
              // Technology Stack
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
              className="grid grid-cols-2 gap-4 md:grid-cols-4"
            >
              {project.techStack.map((tech) => (
                <motion.div
                  key={tech.name}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="group border border-white/10 p-6 transition-colors duration-300 hover:border-white/30 hover:bg-white/5"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-white/40 transition-colors group-hover:text-white/60">
                      {getCategoryIcon(tech.category)}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">
                      {tech.category}
                    </span>
                  </div>
                  <span className="font-tech text-lg text-white">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Architecture */}
      {project.architecture && (
        <section className="border-t border-white/10 py-24">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12 font-mono text-xs tracking-widest text-white/40 uppercase"
            >
              // System Architecture
            </motion.h2>

            <div className="grid items-center gap-16 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <p className="mb-8 font-sans text-lg leading-relaxed text-white/70">
                  {project.architecture.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex aspect-square items-center justify-center border border-white/10 bg-white/5"
              >
                <span className="font-mono text-sm text-white/20">
                  [ Architecture Diagram ]
                </span>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {project.features && (
        <section className="border-t border-white/10 py-24">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="mb-12 font-mono text-xs tracking-widest text-white/40 uppercase"
            >
              // Key Features
            </motion.h2>

            <div className="space-y-4">
              {project.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex items-center gap-6 border-b border-white/10 py-4 transition-colors hover:border-white/30"
                >
                  <span className="w-8 font-mono text-sm text-white/30">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="font-sans text-lg text-white/80 transition-transform group-hover:translate-x-2">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Deployment */}
      {project.deployment && (
        <section className="border-t border-white/10 py-24">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-12 font-mono text-xs tracking-widest text-white/40 uppercase"
            >
              // Deployment
            </motion.h2>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="border border-white/10 p-8">
                <span className="mb-4 block font-mono text-[10px] tracking-widest text-white/40 uppercase">
                  Platform
                </span>
                <span className="font-tech text-2xl text-white">
                  {project.deployment.platform}
                </span>
              </div>
              <div className="border border-white/10 p-8">
                <span className="mb-4 block font-mono text-[10px] tracking-widest text-white/40 uppercase">
                  Infrastructure
                </span>
                <span className="font-tech text-2xl text-white">
                  {project.deployment.infrastructure}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA / Links */}
      <section className="border-t border-white/10 py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-white/20 px-8 py-4 font-mono text-sm tracking-widest text-white uppercase transition-all duration-300 hover:bg-white hover:text-black"
              >
                <Github size={18} />
                View Source
              </a>
            )}
            <a
              href="/work"
              className="flex items-center gap-3 font-mono text-sm tracking-widest text-white/60 uppercase transition-colors hover:text-white"
            >
              <ArrowLeft size={18} />
              Back to Archive
            </a>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
