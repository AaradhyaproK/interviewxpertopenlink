import React from 'react';
import { 
  FileWarning, 
  Scale, 
  Clock4, 
  DollarSign, 
  Target, 
  CheckCircle2, 
  ShieldAlert,
  Zap,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const ProblemWeSolve: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-[#F8FAFC] border-t border-[#E2E8F0] transition-colors duration-500">
      
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unified Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-2.5 font-sans">
            The Paradigm
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
            Why traditional recruiting needs automated clarity.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] font-sans font-normal leading-relaxed">
            Unstructured interviews often reward performance over problem-solving. We replace guesswork with transparent, objective practice.
          </p>
        </div>

        {/* 5-Card Analytics Grid with Curated Themed Colors & UI Meters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          
          {/* ========================================================================= */}
          {/* Card 1: Resume Accuracy (Amber / Warning Theme) */}
          {/* ========================================================================= */}
          <div className="bg-white border border-[#E2E8F0] hover:border-amber-300/80 rounded-[24px] p-6 flex flex-col justify-between shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.12)] hover:-translate-y-1 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 shadow-sm group-hover:scale-105 transition-transform">
                    <ShieldAlert size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider block">Verification Gap</span>
                    <h3 className="font-display text-sm sm:text-base font-bold text-[#0F172A]">Resume Claims</h3>
                  </div>
                </div>
                <span className="font-mono text-2xl font-extrabold text-amber-600">78%</span>
              </div>

              <p className="text-[#64748B] text-xs sm:text-sm font-sans leading-relaxed mb-4">
                Resumes contain exaggerated skill claims that break down under deep technical questioning.
              </p>
            </div>

            {/* High-Fidelity UI Meter */}
            <div className="my-2 p-3.5 bg-amber-50/40 rounded-2xl border border-amber-200/60 space-y-2">
              <div className="flex justify-between text-xs font-mono font-semibold">
                <span className="text-[#475569]">Unverified Claims</span>
                <span className="text-amber-700">78% High Risk</span>
              </div>
              <div className="w-full h-2.5 bg-amber-100/80 rounded-full overflow-hidden p-0.5 border border-amber-200/50">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full w-[78%] shadow-sm" />
              </div>
              <div className="flex justify-between text-[10px] text-[#64748B] font-mono">
                <span>0% Baseline</span>
                <span className="text-emerald-700 font-bold">Verified Code: 22%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#E2E8F0] text-xs text-[#475569] font-sans flex items-start gap-2">
              <CheckCircle2 size={14} className="text-amber-600 shrink-0 mt-0.5" />
              <span><strong className="text-[#0F172A]">Solution:</strong> Live code sandbox & adaptive verbal technical reasoning.</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Card 2: First Impression Bias (Purple / Objectivity Theme) */}
          {/* ========================================================================= */}
          <div className="bg-white border border-[#E2E8F0] hover:border-purple-300/80 rounded-[24px] p-6 flex flex-col justify-between shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-[0_20px_40px_-15px_rgba(147,51,234,0.12)] hover:-translate-y-1 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200 shadow-sm group-hover:scale-105 transition-transform">
                    <Scale size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-purple-700 uppercase tracking-wider block">Cognitive Skew</span>
                    <h3 className="font-display text-sm sm:text-base font-bold text-[#0F172A]">First-Impression Bias</h3>
                  </div>
                </div>
                <span className="font-mono text-2xl font-extrabold text-purple-600">54%</span>
              </div>

              <p className="text-[#64748B] text-xs sm:text-sm font-sans leading-relaxed mb-4">
                Hiring decisions are swayed by unconscious human bias within the first 5 minutes of dialogue.
              </p>
            </div>

            {/* High-Fidelity UI Meter */}
            <div className="my-2 p-3.5 bg-purple-50/40 rounded-2xl border border-purple-200/60 space-y-2">
              <div className="flex justify-between text-xs font-mono font-semibold">
                <span className="text-[#475569]">Subjective Bias Impact</span>
                <span className="text-purple-700">54% Skew</span>
              </div>
              <div className="w-full h-2.5 bg-purple-100/80 rounded-full overflow-hidden p-0.5 border border-purple-200/50">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full w-[54%] shadow-sm" />
              </div>
              <div className="flex justify-between text-[10px] text-[#64748B] font-mono">
                <span>0% Bias</span>
                <span className="text-purple-700 font-bold">Standardized Rubric: 100%</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#E2E8F0] text-xs text-[#475569] font-sans flex items-start gap-2">
              <CheckCircle2 size={14} className="text-purple-600 shrink-0 mt-0.5" />
              <span><strong className="text-[#0F172A]">Solution:</strong> Standardized scorecards focusing strictly on technical merit.</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Card 3: Predictive Validity (Emerald / Outcome Theme) */}
          {/* ========================================================================= */}
          <div className="bg-white border border-[#E2E8F0] hover:border-emerald-300/80 rounded-[24px] p-6 flex flex-col justify-between shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.12)] hover:-translate-y-1 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-sm group-hover:scale-105 transition-transform">
                    <Target size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider block">Job Fit Correlation</span>
                    <h3 className="font-display text-sm sm:text-base font-bold text-[#0F172A]">Predictive Validity</h3>
                  </div>
                </div>
                <span className="font-mono text-2xl font-extrabold text-emerald-600">88%</span>
              </div>

              <p className="text-[#64748B] text-xs sm:text-sm font-sans leading-relaxed mb-4">
                Structured rubric-based technical rounds demonstrate superior correlation to on-the-job success.
              </p>
            </div>

            {/* High-Fidelity Comparison Method Bars */}
            <div className="my-2 p-3.5 bg-emerald-50/40 rounded-2xl border border-emerald-200/60 space-y-2.5 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#64748B]">Unstructured Casual Call</span>
                  <span className="text-[#94A3B8] font-bold">14% fit</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full w-[14%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#0F172A] font-bold">Structured Rubric Platform</span>
                  <span className="text-emerald-700 font-bold">88% accuracy</span>
                </div>
                <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden p-0.5">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full w-[88%]" />
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#E2E8F0] text-xs text-[#475569] font-sans flex items-start gap-2">
              <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
              <span><strong className="text-[#0F172A]">Solution:</strong> Uniform industry benchmarks evaluating authentic capability.</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Card 4: Days to Shortlist (Cobalt Blue / Velocity Theme) */}
          {/* ========================================================================= */}
          <div className="bg-white border border-[#E2E8F0] hover:border-blue-300/80 rounded-[24px] p-6 flex flex-col justify-between shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center border border-[#BFDBFE] shadow-sm group-hover:scale-105 transition-transform">
                    <Zap size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#1D4ED8] uppercase tracking-wider block">Cycle Time</span>
                    <h3 className="font-display text-sm sm:text-base font-bold text-[#0F172A]">Days to Shortlist</h3>
                  </div>
                </div>
                <span className="font-mono text-2xl font-extrabold text-[#2563EB]">3 Days</span>
              </div>

              <p className="text-[#64748B] text-xs sm:text-sm font-sans leading-relaxed mb-4">
                Weeks of coordination condensed into a rapid 3-day turnaround with automated rounds.
              </p>
            </div>

            {/* High-Fidelity Time Bars */}
            <div className="my-2 p-3.5 bg-blue-50/40 rounded-2xl border border-[#BFDBFE]/60 space-y-2.5 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#64748B]">Traditional Screening Call</span>
                  <span className="text-[#94A3B8] font-bold">42 Days</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full w-[100%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#0F172A] font-bold">Automated Pipeline</span>
                  <span className="text-[#2563EB] font-bold">3 Days (-93%)</span>
                </div>
                <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden p-0.5">
                  <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] h-full rounded-full w-[12%]" />
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#E2E8F0] text-xs text-[#475569] font-sans flex items-start gap-2">
              <CheckCircle2 size={14} className="text-[#2563EB] shrink-0 mt-0.5" />
              <span><strong className="text-[#0F172A]">Advantage:</strong> Candidates practice on demand. Teams review in minutes.</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Card 5: Cost Efficiency (Teal-Mint / Economic ROI Theme) */}
          {/* ========================================================================= */}
          <div className="bg-white border border-[#E2E8F0] hover:border-emerald-300/80 rounded-[24px] p-6 flex flex-col justify-between shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.12)] hover:-translate-y-1 transition-all duration-300 md:col-span-2 lg:col-span-2 group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 shadow-sm group-hover:scale-105 transition-transform">
                    <DollarSign size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block">Economic Leverage</span>
                    <h3 className="font-display text-sm sm:text-base font-bold text-[#0F172A]">Cost per Qualified Candidate</h3>
                  </div>
                </div>
                <span className="font-mono text-2xl font-extrabold text-emerald-600">-95% Cost</span>
              </div>

              <p className="text-[#64748B] text-xs sm:text-sm font-sans leading-relaxed mb-4">
                Significantly reduce agency placement overhead and internal engineering team hours with automated upfront rounds.
              </p>
            </div>

            {/* High-Fidelity Cost Bars */}
            <div className="my-2 p-4 bg-emerald-50/40 rounded-2xl border border-emerald-200/60 space-y-3 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#64748B]">Traditional Agency & Headhunter Overhead</span>
                  <span className="text-[#64748B] font-bold">$3,500 / candidate</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full w-[100%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#0F172A] font-bold">InterviewXpert Automated Pipeline</span>
                  <span className="text-emerald-700 font-bold">$150 / verified candidate</span>
                </div>
                <div className="w-full h-2.5 bg-emerald-100 rounded-full overflow-hidden p-0.5">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full w-[8%]" />
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#E2E8F0] text-xs text-[#475569] font-sans flex items-start gap-2">
              <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
              <span><strong className="text-[#0F172A]">Transparent Model:</strong> 5 free practice rounds for candidates. Pay-as-you-go verification for hiring teams.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProblemWeSolve;
