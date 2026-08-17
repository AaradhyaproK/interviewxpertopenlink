import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  UserCheck, Building2, Sparkles, Video, Mic, FileText, Code2, 
  BrainCircuit, CheckCircle2, ShieldCheck, Share2, UploadCloud, 
  MessageSquareText, Users, ArrowRight, Star, Award, Zap, Layers,
  CheckCircle, FileSearch, Shield, PhoneCall, Sliders
} from 'lucide-react';

export const CandidateRecruiterShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'candidate' | 'recruiter'>('candidate');

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-slate-900/40 dark:bg-black/60 border-y border-slate-200/40 dark:border-white/5">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-4">
            <Sparkles size={14} /> Comprehensive 360° Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">High-Growth Candidates</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400">Enterprise Recruiters</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Switch between modes to discover tailored tools engineered for your success.
          </p>

          {/* Interactive Switcher */}
          <div className="flex justify-center mt-8">
            <div className="bg-slate-100 dark:bg-slate-800/90 p-1.5 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center shadow-lg backdrop-blur-md">
              <button
                onClick={() => setActiveTab('candidate')}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  activeTab === 'candidate'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <UserCheck size={18} /> For Candidates & Job Seekers
              </button>
              <button
                onClick={() => setActiveTab('recruiter')}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  activeTab === 'recruiter'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Building2 size={18} /> For Recruiters & Talent Teams
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'candidate' ? (
            <motion.div
              key="candidate-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {/* Candidate Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Live 1-on-1 AI Simulation */}
                <div className="bg-white/70 dark:bg-[#121216]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:border-blue-500/40 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Video size={24} />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">Live Face & Speech</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Adaptive AI</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">1-on-1 Conversational Interview Simulation</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                      Practice realistic interviews with dynamic follow-up questions tailored to your spoken answers. Computer vision analyzes eye contact, posture, and facial confidence in real-time.
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-black/30 p-3.5 rounded-xl border border-slate-100 dark:border-white/5 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 font-semibold">
                      <span>Live Speech Clarity</span>
                      <span className="text-emerald-500 font-bold">96% (Native Tone)</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[96%]" />
                    </div>
                  </div>
                </div>

                {/* 2. AI Resume Builder & ATS Score */}
                <div className="bg-white/70 dark:bg-[#121216]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:border-purple-500/40 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <FileText size={24} />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400">ATS Keyword Match</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">Instant PDF</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">AI Resume Optimizer & ATS Benchmark</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                      Upload your resume or build one with AI in minutes. Instantly evaluate matching keywords, grammar, metrics quantification, and alignment with target job descriptions.
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-black/30 p-3.5 rounded-xl border border-slate-100 dark:border-white/5 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 font-semibold">
                      <span>ATS Compatibility Rating</span>
                      <span className="text-purple-500 font-bold">94/100 (High Pass)</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full w-[94%]" />
                    </div>
                  </div>
                </div>

                {/* 3. Coding Sandbox & Test Automation */}
                <div className="bg-white/70 dark:bg-[#121216]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:border-cyan-500/40 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Code2 size={24} />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">LeetCode-Grade</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">Multi-Language</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">Technical Coding Challenges & DSA Sandbox</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                      Practice DSA, algorithmic problems, and system design questions. Automated test runners evaluate execution time, edge cases, space/time complexity, and code quality.
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-black/30 p-3.5 rounded-xl border border-slate-100 dark:border-white/5 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 font-semibold">
                      <span>Test Cases Passed</span>
                      <span className="text-cyan-500 font-bold">12 / 12 (100%)</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-cyan-500 h-full w-[100%]" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Candidate Journey Showcase Banner */}
              <div className="bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-purple-900/30 border border-blue-500/20 rounded-3xl p-6 sm:p-10 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-3 inline-block">
                    Free Forever Candidate Access
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                    Start with 5 Free AI Mock Interviews Every Month
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Practice across Software Engineering, Product Management, Data Science, HR, and Sales. Get instant AI grading reports, transcripts, and verified candidate certificate badges.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                  <Link 
                    to="/auth" 
                    className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-sm sm:text-base hover:bg-primary-dark transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                  >
                    <Zap size={18} /> Launch Free Candidate Studio
                  </Link>
                  <Link 
                    to="/career-hub" 
                    className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm sm:text-base border border-white/10 transition flex items-center justify-center gap-2"
                  >
                    Explore Career Hub <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="recruiter-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {/* Recruiter Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* 1. Automated AI Interview Creator */}
                <div className="bg-white/70 dark:bg-[#121216]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:border-emerald-500/40 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <BrainCircuit size={24} />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">JD to Interview</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">Strictness Controls</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">Autonomous AI Interview Creator</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                      Paste your job description and let AI generate tailored question sets (Theory, Coding Sandbox with test cases, or MCQs). Set evaluation strictness and custom constraints in 1 click.
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-black/30 p-3.5 rounded-xl border border-slate-100 dark:border-white/5 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 font-semibold">
                      <span>Setup Time per Campaign</span>
                      <span className="text-emerald-500 font-bold">&lt; 45 Seconds</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[95%]" />
                    </div>
                  </div>
                </div>

                {/* 2. Bulk Resume Screener ("Resume Dump") */}
                <div className="bg-white/70 dark:bg-[#121216]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:border-teal-500/40 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <UploadCloud size={24} />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400">Bulk 500+ Resumes</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400">Ranked Leaderboard</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">Bulk Resume Parser & Match Leaderboard</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                      Drag and drop hundreds of candidate resumes. AI extracts experience, skills, and current compensation, then generates an instant ranked candidate shortlist against the job opening.
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-black/30 p-3.5 rounded-xl border border-slate-100 dark:border-white/5 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 font-semibold">
                      <span>Screening Efficiency Gain</span>
                      <span className="text-teal-500 font-bold">12x Faster Screening</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-teal-500 h-full w-[90%]" />
                    </div>
                  </div>
                </div>

                {/* 3. WhatsApp Workflows & Client Sharing */}
                <div className="bg-white/70 dark:bg-[#121216]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:border-indigo-500/40 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <PhoneCall size={24} />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">WhatsApp Automated</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Passcode Links</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">Automated WhatsApp Invites & Client Portals</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                      Trigger automated WhatsApp candidate interview invites with reminders. Generate client shareable candidate reports with video question privacy toggles and direct client rating cards.
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-black/30 p-3.5 rounded-xl border border-slate-100 dark:border-white/5 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 font-semibold">
                      <span>Candidate Completion Rate</span>
                      <span className="text-indigo-500 font-bold">89% via WhatsApp</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full w-[89%]" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Recruiter Full Feature Breakdown List */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-slate-800 pb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <Layers className="text-emerald-400" /> Enterprise Recruitment Feature Suite
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      Everything required for corporate talent acquisition teams and staffing agencies
                    </p>
                  </div>
                  <Link 
                    to="/auth" 
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                  >
                    Open Recruiter Dashboard <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-emerald-400 font-bold text-sm mb-2 flex items-center gap-2">
                      <CheckCircle size={16} /> Job Pipeline Manager
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Post, pause, and filter active job openings with location presets (Mumbai, Pune, Bengaluru, Remote).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-emerald-400 font-bold text-sm mb-2 flex items-center gap-2">
                      <CheckCircle size={16} /> Custom Assessment Tests
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Timed MCQ tests with custom pass thresholds that trigger automated AI interviews upon passing.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-emerald-400 font-bold text-sm mb-2 flex items-center gap-2">
                      <CheckCircle size={16} /> Team & Audit Logging
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Multi-recruiter teams with parent-child accounts, activity logs, and candidate status tracking.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-emerald-400 font-bold text-sm mb-2 flex items-center gap-2">
                      <CheckCircle size={16} /> AI Video Proctoring
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Tab switch counters, multi-face alerts, and session integrity flags ensure 100% genuine submissions.
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CandidateRecruiterShowcase;
