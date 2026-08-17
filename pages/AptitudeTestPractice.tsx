import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BrainCircuit, CheckCircle2, Clock, Award, BarChart3 } from 'lucide-react';
import Navbar from '../components/landing/Navbar';

export const AptitudeTestPractice: React.FC = () => {
  useEffect(() => {
    document.title = "Aptitude Test Practice Online Free with AI Scoring | InterviewXpert";
    
    const setMetaTag = (attr: 'name' | 'property', value: string, content: string) => {
      let element = document.querySelector(`meta[${attr}='${value}']`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', 'Free quantitative aptitude, logical reasoning, and verbal ability tests with instant scoring and detailed explanations for campus placements.');
    setMetaTag('name', 'keywords', 'aptitude test practice online India, quantitative aptitude mock test, logical reasoning test for placements, verbal ability practice, free aptitude test');
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 font-sans">
      <Navbar />

      <section className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
          <Sparkles size={14} /> Comprehensive Aptitude & Reasoning Track
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Aptitude Test Practice Online <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-[#ff5722]">
            For Campus Placements & Tech Drives
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Prepare for Quantitative Aptitude, Logical Reasoning, and Verbal Ability tests. Instant scoring, step-by-step mathematical explanations, and time-management analytics.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/auth"
            className="px-8 py-4 rounded-full bg-[#ff5722] hover:bg-[#f4511e] text-white font-bold text-base transition-all shadow-lg shadow-orange-500/30 hover:scale-105"
          >
            Start Free Aptitude Mock Test
          </Link>
          <Link
            to="/auth"
            className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-base transition-all shadow-sm"
          >
            Explore Category Question Banks
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
              <BrainCircuit size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">1. Quantitative Aptitude</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Time & Work, Speed Distance & Time, Profit & Loss, Percentages, Permutations, and Probability with formula hints.
            </p>
            <span className="text-xs font-bold text-amber-600">500+ Quantitative Problems</span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">2. Logical Reasoning</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Seating Arrangements, Syllogisms, Blood Relations, Coding-Decoding, and Data Sufficiency with timed constraints.
            </p>
            <span className="text-xs font-bold text-blue-600">Pattern Recognition & Logic</span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">3. Verbal Ability & Reading</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Reading Comprehension passages, Sentence Correction, Para Jumbles, and Vocabulary checks.
            </p>
            <span className="text-xs font-bold text-emerald-600">Detailed Performance Analytics</span>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-slate-500 border-t border-slate-200">
        InterviewXpert &bull; Built by <a href="https://www.snab.co.in" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-700 hover:text-[#ff5722]">SNAB Innovations</a> (Nashik, India)
      </footer>
    </div>
  );
};

export default AptitudeTestPractice;
