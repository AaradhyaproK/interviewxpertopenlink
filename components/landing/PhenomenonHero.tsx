import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Rocket, 
  Briefcase, 
  Video, 
  Mic, 
  Code, 
  Play, 
  ShieldCheck, 
  TrendingUp, 
  X, 
  Volume2,
  CheckCircle2
} from 'lucide-react';

export const PhenomenonHero: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [audioLevel, setAudioLevel] = useState<number[]>([40, 65, 30, 85, 55, 90, 45, 70, 60, 80]);

  // Animate audio waveform bars
  useEffect(() => {
    const interval = setInterval(() => {
      setAudioLevel(prev => prev.map(() => Math.floor(Math.random() * 65) + 25));
    }, 280);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] pt-32 sm:pt-36 md:pt-40 pb-20 overflow-hidden flex flex-col items-center justify-center bg-[#fafbfc]">
      {/* Soft Ambient Day-Mode Lighting Cones */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[550px] md:w-[1200px] md:h-[650px] opacity-70"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.15) 0%, rgba(255, 87, 34, 0.08) 35%, rgba(139, 92, 246, 0.04) 60%, transparent 80%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Subtle Day-Mode Geometric Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center">
        
        {/* Top Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 text-slate-700 text-xs sm:text-sm font-semibold shadow-sm backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-pulse" />
          <span>Next-Gen Multi-Engine AI Talent & Interview Intelligence</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-tight text-slate-900 leading-[1.08] max-w-5xl"
        >
          Design & AI Intelligence <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-[#ff5722] to-purple-600">
            Acceleration for Tech Hiring
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          From live 1-on-1 conversational AI mock sessions with proctoring to automated recruiter ATS pipelines, bulk resume scoring, and 11-dimension candidate video scorecards.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <Link
            to="/auth"
            className="px-7 py-3.5 rounded-full bg-[#ff5722] hover:bg-[#f4511e] text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(255,87,34,0.4)] hover:shadow-[0_15px_35px_-2px_rgba(255,87,34,0.6)] hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Rocket size={18} />
            <span>Candidate Practice (Free)</span>
          </Link>

          <Link
            to="/auth"
            className="px-7 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base shadow-md transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Briefcase size={18} />
            <span>Recruiter Enterprise Suite</span>
          </Link>

          <button
            onClick={() => setIsVideoOpen(true)}
            className="px-5 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 font-bold text-sm sm:text-base shadow-sm transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
          >
            <Play size={16} className="text-[#ff5722]" />
            <span>Watch 2-min Demo</span>
          </button>
        </motion.div>

        {/* ========================================================================= */}
        {/* PHENOMENON STUDIO SIGNATURE HERO TABLET PREVIEW + 4 FLOATING WIDGETS */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="relative mt-14 sm:mt-16 w-full max-w-5xl"
        >
          {/* Peripheral Floating Widget 1: TOP LEFT (346+ Sessions & Waveform) */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden lg:flex absolute -left-12 -top-10 z-20 w-56 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex-col gap-3 text-left"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-full bg-[#ff5722]/15 border border-[#ff5722]/30 flex items-center justify-center text-[#ff5722]">
                <Rocket size={18} />
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Live Active
              </span>
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">346+ Sessions</p>
              <p className="text-[11px] text-slate-500 font-medium">Real-time candidate simulations</p>
            </div>
            {/* Waveform graphic */}
            <div className="flex items-end gap-1.5 h-6 pt-1">
              {audioLevel.map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#ff5722] to-amber-400 rounded-full transition-all duration-300"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </motion.div>

          {/* Peripheral Floating Widget 2: TOP RIGHT (Installs / Screening Bar Chart) */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="hidden lg:flex absolute -right-12 -top-12 z-20 w-60 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex-col gap-3 text-left"
          >
            <div className="flex items-center justify-between text-xs text-slate-600 font-bold">
              <span>Recruiter Shortlists</span>
              <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                <TrendingUp size={12} /> 94% Yield
              </span>
            </div>
            {/* Phenomenon-style custom rounded bar chart */}
            <div className="flex items-end justify-between gap-2 h-20 pt-2 px-1">
              {[
                { label: 'Mon', h: '45%', color: 'bg-slate-100' },
                { label: 'Tue', h: '65%', color: 'bg-slate-100' },
                { label: 'Wed', h: '35%', color: 'bg-slate-100' },
                { label: 'Thu', h: '95%', color: 'bg-emerald-500 text-white font-bold', badge: '362' },
                { label: 'Fri', h: '85%', color: 'bg-amber-500 text-white font-bold', badge: '286' },
                { label: 'Sat', h: '50%', color: 'bg-slate-100' },
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div
                    className={`w-full rounded-md transition-all duration-500 relative flex items-center justify-center ${bar.color}`}
                    style={{ height: bar.h }}
                  >
                    {bar.badge && (
                      <span className="text-[9px] font-bold">{bar.badge}</span>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-500 font-medium">{bar.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Peripheral Floating Widget 3: BOTTOM LEFT (Widget control & +58% STT Audio) */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="hidden lg:flex absolute -left-14 -bottom-8 z-20 w-64 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex-col gap-2.5 text-left"
          >
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-bold">
                <Volume2 size={14} className="text-blue-500" /> Speech Engine
              </span>
              <span className="text-[11px] font-mono text-cyan-600 font-bold">Sarvam + Assembly</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-[11px] text-slate-500 font-medium">Confidence Score</p>
                <p className="text-2xl font-black text-slate-900">+58% <span className="text-xs font-bold text-emerald-600">Accurate</span></p>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs">
                Ultra-Low Lag
              </div>
            </div>
          </motion.div>

          {/* Peripheral Floating Widget 4: BOTTOM RIGHT (Big Blue Speedup +80% Circle) */}
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden lg:flex absolute -right-10 -bottom-6 z-20 w-36 h-36 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 p-4 shadow-[0_15px_35px_rgba(37,99,235,0.35)] flex-col items-center justify-center text-center text-white border-2 border-white"
          >
            <span className="text-3xl font-black tracking-tight">+80%</span>
            <span className="text-[10px] leading-tight font-bold opacity-95 mt-0.5">
              Speed up candidate screening
            </span>
          </motion.div>

          {/* MAIN CENTRAL DAY-MODE TABLET MOCKUP */}
          <div className="relative rounded-2xl md:rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-white via-slate-100 to-slate-200 border border-slate-200/90 shadow-[0_25px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
            <div className="rounded-xl md:rounded-2xl bg-white border border-slate-200 overflow-hidden text-left shadow-lg">
              
              {/* Tablet Header Bar */}
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-slate-500 font-medium hidden sm:inline">
                    interviewxpert.ai/session/live-simulation
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                    <ShieldCheck size={13} /> Face-API Active
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-bold">00:14:32</span>
                </div>
              </div>

              {/* Tablet Screen Content: Live AI Interview Simulator Mockup */}
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 bg-white">
                
                {/* Left Column: AI Question & Code/Formula Editor */}
                <div className="md:col-span-7 flex flex-col gap-3">
                  <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={14} /> AI Interviewer (Nemotron 30B)
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">Question 3 of 5</span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                      "Explain the time complexity of searching in a Balanced Binary Search Tree and write a function to invert it."
                    </p>
                  </div>

                  {/* Code Editor Mockup with KaTeX formula support */}
                  <div className="rounded-xl bg-slate-900 border border-slate-800 p-3.5 font-mono text-xs text-slate-200 shadow-md">
                    <div className="flex items-center justify-between text-slate-400 pb-2 mb-2 border-b border-slate-800">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Code size={13} className="text-cyan-400" /> solution.ts
                      </span>
                      <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-cyan-300 font-bold">Complexity: $O(\log n)$</span>
                    </div>
                    <p className="text-purple-400">function <span className="text-blue-400">invertTree</span>(root: TreeNode | null): TreeNode | null &#123;</p>
                    <p className="text-slate-400 pl-4">if (!root) return null;</p>
                    <p className="text-emerald-400 pl-4">[root.left, root.right] = [invertTree(root.right), invertTree(root.left)];</p>
                    <p className="text-purple-400 pl-4">return root;</p>
                    <p className="text-purple-400">&#125;</p>
                  </div>

                  {/* Real-time candidate live voice transcript */}
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                    <Mic size={14} className="mt-0.5 text-emerald-600 shrink-0 animate-pulse" />
                    <span><strong>Live Speech:</strong> "The inversion operates recursively by swapping left and right subtrees with $O(n)$ time complexity..."</span>
                  </div>
                </div>

                {/* Right Column: Video Proctoring & Score Radar */}
                <div className="md:col-span-5 flex flex-col gap-3">
                  {/* Camera Proctoring Feed with Face Mesh Bounding Box */}
                  <div className="relative aspect-video rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center shadow-md">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                    
                    <div className="relative w-full h-full bg-slate-800 flex items-center justify-center">
                      <div className="w-24 h-28 border-2 border-emerald-400/80 rounded-lg flex items-center justify-center relative shadow-[0_0_15px_rgba(52,211,153,0.4)]">
                        <span className="absolute -top-4 left-1 text-[9px] bg-emerald-500 text-black font-bold px-1 rounded">Face: Verified</span>
                        <div className="w-16 h-20 rounded-full bg-slate-700/60 border border-white/20" />
                      </div>
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 z-20 flex items-center justify-between text-[10px] text-white">
                      <span className="flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Camera 1080p
                      </span>
                      <span className="bg-black/60 px-1.5 py-0.5 rounded text-slate-300 font-mono">Tab Switches: 0</span>
                    </div>
                  </div>

                  {/* Multi-Dimensional Competency Rating Pills */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-bold">Technical Accuracy</span>
                      <span className="text-emerald-600 font-extrabold">96%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full w-[96%]" />
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-600 font-bold">Communication & Fluency</span>
                      <span className="text-blue-600 font-extrabold">92%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full w-[92%]" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsVideoOpen(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/70 hover:bg-black text-white rounded-full transition-colors"
              >
                <X size={22} />
              </button>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/9UhI3l23OLg?si=b5KLgy1KogAWePx8&autoplay=1" 
                title="InterviewXpert Platform Tour" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhenomenonHero;
