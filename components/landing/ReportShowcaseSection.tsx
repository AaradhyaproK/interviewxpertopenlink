import React, { useState } from 'react';
import { 
  Check, 
  Download, 
  Share2, 
  Eye, 
  EyeOff, 
  Play, 
  ShieldCheck, 
  Clock, 
  X, 
  Send,
  AlertTriangle,
  Award,
  TrendingUp,
  User,
  Sparkles,
  FileText,
  Video,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const ReportShowcaseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'communication' | 'scores' | 'qa' | 'decision'>('summary');
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [candidateDecision, setCandidateDecision] = useState<'Shortlist' | 'Hold' | 'Reject'>('Shortlist');

  // Dummy Candidate Evaluation Dimensions (11 Soft Skills)
  const communicationDimensions = [
    { name: "Fluency (English / Hindi / Regional)", rating: "Excellent", score: 92, note: "Natural speech flow with strong articulation and zero hesitation." },
    { name: "Clarity of Speech", rating: "Strong", score: 88, note: "Well-structured explanations with logical reasoning progression." },
    { name: "Confidence & Executive Presence", rating: "Excellent", score: 94, note: "Maintained steady poise throughout high-pressure architecture questions." },
    { name: "Grammar & Technical Vocabulary", rating: "Strong", score: 90, note: "Precise terminology (Lua scripting, distributed consensus, CAP theorem)." },
    { name: "Active Listening & Comprehension", rating: "Excellent", score: 95, note: "Quickly grasped edge-case constraints without requiring question repeats." },
    { name: "Professional Demeanor", rating: "Excellent", score: 96, note: "Calm, constructive, and highly respectful interview decorum." },
    { name: "Pronunciation & Neutral Accent", rating: "Neutral", score: 91, note: "Clear, globally intelligible pronunciation." },
    { name: "Ability to Explain Tradeoffs", rating: "Excellent", score: 93, note: "Articulated latency vs consistency tradeoffs clearly in Q3." },
    { name: "Response Speed & Presence of Mind", rating: "Fast", score: 89, note: "Sub-1.2s thinking latency before starting comprehensive answers." },
    { name: "Meeting & Video Etiquette", rating: "Excellent", score: 97, note: "Optimal lighting, eye-contact alignment, and clean background." },
    { name: "Interpersonal & Collaboration Signals", rating: "Strong", score: 90, note: "Highlighted cross-functional coordination with product & DevOps." }
  ];

  // Dummy Question & Answer Insights
  const questionsList = [
    {
      id: "Q1",
      question: "Could you walk us through your experience building high-throughput distributed microservices, particularly handling concurrency and database bottlenecks in your past roles?",
      time: "02:45",
      clientVisible: true,
      topic: "System Architecture",
      score: 94,
      transcript: "In my previous project, we scaled an event-driven payment processing pipeline to 40,000 requests per second. We adopted a partitioned Apache Kafka architecture backed by PostgreSQL with PgBouncer connection pooling. To prevent DB lock contention, we moved high-velocity idempotent balance checks to Redis clusters with Lua scripts before committing ledger state.",
      keyInsight: "Demonstrated strong hands-on understanding of DB connection bottlenecks and Redis Lua atomicity."
    },
    {
      id: "Q2",
      question: "You mentioned winning an 'Engineering Excellence Award' for delivering a zero-downtime database migration ahead of schedule. How did you orchestrate the migration under live production traffic?",
      time: "02:18",
      clientVisible: true,
      topic: "Reliability & Execution",
      score: 96,
      transcript: "We executed a blue-green dual-write migration pattern across 4 phases. First, we configured CDC using Debezium to replicate writes to the new schema asynchronously. Once replication lag was sub-5ms, we enabled shadow read validation to verify data parity before flipping the DNS routing layer with automatic rollback safeguards.",
      keyInsight: "Deep familiarity with CDC pipelines, Debezium, and risk mitigation strategies."
    },
    {
      id: "Q3",
      question: "When designing microservices, how do you handle distributed transactions across independent domain services while ensuring eventual consistency?",
      time: "03:10",
      clientVisible: true,
      topic: "Distributed Transactions",
      score: 91,
      transcript: "Rather than relying on two-phase commit which introduces blocking bottlenecks, we implement the Saga orchestration pattern using Temporal workflows. Each service publishes compensation actions so that if an inventory reservation succeeds but payment processing fails, compensating rollbacks fire reliably.",
      keyInsight: "Excellent command over Saga orchestration vs choreography tradeoffs."
    },
    {
      id: "Q4",
      question: "Describe a scenario where you had to push back on unrealistic feature delivery timelines proposed by product stakeholders without compromising the team's velocity.",
      time: "02:05",
      clientVisible: true,
      topic: "Stakeholder Management",
      score: 88,
      transcript: "We broke down the monolithic scope into an MVP slice delivering 80% of user value in the first sprint, followed by progressive feature rollouts. I presented an engineering burndown forecast showing trade-offs between technical debt and speed, which aligned leadership on a staged launch.",
      keyInsight: "Diplomatic communication, data-driven reasoning, and collaborative solution mindset."
    }
  ];

  return (
    <section id="scorecards" className="py-16 sm:py-24 relative overflow-hidden bg-[#F8FAFC] border-t border-[#E2E8F0] transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unified Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-2.5 font-sans">
            Evaluation Engine
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
            Unbiased, comprehensive candidate scorecards.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] font-sans font-normal leading-relaxed">
            Every candidate session generates deep telemetry covering hiring manager summaries, 11-dimension communication rubrics, synchronized question transcripts, and integrity validation.
          </p>
        </div>

        {/* Tab Navigation Pill Strip with smooth mobile horizontal scroll */}
        <div className="flex items-center sm:justify-center gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap no-scrollbar">
          {[
            { id: 'summary', label: '1. Executive Fit & Evaluation' },
            { id: 'communication', label: '2. 11 Communication Dimensions' },
            { id: 'scores', label: '3. Performance & Integrity' },
            { id: 'qa', label: '4. Q&A Transcripts & Video' },
            { id: 'decision', label: '5. 1-Click Hiring Decision' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`whitespace-nowrap px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all font-sans cursor-pointer flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#0F172A] text-white shadow-md shadow-slate-900/10'
                  : 'bg-white text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* MAIN REPORT CANVAS */}
        {/* ========================================================================= */}
        <div className="rounded-[22px] sm:rounded-[28px] bg-white border border-[#E2E8F0] p-4 sm:p-9 shadow-[0_15px_35px_-10px_rgba(15,23,42,0.06)] relative overflow-hidden">
          
          {/* Top Banner Ribbon: Candidate Information & Overall Metrics */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 pb-6 border-b border-[#E2E8F0]">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#60A5FA] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20 font-mono flex-shrink-0">
                AS
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0F172A]">Aarav Sharma</h3>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border font-mono ${
                    candidateDecision === 'Shortlist'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : candidateDecision === 'Hold'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                    Status: {candidateDecision}
                  </span>
                  <span className="text-xs font-mono text-[#64748B] bg-[#F1F5F9] px-2.5 py-0.5 rounded-md">
                    ID: #XPT-8492
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] font-sans mt-1">
                  Staff Software Engineer Candidate &bull; 7+ Years Experience &bull; Pune, India (Target: Hybrid / Remote)
                </p>
              </div>
            </div>

            {/* Quick Metrics & Actions */}
            <div className="flex items-center gap-3 self-end lg:self-center">
              <div className="text-right hidden sm:block mr-2">
                <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase block">OVERALL SCORE</span>
                <span className="font-display font-bold text-2xl text-[#2563EB]">8.8 <span className="text-xs text-[#94A3B8] font-normal">/ 10</span></span>
              </div>
              <button className="px-4 py-2 rounded-full bg-[#F8FAFC] hover:bg-[#EFF6FF] text-[#0F172A] text-xs font-semibold border border-[#E2E8F0] flex items-center gap-1.5 transition-all shadow-sm">
                <Download size={13} className="text-[#2563EB]" /> PDF Report
              </button>
              <button className="px-4 py-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm shadow-blue-500/20">
                <Share2 size={13} /> Share Link
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: EXECUTIVE SUMMARY & FIT */}
          {/* ========================================================================= */}
          {activeTab === 'summary' && (
            <div className="mt-7 space-y-6">
              
              {/* Profile Criteria Match Verification */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-display font-bold text-sm text-emerald-950">Candidate Profile Criteria Verified</h4>
                  <p className="text-xs sm:text-sm text-emerald-800 font-sans mt-0.5 leading-relaxed">
                    Candidate satisfies target location (Pune / Remote), minimum years of experience (7+ years vs 6 req), and core technical stack requirements (.NET Core, Distributed Systems, SQL, Azure).
                  </p>
                </div>
              </div>

              {/* Hiring Manager Summary */}
              <div className="p-6 rounded-[22px] bg-[#F8FAFC] border border-[#E2E8F0] space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider">
                  <FileText size={14} />
                  <span>Hiring Manager Evaluation Summary</span>
                </div>
                <p className="text-sm sm:text-base text-[#1E293B] font-sans leading-relaxed">
                  "The candidate demonstrated exceptional technical depth across distributed systems and cloud architecture. Communication was crisp, structured, and confident with quick response latency. The candidate excelled in explaining complex database locking mechanisms and asynchronous saga choreography."
                </p>

                {/* Strengths & Growth Areas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-[#E2E8F0]">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-1.5">
                      <Award size={14} className="text-emerald-600" />
                      <span>Key Strengths</span>
                    </div>
                    <ul className="text-xs text-[#334155] space-y-1.5 font-sans">
                      <li>&bull; Deep architectural mastery in Redis Lua scripting & Kafka partitioning.</li>
                      <li>&bull; Track record of delivering zero-downtime database migrations under pressure.</li>
                      <li>&bull; High executive presence and concise, well-structured speech delivery.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E2E8F0]">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] mb-1.5">
                      <TrendingUp size={14} className="text-[#2563EB]" />
                      <span>Recommended Growth Scope</span>
                    </div>
                    <ul className="text-xs text-[#334155] space-y-1.5 font-sans">
                      <li>&bull; Further experience with multi-region Kubernetes service mesh (Istio/Linkerd).</li>
                      <li>&bull; Deeper exposure to FinOps cloud cost optimization strategies at hyperscale.</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: 11 COMMUNICATION DIMENSIONS */}
          {/* ========================================================================= */}
          {activeTab === 'communication' && (
            <div className="mt-7 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
                <div>
                  <h4 className="font-display text-lg font-bold text-[#0F172A]">Spoken Communication & Articulation Rubric</h4>
                  <p className="text-xs text-[#64748B] font-sans">11 dimensions evaluated continuously across tone, pacing, comprehension, and vocabulary.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                    Communication Score: 9.3 / 10 (Top 2%)
                  </span>
                </div>
              </div>

              {/* 11 Dimensions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {communicationDimensions.map((dim, idx) => (
                  <div key={idx} className="p-4 rounded-[20px] bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#BFDBFE] transition-colors flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs sm:text-sm font-semibold text-[#0F172A] font-sans">{dim.name}</span>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-[#E2E8F0] text-[#2563EB]">
                        {dim.rating} &bull; {dim.score}%
                      </span>
                    </div>
                    
                    {/* Score Bar */}
                    <div className="w-full bg-[#E2E8F0] rounded-full h-1.5 mb-2">
                      <div 
                        className="bg-gradient-to-r from-[#2563EB] to-[#38BDF8] h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${dim.score}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-[#64748B] font-sans leading-tight">
                      {dim.note}
                    </p>
                  </div>
                ))}
              </div>

              {/* Spoken Style Analysis Card */}
              <div className="p-5 rounded-2xl bg-[#EFF6FF]/60 border border-[#BFDBFE]">
                <h5 className="text-xs font-mono font-bold text-[#1D4ED8] uppercase tracking-wider mb-1">
                  Synthesized Speech Style Analysis
                </h5>
                <p className="text-xs sm:text-sm text-[#1E293B] font-sans leading-relaxed">
                  The candidate speaks in a calm, confident, and highly authoritative manner. Answers are framed with top-down synthesis: stating the core architectural conclusion first, followed by concrete implementation details and edge-case mitigation strategies.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: PERFORMANCE SCORES & INTEGRITY */}
          {/* ========================================================================= */}
          {activeTab === 'scores' && (
            <div className="mt-7 space-y-6">
              
              {/* 3 Circular Score Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-6 rounded-[24px] bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-4 border-[#2563EB] flex flex-col items-center justify-center mb-3 bg-white shadow-sm">
                    <span className="font-mono text-2xl font-bold text-[#0F172A]">8.9</span>
                    <span className="text-[9px] text-[#64748B] font-mono font-semibold">/ 10</span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-[#0F172A]">Resume & Experience Match</h4>
                  <p className="text-xs text-[#64748B] font-sans mt-0.5">High tech stack relevance in .NET, Cloud & Architecture</p>
                </div>

                <div className="p-6 rounded-[24px] bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center mb-3 bg-white shadow-sm">
                    <span className="font-mono text-2xl font-bold text-[#0F172A]">8.7</span>
                    <span className="text-[9px] text-[#64748B] font-mono font-semibold">/ 10</span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-[#0F172A]">Spoken Q&A Execution</h4>
                  <p className="text-xs text-[#64748B] font-sans mt-0.5">Deep problem structuring & accurate latency calculations</p>
                </div>

                <div className="p-6 rounded-[24px] bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-4 border-[#0F172A] flex flex-col items-center justify-center mb-3 bg-white shadow-sm">
                    <span className="font-mono text-2xl font-bold text-[#0F172A]">8.8</span>
                    <span className="text-[9px] text-[#64748B] font-mono font-semibold">OVERALL</span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-[#0F172A]">Combined Predictive Fit</h4>
                  <p className="text-xs text-[#64748B] font-sans mt-0.5">Top 3% percentile for Staff / Lead Engineering</p>
                </div>
              </div>

              {/* Candidate Details & Session Integrity Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Candidate Particulars */}
                <div className="p-5 rounded-[22px] bg-[#F8FAFC] border border-[#E2E8F0]">
                  <h4 className="font-display text-sm font-bold text-[#0F172A] mb-3 flex items-center gap-2">
                    <User size={15} className="text-[#2563EB]" /> Candidate Particulars
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                    <div>
                      <span className="text-[#64748B] block">Highest Qualification</span>
                      <span className="font-semibold text-[#0F172A]">B.Tech in Computer Science</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] block">Current Location</span>
                      <span className="font-semibold text-[#0F172A]">Pune, Maharashtra</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] block">Total Experience</span>
                      <span className="font-semibold text-[#0F172A]">7.2 Years (Enterprise)</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] block">Notice Period</span>
                      <span className="font-semibold text-[#0F172A]">30 Days (Negotiable)</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E2E8F0]">
                    <span className="text-[11px] font-mono text-[#64748B] block mb-1.5">VERIFIED SKILLS</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['.NET Core', 'Microservices', 'Kafka', 'Redis', 'PostgreSQL', 'Azure AKS', 'Distributed Sagas', 'Unit Testing'].map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-[#E2E8F0] text-[11px] font-mono font-medium text-[#334155]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Session Integrity / Anti-Cheating Telemetry */}
                <div className="p-5 rounded-[22px] bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between">
                  <div>
                    <h4 className="font-display text-sm font-bold text-[#0F172A] mb-3 flex items-center gap-2">
                      <ShieldCheck size={15} className="text-emerald-600" /> Session Integrity & Anti-Cheating
                    </h4>
                    
                    <div className="space-y-2.5 text-xs font-sans">
                      <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between">
                        <span className="text-[#475569]">Tab Switches Detected</span>
                        <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">0 (Clean)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between">
                        <span className="text-[#475569]">Multiple Faces / Secondary Screen</span>
                        <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">None Detected</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-between">
                        <span className="text-[#475569]">AI Audio / Lip-Sync Discrepancy</span>
                        <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">0.02% (Human Verified)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#E2E8F0] text-[11px] font-mono text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 size={13} /> 100% Cryptographically Verified AI Proctored Session
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: Q&A INSIGHTS, VIDEO, & TRANSCRIPTS */}
          {/* ========================================================================= */}
          {activeTab === 'qa' && (
            <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Question Selector List */}
              <div className="lg:col-span-5 space-y-2.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider">QUESTIONS ASKED (4)</span>
                  <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Client Viewable
                  </span>
                </div>

                {questionsList.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuestion(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer font-sans ${
                      selectedQuestion === idx
                        ? 'bg-[#EFF6FF] border-[#2563EB] shadow-sm'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] hover:bg-white hover:border-[#CBD5E1]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-[#2563EB]">{q.id} &bull; {q.topic}</span>
                      <span className="text-[11px] font-mono text-[#64748B]">{q.time}</span>
                    </div>
                    <p className="text-xs text-[#0F172A] font-medium line-clamp-2 leading-snug">
                      {q.question}
                    </p>
                  </button>
                ))}
              </div>

              {/* Right Column: Active Question Transcript & Video Preview */}
              <div className="lg:col-span-7 flex flex-col justify-between p-6 rounded-[24px] bg-[#F8FAFC] border border-[#E2E8F0] space-y-5">
                
                {/* Full Question Text */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#2563EB] uppercase">
                      {questionsList[selectedQuestion].id} Deep Dive
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600 bg-white px-2.5 py-0.5 rounded-full border border-[#E2E8F0]">
                      Score: {questionsList[selectedQuestion].score}%
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[#0F172A] leading-snug">
                    "{questionsList[selectedQuestion].question}"
                  </h4>
                </div>

                {/* Candidate Video & Audio Simulation Window */}
                <div className="rounded-2xl bg-[#0F172A] aspect-video sm:h-44 relative flex items-center justify-center overflow-hidden shadow-inner group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                  
                  {/* Play Button Trigger */}
                  <button 
                    onClick={() => setIsVideoModalOpen(true)}
                    className="w-12 h-12 rounded-full bg-white/20 group-hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white cursor-pointer shadow-lg transition-transform group-hover:scale-110 z-10"
                  >
                    <Play size={20} className="ml-0.5 fill-white" />
                  </button>

                  {/* Badges Over Video */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white z-10 font-mono">
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Candidate Video Recorded
                    </span>
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px]">
                      {questionsList[selectedQuestion].time}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 z-10 text-[11px] text-white/80 font-sans">
                    🔍 Click to Watch Full Screen Video
                  </div>
                </div>

                {/* Candidate Transcript Answer */}
                <div className="p-4 rounded-xl bg-white border border-[#E2E8F0]">
                  <span className="text-[11px] font-mono font-bold text-[#64748B] uppercase block mb-1">
                    SYNCHRONIZED AI TRANSCRIPT
                  </span>
                  <p className="text-xs sm:text-sm text-[#1E293B] font-sans leading-relaxed">
                    "{questionsList[selectedQuestion].transcript}"
                  </p>
                  
                  <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] text-xs text-[#2563EB] font-sans font-medium flex items-center gap-1.5">
                    <Check size={13} />
                    <span><strong>AI Evaluation:</strong> {questionsList[selectedQuestion].keyInsight}</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: 1-CLICK HIRING DECISION & TEAM WORKFLOW */}
          {/* ========================================================================= */}
          {activeTab === 'decision' && (
            <div className="mt-7 p-6 sm:p-8 rounded-[24px] bg-[#F8FAFC] border border-[#E2E8F0] space-y-6">
              <div>
                <h4 className="font-display text-base sm:text-lg font-bold text-[#0F172A]">
                  1-Click Recruiter Decision & Automated Dispatch
                </h4>
                <p className="text-xs sm:text-sm text-[#64748B] font-sans mt-0.5">
                  Selecting a decision updates ATS candidate records and can optionally trigger automated WhatsApp / Email candidate communication.
                </p>
              </div>

              {/* 4 Action Decision Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <button
                  onClick={() => setCandidateDecision('Shortlist')}
                  className={`p-3.5 rounded-2xl font-semibold text-sm transition-all border flex items-center justify-center gap-2 cursor-pointer font-sans ${
                    candidateDecision === 'Shortlist'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                      : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:bg-[#EFF6FF]'
                  }`}
                >
                  <CheckCircle2 size={16} /> Shortlist for Onsite Round
                </button>

                <button
                  onClick={() => setCandidateDecision('Hold')}
                  className={`p-3.5 rounded-2xl font-semibold text-sm transition-all border flex items-center justify-center gap-2 cursor-pointer font-sans ${
                    candidateDecision === 'Hold'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20'
                      : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:bg-[#EFF6FF]'
                  }`}
                >
                  <Clock size={16} /> Move to Candidate Pipeline Pool
                </button>

                <button
                  onClick={() => setCandidateDecision('Reject')}
                  className={`p-3.5 rounded-2xl font-semibold text-sm transition-all border flex items-center justify-center gap-2 cursor-pointer font-sans ${
                    candidateDecision === 'Reject'
                      ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20'
                      : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:bg-[#EFF6FF]'
                  }`}
                >
                  <XCircle size={16} /> Archive & Send Gentle Feedback
                </button>
              </div>

              {/* Integration Webhook Preview */}
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <span className="text-[#475569] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  ATS Webhook: Greenhouse &bull; Lever &bull; Workday Ready
                </span>
                <span className="text-[#2563EB] font-bold">Auto-Sync Enabled</span>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Video Modal Preview */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#0F172A]/70 backdrop-blur-md" onClick={() => setIsVideoModalOpen(false)} />
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-[28px] overflow-hidden shadow-2xl border border-white/20">
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close video"
            >
              <X size={20} />
            </button>
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/9UhI3l23OLg?si=b5KLgy1KogAWePx8&autoplay=1" 
              title="Candidate Interview Recording" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ReportShowcaseSection;
