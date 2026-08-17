import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, TrendingUp, Clock, Users, ShieldCheck, Sparkles, 
  Calculator, CheckCircle2, ArrowRight, Zap, Building, GraduationCap 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const BusinessModelCalculator: React.FC = () => {
  const [candidateCount, setCandidateCount] = useState<number>(50);
  const [traditionalHoursPerCandidate, setTraditionalHoursPerCandidate] = useState<number>(3);
  const [recruiterHourlyCost, setRecruiterHourlyCost] = useState<number>(1200); // INR

  // Calculations
  const traditionalCost = candidateCount * traditionalHoursPerCandidate * recruiterHourlyCost;
  const traditionalHours = candidateCount * traditionalHoursPerCandidate;

  // AI Platform with pay-as-you-go GPU credits: ~10 pts per interview (~₹49)
  const aiCostPerInterview = 49;
  const aiTotalCost = candidateCount * aiCostPerInterview;
  const aiHours = Math.round(candidateCount * 0.15); // ~10 mins per candidate for decision

  const costSavings = Math.max(0, traditionalCost - aiTotalCost);
  const timeSavings = Math.max(0, traditionalHours - aiHours);
  const roiPercentage = Math.round((costSavings / (aiTotalCost || 1)) * 100);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-white/50 dark:bg-[#070709] border-b border-slate-200/50 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest mb-4">
            <TrendingUp size={14} /> High-Yield Business Model & ROI
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Transparent Pricing with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400">90%+ Cost Reduction</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Pay only for the AI inference you use. No lock-in subscriptions. Calculate your instant recruitment savings below.
          </p>
        </div>

        {/* Business Model Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Pay As You Go */}
          <div className="bg-white dark:bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 font-bold text-xl">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Micro-Wallet Credits</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
              Candidates get 5 free mock interviews every month. Recruiters top up wallets on-demand without hefty recurring seat fees.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={14} /> ₹0 Upfront onboarding fee
              </li>
              <li className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={14} /> Credits never expire
              </li>
            </ul>
          </div>

          {/* Card 2: Campus & University Licensing */}
          <div className="bg-white dark:bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5 font-bold text-xl">
              <GraduationCap size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Campus & Cohort Batches</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
              Deploy customized bulk placement prep portals for engineering colleges and training academies with centralized student scoreboards.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <CheckCircle2 size={14} /> Batch student analytics
              </li>
              <li className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                <CheckCircle2 size={14} /> Custom university branding
              </li>
            </ul>
          </div>

          {/* Card 3: Enterprise Agency SLA */}
          <div className="bg-white dark:bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 font-bold text-xl">
              <Building size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Staffing Agency Multi-Tenant</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
              Share verified candidate interview video recordings with hiring clients via passcode-protected external links with client approval forms.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={14} /> Client feedback capture
              </li>
              <li className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={14} /> Selective question hiding
              </li>
            </ul>
          </div>

        </div>

        {/* Interactive Savings & ROI Calculator */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2 inline-block">
                Interactive ROI Tool
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3">
                <Calculator className="text-emerald-400" /> Calculate Your Recruitment Savings
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                See how much time and budget your hiring team saves with automated AI rounds.
              </p>
            </div>
            <div className="bg-emerald-500/20 border border-emerald-500/30 px-5 py-3 rounded-2xl text-center">
              <p className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">Estimated Return on Investment</p>
              <p className="text-3xl font-black text-emerald-400">+{roiPercentage.toLocaleString()}% ROI</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
            {/* Sliders (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center text-sm font-semibold mb-2">
                  <span className="text-slate-300">Candidates Interviewed per Month:</span>
                  <span className="text-emerald-400 font-bold text-base">{candidateCount} Candidates</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="500" 
                  step="5"
                  value={candidateCount}
                  onChange={(e) => setCandidateCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm font-semibold mb-2">
                  <span className="text-slate-300">Traditional Interview & Screening Time / Candidate:</span>
                  <span className="text-emerald-400 font-bold text-base">{traditionalHoursPerCandidate} Hours</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="6" 
                  step="0.5"
                  value={traditionalHoursPerCandidate}
                  onChange={(e) => setTraditionalHoursPerCandidate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-sm font-semibold mb-2">
                  <span className="text-slate-300">Average Recruiter / Tech Lead Hourly Rate:</span>
                  <span className="text-emerald-400 font-bold text-base">₹{recruiterHourlyCost.toLocaleString()} / hr</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="3000" 
                  step="100"
                  value={recruiterHourlyCost}
                  onChange={(e) => setRecruiterHourlyCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>

            {/* Live Metrics Output (5 cols) */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center p-3 bg-black/40 rounded-xl">
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                  <DollarSign size={14} className="text-red-400" /> Traditional Screening Cost:
                </span>
                <span className="text-sm font-bold text-red-400">₹{traditionalCost.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <span className="text-xs text-emerald-300 font-medium flex items-center gap-1.5">
                  <Sparkles size={14} className="text-emerald-400" /> InterviewXpert AI Cost:
                </span>
                <span className="text-sm font-bold text-emerald-400">₹{aiTotalCost.toLocaleString()}</span>
              </div>

              <div className="pt-2 border-t border-slate-700 flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Total Monthly Savings</p>
                  <p className="text-2xl font-black text-emerald-400">₹{costSavings.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-semibold uppercase">Hours Reclaimed</p>
                  <p className="text-2xl font-black text-cyan-400">{timeSavings} hrs</p>
                </div>
              </div>

              <Link
                to="/auth"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-500/30"
              >
                Start Hiring with AI <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BusinessModelCalculator;
