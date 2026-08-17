import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from '../Logo';

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const delta = latest - previous;

    setIsScrolled(latest > 20);

    // If mobile menu is open, always stay visible
    if (isMobileMenuOpen) {
      setIsVisible(true);
      return;
    }

    // When scrolling down past 80px, hide navbar; when scrolling up, reveal navbar
    if (latest > 80 && delta > 4) {
      setIsVisible(false);
    } else if (delta < -4 || latest <= 80) {
      setIsVisible(true);
    }
  });

  const navLinks = [
    { name: "Platform", href: "#features" },
    { name: "Scorecards", href: "#scorecards" },
    { name: "Engine", href: "#engine" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (isHomePage) {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    } else {
      navigate(`/${href}`);
    }
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -90 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/90 backdrop-blur-xl border-b border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.03)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Left: Brand Identity */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <Logo className="w-8 h-8 rounded-xl transition-transform duration-300 group-hover:scale-105" isDark={false} />
            <span className="font-display font-bold tracking-tight text-lg text-[#0F172A]">
              Interview<span className="text-[#2563EB]">Xpert</span>
            </span>
          </Link>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-[13.5px] font-semibold text-[#64748B] hover:text-[#0F172A] px-4 py-2 rounded-lg hover:bg-[#F8FAFC] transition-colors duration-150"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={isHomePage ? link.href : `/${link.href}`}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-[13.5px] font-semibold text-[#64748B] hover:text-[#0F172A] px-4 py-2 rounded-lg hover:bg-[#F8FAFC] transition-colors duration-150"
                >
                  {link.name}
                </a>
              )
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link 
              to="/auth" 
              className="text-xs font-semibold text-[#475569] hover:text-[#0F172A] px-3.5 py-2 rounded-lg hover:bg-[#F8FAFC] transition-colors"
            >
              Sign in
            </Link>

            <Link 
              to="/auth" 
              className="px-5 py-2.5 rounded-full font-semibold text-xs bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-all duration-200 shadow-[0_2px_8px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_14px_rgba(37,99,235,0.35)] flex items-center gap-1.5"
            >
              <span>Launch Platform</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-[#E2E8F0] bg-white px-4 pt-3 pb-6 space-y-2 overflow-hidden shadow-lg"
          >
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm font-semibold text-[#0F172A] py-2.5 px-3 rounded-lg hover:bg-[#F8FAFC]"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={isHomePage ? link.href : `/${link.href}`}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="block text-sm font-semibold text-[#0F172A] py-2.5 px-3 rounded-lg hover:bg-[#F8FAFC]"
                >
                  {link.name}
                </a>
              )
            ))}
            <div className="pt-3 border-t border-[#E2E8F0] flex flex-col gap-2">
              <Link 
                to="/auth" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-lg text-xs font-semibold border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                Sign in
              </Link>
              <Link 
                to="/auth" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-full text-xs font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
              >
                Launch Platform
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;