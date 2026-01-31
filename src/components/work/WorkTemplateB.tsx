import type { DataMetric, Project } from "@/types";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TemplateBProps {
  project: Project;
}

export default function WorkTemplateB({ project }: TemplateBProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [1, 1, 0]);

  return (
    <article className="bg-background text-foreground min-h-screen">
      {/* Back Navigation */}
      <motion.a
        href="/work"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 font-sans text-sm text-white/60 transition-colors hover:text-white"
      >
        <ArrowLeft size={16} />
        <span className="text-xs tracking-widest uppercase">Archive</span>
      </motion.a>

      {/* Hero Section - Editorial Style */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden py-32"
      >
        <motion.div
          style={{ y, opacity }}
          className="container mx-auto px-6 md:px-12 lg:px-24"
        >
          {/* Top Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 flex items-center gap-6"
          >
            <span className="font-sans text-sm tracking-widest text-white/40 uppercase">
              {project.category}
            </span>
            <span className="h-px w-16 bg-white/20" />
            <span className="font-sans text-sm text-white/40">
              {project.year}
            </span>
          </motion.div>

          {/* Title - Massive Editorial Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-display mb-16 max-w-5xl text-5xl leading-[0.9] text-white md:text-7xl lg:text-8xl xl:text-9xl"
          >
            {project.title}
          </motion.h1>

          {/* Abstract as Kinetic Typography */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl"
          >
            <KineticAbstract text={project.abstract} />
          </motion.div>

          {/* Domain Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <span className="inline-block border border-white/20 px-6 py-3 font-sans text-sm tracking-widest text-white/60 uppercase">
              {project.domain}
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="h-16 w-px animate-pulse bg-linear-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* Meta Information - Editorial Layout */}
      <section className="border-t border-white/10 py-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
            {[
              { label: "Year", value: project.year.toString() },
              { label: "Client", value: project.client ?? "—" },
              { label: "Duration", value: project.duration ?? "—" },
              {
                label: "Citations",
                value: project.citations?.toString() ?? "—",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="mb-3 block font-sans text-xs tracking-[0.2em] text-white/40 uppercase">
                  {item.label}
                </span>
                <span className="font-display text-2xl text-white italic">
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Findings - Data Counters */}
      {project.keyFindings && (
        <section className="border-t border-white/10 py-32">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="font-display mb-20 text-4xl text-white italic md:text-5xl"
            >
              Key Findings
            </motion.h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
              {project.keyFindings.map((finding, i) => (
                <AnimatedCounter key={i} metric={finding} delay={i * 0.15} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Map Visualization Placeholder */}
      {project.mapData && (
        <section className="border-t border-white/10 py-32">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid items-center gap-16 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <h2 className="font-display mb-8 text-4xl text-white italic md:text-5xl">
                  Geographic Reach
                </h2>
                <p className="mb-8 font-sans text-lg text-white/60">
                  Coverage:{" "}
                  <span className="text-white">{project.mapData.coverage}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.mapData.regions.map((region) => (
                    <span
                      key={region}
                      className="border border-white/20 px-4 py-2 font-sans text-sm text-white/60"
                    >
                      {region}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex aspect-square items-center justify-center border border-white/10 bg-white/2"
              >
                <span className="font-sans text-sm text-white/20 italic">
                  [ Map Visualization ]
                </span>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Collaborators */}
      {project.collaborators && (
        <section className="border-t border-white/10 py-32">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="font-display mb-16 text-4xl text-white italic md:text-5xl"
            >
              In Collaboration With
            </motion.h2>

            <div className="flex flex-wrap gap-4">
              {project.collaborators.map((collaborator, i) => (
                <motion.div
                  key={collaborator}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-white/20 px-8 py-4 font-sans text-lg text-white"
                >
                  {collaborator}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA / Back */}
      <section className="border-t border-white/10 py-24">
        <div className="container mx-auto px-6 text-center md:px-12 lg:px-24">
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            href="/work"
            className="inline-flex items-center gap-3 font-sans text-sm tracking-widest text-white/60 uppercase transition-colors hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Archive
          </motion.a>
        </div>
      </section>
    </article>
  );
}

// Kinetic Abstract Component - Word-by-word reveal
function KineticAbstract({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <p className="font-display text-2xl leading-relaxed text-white/80 italic md:text-3xl lg:text-4xl">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5 + i * 0.03,
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mr-[0.3em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

// Animated Counter Component
function AnimatedCounter({
  metric,
  delay,
}: {
  metric: DataMetric;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric value
    const numericMatch = metric.value.match(/[\d.]+/);
    if (!numericMatch) {
      setDisplayValue(metric.value);
      return;
    }

    const targetNum = parseFloat(numericMatch[0]);
    const prefix = metric.value.slice(0, metric.value.indexOf(numericMatch[0]));
    const suffix = metric.value.slice(
      metric.value.indexOf(numericMatch[0]) + numericMatch[0].length
    );

    let startTime: number;
    const duration = 1500;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * eased;

      // Format based on original value
      const formatted = numericMatch[0].includes(".")
        ? current.toFixed(1)
        : Math.floor(current).toString();

      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, metric.value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay }}
      className="min-w-0 text-center sm:text-left"
    >
      <div className="mb-4 flex flex-wrap items-baseline gap-1 sm:gap-2">
        <span className="font-display text-4xl text-white sm:text-5xl lg:text-6xl">
          {displayValue}
        </span>
        {metric.unit && (
          <span className="font-sans text-lg text-white/40 sm:text-xl">
            {metric.unit}
          </span>
        )}
      </div>
      <span className="wrap-break-words block font-sans text-sm leading-snug text-white/60">
        {metric.label}
      </span>
      {metric.description && (
        <span className="wrap-break-words mt-1 block font-sans text-xs leading-snug text-white/40">
          {metric.description}
        </span>
      )}
    </motion.div>
  );
}
