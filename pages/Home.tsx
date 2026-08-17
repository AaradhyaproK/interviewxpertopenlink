import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Bug } from 'lucide-react';
import { ThemeProvider } from '../context/ThemeContext';
import { Marquee } from '../components/landing/Marquee';
import Logo from '../components/Logo';
import Navbar from '../components/landing/Navbar';
import PhenomenonHero from '../components/landing/PhenomenonHero';
import EnterpriseTrustGrid from '../components/landing/EnterpriseTrustGrid';
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
    document.title = "AI Mock Interview Practice Online | InterviewXpert";

    const setMetaTag = (attr: 'name' | 'property', value: string, content: string) => {
      let element = document.querySelector(`meta[${attr}='${value}']`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', 'Practice live 1-on-1 AI mock interviews, coding tests & aptitude rounds with instant feedback. Free trial. Built in India for TCS, Wipro, Infosys interviews.');
    setMetaTag('name', 'keywords', 'AI mock interview practice, online mock interview India, TCS NQT mock interview, Infosys mock interview prep, Wipro elite interview practice, coding interview practice with AI feedback, free mock interview online India, technical interview preparation platform, interviewxpert, SNAB Innovations');

    // Open Graph / Facebook
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', 'https://www.interviewxpert.in/');
    setMetaTag('property', 'og:title', "AI Mock Interview Practice Online | InterviewXpert");
    setMetaTag('property', 'og:description', 'Practice live 1-on-1 AI mock interviews, coding tests & aptitude rounds with instant feedback. Free trial. Built in India for TCS, Wipro, Infosys interviews.');
    setMetaTag('property', 'og:image', 'https://www.interviewxpert.in/logo-black.png');

    // Twitter
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('property', 'twitter:title', "AI Mock Interview Practice Online | InterviewXpert");
    setMetaTag('property', 'twitter:description', 'Practice live 1-on-1 AI mock interviews, coding tests & aptitude rounds with instant feedback. Free trial. Built in India for TCS, Wipro, Infosys interviews.');
    setMetaTag('property', 'twitter:image', 'https://www.interviewxpert.in/logo-black.png');
  }, []);

  return null;
};

// --- Testimonials Section with Auto-Scrolling Animation ---
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    quote: "InterviewXpert completely transformed my interview preparation. The AI mock interviews felt incredibly realistic, and the instant feedback helped me identify my weak spots. Landed my dream job at Google!",
    rating: 5
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Product Manager at Microsoft",
    quote: "The resume builder is a game-changer. My ATS score went from 45% to 92% after using the AI suggestions. The platform is intuitive and the practice sessions are top-notch.",
    rating: 5
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "Data Scientist at Amazon",
    quote: "I was nervous about technical interviews, but the AI interviewer helped me practice complex scenarios. The detailed feedback on my communication and technical accuracy was invaluable.",
    rating: 5
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Frontend Developer at Meta",
    quote: "What sets InterviewXpert apart is the real-time analysis. Seeing my eye contact and posture metrics helped me present myself more confidently. Highly recommended!",
    rating: 4
  },
  {
    id: 5,
    name: "Sneha Reddy",
    role: "UX Designer at Apple",
    quote: "The behavioral interview practice was exactly what I needed. The AI asked challenging follow-up questions just like a real interviewer. Felt fully prepared on the big day.",
    rating: 5
  },
  {
    id: 6,
    name: "Arjun Nair",
    role: "DevOps Engineer at Netflix",
    quote: "From resume optimization to final interview prep, InterviewXpert covered everything. The pricing is fair and the results speak for themselves. Got multiple offers!",
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

const getAvatarColor = (name: string) => {
  const colors = [
    'bg-gradient-to-br from-blue-500 to-blue-600',
    'bg-gradient-to-br from-purple-500 to-purple-600',
    'bg-gradient-to-br from-pink-500 to-pink-600',
    'bg-gradient-to-br from-green-500 to-green-600',
    'bg-gradient-to-br from-orange-500 to-orange-600',
    'bg-gradient-to-br from-teal-500 to-teal-600',
  ];
  const index = name.length % colors.length;
  return colors[index];
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <i
        key={star}
        className={`fas fa-star text-sm ${star <= rating ? 'text-amber-400' : 'text-slate-300'}`}
      />
    ))}
  </div>
);

