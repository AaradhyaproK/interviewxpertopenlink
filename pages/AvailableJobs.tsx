import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { Search, Briefcase, MapPin, Building, ChevronRight, Lock } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import { ThemeProvider } from '../context/ThemeContext';

const AvailableJobsContent: React.FC = () => {
    const [jobs, setJobs] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchJobs = async () => {
            try {
                const snap = await getDocs(collection(db, 'interviews'));
                const validJobs = snap.docs
                    .map(d => ({ id: d.id, ...d.data() } as any))
                    .filter(j => !j.isMock && j.accessCode); // Only jobs with an access code
                setJobs(validJobs);
            } catch (err) {
                console.error("Error fetching jobs", err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(j => 
        (j.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
         j.companyName?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0B0C10] text-slate-900 dark:text-white font-sans relative overflow-hidden flex flex-col transition-colors duration-300">
            <Navbar />
            
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-100/50 to-slate-50 dark:from-blue-900/20 dark:to-[#0B0C10] pointer-events-none transition-colors duration-300"></div>
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none transition-colors duration-300"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[120px] pointer-events-none transition-colors duration-300"></div>

            <main className="flex-1 max-w-6xl w-full mx-auto px-6 relative z-10 pt-32 pb-20">
                <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
                   <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
                       Discover <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500">Available Jobs</span>
                   </h1>
                   <p className="text-slate-600 dark:text-gray-400 max-w-2xl mx-auto text-lg transition-colors duration-300">Browse our currently open positions and use their access codes to instantly begin your AI-powered interview assessment.</p>
                </div>

                <div className="max-w-xl mx-auto mb-16 relative animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 w-5 h-5 pointer-events-none transition-colors duration-300" />
                    <input 
                        type="text"
                        placeholder="Search by role or company..."
                        className="w-full bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-6 text-slate-900 dark:text-white outline-none focus:border-blue-500/50 dark:focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/20 transition-all shadow-lg dark:shadow-xl placeholder-slate-400 dark:placeholder-gray-500"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-500 transition-colors duration-300"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.length > 0 ? filteredJobs.map((job, idx) => (
                            <div key={job.id} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-500/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 group animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${(idx % 10) * 100}ms` }}>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl shadow-sm dark:shadow-inner border border-blue-100 dark:border-blue-500/20 transition-colors duration-300">
                                        {(job.companyName || 'C')[0]}
                                    </div>
                                    <div className="bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 text-purple-700 dark:text-purple-300 px-3 py-1.5 text-xs rounded-full font-bold flex items-center gap-1.5 shadow-sm transition-colors duration-300">
                                        <Lock size={12} /> Access Code: <span className="font-mono bg-purple-100 dark:bg-purple-500/20 px-1 rounded transition-colors duration-300">{job.accessCode}</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{job.title || 'Role'}</h3>
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400 transition-colors duration-300">
                                        <Building size={14} className="text-slate-400 dark:text-gray-500 transition-colors duration-300" /> {job.companyName || 'Company'}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400 transition-colors duration-300">
                                        <MapPin size={14} className="text-slate-400 dark:text-gray-500 transition-colors duration-300" /> {job.location || 'Remote'}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400 transition-colors duration-300">
                                        <Briefcase size={14} className="text-slate-400 dark:text-gray-500 transition-colors duration-300" /> {job.employmentType || 'Full Time'}
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => navigate('/interview/' + job.id)}
                                    className="w-full py-3.5 rounded-xl bg-blue-50 hover:bg-blue-600 dark:bg-blue-600/20 dark:hover:bg-blue-600 text-blue-700 hover:text-white dark:text-blue-300 dark:hover:text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md dark:group-hover:shadow-lg dark:group-hover:shadow-blue-600/30"
                                >
                                    Enter Code & Apply <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        )) : (
                            <div className="col-span-full py-20 text-center">
                                <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200 dark:border-white/10 transition-colors duration-300">
                                    <Search className="w-8 h-8 text-slate-400 dark:text-gray-500 transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">No jobs found</h3>
                                <p className="text-slate-500 dark:text-gray-500 max-w-md mx-auto transition-colors duration-300">We couldn't find any open positions matching "{searchTerm}". Try adjusting your search filters.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

const AvailableJobs: React.FC = () => {
    return (
        <ThemeProvider>
            <AvailableJobsContent />
        </ThemeProvider>
    );
};

export default AvailableJobs;