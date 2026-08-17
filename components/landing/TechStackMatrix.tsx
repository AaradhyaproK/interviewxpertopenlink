import React from 'react';
import { 
  Cpu, 
  Database, 
  Cloud, 
  Bot, 
  Video, 
  Mic, 
  Mail, 
  Volume2, 
  ShieldCheck, 
  FileCode 
} from 'lucide-react';

export const TechStackMatrix: React.FC = () => {
  const integrations = [
    {
      name: "Amazon Bedrock Mantle",
      category: "LLM & Reasoning",
      models: "nvidia.nemotron-9b, nemotron-30b, zai.glm-4.7",
      desc: "High-performance inference with reasoning sanitization stripping <think> tags for spoken audio.",
      badge: "Primary LLM",
      icon: Cpu,
      color: "border-orange-200 bg-orange-50 text-orange-600"
    },
    {
      name: "Google Gemini 2.0 & GenAI",
      category: "Generative AI",
      models: "Gemini 1.5 & 2.0 Flash / Pro",
      desc: "Real-time question generation, coding challenge rubrics, and structured candidate evaluation.",
      badge: "Streaming AI",
      icon: Bot,
      color: "border-blue-200 bg-blue-50 text-blue-600"
    },
    {
      name: "xAI Grok Integration",
      category: "Conversational Engine",
      models: "Grok-Beta Reasoning",
      desc: "Alternative conversational interview simulator and prompt evaluation fallback engine.",
      badge: "Fallback LLM",
      icon: Bot,
      color: "border-purple-200 bg-purple-50 text-purple-600"
    },
    {
      name: "Sarvam AI Voice Engine",
      category: "Regional TTS",
      models: "Bulbul / Indian Voice Synthesis",
      desc: "Authentic Indian English and Hindi voice synthesis with audio wave synchronization.",
      badge: "Voice TTS",
      icon: Volume2,
      color: "border-pink-200 bg-pink-50 text-pink-600"
    },
    {
      name: "AssemblyAI Audio",
      category: "Speech-to-Text",
      models: "Conformer-2 High Accuracy",
      desc: "Timestamped speaker diarization, confidence scores, and real-time speech streaming.",
      badge: "STT Engine",
      icon: Mic,
      color: "border-cyan-200 bg-cyan-50 text-cyan-600"
    },
    {
      name: "Cloudinary Video Cloud",
      category: "Media Storage",
      models: "Secure Direct Upload API",
      desc: "Ultra-fast direct camera and audio recording uploads with instant CDN streaming.",
      badge: "Video CDN",
      icon: Video,
      color: "border-blue-200 bg-blue-50 text-blue-600"
    },
    {
      name: "Brevo Transactional Email",
      category: "Candidate Delivery",
      models: "Transactional v3 API",
      desc: "Branded invitation emails with dynamic 6-digit access codes and test results dispatch.",
      badge: "Email API",
      icon: Mail,
      color: "border-emerald-200 bg-emerald-50 text-emerald-600"
    },
    {
      name: "@vladmandic/face-api",
      category: "Client Anti-Cheat",
      models: "TensorFlow.js WASM",
      desc: "Client-side facial tracking, head posture verification, and multi-face cheat detection.",
      badge: "Proctoring",
      icon: ShieldCheck,
      color: "border-emerald-200 bg-emerald-50 text-emerald-600"
    },
    {
      name: "pdfjs-dist & KaTeX",
      category: "Client Rendering",
      models: "PDF.js + KaTeX 0.16",
      desc: "In-browser PDF resume text extraction and complex mathematical formula LaTeX rendering.",
      badge: "Core Parsers",
      icon: FileCode,
      color: "border-amber-200 bg-amber-50 text-amber-600"
    },
    {
      name: "Google Firebase Firestore",
      category: "Database & Auth",
      models: "Cloud Firestore & Google OAuth",
      desc: "Real-time database sync for jobs, applications, submissions, tests, and user permissions.",
      badge: "Cloud DB",
      icon: Database,
      color: "border-orange-200 bg-orange-50 text-orange-600"
    }
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold uppercase tracking-widest text-[#ff5722] mb-4 shadow-sm">
            <Cloud size={14} /> Cloud & AI Integrations Matrix
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Powered by World-Class AI, <br className="hidden sm:inline" />
            Speech & Cloud Infrastructure
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            A resilient multi-cloud architecture connecting Amazon Bedrock, Google Gemini, Sarvam AI, AssemblyAI, and Firebase.
          </p>
        </div>

        {/* Integrations Grid in Pure Day Mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {integrations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all group flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${item.color}`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 shadow-sm">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#ff5722] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 font-medium mb-2">{item.category} &bull; {item.models}</p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Engine: Fully Synced</span>
                  <span className="text-emerald-600 font-bold">&bull; Online</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TechStackMatrix;
