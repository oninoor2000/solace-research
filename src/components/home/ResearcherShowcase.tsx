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
        </motion.div>
      </div>
      tes
    </section>
  );
}
