import React from 'react';
import { motion } from 'framer-motion';

export const EnterpriseTrustGrid: React.FC = () => {
  const brands = [
    {
      name: "Google",
      icon: "fa-brands fa-google text-4xl",
      color: "hover:text-[#4285F4]",
      sub: "500+ Hires Prepared"
    },
    {
      name: "Microsoft",
      icon: "fa-brands fa-microsoft text-4xl",
      color: "hover:text-[#00a4ef]",
      sub: "Azure & DSA Certified"
    },
    {
      name: "Amazon",
      icon: "fa-brands fa-amazon text-4xl",
      color: "hover:text-[#FF9900]",
      sub: "Leadership Principles"
    },
    {
      name: "Meta",
      icon: "fa-brands fa-meta text-4xl",
      color: "hover:text-[#0668E1]",
      sub: "Full-Stack Mock Prep"
    },
    {
      name: "Apple",
      icon: "fa-brands fa-apple text-4xl",
      color: "hover:text-black",
      sub: "System Design Tested"
    },
    {
      name: "IBM",
      icon: "fa-brands fa-ibm text-4xl",
      color: "hover:text-[#0530AD]",
      sub: "Enterprise Talent Suite"
    }
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header */}
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight max-w-2xl mx-auto mb-14">
          Our AI assessment & interview thinking is recognised by enterprises across India & globally
        </h2>

        {/* Phenomenon Studio Style 6-Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {brands.map((brand, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300 flex flex-col items-center justify-center gap-4 group shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className={`text-slate-500 group-hover:scale-110 transition-all duration-300 ${brand.color}`}>
                <i className={brand.icon} />
              </div>
              <span className="text-sm font-bold text-slate-900 tracking-wide">
                {brand.name}
              </span>
              <span className="text-[11px] text-slate-500 font-semibold">
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
