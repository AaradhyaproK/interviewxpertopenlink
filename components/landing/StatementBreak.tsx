import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const StatementBreak: React.FC = () => {
  const stats = [
    {
      number: "50K+",
      label: "AI Interviews & Mock Sessions Conducted",
      badge: "Proven Scale",
      sub: "Across 20+ Tech Roles"
    },
    {
      number: "94.8%",
      label: "Resume ATS Compatibility & Pass Rate",
      badge: "ATS Benchmark",
      sub: "Action-Driven Keywords"
    },
    {
      number: "80%",
      label: "Faster Recruiter Candidate Screening",
      badge: "Enterprise ROI",
      sub: "Bulk Parser & WhatsApp"
    },
    {
      number: "11",
      label: "Multi-Dimensional Soft Skill Metrics",
      badge: "Deep Analysis",
      sub: "Audio + Video Diarized"
    }
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold uppercase tracking-widest text-[#ff5722] mb-6 shadow-sm">
          <Sparkles size={14} /> Full-Cycle Transparency
        </div>

        {/* Big Bold Headline Statement */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto mb-16">
          We prove, assess, simulate, and scale your hiring with absolute transparency & multi-engine AI in its core
        </h2>

        {/* 4 Large Rounded Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                  {stat.badge}
                </span>
                <p className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-6 group-hover:text-[#ff5722] transition-colors">
                  {stat.number}
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-800 mt-2">
                  {stat.label}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-200 text-[11px] text-slate-500 font-mono font-semibold">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatementBreak;
