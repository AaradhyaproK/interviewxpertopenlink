import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  ArrowRight, 
  Check, 
  X
} from 'lucide-react';
import PoweredByMarquee from './PoweredByMarquee';

export const PhenomenonHero: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative min-h-[calc(100vh-4.5rem)] flex flex-col justify-between items-center bg-[#F8FAFC] pt-8 sm:pt-14 pb-0 overflow-hidden transition-colors duration-500">
      
      {/* Soft Ambient Light Gradient */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[90vw] sm:w-[1100px] md:w-[1500px] h-[550px] sm:h-[650px] opacity-75"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(37, 99, 235, 0.14) 0%, rgba(239, 246, 255, 0.8) 45%, rgba(248, 250, 252, 0) 75%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Subtle Micro Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none [mask-image:radial-gradient(ellipse_75%_65%_at_50%_25%,#000_65%,transparent_100%)] opacity-70" />

      {/* Main Full-Page Hero Content */}
      <div className="my-auto py-6 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center">
        
        {/* Hero Title: Syne Bold Display Typography with Viewport Blur & Spring Reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold tracking-tight text-[#0F172A] leading-[1.15] sm:leading-[1.08] max-w-4xl"
        >
          Intelligent AI interviews. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#0F172A] bg-clip-text text-transparent">
            Engineered for human potential.
          </span>
        </motion.h1>

        {/* Subtitle in Plus Jakarta Sans */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-8 text-xs sm:text-base md:text-xl text-[#64748B] max-w-2xl mx-auto font-normal leading-relaxed font-sans px-1"
        >
          Practice lifelike voice interviews, receive personalized coaching rubrics, and master technical rounds with confidence and real-time guidance.
        </motion.p>

        {/* CTA Buttons with mobile-first stretch & spring lift */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto"
        >
          <Link
            to="/auth"
            className="w-full sm:w-auto px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.28)] hover:shadow-[0_8px_28px_rgba(37,99,235,0.38)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
          >
            <span>Start Free Practice</span>
            <ArrowRight size={18} />
          </Link>

          <button
            onClick={() => setIsVideoOpen(true)}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-sm cursor-pointer"
          >
            <Play size={15} className="text-[#2563EB] fill-[#2563EB]" />
            <span>Interactive Demo</span>
          </button>
        </motion.div>

        {/* Minimalist Micro Badges in JetBrains Mono / Plus Jakarta Sans */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 sm:mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#64748B] font-sans font-medium px-2"
        >
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Check size={14} className="text-[#2563EB] shrink-0" /> Sub-120ms execution latency
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Check size={14} className="text-[#2563EB] shrink-0" /> 5 free full sessions monthly
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Check size={14} className="text-[#2563EB] shrink-0" /> Zero credit card required
          </span>
        </motion.div>

      </div>

      {/* Embedded High-Tech Seamless Marquee Ribbon */}
      <div className="w-full relative z-10">
        <PoweredByMarquee />
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-md" onClick={() => setIsVideoOpen(false)} />
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-[28px] overflow-hidden shadow-2xl border border-white/20"
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 p-2.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
                aria-label="Close video"
              >
                <X size={20} />
              </button>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/9UhI3l23OLg?si=b5KLgy1KogAWePx8&autoplay=1" 
                title="InterviewXpert Platform Tour" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhenomenonHero;

