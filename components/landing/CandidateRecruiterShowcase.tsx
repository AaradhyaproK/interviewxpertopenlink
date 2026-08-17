import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  UserCheck, Building2, Video, FileText, Code2, 
  ArrowRight, Zap, Check, FileSearch, PhoneCall
} from 'lucide-react';

export const CandidateRecruiterShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'candidate' | 'recruiter'>('candidate');

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-white border-t border-[#E2E8F0] transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unified Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-2.5 font-sans">
            Ecosystem
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
            Built for candidates. Trusted by teams.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] font-sans font-normal leading-relaxed">
            Switch views to discover tools engineered for job seekers and hiring managers.
          </p>

          {/* Segmented Pill Switcher */}
          <div className="flex justify-center mt-6">
            <div className="bg-[#F8FAFC] p-1 rounded-full border border-[#E2E8F0] flex items-center shadow-sm">
              <button
                onClick={() => setActiveTab('candidate')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 font-sans ${
                  activeTab === 'candidate'
                    ? 'bg-white text-[#0F172A] shadow-sm border border-[#E2E8F0]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <UserCheck size={15} className={activeTab === 'candidate' ? 'text-[#2563EB]' : ''} /> For Job Seekers
              </button>
              <button
                onClick={() => setActiveTab('recruiter')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 font-sans ${
                  activeTab === 'recruiter'
                    ? 'bg-white text-[#0F172A] shadow-sm border border-[#E2E8F0]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <Building2 size={15} className={activeTab === 'recruiter' ? 'text-[#2563EB]' : ''} /> For Hiring Teams
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'candidate' ? (
            <motion.div
              key="candidate-panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Candidate Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                
                {/* 1. Conversational Mock Rounds */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[22px] p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-white text-[#2563EB] flex items-center justify-center mb-4 border border-[#E2E8F0] shadow-sm">
                      <Video size={17} />
                    </div>
                    <h3 className="font-display text-base font-bold text-[#0F172A] mb-1.5">Conversational Mock Rounds</h3>
                    <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed mb-5 font-sans">
                      Practice realistic interviews with dynamic follow-ups tailored to your spoken answers. Get instant feedback on clarity and depth.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] space-y-1.5 text-xs">
                    <div className="flex justify-between items-center text-[#0F172A] font-medium font-sans">
                      <span>Speech Fluency</span>
                      <span className="text-[#2563EB] font-bold font-mono">96%</span>
                    </div>
                    <div className="w-full bg-[#F1F3F5] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#2563EB] h-full w-[96%]" />
                    </div>
                  </div>
                </div>

                {/* 2. Resume & ATS Score */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[22px] p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-white text-[#2563EB] flex items-center justify-center mb-4 border border-[#E2E8F0] shadow-sm">
                      <FileText size={17} />
                    </div>
                    <h3 className="font-display text-base font-bold text-[#0F172A] mb-1.5">Resume & ATS Optimizer</h3>
                    <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed mb-5 font-sans">
                      Upload your resume to check keywords, formatting, action-driven bullet points, and alignment with target engineering roles.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] space-y-1.5 text-xs">
                    <div className="flex justify-between items-center text-[#0F172A] font-medium font-sans">
                      <span>ATS Benchmark</span>
                      <span className="text-[#2563EB] font-bold font-mono">94 / 100</span>
                    </div>
                    <div className="w-full bg-[#F1F3F5] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#2563EB] h-full w-[94%]" />
                    </div>
                  </div>
                </div>

                {/* 3. Coding Sandbox */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[22px] p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-white text-[#2563EB] flex items-center justify-center mb-4 border border-[#E2E8F0] shadow-sm">
                      <Code2 size={17} />
                    </div>
                    <h3 className="font-display text-base font-bold text-[#0F172A] mb-1.5">Algorithm & Code Sandbox</h3>
                    <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed mb-5 font-sans">
                      Practice DSA, system design, and algorithmic questions. Automated test runners evaluate runtime, edge cases, and code elegance.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] space-y-1.5 text-xs">
                    <div className="flex justify-between items-center text-[#0F172A] font-medium font-sans">
                      <span>Test Cases Passed</span>
                      <span className="text-[#2563EB] font-bold font-mono">12 / 12 (100%)</span>
                    </div>
                    <div className="w-full bg-[#F1F3F5] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#2563EB] h-full w-[100%]" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Candidate Journey Banner */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[22px] p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_2px_10px_rgba(15,23,42,0.02)]">
                <div className="max-w-xl">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1D4ED8] bg-[#EFF6FF] px-3 py-1 rounded-full border border-[#BFDBFE] mb-2.5 inline-block shadow-sm font-mono">
                    Free Candidate Access
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0F172A] mb-2 tracking-tight">
                    5 Free Complete Practice Sessions Monthly
                  </h3>
                  <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed font-sans font-normal">
                    Practice across Software Engineering, Product, Data Science, and Campus drives. Get instant scorecards, transcripts, and verified completion certificates.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
                  <Link 
                    to="/auth" 
                    className="px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full font-semibold text-xs sm:text-sm transition shadow-[0_4px_14px_rgba(37,99,235,0.25)] flex items-center justify-center gap-1.5 font-sans"
                  >
                    <Zap size={14} /> Start Free
                  </Link>
                  <Link 
                    to="/career-hub" 
                    className="px-5 py-2.5 bg-white hover:bg-[#F8FAFC] text-[#0F172A] rounded-full font-semibold text-xs sm:text-sm border border-[#E2E8F0] transition flex items-center justify-center gap-1.5 font-sans shadow-sm"
                  >
                    Career Hub <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="recruiter-panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Recruiter Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

                {/* 1. Custom Interview Creator */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[22px] p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-white text-[#2563EB] flex items-center justify-center mb-4 border border-[#E2E8F0] shadow-sm">
                      <Check size={17} />
                    </div>
                    <h3 className="font-display text-base font-bold text-[#0F172A] mb-1.5">Interview Rubric Studio</h3>
                    <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed mb-5 font-sans">
                      Build comprehensive technical and behavioral interview rubrics in seconds. Set target skills, difficulty levels, and pass thresholds.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] space-y-1.5 text-xs font-sans">
                    <div className="flex justify-between items-center text-[#0F172A] font-medium">
                      <span>Setup Time</span>
                      <span className="text-[#2563EB] font-bold font-mono">&lt; 1 Minute</span>
                    </div>
                    <div className="w-full bg-[#F1F3F5] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#2563EB] h-full w-full" />
                    </div>
                  </div>
                </div>

                {/* 2. Bulk Resume Screener */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[22px] p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-white text-[#2563EB] flex items-center justify-center mb-4 border border-[#E2E8F0] shadow-sm">
                      <FileSearch size={17} />
                    </div>
                    <h3 className="font-display text-base font-bold text-[#0F172A] mb-1.5">Bulk Resume Ranking</h3>
                    <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed mb-5 font-sans">
                      Upload candidate resumes in batch. Parse skills, extract contact info, and rank profiles objectively by job description fit.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] space-y-1.5 text-xs font-sans">
                    <div className="flex justify-between items-center text-[#0F172A] font-medium">
                      <span>Objective Ranking</span>
                      <span className="text-[#2563EB] font-bold font-mono">100% Merit-Based</span>
                    </div>
                    <div className="w-full bg-[#F1F3F5] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#2563EB] h-full w-[95%]" />
                    </div>
                  </div>
                </div>

                {/* 3. WhatsApp & Email Invites */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[22px] p-5 sm:p-6 shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-white text-[#2563EB] flex items-center justify-center mb-4 border border-[#E2E8F0] shadow-sm">
                      <PhoneCall size={17} />
                    </div>
                    <h3 className="font-display text-base font-bold text-[#0F172A] mb-1.5">WhatsApp & Email Dispatch</h3>
                    <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed mb-5 font-sans">
                      Send direct interview links and 6-digit access codes straight to candidate WhatsApp and emails with 1 click.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#E2E8F0] space-y-1.5 text-xs font-sans">
                    <div className="flex justify-between items-center text-[#0F172A] font-medium">
                      <span>Response Rate</span>
                      <span className="text-[#2563EB] font-bold font-mono">98% on WhatsApp</span>
                    </div>
                    <div className="w-full bg-[#F1F3F5] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#2563EB] h-full w-[98%]" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Recruiter Workspace List */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[22px] p-6 sm:p-8 shadow-[0_2px_10px_rgba(15,23,42,0.02)]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-[#E2E8F0] pb-5">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#0F172A]">
                      Enterprise Recruitment Workspace
                    </h3>
                    <p className="text-[#64748B] text-xs mt-0.5 font-sans">
                      Everything corporate talent acquisition teams and staffing agencies need
                    </p>
                  </div>
                  <Link 
                    to="/auth" 
                    className="px-5 py-2.5 bg-[#0F172A] text-white hover:bg-[#1D4ED8] rounded-full font-semibold text-xs transition flex items-center gap-1.5 font-sans"
                  >
                    Open Portal <ArrowRight size={13} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="p-3.5 rounded-[16px] bg-white border border-[#E2E8F0]">
                    <div className="text-[#0F172A] font-bold text-xs mb-1 flex items-center gap-1.5 font-sans">
                      <Check size={14} className="text-[#2563EB]" /> Pipeline Manager
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                      Track candidates from applied to interviewed with clear status filters.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-[16px] bg-white border border-[#E2E8F0]">
                    <div className="text-[#0F172A] font-bold text-xs mb-1 flex items-center gap-1.5 font-sans">
                      <Check size={14} className="text-[#2563EB]" /> Timed Assessments
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                      Custom aptitude and MCQ assessments with automated round progression.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-[16px] bg-white border border-[#E2E8F0]">
                    <div className="text-[#0F172A] font-bold text-xs mb-1 flex items-center gap-1.5 font-sans">
                      <Check size={14} className="text-[#2563EB]" /> Team Sharing
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                      Share candidate recordings and scorecards with hiring managers securely.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-[16px] bg-white border border-[#E2E8F0]">
                    <div className="text-[#0F172A] font-bold text-xs mb-1 flex items-center gap-1.5 font-sans">
                      <Check size={14} className="text-[#2563EB]" /> Verified Integrity
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed font-sans">
                      Session verification and tab monitoring ensure 100% genuine candidate results.
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
