import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Bug, ArrowRight, Check, ChevronDown, ArrowUpRight, MapPin, PhoneCall, Copy, Sparkles } from 'lucide-react';
import { ThemeProvider } from '../context/ThemeContext';
import { Marquee } from '../components/landing/Marquee';
import Logo from '../components/Logo';
import Navbar from '../components/landing/Navbar';
import PhenomenonHero from '../components/landing/PhenomenonHero';
import StatementBreak from '../components/landing/StatementBreak';
import PhenomenonStageSwitcher from '../components/landing/PhenomenonStageSwitcher';
import FeaturePillarsGrid from '../components/landing/FeaturePillarsGrid';
import ReportShowcaseSection from '../components/landing/ReportShowcaseSection';
import TechStackMatrix from '../components/landing/TechStackMatrix';
import ProblemWeSolve from '../components/landing/ProblemWeSolve';
import CandidateRecruiterShowcase from '../components/landing/CandidateRecruiterShowcase';
import LandingJobs from '../components/LandingJobs';
import BusinessModelCalculator from '../components/landing/BusinessModelCalculator';
import StickyFloatingCTA from '../components/landing/StickyFloatingCTA';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../services/firebase';

// --- SEO Component ---
const SEO: React.FC = () => {
  useEffect(() => {
    document.title = "InterviewXpert | AI Workflow Platform & Technical Mock Interviews";

    const setMetaTag = (attr: 'name' | 'property', value: string, content: string) => {
      let element = document.querySelector(`meta[${attr}='${value}']`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', 'Orchestrate intelligent AI mock interviews, coding challenges & candidate screening workflows. 5 free sessions monthly.');
    setMetaTag('name', 'keywords', 'AI workflow platform, technical mock interview, coding mock interview, TCS NQT prep, Infosys interview practice, Wipro technical interview, system design practice, interviewxpert');

    // Open Graph / Facebook
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', 'https://www.interviewxpert.in/');
    setMetaTag('property', 'og:title', "InterviewXpert | AI Workflow Platform & Technical Mock Interviews");
    setMetaTag('property', 'og:description', 'Orchestrate intelligent AI mock interviews, coding challenges & candidate screening workflows.');
    setMetaTag('property', 'og:image', 'https://www.interviewxpert.in/logo-black.png');

    // Twitter
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('property', 'twitter:title', "InterviewXpert | AI Workflow Platform & Technical Mock Interviews");
    setMetaTag('property', 'twitter:description', 'Orchestrate intelligent AI mock interviews, coding challenges & candidate screening workflows.');
    setMetaTag('property', 'twitter:image', 'https://www.interviewxpert.in/logo-black.png');
  }, []);

  return null;
};

// --- Testimonials Section ---
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    quote: "InterviewXpert completely transformed how I prepared for system design and coding rounds. The conversational questions felt genuine, and the instant feedback highlighted edge cases I had overlooked.",
    rating: 5
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Product Manager at Microsoft",
    quote: "The resume optimizer and behavioral practice gave me so much clarity. Walking into my actual interview felt like just another practice session. Landed my dream offer!",
    rating: 5
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "Data Scientist at Amazon",
    quote: "I used to get nervous during technical rounds, but practicing out loud with adaptive follow-ups made a huge difference in my communication clarity and confidence.",
    rating: 5
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Frontend Developer at Meta",
    quote: "The live code editor and real-time speech analysis helped me present my thoughts much more clearly. Highly recommended for any engineer preparing for tech rounds.",
    rating: 5
  },
  {
    id: 5,
    name: "Sneha Reddy",
    role: "UX Engineer at Apple",
    quote: "The behavioral and architecture rounds were thoughtful and challenging. The structured scorecards showed me exactly what to refine before the final on-site.",
    rating: 5
  },
  {
    id: 6,
    name: "Arjun Nair",
    role: "DevOps Engineer at Netflix",
    quote: "From resume ATS optimization to realistic mock rounds, everything worked seamlessly. The transparent pricing and free monthly sessions are unmatched.",
    rating: 5
  }
];

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <i
        key={star}
        className={`fas fa-star text-[10px] ${star <= rating ? 'text-[#2563EB]' : 'text-[#E2E8F0]'}`}
      />
    ))}
  </div>
);

