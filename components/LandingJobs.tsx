import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db, auth } from '../services/firebase';
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
    <section id="jobs" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore <span className="text-blue-600 dark:text-blue-400">Active Opportunities</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover roles that match your skills and aspirations. Join top companies hiring now.
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No active job openings at the moment. Please check back later.</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div 
              key={job.id}
              className="group relative bg-white/70 dark:bg-[#111111]/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_40px_-15px_rgba(59,130,246,0.3)] border border-white/50 dark:border-white/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col z-10"
            >
              {/* Subtle Animated Background Splashes */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl -mr-24 -mt-24 transition-transform duration-700 group-hover:scale-150" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-2xl -ml-16 -mb-16 transition-transform duration-700 group-hover:scale-150" />
              
              {/* Glassy Top Reflection Edge */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/70 dark:via-white/30 to-transparent"></div>

              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner border border-white/60 dark:border-blue-800/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <Building2 size={32} strokeWidth={1.5} />
                </div>
                {job.createdAt?.toDate && (new Date().getTime() - job.createdAt.toDate().getTime()) < 7 * 24 * 60 * 60 * 1000 && (
                  <span className="px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/30">
                    New
                  </span>
                )}
              </div>

              <div className="mb-5 relative z-10">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1.5 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 line-clamp-1">
                  {job.jobTitle}
                </h3>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wide">{job.companyName}</p>
                {job.accessCode && (
                   <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/50 shadow-sm shadow-purple-500/5">
                     <div className="bg-purple-100 dark:bg-purple-900/50 p-1 rounded-md"><Lock size={12} /></div>
                     Code: {job.accessCode}
                   </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-5 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100/80 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-white/5 backdrop-blur-sm">
                  <MapPin size={14} className="text-blue-500 dark:text-blue-400" /> {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100/80 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-white/5 backdrop-blur-sm">
                  <Briefcase size={14} className="text-orange-500 dark:text-orange-400" /> {job.jobType || 'Full-time'}
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 mb-6 relative z-10 flex-grow">
                {job.jobDescription?.replace(/<[^>]*>/g, '') || 'View details to learn more about this exciting opportunity and apply today.'}
              </p>

              <div className="space-y-4 mb-8 relative z-10">
                {job.salaryRange && (
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-900 dark:text-white">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 shadow-inner">
                      <DollarSign size={16} />
                    </div>
                    <span>{job.salaryRange}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                    <Clock size={14} />
                    <span>Posted {job.createdAt?.toDate ? new Date(job.createdAt.toDate()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently'}</span>
                </div>
              </div>

              <button 
                onClick={() => handleApply(job.id)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-200 text-white dark:text-black font-bold text-sm tracking-wide md:text-base hover:from-blue-600 hover:to-indigo-600 dark:hover:from-blue-500 dark:hover:to-indigo-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] relative z-10 overflow-hidden group/btn"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">Enter Code & Apply <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" /></span>
              </button>
            </div>
          ))}
        </div>
        )}

        <div className="mt-20 text-center">
            <button 
                onClick={() => handleApply()}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-black hover:text-blue-600 dark:hover:text-blue-400 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 group"
            >
                View All Available Jobs 
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <ArrowRight size={16} />
                </div>
            </button>
        </div>
      </div>
    </section>
  );
};

export default LandingJobs;