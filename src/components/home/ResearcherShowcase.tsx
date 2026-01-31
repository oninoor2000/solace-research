import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Users } from "lucide-react";
import imgSyeikhooni from "@/assets/home/abstract_geometric_wireframe_structure.png";
import imgAli from "@/assets/home/abstract_organic_fluid_data_flow.png";
import imgHadi from "@/assets/home/abstract_data_point_patterns.png";
import { useIsMobile } from "@/hooks/use-mobile";

const researchers = [
  {
    id: "01",
    name: "Syeikhooni Noor",
    fullName: "Muhammad Syeikhooni Noor",
    slug: "syeikhooni",
    credentials: "S.Tr.RMIK., MHPM",
    role: "Principal Researcher",
    focus: "Health Systems & Interoperability",
    shortFocus: "Systems",
    image: imgSyeikhooni.src,
    position: "top",
    expertise: ["FHIR/HL7", "System Architecture", "Data Standards"],
    description:
      "Leading research on national health information exchange and interoperability frameworks.",
  },
  {
    id: "02",
    name: "Ali Chamid",
    fullName: "Ali Chamid",
    slug: "ali-chamid",
    credentials: "S.Tr.RMIK., MHPM",
    role: "Principal Researcher",
    focus: "Public & Community Health",
    shortFocus: "Community",
    image: imgAli.src,
    position: "left",
    expertise: ["Primary Care", "Health Equity", "Field Research"],
    description:
      "Bridging digital health solutions with community-level implementation.",
  },
  {
    id: "03",
    name: "Hadi Kurniawan",
    fullName: "Hadi Kurniawan",
    slug: "hadi",
    credentials: "S.Tr.RMIK., M.KM",
    role: "Principal Researcher",
    focus: "Epidemiology & Data Analytics",
    shortFocus: "Analytics",
    image: imgHadi.src,
    position: "right",
    expertise: ["Biostatistics", "ML/AI", "Surveillance"],
    description:
      "Applying advanced analytics to uncover patterns in population health data.",
  },
];

export default function ResearcherShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeResearcher, setActiveResearcher] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    }
  };

  return (
    <section
      id="researcher"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-32 md:py-48 bg-background overflow-hidden"
    >
      {/* Subtle Connecting Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-50"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.05" />
            <stop offset="50%" stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="white" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Triangle connecting the three */}
        <motion.path
          d="M 500 150 L 200 550 L 800 550 Z"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          strokeDasharray="4,8"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </svg>
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 block mb-4">
            Research Team
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            Principal Researchers
          </h2>
          <p className="font-sans text-white/50 text-lg max-w-2xl mx-auto">
            Three distinct specializations. One unified mission: advancing
            health informatics in Indonesia and beyond.
          </p>
        </motion.div>

        {/* Mobile Layout - Flex Column */}
        {isMobile ? (
          <div className="flex flex-col items-center gap-8">
            {researchers.map((researcher, index) => {
              const isActive = activeResearcher === researcher.id;

              return (
                <motion.div
                  key={researcher.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="w-full max-w-[320px]"
                >
                  <ResearcherCard
                    researcher={researcher}
                    isActive={isActive}
                    onHover={() => setActiveResearcher(researcher.id)}
                    onLeave={() => setActiveResearcher(null)}
                  />
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Desktop Layout - Absolute Positioning */
          <div className="relative max-w-5xl mx-auto" style={{ height: "720px" }}>
            {/* Center Hub */}
            <motion.div
              style={{ scale }}
              className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className="w-24 h-24 rounded-full border border-white/10 bg-background flex items-center justify-center">
                <div className="text-center">
                  <Users size={20} className="text-white/30 mx-auto mb-1" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                    Team
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Researcher Cards */}
            {researchers.map((researcher, index) => {
              const positions = [
                {
                  top: "0%",
                  left: "50%",
                  transform: "translate(-50%, 0)",
                },
                {
                  top: "58%",
                  left: "3%",
                  transform: "translate(0, -50%)",
                },
                {
                  top: "58%",
                  right: "3%",
                  left: "auto",
                  transform: "translate(0, -50%)",
                },
              ];

              const pos = positions[index];
              const isActive = activeResearcher === researcher.id;

              return (
                <motion.div
                  key={researcher.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  style={pos as React.CSSProperties}
                  className="absolute w-full max-w-[280px]"
                >
                  <ResearcherCard
                    researcher={researcher}
                    isActive={isActive}
                    onHover={() => setActiveResearcher(researcher.id)}
                    onLeave={() => setActiveResearcher(null)}
                  />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="/researchers"
            className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-white font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 group"
          >
            <span>View All Researchers</span>
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </a>
        </motion.div>
      </div>

      {/* Ambient Effect */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 15}% ${50 + mousePosition.y * 15}%, rgba(255,255,255,0.02) 0%, transparent 50%)`,
        }}
      />
    </section>
  );
}

interface ResearcherCardProps {
  researcher: (typeof researchers)[0];
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

/**
 * Researcher Card Component
 * @param researcher - The researcher data
 * @param isActive - Whether the card is active
 * @param onHover - Function to handle hover event
 * @param onLeave - Function to handle leave event
 * @returns
 */
function ResearcherCard({
  researcher,
  isActive,
  onHover,
  onLeave,
}: ResearcherCardProps) {
  return (
    <motion.a
      href={`/researchers/${researcher.slug}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.02 }}
      className="block group cursor-pointer"
    >
      <div className="relative">
        {/* Focus Area Badge - Professional Label */}
        <div className="absolute -top-3 -left-2 z-20">
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5">
            {researcher.shortFocus}
          </span>
        </div>

        {/* Image Container */}
        <div className="relative aspect-4/5 overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/25 transition-colors duration-500">
          {/* Image */}
          <motion.img
            src={researcher.image}
            alt={researcher.fullName}
            className="w-full h-full object-cover grayscale contrast-110 opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-white/30 text-[10px]">
                [{researcher.id}]
              </span>
              <span className="flex-1 h-px bg-white/15" />
            </div>

            <h3 className="font-display text-xl text-white mb-1 group-hover:translate-x-1 transition-transform duration-300">
              {researcher.name}
            </h3>

            <p className="font-mono text-[9px] uppercase tracking-widest text-white/40 mb-3">
              {researcher.credentials}
            </p>

            <p className="font-sans text-xs text-white/60">
              {researcher.focus}
            </p>
          </div>

          {/* Hover State - Expertise Tags */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6"
              >
                <p className="font-sans text-white/80 text-sm leading-relaxed text-center mb-6">
                  {researcher.description}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {researcher.expertise.map((exp) => (
                    <span
                      key={exp}
                      className="text-[9px] uppercase tracking-wider px-2 py-1 bg-white/10 text-white/70"
                    >
                      {exp}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-2 text-white font-mono text-[10px] uppercase tracking-widest">
                  View Profile <ArrowUpRight size={10} />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Info */}
        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">
            {researcher.role}
          </span>
          <ArrowUpRight
            size={12}
            className="text-white/20 group-hover:text-white/60 transition-colors"
          />
        </div>
      </div>
    </motion.a>
  );
}
