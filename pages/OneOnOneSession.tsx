import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, addDoc, collection, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { speak } from '../lib/tts';
import { grokChat, grokGenerateText } from '../services/grokService';
import { useMessageBox } from '../components/MessageBox';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Send, HelpCircle, AlertCircle, MessageSquare, X } from 'lucide-react';

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const OneOnOneSession: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const messageBox = useMessageBox();
  const { user, userProfile } = useAuth();

  // URL Parameters
  const interviewId = searchParams.get('interviewId') || '';
  const company = searchParams.get('company') || 'TCS';
  const difficulty = searchParams.get('difficulty') || 'Medium';
  const role = searchParams.get('role') || 'Software Engineer';
  const durationParam = parseInt(searchParams.get('duration') || '5', 10);

  // States
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [typedAnswer, setTypedAnswer] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Speech Recognition States
  const [isListening, setIsListening] = useState(false);
  const [transcriptText, setTranscriptText] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');

  // Status / Phase State
  const [phase, setPhase] = useState<'initializing' | 'active' | 'evaluating' | 'completed'>('initializing');
  const [statusMessage, setStatusMessage] = useState('Joining meeting...');

  // Timer: Dynamic based on setup
  const [timeLeft, setTimeLeft] = useState(durationParam * 60); 

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [micVolume, setMicVolume] = useState(0);
  const micAnimFrameRef = useRef<number | null>(null);

  // 1. Initialize Camera and Microphone (Google Meet style self-view)
  useEffect(() => {
    const initMedia = async () => {
      try {
        setStatusMessage('Requesting camera and microphone access...');
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: 'user' },
          audio: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        // Setup audio analysis for visual mic indicator
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const source = ctx.createMediaStreamSource(mediaStream);
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 256;
          source.connect(analyser);
          
          audioContextRef.current = ctx;
          analyserRef.current = analyser;

          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const updateVolume = () => {
            if (!analyserRef.current || isMuted) {
              setMicVolume(0);
              return;
            }
            analyserRef.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
              sum += dataArray[i];
            }
            const average = sum / bufferLength;
            setMicVolume(Math.min(100, Math.round(average * 2)));
            micAnimFrameRef.current = requestAnimationFrame(updateVolume);
          };
          micAnimFrameRef.current = requestAnimationFrame(updateVolume);
        }

        setStatusMessage('Connected. Starting interview...');
        setPhase('active');
      } catch (err) {
        console.error('Camera/Mic permission denied or unavailable:', err);
        messageBox.showError(
          'Could not access camera or microphone. Please ensure permissions are granted. You can still continue the interview using text chat.'
        );
        setPhase('active'); // Still allow proceeding in text-only fallback mode
      }
    };

    initMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (micAnimFrameRef.current) {
        cancelAnimationFrame(micAnimFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      speak.stop();
    };
  }, []);

  // 2. Setup Speech Recognition
  useEffect(() => {
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setInterimTranscript('');
    };

    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      if (final) {
        setTranscriptText((prev) => {
          const space = prev.endsWith(' ') || prev === '' ? '' : ' ';
          return prev + space + final;
        });
        setTypedAnswer((prev) => {
          const space = prev.endsWith(' ') || prev === '' ? '' : ' ';
          return prev + space + final;
        });
      }
      setInterimTranscript(interim);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        messageBox.showError('Microphone permission blocked. Please type your answers in the chat pane.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // 3. Interview Conversation Starter
  useEffect(() => {
    if (phase !== 'active') return;

    const startInterview = async () => {
      setStatusMessage('AI Interviewer is preparing...');
      try {
        // The first question must always be "Tell me about yourself"
        const firstGreeting = `Hello, thank you for joining! I am your AI interviewer from ${company} conducting a ${difficulty}-level technical round for the role of ${role}. To start off, could you please tell me about yourself?`;
        
        setCurrentQuestion(firstGreeting);
        
        // Add to messages
        setMessages([
          {
            role: 'assistant',
            content: firstGreeting,
            timestamp: new Date(),
          },
        ]);
        setCurrentQuestionIndex(1);

        // Speak it out loud
        setStatusMessage('AI is speaking...');
        await speak(firstGreeting, {
          onEnd: () => {
            setStatusMessage('Listening to your answer...');
            startListening();
          },
          onError: () => {
            setStatusMessage('Listening to your answer...');
            startListening();
          }
        });
      } catch (err) {
        console.error('Failed to speak initial prompt:', err);
        const fallback = `Hello, thank you for joining! I will be conducting your technical interview for the ${role} position at ${company}. Let's start with a standard opening: Can you tell me about yourself and your background?`;
        setCurrentQuestion(fallback);
        setMessages([
          {
            role: 'assistant',
            content: fallback,
            timestamp: new Date(),
          },
        ]);
        setCurrentQuestionIndex(1);
        await speak(fallback, {
          onEnd: () => startListening(),
          onError: () => startListening()
        });
      }
    };

    startInterview();
  }, [phase]);

  // 4. Timer Logic
  useEffect(() => {
    if (phase !== 'active') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  // 5. Scroll Chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, transcriptText, interimTranscript]);

  // Actions: Start & Stop Speech Recognition
  const startListening = () => {
    if (!recognitionRef.current || isMuted) return;

    // Force-abort any running session to completely reset state and prevent race conditions
    try {
      recognitionRef.current.abort();
    } catch (e) {
      // ignore
    }

    // Set a robust timeout to let the browser release lock and restart cleanly
    setTimeout(() => {
      setTranscriptText('');
      setInterimTranscript('');
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("Speech recognition start failed:", e);
      }
    }, 200);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {
        // ignore
      }
    }
  };

  // Mute / Unmute
  const toggleMute = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuted; // Toggle track state
        setIsMuted(!isMuted);
        if (!isMuted) {
          stopListening();
        } else {
          // If we unmuted and AI is not speaking, resume listening
          if (statusMessage === 'Listening to your answer...') {
            setTimeout(startListening, 300);
          }
        }
      }
    } else {
      setIsMuted(!isMuted);
    }
  };

  // Camera On / Off
  const toggleCamera = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = isCamOff;
        setIsCamOff(!isCamOff);
      }
    } else {
      setIsCamOff(!isCamOff);
    }
  };

  // Submit Answer (Trigger next AI question)
  const handleSubmitAnswer = async () => {
    // Stop recording first
    stopListening();
    speak.stop();

    const finalAnswer = (transcriptText + ' ' + interimTranscript + ' ' + typedAnswer).trim();
    if (!finalAnswer) {
      messageBox.showError('Please speak or type your answer before submitting.');
      return;
    }

    // Reset inputs
    setTranscriptText('');
    setInterimTranscript('');
    setTypedAnswer('');

    // Append user answer to messages
    const updatedMessages = [
      ...messages,
      { role: 'user', content: finalAnswer, timestamp: new Date() } as Message,
    ];
    setMessages(updatedMessages);

    // AI will continuously ask questions based on user's answers until time is up!
    setStatusMessage('AI is thinking...');
    try {
      // Build history for conversational Grok prompt
      const historyForGrok = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const systemPrompt = `You are a polite, professional human interviewer from ${company} conducting a ${difficulty}-level technical round for the role of ${role}.
Your tone is conversational, encouraging, and natural.
Guidelines:
- Keep your questions short, clear, and direct (max 2 sentences).
- IMPORTANT: Listen very closely to the candidate's last answer. Ask a specific technical follow-up question or probe deeper into the technologies, frameworks, projects, or problems they just mentioned in their previous response. Make it a true interactive technical conversation.
- Do not repeat questions. Pivot based on candidate answers.
- Do not output any headers or metadata. Output ONLY the response you would speak.`;

      const nextQuestionResponse = await grokChat(systemPrompt, historyForGrok, 0.6);
      const cleanQuestion = nextQuestionResponse.trim();

      setCurrentQuestion(cleanQuestion);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: cleanQuestion, timestamp: new Date() },
      ]);
      setCurrentQuestionIndex((prev) => prev + 1);

      setStatusMessage('AI is speaking...');
      await speak(cleanQuestion, {
        onEnd: () => {
          setStatusMessage('Listening to your answer...');
          startListening();
        },
        onError: () => {
          setStatusMessage('Listening to your answer...');
          startListening();
        }
      });
    } catch (err) {
      console.error('Failed to generate next question:', err);
      // Fallback question
      const fallback = `Interesting explanation. Let's move on. Could you talk about how you manage database design or handle performance tuning in your projects?`;
      setCurrentQuestion(fallback);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: fallback, timestamp: new Date() },
      ]);
      setCurrentQuestionIndex((prev) => prev + 1);
      await speak(fallback, {
        onEnd: () => startListening(),
        onError: () => startListening()
      });
    }
  };

  // Finish Interview & Run AI Report Generation
  const handleFinishInterview = async (finalMessages: Message[]) => {
    setPhase('evaluating');
    setStatusMessage('Compiling transcripts and evaluating your answers...');
    speak.stop();
    stopListening();

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    try {
      // 1. Gather all questions and answers
      const finalQuestions: string[] = [];
      const finalTranscripts: string[] = [];

      for (let i = 0; i < finalMessages.length; i++) {
        if (finalMessages[i].role === 'assistant') {
          finalQuestions.push(finalMessages[i].content);
        } else {
          finalTranscripts.push(finalMessages[i].content);
        }
      }

      // Ensure equal lengths
      while (finalTranscripts.length < finalQuestions.length) {
        finalTranscripts.push('(No answer provided)');
      }

      const qaHistoryBlock = finalQuestions
        .map((q, idx) => `Q${idx + 1}: ${q}\nA${idx + 1}: ${finalTranscripts[idx] || '(no answer given)'}`)
        .join('\n\n---\n\n');

      // Check if user has a resume in their profile to fetch text content
      let resumeText = '';
      if (userProfile?.resumeTextContent) {
        resumeText = userProfile.resumeTextContent;
      }

      // Calculate a dynamic Resume alignment score using Grok (or set a default if not found)
      let resumeScoreNum = 70; // default mock
      if (resumeText) {
        setStatusMessage('Analyzing resume matching...');
        try {
          const resScoreText = await grokGenerateText(
            `You are a strict HR recruiter. Calculate an alignment score (0 to 100) based on how well this candidate's resume fits the role of a ${role} at ${company}. Output ONLY the integer.`,
            `Resume content:\n${resumeText.slice(0, 3000)}`,
            0.1,
            5
          );
          const parsed = parseInt(resScoreText.trim(), 10);
          if (!isNaN(parsed)) resumeScoreNum = parsed;
        } catch (e) {
          console.error(e);
        }
      }

      setStatusMessage('Analyzing conversational performance and generating feedback...');

      const feedbackSystemPrompt = `You are an experienced technical hiring manager from ${company} evaluating a candidate after a live technical round.
Your goal is to write a balanced, highly professional technical evaluation report. Focus on correctness, depth of explanation, problem-solving, and communication skill.
Adhere strictly to the requested markdown output format.`;

      const feedbackUserPrompt = `
Based on the candidate's performance in this conversational interview for the role of ${role} at ${company} (Difficulty: ${difficulty}), please provide a comprehensive evaluation.

Interview Transcripts (Conversation History):
${qaHistoryBlock}

Please evaluate the candidate and output the feedback in the following strict format:

**Resume Analysis:**
- [Bullet point analysis of candidate's suitability based on their responses]
- [Identify a key strength shown in the answers]
- [Identify an area of improvement]

**Answer Quality:**
- [Bullet point analysis of answer clarity, technical depth, and communication]
- [Comment on how they handled follow-up questions]
- [Overall communication style assessment]

**Overall Evaluation:**
[Your 1-2 sentence executive summary of the candidate's performance.]

**Verdict:** [Strong Hire | Hire | Leaning No | No Hire]

**Scores:**
Resume Score: ${resumeScoreNum}/100
Q&A Score: [SCORE]/100
`;

      const feedbackRaw = await grokGenerateText(feedbackSystemPrompt, feedbackUserPrompt, 0.2, 1200);

      // Parse Q&A Score from feedback
      const parseScoreValue = (regex: RegExp): number => {
        const match = feedbackRaw.match(regex);
        if (match && match[1]) {
          return parseInt(match[1], 10);
        }
        return 0;
      };

      const qnaScoreNum = parseScoreValue(/Q&A Score:\s*(\d{1,3})(?:\s*\/\s*100)?/i) || 60;
      const overallScoreNum = Math.round((resumeScoreNum * 0.4) + (qnaScoreNum * 0.6));

      setStatusMessage('Saving interview results to your history...');

      // Mock Candidate Info
      const candidateInfo = {
        name: userProfile?.fullname || userProfile?.name || user?.email?.split('@')[0] || 'Candidate',
        email: user?.email || 'candidate@test.com',
        phone: userProfile?.phone || 'N/A',
        language: 'en',
        experienceType: userProfile?.experience ? 'experienced' : 'fresher',
        totalExperienceYears: userProfile?.experience || '0',
        totalExperienceMonths: '0',
        currentLocation: userProfile?.location || 'N/A'
      };

      const attemptData = {
        jobId: interviewId,
        jobTitle: `${company} One-on-One: ${role}`,
        jobDescription: `Conversational one-on-one technical round simulating an interview at ${company} for a ${role} position. Difficulty: ${difficulty}.`,
        questions: finalQuestions,
        answers: finalTranscripts,
        feedback: feedbackRaw,
        score: `${overallScoreNum}/100`,
        resumeScore: `${resumeScoreNum}/100`,
        qnaScore: `${qnaScoreNum}/100`,
        candidateInfo,
        status: 'Completed',
        submittedAt: new Date(), // Using raw Date for client-side write fallback compatibility
        candidateUID: user?.uid || null,
        interviewId: interviewId,
        isMock: true,
        meta: { company, difficulty, isOneOnOne: true }
      };

      // Save to Firebase under interviews/:id/attempts
      const attemptsColRef = collection(db, 'interviews', interviewId, 'attempts');
      const docRef = await addDoc(attemptsColRef, attemptData);

      setPhase('completed');
      setStatusMessage('Report saved successfully!');
      
      messageBox.showConfirm(
        'Congratulations! Your One-on-One interview is complete. Would you like to view your detailed technical report now?',
        () => navigate(`/candidate/one-on-one/report/${interviewId}/${docRef.id}`),
        () => navigate('/candidate/mock-history')
      );
    } catch (err) {
      console.error('Finalization error:', err);
      messageBox.showError('An error occurred while compiling your feedback report. Returning to dashboard.');
      navigate('/candidate/mock-interview');
    }
  };

  // Time Limit Expired
  const handleTimeOver = () => {
    messageBox.showError('Time is up! Compiling your interview feedback report...');
    handleFinishInterview(messages);
  };

  // End Interview Early
  const handleEndCall = () => {
    messageBox.showConfirm(
      'Are you sure you want to end the interview now? We will evaluate you based on the questions answered so far.',
      () => handleFinishInterview(messages)
    );
  };

  // Render Time Format (mm:ss)
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  if (phase === 'initializing' || phase === 'evaluating') {
    return (
      <div className="min-h-screen bg-[#08080c] flex flex-col items-center justify-center p-6 text-white">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-blue-500/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-primary border-r-primary/50 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <HelpCircle className="absolute inset-0 m-auto text-4xl text-primary animate-pulse" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          {phase === 'initializing' ? 'Entering Video Meeting' : 'Google Meet Call Ended'}
        </h2>
        <p className="text-gray-400 text-center text-sm md:text-base max-w-md animate-pulse">
          {statusMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen max-h-screen bg-[#111] text-white flex flex-col font-sans overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-16 px-6 bg-[#1a1c20] border-b border-[#2d3135] flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
            One-on-One Round
          </div>
          <h1 className="text-sm md:text-base font-bold text-gray-200">
            {company} Interview Simulation — {role} ({difficulty})
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Status badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#2d3135] rounded-full text-xs text-gray-300 font-medium">
            <span className={`w-2 h-2 rounded-full ${statusMessage.includes('Listening') ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`}></span>
            {statusMessage}
          </div>

          {/* Time Remaining Pill */}
          <div className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-inner ${timeLeft < 60 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-[#292d32] text-gray-200 border border-[#3e444b]'}`}>
            <i className="far fa-clock"></i>
            {formatTime(timeLeft)}
          </div>
        </div>
      </header>

      {/* Main Container: Video Area + Chat Panel (Extremely Stable aspect ratios, zero resizing jumps) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Left Side: Video Screens Area - FIXED widths, stable viewport sizing */}
        <div className="flex-1 p-3 md:p-6 bg-[#111] flex flex-col justify-center items-center overflow-hidden min-h-0 relative">
          <div className="w-full max-w-5xl h-full flex flex-col md:flex-row gap-4 md:gap-6 items-stretch justify-center relative">
            
            {/* Box 1: AI Interviewer Avatar Screen */}
            <div className="flex-1 bg-[#1f2023] rounded-3xl border border-[#2d3135] relative overflow-hidden flex flex-col items-center justify-center p-6 shadow-xl aspect-video md:aspect-auto">
              <div className="absolute top-4 left-4 bg-black/40 px-3 py-1 rounded-full text-xs font-bold text-gray-300">
                AI Presenter
              </div>

              {/* Glowing Interactive Waveform / Avatar */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className={`w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary via-indigo-600 to-blue-500 flex items-center justify-center shadow-2xl relative transition-transform duration-300 ${statusMessage.includes('speaking') ? 'scale-105 shadow-primary/20' : ''}`}>
                  {/* Outer breathing rings when speaking */}
                  {statusMessage.includes('speaking') && (
                    <>
                      <div className="absolute -inset-4 border-2 border-primary/30 rounded-full animate-ping"></div>
                      <div className="absolute -inset-8 border border-primary/10 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    </>
                  )}
                  {statusMessage.includes('thinking') ? (
                    <div className="w-16 h-16 border-4 border-t-white border-white/20 rounded-full animate-spin"></div>
                  ) : (
                    <div className="text-4xl font-black tracking-tight text-white select-none">AI</div>
                  )}
                </div>

                <div className="text-center">
                  <h3 className="font-bold text-base md:text-lg text-white">AI Technical Recruiter</h3>
                  <p className="text-[10px] md:text-xs text-gray-400 mt-1 uppercase font-bold tracking-widest">
                    {statusMessage.includes('speaking') ? 'Speaking...' : statusMessage.includes('thinking') ? 'Thinking...' : 'Muted'}
                  </p>
                </div>
              </div>

              {/* Subtitles Overlay inside AI Card */}
              {currentQuestion && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2.5 rounded-2xl border border-white/5 max-h-[80px] overflow-y-auto text-xs text-center text-gray-200">
                  <span className="font-bold text-primary mr-1">Question:</span>
                  "{currentQuestion}"
                </div>
              )}
            </div>

            {/* Box 2: Candidate Live Camera View (PiP Floating on Mobile, equal split screen on Desktop) */}
            <div className="absolute bottom-4 right-4 w-28 h-40 md:relative md:bottom-0 md:right-0 md:w-auto md:h-auto md:flex-1 bg-[#1f2023] rounded-2xl md:rounded-3xl border border-white/10 md:border-[#2d3135] overflow-hidden flex items-center justify-center shadow-2xl md:shadow-xl aspect-video md:aspect-auto z-20">
              <div className="absolute top-4 left-4 bg-black/40 px-3 py-1 rounded-full text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <span>You</span>
                {isMuted && <MicOff size={12} className="text-red-500" />}
              </div>

              {/* Active mic input indicator inside candidate box */}
              {!isMuted && micVolume > 0 && (
                <div className="absolute top-4 right-4 flex items-end gap-0.5 h-4 px-2 py-1 bg-black/40 rounded-full">
                  <div className="w-0.75 bg-green-400 rounded-full transition-all" style={{ height: `${Math.max(15, micVolume * 0.8)}%` }}></div>
                  <div className="w-0.75 bg-green-400 rounded-full transition-all" style={{ height: `${Math.max(30, micVolume * 1.2)}%` }}></div>
                  <div className="w-0.75 bg-green-400 rounded-full transition-all" style={{ height: `${Math.max(10, micVolume * 0.6)}%` }}></div>
                </div>
              )}

              {/* HTML5 video preview */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover transition-opacity duration-300 rounded-3xl ${isCamOff ? 'opacity-0' : 'opacity-100'}`}
              />

              {/* Placeholder when Camera is disabled */}
              {isCamOff && (
                <div className="absolute inset-0 bg-[#252830] flex flex-col items-center justify-center space-y-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-700/50 flex items-center justify-center border border-white/10 text-white font-bold text-xl md:text-2xl">
                    {userProfile?.fullname?.charAt(0).toUpperCase() || 'C'}
                  </div>
                  <p className="text-xs md:text-sm font-bold text-gray-400">Camera is off</p>
                </div>
              )}

              {/* Floating Closed Captions inside Self Box (Only on Desktop) */}
              {(isListening || transcriptText || interimTranscript) && (
                <div className="hidden md:block absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/5 min-h-[60px] max-h-[100px] overflow-y-auto text-xs text-gray-200">
                  <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-1">Closed Captions (Speaking):</p>
                  <p className="italic">
                    {transcriptText}
                    <span className="text-green-400">{interimTranscript}</span>
                    {!transcriptText && !interimTranscript && (
                      <span className="text-gray-500">Listening to microphone... Speak now</span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile-Only User Subtitles Overlay (Floating above Hero layout) */}
          {(isListening || transcriptText || interimTranscript) && (
            <div className="md:hidden absolute bottom-24 left-4 right-4 bg-black/85 backdrop-blur-sm px-4 py-2.5 rounded-2xl border border-white/10 z-30 text-center text-xs text-gray-200 shadow-2xl">
              <span className="font-bold text-green-400 block mb-0.5 text-[9px] uppercase tracking-wider">You:</span>
              <span className="italic">
                {transcriptText}
                <span className="text-green-400">{interimTranscript}</span>
                {!transcriptText && !interimTranscript && "Listening..."}
              </span>
            </div>
          )}
        </div>

        {/* Right Side: Google Meet Chat Overlay / Panel - Fully rigid size desktop split & sliding full sheet mobile drawer */}
        {isSidebarOpen && (
          <aside className="w-full lg:w-[420px] lg:max-w-[420px] bg-[#1a1c20] border-t lg:border-t-0 lg:border-l border-[#2d3135] flex flex-col h-full overflow-hidden shrink-0 absolute inset-0 z-40 lg:relative lg:inset-auto lg:z-0">
            {/* Header */}
            <div className="px-4 py-4 border-b border-[#2d3135] flex items-center justify-between shrink-0">
              <span className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <MessageSquare size={16} className="text-primary" />
                Live Transcript & Meeting Chat
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#2d3135] text-[10px] font-bold uppercase tracking-wider text-gray-400 rounded-md">
                  Continuous Round
                </span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden p-1.5 hover:bg-[#2d3135] active:scale-90 rounded-full text-gray-400 hover:text-white transition-all"
                  title="Close Chat panel"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="p-3.5 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-xs text-blue-400 flex gap-2">
                <AlertCircle className="shrink-0 mt-0.5" size={14} />
                <div>
                  <p className="font-bold">Google Meet privacy notice</p>
                  <p className="mt-0.5">Camera and audio streams are processed locally for active speaking. We only capture textual transcript data for your final score report. No video is recorded or stored on any server.</p>
                </div>
              </div>

              {messages.map((m, idx) => (
                <div key={idx} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-1.5 mb-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider ${m.role === 'user' ? 'justify-end' : ''}`}>
                    <span>{m.role === 'user' ? 'You' : 'Interviewer'}</span>
                    <span>•</span>
                    <span>{m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[85%] text-xs md:text-sm font-medium leading-relaxed ${m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-[#292d32] text-gray-200 rounded-tl-none border border-[#3e444b]'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Type Answer Fallback Input */}
            <div className="p-4 border-t border-[#2d3135] bg-[#1a1c20] space-y-3 shrink-0">
              {/* Closed caption text status banner */}
              {isListening && (
                <div className="flex items-center justify-between text-xs text-green-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                    Speech recognition active...
                  </span>
                  <button onClick={stopListening} className="text-gray-400 hover:text-white underline">
                    Pause
                  </button>
                </div>
              )}

              <div className="flex gap-2">
                <textarea
                  rows={2}
                  placeholder={isListening ? "Speech is transcribing above... or type here manually" : "Type your technical answer here..."}
                  className="flex-1 px-3 py-2 border border-[#2d3135] bg-[#252830] rounded-xl text-sm text-white focus:outline-none focus:border-primary placeholder-gray-500 resize-none font-medium"
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmitAnswer();
                    }
                  }}
                />
                <button
                  onClick={handleSubmitAnswer}
                  className="bg-primary hover:bg-primary/95 text-white w-12 rounded-xl flex items-center justify-center shadow-lg transition-transform active:scale-95 shrink-0"
                  title="Submit Technical Answer"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Meeting Toolbar (Google Meet standard layout) */}
      <footer className="h-20 bg-[#1a1c20] border-t border-[#2d3135] flex items-center justify-between px-6 shrink-0 z-10">
        {/* Left indicators */}
        <div className="hidden md:flex items-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-wider">
          <span>Continuous Adaptive Round</span>
        </div>

        {/* Center action buttons */}
        <div className="flex items-center gap-3 mx-auto md:mx-0">
          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-[#3c4043] hover:bg-[#4a4f54] text-gray-200'}`}
            title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          {/* Camera Button */}
          <button
            onClick={toggleCamera}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isCamOff ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-[#3c4043] hover:bg-[#4a4f54] text-gray-200'}`}
            title={isCamOff ? 'Turn on camera' : 'Turn off camera'}
          >
            {isCamOff ? <VideoOff size={20} /> : <Video size={20} />}
          </button>

          {/* Special "Submit Answer / Next" button */}
          <button
            onClick={handleSubmitAnswer}
            className="px-6 h-12 bg-gradient-to-r from-primary to-blue-600 hover:from-primary hover:to-blue-700 text-white text-sm font-bold rounded-full flex items-center gap-2 shadow-xl hover:shadow-primary/10 transition-all hover:-translate-y-0.5 active:scale-95"
            title="Done Speaking / Submit Answer"
          >
            <span>Submit Answer</span>
            <Send size={14} />
          </button>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            className="w-14 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-lg hover:shadow-red-600/10 active:scale-95"
            title="End Interview Call"
          >
            <PhoneOff size={20} />
          </button>
        </div>

        {/* Right action toggles */}
        <div className="flex items-center gap-2">
          {/* Chat toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isSidebarOpen ? 'bg-primary/20 text-primary' : 'bg-[#3c4043] hover:bg-[#4a4f54] text-gray-200'}`}
            title="Toggle Live Chat sidebar"
          >
            <MessageSquare size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default OneOnOneSession;
