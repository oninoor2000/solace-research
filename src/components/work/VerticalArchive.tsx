import { projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";

interface VerticalArchiveProps {
  onProjectClick?: (slug: string) => void;
}

export default function VerticalArchive({
  onProjectClick,
}: VerticalArchiveProps) {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState<Record<string, number>>({
    x: 0,
    y: 0,
  });
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">(
    "all"
  );

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <section
      className="bg-background relative min-h-screen py-24"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-2 block font-mono text-xs tracking-widest text-white/40 uppercase"
            >
              Archive / {filteredProjects.length.toString().padStart(2, "0")}{" "}
              Projects
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl text-white md:text-7xl"
            >
              The Work
            </motion.h1>
          </div>

          {/* Filter Tabs */}
          <div className="mt-6 flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm md:mt-0">
            {(["all", "engineering", "research", "policy"] as const).map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-white text-black"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {filter === "all"
                    ? "All"
                    : filter === "engineering"
                      ? "Dev"
                      : filter}
                </button>
              )
            )}
          </div>
        </div>

        {/* Project List */}
        <div className="space-y-0">
          {filteredProjects.map((project, index) => (
            <VerticalProjectRow
              key={project.id}
              project={project}
              index={index}
              onHover={(p) => setHoveredProject(p)}
              onLeave={() => setHoveredProject(null)}
              onClick={() => onProjectClick?.(project.slug)}
            />
          ))}
        </div>
      </div>

      {/* Floating Preview Image */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none fixed z-50 hidden h-[280px] w-[400px] lg:block"
            style={{
              left: mousePosition.x + 30,
              top: mousePosition.y - 140,
            }}
          >
            <div className="relative h-full w-full overflow-hidden">
              {/* Glass Refraction Effect */}
              <div className="absolute inset-0 z-10 bg-white/5 backdrop-blur-[3px]" />
              <div className="absolute inset-0 z-20 bg-linear-to-br from-white/10 via-transparent to-white/5" />

              {/* Preview Image Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 grayscale">
                <div className="text-center">
                  <span className="font-mono text-7xl text-white/10">
                    {hoveredProject.id}
                  </span>
                  <p className="font-tech mt-4 line-clamp-1 text-xs tracking-[0.3em] text-white/30 uppercase">
                    {hoveredProject.domain}
                  </p>
                </div>
              </div>

              {/* Glass Border */}
              <div className="absolute inset-0 z-30 ring-1 ring-white/20" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Individual Project Row Component
interface VerticalProjectRowProps {
  project: Project;
  index: number;
  onHover: (project: Project) => void;
  onLeave: () => void;
  onClick: () => void;
}

/**
 * @description VerticalProjectRow component
 * @param {Project} project - The project to display
 * @param {number} index - The index of the project
 * @param {Function} onHover - The function to call when the mouse enters the project
 * @param {Function} onLeave - The function to call when the mouse leaves the project
 * @param {Function} onClick - The function to call when the project is clicked
 */
function VerticalProjectRow({
  project,
  index,
  onHover,
  onLeave,
  onClick,
}: VerticalProjectRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  // Skew effect based on scroll
  const skewX = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );

  return (
    <motion.a
      ref={rowRef as React.RefObject<HTMLAnchorElement | null>}
      href={`/work/${project.slug}`}
      style={{ skewX, opacity }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={onLeave}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="group flex cursor-pointer items-center justify-between border-b border-white/10 py-8 transition-colors hover:border-white/30"
    >
      {/* ID */}
      <span className="w-16 shrink-0 font-mono text-sm text-white/30 transition-colors group-hover:text-white/60">
        [{project.id}]
      </span>

      {/* Title */}
      <div className="flex-1 px-8">
        <h3 className="font-display text-2xl text-white transition-transform duration-500 group-hover:translate-x-4 md:text-4xl">
          {project.title}
        </h3>
      </div>

      {/* Domain */}
      <span className="font-tech hidden w-48 text-right text-xs tracking-widest text-white/40 uppercase md:block">
        {project.domain}
      </span>

      {/* Year + Arrow */}
      <div className="ml-8 flex items-center gap-6">
        <span className="font-mono text-sm text-white/40 transition-colors group-hover:text-white/60">
          {project.year}
        </span>
        <motion.div
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-white group-hover:bg-white"
          whileHover={{ scale: 1.1 }}
        >
          <ArrowUpRight
            size={18}
            className="transform text-white transition-all duration-300 group-hover:rotate-45 group-hover:text-black"
          />
        </motion.div>
      </div>
    </motion.a>
  );
}
