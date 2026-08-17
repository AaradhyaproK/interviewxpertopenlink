import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Building2, DollarSign, Briefcase, Lock } from 'lucide-react';

interface Job {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string;
  salaryRange?: string;
  status: string;
  createdAt: any;
  deadline?: string;
  isMock?: boolean;
  jobDescription?: string;
  accessCode?: string;
  title?: string;
}

const LandingJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(
          collection(db, 'interviews'),
          limit(50)
        );
        
        const querySnapshot = await getDocs(q);
        const jobsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          jobTitle: doc.data().title || doc.data().jobTitle || 'Role'
        })) as Job[];

        // Filter valid Open Link Interviews
        const validJobs = jobsData
          .filter(job => !job.isMock && job.accessCode)
          .sort((a, b) => {
            const dateA = a.createdAt?.seconds || 0;
            const dateB = b.createdAt?.seconds || 0;
            return dateB - dateA;
          })
          .slice(0, 6);

        setJobs(validJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (id?: string) => {
    if (id && typeof id === 'string') {
        navigate('/interview/' + id);
    } else {
        navigate('/available-jobs');
    }
  };

  if (loading) return null;

  return (
    <section id="jobs" className="py-16 sm:py-20 relative overflow-hidden bg-white border-t border-[#E2E8F0] transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unified Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563EB] mb-2.5 font-sans">
            Openings
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight">
            Explore verified opportunities.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#64748B] font-sans font-normal leading-relaxed">
            Apply to verified roles and complete your technical round online with transparent scoring.
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-12 bg-[#F8FAFC] rounded-[22px] border border-[#E2E8F0] p-6">
            <p className="text-[#64748B] text-sm font-sans">New opportunities are published regularly. Check back soon or explore practice tracks.</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {jobs.map((job) => (
            <div 
              key={job.id}
              className="bg-[#F8FAFC] rounded-[22px] p-5 sm:p-5.5 shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] border border-[#E2E8F0] hover:border-[#2563EB]/40 transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#2563EB] border border-[#E2E8F0] shadow-sm">
                    <Building2 size={16} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {job.accessCode && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-white text-[#0F172A] border border-[#E2E8F0]">
                        <Lock size={10} className="text-[#2563EB]" /> {job.accessCode}
                      </span>
                    )}
                    {job.createdAt?.toDate && (new Date().getTime() - job.createdAt.toDate().getTime()) < 7 * 24 * 60 * 60 * 1000 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]">
                        New
                      </span>
                    )}
                  </div>
                </div>

                {/* Job Title & Company */}
                <div className="mb-2.5">
                  <h3 className="font-display text-[15px] font-bold text-[#0F172A] line-clamp-1 leading-snug">
                    {job.jobTitle}
                  </h3>
                  <p className="text-xs text-[#64748B] font-sans font-normal mt-0.5">{job.companyName}</p>
                </div>
                
                {/* Meta Pills */}
                <div className="flex flex-wrap gap-1.5 mb-2.5 font-sans">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-normal bg-white text-[#64748B] border border-[#E2E8F0]">
                    <MapPin size={10} className="text-[#2563EB]" /> {job.location || 'Remote'}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-normal bg-white text-[#64748B] border border-[#E2E8F0]">
                    <Briefcase size={10} className="text-[#64748B]" /> {job.jobType || 'Full-time'}
                  </span>
                  {job.salaryRange && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-white text-emerald-700 border border-[#E2E8F0]">
                      <DollarSign size={10} /> {job.salaryRange}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2 mb-4 font-sans">
                  {job.jobDescription?.replace(/<[^>]*>/g, '') || 'Review specifications and complete the initial structured round.'}
                </p>
              </div>

              {/* Card Footer: Date & Apply Action */}
              <div className="pt-3 border-t border-[#E2E8F0]">
                <div className="flex items-center justify-between text-[11px] text-[#94A3B8] font-sans mb-2.5">
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {job.createdAt?.toDate ? new Date(job.createdAt.toDate()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently'}
                  </span>
                  <span className="text-[#2563EB] font-medium">Verified Round</span>
                </div>

                <button 
                  onClick={() => handleApply(job.id)}
                  className="w-full py-2.5 rounded-full bg-[#0F172A] hover:bg-[#2563EB] text-white font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm font-sans active:scale-[0.98]"
                >
                  <span>Apply & Interview</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        <div className="mt-8 text-center">
          <button 
            onClick={() => handleApply()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F8FAFC] hover:bg-[#EFF6FF] text-[#0F172A] font-semibold text-xs sm:text-sm border border-[#E2E8F0] transition-all shadow-sm font-sans"
          >
            <span>View All Active Roles</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default LandingJobs;