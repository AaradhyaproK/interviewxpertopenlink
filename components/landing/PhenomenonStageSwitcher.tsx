import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  ArrowRight, 
  Check, 
  Briefcase, 
  Mic, 
  Code2, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Volume2,
  Activity
} from 'lucide-react';

interface Stage {
  id: string;
  number: string;
  tabLabel: string;
  tag: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string };
  actionText: string;
  actionLink: string;
  highlights: string[];
}

export const PhenomenonStageSwitcher: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-10% 0px -10% 0px" });

  const stages: Stage[] = [
    {
      id: 'candidate',
      number: '01',
      tabLabel: 'Practice Simulator',
      tag: 'For Job Seekers',
      badgeColor: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
      title: 'Interactive Practice Simulator',
      subtitle: 'Realistic Mock Interviews with Code & Voice',
      description: 'Experience 1-on-1 technical and behavioral rounds that dynamically adapt to your spoken reasoning. Solve coding challenges in a live sandbox with instant test verification and space-time complexity analysis.',
      metrics: { label: 'Candidate Confidence', value: '94%' },
      actionText: 'Start Free Practice Round',
      actionLink: '/auth',
      highlights: [
        'Domain and role selection tailored to target tech giants',
        'In-browser multi-language IDE with instant automated test cases',
        'Time & Space complexity feedback after every solution',
        'Comprehensive feedback scorecard after every completed session'
      ]
    },
    {
      id: 'recruiter',
      number: '02',
      tabLabel: 'Candidate Screening',
      tag: 'For Hiring Teams',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      title: 'Automated Screening Pipeline',
      subtitle: 'Structured Talent Assessment Pipeline',
      description: 'Eliminate days of repetitive screening calls. Parse resumes in bulk, rank candidates by job description fit, dispatch WhatsApp & Email invitations, and review objective video scorecards.',
      metrics: { label: 'Screening Time Saved', value: '80%' },
      actionText: 'Explore Recruiter Pipeline',
      actionLink: '/auth',
      highlights: [
        'Bulk resume dump with instant candidate match ranking',
        'Direct interview invitations sent via WhatsApp & Email',
        'Standardized skill evaluations without unconscious bias',
        'Shareable candidate recordings for hiring managers'
      ]
    },
    {
      id: 'voice',
      number: '03',
      tabLabel: 'Conversational Voice',
      tag: 'Speech Experience',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'Natural Conversational Flow',
      subtitle: 'Adaptive Voice & Real-Time Listening',
      description: 'Speak naturally just like in a live meeting. The system listens attentively, transcribes in real time, generates sharp follow-up questions, and coaches fluency, articulation, and pacing.',
      metrics: { label: 'Audio Response Latency', value: '<120ms' },
      actionText: 'Try Interactive Voice',
      actionLink: '/auth',
      highlights: [
        'Natural speech cadence with authentic Indian English and regional accents',
        'Smart follow-up questions based on your specific responses',
        'Full conversational transcript synchronized to audio playback',
        'Speech clarity, articulation, and filler word detection'
      ]
    },
    {
      id: 'report',
      number: '04',
      tabLabel: 'Evaluation Scorecard',
      tag: 'Actionable Scorecard',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      title: 'Granular Performance Reports',
      subtitle: '11 Key Communication & Technical Metrics',
      description: 'Deep dive into your performance with granular breakdowns across communication, technical depth, problem-solving, and video etiquette. Download shareable PDF reports.',
      metrics: { label: 'Evaluation Dimensions', value: '11 Metrics' },
      actionText: 'View Sample Scorecard',
      actionLink: '/auth',
      highlights: [
        '11 Soft Skills: Fluency, Clarity, Confidence, Tone, and Structure',
        'Question-by-question video recordings with synced transcripts',
        'Constructive breakdown of strengths and areas to refine',
        'Passcode-protected shareable links for employers'
      ]
    },
    {
      id: 'admin',
      number: '05',
      tabLabel: 'Enterprise Governance',
      tag: 'Trust & Governance',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      title: 'Campus & Enterprise Governance',
      subtitle: 'Verified Sessions & Role Management',
      description: 'Centralized workspace controls for campus placement drives, recruiting agencies, and enterprise teams with secure role management and strict candidate privacy protections.',
      metrics: { label: 'Platform Availability', value: '99.9%' },
      actionText: 'Enterprise Governance',
      actionLink: '/auth',
      highlights: [
        'Campus batch management with central placement dashboards',
        'Session integrity verification for genuine candidate skills',
        'Multi-recruiter team accounts with role permissions',
        'Enterprise-grade security and zero candidate data reselling'
      ]
    }
  ];

  const currentStage = stages[activeIndex];

  // Auto-progress when in viewport and not hovered
  useEffect(() => {
    if (!isInView || isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stages.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isInView, isPaused, stages.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % stages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? stages.length - 1 : prev - 1));
  };

  return (
    <section 
      ref={sectionRef} 
      id="process" 
      className="py-16 sm:py-20 relative overflow-hidden bg-[#F8FAFC] border-t border-b border-[#E2E8F0] transition-colors duration-500"
    >
      {/* Subtle Micro Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unified Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-2.5 font-sans">
            Interactive Workflow Tour
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
            How InterviewXpert works.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] font-sans font-normal leading-relaxed">
            Automated pipeline connecting candidate practice, voice dialogue, code evaluation, and recruiter screening.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SLEEK SEGMENTED SLIDER CONTROLLER WITH ACTIVE PROGRESS BAR */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 p-1.5 bg-white rounded-full border border-[#E2E8F0] shadow-sm mb-8 overflow-x-auto scrollbar-none">
          {stages.map((stage, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveIndex(idx)}
                className={`relative flex-1 min-w-[130px] sm:min-w-0 py-2 sm:py-2.5 px-3 rounded-full text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden ${
                  isSelected
                    ? 'bg-[#0F172A] text-white shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                }`}
              >
                <span className={`font-mono text-[11px] ${isSelected ? 'text-[#60A5FA]' : 'text-[#94A3B8]'}`}>
                  {stage.number}
                </span>
                <span className="truncate">{stage.tabLabel}</span>

                {/* Animated active progress bar inside selected tab */}
                {isSelected && (
                  <motion.div
                    key={`bar-${idx}`}
                    initial={{ width: "0%" }}
                    animate={{ width: isPaused ? "100%" : "100%" }}
                    transition={{ duration: 4.2, ease: "linear" }}
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-[#2563EB]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* MAIN SHOWCASE SLIDER CARD */}
        {/* ========================================================================= */}
        <div 
          className="rounded-[26px] bg-white border border-[#E2E8F0] shadow-[0_10px_30px_-5px_rgba(15,23,42,0.05)] p-6 sm:p-9 relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Stage Narrative & Action */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#0F172A] text-white">
                      NODE {currentStage.number}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border font-sans ${currentStage.badgeColor}`}>
                      {currentStage.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] mb-1.5">
                    {currentStage.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#2563EB] mb-3.5 font-sans">
                    {currentStage.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-sans font-normal mb-6">
                    {currentStage.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="space-y-2.5 mb-7">
                    {currentStage.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-[#0F172A] font-sans">
                        <Check size={14} className="text-[#2563EB] mt-0.5 shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA & Metric */}
                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                  <Link
                    to={currentStage.actionLink}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-all shadow-[0_4px_12px_rgba(37,99,235,0.25)] hover:-translate-y-0.5"
                  >
                    <span>{currentStage.actionText}</span>
                    <ArrowRight size={13} />
                  </Link>

                  <span className="text-xs font-mono text-[#64748B]">
                    {currentStage.metrics.label}: <strong className="text-[#0F172A] font-bold">{currentStage.metrics.value}</strong>
                  </span>
                </div>
              </div>

              {/* Right Column: High-Fidelity Faint Preview Mockup */}
              <div className="lg:col-span-6 bg-[#F8FAFC]/90 backdrop-blur-sm border border-[#E2E8F0] rounded-[22px] p-5 sm:p-6 shadow-sm">
                
                {/* 01: Code IDE Simulation */}
                {currentStage.id === 'candidate' && (
                  <div className="space-y-3 font-sans">
                    <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white text-[#2563EB] flex items-center justify-center border border-[#E2E8F0] shadow-sm">
                          <Code2 size={14} />
                        </div>
                        <span className="font-display font-bold text-xs text-[#0F172A]">
                          Full-Stack Technical Round
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        100% Passed
                      </span>
                    </div>

                    <div className="rounded-xl bg-[#0F172A] p-4 font-mono text-xs text-[#E2E8F0] shadow-sm">
                      <p className="text-[#93C5FD]">function <span className="text-[#60A5FA]">invertTree</span>(root: TreeNode): TreeNode &#123;</p>
                      <p className="text-slate-400 pl-3">if (!root) return null;</p>
                      <p className="text-[#86EFAC] pl-3">[root.left, root.right] = [root.right, root.left];</p>
                      <p className="text-slate-400 pl-3">invertTree(root.left); invertTree(root.right);</p>
                      <p className="text-[#93C5FD] pl-3">return root;</p>
                      <p className="text-[#93C5FD]">&#125;</p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] flex items-center justify-between text-xs font-mono">
                      <span>Time Complexity: <strong className="text-[#0F172A]">O(n)</strong></span>
                      <span className="text-[#2563EB] font-semibold">12/12 Test Cases</span>
                    </div>
                  </div>
                )}

                {/* 02: Candidate Leaderboard */}
                {currentStage.id === 'recruiter' && (
                  <div className="space-y-3 font-sans">
                    <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white text-purple-600 flex items-center justify-center border border-[#E2E8F0] shadow-sm">
                          <Briefcase size={14} />
                        </div>
                        <span className="font-display font-bold text-xs text-[#0F172A]">
                          Applicant Leaderboard
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-full border border-[#BFDBFE]">
                        42 Profiles Ranked
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] flex items-center justify-between shadow-sm">
                        <div>
                          <p className="font-bold text-xs text-[#0F172A]">1. Priya Sharma (Lead React)</p>
                          <p className="text-[11px] text-[#64748B]">8.4 yrs exp &bull; 96% Rubric Fit</p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          Shortlisted
                        </span>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] flex items-center justify-between shadow-sm">
                        <div>
                          <p className="font-bold text-xs text-[#0F172A]">2. Rahul Mehta (Full-Stack Dev)</p>
                          <p className="text-[11px] text-[#64748B]">4.5 yrs exp &bull; 92% Rubric Fit</p>
                        </div>
                        <span className="text-[10px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-[#BFDBFE]">
                          Invite Sent
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 03: Conversational Voice */}
                {currentStage.id === 'voice' && (
                  <div className="space-y-3 font-sans">
                    <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white text-emerald-600 flex items-center justify-center border border-[#E2E8F0] shadow-sm">
                          <Mic size={14} />
                        </div>
                        <span className="font-display font-bold text-xs text-[#0F172A]">
                          Live Voice Stream (110ms)
                        </span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB]">
                        <Volume2 size={14} /> Interviewer Question:
                      </div>
                      <p className="text-xs text-[#0F172A] leading-relaxed">
                        "Your explanation of caching was clear. How would you handle database cache eviction under high write traffic?"
                      </p>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                      <span>Cadence: <strong>Fluid & Clear</strong></span>
                      <span className="font-mono">Pacing: 140 WPM</span>
                    </div>
                  </div>
                )}

                {/* 04: Scorecard Review */}
                {currentStage.id === 'report' && (
                  <div className="space-y-3 font-sans">
                    <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white text-amber-600 flex items-center justify-center border border-[#E2E8F0] shadow-sm">
                          <BarChart3 size={14} />
                        </div>
                        <span className="font-display font-bold text-xs text-[#0F172A]">
                          11 Soft Skills Breakdown
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Score: 9.4 / 10
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-white rounded-xl border border-[#E2E8F0]">
                        <p className="text-[#64748B] text-[11px]">Speech Fluency</p>
                        <p className="font-bold text-[#0F172A]">96%</p>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-[#E2E8F0]">
                        <p className="text-[#64748B] text-[11px]">Technical Depth</p>
                        <p className="font-bold text-[#0F172A]">94%</p>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-[#E2E8F0]">
                        <p className="text-[#64748B] text-[11px]">Clarity of Tone</p>
                        <p className="font-bold text-[#0F172A]">92%</p>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-[#E2E8F0]">
                        <p className="text-[#64748B] text-[11px]">Video Etiquette</p>
                        <p className="font-bold text-[#0F172A]">98%</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 05: Governance Dashboard */}
                {currentStage.id === 'admin' && (
                  <div className="space-y-3 font-sans">
                    <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white text-sky-600 flex items-center justify-center border border-[#E2E8F0] shadow-sm">
                          <ShieldCheck size={14} />
                        </div>
                        <span className="font-display font-bold text-xs text-[#0F172A]">
                          Campus Governance
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                        SOC-2 Standards
                      </span>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] space-y-1.5 text-xs">
                      <div className="flex justify-between items-center text-[#0F172A] font-semibold">
                        <span>Batch 2026 CS Drive:</span>
                        <span className="text-[#2563EB]">184 Students Active</span>
                      </div>
                      <p className="text-[11px] text-[#64748B]">
                        100% verified session integrity with tab verification and private cloud storage.
                      </p>
                    </div>

                    <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-200 flex items-center justify-between text-xs text-sky-800">
                      <span>Data Privacy: <strong>100% Private</strong></span>
                      <span className="font-mono">Zero Data Reselling</span>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* SLIDER CONTROLS & PROGRESS */}
        {/* ========================================================================= */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {stages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx 
                    ? 'w-6 bg-[#2563EB]' 
                    : 'w-2 bg-[#CBD5E1]'
                }`}
                aria-label={`Go to stage ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] shadow-sm transition-all active:scale-95"
              aria-label="Previous Stage"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-[#0F172A] hover:bg-[#2563EB] text-white transition-all shadow-sm active:scale-95"
              aria-label="Next Stage"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PhenomenonStageSwitcher;
