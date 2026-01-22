import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  action?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: 'The Lab', action: 'the-lab' },
  { label: 'The Work', href: '/work' },
  {
    label: 'Research',
    children: [
      { label: 'Methodology', href: '/methodology' },
      { label: 'Publications', href: '/publications' },
    ],
  },
  { label: 'Researchers', href: '/researchers' },
  { label: 'Contact', action: 'contact' },
];

const Navbar = () => {
  const [isScroolled, setIsScroolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');

  useEffect(() => {
    const handleScroll = () => {
      setIsScroolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleLang = () => setLang((prev) => (prev === 'EN' ? 'ID' : 'EN'));

  const handleNavClick = (item: NavItem) => {
    if (item.href) {
      window.location.href = item.href;
    } else if (item.action) {
      // Check if we're on the home page
      if (window.location.pathname === '/') {
        const element = document.getElementById(item.action);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.href = `/#${item.action}`;
      }
    }
  };

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScroolled ? 'py-4' : 'py-8'
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6">
          <nav
            className={cn(
              'flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500',
              isScroolled
                ? 'bg-black/40 backdrop-blur-md border-white/10'
                : 'bg-transparent border border-transparent'
            )}
          >
            {/* Logo */}
            <a
              href="/"
              className="font-display font-bold text-2xl tracking-tighter text-white mix-blend-difference z-50 relative cursor-pointer"
            >
              SOLACE
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button className="flex items-center gap-1 font-tech text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                        {item.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${
                            openDropdown === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 py-2 bg-black/90 backdrop-blur-md border border-white/10 min-w-[160px]"
                          >
                            {item.children.map((child) => (
                              <a
                                key={child.label}
                                href={child.href}
                                className="block px-4 py-2 font-tech text-xs uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                              >
                                {child.label}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item)}
                      className="font-tech text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors hover:underline decoration-1 underline-offset-4 bg-transparent border-none cursor-pointer"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 font-mono text-xs text-white/80 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
              >
                <Globe size={14} />
                <span>{lang}</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white z-50 relative bg-transparent border-none cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-6 overflow-y-auto py-24"
          >
            {navItems.map((item) => (
              <div key={item.label} className="text-center">
                {item.children ? (
                  <div className="space-y-4">
                    <span className="font-display text-3xl text-white/50">
                      {item.label}
                    </span>
                    <div className="flex flex-col gap-2">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="font-tech text-lg text-white hover:text-white/50 transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleNavClick(item);
                    }}
                    className="font-display text-3xl text-white hover:text-white/50 transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
