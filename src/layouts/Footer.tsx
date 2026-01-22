import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <section
      id="contact"
      className="py-24 border-t border-white/10 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-8xl text-white mb-8"
        >
          Get in Touch
        </motion.h2>
        <p className="font-tech text-white/50 text-xl mb-12">
          yogyakarta — indonesia
        </p>
        <a
          href="mailto:hello@solace.lab"
          className="inline-block border border-white/20 px-8 py-4 rounded-full text-white font-mono hover:bg-white hover:text-black transition-all duration-300"
        >
          hello@solace.lab
        </a>

        <div className="mt-24 flex justify-between items-end text-white/20 font-mono text-xs uppercase">
          <span>© {new Date().getFullYear()} Solace Lab</span>
          <span>Comfort in Complexity</span>
        </div>
      </div>
    </section>
  );
};

export default Footer;
