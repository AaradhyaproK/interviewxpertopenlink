import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, Video, Code, BrainCircuit, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import Navbar from '../components/landing/Navbar';

export const TCSMockInterview: React.FC = () => {
  useEffect(() => {
    document.title = "TCS NQT Mock Interview Online with AI Feedback | InterviewXpert";
    
    const setMetaTag = (attr: 'name' | 'property', value: string, content: string) => {
      let element = document.querySelector(`meta[${attr}='${value}']`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', 'Crack TCS NQT, Digital & Ninja interviews with AI mock interview simulations. Real TCS technical questions, coding challenges & instant performance scoring.');
    setMetaTag('name', 'keywords', 'TCS NQT mock interview, TCS digital interview preparation, TCS ninja mock interview, TCS technical round questions, TCS HR interview practice, online mock interview India');
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
          <Sparkles size={14} /> TCS NQT, Ninja & Digital Prep Track
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
          TCS NQT Mock Interview <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#ff5722]">
            Practice with Real-Time AI Feedback
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Master the Technical, Coding, and MR/HR rounds for TCS Ninja and TCS Digital hiring drives. Experience conversational AI simulations matching official TCS evaluation criteria.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/auth"
            className="px-8 py-4 rounded-full bg-[#ff5722] hover:bg-[#f4511e] text-white font-bold text-base transition-all shadow-lg shadow-orange-500/30 hover:scale-105"
          >
            Start Free TCS Mock Interview
          </Link>
          <Link
            to="/auth"
            className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-base transition-all shadow-sm"
          >
            TCS NQT Coding Round Practice
          </Link>
        </div>

        {/* 3-Pillar TCS Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <Code size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">1. Technical & Coding Round</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Practice core DSA, C/C++/Java/Python fundamentals, DBMS, and OOP concepts with live code execution and KaTeX formulas.
            </p>
            <span className="text-xs font-bold text-blue-600">Includes 50+ TCS Past Questions</span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#ff5722] flex items-center justify-center mb-6">
              <Video size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">2. Live Conversational AI Video Round</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Real-time voice follow-ups on your resume projects, internships, and core competencies with Face-API anti-cheat proctoring.
            </p>
            <span className="text-xs font-bold text-[#ff5722]">Instant 11 Soft Skills Breakdown</span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">3. MR & HR Behavioral Round</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Situational judgment questions, relocation willingness, team conflict scenarios, and TCS leadership culture alignment.
            </p>
            <span className="text-xs font-bold text-emerald-600">Personalized Tone & Fluency Report</span>
          </div>
        </div>
      </section>

      {/* TCS FAQs */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-slate-900 text-center mb-10">TCS Interview Preparation FAQs</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-2">What is the difference between TCS Ninja and TCS Digital interviews?</h3>
              <p className="text-sm text-slate-600">TCS Ninja focuses on foundational programming, basic SQL, and communication. TCS Digital requires advanced Data Structures & Algorithms, System Architecture, and complex problem-solving.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-2">How does InterviewXpert grade my TCS interview performance?</h3>
              <p className="text-sm text-slate-600">Our multi-model AI evaluates technical accuracy, code time complexity, speech fluency, confidence, and facial composure against TCS benchmark rubrics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-500 border-t border-slate-200">
        InterviewXpert &bull; Built by <a href="https://www.snab.co.in" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-700 hover:text-[#ff5722]">SNAB Innovations</a> (Nashik, India)
      </footer>
    </div>
  );
};

export default TCSMockInterview;
