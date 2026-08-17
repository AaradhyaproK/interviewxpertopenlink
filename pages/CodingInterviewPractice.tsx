import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Code, Cpu, ShieldCheck, CheckCircle2, Play, Terminal } from 'lucide-react';
import Navbar from '../components/landing/Navbar';

export const CodingInterviewPractice: React.FC = () => {
  useEffect(() => {
    document.title = "Coding Interview Practice with AI Feedback & Test Sandbox | InterviewXpert";
    
    const setMetaTag = (attr: 'name' | 'property', value: string, content: string) => {
      let element = document.querySelector(`meta[${attr}='${value}']`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', 'Practice live coding challenges with instant AI feedback, automated test cases, and time/space complexity analysis in JavaScript, Python, C++, and Java.');
    setMetaTag('name', 'keywords', 'coding interview practice with AI feedback, technical coding sandbox, DSA practice online India, LeetCode mock interview, code complexity analyzer');
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 font-sans">
      <Navbar />

      <section className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
          <Sparkles size={14} /> AI Technical IDE & Coding Sandbox
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Coding Interview Practice <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
            With Instant AI Execution Feedback
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Master Data Structures & Algorithms with real-time test runners, KaTeX mathematical formula rendering, edge case detection, and Big-O complexity audits.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/auth"
            className="px-8 py-4 rounded-full bg-[#ff5722] hover:bg-[#f4511e] text-white font-bold text-base transition-all shadow-lg shadow-orange-500/30 hover:scale-105"
          >
            Launch Free Coding Sandbox
          </Link>
          <Link
            to="/auth"
            className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-base transition-all shadow-sm"
          >
            Browse 200+ DSA Problems
          </Link>
        </div>

        {/* Coding Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6">
              <Terminal size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">1. Multi-Language Execution</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Write and execute code in JavaScript, TypeScript, Python 3, C++, and Java with sub-millisecond automated test validation.
            </p>
            <span className="text-xs font-bold text-cyan-600">Syntax Highlighted Monaco Editor</span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">2. AI Complexity & Bug Audit</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Instant analysis of Time & Space complexity $O(n \log n)$, memory leaks, and unhandled boundary edge cases.
            </p>
            <span className="text-xs font-bold text-blue-600">KaTeX Mathematical LaTeX Support</span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">3. Proctored Coding Rounds</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Face-API facial verification, tab switch limits, and full-screen enforcement for genuine technical screening.
            </p>
            <span className="text-xs font-bold text-emerald-600">Anti-Cheat Verified</span>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-slate-500 border-t border-slate-200">
        InterviewXpert &bull; Built by <a href="https://www.snab.co.in" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-700 hover:text-[#ff5722]">SNAB Innovations</a> (Nashik, India)
      </footer>
    </div>
  );
};

export default CodingInterviewPractice;
