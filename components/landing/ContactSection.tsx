import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  PhoneCall, 
  ArrowUpRight, 
  Send, 
  Building2, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setIsSubmitting(true);

    // Build mailto link for direct delivery to hello@snab.co.in
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\n\nMessage:\n${formData.message}`
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.location.href = `mailto:hello@snab.co.in?subject=${subject}&body=${body}`;
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 relative overflow-hidden bg-white border-t border-[#E2E8F0] transition-colors duration-500">
      
      {/* Soft Ambient Radial Light */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unified Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-2.5 font-mono">
            / get in touch /
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
            We'd love to hear from you.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] font-sans font-normal leading-relaxed">
            Tell us what you are trying to improve, automate, or launch. We will help shape the right product and a practical path to production.
          </p>
        </div>

        {/* Two-Column Grid: Contact Info (Left) & Send Message Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Contact Information */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Address Block */}
            <div className="p-6 rounded-[24px] bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm hover:border-[#CBD5E1] transition-all">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-white text-[#2563EB] flex items-center justify-center border border-[#E2E8F0] shadow-sm">
                  <MapPin size={17} />
                </div>
                <h3 className="font-display text-sm font-bold text-[#0F172A] uppercase tracking-wider">
                  Address
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#0F172A] font-semibold leading-relaxed font-sans">
                Nashik, Maharashtra<br />
                <span className="text-[#64748B] font-normal">India 422005</span>
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Nashik%2C%20Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] mt-3 font-sans group"
              >
                <span>Get directions</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Email Block */}
            <div className="p-6 rounded-[24px] bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm hover:border-[#CBD5E1] transition-all">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-white text-emerald-600 flex items-center justify-center border border-[#E2E8F0] shadow-sm">
                  <Mail size={17} />
                </div>
                <h3 className="font-display text-sm font-bold text-[#0F172A] uppercase tracking-wider">
                  Email
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#0F172A] font-semibold font-mono">
                hello@snab.co.in
              </p>
              <a
                href="mailto:hello@snab.co.in"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] mt-3 font-sans group"
              >
                <span>Send mail</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Phone / Discovery Call Block */}
            <div className="p-6 rounded-[24px] bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm hover:border-[#CBD5E1] transition-all">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-white text-purple-600 flex items-center justify-center border border-[#E2E8F0] shadow-sm">
                  <PhoneCall size={17} />
                </div>
                <h3 className="font-display text-sm font-bold text-[#0F172A] uppercase tracking-wider">
                  Phone & Discovery
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#0F172A] font-semibold font-sans">
                Book a discovery call
              </p>
              <a
                href="mailto:hello@snab.co.in?subject=Book%20a%20project%20call"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] mt-3 font-sans group"
              >
                <span>Schedule a call</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Enterprise & Campus Inquiries */}
            <div className="p-5 rounded-[22px] bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-sans space-y-2">
              <div className="flex items-center gap-2 text-[#1D4ED8] font-bold">
                <Building2 size={15} />
                <span>Enterprise & Campus Drives</span>
              </div>
              <p className="text-[#1E3A8A] leading-relaxed text-[11px]">
                For custom ATS evaluation rubrics, batch student assessments, or multi-seat recruiter licenses, contact us directly at <strong className="font-mono text-[#0F172A]">hello@snab.co.in</strong>.
              </p>
            </div>

            {/* Follow Us Block */}
            <div className="pt-2 flex items-center gap-3 text-xs font-sans text-[#64748B]">
              <span className="font-bold text-[#0F172A]">Follow us:</span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#2563EB] transition-colors">LinkedIn</a>
              <span>&bull;</span>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#2563EB] transition-colors">Twitter (X)</a>
              <span>&bull;</span>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#2563EB] transition-colors">GitHub</a>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Send a Message Form */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[28px] p-6 sm:p-9 shadow-sm">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-1 font-mono">
                / send a message /
              </p>
              <h3 className="font-display text-2xl font-bold text-[#0F172A]">
                Get In Touch
              </h3>
            </div>

            {submitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                <span>Thank you! Your message client is opening to connect directly with <strong>hello@snab.co.in</strong>.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5 uppercase font-sans">
                  Name <span className="text-[#2563EB]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 outline-none text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5 uppercase font-sans">
                    Email <span className="text-[#2563EB]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 outline-none text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5 uppercase font-sans">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 outline-none text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5 uppercase font-sans">
                  Message <span className="text-[#2563EB]">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us what you are trying to improve, automate, or launch..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 outline-none text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] transition-all resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-[0_4px_14px_rgba(37,99,235,0.25)] flex items-center justify-center gap-2 font-sans disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BIG DESIGNER "POWERED BY SNAB" BRANDING BANNER */}
        {/* ========================================================================= */}
        <div className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white border border-slate-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 bg-[#2563EB]/20 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-[#93C5FD] mb-3">
              <Sparkles size={12} className="text-[#60A5FA]" />
              <span>Next-Gen Engineering & AI Systems</span>
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Powered by <span className="text-[#60A5FA]">SNAB</span>
            </h3>
            
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300 font-sans max-w-xl leading-relaxed">
              Architected and engineered by SNAB. Delivering high-throughput conversational intelligence, automated pipelines, and enterprise systems.
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex items-center gap-3">
            <a
              href="mailto:hello@snab.co.in?subject=Enterprise%20AI%20Inquiry%20via%20InterviewXpert"
              className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#0F172A] font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 font-sans active:scale-95"
            >
              <span>Enterprise Contact</span>
              <ExternalLink size={14} />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
