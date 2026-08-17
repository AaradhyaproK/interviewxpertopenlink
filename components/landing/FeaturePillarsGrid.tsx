import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Lock, 
  Bot, 
  Target, 
  Building2, 
  BarChart, 
  Wrench, 
  Workflow, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  FileCode,
  Users,
  Video
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeaturePillarsGrid: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const pillars = [
    {
      id: 1,
      name: "Core Architecture & RBAC",
      subtitle: "Enterprise Role-Based Security & Permissions",
      tag: "Pillar 01",
      badge: "Architecture",
      icon: Lock,
      color: "from-blue-600 to-indigo-600",
      accentBg: "bg-blue-50 text-blue-700 border-blue-200",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
      features: [
        "Multi-Method Auth: Email, Password & 1-Click Google OAuth",
        "Three-Tier Roles: Candidate, Recruiter, and Admin Architecture",
        "Protected Routing Guards with Session State Management",
        "Responsive Navigation with Dual-Theme System Support"
      ],
      kpi: "100% RBAC Isolation"
    },
    {
      id: 2,
      name: "Multi-Engine AI & Voice",
      subtitle: "Amazon Bedrock, Gemini, Grok, Sarvam & AssemblyAI",
      tag: "Pillar 02",
      badge: "Multi-Model AI",
      icon: Bot,
      color: "from-orange-500 to-amber-500",
      accentBg: "bg-orange-50 text-orange-700 border-orange-200",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      features: [
        "Amazon Bedrock Mantle: nvidia.nemotron-9b & 30b models",
        "Reasoning Sanitizer: Strips <think> tags for natural audio",
        "Sarvam AI: High-fidelity Hindi & Indian English voice synthesis",
        "AssemblyAI: Real-time STT diarization with word confidence"
      ],
      kpi: "<250ms Audio Latency"
    },
    {
      id: 3,
      name: "Candidate Suite & Simulator",
      subtitle: "Live AI Mock Interview, IDE, KaTeX & ATS Builder",
      tag: "Pillar 03",
      badge: "Candidate Tools",
      icon: Target,
      color: "from-emerald-600 to-teal-600",
      accentBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      features: [
        "1-on-1 Conversational AI simulation with resume ingestion",
        "Client Face-API anti-cheat proctoring & tab-switch tracker",
        "Integrated Code Editor with KaTeX Math Formula rendering",
        "In-Browser PDF Resume ATS Scorer & Action Bullet Enhancer"
      ],
      kpi: "94.8% Offer Conversion"
    },
    {
      id: 4,
      name: "Recruiter Portal & ATS",
      subtitle: "Bulk Resume Screener, WhatsApp Invites & Tests",
      tag: "Pillar 04",
      badge: "Recruiter ATS",
      icon: Building2,
      color: "from-purple-600 to-pink-600",
      accentBg: "bg-purple-50 text-purple-700 border-purple-200",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
      features: [
        "Bulk PDF Resume Dump & AI Compatibility Leaderboard",
        "Multi-Channel Invites via Brevo Email & WhatsApp API",
        "Secure 6-digit access code verification for private tests",
        "AI Job Description generator & Custom MCQ assessment designer"
      ],
      kpi: "80% Faster Screening"
    },
    {
      id: 5,
      name: "Performance & Video Reports",
      subtitle: "11 Soft Skills, Radials, Video Playback & Decision Bar",
      tag: "Pillar 05",
      badge: "Deep Scorecard",
      icon: BarChart,
      color: "from-cyan-600 to-blue-600",
      accentBg: "bg-cyan-50 text-cyan-700 border-cyan-200",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
      features: [
        "11 Soft Skills: Fluency, Clarity, Confidence, Tone, Accent, etc.",
        "Radial score badges for Overall, Resume Match, and Q&A Score",
        "Question video playback with transcripts & hide-from-client eye toggle",
        "1-click recruiter decision bar: Shortlist, Hold, Reject & WhatsApp"
      ],
      kpi: "11 Skill Dimensions"
    },
    {
      id: 6,
      name: "Admin Console & CMS",
      subtitle: "Global Metrics, Markdown Blog CMS & Governance",
      tag: "Pillar 06",
      badge: "Governance",
      icon: Wrench,
      color: "from-indigo-600 to-violet-600",
      accentBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      features: [
        "Global analytics: candidate vs recruiter growth curves & tests",
        "Full Markdown Blog CMS with syntax highlighting & cover photos",
        "User account & role governance with state toggles",
        "Real-time health monitor for Bedrock, Gemini, Firestore & APIs"
      ],
      kpi: "99.98% System Uptime"
    },
    {
      id: 7,
      name: "External Integrations Matrix",
      subtitle: "Cloud AI, Media Storage & Dispatch Pipelines",
      tag: "Pillar 07",
      badge: "Cloud Matrix",
      icon: Workflow,
      color: "from-rose-600 to-orange-600",
      accentBg: "bg-rose-50 text-rose-700 border-rose-200",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
      features: [
        "LLMs: Amazon Bedrock, Google Gemini 2.0 Flash, xAI Grok",
        "Media: Cloudinary video cloud, AssemblyAI, Sarvam AI voice",
        "Client Security: TensorFlow Face-API, pdfjs-dist, KaTeX LaTeX",
        "Comms: Brevo Email API, WhatsApp Webhooks, jsPDF engine"
      ],
      kpi: "10+ Cloud Services"
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const index = Math.round(scrollLeft / (clientWidth * 0.75));
      setActiveCardIndex(Math.min(Math.max(index, 0), pillars.length - 1));
    }
  };

  return (
    <section id="features" className="py-24 sm:py-32 relative overflow-hidden bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold uppercase tracking-widest text-[#ff5722] mb-4 shadow-sm">
              <Sparkles size={14} /> Comprehensive 7-Pillar Architecture
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Explore Our 7 Core Platform Pillars
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl">
              Scroll horizontally through the architectural engines powering candidate mock interviews, recruiter ATS automation, and multi-model AI.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200 shadow-sm hover:scale-105 active:scale-95"
              aria-label="Previous Pillar"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-[#ff5722] hover:bg-[#f4511e] text-white transition-all shadow-[0_4px_14px_rgba(255,87,34,0.4)] hover:scale-105 active:scale-95"
              aria-label="Next Pillar"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HORIZONTAL SCROLLING PILLAR CARDS CONTAINER */}
        {/* ========================================================================= */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex items-stretch gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="snap-center shrink-0 w-[310px] sm:w-[380px] md:w-[420px] rounded-3xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-2xl hover:-translate-y-1 overflow-hidden group"
              >
                {/* Client-Centric Visual Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={pillar.image}
                    alt={pillar.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Floating Pillar Tag */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 font-extrabold text-xs shadow-sm">
                      {pillar.tag}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${pillar.accentBg} backdrop-blur-md`}>
                      {pillar.badge}
                    </span>
                  </div>

                  {/* KPI Badge */}
                  <div className="absolute bottom-3 right-4 px-3 py-1 rounded-xl bg-slate-900/90 text-white font-black text-xs backdrop-blur-md shadow-md border border-white/20">
                    {pillar.kpi}
                  </div>
                </div>

                {/* Pillar Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-[#ff5722]/10 text-[#ff5722] flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#ff5722] transition-colors">
                        {pillar.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 font-medium mb-6">
                      {pillar.subtitle}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2.5 mb-6">
                      {pillar.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Link */}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <Link
                      to="/auth"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#ff5722] hover:text-[#f4511e] transition-colors"
                    >
                      <span>Explore Pillar</span>
                      <ArrowRight size={15} />
                    </Link>
                    <span className="text-[11px] font-mono text-slate-400">Pillar 0{pillar.id}/07</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Scroll Progress Bar & Indicators */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {pillars.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const { clientWidth } = scrollContainerRef.current;
                  scrollContainerRef.current.scrollTo({
                    left: dotIdx * (clientWidth * 0.75),
                    behavior: 'smooth'
                  });
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeCardIndex === dotIdx
                  ? 'w-8 bg-[#ff5722]'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturePillarsGrid;
