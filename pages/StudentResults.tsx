import React, { useState } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Search, ChevronRight, Award, AlertTriangle, FileText, Code, CheckCircle, Clock, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

const StudentResults: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [selectedResult, setSelectedResult] = useState<any | null>(null);
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      // Fetch all submissions for this email
      const q = query(
        collection(db, 'testSubmissions'),
        where('candidateEmail', '==', email.trim().toLowerCase())
      );
      const snap = await getDocs(q);
      const submissions = snap.docs.map(d => ({ id: d.id, ...d.data() }));

      // Fetch corresponding test details for each submission
      const detailedResults = await Promise.all(
        submissions.map(async (sub: any) => {
          let testData = { title: 'Unknown Test', type: 'aptitude', topic: '' };
          if (sub.testId) {
            try {
              const testDoc = await getDoc(doc(db, 'tests', sub.testId));
              if (testDoc.exists()) {
                const data = testDoc.data();
                testData = {
                  title: data.title || data.examName || 'Assessment',
                  type: data.type || 'aptitude',
                  topic: data.topic || '',
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

  return (
    <div className={`min-h-screen p-6 md:p-12 ${isDark ? 'bg-[#050505] text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6">
            <Award size={32} />
          </div>
          <h1 className="text-4xl font-black mb-4">Student Results Portal</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg">
            Enter your email address to view your past assessment scores, interview status, and performance feedback.
          </p>
        </div>

        <div className="bg-white dark:bg-[#111] p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-white/10 mb-12">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={20} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email address"
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-lg"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>Search <ChevronRight size={20} /></>
              )}
            </button>
          </form>
        </div>

        {hasSearched && !loading && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg text-sm">{results.length}</span>
              Results Found
            </h2>

            {results.length === 0 ? (
              <div className="bg-white dark:bg-[#111] p-12 rounded-3xl border border-gray-200 dark:border-white/10 text-center shadow-sm">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">No records found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We couldn't find any assessments associated with <strong>{email}</strong>. 
                  Please ensure you used this exact email when taking the test.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((result, i) => (
                  <div key={i} className="bg-white dark:bg-[#111] rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className={`absolute top-0 left-0 w-1.5 h-full ${
                      result.status === 'passed' ? 'bg-green-500' : 
                      result.status === 'failed' ? 'bg-red-500' : 
                      result.status === 'terminated' ? 'bg-orange-500' : 'bg-gray-500'
                    }`}></div>
                    
                    <div className="pl-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-lg ${result.testData.type === 'coding' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'}`}>
                            {result.testData.type === 'coding' ? <Code size={20} /> : <FileText size={20} />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{result.testData.type} Test</p>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1" title={result.testData.title}>{result.testData.title}</h3>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 dark:bg-[#1a1a1a] p-3 rounded-xl border border-gray-100 dark:border-white/5">
                          <p className="text-xs text-gray-500 mb-1">Score</p>
                          <p className="text-2xl font-black text-gray-900 dark:text-white">{result.score}%</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-[#1a1a1a] p-3 rounded-xl border border-gray-100 dark:border-white/5">
                          <p className="text-xs text-gray-500 mb-1">Status</p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            {result.status === 'passed' ? <span className="flex items-center gap-1 text-sm font-bold text-green-600 dark:text-green-400"><CheckCircle size={16}/> Passed</span> : 
                             result.status === 'failed' ? <span className="flex items-center gap-1 text-sm font-bold text-red-600 dark:text-red-400"><AlertTriangle size={16}/> Failed</span> : 
                             result.status === 'terminated' ? <span className="flex items-center gap-1 text-sm font-bold text-orange-600 dark:text-orange-400"><AlertTriangle size={16}/> Terminated</span> : 
                             <span className="text-sm font-bold text-gray-600 dark:text-gray-400 capitalize">{result.status || 'Pending'}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-white/10">
                        <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
                          <Clock size={14} /> 
                          {result.submittedAt?.toDate ? result.submittedAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown date'}
                        </span>
                        {result.testData.topic && (
                          <span className="text-xs bg-gray-100 dark:bg-white/10 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                            {result.testData.topic}
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={() => setSelectedResult(result)}
                        className="w-full mt-4 py-2.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <FileText size={16} /> View Detailed Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detailed Report Modal */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedResult(null)}>
          <div className="bg-white dark:bg-[#111] rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 dark:border-white/10" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-[#1a1a1a] rounded-t-3xl">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FileText size={20} className="text-blue-500" />
                  Detailed Report
                </h3>
                <p className="text-sm text-gray-500 mt-1">{selectedResult.testData.title}</p>
              </div>
              <button onClick={() => setSelectedResult(null)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {/* Stats Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 dark:bg-[#1a1a1a] p-4 rounded-xl border border-gray-200 dark:border-white/10 text-center">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total</p>
                  <p className="text-2xl font-black">{selectedResult.testData.questions?.length || 0}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800/30 text-center">
                  <p className="text-xs text-blue-600 dark:text-blue-400 uppercase font-bold tracking-wider mb-1">Attempted</p>
                  <p className="text-2xl font-black text-blue-700 dark:text-blue-300">
                    {(selectedResult.testData.questions?.length || 0) - (selectedResult.stats?.unattempted || 0)}
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800/30 text-center">
                  <p className="text-xs text-green-600 dark:text-green-400 uppercase font-bold tracking-wider mb-1">Correct</p>
                  <p className="text-2xl font-black text-green-700 dark:text-green-300">{selectedResult.stats?.correct || 0}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800/30 text-center">
                  <p className="text-xs text-red-600 dark:text-red-400 uppercase font-bold tracking-wider mb-1">Wrong</p>
                  <p className="text-2xl font-black text-red-700 dark:text-red-300">{selectedResult.stats?.incorrect || 0}</p>
                </div>
              </div>

              {/* Questions / Feedback */}
              {selectedResult.testData.type === 'coding' ? (
                <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-800/30">
                  <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">AI Feedback</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{selectedResult.feedback || 'No feedback provided.'}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-white/10 pb-2">Answer Key</h4>
                  {selectedResult.testData.questions?.map((q: any, i: number) => {
                    const isCorrect = selectedResult.answers?.[i] === q.correctIndex;
                    const hasAnswered = selectedResult.answers?.[i] !== undefined && selectedResult.answers?.[i] !== '';
                    
                    return (
                      <div key={i} className={`p-5 rounded-xl border ${!hasAnswered ? 'border-gray-200 bg-gray-50 dark:bg-[#1a1a1a] dark:border-white/10' : isCorrect ? 'border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800/50' : 'border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800/50'}`}>
                        <div className="font-medium mb-3 text-sm text-gray-900 dark:text-white">
                          <span className="opacity-50 mr-2">Q{i + 1}.</span> 
                          <Latex>{q.question}</Latex>
                        </div>
                        <div className="flex flex-col gap-2 text-sm mt-3 p-3 rounded-lg bg-white dark:bg-black/20 border border-gray-100 dark:border-white/5">
                          <div className={`font-bold flex items-center gap-2 ${!hasAnswered ? 'text-gray-500' : isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                            {!hasAnswered ? <AlertTriangle size={14}/> : isCorrect ? <CheckCircle size={14}/> : <X size={14}/>}
                            Your Answer: {hasAnswered ? <Latex>{q.options[selectedResult.answers[i]]}</Latex> : 'Skipped'}
                          </div>
                          {!isCorrect && (
                            <div className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                              <CheckCircle size={14} className="text-green-500" />
                              Correct Answer: <Latex>{q.options[q.correctIndex]}</Latex>
                            </div>
                          )}
                        </div>
                        {q.explanation && (
                          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-bold text-blue-700 dark:text-blue-400 mr-2">💡 Explanation:</span>
                            <Latex>{q.explanation}</Latex>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentResults;
