import React, { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, Timestamp, doc, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useMessageBox } from '../components/MessageBox';


const MockInterviewSetup: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingLinkedin, setFetchingLinkedin] = useState(false);
  const messageBox = useMessageBox();
  const [activeTab, setActiveTab] = useState<'video' | 'assessment' | 'one-on-one'>('video');
  const [assessmentType, setAssessmentType] = useState<'aptitude' | 'coding'>('aptitude');
  const [assessmentTopic, setAssessmentTopic] = useState('');
  const [videoNumQuestions, setVideoNumQuestions] = useState(5);
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');

  // One-on-One States
  const [oneOnOneCompany, setOneOnOneCompany] = useState('TCS');
  const [oneOnOneCustomCompany, setOneOnOneCustomCompany] = useState('');
  const [oneOnOneRole, setOneOnOneRole] = useState('Software Engineer');
  const [oneOnOneDifficulty, setOneOnOneDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [oneOnOneDuration, setOneOnOneDuration] = useState(5);

  const getOneOnOneCost = (duration: number) => {
    if (duration <= 3) return 10;
    return 10 + (duration - 3) * 2;
  };


  useEffect(() => {
    document.title = "AI Mock Interview Practice | InterviewXpert";
    const setMetaTag = (attr: 'name' | 'property', value: string, content: string) => {
        let element = document.querySelector(`meta[${attr}='${value}']`) as HTMLMetaElement;
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute(attr, value);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', 'Practice for any job role with our AI-powered mock interviews. Get tailored questions by providing a job description or LinkedIn URL and receive instant feedback.');
    setMetaTag('property', 'og:title', 'AI Mock Interview Practice | InterviewXpert');
    setMetaTag('property', 'og:description', 'Practice for any job role with our AI-powered mock interviews.');
    setMetaTag('name', 'twitter:title', 'AI Mock Interview Practice | InterviewXpert');
    setMetaTag('name', 'twitter:description', 'Practice for any job role with our AI-powered mock interviews.');
  }, []);

  const fetchLinkedinJob = async () => {
    if (!linkedinUrl) return;
    setFetchingLinkedin(true);
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(linkedinUrl)}&disableCache=true`;
      const response = await fetch(proxyUrl);
      const data = await response.json();

      if (!data.contents) {
        throw new Error("Failed to retrieve page content via proxy.");
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, "text/html");

      const scripts = doc.querySelectorAll('script[type="application/ld+json"]');
      let jobData = null;

      for (let i = 0; i < scripts.length; i++) {
        try {
          const json = JSON.parse(scripts[i].textContent || '{}');
          if (json['@type'] === 'JobPosting') {
            jobData = json;
            break;
          }
        } catch (e) {
          continue;
        }
      }

      let title = '';
      let description = '';

      if (jobData) {
        title = jobData.title || '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = jobData.description || '';
        description = tempDiv.textContent || tempDiv.innerText || '';
      } else {
        title = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || doc.title || '';
        const descElement = doc.querySelector('.show-more-less-html__markup') ||
          doc.querySelector('.description__text') ||
          doc.querySelector('.job-description');
        if (descElement) {
          description = descElement.textContent?.trim() || '';
        }
      }

      if (!description) {
        throw new Error("Could not extract job description.");
      }

      setJobTitle(title);
      setJobDesc(description);
    } catch (error: any) {
      console.error("LinkedIn Fetch Error:", error);
      messageBox.showError("Could not fetch job data. Please enter details manually.");
    } finally {
      setFetchingLinkedin(false);
    }
  };

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !jobTitle || !jobDesc) return;
    setLoading(true);

    try {
      // Check Wallet Balance
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      const currentBalance = userSnap.data()?.walletBalance || 0;
      const INTERVIEW_COST = videoNumQuestions * 2;

      if (currentBalance < INTERVIEW_COST) {
        messageBox.showConfirm(
          `Insufficient wallet balance (${currentBalance} pts). This mock interview requires ${INTERVIEW_COST} points. Would you like to add points?`,
          () => navigate('/candidate/payment')
        );
        setLoading(false);
        return;
      }

      // Deduct Points
      await updateDoc(userRef, {
        walletBalance: increment(-INTERVIEW_COST)
      });

      // Pre-generate a single ID for both job and interview docs
      const mockDocRef = doc(collection(db, 'jobs'));
      const mockId = mockDocRef.id;

      // Create the mock job document
      await setDoc(mockDocRef, {
        title: jobTitle,
        description: jobDesc,
        companyName: 'Mock Interview',
        isMock: true,
        numQuestions: videoNumQuestions,
        recruiterUID: null, // मॉक मुलाखती विशिष्ट रिक्रूटरशी संबंधित नाहीत
        createdAt: serverTimestamp(),
        applyDeadline: Timestamp.fromDate(new Date(Date.now() + 86400000 * 365)),
        interviewPermission: 'anyone',
      });

      // Create the corresponding interview document with the same ID
      await setDoc(doc(db, 'interviews', mockId), {
        title: jobTitle,
        description: jobDesc,
        numQuestions: videoNumQuestions,
        recruiterUID: null, // मॉक मुलाखती विशिष्ट रिक्रूटरशी संबंधित नाहीत
        isMock: true,
        createdAt: serverTimestamp(),
        jobId: mockId,
      });

      navigate(`/interview/start/${mockId}`);
    } catch (err) {
      console.error(err);
      messageBox.showError("Failed to start interview");
    } finally {
      setLoading(false);
    }
  };

  const handleStartAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !assessmentTopic) return;
    setLoading(true);

    try {
      // Check Wallet Balance
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      const currentBalance = userSnap.data()?.walletBalance || 0;
      const costPerQuestion = assessmentType === 'coding' ? 10 : 2;
      const ASSESSMENT_COST = numQuestions * costPerQuestion;

      if (currentBalance < ASSESSMENT_COST) {
        messageBox.showConfirm(
          `Insufficient wallet balance (${currentBalance} pts). An assessment requires ${ASSESSMENT_COST} points. Would you like to add points?`,
          () => navigate('/candidate/payment')
        );
        setLoading(false);
        return;
      }

      const xaiKey = import.meta.env.VITE_XAI_API_KEY;
      if (!xaiKey) throw new Error('XAI API key missing');
      const prompt = assessmentType === 'aptitude'
        ? `Generate ${numQuestions} ${difficulty}-level aptitude multiple choice questions about "${assessmentTopic}". Return ONLY a raw JSON array. Schema: [{"question": "string", "options": ["string", "string", "string", "string"], "correctIndex": number}]`
        : `Generate ${numQuestions} ${difficulty}-level coding problems about "${assessmentTopic}". Return ONLY a raw JSON array. Schema: [{"title": "string", "description": "string", "testCases": "string"}]`;

      const res = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${xaiKey}` },
        body: JSON.stringify({
          model: 'grok-4-1-fast-non-reasoning',
          messages: [
            { role: 'system', content: 'You are an expert assessment generator. Return only valid JSON arrays.' },
            { role: 'user', content: prompt }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.6,
        }),
      });
      const aiData = await res.json();
      const rawText = aiData.choices?.[0]?.message?.content || '';
      if (!rawText) throw new Error('No response from Grok');
      // Grok may return {questions: [...]} or a bare array — handle both
      let parsed = JSON.parse(rawText);
      const questions: any[] = Array.isArray(parsed) ? parsed : (parsed.questions || parsed.problems || Object.values(parsed)[0] as any[]);
      if (!Array.isArray(questions)) throw new Error('AI response is not an array');

      // Deduct Points only after successful generation
      await updateDoc(userRef, {
        walletBalance: increment(-ASSESSMENT_COST)
      });

      const duration = assessmentType === 'aptitude' ? numQuestions * 2 : numQuestions * 15;

      const docRef = await addDoc(collection(db, 'tests'), {
        title: `${assessmentType === 'aptitude' ? 'Aptitude' : 'Coding'} Practice (${difficulty}): ${assessmentTopic}`,
        type: assessmentType,
        difficulty,
        questions,
        duration, 
        recruiterUID: user.uid, // User owns this mock test
        isMock: true,
        createdAt: serverTimestamp()
      });

      navigate(`/test/start/${docRef.id}?isMock=true`);
    } catch (error) {
      console.error("Error creating assessment:", error);
      messageBox.showError("Failed to generate assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartOneOnOne = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      // Check wallet balance (e.g. 10 points for one-on-one)
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      const currentBalance = userSnap.data()?.walletBalance || 0;
      const COST = getOneOnOneCost(oneOnOneDuration);

      if (currentBalance < COST) {
        messageBox.showConfirm(
          `Insufficient wallet balance (${currentBalance} pts). A One-on-One interview requires ${COST} points. Would you like to add points?`,
          () => navigate('/candidate/payment')
        );
        setLoading(false);
        return;
      }

      // Deduct Points
      await updateDoc(userRef, {
        walletBalance: increment(-COST)
      });

      const selectedCompany = oneOnOneCompany === 'Other' ? oneOnOneCustomCompany : oneOnOneCompany;

      // Pre-generate a single ID for job & interview documents
      const mockDocRef = doc(collection(db, 'jobs'));
      const mockId = mockDocRef.id;

      // Create the mock job document
      await setDoc(mockDocRef, {
        title: `${selectedCompany} One-on-One Interview - ${oneOnOneRole}`,
        description: `This is a live, dynamic one-on-one conversation simulating a real technical interview at ${selectedCompany} for the role of ${oneOnOneRole}. Difficulty level: ${oneOnOneDifficulty}.`,
        companyName: selectedCompany,
        isMock: true,
        duration: oneOnOneDuration,
        recruiterUID: null,
        createdAt: serverTimestamp(),
        applyDeadline: Timestamp.fromDate(new Date(Date.now() + 86400000 * 365)),
        interviewPermission: 'anyone',
      });

      // Create the corresponding interview document with the same ID
      await setDoc(doc(db, 'interviews', mockId), {
        title: `${selectedCompany} One-on-One Interview - ${oneOnOneRole}`,
        description: `Conversational one-on-one session at ${selectedCompany} for ${oneOnOneRole}.`,
        duration: oneOnOneDuration,
        recruiterUID: null,
        isMock: true,
        createdAt: serverTimestamp(),
        jobId: mockId,
      });

      // Navigate to the Google Meet style session page
      navigate(`/candidate/one-on-one/session?interviewId=${mockId}&company=${encodeURIComponent(selectedCompany)}&difficulty=${oneOnOneDifficulty}&role=${encodeURIComponent(oneOnOneRole)}&duration=${oneOnOneDuration}`);
    } catch (err) {
      console.error(err);
      messageBox.showError("Failed to start One-on-One Interview");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 transition-colors duration-300">
      <div className="w-full relative z-10">

        {/* Tabs */}
        <div className="saas-tabs mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('video')}
            className={`saas-tab pb-4 px-2 text-sm font-bold ${activeTab === 'video' ? 'saas-tab-active' : ''}`}
          >
            <i className="fas fa-video mr-2"></i> Video Interview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('assessment')}
            className={`saas-tab pb-4 px-2 text-sm font-bold ${activeTab === 'assessment' ? 'saas-tab-active' : ''}`}
          >
            <i className="fas fa-laptop-code mr-2"></i> Skill Assessment
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('one-on-one')}
            className={`saas-tab pb-4 px-2 text-sm font-bold ${activeTab === 'one-on-one' ? 'saas-tab-active' : ''}`}
          >
            <i className="fas fa-comments mr-2"></i> One-on-One Interview
          </button>
        </div>


        {activeTab === 'video' ? (
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 items-start">

            {/* Left Side: Info & LinkedIn */}
            <div className="w-full lg:w-5/12 space-y-4 lg:space-y-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Mock Interview Setup</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Practice for any job role. Paste a job link or describe the role manually to get started.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold border border-blue-100 dark:border-blue-800">
                  <i className="fas fa-coins"></i> Cost: {videoNumQuestions * 2} Points
                </div>
              </div>

              {/* LinkedIn Import - Clean Design */}
              <div className="bg-white dark:bg-[#111] rounded-2xl md:rounded-3xl p-5 md:p-6 border border-gray-200 dark:border-white/5 shadow-lg shadow-gray-100/50 dark:shadow-none">
                <div className="flex items-center justify-between mb-6">
                  <label className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-[#0077b5] flex items-center justify-center text-white shadow-md">
                      <i className="fab fa-linkedin-in text-xl"></i>
                    </span>
                    Import from LinkedIn
                  </label>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <i className="fas fa-link text-gray-400 group-focus-within:text-blue-500 transition-colors"></i>
                    </div>
                    <input
                      type="url"
                      placeholder="Paste LinkedIn Job URL..."
                      className="w-full pl-10 pr-4 py-4 border border-gray-200 dark:border-white/10 rounded-2xl text-sm bg-gray-50 dark:bg-[#050505] dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={fetchLinkedinJob}
                    disabled={fetchingLinkedin || !linkedinUrl}
                    className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-2xl text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg active:scale-95"
                  >
                    {fetchingLinkedin ? (
                      <><i className="fas fa-circle-notch fa-spin"></i> Fetching...</>
                    ) : (
                      <><i className="fas fa-magic"></i> Auto-Fill Details</>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Divider for Mobile */}
            <div className="flex lg:hidden items-center gap-4 w-full my-2">
              <div className="h-px bg-gray-200 dark:bg-slate-800 flex-1"></div>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider px-2">Or Enter Manually</span>
              <div className="h-px bg-gray-200 dark:bg-slate-800 flex-1"></div>
            </div>

            {/* Right Side: Manual Form */}
            <div className="w-full lg:w-7/12">
              <div className="bg-white dark:bg-[#111] p-5 md:p-8 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/50 dark:shadow-none">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <i className="fas fa-pen-to-square text-primary"></i> Manual Entry
                </h2>
                <form onSubmit={handleStart} className="space-y-6">
                  <div className="space-y-2 group">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 group-focus-within:text-primary transition-colors">Job Title</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Senior Frontend Engineer"
                        className="w-full pl-4 pr-4 py-4 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all bg-white dark:bg-[#111] dark:text-white font-medium placeholder-gray-400 shadow-sm"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 group-focus-within:text-primary transition-colors">Job Description</label>
                    <div className="relative">
                      <textarea
                        required
                        rows={6}
                        placeholder="Paste the full job description here..."
                        className="w-full p-4 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all bg-white dark:bg-[#111] dark:text-white resize-none font-medium leading-relaxed placeholder-gray-400 shadow-sm"
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-3 group">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Number of Questions</label>
                      <span className="px-2 py-1 text-sm font-bold text-primary bg-primary/10 rounded-md">{videoNumQuestions}</span>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="1" max="10"
                        required
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        value={videoNumQuestions}
                        onChange={(e) => setVideoNumQuestions(parseInt(e.target.value, 10) || 5)}
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-primary to-blue-600 hover:to-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all transform hover:-translate-y-1 active:scale-[0.98] disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <><i className="fas fa-circle-notch fa-spin"></i> Setting up...</>
                      ) : (
                        <><i className="fas fa-play"></i> Start Mock Interview</>
                      )}
                    </button>
                    <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4 flex items-center justify-center gap-1.5">
                      <i className="fas fa-shield-alt text-green-500"></i> AI-Powered & Secure Environment
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : activeTab === 'assessment' ? (
          <div className="grid lg:grid-cols-5 gap-12 items-center py-8">
            {/* Left side: Info */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Sharpen Your Skills</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                Take on AI-generated challenges in aptitude or coding to test your knowledge and prepare for technical rounds.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10">
                  <i className="fas fa-brain text-primary text-xl"></i>
                  <div>
                    <h4 className="font-semibold">Aptitude Tests</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Logical, quantitative, and verbal reasoning.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10">
                  <i className="fas fa-code text-primary text-xl"></i>
                  <div>
                    <h4 className="font-semibold">Coding Challenges</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Algorithm and data structure problems.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Form */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-[#111] p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center justify-between">
                  Practice Assessment
                  <span className="text-sm font-normal px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full border border-blue-100 dark:border-blue-800">
                    <i className="fas fa-coins mr-1"></i> {numQuestions * (assessmentType === 'coding' ? 10 : 2)} Pts
                  </span>
                </h2>
                <form onSubmit={handleStartAssessment} className="space-y-6">
                  {/* Type Selection */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Assessment Type</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setAssessmentType('aptitude')}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${assessmentType === 'aptitude' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'}`}
                      >
                        <i className="fas fa-brain text-2xl"></i>
                        <span className="font-bold">Aptitude</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAssessmentType('coding')}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${assessmentType === 'coding' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'}`}
                      >
                        <i className="fas fa-code text-2xl"></i>
                        <span className="font-bold">Coding</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Topic Input */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Topic / Skill</label>
                      <div className="relative">
                        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input
                          type="text"
                          required
                          placeholder={assessmentType === 'aptitude' ? "e.g. Logical Reasoning, Mathematics" : "e.g. JavaScript Arrays, Python Algorithms"}
                          className="w-full pl-10 p-4 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-[#050505] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          value={assessmentTopic}
                          onChange={(e) => setAssessmentTopic(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Difficulty Selection */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
                      <div className="relative">
                        <i className="fas fa-layer-group absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <select
                          value={difficulty}
                          onChange={(e) => setDifficulty(e.target.value as any)}
                          className="w-full pl-10 p-4 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-[#050505] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                        <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                      </div>
                    </div>
                  </div>

                  {/* Question Count Input */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Number of Questions</label>
                      <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                        ~{assessmentType === 'aptitude' ? numQuestions * 2 : numQuestions * 15} mins
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 font-bold w-8 text-center">{numQuestions}</span>
                      <input
                        type="range"
                        min="1"
                        max={assessmentType === 'aptitude' ? "20" : "5"}
                        step="1"
                        required
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(parseInt(e.target.value) || 1)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-primary to-blue-600 hover:to-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <><i className="fas fa-circle-notch fa-spin"></i> Generating...</>
                    ) : (
                      <><i className="fas fa-play"></i> Start Practice Test</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          /* One-on-One Interview Setup Tab */
          <div className="grid lg:grid-cols-5 gap-12 items-center py-8">
            <div className="lg:col-span-2 text-center lg:text-left">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                Live One-on-One Interview
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                Experience a simulated, real-time Google Meet interview with an AI recruiter. The AI asks questions and adapts dynamically based on your responses!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10">
                  <i className="fas fa-video text-primary text-xl"></i>
                  <div className="text-left">
                    <h4 className="font-semibold text-sm">Google Meet Style UI</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Live webcam feedback, microphone controls, and captions.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10">
                  <i className="fas fa-shield-halved text-green-500 text-xl"></i>
                  <div className="text-left">
                    <h4 className="font-semibold text-sm">100% Privacy Ensured</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Only transcripts are analyzed. Video or audio recordings are NEVER stored.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10">
                  <i className="fas fa-comments text-primary text-xl"></i>
                  <div className="text-left">
                    <h4 className="font-semibold text-sm">Conversational AI Rounds</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Adaptive questioning—the AI probes deeper based on your answers.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10">
                  <i className="fas fa-coins text-yellow-500 text-xl"></i>
                  <div className="text-left">
                    <h4 className="font-semibold text-sm">Dynamic Point Cost</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">10 Pts base cost (3 min), then just +2 Pts for each additional minute.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-[#111] p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center justify-between">
                  Setup Session
                  <span className="text-sm font-normal px-3 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-full border border-yellow-100 dark:border-yellow-800">
                    <i className="fas fa-coins mr-1"></i> {getOneOnOneCost(oneOnOneDuration)} Pts
                  </span>
                </h2>
                <form onSubmit={handleStartOneOnOne} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Target Company selection */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Target Company</label>
                      <div className="relative">
                        <i className="fas fa-building absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <select
                          value={oneOnOneCompany}
                          onChange={(e) => setOneOnOneCompany(e.target.value)}
                          className="w-full pl-10 p-4 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-[#050505] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="TCS">TCS (Tata Consultancy Services)</option>
                          <option value="Infosys">Infosys</option>
                          <option value="Wipro">Wipro</option>
                          <option value="Cognizant">Cognizant</option>
                          <option value="Accenture">Accenture</option>
                          <option value="Google">Google</option>
                          <option value="Microsoft">Microsoft</option>
                          <option value="Amazon">Amazon</option>
                          <option value="Meta">Meta (Facebook)</option>
                          <option value="Other">Other / Custom</option>
                        </select>
                        <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                      </div>
                    </div>

                    {/* Difficulty Selection */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Difficulty Level</label>
                      <div className="relative">
                        <i className="fas fa-layer-group absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <select
                          value={oneOnOneDifficulty}
                          onChange={(e) => setOneOnOneDifficulty(e.target.value as any)}
                          className="w-full pl-10 p-4 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-[#050505] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                        <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                      </div>
                    </div>
                  </div>

                  {oneOnOneCompany === 'Other' && (
                    <div className="animate-fadeIn animate-duration-200">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Custom Company Name</label>
                      <div className="relative">
                        <i className="fas fa-pen absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Netflix, Oracle, HCL"
                          value={oneOnOneCustomCompany}
                          onChange={(e) => setOneOnOneCustomCompany(e.target.value)}
                          className="w-full pl-10 p-4 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-[#050505] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Target Role input */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Job Role / Position</label>
                    <div className="relative">
                      <i className="fas fa-user-tie absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Frontend Engineer, Fullstack Developer"
                        value={oneOnOneRole}
                        onChange={(e) => setOneOnOneRole(e.target.value)}
                        className="w-full pl-10 p-4 border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-[#050505] dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Interview Duration Input */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Interview Duration</label>
                      <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {oneOnOneDuration} Minutes
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 font-bold w-8 text-center">{oneOnOneDuration}m</span>
                      <input
                        type="range"
                        min="3"
                        max="15"
                        step="1"
                        required
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        value={oneOnOneDuration}
                        onChange={(e) => setOneOnOneDuration(parseInt(e.target.value, 10) || 5)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-primary to-blue-600 hover:to-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <><i className="fas fa-circle-notch fa-spin"></i> Setting up...</>
                    ) : (
                      <><i className="fas fa-play"></i> Start One-on-One Interview</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockInterviewSetup;