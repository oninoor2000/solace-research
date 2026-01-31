import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/home/hero-img.png";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y, scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 z-10 bg-black/40" />{" "}
        {/* Overlay for text readability */}
        <img
          src={heroBg.src}
          alt="Hero"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 container flex flex-col items-center px-6 text-center">
        <motion.h1
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-display text-6xl font-bold tracking-tighter text-white mix-blend-difference md:text-8xl lg:text-9xl"
        >
          SOLACE
        </motion.h1>

        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="font-tech mt-6 border-t border-white/20 pt-6 text-lg tracking-[0.2em] text-white/80 uppercase md:text-xl">
            Comfort in Complexity
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute right-0 bottom-12 left-0 flex justify-center"
        >
          <div className="h-16 w-px animate-pulse bg-linear-to-b from-white to-transparent" />
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-6 hidden h-24 w-px bg-white/20 md:block" />
        <div className="absolute top-1/2 right-6 hidden h-24 w-px bg-white/20 md:block" />
      </div>
    </section>
  );
}
