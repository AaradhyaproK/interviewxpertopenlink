import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Trophy, CheckCircle, Zap, Users, Sparkles, Award } from 'lucide-react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  suffix = "", 
  prefix = "", 
  duration = 2 
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-mono">
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};

export const StatementBreak: React.FC = () => {
  const stats = [
    {
      badge: "Built for Scale",
      icon: <Zap size={13} className="text-[#2563EB]" />,
      value: 50000,
      suffix: "+",
      label: "50,000 interviews at a time",
      sub: "Built to run seamlessly during large campus drives and mass hiring without lag."
    },
    {
      badge: "Proven Practice",
      icon: <Users size={13} className="text-purple-600" />,
      value: 2000,
      suffix: "+",
      label: "Interviews completed",
      sub: "Practiced and tested by real job seekers across 20+ software engineering roles."
    },
    {
      badge: "Recruiter Reviewed",
      icon: <CheckCircle size={13} className="text-emerald-600" />,
      value: 100,
      suffix: "%",
      label: "Tested with hiring managers",
      sub: "Reviewed and fine-tuned with seasoned recruiters from leading hiring firms."
    },
    {
      badge: "Faster Hiring",
      icon: <Sparkles size={13} className="text-amber-600" />,
      value: 3,
      suffix: "x",
      label: "Quicker hiring decisions",
      sub: "Clear, objective scorecards and recorded responses save hours of screening."
    }
  ];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-white border-t border-[#E2E8F0] transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unified Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-2.5 font-sans">
            Proven At Scale
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
            Built to handle heavy volume. Trusted by real teams.
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#64748B] font-sans font-normal leading-relaxed">
            Whether you are preparing for your next career move or screening hundreds of applicants, InterviewXpert gives you dependable, real-world results.
          </p>
        </div>

        {/* 4 Refined Metric Cards with Counting Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-7 rounded-[26px] bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#BFDBFE] transition-all duration-300 flex flex-col justify-between group shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_28px_-6px_rgba(37,99,235,0.08)] hover:-translate-y-1"
            >
              <div>
                {/* Category Badge */}
                <div className="flex items-center gap-1.5 w-fit px-3 py-1 rounded-full bg-white border border-[#E2E8F0] shadow-sm text-xs font-sans font-semibold text-[#0F172A]">
                  {stat.icon}
                  <span>{stat.badge}</span>
                </div>

                {/* Main Number Counter */}
                <p className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mt-6 group-hover:text-[#2563EB] transition-colors font-mono">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>

                {/* Subtitle / Headline */}
                <p className="text-sm font-bold text-[#0F172A] mt-2.5 leading-snug font-sans">
                  {stat.label}
                </p>
              </div>

              {/* Card Footer Subtext */}
              <div className="pt-4 mt-6 border-t border-[#E2E8F0] text-xs text-[#64748B] font-normal font-sans leading-relaxed">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Supported by Yi Trust Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 p-4 sm:p-5 rounded-[22px] bg-[#EFF6FF]/60 border border-[#BFDBFE] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#BFDBFE] shadow-sm flex items-center justify-center text-[#2563EB] font-bold font-mono text-sm flex-shrink-0">
              Yi
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-[#0F172A]">
                Supported by Young Indians (Yi) & Winner of Yi IDS 6.0
              </h4>
              <p className="text-xs text-[#64748B] font-sans">
                Recognized at the National Innovation & Design Summit 6.0 for breakthrough AI interview infrastructure.
              </p>
            </div>
          </div>

          <span className="px-4 py-1.5 rounded-full bg-white border border-[#BFDBFE] text-xs font-mono font-bold text-[#2563EB] shadow-sm whitespace-nowrap">
            🏆 Winner Yi IDS 6.0
          </span>
        </motion.div>

      </div>
    </section>
  );
};

export default StatementBreak;
