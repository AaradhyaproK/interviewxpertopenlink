import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, Video, Code, BrainCircuit, ShieldCheck } from 'lucide-react';
import Navbar from '../components/landing/Navbar';

export const WiproMockInterview: React.FC = () => {
  useEffect(() => {
    document.title = "Wipro Elite NTH Mock Interview Online with AI Scoring | InterviewXpert";
    
    const setMetaTag = (attr: 'name' | 'property', value: string, content: string) => {
      let element = document.querySelector(`meta[${attr}='${value}']`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', 'Prepare for Wipro Elite NTH & Turbo hiring drives with live AI mock interviews, coding tests, essay writing checks, and technical evaluation.');
    setMetaTag('name', 'keywords', 'Wipro elite interview practice, Wipro NTH mock interview, Wipro turbo technical interview, Wipro HR interview questions, Wipro coding test practice, online mock interview India');
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 font-sans">
      <Navbar />

      <section className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
          <Sparkles size={14} /> Wipro Elite NTH & Turbo Hiring Track
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Wipro Elite Mock Interview <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Practice with Instant AI Scoring
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Master Wipro National Talent Hunt (NTH) and Turbo recruitment rounds. Complete practice for coding, technical questions, essay writing checks, and HR interviews.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/auth"
            className="px-8 py-4 rounded-full bg-[#ff5722] hover:bg-[#f4511e] text-white font-bold text-base transition-all shadow-lg shadow-orange-500/30 hover:scale-105"
          >
            Start Free Wipro Mock Session
          </Link>
          <Link
            to="/auth"
            className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-base transition-all shadow-sm"
          >
            Wipro Coding Assessment Practice
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
              <Code size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">1. Wipro NTH Coding Round</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Array manipulations, Strings, Pattern problems, and basic algorithms in C, C++, Java, and Python.
            </p>
            <span className="text-xs font-bold text-purple-600">Automated Test Execution</span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <Video size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">2. Technical AI Mock Round</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Core CS subjects: Data Structures, Computer Networks, DBMS SQL queries, and final-year academic project defense.
            </p>
            <span className="text-xs font-bold text-blue-600">Sarvam AI Indian English Voice</span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">3. Wipro HR & Communication</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Evaluate fluency, tone, grammar, confidence, and willingness to work in diverse project teams and rotating shifts.
            </p>
            <span className="text-xs font-bold text-emerald-600">11 Soft Skills Breakdown</span>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-slate-500 border-t border-slate-200">
        InterviewXpert &bull; Built by <a href="https://www.snab.co.in" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-700 hover:text-[#ff5722]">SNAB Innovations</a> (Nashik, India)
      </footer>
    </div>
  );
};

export default WiproMockInterview;
