import React, { useState } from 'react';
import { 
  DollarSign, Sparkles, 
  Calculator, Check, ArrowRight, Zap, Building, GraduationCap 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const BusinessModelCalculator: React.FC = () => {
  const [candidateCount, setCandidateCount] = useState<number>(50);
  const [traditionalHoursPerCandidate, setTraditionalHoursPerCandidate] = useState<number>(3);
  const [recruiterHourlyCost, setRecruiterHourlyCost] = useState<number>(1200); // INR

  // Calculations
  const traditionalCost = candidateCount * traditionalHoursPerCandidate * recruiterHourlyCost;
  const traditionalHours = candidateCount * traditionalHoursPerCandidate;

  // Platform cost: ~₹49 per comprehensive session
  const platformCostPerInterview = 49;
  const platformTotalCost = candidateCount * platformCostPerInterview;
  const platformHours = Math.round(candidateCount * 0.2); // ~12 mins per candidate for decision review

  const costSavings = Math.max(0, traditionalCost - platformTotalCost);
  const timeSavings = Math.max(0, traditionalHours - platformHours);
  const roiPercentage = Math.round((costSavings / (platformTotalCost || 1)) * 100);

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-[#F8FAFC] border-b border-[#E2E8F0] transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unified Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-2.5 font-sans">
            Economics & ROI
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
            Transparent pricing. Zero locked subscriptions.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] font-sans font-normal leading-relaxed">
            Job seekers get 5 free full practice rounds monthly. Hiring teams pay only for the sessions they review.
          </p>
        </div>

        {/* 3 Scandinavian Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          
          {/* Card 1: Pay As You Go */}
          <div className="bg-white p-7 rounded-[24px] border border-[#E2E8F0] shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mb-5 font-bold border border-[#BFDBFE]">
                <Zap size={18} />
              </div>
              <h3 className="font-display text-base font-bold text-[#0F172A] mb-1.5">Pay-As-You-Go Wallet</h3>
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed mb-4 font-sans">
                5 free sessions every month for all job seekers. Top up wallet points on-demand without recurring seat commitments.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-[#0F172A] font-medium pt-3 border-t border-[#E2E8F0] font-sans">
              <li className="flex items-center gap-2 text-[#2563EB]">
                <Check size={14} /> ₹0 Upfront onboarding fee
              </li>
              <li className="flex items-center gap-2 text-[#2563EB]">
                <Check size={14} /> Unused points never expire
              </li>
            </ul>
          </div>

          {/* Card 2: Campus & Cohorts */}
          <div className="bg-white p-7 rounded-[24px] border border-[#E2E8F0] shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] flex items-center justify-center mb-5 font-bold">
                <GraduationCap size={18} />
              </div>
              <h3 className="font-display text-base font-bold text-[#0F172A] mb-1.5">Campus & Placement Cohorts</h3>
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed mb-4 font-sans">
                Deploy customized placement training portals for engineering colleges and training academies with batch analytics.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-[#0F172A] font-medium pt-3 border-t border-[#E2E8F0] font-sans">
              <li className="flex items-center gap-2 text-[#2563EB]">
                <Check size={14} /> Batch student performance tracking
              </li>
              <li className="flex items-center gap-2 text-[#2563EB]">
                <Check size={14} /> Custom university tracks
              </li>
            </ul>
          </div>

          {/* Card 3: Hiring Teams */}
          <div className="bg-white p-7 rounded-[24px] border border-[#E2E8F0] shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mb-5 font-bold border border-[#BFDBFE]">
                <Building size={18} />
              </div>
              <h3 className="font-display text-base font-bold text-[#0F172A] mb-1.5">Corporate & Agency Teams</h3>
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed mb-4 font-sans">
                Share verified interview recordings and scorecards with hiring managers via passcode-protected private links.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-[#0F172A] font-medium pt-3 border-t border-[#E2E8F0] font-sans">
              <li className="flex items-center gap-2 text-[#2563EB]">
                <Check size={14} /> Client feedback & decision forms
              </li>
              <li className="flex items-center gap-2 text-[#2563EB]">
                <Check size={14} /> Selective question hiding
              </li>
            </ul>
          </div>

        </div>

        {/* Interactive Calculator Card */}
        <div className="bg-white rounded-[26px] p-7 sm:p-9 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] border border-[#E2E8F0]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1D4ED8] bg-[#EFF6FF] px-3 py-1 rounded-full mb-2 inline-block font-mono border border-[#BFDBFE]">
                Interactive Calculator
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2">
                <Calculator className="text-[#2563EB]" size={20} /> Calculate Your Recruitment Savings
              </h3>
              <p className="text-[#64748B] text-xs sm:text-sm mt-0.5 font-sans font-normal">
                See how much time and budget your team saves with automated structured rounds.
              </p>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-5 py-3 rounded-2xl text-center">
              <p className="text-[10px] text-[#64748B] font-semibold uppercase tracking-wider font-mono">Estimated Return</p>
              <p className="font-mono text-2xl font-bold text-[#2563EB]">+{roiPercentage.toLocaleString()}% ROI</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-7 items-center">
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-[#0F172A] mb-2 font-sans">
                  <span className="text-[#64748B]">Candidates Evaluated per Month:</span>
                  <span className="text-[#2563EB] font-bold font-mono">{candidateCount} Candidates</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="500" 
                  step="5"
                  value={candidateCount}
                  onChange={(e) => setCandidateCount(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-[#0F172A] mb-2 font-sans">
                  <span className="text-[#64748B]">Traditional Screening Hours per Candidate:</span>
                  <span className="text-[#2563EB] font-bold font-mono">{traditionalHoursPerCandidate} Hours</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="6" 
                  step="0.5"
                  value={traditionalHoursPerCandidate}
                  onChange={(e) => setTraditionalHoursPerCandidate(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-[#0F172A] mb-2 font-sans">
                  <span className="text-[#64748B]">Average Hourly Rate for Tech Lead / Recruiter:</span>
                  <span className="text-[#2563EB] font-bold font-mono">₹{recruiterHourlyCost.toLocaleString()} / hr</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="3000" 
                  step="100"
                  value={recruiterHourlyCost}
                  onChange={(e) => setRecruiterHourlyCost(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                />
              </div>
            </div>

            {/* Live Metrics Output */}
            <div className="lg:col-span-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 space-y-3.5">
              <div className="flex justify-between items-center p-3 bg-white border border-[#E2E8F0] rounded-xl font-mono">
                <span className="text-xs text-[#64748B] font-medium flex items-center gap-1.5">
                  <DollarSign size={13} className="text-[#94A3B8]" /> Traditional Cost:
                </span>
                <span className="text-sm font-bold text-[#0F172A]">₹{traditionalCost.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-white border border-[#2563EB]/40 rounded-xl font-mono">
                <span className="text-xs text-[#2563EB] font-medium flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#2563EB]" /> Platform Cost:
                </span>
                <span className="text-sm font-bold text-[#2563EB]">₹{platformTotalCost.toLocaleString()}</span>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0] flex justify-between items-center font-mono">
                <div>
                  <p className="text-[10px] text-[#64748B] font-semibold uppercase">Monthly Savings</p>
                  <p className="text-xl font-bold text-[#2563EB]">₹{costSavings.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#64748B] font-semibold uppercase">Hours Reclaimed</p>
                  <p className="text-xl font-bold text-[#0F172A]">{timeSavings} hrs</p>
                </div>
              </div>

              <Link
                to="/auth"
                className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-full transition flex items-center justify-center gap-1.5 text-xs shadow-[0_4px_14px_rgba(37,99,235,0.25)] font-sans"
              >
                Start Hiring with InterviewXpert <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BusinessModelCalculator;
