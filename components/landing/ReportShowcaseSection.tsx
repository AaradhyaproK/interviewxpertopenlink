import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  Download, 
  Share2, 
  Eye, 
  EyeOff, 
  Play, 
  ShieldCheck, 
  Award, 
  Send, 
  Clock 
} from 'lucide-react';

export const ReportShowcaseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'softskills' | 'scores' | 'video' | 'decision'>('softskills');
  const [isVideoHidden, setIsVideoHidden] = useState<boolean>(false);
  const [candidateStatus, setCandidateStatus] = useState<'Shortlist' | 'Hold' | 'Reject' | 'Completed'>('Shortlist');

  const softSkills = [
    { name: "1. Fluency (English / Hindi / Marathi)", score: 94, level: "Excellent" },
    { name: "2. Clarity of Speech", score: 92, level: "Excellent" },
    { name: "3. Confidence Level", score: 88, level: "High" },
    { name: "4. Grammar & Vocabulary", score: 90, level: "Strong" },
    { name: "5. Listening Skills", score: 95, level: "Exceptional" },
    { name: "6. Professional Tone", score: 91, level: "Polished" },
    { name: "7. Pronunciation & Accent Neutrality", score: 89, level: "Neutral" },
    { name: "8. Ability to Explain Experience", score: 93, level: "Articulate" },
    { name: "9. Presence of Mind & Response Speed", score: 87, level: "Quick" },
    { name: "10. Telephone & Video Etiquette", score: 96, level: "Flawless" },
    { name: "11. Interpersonal Skills", score: 90, level: "Strong" }
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-slate-50 border-t border-slate-200">
      {/* Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold uppercase tracking-widest text-[#ff5722] mb-4 shadow-sm">
            <Award size={14} /> Comprehensive Scorecard & Analytics
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Industry-Leading Candidate <br className="hidden sm:inline" />
            Performance & Video Reports
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Engineered to Turing and HireVue standards. Evaluate technical mastery, 11 soft skill dimensions, video playback with synchronized transcripts, and 1-click recruiter decision workflows.
          </p>
        </div>

        {/* Tab Controls in Day Mode */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {[
            { id: 'softskills', label: '11 Soft Skill Dimensions' },
            { id: 'scores', label: 'Radial Score Badges & Radar' },
            { id: 'video', label: 'Video & STT Transcripts' },
            { id: 'decision', label: 'Recruiter Decision Bar & Client Links' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all border ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Report Preview Box in Day Mode */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl relative overflow-hidden">
          
          {/* Candidate Report Header Ribbon */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                RP
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-lg sm:text-2xl font-bold text-slate-900">Rahul Pathak</h3>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    candidateStatus === 'Shortlist'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : candidateStatus === 'Hold'
                      ? 'bg-amber-50 text-amber-700 border-amber-300'
                      : 'bg-red-50 text-red-700 border-red-300'
                  }`}>
                    Status: {candidateStatus}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Senior Full-Stack Engineer &bull; Notice: 15 Days &bull; Exp: 4.5 Yrs &bull; Mumbai, India
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-1.5 transition-all">
                <Download size={14} /> Download jsPDF
              </button>
              <button className="px-3.5 py-2 rounded-xl bg-[#ff5722]/10 hover:bg-[#ff5722]/20 text-[#ff5722] text-xs font-bold border border-[#ff5722]/30 flex items-center gap-1.5 transition-all">
                <Share2 size={14} /> Client Share URL
              </button>
            </div>
          </div>

          {/* TAB 1: 11 Soft Skills Breakdown */}
          {activeTab === 'softskills' && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">11 Multi-Dimensional Soft Skills Evaluation</h4>
                  <p className="text-xs text-slate-500 font-medium">Audited via Sarvam AI speech synthesis & NLP semantic parser</p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold">
                  Overall Soft Skill: 92.2% (Tier A+)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {softSkills.map((skill, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-700 font-bold">{skill.name}</span>
                      <span className="text-slate-900 font-black font-mono">{skill.score}% ({skill.level})</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Radial Scores & Radar Matrix */}
          {activeTab === 'scores' && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
                <div className="w-28 h-28 rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center mb-3 shadow-md">
                  <span className="text-3xl font-black text-slate-900">9.4</span>
                  <span className="text-[10px] text-slate-500 font-bold">OUT OF 10</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">Overall Candidate Score</h4>
                <p className="text-xs text-slate-500 mt-1">Weighted average across code, voice, and resume</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
                <div className="w-28 h-28 rounded-full border-4 border-blue-500 flex flex-col items-center justify-center mb-3 shadow-md">
                  <span className="text-3xl font-black text-slate-900">96%</span>
                  <span className="text-[10px] text-slate-500 font-bold">ATS MATCH</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">Resume to Job Fit</h4>
                <p className="text-xs text-slate-500 mt-1">React, Node.js, TypeScript, PostgreSQL aligned</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
                <div className="w-28 h-28 rounded-full border-4 border-purple-500 flex flex-col items-center justify-center mb-3 shadow-md">
                  <span className="text-3xl font-black text-slate-900">92%</span>
                  <span className="text-[10px] text-slate-500 font-bold">Q&A TECHNICAL</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">Technical Problem Solving</h4>
                <p className="text-xs text-slate-500 mt-1">Algorithm efficiency & system scalability</p>
              </div>
            </div>
          )}

          {/* TAB 3: Video & STT Transcripts in Day Mode */}
          {activeTab === 'video' && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden relative aspect-video flex items-center justify-center shadow-md">
                {isVideoHidden ? (
                  <div className="text-center p-6 text-slate-400">
                    <EyeOff size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-xs font-semibold">Video hidden for client preview.</p>
                  </div>
                ) : (
                  <div className="relative w-full h-full bg-slate-900 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white cursor-pointer shadow-xl transition-transform hover:scale-110">
                      <Play size={24} className="ml-1" />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md">
                      <span>Q2: System Architecture for WebSockets</span>
                      <span className="font-mono">01:45 / 03:00</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-6 flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-blue-700 font-mono">
                      Turn-by-Turn Speech-to-Text Diarization
                    </span>
                    <button
                      onClick={() => setIsVideoHidden(!isVideoHidden)}
                      className="text-xs text-slate-700 hover:text-slate-900 flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-semibold shadow-sm"
                    >
                      {isVideoHidden ? <Eye size={12} /> : <EyeOff size={12} />}
                      <span>{isVideoHidden ? 'Show Video' : 'Hide from Client'}</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <strong>Candidate Answer:</strong> "To handle 100K concurrent WebSockets, I would deploy a Redis Pub/Sub cluster behind horizontally scaled Node.js gateway nodes, storing sticky session states in Redis memory..."
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold">
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck size={14} /> Proctoring: 0 Tab Switches
                  </span>
                  <span className="text-slate-500">Confidence: 99.1%</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Recruiter Decision Bar */}
          {activeTab === 'decision' && (
            <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-base font-bold text-slate-900 mb-2">1-Click Recruiter Decision & Action Bar</h4>
              <p className="text-xs text-slate-500 mb-6 font-medium">
                Clicking instantly updates Firestore database records and triggers automated candidate communication via Brevo Email and WhatsApp.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => setCandidateStatus('Shortlist')}
                  className={`p-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all border flex items-center justify-center gap-2 ${
                    candidateStatus === 'Shortlist'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  <CheckCircle2 size={16} /> Shortlist Candidate
                </button>

                <button
                  onClick={() => setCandidateStatus('Hold')}
                  className={`p-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all border flex items-center justify-center gap-2 ${
                    candidateStatus === 'Hold'
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md'
                      : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  <Clock size={16} /> Put on Hold
                </button>

                <button
                  onClick={() => setCandidateStatus('Reject')}
                  className={`p-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all border flex items-center justify-center gap-2 ${
                    candidateStatus === 'Reject'
                      ? 'bg-red-600 text-white border-red-700 shadow-md'
                      : 'bg-red-50 text-red-800 border-red-200 hover:bg-red-100'
                  }`}
                >
                  <XCircle size={16} /> Reject Candidate
                </button>

                <button
                  className="p-3.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all border border-emerald-500 flex items-center justify-center gap-2 shadow-md"
                >
                  <Send size={16} /> Send WhatsApp Link
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default ReportShowcaseSection;
