import React from 'react';
import { motion } from 'framer-motion';

export const EnterpriseTrustGrid: React.FC = () => {
  const brands = [
    {
      name: "Google",
      icon: "fa-brands fa-google text-3xl",
      sub: "System Architecture & Algorithms"
    },
    {
      name: "Microsoft",
      icon: "fa-brands fa-microsoft text-3xl",
      sub: "Full-Stack & Cloud Systems"
    },
    {
      name: "Amazon",
      icon: "fa-brands fa-amazon text-3xl",
      sub: "Leadership & Technical Rounds"
    },
    {
      name: "Meta",
      icon: "fa-brands fa-meta text-3xl",
      sub: "Product Architecture & Code"
    },
    {
      name: "Apple",
      icon: "fa-brands fa-apple text-3xl",
      sub: "Precision & Deep Problem Solving"
    },
    {
      name: "TCS & Infosys",
      icon: "fa-solid fa-laptop-code text-3xl",
      sub: "National Qualifiers & Specialist"
    }
  ];

  return (
    <section className="py-14 sm:py-18 relative overflow-hidden bg-[#F8FAFC] border-t border-[#E2E8F0] transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Unified Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-2.5 font-sans">
            Industry Benchmarks
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
            Prepared for workflows at leading technology teams.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] font-sans font-normal leading-relaxed">
            Standardized interview rubrics and system design tracks tailored to top engineering bars.
          </p>
        </div>

        {/* Scandinavian 6-Card Grid with Light Micro-Borders & Soft Hover Elevation */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {brands.map((brand, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 sm:p-8 rounded-[22px] bg-white border border-[#E2E8F0] hover:border-[#2563EB]/40 transition-all duration-300 flex flex-col items-center justify-center gap-2.5 group shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] hover:-translate-y-0.5"
            >
              <div className="text-[#94A3B8] group-hover:text-[#2563EB] transition-colors duration-300">
                <i className={brand.icon} />
              </div>
              <span className="text-sm font-bold text-[#0F172A] tracking-tight font-sans">
                {brand.name}
              </span>
              <span className="text-[11px] text-[#64748B] font-normal font-sans">
                {brand.sub}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EnterpriseTrustGrid;
