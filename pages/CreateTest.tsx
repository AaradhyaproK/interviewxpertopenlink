import React, { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, query, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

import { ArrowLeft, Plus, Save, Trash, FileCode, FileText, Settings, Sparkles, Link as LinkIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import * as pdfjsLib from 'pdfjs-dist';
import Latex from 'react-latex-next';

// Setup PDF.js worker to enable PDF parsing
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

const CreateTest: React.FC = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [type, setType] = useState<'aptitude' | 'coding'>('aptitude');
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(10); // Default 10 minutes
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [parsingPdf, setParsingPdf] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [passingScore, setPassingScore] = useState(70);
  const [nextInterviewId, setNextInterviewId] = useState('');
  const [recruiterInterviews, setRecruiterInterviews] = useState<any[]>([]);
  const [automationType, setAutomationType] = useState<'internal' | 'external'>('internal');
  const [externalLink, setExternalLink] = useState('');
  const [externalAccessCode, setExternalAccessCode] = useState('');

  // Advanced Settings
  const [topic, setTopic] = useState('');
  const [examName, setExamName] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [language, setLanguage] = useState('English');
  const [isPYQ, setIsPYQ] = useState(false);
  const [notes, setNotes] = useState('');
  const [hasNegativeMarking, setHasNegativeMarking] = useState(false);
  const [negativeMarksPerQuestion, setNegativeMarksPerQuestion] = useState(0.25);
  const [numQuestions, setNumQuestions] = useState(5);

  // Manual Question State
  const [manualQ, setManualQ] = useState({ question: '', options: ['', '', '', ''], correct: 0 });
  const [manualCodeQ, setManualCodeQ] = useState({ title: '', description: '', testCases: '' });

  useEffect(() => {
    const fetchInterviews = async () => {
      if (!auth.currentUser) return;
      const q = query(
        collection(db, 'interviews'),
        orderBy('createdAt', 'desc') // Now fetches all interviews from all recruiters
      );
      const snap = await getDocs(q);
      const interviewsList = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setRecruiterInterviews(interviewsList);
    };
    fetchInterviews();
  }, []);

  const handleAiGenerate = async () => {
    if (!aiPrompt) return;
    setLoading(true);
    try {
      const xaiKey = import.meta.env.VITE_XAI_API_KEY;
      if (!xaiKey) throw new Error('XAI API key missing');
      let promptStr = '';
      if (type === 'aptitude') {
        promptStr = `Generate ${numQuestions} aptitude multiple choice questions. YOU MUST WRITE ALL QUESTIONS AND OPTIONS ENTIRELY IN THE ${language.toUpperCase()} LANGUAGE! Do not use English if another language is selected.`;
        if (topic) promptStr += ` Topic: "${topic}".`;
        if (examName) promptStr += ` Exam: "${examName}".`;
        if (difficulty) promptStr += ` Difficulty: ${difficulty}.`;
        if (isPYQ) promptStr += ` (Make them similar to Previous Year Questions).`;
        if (notes) promptStr += ` Base questions strictly on these notes: "${notes}".`;
        if (aiPrompt) promptStr += ` Additional context: "${aiPrompt}".`;
        promptStr += `\n\nCRITICAL: You must return a JSON object containing a "questions" array. All text values inside the JSON MUST be in ${language}. Schema: { "questions": [{"question": "string (in ${language})", "options": ["string", "string", "string", "string"], "correctIndex": number}] }`;
      } else {
        promptStr = `Generate ${numQuestions} coding problem(s). YOU MUST WRITE THE TITLE AND DESCRIPTION ENTIRELY IN THE ${language.toUpperCase()} LANGUAGE! Do not use English if another language is selected.`;
        if (topic) promptStr += ` Topic: "${topic}".`;
        if (difficulty) promptStr += ` Difficulty: ${difficulty}.`;
        if (aiPrompt) promptStr += ` Context: "${aiPrompt}".`;
        promptStr += `\n\nCRITICAL: You must return a JSON object containing a "problems" array. All text values inside the JSON MUST be in ${language}. Schema: { "problems": [{"title": "string (in ${language})", "description": "string (in ${language})", "testCases": "string"}] }`;
      }

      const res = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${xaiKey}` },
        body: JSON.stringify({
          model: 'grok-4-1-fast-non-reasoning',
          messages: [
            { role: 'system', content: `You are an expert assessment generator. You MUST output all questions strictly in the ${language.toUpperCase()} language. Return only valid JSON.` },
            { role: 'user', content: promptStr }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.6,
        }),
      });
      const aiData = await res.json();
      const rawText = aiData.choices?.[0]?.message?.content || '';
      if (!rawText) throw new Error('No response from Grok');
      let parsed = JSON.parse(rawText);
      let generated: any[] = Array.isArray(parsed) ? parsed : (parsed.questions || parsed.problems || Object.values(parsed)[0] as any[]);
      
      // Ensure generated is an array
      if (!Array.isArray(generated)) {
        if (generated && typeof generated === 'object' && ((generated as any).question || (generated as any).title)) {
          generated = [generated];
        } else {
          generated = [];
        }
      }

      // Basic validation to prevent crashes if AI hallucinates schema
      if (type === 'aptitude') {
        generated = generated.filter(q => q && typeof q.question === 'string' && Array.isArray(q.options));
      } else {
        generated = generated.filter(q => q && typeof q.title === 'string');
      }

      setQuestions([...questions, ...generated]);
    } catch (error) {
      console.error('AI Error:', error);
      alert('Failed to generate questions. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsingPdf(true);
    try {
      let extractedText = '';
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          extractedText += textContent.items.map((item: any) => item.str).join(' ') + '\n';
        }
      } else if (file.type === 'text/plain') {
        extractedText = await file.text();
      } else {
        alert('Unsupported file type. Please upload a PDF or TXT file.');
        return;
      }

      if (!extractedText.trim()) {
        alert('Could not extract text from the document.');
        return;
      }

      setNotes(prev => prev ? prev + '\n\n' + extractedText : extractedText);
    } catch (error) {
      console.error('Error parsing document:', error);
      alert('Failed to parse document.');
    } finally {
      setParsingPdf(false);
      e.target.value = '';
    }
  };

  const addManualQuestion = () => {
    if (type === 'aptitude') {
      setQuestions([...questions, { ...manualQ, correctIndex: Number(manualQ.correct) }]);
      setManualQ({ question: '', options: ['', '', '', ''], correct: 0 });
    } else {
      setQuestions([...questions, manualCodeQ]);
      setManualCodeQ({ title: '', description: '', testCases: '' });
    }
  };

  const handleSave = async () => {
    if (!title || questions.length === 0) return alert("Add title and at least one question.");
    setLoading(true);
    try {
      const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const testData: any = {
        recruiterUID: auth.currentUser?.uid,
        title,
        type,
        duration,
        questions,
        accessCode,
        passingScore: Number(passingScore),
        topic,
        examName,
        difficulty,
        language,
        isPYQ,
        notes,
        hasNegativeMarking,
        negativeMarksPerQuestion: Number(negativeMarksPerQuestion),
        createdAt: serverTimestamp()
      };

      if (automationType === 'internal' && nextInterviewId) {
        testData.nextInterviewId = nextInterviewId;
      } else if (automationType === 'external' && externalLink) {
        testData.externalInterviewLink = externalLink;
        testData.externalAccessCode = externalAccessCode;
      }
      await addDoc(collection(db, 'tests'), testData);
      navigate('/recruiter/tests');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen p-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-blue-500 mb-6">
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="text-3xl font-bold mb-8">Create Assessment</h1>

        <div className="bg-white dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold mb-2">Test Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 outline-none" placeholder="e.g. Frontend React Quiz" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Test Type</label>
              <select value={type} onChange={(e: any) => { setType(e.target.value); setQuestions([]); }} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 outline-none">
                <option value="aptitude">Aptitude (MCQ)</option>
                <option value="coding">Coding Challenge</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold mb-2">Duration (minutes)</label>
              <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} min="1"
                className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 outline-none" placeholder="e.g. 15" />
            </div>
          </div>

          {/* Advanced Test Options */}
          <div className="md:col-span-2 p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-white/10 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-4 border-b border-gray-200 dark:border-white/10 pb-2">
              <Settings size={18} /> Advanced Options & Context
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-bold mb-2">Topic</label>
                <input type="text" value={topic} onChange={e => setTopic(e.target.value)} className="w-full p-3 rounded-xl bg-white dark:bg-[#050505] border border-gray-200 dark:border-white/10 outline-none" placeholder="e.g. React Hooks" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Exam Name / Target</label>
                <input type="text" value={examName} onChange={e => setExamName(e.target.value)} className="w-full p-3 rounded-xl bg-white dark:bg-[#050505] border border-gray-200 dark:border-white/10 outline-none" placeholder="e.g. JEE Mains, Frontend Interview" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Difficulty</label>
                <select value={difficulty} onChange={(e: any) => setDifficulty(e.target.value)} className="w-full p-3 rounded-xl bg-white dark:bg-[#050505] border border-gray-200 dark:border-white/10 outline-none">
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Language</label>
                <select value={language} onChange={(e: any) => setLanguage(e.target.value)} className="w-full p-3 rounded-xl bg-white dark:bg-[#050505] border border-gray-200 dark:border-white/10 outline-none">
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Marathi">Marathi</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-8 lg:col-span-2">
                <input type="checkbox" id="pyq" checked={isPYQ} onChange={e => setIsPYQ(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                <label htmlFor="pyq" className="text-sm font-bold cursor-pointer">Include Previous Year Questions (PYQ)</label>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-end mb-2">
                <label className="block text-sm font-bold">Reference Notes (AI will strictly use these to generate questions)</label>
                <label htmlFor="notes-upload" className={`text-xs px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors font-bold flex items-center gap-2 ${parsingPdf ? 'opacity-50 pointer-events-none' : ''}`}>
                  {parsingPdf ? <><div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div> Parsing...</> : <><FileText size={14} /> Upload PDF/TXT</>}
                </label>
                <input type="file" id="notes-upload" accept=".pdf,.txt" className="hidden" onChange={handlePdfUpload} disabled={parsingPdf} />
              </div>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full p-3 rounded-xl bg-white dark:bg-[#050505] border border-gray-200 dark:border-white/10 outline-none min-h-[100px]" placeholder="Paste any study material, notes, or paragraphs here..."></textarea>
            </div>
            
            {/* AI Generator Integration */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800 mt-6 mb-4">
              <h3 className="font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2 mb-3">
                <Sparkles size={18} /> Generate Questions with AI
              </h3>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="w-full md:w-28 flex-shrink-0">
                  <label className="block text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">Qty (Max 100)</label>
                  <input type="number" value={numQuestions} onChange={e => setNumQuestions(Number(e.target.value))} min="1" max="100" className="w-full p-3 rounded-xl bg-white dark:bg-[#050505] border border-blue-200 dark:border-blue-800 outline-none text-center" title="Number of questions to generate" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">AI Description / Custom Prompt</label>
                  <input type="text" value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} placeholder={`Enter specific instructions for ${type} questions...`} className="w-full p-3 rounded-xl bg-white dark:bg-[#050505] border border-blue-200 dark:border-blue-800 outline-none" />
                </div>
                <div className="flex items-end">
                  <button onClick={handleAiGenerate} disabled={loading} className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 h-[50px] shadow-sm">
                    {loading ? 'Generating...' : 'Generate'}
                  </button>
                </div>
              </div>
            </div>
            
            <h4 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-2 mt-4">Scoring Rules</h4>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="negMark" checked={hasNegativeMarking} onChange={e => setHasNegativeMarking(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                <label htmlFor="negMark" className="text-sm font-bold cursor-pointer">Enable Negative Marking</label>
              </div>
              {hasNegativeMarking && (
                <div className="flex items-center gap-2 animate-in fade-in duration-300">
                  <label className="text-sm font-bold">Penalty per wrong answer:</label>
                  <input type="number" step="0.01" min="0" value={negativeMarksPerQuestion} onChange={e => setNegativeMarksPerQuestion(Number(e.target.value))} className="w-24 p-2 rounded-lg bg-white dark:bg-[#050505] border border-gray-200 dark:border-white/10 outline-none" />
                </div>
              )}
            </div>
          </div>

          {/* Automation Settings */}
          <div className="md:col-span-2 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2 mb-3">
              <LinkIcon size={18} /> Automation Settings (Optional)
            </h3>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Passing Score (%)</label>
                <input type="number" value={passingScore} onChange={e => setPassingScore(Number(e.target.value))} min="0" max="100"
                  className="w-full md:w-1/2 p-3 rounded-xl bg-white dark:bg-[#050505] border border-blue-200 dark:border-blue-800 outline-none" placeholder="e.g. 75" />
            </div>

            <div className="flex bg-blue-100 dark:bg-blue-900/20 p-1 rounded-lg mb-4">
                <button type="button" onClick={() => setAutomationType('internal')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${automationType === 'internal' ? 'bg-white dark:bg-blue-800 text-blue-700 dark:text-white shadow' : 'text-blue-600 dark:text-blue-300'}`}>
                    Link to Internal AI Interview
                </button>
                <button type="button" onClick={() => setAutomationType('external')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${automationType === 'external' ? 'bg-white dark:bg-blue-800 text-blue-700 dark:text-white shadow' : 'text-blue-600 dark:text-blue-300'}`}>
                    Link to External URL
                </button>
            </div>

            {automationType === 'internal' && (
              <div className="animate-in fade-in duration-300">
                  <label className="block text-sm font-bold mb-2">Next Round Interview</label>
                  <select value={nextInterviewId} onChange={e => setNextInterviewId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white dark:bg-[#050505] border border-blue-200 dark:border-blue-800 outline-none">
                    <option value="">Select an interview to link...</option>
                    {recruiterInterviews.map(interview => (<option key={interview.id} value={interview.id}>{interview.title}</option>))}
                  </select>
                  <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">If a candidate passes, they will be automatically emailed a unique, secure link to the selected AI interview.</p>
              </div>
            )}

            {automationType === 'external' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                  <div>
                      <label className="block text-sm font-bold mb-2">External Interview Link</label>
                      <input type="url" value={externalLink} onChange={e => setExternalLink(e.target.value)} className="w-full p-3 rounded-xl bg-white dark:bg-[#050505] border border-blue-200 dark:border-blue-800 outline-none" placeholder="https://zoom.us/j/..." />
                  </div>
                  <div>
                      <label className="block text-sm font-bold mb-2">Access Code (Optional)</label>
                      <input type="text" value={externalAccessCode} onChange={e => setExternalAccessCode(e.target.value)} className="w-full p-3 rounded-xl bg-white dark:bg-[#050505] border border-blue-200 dark:border-blue-800 outline-none" placeholder="e.g. 123456" />
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">If a candidate passes, they will be automatically emailed this link and access code.</p>
              </div>
            )}
          </div>



          {/* Manual Entry */}
          <div className="mb-8 border-t border-gray-100 dark:border-white/5 pt-6">
            <h3 className="font-bold mb-4">Add Manually</h3>
            {type === 'aptitude' ? (
              <div className="space-y-3">
                <input type="text" placeholder="Question" value={manualQ.question} onChange={e => setManualQ({ ...manualQ, question: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10" />
                <div className="grid grid-cols-2 gap-3">
                  {manualQ.options.map((opt, i) => (
                    <input key={i} type="text" placeholder={`Option ${i + 1}`} value={opt} onChange={e => {
                      const newOpts = [...manualQ.options]; newOpts[i] = e.target.value;
                      setManualQ({ ...manualQ, options: newOpts });
                    }} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10" />
                  ))}
                </div>
                <select value={manualQ.correct} onChange={e => setManualQ({ ...manualQ, correct: Number(e.target.value) })} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10">
                  {manualQ.options.map((_, i) => <option key={i} value={i}>Correct Option: {i + 1}</option>)}
                </select>
                <button onClick={addManualQuestion} className="w-full py-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl font-bold flex items-center justify-center gap-2">
                  <Plus size={18} /> Add Question
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <input type="text" placeholder="Problem Title" value={manualCodeQ.title} onChange={e => setManualCodeQ({ ...manualCodeQ, title: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10" />
                <textarea placeholder="Problem Description" value={manualCodeQ.description} onChange={e => setManualCodeQ({ ...manualCodeQ, description: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 h-32" />
                <textarea placeholder="Test Cases (e.g. Input: 1 2, Output: 3)" value={manualCodeQ.testCases} onChange={e => setManualCodeQ({ ...manualCodeQ, testCases: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 h-24" />
                <button onClick={addManualQuestion} className="w-full py-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl font-bold flex items-center justify-center gap-2">
                  <Plus size={18} /> Add Problem
                </button>
              </div>
            )}
          </div>

          {/* Preview */}
          <div>
            <h3 className="font-bold mb-4">Questions ({questions.length})</h3>
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 relative group">
                  <button onClick={() => setQuestions(questions.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash size={18} />
                  </button>
                  {type === 'aptitude' ? (
                    <>
                      <p className="font-bold mb-2"><Latex>{`${i + 1}. ${q.question}`}</Latex></p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {q.options?.map((opt: string, idx: number) => (
                          <div key={idx} className={`p-2 rounded ${idx === q.correctIndex ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 dark:bg-white/5'}`}>
                            <Latex>{opt}</Latex>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="font-bold mb-1"><Latex>{`${i + 1}. ${q.title}`}</Latex></p>
                      <p className="text-sm text-gray-500 line-clamp-2"><Latex>{q.description}</Latex></p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button onClick={handleSave} disabled={loading || questions.length === 0} className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
          <Save size={20} /> Save Assessment
        </button>
      </div>
    </div>
  );
};

export default CreateTest;