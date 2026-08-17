import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, Video, Code, BrainCircuit, ShieldCheck } from 'lucide-react';
import Navbar from '../components/landing/Navbar';

export const InfosysMockInterview: React.FC = () => {
  useEffect(() => {
    document.title = "Infosys Mock Interview Prep (SP & DSE) Online | InterviewXpert";
    
    const setMetaTag = (attr: 'name' | 'property', value: string, content: string) => {
      let element = document.querySelector(`meta[${attr}='${value}']`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', 'Prepare for Infosys Specialist Programmer (SP), Digital Specialist Engineer (DSE) & Systems Engineer interviews with AI mock simulations and instant feedback.');
    setMetaTag('name', 'keywords', 'Infosys mock interview prep, Infosys SP mock interview, Infosys DSE technical interview, Infosys HR interview questions, Infosys coding round practice, online mock interview India');
  }, []);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 font-sans">
      <Navbar />

      <section className="pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
          <Sparkles size={14} /> Infosys SP, DSE & SE Hiring Track
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Infosys Mock Interview Prep <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
            For Specialist Programmer & DSE Roles
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Crack high-package Infosys roles with AI-driven technical mock rounds covering Advanced Dynamic Programming, Graph Algorithms, OOP concepts, and SQL.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/auth"
            className="px-8 py-4 rounded-full bg-[#ff5722] hover:bg-[#f4511e] text-white font-bold text-base transition-all shadow-lg shadow-orange-500/30 hover:scale-105"
          >
            Start Free Infosys Mock Session
          </Link>
          <Link
            to="/auth"
            className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-base transition-all shadow-sm"
          >
            Infosys Coding Assessment Practice
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <Code size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">1. SP & DSE Coding Challenges</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Practice LeetCode medium/hard problems, Trees, Dynamic Programming, and Graph Traversals with automated test case validation.
            </p>
            <span className="text-xs font-bold text-emerald-600">Dynamic Programming & Graphs</span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <Video size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">2. Technical Architecture & OOPs</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Real-time AI interrogation on Object-Oriented Design, Database normalization, Operating Systems, and your academic projects.
            </p>
            <span className="text-xs font-bold text-blue-600">Real-Time Speech Diarization</span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">3. Infosys HR & Cultural Round</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Behavioral competency questions, adaptability to shifts/training at Infosys Mysore Campus, and career aspirations.
            </p>
            <span className="text-xs font-bold text-purple-600">Soft Skills & Confidence Metrics</span>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-slate-500 border-t border-slate-200">
        InterviewXpert &bull; Built by <a href="https://www.snab.co.in" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-700 hover:text-[#ff5722]">SNAB Innovations</a> (Nashik, India)
      </footer>
    </div>
  );
};

export default InfosysMockInterview;
