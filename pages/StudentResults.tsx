import React, { useState, useMemo } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Search, ChevronRight, Award, AlertTriangle, FileText, Code, CheckCircle, Clock, X, TrendingUp, Target, Zap, BrainCircuit, Activity, Share2, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const StudentResults: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [selectedResult, setSelectedResult] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    const urlEmail = searchParams.get('email');
    if (urlEmail && !hasSearched) {
      setEmail(urlEmail);
      fetchResults(urlEmail);
    }
  }, [searchParams, hasSearched]);

  const fetchResults = async (searchEmail: string) => {
    if (!searchEmail.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const q = query(
        collection(db, 'testSubmissions'),
        where('candidateEmail', '==', searchEmail.trim().toLowerCase())
      );
      const snap = await getDocs(q);
      const submissions = snap.docs.map(d => ({ id: d.id, ...d.data() }));

      const detailedResults = await Promise.all(
        submissions.map(async (sub: any) => {
          let testData = { title: 'Unknown Test', type: 'aptitude', topic: 'General' };
          if (sub.testId) {
            try {
              const testDoc = await getDoc(doc(db, 'tests', sub.testId));
              if (testDoc.exists()) {
                const data = testDoc.data();
                testData = {
                  title: data.title || data.examName || 'Assessment',
                  type: data.type || 'aptitude',
                  topic: data.topic || 'General',
                  questions: data.questions || []
                };
              }
            } catch (err) {
              console.error('Failed to fetch test info for', sub.testId);
            }
          }
          return { ...sub, testData };
        })
      );

      // Sort by most recent first
      detailedResults.sort((a, b) => {
        const dateA = a.submittedAt?.toDate ? a.submittedAt.toDate().getTime() : 0;
        const dateB = b.submittedAt?.toDate ? b.submittedAt.toDate().getTime() : 0;
        return dateB - dateA;
      });

      setResults(detailedResults);
    } catch (error) {
      console.error("Search error:", error);
      alert("Failed to load results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ email: email.trim() });
    fetchResults(email.trim());
  };

  const handleShare = async () => {
    // Correctly build the URL for both HashRouter and BrowserRouter
    const basePath = window.location.href.split('?')[0];
    const shareUrl = `${basePath}?email=${encodeURIComponent(email)}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback for non-secure contexts (like accessing dev server via IP address)
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        
        // Move textarea out of viewport so it's invisible
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
      // If all else fails, just prompt the user
      alert(`Could not auto-copy. Here is the link to share:\n\n${shareUrl}`);
    }
  };

  const analyticsData = useMemo(() => {
    if (!results || results.length === 0) return null;

    const totalTests = results.length;
    const passedTests = results.filter(r => r.status === 'passed').length;
    const avgScore = Math.round(results.reduce((acc, curr) => acc + (curr.score || 0), 0) / totalTests);
    const highestScore = Math.max(...results.map(r => r.score || 0));

    // Chronological order for timeline chart
    const timelineData = [...results].reverse().map(r => ({
      name: r.testData.title?.length > 15 ? r.testData.title.substring(0, 15) + '...' : (r.testData.title || 'Assessment'),
      score: r.score || 0,
      date: r.submittedAt?.toDate ? r.submittedAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '',
      status: r.status
    }));

    // Topic performance for Radar chart
    const topicStats: Record<string, { totalScore: number; count: number }> = {};
    results.forEach(r => {
      const topic = r.testData.topic || 'General';
      if (!topicStats[topic]) topicStats[topic] = { totalScore: 0, count: 0 };
      topicStats[topic].totalScore += (r.score || 0);
      topicStats[topic].count += 1;
    });

    const topicData = Object.keys(topicStats).map(topic => ({
      subject: topic,
      score: Math.round(topicStats[topic].totalScore / topicStats[topic].count),
      fullMark: 100
    }));

    let performanceLabel = "Needs Improvement";
    let performanceColor = "text-orange-500";
    if (avgScore >= 90) { performanceLabel = "Outstanding"; performanceColor = "text-purple-500"; }
    else if (avgScore >= 75) { performanceLabel = "Excellent"; performanceColor = "text-green-500"; }
    else if (avgScore >= 60) { performanceLabel = "Good Progress"; performanceColor = "text-blue-500"; }

    return { totalTests, passedTests, avgScore, highestScore, timelineData, topicData, performanceLabel, performanceColor };
  }, [results]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-4 rounded-xl shadow-xl border ${isDark ? 'bg-black/90 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'} backdrop-blur-md`}>
          <p className="font-bold mb-1">{label}</p>
          <p className="text-sm opacity-80 mb-2">{payload[0].payload.date}</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <p className="font-bold">Score: <span className="text-blue-500">{payload[0].value}%</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`min-h-screen p-4 sm:p-6 md:p-12 ${isDark ? 'bg-[#050505] text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl shadow-blue-500/30 mb-4 md:mb-6">
            <Award className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 leading-tight">
            Student Analytics Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-base md:text-lg font-medium px-4">
            Enter your email to uncover deep insights into your assessment performance, progress trends, and skill analysis.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-[#111] p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-gray-200 dark:border-white/10 mb-10 md:mb-12 max-w-4xl mx-auto"
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-4 md:left-5 flex items-center pointer-events-none transition-transform group-focus-within:scale-110 group-focus-within:text-blue-500">
                <Search className="text-gray-400 w-5 h-5 md:w-[22px] md:h-[22px]" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email address"
                required
                className="w-full pl-12 md:pl-14 pr-4 py-4 md:py-5 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-base md:text-lg"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email}
              className="px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl md:rounded-2xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base md:text-lg"
            >
              {loading ? (
                <div className="w-5 h-5 md:w-6 md:h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>Analyze <ChevronRight size={20} /></>
              )}
            </button>
          </form>
        </motion.div>

        {hasSearched && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 md:space-y-12"
          >
            {results.length === 0 ? (
              <div className="bg-white dark:bg-[#111] p-10 md:p-16 rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/10 text-center shadow-sm max-w-4xl mx-auto">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                  <Search className="w-10 h-10 md:w-10 md:h-10" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">No records found</h3>
                <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg">
                  We couldn't find any assessments associated with <strong>{email}</strong>. 
                  Please ensure you used this exact email when taking the test.
                </p>
              </div>
            ) : (
              <>
                {/* Analytics Dashboard Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 border-b border-gray-200 dark:border-white/10 pb-4 md:pb-6">
                  <div>
                    <div className="flex items-center gap-4">
                      <h2 className="text-2xl md:text-3xl font-black flex items-center gap-2 md:gap-3">
                        <Activity className="text-blue-500 w-6 h-6 md:w-8 md:h-8" />
                        Performance Dashboard
                      </h2>
                      <button 
                        onClick={handleShare}
                        className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold rounded-lg transition-colors text-sm"
                      >
                        {copied ? <Check size={16} /> : <Share2 size={16} />}
                        {copied ? 'Copied!' : 'Share to Parents'}
                      </button>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 md:mt-2 text-base md:text-lg flex flex-col sm:flex-row sm:items-center gap-2">
                      <span>Based on <strong className="text-gray-900 dark:text-white">{analyticsData?.totalTests}</strong> completed assessments</span>
                      <button 
                        onClick={handleShare}
                        className="md:hidden flex items-center gap-1.5 px-3 py-1 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold rounded-lg transition-colors text-xs w-max"
                      >
                        {copied ? <Check size={14} /> : <Share2 size={14} />}
                        {copied ? 'Link Copied!' : 'Share Report'}
                      </button>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 bg-white dark:bg-[#1a1a1a] p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm w-full md:w-auto mt-2 md:mt-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 dark:bg-black flex items-center justify-center shrink-0">
                      <BrainCircuit className={analyticsData?.performanceColor} size={20} />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">Overall Status</p>
                      <p className={`text-lg md:text-xl font-black leading-tight ${analyticsData?.performanceColor}`}>
                        {analyticsData?.performanceLabel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {[
                    { label: 'Average Score', value: `${analyticsData?.avgScore}%`, icon: Target, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
                    { label: 'Highest Score', value: `${analyticsData?.highestScore}%`, icon: Award, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
                    { label: 'Tests Passed', value: analyticsData?.passedTests, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-500/10' },
                    { label: 'Total Attempted', value: analyticsData?.totalTests, icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10' },
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white dark:bg-[#111] p-5 md:p-6 rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
                    >
                      <div className={`w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl md:rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                        <stat.icon className="w-6 h-6 md:w-7 md:h-7" />
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-bold text-gray-500 dark:text-gray-400">{stat.label}</p>
                        <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight mt-0.5">{stat.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Progress Timeline */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-white dark:bg-[#111] p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
                          <TrendingUp className="text-blue-500 w-5 h-5 md:w-6 md:h-6" />
                          Score Progression
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 mt-1">Your performance over time across all tests</p>
                      </div>
                    </div>
                    <div className="h-[250px] md:h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analyticsData?.timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#eee'} vertical={false} />
                          <XAxis 
                            dataKey="name" 
                            stroke={isDark ? '#666' : '#999'} 
                            tick={{ fontSize: 11 }} 
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis 
                            stroke={isDark ? '#666' : '#999'} 
                            tick={{ fontSize: 11 }} 
                            tickLine={false}
                            axisLine={false}
                            domain={[0, 100]}
                          />
                          <RechartsTooltip content={<CustomTooltip />} />
                          <Area 
                            type="monotone" 
                            dataKey="score" 
                            stroke="#3b82f6" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorScore)" 
                            activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  {/* Skill Radar */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white dark:bg-[#111] p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm"
                  >
                    <h3 className="text-lg md:text-xl font-bold flex items-center gap-2 mb-1 md:mb-2">
                      <Target className="text-purple-500 w-5 h-5 md:w-6 md:h-6" />
                      Skill Analysis
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">Average score by topic</p>
                    <div className="h-[250px] md:h-[280px] w-full">
                      {analyticsData?.topicData && analyticsData.topicData.length > 2 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="65%" data={analyticsData.topicData}>
                            <PolarGrid stroke={isDark ? '#333' : '#eee'} />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: isDark ? '#aaa' : '#666', fontSize: 11 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name="Score" dataKey="score" stroke="#8b5cf6" strokeWidth={2} fill="#8b5cf6" fillOpacity={0.5} />
                            <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', backgroundColor: isDark ? '#1a1a1a' : '#fff', color: isDark ? '#fff' : '#000', fontSize: '12px' }}/>
                          </RadarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-4">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3 md:mb-4 text-gray-400">
                            <BrainCircuit size={24} className="md:w-7 md:h-7" />
                          </div>
                          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">Take tests across at least 3 different topics to unlock your detailed skill radar.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Detailed Results List */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                    <FileText className="text-gray-400 w-6 h-6 md:w-7 md:h-7" />
                    All Assessment Records
                    <span className="ml-1 md:ml-2 bg-gray-100 dark:bg-gray-800 text-xs md:text-sm px-2 md:px-3 py-1 rounded-full">{results.length}</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {results.map((result, i) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + (i * 0.05) }}
                        key={i} 
                        className="bg-white dark:bg-[#111] rounded-2xl md:rounded-3xl p-5 md:p-6 border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                      >
                        <div className={`absolute top-0 left-0 w-1.5 md:w-2 h-full ${
                          result.status === 'passed' ? 'bg-green-500' : 
                          result.status === 'failed' ? 'bg-red-500' : 
                          result.status === 'terminated' ? 'bg-orange-500' : 'bg-gray-500'
                        }`}></div>
                        
                        <div className="pl-3 md:pl-4">
                          <div className="flex justify-between items-start mb-4 md:mb-5">
                            <div className="flex items-center gap-3 md:gap-4">
                              <div className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl shrink-0 ${result.testData.type === 'coding' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'}`}>
                                {result.testData.type === 'coding' ? <Code className="w-5 h-5 md:w-6 md:h-6" /> : <FileText className="w-5 h-5 md:w-6 md:h-6" />}
                              </div>
                              <div className="min-w-0">
                                <p className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest truncate">{result.testData.type}</p>
                                <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white truncate mt-0.5" title={result.testData.title}>{result.testData.title}</h3>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-5">
                            <div className="bg-gray-50 dark:bg-[#1a1a1a] p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 dark:border-white/5 relative overflow-hidden">
                              <div className="absolute -right-3 -bottom-3 md:-right-4 md:-bottom-4 opacity-5 text-gray-900 dark:text-white">
                                <Award className="w-12 h-12 md:w-16 md:h-16" />
                              </div>
                              <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Score</p>
                              <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white relative z-10">{result.score}%</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-[#1a1a1a] p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 dark:border-white/5 relative overflow-hidden">
                              <div className="absolute -right-3 -bottom-3 md:-right-4 md:-bottom-4 opacity-5 text-gray-900 dark:text-white">
                                <Activity className="w-12 h-12 md:w-16 md:h-16" />
                              </div>
                              <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Status</p>
                              <div className="flex items-center gap-1.5 mt-1 md:mt-2 relative z-10">
                                {result.status === 'passed' ? <span className="flex items-center gap-1 md:gap-1.5 text-xs md:text-sm font-bold text-green-600 dark:text-green-400"><CheckCircle size={16}/> Passed</span> : 
                                 result.status === 'failed' ? <span className="flex items-center gap-1 md:gap-1.5 text-xs md:text-sm font-bold text-red-600 dark:text-red-400"><AlertTriangle size={16}/> Failed</span> : 
                                 result.status === 'terminated' ? <span className="flex items-center gap-1 md:gap-1.5 text-xs md:text-sm font-bold text-orange-600 dark:text-orange-400"><AlertTriangle size={16}/> Terminated</span> : 
                                 <span className="text-xs md:text-sm font-bold text-gray-600 dark:text-gray-400 capitalize">{result.status || 'Pending'}</span>}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-3 md:pt-4 border-t border-gray-100 dark:border-white/10 mb-4 md:mb-5">
                            <span className="flex items-center gap-1.5 text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
                              <Clock size={14} className="md:w-4 md:h-4" /> 
                              {result.submittedAt?.toDate ? result.submittedAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown date'}
                            </span>
                            {result.testData.topic && (
                              <span className="text-[10px] md:text-xs font-bold bg-gray-100 dark:bg-white/10 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-gray-600 dark:text-gray-300 truncate max-w-[120px]">
                                {result.testData.topic}
                              </span>
                            )}
                          </div>
                          <button 
                            onClick={() => setSelectedResult(result)}
                            className="w-full py-3 md:py-3.5 bg-gray-50 hover:bg-blue-50 dark:bg-white/5 dark:hover:bg-blue-900/20 text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 border border-gray-200 dark:border-white/10 text-sm md:text-base font-bold rounded-xl md:rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:border-blue-500/30"
                          >
                            <FileText size={16} className="md:w-[18px] md:h-[18px]" /> View Detailed Report
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>

      {/* Detailed Report Modal */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4" onClick={() => setSelectedResult(null)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white dark:bg-[#111] rounded-2xl md:rounded-[2rem] w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] flex flex-col shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden" 
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 md:p-8 border-b border-gray-200 dark:border-white/10 flex justify-between items-start bg-gray-50 dark:bg-[#1a1a1a]">
              <div className="pr-4">
                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                  <div className="p-1.5 md:p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg md:rounded-xl shrink-0">
                    <FileText className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
                    Assessment Report
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-lg font-medium truncate">{selectedResult.testData.title}</p>
              </div>
              <button onClick={() => setSelectedResult(null)} className="p-2 md:p-3 shrink-0 bg-white dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors border border-gray-200 dark:border-white/10 shadow-sm">
                <X size={20} className="text-gray-900 dark:text-white" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 custom-scrollbar bg-white dark:bg-[#111]">
              {/* Stats Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-10">
                <div className="bg-gray-50 dark:bg-[#1a1a1a] p-3 md:p-5 rounded-xl md:rounded-2xl border border-gray-200 dark:border-white/10 text-center relative overflow-hidden">
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase font-black tracking-widest mb-1 md:mb-2 relative z-10">Total Qs</p>
                  <p className="text-2xl md:text-3xl font-black relative z-10">{selectedResult.testData.questions?.length || 0}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/10 p-3 md:p-5 rounded-xl md:rounded-2xl border border-blue-200 dark:border-blue-800/30 text-center relative overflow-hidden">
                  <p className="text-[10px] md:text-xs text-blue-600 dark:text-blue-400 uppercase font-black tracking-widest mb-1 md:mb-2 relative z-10">Attempted</p>
                  <p className="text-2xl md:text-3xl font-black text-blue-700 dark:text-blue-300 relative z-10">
                    {(selectedResult.testData.questions?.length || 0) - (selectedResult.stats?.unattempted || 0)}
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/10 p-3 md:p-5 rounded-xl md:rounded-2xl border border-green-200 dark:border-green-800/30 text-center relative overflow-hidden">
                  <p className="text-[10px] md:text-xs text-green-600 dark:text-green-400 uppercase font-black tracking-widest mb-1 md:mb-2 relative z-10">Correct</p>
                  <p className="text-2xl md:text-3xl font-black text-green-700 dark:text-green-300 relative z-10">{selectedResult.stats?.correct || 0}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/10 p-3 md:p-5 rounded-xl md:rounded-2xl border border-red-200 dark:border-red-800/30 text-center relative overflow-hidden">
                  <p className="text-[10px] md:text-xs text-red-600 dark:text-red-400 uppercase font-black tracking-widest mb-1 md:mb-2 relative z-10">Wrong</p>
                  <p className="text-2xl md:text-3xl font-black text-red-700 dark:text-red-300 relative z-10">{selectedResult.stats?.incorrect || 0}</p>
                </div>
              </div>

              {/* Questions / Feedback */}
              {selectedResult.testData.type === 'coding' ? (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 p-5 md:p-8 rounded-2xl md:rounded-3xl border border-blue-100 dark:border-blue-800/30">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <BrainCircuit className="text-blue-600 dark:text-blue-400 w-6 h-6 md:w-7 md:h-7" />
                    <h4 className="text-lg md:text-xl font-black text-blue-900 dark:text-blue-300">AI Code Analysis</h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">{selectedResult.feedback || 'No feedback provided.'}</p>
                </div>
              ) : (
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 border-b border-gray-200 dark:border-white/10 pb-3 md:pb-4">
                    <Target className="text-gray-400 w-5 h-5 md:w-6 md:h-6" />
                    <h4 className="text-lg md:text-xl font-black text-gray-900 dark:text-white">Question Breakdown</h4>
                  </div>
                  {selectedResult.testData.questions?.map((q: any, i: number) => {
                    const isCorrect = selectedResult.answers?.[i] === q.correctIndex;
                    const hasAnswered = selectedResult.answers?.[i] !== undefined && selectedResult.answers?.[i] !== '';
                    
                    return (
                      <div key={i} className={`p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 ${!hasAnswered ? 'border-gray-200 bg-gray-50 dark:bg-[#1a1a1a] dark:border-white/5' : isCorrect ? 'border-green-200 bg-green-50/50 dark:bg-green-900/5 dark:border-green-800/30' : 'border-red-200 bg-red-50/50 dark:bg-red-900/5 dark:border-red-800/30'}`}>
                        <div className="font-bold mb-3 md:mb-4 text-sm md:text-lg text-gray-900 dark:text-white flex items-start gap-2 md:gap-3">
                          <span className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                            {i + 1}
                          </span> 
                          <div className="pt-0.5 md:pt-1 leading-snug"><Latex>{q.question}</Latex></div>
                        </div>
                        <div className="flex flex-col gap-2 md:gap-3 mt-3 md:mt-4">
                          <div className={`flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl border ${!hasAnswered ? 'bg-white dark:bg-black/40 border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-400' : isCorrect ? 'bg-green-100/50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50 text-green-800 dark:text-green-300' : 'bg-red-100/50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50 text-red-800 dark:text-red-300'}`}>
                            <div className="flex-shrink-0">
                              {!hasAnswered ? <AlertTriangle size={18} className="md:w-5 md:h-5"/> : isCorrect ? <CheckCircle size={18} className="md:w-5 md:h-5"/> : <X size={18} className="md:w-5 md:h-5"/>}
                            </div>
                            <div className="font-medium text-xs md:text-base">
                              <span className="opacity-70 text-[10px] md:text-xs uppercase tracking-wider block mb-0.5">Your Answer</span>
                              {hasAnswered ? <Latex>{q.options[selectedResult.answers[i]]}</Latex> : 'Skipped'}
                            </div>
                          </div>
                          {!isCorrect && (
                            <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-white/5 text-gray-900 dark:text-white">
                              <CheckCircle size={18} className="text-green-500 flex-shrink-0 md:w-5 md:h-5" />
                              <div className="font-medium text-xs md:text-base">
                                <span className="opacity-50 text-[10px] md:text-xs uppercase tracking-wider block mb-0.5">Correct Answer</span>
                                <Latex>{q.options[q.correctIndex]}</Latex>
                              </div>
                            </div>
                          )}
                        </div>
                        {q.explanation && (
                          <div className="mt-3 md:mt-4 p-4 md:p-5 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl md:rounded-2xl text-xs md:text-base text-gray-700 dark:text-gray-300">
                            <div className="font-bold text-blue-700 dark:text-blue-400 mb-1.5 md:mb-2 flex items-center gap-1.5 md:gap-2">
                              <span className="text-lg md:text-xl">💡</span> Explanation
                            </div>
                            <div className="leading-relaxed"><Latex>{q.explanation}</Latex></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StudentResults;
