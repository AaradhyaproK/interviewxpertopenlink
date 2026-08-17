import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Video, 
  Mic, 
  Mail, 
  Volume2, 
  ShieldCheck, 
  FileCode,
  Zap,
  ChevronLeft,
  ChevronRight,
  Activity,
  Check
} from 'lucide-react';

interface EngineItem {
  id: number;
  tag: string;
  name: string;
  domain: string;
  desc: string;
  metric: string;
  metricLabel: string;
  status: string;
  uptime: string;
  icon: any;
}

export const TechStackMatrix: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const engines: EngineItem[] = [
    {
      id: 1,
      tag: "Speech Stream",
      name: "Real-Time Audio Engine",
      domain: "Voice & Audio",
      desc: "Sub-120ms conversational audio streaming with natural accents and seamless back-and-forth flow.",
      metric: "<120ms",
      metricLabel: "Latency",
      status: "Active",
      uptime: "99.9% Uptime",
      icon: Volume2
    },
    {
      id: 2,
      tag: "Adaptive Logic",
      name: "Adaptive Question Engine",
      domain: "Intelligence",
      desc: "Generates challenging, role-specific follow-ups directly based on your spoken answers and code.",
      metric: "Dynamic",
      metricLabel: "Follow-ups",
      status: "Active",
      uptime: "99.9% Uptime",
      icon: Zap
    },
    {
      id: 3,
      tag: "Transcription",
      name: "High-Accuracy Speech-to-Text",
      domain: "Speech Processing",
      desc: "Instant speaker diarization and synchronized transcripts for clear post-interview review.",
      metric: "99.2%",
      metricLabel: "Accuracy",
      status: "Active",
      uptime: "99.9% Uptime",
      icon: Mic
    },
    {
      id: 4,
      tag: "Cloud Video",
      name: "HD Video Cloud Streaming",
      domain: "Media Storage",
      desc: "Secure direct-to-cloud session recording with instant playback and private shareable links.",
      metric: "1080p",
      metricLabel: "Direct Stream",
      status: "Active",
      uptime: "99.9% Uptime",
      icon: Video
    },
    {
      id: 5,
      tag: "Notifications",
      name: "Direct Candidate Messaging",
      domain: "Communications",
      desc: "Automated candidate invites with 6-digit access codes dispatched directly to WhatsApp and Email.",
      metric: "Instant",
      metricLabel: "WhatsApp & Email",
      status: "Active",
      uptime: "99.9% Uptime",
      icon: Mail
    },
    {
      id: 6,
      tag: "Session Security",
      name: "Client-Side Integrity Checks",
      domain: "Session Security",
      desc: "In-browser facial tracking and tab verification ensuring authentic, verified candidate results.",
      metric: "100%",
      metricLabel: "Verified",
      status: "Active",
      uptime: "99.9% Uptime",
      icon: ShieldCheck
    },
    {
      id: 7,
      tag: "Fast Parsers",
      name: "Client PDF Parser & KaTeX",
      domain: "Rendering Engine",
      desc: "Client-side ATS resume text extraction and complex mathematical LaTeX formula rendering.",
      metric: "<1.2s",
      metricLabel: "Parse Time",
      status: "Active",
      uptime: "99.9% Uptime",
      icon: FileCode
    },
    {
      id: 8,
      tag: "Cloud Sync",
      name: "Enterprise Cloud Database",
      domain: "Cloud Database",
      desc: "Real-time synchronization for interviews, scores, user profiles, and test submissions.",
      metric: "Real-Time",
      metricLabel: "Cloud Sync",
      status: "Active",
      uptime: "99.9% Uptime",
      icon: Database
    }
  ];

  // Auto-shift center card every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % engines.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, engines.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? engines.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % engines.length);
  };

  // Circular offset calculation
  const getCardOffset = (index: number) => {
    const total = engines.length;
    let diff = (index - currentIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section id="engine" className="py-16 sm:py-20 relative overflow-hidden bg-white border-t border-[#E2E8F0] transition-colors duration-500">
      
      {/* Background Soft Glow */}
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.08) 0%, rgba(248, 250, 252, 0.8) 50%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unified Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-2.5 font-sans">
            Architecture
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
            Connected Engine Architecture
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] font-sans font-normal leading-relaxed">
            8 micro-engines orchestrated into a high-throughput, low-latency execution pipeline.
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
          {/* Cards Display Container */}
          <div className="relative w-full max-w-4xl h-[380px] flex items-center justify-center">
            {engines.map((item, index) => {
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
                translateX = offset > 0 ? 290 : -290;
                scale = 0.88;
                opacity = 0.65;
                zIndex = 25;
              } else if (isOuterSide) {
                translateX = offset > 0 ? 510 : -510;
                scale = 0.74;
                opacity = 0.25;
                zIndex = 15;
              }

              const Icon = item.icon;

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
                  className="absolute w-[300px] sm:w-[370px] cursor-pointer"
                >
                  <div
                    className={`relative rounded-[26px] p-6 sm:p-7 transition-all duration-300 border flex flex-col justify-between h-[330px] overflow-hidden ${
                      isCenter
                        ? 'bg-white border-[#CBD5E1] shadow-[0_20px_45px_-12px_rgba(15,23,42,0.09),0_1px_3px_rgba(15,23,42,0.04)]'
                        : 'bg-[#F8FAFC]/90 backdrop-blur-sm border-[#E2E8F0] shadow-sm hover:border-[#CBD5E1]'
                    }`}
                  >
                    {/* Subtle Ambient Watermark Icon */}
                    <div className="absolute -top-4 -right-4 text-[#0F172A]/[0.035] pointer-events-none select-none">
                      <Icon size={110} strokeWidth={1.2} />
                    </div>

                    <div>
                      {/* Top Designer Icon Box */}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm mb-4 relative z-10 transition-transform ${
                        isCenter 
                          ? 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE] scale-105' 
                          : 'bg-white text-[#64748B] border-[#E2E8F0]'
                      }`}>
                        <Icon size={22} strokeWidth={2.2} />
                      </div>

                      {/* Domain Tag & Engine Name */}
                      <p className="text-[11px] font-mono font-bold text-[#2563EB] uppercase tracking-wider mb-1">
                        {item.domain}
                      </p>
                      <h3 className={`font-display text-xl sm:text-2xl font-bold tracking-tight mb-2.5 transition-colors ${
                        isCenter ? 'text-[#0F172A]' : 'text-[#334155]'
                      }`}>
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#64748B] font-sans leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Bottom Designer Waveform Bars */}
                    <div className="pt-3.5 border-t border-[#E2E8F0] flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
                        <span className="w-8 h-1 rounded-full bg-[#E2E8F0]" />
                      </div>

                      {/* Subtle Graphic Soundwave Bars */}
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-3 rounded-full bg-[#BFDBFE] animate-pulse" />
                        <span className="w-1 h-5 rounded-full bg-[#2563EB]" />
                        <span className="w-1 h-2 rounded-full bg-[#93C5FD]" />
                        <span className="w-1 h-4 rounded-full bg-[#1D4ED8] animate-pulse" />
                        <span className="w-1 h-2.5 rounded-full bg-[#BFDBFE]" />
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel Navigation Controls & Indicator Dots */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] shadow-sm hover:shadow transition-all active:scale-95"
            aria-label="Previous Engine"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Indicator Dots */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAFC] rounded-full border border-[#E2E8F0]">
            {engines.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? 'w-6 bg-[#2563EB]' 
                    : 'w-1.5 bg-[#CBD5E1]'
                }`}
                aria-label={`Go to engine ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-full bg-[#0F172A] hover:bg-[#2563EB] text-white transition-all shadow-sm active:scale-95"
            aria-label="Next Engine"
          >
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default TechStackMatrix;
