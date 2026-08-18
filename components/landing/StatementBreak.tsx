import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Trophy, CheckCircle, Zap, Users, Sparkles, Award, ShieldCheck } from 'lucide-react';

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

        {/* Supported by Yi National Recognition Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 p-6 sm:p-7 rounded-[26px] bg-gradient-to-r from-[#F8FAFC] via-white to-[#F8FAFC] border border-[#E2E8F0] shadow-[0_2px_14px_rgba(15,23,42,0.03)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] flex-shrink-0 shadow-sm">
              <Award className="w-6 h-6 text-[#2563EB]" strokeWidth={1.75} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                  National Recognition
                </span>
                <span className="text-xs text-[#64748B] font-sans">
                  Young Indians (Yi) • Confederation of Indian Industry (CII)
                </span>
              </div>
              <h4 className="font-display font-bold text-base sm:text-lg text-[#0F172A] tracking-tight">
                Winner — Innovation & Design Summit 6.0
              </h4>
              <p className="text-xs sm:text-sm text-[#64748B] font-sans mt-0.5 leading-relaxed">
                Awarded for technical architecture excellence and ethical AI implementation in automated interview simulation and workforce readiness.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:self-center self-start flex-shrink-0">
            <div className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm flex items-center gap-1.5 text-xs font-semibold text-[#0F172A] font-sans">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Jury Calibrated</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-[#2563EB] text-white shadow-sm flex items-center gap-1.5 text-xs font-semibold font-sans">
              <span>Yi IDS 6.0 Winner</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default StatementBreak;