const TestimonialCard: React.FC<{ testimonial: any }> = ({ testimonial }) => (
  <div className="flex-shrink-0 w-[320px] sm:w-[360px] md:w-[400px] p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 relative group overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="flex items-start gap-4 mb-5 relative z-10">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg border border-white/20 ${getAvatarColor(testimonial.name)}`}>
        {getInitials(testimonial.name)}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-slate-900 text-lg tracking-tight group-hover:text-blue-600 transition-colors">{testimonial.name}</h4>
        <p className="text-sm font-medium text-slate-500 mb-1">{testimonial.role}</p>
        <StarRating rating={testimonial.rating} />
      </div>
    </div>
    <p className="text-slate-600 text-sm md:text-base leading-relaxed relative z-10">
      "{testimonial.quote}"
    </p>
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
              : (doc.data().userType === 'recruiter' ? 'Recruiter' : 'Candidate'),
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
    <section id="testimonials" className="py-20 md:py-28 overflow-hidden relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold uppercase tracking-widest text-[#ff5722] mb-4 shadow-sm">
            <Sparkles size={14} /> Community Reviews
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            What Our Candidates & Recruiters Say
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
            Join thousands of professionals and hiring managers leveraging InterviewXpert to land dream roles and hire top tech talent.
          </p>
        </div>
      </div>

      <div className="relative z-10">
        <Marquee pauseOnHover className="[--duration:40s] [--gap:1.5rem] py-4">
          {firstRow.map((testimonial, idx) => (
            <TestimonialCard key={`row1-${testimonial.id || idx}`} testimonial={testimonial} />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="[--duration:45s] [--gap:1.5rem] mt-4 py-4">
          {secondRow.map((testimonial, idx) => (
            <TestimonialCard key={`row2-${testimonial.id || idx}`} testimonial={testimonial} />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-slate-50 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-slate-50 to-transparent z-20" />
      </div>
    </section>
  );
};

// --- Pricing Section ---
const Pricing: React.FC = () => (
  <section id="pricing" className="py-20 md:py-28 bg-white border-t border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold uppercase tracking-widest text-[#ff5722] mb-4 shadow-sm">
          Pay As You Go
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Flexible, Transparent Pricing</h2>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">Full candidate tools and tests are permanently free. Pay only for AI multi-engine GPU time.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <div className="bg-slate-50 p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col h-full hover:border-slate-300 transition-all">
          <h3 className="text-xl font-bold text-slate-900">Free Forever</h3>
          <div className="my-4"><span className="text-4xl font-black text-slate-900">₹0</span></div>
          <ul className="space-y-3 text-sm text-slate-600 mb-8 flex-grow">
            <li className="flex items-start gap-2"><i className="fas fa-check text-emerald-600 mt-1"></i> <div><strong>5 Free AI Mock Interviews / mo</strong></div></li>
            <li className="flex items-start gap-2"><i className="fas fa-check text-emerald-600 mt-1"></i> <div><strong>Unlimited</strong> Actual Recruiter Job Tests</div></li>
            <li className="flex items-start gap-2"><i className="fas fa-check text-emerald-600 mt-1"></i> <div><strong>Free</strong> Mock Aptitude & MCQ Tests</div></li>
            <li className="flex items-start gap-2"><i className="fas fa-check text-emerald-600 mt-1"></i> <div><strong>Free</strong> AI Resume Builder & ATS Checker</div></li>
            <li className="flex items-start gap-2"><i className="fas fa-check text-emerald-600 mt-1"></i> <div><strong>Free</strong> Personalized AI Career Advisor</div></li>
          </ul>
          <Link to="/auth" className="block w-full py-3.5 text-center border border-slate-300 text-slate-900 rounded-full font-bold hover:bg-slate-100 transition mt-auto">Get Started Free</Link>
        </div>
        
        {/* Pro Plan */}
        <div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-[#ff5722] relative transform md:-translate-y-4 flex flex-col h-full">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ff5722] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">Most Popular</div>
          <h3 className="text-xl font-bold text-slate-900">Pay As You Go Wallet</h3>
          <div className="my-4"><span className="text-4xl font-black text-slate-900">10 Pts</span><span className="text-slate-500 text-sm"> / Interview</span></div>
          <ul className="space-y-3 text-sm text-slate-700 mb-8 flex-grow">
            <li className="flex items-start gap-2"><i className="fas fa-check text-emerald-600 mt-1"></i> <div><strong>In-App Wallet:</strong> Top up points anytime</div></li>
            <li className="flex items-start gap-2"><i className="fas fa-check text-emerald-600 mt-1"></i> <div><strong>No Locked Subscription:</strong> Pay per session</div></li>
            <li className="flex items-start gap-2"><i className="fas fa-check text-emerald-600 mt-1"></i> <div><strong>Unlimited</strong> Nemotron 30B Practice</div></li>
            <li className="flex items-start gap-2"><i className="fas fa-check text-emerald-600 mt-1"></i> <div>Sarvam AI Indian English Voice & Video</div></li>
            <li className="flex items-start gap-2"><i className="fas fa-check text-emerald-600 mt-1"></i> <div>11 Soft Skill Dimensions & PDF Reports</div></li>
            <li className="flex items-start gap-2"><i className="fas fa-bolt text-amber-500 mt-1"></i> <div><strong>Includes all Free tier features</strong></div></li>
          </ul>
          <Link to="/auth" className="block w-full py-3.5 text-center bg-[#ff5722] hover:bg-[#f4511e] text-white rounded-full font-bold transition shadow-[0_0_20px_rgba(255,87,34,0.4)] mt-auto">Top Up Wallet</Link>
        </div>
        
        {/* Enterprise Plan */}
        <div className="bg-slate-50 p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col h-full hover:border-slate-300 transition-all">
          <h3 className="text-xl font-bold text-slate-900">Campus & Enterprise</h3>
          <div className="my-4"><span className="text-4xl font-black text-slate-900">Custom</span></div>
          <ul className="space-y-3 text-sm text-slate-600 mb-8 flex-grow">
            <li className="flex items-start gap-2"><i className="fas fa-check text-emerald-600 mt-1"></i> <div>Bulk PDF Resume Parser & Screener</div></li>
            <li className="flex items-start gap-2"><i className="fas fa-check text-emerald-600 mt-1"></i> <div>WhatsApp & Brevo Automated Invites</div></li>
            <li className="flex items-start gap-2"><i className="fas fa-check text-emerald-600 mt-1"></i> <div>Recruiter ATS Dashboard & Video Player</div></li>
            <li className="flex items-start gap-2"><i className="fas fa-check text-emerald-600 mt-1"></i> <div>Client Passcode Links & Decision Bar</div></li>
          </ul>
          <a href="mailto:sales@interviewxpert.in" className="block w-full py-3.5 text-center border border-slate-300 text-slate-900 rounded-full font-bold hover:bg-slate-100 transition mt-auto">Contact Sales</a>
        </div>
      </div>
    </div>
  </section>
);

// --- FAQ Section ---
const FAQ: React.FC<{ openFaq: number | null, toggleFaq: (i: number) => void }> = ({ openFaq, toggleFaq }) => (
  <section id="faq" className="py-20 md:py-28 bg-slate-50 border-t border-slate-200">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold uppercase tracking-widest text-[#ff5722] mb-4 shadow-sm">
          Help & Answers
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-4">
        {[
          { q: "How does InterviewXpert simulate real interviews?", a: "We orchestrate Amazon Bedrock (nvidia.nemotron models) and Gemini to ask follow-up questions tailored to your spoken answers and resume, with Sarvam AI realistic Indian voice synthesis." },
          { q: "How does the anti-cheat proctoring engine work?", a: "We run client-side TensorFlow Face-API to verify single face presence, detect looking away, track tab switches, and log full-screen alerts without violating privacy." },
          { q: "What features are included for recruiters?", a: "Recruiters get a full ATS suite: Bulk Resume Dump parser, AI question generator, Brevo email & WhatsApp access codes, custom MCQ tests, and 11 soft-skill candidate reports with video playback." },
          { q: "Is the resume builder and ATS analyzer free?", a: "Yes, client-side PDF resume parsing, ATS scoring, and standard templates are free forever." },
          { q: "How are the 11 soft-skill scores calculated?", a: "We analyze verbal speech transcripts and audio pacing across fluency, speech clarity, confidence, professional tone, grammar, and presence of mind." }
        ].map((item, idx) => (
          <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => toggleFaq(idx)}
              className="w-full flex justify-between items-center p-5 text-left hover:bg-slate-50 transition"
            >
              <span className="font-bold text-slate-900 text-sm sm:text-base">{item.q}</span>
              <i className={`fas fa-chevron-down transition-transform ${openFaq === idx ? 'rotate-180 text-[#ff5722]' : 'text-slate-400'}`}></i>
            </button>
            {openFaq === idx && (
              <div className="p-5 bg-slate-50 text-slate-700 text-sm border-t border-slate-200 leading-relaxed">
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
  <section className="py-24 md:py-32 text-center relative overflow-hidden bg-white border-t border-slate-200">
    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#ff5722]/15 to-purple-600/15 rounded-full blur-3xl" />
    <div className="max-w-4xl mx-auto px-4 relative z-10">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold uppercase tracking-widest text-[#ff5722] mb-6 shadow-sm">
        Ready to Transform Hiring?
      </div>
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
        Master Your Next Tech Interview or Screen Top Talent
      </h2>
      <p className="text-slate-600 text-base sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
        Join over 50,000 candidates and forward-thinking recruiters accelerating career readiness with multi-engine AI.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link 
          to="/auth" 
          className="px-9 py-4 bg-[#ff5722] hover:bg-[#f4511e] text-white rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-[0_10px_30px_rgba(255,87,34,0.4)] hover:scale-105"
        >
          Get Started Now (Free)
        </Link>
        <Link 
          to="/auth" 
          className="px-9 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-md"
        >
          Recruiter Talent Suite
        </Link>
      </div>
    </div>
  </section>
);

// --- Day-Mode Crisp Footer ---
const Footer: React.FC = () => (
  <footer className="bg-white text-slate-800 py-12 md:py-16 border-t border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-b border-slate-200 pb-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Logo className="w-8 h-8 rounded-xl" isDark={false} />
            <span className="font-extrabold text-xl text-slate-900">InterviewXpert</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">
            Multi-engine AI mock interview simulator, ATS resume suite, and enterprise recruiter screening platform.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Platform</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><a href="#features" className="hover:text-[#ff5722] transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-[#ff5722] transition-colors">Pricing</a></li>
            <li><Link to="/our-journey" className="hover:text-[#ff5722] transition-colors">Our Journey</Link></li>
            <li><Link to="/blogs" className="hover:text-[#ff5722] transition-colors">Blog CMS</Link></li>
            <li><Link to="/status" className="hover:text-[#ff5722] transition-colors">System Health Status</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Company Prep Tracks</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link to="/tcs-mock-interview" className="hover:text-[#ff5722] transition-colors font-medium">TCS NQT Mock Interview</Link></li>
            <li><Link to="/infosys-mock-interview" className="hover:text-[#ff5722] transition-colors font-medium">Infosys SP & DSE Prep</Link></li>
            <li><Link to="/wipro-mock-interview" className="hover:text-[#ff5722] transition-colors font-medium">Wipro Elite Mock Practice</Link></li>
            <li><Link to="/coding-interview-practice" className="hover:text-[#ff5722] transition-colors font-medium">Coding & DSA Sandbox</Link></li>
            <li><Link to="/aptitude-test-practice" className="hover:text-[#ff5722] transition-colors font-medium">Aptitude Practice Tests</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Resources</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><a href="#jobs" className="hover:text-[#ff5722] transition-colors">Job Board</a></li>
            <li><Link to="/career-hub" className="hover:text-[#ff5722] transition-colors">Career Hub</Link></li>
            <li><Link to="/reviews" className="hover:text-[#ff5722] transition-colors">Reviews</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-[#ff5722] transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-[#ff5722] transition-colors">Terms of Service</Link></li>
            <li className="pt-2 mt-2 border-t border-slate-200">
              <Link to="/contact" className="flex items-center gap-2 text-slate-700 hover:text-[#ff5722] transition-colors font-medium">
                <Mail size={14} /> Contact Us
              </Link>
            </li>
            <li>
              <Link to="/report-bug" className="flex items-center gap-2 text-slate-700 hover:text-red-500 transition-colors font-medium">
                <Bug size={14} /> Report a Bug
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Get Started</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link to="/auth" className="hover:text-[#ff5722] transition-colors">Candidate Login</Link></li>
            <li><Link to="/auth" className="hover:text-[#ff5722] transition-colors">Free Sign Up</Link></li>
            <li><Link to="/auth" className="hover:text-[#ff5722] transition-colors">Recruiter Suite</Link></li>
            <li><Link to="/student/results" className="hover:text-[#ff5722] transition-colors">Student Results Portal</Link></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6">
        <div className="text-slate-500 text-xs">
          &copy; {new Date().getFullYear()} InterviewXpert. A Product of <a href="https://www.snab.co.in" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-700 hover:text-[#ff5722]">SNAB Innovations</a> (Nashik, Maharashtra, India).
        </div>

        <div className="text-center md:text-right">
          <div className="text-slate-600 text-sm mb-2 font-medium">
            Developed & Designed by
          </div>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-2 text-sm text-slate-700">
            {/* Aaradhya Pathak */}
            <div className="relative group inline-block cursor-pointer">
              <span className="font-bold text-[#ff5722] hover:text-[#ff7043] transition-colors border-b border-dashed border-[#ff5722]/50 pb-0.5">Aaradhya Pathak</span>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 bg-white text-slate-900 p-5 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:-translate-y-2 border border-slate-200">
                <div className="flex flex-col items-center text-center">
                  <img
                    src="https://i.ibb.co/hxk52kkC/Whats-App-Image-2025-03-21-at-20-13-16.jpg"
                    alt="Aaradhya Pathak"
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#ff5722] mb-2 shadow-md"
                  />
                  <h4 className="font-bold text-base text-slate-900">Aaradhya Pathak</h4>
                  <div className="text-[11px] font-bold text-[#ff5722] bg-[#ff5722]/10 px-2 py-0.5 rounded-full mb-2">Full Stack Developer</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                    Passionate MERN & AI stack developer proficient in building robust platforms, scalable cloud backends, and high-performance user interfaces.
                  </p>
                  <a href="https://portfolioaaradhya.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-[#ff5722] text-white text-xs font-bold px-4 py-1.5 rounded-full hover:bg-[#f4511e] transition-all shadow-md">
                    View Portfolio
                  </a>
                </div>
              </div>
            </div>
            <span>,</span>
            {/* Nimesh Kulkarni */}
            <span className="font-bold text-slate-800">Nimesh Kulkarni</span>
            <span>,</span>
            {/* Bhavesh Patil */}
            <span className="font-bold text-slate-800">Bhavesh Patil</span>
            <span>,</span>
            <span className="text-slate-600">Sanika Wadnekar</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main Home Component ---
const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#fafbfc] font-sans text-slate-900 selection:bg-[#ff5722]/30 selection:text-[#ff5722] transition-colors duration-300 overflow-x-hidden">
        <SEO />
        <Navbar />
        <main>
          <PhenomenonHero />
          <EnterpriseTrustGrid />
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
