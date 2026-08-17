import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const StickyFloatingCTA: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-6 right-6 z-50 pointer-events-auto"
    >
      <Link
        to="/auth"
        className="group px-6 py-3.5 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-[0_10px_35px_rgba(124,58,237,0.5)] hover:shadow-[0_12px_45px_rgba(124,58,237,0.7)] transition-all duration-300 hover:scale-105 border border-purple-400/30 backdrop-blur-md"
      >
        <Sparkles size={16} className="text-purple-200 group-hover:rotate-12 transition-transform" />
        <span>Try Live AI Free</span>
        <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Link>
    </motion.div>
  );
};

export default StickyFloatingCTA;
