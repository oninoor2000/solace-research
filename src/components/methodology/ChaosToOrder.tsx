import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  initParticles,
  updateParticleTargets,
  getTextPixelPositions,
  debounce,
  type Particle,
  type Position,
} from "@/lib/particle-utils";

const ChaosToOrder = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const targetPositionsRef = useRef<Position[]>([]);
  const canvasSizeRef = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const isInView = useInView(containerRef);

  // Initialize particles only once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    // Initialize particles and store positions
    const positions = initParticles(canvas, particlesRef);
    targetPositionsRef.current = positions;
    canvasSizeRef.current = {
      width: canvas.width,
      height: canvas.height,
    };
  }, []);

  // Handle resize by updating particle target positions only
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newWidth = canvas.offsetWidth * window.devicePixelRatio;
    const newHeight = canvas.offsetHeight * window.devicePixelRatio;

    // Skip if size hasn't changed significantly
    if (
      Math.abs(newWidth - canvasSizeRef.current.width) < 10 &&
      Math.abs(newHeight - canvasSizeRef.current.height) < 10
    ) {
      return;
    }

    canvas.width = newWidth;
    canvas.height = newHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    // Recalculate target positions for new canvas size
    const newPositions = getTextPixelPositions(
      canvas.width,
      canvas.height,
      "SOLACE"
    );

    // Update particle targets intelligently
    updateParticleTargets(particlesRef.current, newPositions);

    targetPositionsRef.current = newPositions;
    canvasSizeRef.current = { width: newWidth, height: newHeight };
  }, []);

  // Debounced resize handler
  const debouncedResize = useCallback(debounce(handleResize, 150), [
    handleResize,
  ]);

  useEffect(() => {
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, [debouncedResize]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const shouldOrder = isInView || isHovering;

    // Pre-calculate constants
    const MOUSE_REPULSION_RADIUS = 100;
    const MOUSE_REPULSION_FORCE = 3;
    const ORDERED_OPACITY = 0.8;
    const CHAOTIC_OPACITY = 0.4;
    const LERP_FACTOR = 0.05;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const particles = particlesRef.current;
      const particleCount = particles.length;

      // Update and draw particles
      for (let i = 0; i < particleCount; i++) {
        const particle = particles[i];

        if (shouldOrder) {
          // Move towards target (ordered state)
          const dx = particle.targetX - particle.x;
          const dy = particle.targetY - particle.y;
          particle.x += dx * LERP_FACTOR;
          particle.y += dy * LERP_FACTOR;
        } else {
          // Chaotic movement
          particle.angle += particle.speed;
          particle.x += Math.cos(particle.angle) * particle.velocity;
          particle.y += Math.sin(particle.angle) * particle.velocity;

          // Wrap around edges
          const canvasWidth = canvas.offsetWidth;
          const canvasHeight = canvas.offsetHeight;

          if (particle.x < 0) particle.x = canvasWidth;
          else if (particle.x > canvasWidth) particle.x = 0;

          if (particle.y < 0) particle.y = canvasHeight;
          else if (particle.y > canvasHeight) particle.y = 0;

          // Mouse repulsion effect (only in chaotic mode)
          const mouseDx = particle.x - mouseRef.current.x;
          const mouseDy = particle.y - mouseRef.current.y;
          const mouseDistSq = mouseDx * mouseDx + mouseDy * mouseDy;
          const radiusSq = MOUSE_REPULSION_RADIUS * MOUSE_REPULSION_RADIUS;

          if (mouseDistSq < radiusSq) {
            const mouseDist = Math.sqrt(mouseDistSq);
            if (mouseDist > 0) {
              particle.x += (mouseDx / mouseDist) * MOUSE_REPULSION_FORCE;
              particle.y += (mouseDy / mouseDist) * MOUSE_REPULSION_FORCE;
            }
          }
        }

        // Draw particle
        const opacity = shouldOrder ? ORDERED_OPACITY : CHAOTIC_OPACITY;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connections when ordered
      if (shouldOrder) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 0.5;

        for (let i = 0; i < particleCount; i += 10) {
          for (let j = i + 10; j < particleCount; j += 10) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < 900) {
              // 30 * 30
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [isInView, isHovering]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-background py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.9 }}
      />
      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 block mb-4">
            Our Approach
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-white mb-8">
            Comfort in <span className="italic text-white/50">Complexity</span>
          </h2>
        </motion.div>

        {/* Interactive Area Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0.5 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="font-tech text-white/60 text-lg mb-4">
            {isInView
              ? "We find the signal in the noise."
              : "Scroll to reveal order"}
          </p>
          <div className="flex items-center justify-center gap-2">
            <span
              className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                isInView ? "bg-white" : "bg-white/30"
              }`}
            />
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
              {isInView ? "Order" : "Chaos"}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Methodology Description */}
      <div className="relative z-10 container mx-auto px-6 mt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-16 py-24 border-t border-white/10"
        >
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
              The Method
            </h3>
            <div className="w-16 h-px bg-white/20" />
          </div>
          <div className="md:col-span-2">
            <p className="font-sans text-white/80 text-xl leading-relaxed">
              Our methodology transforms complex health data ecosystems into
              structured, actionable intelligence through rigorous research,
              innovative technology, and community-centered design. We believe
              that within every chaotic dataset lies a pattern waiting to be
              discovered—a signal that can drive meaningful health outcomes.
            </p>
          </div>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 py-20">
          {[
            {
              step: "01",
              title: "Observe",
              description:
                "Immerse in the complexity. Gather data from diverse sources, understand stakeholder needs, and map the information landscape.",
            },
            {
              step: "02",
              title: "Analyze",
              description:
                "Apply rigorous analytical methods. Use statistical modeling, machine learning, and domain expertise to find meaningful patterns.",
            },
            {
              step: "03",
              title: "Transform",
              description:
                "Convert insights into action. Build systems, inform policy, and create tools that bring clarity to complexity.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-white/10 p-8 hover:border-white/30 hover:bg-white/5 transition-all duration-500 group"
            >
              <span className="font-mono text-4xl text-white/20 group-hover:text-white/40 transition-colors">
                {item.step}
              </span>
              <h4 className="font-display text-2xl text-white mt-6 mb-4 group-hover:translate-x-2 transition-transform">
                {item.title}
              </h4>
              <p className="font-sans text-white/60 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChaosToOrder;
