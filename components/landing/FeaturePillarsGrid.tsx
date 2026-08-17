import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Check, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface PillarItem {
  id: number;
  pipelineNum: string;
  tabLabel: string;
  tag: string;
  name: string;
  subtitle: string;
  kpi: string;
  features: string[];
  actionLink: string;
}

export const FeaturePillarsGrid: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const pillars: PillarItem[] = [
    {
      id: 1,
      pipelineNum: "01",
      tabLabel: "Voice Rounds",
      tag: "Pipeline 01",
      name: "Conversational Mock Rounds",
      subtitle: "Dynamic speech rounds that adapt in real time",
      kpi: "Sub-120ms Latency",
      features: [
        "Natural back-and-forth dialogue with realistic interviewer cadence",
        "Adaptive follow-ups based on your exact spoken reasoning",
        "Pacing, clarity, and articulation coaching in real time",
        "Support for Indian English, Hindi, and regional accents"
      ],
      actionLink: "/auth"
    },
    {
      id: 2,
      pipelineNum: "02",
      tabLabel: "Code Sandbox",
      tag: "Pipeline 02",
      name: "Live Code & Algorithm Sandbox",
      subtitle: "Write, test, and explain technical solutions",
      kpi: "Automated Test Runs",
      features: [
        "In-browser multi-language IDE supporting JS, Python, Java, C++",
        "Real-time test case runner testing edge cases and performance",
        "KaTeX mathematical formula and LaTeX rendering support",
        "Time & Space complexity analysis on every solution"
      ],
      actionLink: "/auth"
    },
    {
      id: 3,
      pipelineNum: "03",
      tabLabel: "ATS Optimizer",
      tag: "Pipeline 03",
      name: "Resume & ATS Optimizer",
      subtitle: "Actionable keyword tuning for dream job descriptions",
      kpi: "94% ATS Pass Rate",
      features: [
        "Instant PDF resume parsing and ATS benchmark score",
        "Action-verb suggestions and quantifiable bullet points",
        "Role-matching keywords for top technology companies",
        "Clean, employer-ready single-click PDF downloads"
      ],
      actionLink: "/auth"
    },
    {
      id: 4,
      pipelineNum: "04",
      tabLabel: "Recruiter Pipeline",
      tag: "Pipeline 04",
      name: "Recruiter Hiring Pipeline",
      subtitle: "Effortless candidate screening and talent leaderboards",
      kpi: "80% Screening Saved",
      features: [
        "Bulk resume dump with instant candidate match ranking",
        "Automated WhatsApp & Email interview invitation links",
        "Secure 6-digit access code verification for private rounds",
        "Collaborative feedback and candidate decision workflows"
      ],
      actionLink: "/auth"
    },
    {
      id: 5,
      pipelineNum: "05",
      tabLabel: "Scorecards",
      tag: "Pipeline 05",
      name: "Granular Performance Scorecards",
      subtitle: "11 Soft skill dimensions with video review",
      kpi: "11 Skill Dimensions",
      features: [
        "11 Communication metrics: Fluency, Clarity, Confidence, Tone",
        "Question-by-question video recordings with synced transcripts",
        "Constructive breakdown of strengths and areas to refine",
        "Shareable client URLs with private passcode links"
      ],
      actionLink: "/auth"
    },
    {
      id: 6,
      pipelineNum: "06",
      tabLabel: "Company Tracks",
      tag: "Pipeline 06",
      name: "Curated Company Prep Tracks",
      subtitle: "Specialized tracks for TCS, Infosys, Wipro & FAANG",
      kpi: "Top Tech Rubrics",
      features: [
        "TCS NQT and Digital interview practice modules",
        "Infosys SP & DSE technical round simulations",
        "Wipro Elite & Turbo aptitude and coding tracks",
        "Big Tech system design and behavioral question banks"
      ],
      actionLink: "/auth"
    },
    {
      id: 7,
      pipelineNum: "07",
      tabLabel: "Session Integrity",
      tag: "Pipeline 07",
      name: "Privacy & Session Integrity",
      subtitle: "Verified candidate skills in a trusted environment",
      kpi: "100% Data Privacy",
      features: [
        "Session verification ensuring authentic candidate responses",
        "Zero selling of candidate data or recorded sessions",
        "Client-side processing protecting candidate privacy",
        "Role-based access control for colleges & enterprise teams"
      ],
      actionLink: "/auth"
    }
  ];

  // Auto-shift center card every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pillars.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, pillars.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? pillars.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % pillars.length);
  };

  // Calculate circular offset for 3D perspective flow
  const getCardOffset = (index: number) => {
    const total = pillars.length;
    let diff = (index - currentIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section 
      id="features" 
      className="py-16 sm:py-20 relative overflow-hidden bg-white border-t border-[#E2E8F0] transition-colors duration-500 w-full"
    >
      {/* Background Soft Ambient Light */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.08) 0%, rgba(248, 250, 252, 0.8) 50%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Unified Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-2.5 font-sans">
            Interactive Workflow Cards
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
            Engineered for seamless execution.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] font-sans font-normal leading-relaxed">
            Explore the automated workflow modules built to help you practice, score, and land the offer.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* REFINED PREMIUM 3D FLOW CAROUSEL */}
        {/* ========================================================================= */}
        <div 
          className="relative min-h-[400px] sm:min-h-[440px] flex items-center justify-center overflow-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Card Flow Viewport */}
          <div className="relative w-full max-w-4xl h-[380px] flex items-center justify-center">
            {pillars.map((item, index) => {
              const offset = getCardOffset(index);
              const isCenter = offset === 0;
              const isImmediateSide = Math.abs(offset) === 1;
              const isOuterSide = Math.abs(offset) === 2;
              const isHidden = Math.abs(offset) > 2;

              if (isHidden) return null;

              // Compute smooth spacing, scale, and opacity
              let translateX = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 30;

              if (isCenter) {
                translateX = 0;
                scale = 1.04;
                opacity = 1;
                zIndex = 40;
              } else if (isImmediateSide) {
                translateX = offset > 0 ? 300 : -300;
                scale = 0.88;
                opacity = 0.65;
                zIndex = 25;
              } else if (isOuterSide) {
                translateX = offset > 0 ? 530 : -530;
                scale = 0.74;
                opacity = 0.25;
                zIndex = 15;
              }

              return (
                <motion.div
                  key={item.id}
                  animate={{
                    x: translateX,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setCurrentIndex(index)}
                  className="absolute w-[310px] sm:w-[380px] cursor-pointer"
                >
                  <div
                    className={`relative rounded-[24px] p-6 sm:p-7 transition-all duration-300 border flex flex-col justify-between h-[360px] overflow-hidden ${
                      isCenter
                        ? 'bg-white border-[#CBD5E1] shadow-[0_20px_45px_-12px_rgba(15,23,42,0.09),0_1px_3px_rgba(15,23,42,0.04)]'
                        : 'bg-[#F8FAFC]/95 backdrop-blur-sm border-[#E2E8F0] shadow-sm hover:border-[#CBD5E1]'
                    }`}
                  >
                    {/* Subtle Blended Aesthetic Watermark Number */}
                    <span className="absolute -top-3 right-4 font-display text-8xl font-black text-[#0F172A]/[0.04] select-none pointer-events-none tracking-tighter">
                      {item.pipelineNum}
                    </span>

                    <div>
                      {/* Stylish Blended Number Indicator */}
                      <span className="font-mono text-xs font-bold text-[#2563EB] tracking-wider block mb-2 uppercase">
                        Pipeline {item.pipelineNum}
                      </span>

                      {/* Pillar Title & Subtitle */}
                      <h3 className={`font-display text-lg sm:text-xl font-bold tracking-tight mb-1 transition-colors ${
                        isCenter ? 'text-[#0F172A]' : 'text-[#334155]'
                      }`}>
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#2563EB] mb-4 font-sans">
                        {item.subtitle}
                      </p>

                      {/* 4 Feature Checklist Items */}
                      <div className="space-y-2 mb-4">
                        {item.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-[#475569] font-sans">
                            <Check size={13} className="text-[#2563EB] mt-0.5 shrink-0" />
                            <span className="leading-tight line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action CTA */}
                    <div className="pt-3.5 border-t border-[#E2E8F0] flex items-center justify-between">
                      <Link
                        to={item.actionLink}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-all shadow-sm font-sans"
                      >
                        <span>Explore</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel Navigation Controls & Indicator Dots */}
        <div className="mt-4 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] shadow-sm hover:shadow transition-all active:scale-95"
              aria-label="Previous Pipeline"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAFC] rounded-full border border-[#E2E8F0]">
              {pillars.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx 
                      ? 'w-6 bg-[#2563EB]' 
                      : 'w-1.5 bg-[#CBD5E1]'
                  }`}
                  aria-label={`Go to pipeline ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-[#0F172A] hover:bg-[#2563EB] text-white transition-all shadow-sm active:scale-95"
              aria-label="Next Pipeline"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <p className="text-xs text-[#64748B] font-mono">
            Pipeline <strong className="text-[#0F172A]">0{currentIndex + 1}</strong> of 07 &bull; Auto-shifting
          </p>
        </div>

      </div>
    </section>
  );
};

export default FeaturePillarsGrid;
