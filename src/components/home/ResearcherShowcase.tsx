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
      className="bg-background relative overflow-hidden py-32 md:py-48"
    >
      {/* Subtle Connecting Lines */}
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-50"
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
      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-white/40 uppercase">
            Research Team
          </span>
          <h2 className="font-display mb-6 text-5xl text-white md:text-6xl lg:text-7xl">
            Principal Researchers
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-lg text-white/50">
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
          <div
            className="relative mx-auto max-w-5xl"
            style={{ height: "720px" }}
          >
            {/* Center Hub */}
            <motion.div
              style={{ scale }}
              className="absolute top-2/3 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="bg-background flex h-24 w-24 items-center justify-center rounded-full border border-white/10">
                <div className="text-center">
                  <Users size={20} className="mx-auto mb-1 text-white/30" />
                  <span className="font-mono text-[9px] tracking-widest text-white/30 uppercase">
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
          className="mt-12 text-center"
        >
          <a
            href="/researchers"
            className="group inline-flex items-center gap-3 border border-white/20 px-8 py-4 font-mono text-sm tracking-widest text-white uppercase transition-all duration-300 hover:bg-white hover:text-black"
          >
            <span>View All Researchers</span>
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </motion.div>
      </div>

      {/* Ambient Effect */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
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
      className="group block cursor-pointer"
    >
      <div className="relative">
        {/* Focus Area Badge - Professional Label */}
        <div className="absolute -top-3 -left-2 z-20">
          <span className="border border-white/20 bg-white/10 px-3 py-1.5 font-mono text-[9px] tracking-[0.15em] text-white/80 uppercase backdrop-blur-sm">
            {researcher.shortFocus}
          </span>
        </div>

        {/* Image Container */}
        <div className="relative aspect-4/5 overflow-hidden border border-white/10 bg-white/5 transition-colors duration-500 group-hover:border-white/25">
          {/* Image */}
          <motion.img
            src={researcher.image}
            alt={researcher.fullName}
            className="h-full w-full object-cover opacity-50 contrast-110 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

          {/* Content */}
          <div className="absolute right-0 bottom-0 left-0 p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono text-[10px] text-white/30">
                [{researcher.id}]
              </span>
              <span className="h-px flex-1 bg-white/15" />
            </div>

            <h3 className="font-display mb-1 text-xl text-white transition-transform duration-300 group-hover:translate-x-1">
              {researcher.name}
            </h3>

            <p className="mb-3 font-mono text-[9px] tracking-widest text-white/40 uppercase">
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
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
              >
                <p className="mb-6 text-center font-sans text-sm leading-relaxed text-white/80">
                  {researcher.description}
                </p>

                {/* Expertise Tags */}
                <div className="mb-6 flex flex-wrap justify-center gap-2">
                  {researcher.expertise.map((exp) => (
                    <span
                      key={exp}
                      className="bg-white/10 px-2 py-1 text-[9px] tracking-wider text-white/70 uppercase"
                    >
                      {exp}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-white uppercase">
                  View Profile <ArrowUpRight size={10} />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Info */}
        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[9px] tracking-widest text-white/30 uppercase">
            {researcher.role}
          </span>
          <ArrowUpRight
            size={12}
            className="text-white/20 transition-colors group-hover:text-white/60"
          />
        </div>
      </div>
    </motion.a>
  );
}