const TestimonialCard: React.FC<{ testimonial: any }> = ({ testimonial }) => (
  <div className="flex-shrink-0 w-[290px] sm:w-[340px] md:w-[370px] p-6 bg-white rounded-[24px] border border-[#E2E8F0] shadow-[0_2px_10px_rgba(15,23,42,0.02)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] transition-all duration-300 transform hover:-translate-y-1 relative group overflow-hidden flex flex-col justify-between">
    <div>
      <div className="flex items-start gap-3 mb-3.5">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[#2563EB] font-bold text-xs bg-[#EFF6FF] border border-[#BFDBFE] font-mono">
          {getInitials(testimonial.name)}
        </div>
        <div className="flex-1">
          <h4 className="font-display font-bold text-[#0F172A] text-sm tracking-tight">{testimonial.name}</h4>
          <p className="text-[11px] text-[#64748B] mb-1 font-sans font-normal">{testimonial.role}</p>
          <StarRating rating={testimonial.rating} />
        </div>
      </div>
      <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed font-sans font-normal">
        "{testimonial.quote}"
      </p>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>(testimonials);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, 'reviews'),
          where('approved', '==', true),
          orderBy('createdAt', 'desc'),
          limit(15)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const fetchedReviews = snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            role: (doc.data().userType === 'student' || doc.data().userType === 'candidate') 
              ? 'Candidate' 
              : (doc.data().userType === 'recruiter' ? 'Recruiter' : 'Engineer'),
            quote: doc.data().review,
            rating: doc.data().rating || 5
          }));
          
          let reviewList = [...fetchedReviews];
          while (reviewList.length > 0 && reviewList.length < 10) {
            reviewList = [...reviewList, ...fetchedReviews];
          }
          setReviews(reviewList.slice(0, 20));
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };
    fetchReviews();
  }, []);

  const half = Math.ceil(reviews.length / 2);
  const firstRow = reviews.slice(0, half);
  const secondRow = reviews.slice(half);

  return (
    <section id="testimonials" className="py-16 sm:py-20 overflow-hidden relative bg-[#F8FAFC] border-t border-[#E2E8F0] transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-2.5 font-sans">
            Community
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
            Trusted by candidates & teams.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] font-sans font-normal leading-relaxed">
            Join thousands of professionals and hiring managers practicing with quiet confidence.
          </p>
        </div>
      </div>

      <div className="relative z-10">
        <Marquee pauseOnHover className="[--duration:45s] [--gap:1.25rem] py-2">
          {firstRow.map((testimonial, idx) => (
            <TestimonialCard key={`row1-${testimonial.id || idx}`} testimonial={testimonial} />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="[--duration:50s] [--gap:1.25rem] mt-2 py-2">
          {secondRow.map((testimonial, idx) => (
            <TestimonialCard key={`row2-${testimonial.id || idx}`} testimonial={testimonial} />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[#F8FAFC] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[#F8FAFC] to-transparent z-20" />
      </div>
    </section>
  );
};

// --- Pricing Section ---
const Pricing: React.FC = () => (
  <section id="pricing" className="py-16 sm:py-20 bg-white border-t border-[#E2E8F0] transition-colors duration-500">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Unified Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-2.5 font-sans">
          Honest Pricing
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
          Start free. Upgrade as you grow.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#64748B] font-sans font-normal leading-relaxed">
          Candidate tools, resume checks, and coding sandboxes are permanently free. Pay only when you practice extra rounds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        
        {/* Free Plan */}
        <div className="bg-[#F8FAFC] p-7 rounded-[24px] border border-[#E2E8F0] flex flex-col h-full hover:shadow-lg transition-all">
          <div>
            <h3 className="font-display text-base font-bold text-[#0F172A]">Free Forever</h3>
            <p className="text-xs text-[#64748B] mt-0.5 font-sans">For all job seekers & students</p>
            <div className="my-5">
              <span className="font-mono text-3xl sm:text-4xl font-bold text-[#0F172A]">₹0</span>
              <span className="text-xs text-[#64748B] ml-1 font-sans">/ month</span>
            </div>
            <ul className="space-y-2.5 text-xs text-[#64748B] mb-8 font-sans">
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#2563EB] mt-0.5 shrink-0" />
                <span><strong>5 Complete Practice Rounds</strong> / month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#2563EB] mt-0.5 shrink-0" />
                <span><strong>Unlimited</strong> Recruiter Job Test Access</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#2563EB] mt-0.5 shrink-0" />
                <span><strong>Free</strong> Aptitude & MCQ Practice Tests</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#2563EB] mt-0.5 shrink-0" />
                <span><strong>Free</strong> Resume Optimizer & ATS Check</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#2563EB] mt-0.5 shrink-0" />
                <span><strong>Free</strong> Career Hub & Resource Library</span>
              </li>
            </ul>
          </div>
          <Link to="/auth" className="block w-full py-2.5 text-center bg-white hover:bg-[#EFF6FF] text-[#0F172A] rounded-full font-semibold text-xs border border-[#E2E8F0] transition mt-auto shadow-sm font-sans">
            Get started free
          </Link>
        </div>
        
        {/* Pro Plan */}
        <div className="bg-white p-7 rounded-[24px] border-2 border-[#2563EB] shadow-[0_10px_25px_-5px_rgba(37,99,235,0.12)] relative flex flex-col h-full md:-translate-y-1.5">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
            Popular
          </div>
          <div>
            <h3 className="font-display text-base font-bold text-[#0F172A]">Pay-As-You-Go Wallet</h3>
            <p className="text-xs text-[#64748B] mt-0.5 font-sans">Flexible top-up credits</p>
            <div className="my-5">
              <span className="font-mono text-3xl sm:text-4xl font-bold text-[#0F172A]">10 Pts</span>
              <span className="text-xs text-[#64748B] ml-1 font-sans">/ session (~₹49)</span>
            </div>
            <ul className="space-y-2.5 text-xs text-[#0F172A] mb-8 font-sans">
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#2563EB] mt-0.5 shrink-0" />
                <span><strong>In-App Wallet:</strong> Top up points anytime</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#2563EB] mt-0.5 shrink-0" />
                <span><strong>No Subscription:</strong> Credits never expire</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#2563EB] mt-0.5 shrink-0" />
                <span><strong>Unlimited</strong> Technical & Behavioral Practice</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#2563EB] mt-0.5 shrink-0" />
                <span>Realistic voice conversation & video review</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#2563EB] mt-0.5 shrink-0" />
                <span>11 Soft skill dimensions & PDF scorecards</span>
              </li>
            </ul>
          </div>
          <Link to="/auth" className="block w-full py-2.5 text-center bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full font-semibold text-xs transition shadow-[0_4px_14px_rgba(37,99,235,0.25)] mt-auto font-sans">
            Top up wallet
          </Link>
        </div>
        
        {/* Enterprise Plan */}
        <div className="bg-[#F8FAFC] p-7 rounded-[24px] border border-[#E2E8F0] flex flex-col h-full hover:shadow-lg transition-all">
          <div>
            <h3 className="font-display text-base font-bold text-[#0F172A]">Campus & Enterprise</h3>
            <p className="text-xs text-[#64748B] mt-0.5 font-sans">For universities & hiring teams</p>
            <div className="my-5">
              <span className="font-mono text-3xl sm:text-4xl font-bold text-[#0F172A]">Custom</span>
              <span className="text-xs text-[#64748B] ml-1 font-sans">/ batch</span>
            </div>
            <ul className="space-y-2.5 text-xs text-[#64748B] mb-8 font-sans">
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#2563EB] mt-0.5 shrink-0" />
                <span>Bulk Resume Parser & Leaderboard</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#2563EB] mt-0.5 shrink-0" />
                <span>WhatsApp & Email Automated Invites</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#2563EB] mt-0.5 shrink-0" />
                <span>Recruiter ATS Dashboard & Video Player</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={14} className="text-[#2563EB] mt-0.5 shrink-0" />
                <span>Passcode Client Share Links</span>
              </li>
            </ul>
          </div>
          <a href="mailto:sales@interviewxpert.in" className="block w-full py-2.5 text-center bg-white hover:bg-[#EFF6FF] text-[#0F172A] rounded-full font-semibold text-xs border border-[#E2E8F0] transition mt-auto shadow-sm font-sans">
            Contact sales
          </a>
        </div>

      </div>
    </div>
  </section>
);

// --- FAQ Section ---
const FAQ: React.FC<{ openFaq: number | null, toggleFaq: (i: number) => void }> = ({ openFaq, toggleFaq }) => (
  <section id="faq" className="py-16 sm:py-20 bg-[#F8FAFC] border-t border-[#E2E8F0] transition-colors duration-500">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Unified Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-2.5 font-sans">
          Guidance
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
          Frequently asked questions.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#64748B] font-sans font-normal leading-relaxed">
          Everything you need to know about our interview simulation platform and scoring rubrics.
        </p>
      </div>

      <div className="space-y-3">
        {[
          { q: "How does the practice interview simulation work?", a: "You select a target role and company. The platform conducts a realistic 1-on-1 voice interview, listens to your spoken responses, asks relevant follow-up questions, and generates a structured feedback scorecard immediately." },
          { q: "Is the platform free for students and job seekers?", a: "Yes! Every candidate receives 5 free full practice rounds every month. ATS resume reviews, coding sandboxes, and aptitude practice tests are completely free forever." },
          { q: "How are the 11 communication dimensions evaluated?", a: "We analyze your spoken responses across fluency, articulation, confidence, structure, active listening, and technical depth to give you actionable coaching takeaways." },
          { q: "What features are available for hiring teams?", a: "Recruiters can create custom interview rubrics, upload bulk resumes to rank candidates, dispatch WhatsApp & Email invitations, review candidate video responses, and share results with hiring managers." },
          { q: "How is candidate privacy protected?", a: "We adhere to strict data privacy standards. Session video recordings are private, never sold, and only accessible by you or hiring teams you explicitly apply to." }
        ].map((item, idx) => (
          <div key={idx} className="border border-[#E2E8F0] rounded-[20px] overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => toggleFaq(idx)}
              className="w-full flex justify-between items-center p-5 sm:p-5.5 text-left hover:bg-[#F8FAFC] transition"
            >
              <span className="font-display font-bold text-[#0F172A] text-sm sm:text-base">{item.q}</span>
              <ChevronDown className={`w-4 h-4 text-[#94A3B8] transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-[#2563EB]' : ''}`} />
            </button>
            {openFaq === idx && (
              <div className="px-5 sm:px-5.5 pb-5 text-[#64748B] text-xs sm:text-sm border-t border-[#E2E8F0] pt-3.5 leading-relaxed font-sans font-normal">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  </section>
);

// --- Final CTA ---
const FinalCTA: React.FC = () => (
  <section className="py-16 sm:py-20 text-center relative overflow-hidden bg-white border-t border-[#E2E8F0] transition-colors duration-500">
    <div className="max-w-3xl mx-auto px-4 relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-2.5 font-sans">
          Begin Today
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
          Master your next interview.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#64748B] font-sans font-normal leading-relaxed">
          Join over 50,000 engineers and modern hiring teams practicing with quiet confidence.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <Link 
          to="/auth" 
          className="px-7 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 shadow-[0_4px_14px_rgba(37,99,235,0.28)] hover:scale-105 flex items-center gap-2 font-sans"
        >
          <span>Get started free</span>
          <ArrowRight size={14} />
        </Link>
        <Link 
          to="/auth" 
          className="px-6 py-3 bg-[#F8FAFC] hover:bg-[#EFF6FF] text-[#0F172A] rounded-full font-semibold text-xs sm:text-sm border border-[#E2E8F0] transition-all duration-200 hover:scale-105 shadow-sm font-sans"
        >
          For hiring teams
        </Link>
      </div>
    </div>
  </section>
);

// --- Compact 1-Screen Luxury Dark Obsidian Designer Footer ---
const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#0A0D14] text-white pt-12 sm:pt-14 pb-8 sm:pb-10 border-t border-slate-800/80 relative overflow-hidden transition-colors duration-500">
      
      {/* Ambient Electric Radial Glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#2563EB]/15 rounded-full blur-[100px]" />
      
      {/* Dark Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none opacity-20" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* BORDERLESS CLEAN EMAIL HERO */}
        {/* ========================================================================= */}
        <div className="mb-10 text-center sm:text-left">
          
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#38BDF8] font-mono">
              / get in touch /
            </p>

            <span className="text-[11px] font-mono text-slate-400">
              Nashik, Maharashtra &bull; India 422005
            </span>
          </div>

          <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-slate-200 tracking-tight mb-2">
            We'd love to hear from you.
          </h3>
          
          <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-2xl leading-relaxed mb-6">
            Tell us what you are trying to improve, automate, or launch. We will help shape the right product and a practical path to production.
          </p>

          {/* Big Borderless Stylized Email */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 group relative">
            <a
              href="mailto:hello@snab.co.in"
              className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white hover:text-[#38BDF8] tracking-tight transition-all duration-300 break-all"
            >
              hello@snab.co.in
            </a>

            <a
              href="mailto:hello@snab.co.in?subject=Book%20a%20project%20call"
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-sans font-semibold text-[#93C5FD] hover:text-white border border-white/10 transition-all active:scale-95"
            >
              Book discovery call ↗
            </a>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* COMPACT NAVIGATION & ATTRIBUTION COLUMNS */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 pb-8 border-t border-b border-slate-800/80 pt-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-2.5">
              <Logo className="w-6 h-6 rounded-xl" isDark={true} />
              <span className="font-display font-bold text-base text-white">Interview<span className="text-[#38BDF8]">Xpert</span></span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-sans font-normal">
              Conversational mock rounds, ATS resume optimization, and automated recruitment evaluation engines.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-2.5 text-xs uppercase tracking-wider">Platform</h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-sans">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">Scorecards</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><Link to="/our-journey" className="hover:text-white transition-colors">Our Journey</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-2.5 text-xs uppercase tracking-wider">Prep Tracks</h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-sans">
              <li><Link to="/tcs-mock-interview" className="hover:text-white transition-colors">TCS NQT Practice</Link></li>
              <li><Link to="/infosys-mock-interview" className="hover:text-white transition-colors">Infosys SP & DSE</Link></li>
              <li><Link to="/wipro-mock-interview" className="hover:text-white transition-colors">Wipro Elite</Link></li>
              <li><Link to="/coding-interview-practice" className="hover:text-white transition-colors">Coding Challenges</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-2.5 text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-sans">
              <li><Link to="/career-hub" className="hover:text-white transition-colors">Career Hub</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors">Reviews</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li>
                <Link to="/report-bug" className="flex items-center gap-1 text-slate-400 hover:text-red-400 transition-colors">
                  <Bug size={11} /> Report a bug
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPACT BOTTOM COPYRIGHT ROW */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500 font-sans">
          <div>
            &copy; {new Date().getFullYear()} InterviewXpert. A Product of <a href="https://www.snab.co.in" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-300 hover:text-[#38BDF8] transition-colors">SNAB Innovations</a> (Nashik, India).
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <span>&bull;</span>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
            <span>&bull;</span>
            <a href="mailto:hello@snab.co.in" className="hover:text-white transition-colors">hello@snab.co.in</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

// --- Main Home Component ---
const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A] selection:bg-[#EFF6FF] selection:text-[#1D4ED8] transition-colors duration-500 overflow-x-hidden">
        <SEO />
        <Navbar />
        <main>
          <PhenomenonHero />
          <StatementBreak />
          <PhenomenonStageSwitcher />
          <FeaturePillarsGrid />
          <ReportShowcaseSection />
          <TechStackMatrix />
          <ProblemWeSolve />
          <CandidateRecruiterShowcase />
          <LandingJobs />
          <BusinessModelCalculator />
          <Testimonials />
          <Pricing />
          <FAQ openFaq={openFaq} toggleFaq={toggleFaq} />
          <FinalCTA />
        </main>
        <Footer />
        <StickyFloatingCTA />
      </div>
    </ThemeProvider>
  );
};

export default Home;
