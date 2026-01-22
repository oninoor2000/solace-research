import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowUpRight,
  FlaskConical,
  Handshake,
  GraduationCap,
  FileText,
  Users,
  Globe,
  Sparkles,
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof FlaskConical;
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
  size: "large" | "medium" | "small";
}

const services: Service[] = [
  {
    id: "01",
    title: "Research Partnership",
    subtitle: "Joint Research & Co-authorship",
    description:
      "Collaborate on cutting-edge health informatics research. We bring expertise in FHIR, HL7, and public health data systems to your research initiatives.",
    icon: FlaskConical,
    features: [
      "Joint publication opportunities",
      "Shared data access & analysis",
      "Multi-institutional collaboration",
      "Grant proposal support",
    ],
    cta: "Propose a Collaboration",
    href: "#contact",
    highlight: true,
    size: "large",
  },
  {
    id: "02",
    title: "Technical Consulting",
    subtitle: "Health Informatics Implementation",
    description:
      "Expert guidance on health information systems, interoperability standards, and data architecture for healthcare institutions.",
    icon: FileText,
    features: [
      "FHIR/HL7 implementation",
      "System architecture design",
      "Data governance strategy",
      "Technical assessment",
    ],
    cta: "Request Consultation",
    href: "#contact",
    size: "medium",
  },
  {
    id: "03",
    title: "Capacity Building",
    subtitle: "Training & Knowledge Transfer",
    description:
      "Empower your team with health informatics expertise through tailored workshops, training programs, and mentorship.",
    icon: GraduationCap,
    features: [
      "Custom training programs",
      "Workshop facilitation",
      "Research mentorship",
      "Skill development",
    ],
    cta: "Explore Programs",
    href: "#contact",
    size: "medium",
  },
];

const stats = [
  { value: "25+", label: "Publications", icon: FileText },
  { value: "12", label: "Active Projects", icon: FlaskConical },
  { value: "15+", label: "Partner Institutions", icon: Handshake },
  { value: "5", label: "Countries Reached", icon: Globe },
];

// 3D Tilt Card Component
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Infinite Marquee Component
function Marquee({
  children,
  direction = "left",
  speed = 25,
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
}) {
  return (
    <div className="flex overflow-hidden mask-[linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
      <motion.div
        className="flex gap-12 shrink-0"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// Animated Text Reveal
function TextReveal({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const words = children.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.03,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Service Card Component
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    large: "lg:col-span-2 lg:row-span-2",
    medium: "lg:col-span-1 lg:row-span-1",
    small: "lg:col-span-1 lg:row-span-1",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={sizeClasses[service.size]}
    >
      <TiltCard className="h-full">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`group relative h-full flex flex-col overflow-hidden transition-all duration-700 ${
            service.highlight
              ? "bg-linear-to-br from-white/10 via-white/5 to-transparent border border-white/20"
              : "bg-white/2 border border-white/6 hover:border-white/15 hover:bg-white/4"
          }`}
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: isHovered
                ? "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08) 0%, transparent 50%)"
                : "none",
            }}
          />

          {/* Highlight badge */}
          {service.highlight && (
            <div className="absolute top-0 right-0">
              <div className="flex items-center gap-1.5 bg-white text-black px-4 py-2 font-mono text-[10px] uppercase tracking-widest">
                <Sparkles size={10} />
                Featured
              </div>
            </div>
          )}

          {/* Content */}
          <div
            className={`relative z-10 flex flex-col h-full ${service.size === "large" ? "p-10 lg:p-14" : "p-8 lg:p-10"}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-auto">
              <motion.div
                className={`relative ${service.size === "large" ? "w-20 h-20" : "w-14 h-14"} flex items-center justify-center`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {/* Animated ring */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.6)"
                    strokeWidth="1"
                    strokeDasharray="283"
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: isHovered ? 0 : 283 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </svg>
                <service.icon
                  size={service.size === "large" ? 32 : 24}
                  className="text-white/70 group-hover:text-white transition-colors duration-500"
                />
              </motion.div>

              <span className="font-mono text-[11px] text-white/20 tracking-widest">
                {service.id}
              </span>
            </div>

            {/* Main Content */}
            <div className={`${service.size === "large" ? "mt-16" : "mt-8"}`}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">
                {service.subtitle}
              </p>
              <h3
                className={`font-display text-white mb-4 leading-[1.1] ${
                  service.size === "large"
                    ? "text-4xl lg:text-5xl"
                    : "text-2xl lg:text-3xl"
                }`}
              >
                <TextReveal>{service.title}</TextReveal>
              </h3>
              <p className="font-sans text-white/40 text-sm leading-relaxed max-w-md">
                {service.description}
              </p>
            </div>

            {/* Features - Only show on large card */}
            {service.size === "large" && (
              <div className="mt-10 grid grid-cols-2 gap-4">
                {service.features.map((feature, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + j * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 text-sm text-white/50"
                  >
                    <div className="w-1 h-1 bg-white/40 rounded-full" />
                    {feature}
                  </motion.div>
                ))}
              </div>
            )}

            {/* CTA */}
            <motion.a
              href={service.href}
              className={`mt-8 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest group/btn ${
                service.highlight
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              } transition-colors duration-300`}
              whileHover={{ x: 4 }}
            >
              <span className="relative">
                {service.cta}
                <motion.span
                  className="absolute bottom-0 left-0 h-px bg-white/40"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </span>
              <motion.span
                className="flex items-center justify-center w-8 h-8 border border-white/20 group-hover/btn:border-white/40 group-hover/btn:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUpRight size={14} />
              </motion.span>
            </motion.a>
          </div>

          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-8 h-8">
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-white/20 to-transparent" />
            <div className="absolute top-0 left-0 h-full w-px bg-linear-to-b from-white/20 to-transparent" />
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8">
            <div className="absolute bottom-0 right-0 w-full h-px bg-linear-to-l from-white/20 to-transparent" />
            <div className="absolute bottom-0 right-0 h-full w-px bg-linear-to-t from-white/20 to-transparent" />
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function TheLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="the-lab"
      ref={containerRef}
      className="relative py-32 md:py-48 bg-background overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/2 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/2 rounded-full blur-3xl" />

        {/* Grid lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="labGridLines"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#labGridLines)" />
        </svg>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section - Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-8">
              <span className="w-12 h-px bg-white/20" />
              What We Do
            </span>

            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.9] tracking-tight">
              <TextReveal>Turning Health Data</TextReveal>
              <br />
              <span className="text-white/30">
                <TextReveal>Into Actionable</TextReveal>
              </span>
              <br />
              <span className="text-white/30">
                <TextReveal>Intelligence</TextReveal>
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 lg:pt-32"
          >
            <p className="font-sans text-white/50 text-lg md:text-xl leading-relaxed">
              We partner with researchers, institutions, and governments to
              solve complex health informatics challenges. From system
              architecture to epidemiological analysis—we bring clarity to
              complexity.
            </p>

            <div className="mt-8 flex items-center gap-6">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-white"
              >
                <span>Get in Touch</span>
                <span className="flex items-center justify-center w-10 h-10 border border-white/30 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-32 -mx-6 md:-mx-12"
        >
          <Marquee speed={30}>
            <div className="flex items-center gap-12">
              {stats.map((stat, i) => (
                <div
                  key={`stat-${i}`}
                  className="flex items-center gap-6 px-8 py-6 border border-white/6 bg-white/1"
                >
                  <stat.icon size={20} className="text-white/20" />
                  <div>
                    <span className="font-display text-4xl md:text-5xl text-white block leading-none">
                      {stat.value}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
              {/* Separator */}
              <div className="w-px h-16 bg-white/10" />
            </div>
          </Marquee>
        </motion.div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-32">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA - Full Width Experimental */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden border border-white/8 bg-linear-to-br from-white/4 to-transparent">
            {/* Animated gradient background */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.05) 0%, transparent 50%)`,
              }}
            />

            <div className="relative z-10 p-12 md:p-20">
              <div className="max-w-4xl">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6"
                >
                  <span className="w-8 h-px bg-white/20" />
                  Ready to Collaborate?
                </motion.span>

                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6">
                  <TextReveal>Have a Research Idea?</TextReveal>
                </h3>

                <p className="font-sans text-white/40 text-lg md:text-xl leading-relaxed max-w-2xl mb-12">
                  We're always open to discussing new collaborations. Let's
                  explore how we can work together on your next project.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href="#contact"
                    className="group relative inline-flex items-center justify-center gap-4 bg-white text-black py-5 px-10 font-mono text-xs uppercase tracking-widest overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <Users size={16} />
                      Start a Conversation
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-black"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center gap-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <Users size={16} />
                      Start a Conversation
                    </span>
                  </motion.a>

                  <motion.a
                    href="/publications"
                    className="group inline-flex items-center justify-center gap-3 border border-white/20 text-white py-5 px-10 font-mono text-xs uppercase tracking-widest hover:bg-white/5 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Our Work
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                    />
                  </motion.a>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-8 right-8 hidden lg:block">
                <motion.div
                  className="w-32 h-32 border border-white/10 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-white/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
