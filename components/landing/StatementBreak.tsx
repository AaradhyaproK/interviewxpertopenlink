import React from 'react';
import { motion } from 'framer-motion';

export const StatementBreak: React.FC = () => {
  const stats = [
    {
      number: "50,000+",
      label: "Practice sessions orchestrated",
      badge: "Scale",
      sub: "Across 20+ software engineering roles"
    },
    {
      number: "94%",
      label: "Candidate readiness rate",
      badge: "Confidence",
      sub: "Reported measurable anxiety reduction"
    },
    {
      number: "3x",
      label: "Faster recruiter decisions",
      badge: "Efficiency",
      sub: "Objective scorecards & video review"
    },
    {
      number: "11",
      label: "Key evaluation dimensions",
      badge: "Metrics",
      sub: "Fluency, clarity, problem solving & code"
    }
  ];

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-white border-t border-[#E2E8F0] transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Unified Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-2.5 font-sans">
            Measured Outcomes
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
            Everything you need to orchestrate high-impact interviews.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] font-sans font-normal leading-relaxed">
            Accelerate your technical preparation and candidate screening with measurable performance metrics.
          </p>
        </div>

        {/* Minimalist Metric Cards with Light Micro-Borders & Soft Hover Elevation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-left">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="p-6 sm:p-7 rounded-[24px] bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#2563EB]/40 transition-all duration-300 flex flex-col justify-between group shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] hover:-translate-y-0.5"
            >
              <div>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] font-mono shadow-sm">
                  {stat.badge}
                </span>
                <p className="font-mono text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mt-6 group-hover:text-[#2563EB] transition-colors">
                  {stat.number}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-[#0F172A] mt-2 leading-snug font-sans">
                  {stat.label}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#E2E8F0] text-[11px] text-[#64748B] font-normal font-sans">
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
