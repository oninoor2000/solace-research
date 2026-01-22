import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  FlaskConical,
  Handshake,
  GraduationCap,
  FileText,
  Users,
  Globe,
  ChevronRight,
} from 'lucide-react';

const services = [
  {
    id: '01',
    title: 'Research Partnership',
    subtitle: 'Joint Research & Co-authorship',
    description:
      'Collaborate on cutting-edge health informatics research. We bring expertise in FHIR, HL7, and public health data systems to your research initiatives.',
    icon: FlaskConical,
    features: [
      'Joint publication opportunities',
      'Shared data access & analysis',
      'Multi-institutional collaboration',
      'Grant proposal support',
    ],
    cta: 'Propose a Collaboration',
    href: '#contact',
    highlight: true,
  },
  {
    id: '02',
    title: 'Technical Consulting',
    subtitle: 'Health Informatics Implementation',
    description:
      'Expert guidance on health information systems, interoperability standards, and data architecture for healthcare institutions.',
    icon: FileText,
    features: [
      'FHIR/HL7 implementation',
      'System architecture design',
      'Data governance strategy',
      'Technical assessment',
    ],
    cta: 'Request Consultation',
    href: '#contact',
  },
  {
    id: '03',
    title: 'Capacity Building',
    subtitle: 'Training & Knowledge Transfer',
    description:
      'Empower your team with health informatics expertise through tailored workshops, training programs, and mentorship.',
    icon: GraduationCap,
    features: [
      'Custom training programs',
      'Workshop facilitation',
      'Research mentorship',
      'Skill development',
    ],
    cta: 'Explore Programs',
    href: '#contact',
  },
];

const stats = [
  { value: '25+', label: 'Publications', icon: FileText },
  { value: '12', label: 'Active Projects', icon: FlaskConical },
  { value: '15+', label: 'Partner Institutions', icon: Handshake },
  { value: '5', label: 'Countries Reached', icon: Globe },
];

export default function TheLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="the-lab"
      ref={containerRef}
      className="relative py-32 md:py-40 bg-background overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="labGrid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="40" cy="40" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#labGrid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 block mb-6">
              What We Do
            </span>

            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-[0.95]">
              Turning Health Data
              <br />
              <span className="text-white/40">
                Into Actionable Intelligence
              </span>
            </h2>

            <p className="font-sans text-white/60 text-xl leading-relaxed max-w-2xl">
              We partner with researchers, institutions, and governments to
              solve complex health informatics challenges. From system
              architecture to epidemiological analysis—we bring clarity to
              complexity.
            </p>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center py-8 border border-white/10 bg-white/2 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
            >
              <stat.icon size={20} className="text-white/40 mx-auto mb-4" />
              <span className="font-display text-4xl md:text-5xl text-white block mb-2">
                {stat.value}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-24">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              className={`group relative flex flex-col p-8 md:p-10 border transition-all duration-500 ${
                service.highlight
                  ? 'border-white/30 bg-white/5'
                  : 'border-white/10 hover:border-white/20 hover:bg-white/2'
              }`}
            >
              {/* Highlight Badge */}
              {service.highlight && (
                <div className="absolute -top-3 left-8">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-black bg-white px-3 py-1">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                  <service.icon
                    size={24}
                    className="text-white/60 group-hover:text-black transition-colors"
                  />
                </div>
                <span className="font-mono text-xs text-white/30">
                  {service.id}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                  {service.subtitle}
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
                  {service.title}
                </h3>
                <p className="font-sans text-white/50 text-sm leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: hoveredService === service.id ? 1 : 0.6,
                        x: hoveredService === service.id ? 0 : -10,
                      }}
                      transition={{ delay: j * 0.05 }}
                      className="flex items-center gap-3 text-sm text-white/60"
                    >
                      <ChevronRight size={12} className="text-white/40" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href={service.href}
                className={`inline-flex items-center justify-center gap-3 py-4 px-6 font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
                  service.highlight
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'border border-white/20 text-white hover:bg-white hover:text-black hover:border-white'
                }`}
              >
                {service.cta}
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden border border-white/10 p-12 md:p-16"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-display text-3xl md:text-4xl text-white mb-4">
                Have a Research Idea?
              </h3>
              <p className="font-sans text-white/60 text-lg max-w-lg">
                We're always open to discussing new collaborations. Let's
                explore how we can work together on your next project.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 bg-white text-black py-4 px-8 font-mono text-sm uppercase tracking-widest hover:bg-white/90 transition-colors"
              >
                <Users size={16} />
                Start a Conversation
              </a>
              <a
                href="/publications"
                className="inline-flex items-center justify-center gap-3 border border-white/20 text-white py-4 px-8 font-mono text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                View Our Work
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
