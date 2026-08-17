import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  BrainCircuit, 
  Cpu, 
  Layers 
} from 'lucide-react';

interface Stage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  statNumber: string;
  statLabel: string;
  primaryActionText: string;
  primaryActionLink: string;
  previewType: 'candidate' | 'recruiter' | 'ai' | 'report' | 'admin';
  highlights: string[];
}

export const PhenomenonStageSwitcher: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string>('candidate');

  const stages: Stage[] = [
    {
      id: 'candidate',
      number: '01',
      title: 'Candidate Practice & Simulator',
      subtitle: 'Real-Time Conversational AI & Proctoring',
      tag: 'Candidate Journey',
      description: 'Experience conversational 1-on-1 AI interviews powered by Amazon Bedrock and Gemini with real-time video proctoring, KaTeX equation rendering, interactive code IDE, and speech analysis.',
      statNumber: '94.8%',
      statLabel: 'Candidate Offer Conversion Rate',
      primaryActionText: 'Start Free AI Mock Interview',
      primaryActionLink: '/auth',
      previewType: 'candidate',
      highlights: [
        'Domain & Difficulty selection with resume-tailored questions',
        'In-browser Face-API multi-face & tab-switch proctoring',
        'Integrated multi-language code editor & KaTeX math formulas',
        'Instant AI ATS Resume Builder & keyword optimization'
      ]
    },
    {
      id: 'recruiter',
      number: '02',
      title: 'Recruiter ATS & Talent Suite',
      subtitle: 'Automated Screening & Leaderboard',
      tag: 'Enterprise Recruiter',
      description: 'Eliminate 80% of screening time. Upload bulk resumes to automatically calculate candidate-job match, create AI question banks, dispatch WhatsApp/Brevo email access codes, and grade interviews.',
      statNumber: '80%',
      statLabel: 'Reduction in Recruiter Screening Hours',
      primaryActionText: 'Access Recruiter Portal',
      primaryActionLink: '/auth',
      previewType: 'recruiter',
      highlights: [
        'Bulk PDF Resume Dump & AI Compatibility Scorer',
        'Multi-Channel candidate invites via Brevo Email & WhatsApp API',
        'Secure 6-digit access code verification for private tests',
        'Interactive hiring pipeline funnel (Applied ➔ Shortlisted ➔ Hired)'
      ]
    },
    {
      id: 'ai',
      number: '03',
      title: 'Multi-Engine AI & Voice Architecture',
      subtitle: 'Nemotron, Gemini, Grok, Sarvam & AssemblyAI',
      tag: 'Core Infrastructure',
      description: 'Orchestrating specialized LLM models for specific workloads. Question generation via Nemotron-Nano-9B, deep analytics via Nemotron-30B, Gemini 2.0 streaming, and Sarvam AI Indian accents.',
      statNumber: '<250ms',
      statLabel: 'Voice Synthesis & Reasoning Latency',
      primaryActionText: 'Explore AI Engine Matrix',
      primaryActionLink: '/status',
      previewType: 'ai',
      highlights: [
        'Amazon Bedrock Mantle: nvidia.nemotron-nano-9b & 30b models',
        'Clean reasoning sanitizer stripping <think> tags for natural audio',
        'Sarvam AI Hindi & Indian English high-fidelity voice synthesis',
        'AssemblyAI turn-by-turn conversational diarization & confidence'
      ]
    },
    {
      id: 'report',
      number: '04',
      title: 'In-Depth Candidate Video Reports',
      subtitle: '11 Soft Skill Dimensions & Q&A Playback',
      tag: 'Candidate Intelligence',
      description: 'Comprehensive hiring scorecard with 11 multi-dimensional communication ratings, tab-switch proctoring logs, interactive HTML5 video player per question, jsPDF downloads, and client passcode links.',
      statNumber: '11',
      statLabel: 'Multi-Dimensional Soft Skill Metrics',
      primaryActionText: 'View Sample Candidate Report',
      primaryActionLink: '/auth',
      previewType: 'report',
      highlights: [
        '11 Soft Skills: Fluency, Clarity, Confidence, Presence of Mind, Tone',
        'Radial score badges for Overall, Resume Match, and Q&A score',
        'Question-by-question video recordings with synchronized STT',
        'Shareable client URL with passcode protection & 1-click decision bar'
      ]
    },
    {
      id: 'admin',
      number: '05',
      title: 'Admin Console & Platform Governance',
      subtitle: 'Global Metrics, CMS & Live Health Status',
      tag: 'Governance & CMS',
      description: 'Centralized administrator controls for tracking global system usage, managing user roles and permissions, publishing markdown tech articles in the CMS, and live monitoring cloud API health.',
      statNumber: '99.98%',
      statLabel: 'Service Availability & Cloud Health',
      primaryActionText: 'Admin Dashboard Overview',
      primaryActionLink: '/auth',
      previewType: 'admin',
      highlights: [
        'Global analytics: candidate vs recruiter ratios and growth curves',
        'Complete Markdown Blog CMS with syntax highlighting & cover tags',
        'Real-time Firestore, Bedrock, Gemini, and Cloudinary health ping',
        'Granular role-based access control with account state toggles'
      ]
    }
  ];

  const currentStage = stages.find(s => s.id === selectedStage) || stages[0];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-slate-50 border-t border-b border-slate-200">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff5722]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold uppercase tracking-widest text-[#ff5722] mb-4 shadow-sm">
            <Layers size={14} /> Full-Cycle Talent Intelligence
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Tailored Stages for Candidates, <br className="hidden sm:inline" />
            Recruiters & Enterprises
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Select a solution stage below to explore specialized workflows built for each stakeholder in the recruitment lifecycle.
          </p>
        </div>

        {/* Main 2-Column Stage Switcher Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Stage Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {stages.map((stage) => {
              const isSelected = stage.id === selectedStage;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage.id)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-300 border relative group ${
                    isSelected
                      ? 'bg-white border-slate-300 shadow-lg'
                      : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Left glowing accent line */}
                  {isSelected && (
                    <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#ff5722] rounded-r-full shadow-[0_0_10px_#ff5722]" />
                  )}

                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#ff5722]' : 'text-slate-400'}`}>
                      {stage.number}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {stage.tag}
                    </span>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold transition-colors ${
                    isSelected ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                  }`}>
                    {stage.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-1 font-medium">
                    {stage.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Stage Detail Display & Live Interactive Visual Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[560px]"
              >
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Details */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#ff5722]/10 text-[#ff5722] border border-[#ff5722]/20">
                      Stage {currentStage.number} &bull; {currentStage.tag}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900">
                        {currentStage.statNumber}
                      </span>
                      <span className="text-[11px] text-slate-500 max-w-[120px] leading-tight text-left font-semibold">
                        {currentStage.statLabel}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
                    {currentStage.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
                    {currentStage.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {currentStage.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <CheckCircle2 size={16} className="text-[#ff5722] mt-0.5 shrink-0" />
                        <span className="text-xs sm:text-sm text-slate-800 leading-snug font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Dynamic Stage Preview Block in Day Mode */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 text-slate-900 border border-slate-200 mb-8 shadow-sm">
                  {currentStage.previewType === 'candidate' && (
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between text-slate-600 border-b border-slate-200 pb-2">
                        <span className="flex items-center gap-1.5 text-blue-600 font-bold">
                          <Cpu size={14} /> AI Proctoring Session Active
                        </span>
                        <span className="text-emerald-600 font-bold">Confidence: 98.4%</span>
                      </div>
                      <p className="text-slate-700">
                        <span className="text-[#ff5722] font-bold">&gt;</span> Candidate completed Full-Stack Coding Challenge in 18 mins.
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 text-[11px] font-bold">JavaScript / React</span>
                        <span className="px-2.5 py-1 rounded-md bg-purple-100 text-purple-700 text-[11px] font-bold">KaTeX Rendered</span>
                        <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 text-[11px] font-bold">0 Tab Switches</span>
                      </div>
                    </div>
                  )}

                  {currentStage.previewType === 'recruiter' && (
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between text-slate-600 border-b border-slate-200 pb-2">
                        <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                          <Briefcase size={14} /> Bulk Screener Leaderboard
                        </span>
                        <span className="text-cyan-700 font-bold">45 Resumes Parsed</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 bg-white border border-slate-200 px-3 rounded-lg">
                        <span className="text-slate-900 font-bold">1. Rahul M. (Senior React Dev)</span>
                        <span className="text-emerald-600 font-extrabold">96% Fit &bull; Shortlisted</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 bg-white/70 border border-slate-200 px-3 rounded-lg">
                        <span className="text-slate-700 font-medium">2. Sneha R. (Full-Stack Lead)</span>
                        <span className="text-blue-600 font-bold">91% Fit &bull; WhatsApp Sent</span>
                      </div>
                    </div>
                  )}

                  {currentStage.previewType === 'ai' && (
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between text-slate-600 border-b border-slate-200 pb-2">
                        <span className="flex items-center gap-1.5 text-purple-700 font-bold">
                          <BrainCircuit size={14} /> Multi-Model Workload Router
                        </span>
                        <span className="text-emerald-600 font-bold">All Nodes Healthy</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                          <p className="text-slate-500 font-medium">Question Generation:</p>
                          <p className="text-slate-900 font-bold">nvidia.nemotron-9b</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                          <p className="text-slate-500 font-medium">In-Depth Grading:</p>
                          <p className="text-slate-900 font-bold">nemotron-30b-eval</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStage.previewType === 'report' && (
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between text-slate-600 border-b border-slate-200 pb-2">
                        <span className="flex items-center gap-1.5 text-[#ff5722] font-bold">
                          <BarChart3 size={14} /> 11-Dimensional Soft Skills
                        </span>
                        <span className="text-emerald-600 font-bold">Overall: 9.4/10</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Fluency: 95%</span>
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">Speech Clarity: 98%</span>
                        <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">Confidence: 90%</span>
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">Presence of Mind: 92%</span>
                      </div>
                    </div>
                  )}

                  {currentStage.previewType === 'admin' && (
                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between text-slate-600 border-b border-slate-200 pb-2">
                        <span className="flex items-center gap-1.5 text-cyan-700 font-bold">
                          <ShieldCheck size={14} /> Global Enterprise Governance
                        </span>
                        <span className="text-emerald-600 font-bold">RBAC Active</span>
                      </div>
                      <p className="text-slate-700 font-medium">
                        Admin metrics: 50,000+ candidates processed across India. Firestore rules synchronized.
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom CTA Action Button */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <Link
                    to={currentStage.primaryActionLink}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff5722] hover:bg-[#f4511e] text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-[0_10px_20px_rgba(255,87,34,0.3)] hover:-translate-y-0.5"
                  >
                    <span>{currentStage.primaryActionText}</span>
                    <ArrowRight size={16} />
                  </Link>

                  <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                    No credit card required
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PhenomenonStageSwitcher;
