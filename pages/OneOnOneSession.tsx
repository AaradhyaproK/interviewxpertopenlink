import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, addDoc, collection, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { speak } from '../lib/tts';
import { bedrockChat, bedrockGenerateText } from '../services/bedrockService';
import { transcribeAudioBlobWithAssemblyAI } from '../services/assemblyService';
import { useMessageBox } from '../components/MessageBox';
import { 
  Video, VideoOff, Mic, MicOff, PhoneOff, Send, HelpCircle, 
  AlertCircle, MessageSquare, X, RotateCcw, CheckCircle2, 
  FileText, Sparkles, Volume2, ArrowRight, ShieldCheck, Clock
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

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

  // Resume & JD Context
  const [resumeText, setResumeText] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [parsingResume, setParsingResume] = useState(false);

  // Conversation States
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [typedAnswer, setTypedAnswer] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Speech Recognition States
  const [isListening, setIsListening] = useState(false);
  const [transcriptText, setTranscriptText] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [autoSubmitCountdown, setAutoSubmitCountdown] = useState<number | null>(null);
  const [detectedVoiceCommand, setDetectedVoiceCommand] = useState<string | null>(null);
  const [speechNetworkError, setSpeechNetworkError] = useState(false);

  // Status / Phase State: lobby -> active -> evaluating -> completed
  const [phase, setPhase] = useState<'lobby' | 'active' | 'evaluating' | 'completed'>('lobby');
  const [statusMessage, setStatusMessage] = useState('Setting up camera & audio...');

  // Timer: Dynamic based on setup
  const [timeLeft, setTimeLeft] = useState(durationParam * 60);

  // Dynamic Refs to keep event listeners stable
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lobbyVideoRef = useRef<HTMLVideoElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [micVolume, setMicVolume] = useState(0);
  const micAnimFrameRef = useRef<number | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const consecutiveErrorsRef = useRef<number>(0);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Stable references for async callbacks
  const isSpeakingRef = useRef<boolean>(false);
  const isMutedRef = useRef<boolean>(false);
  isMutedRef.current = isMuted;
  const phaseRef = useRef<'lobby' | 'active' | 'evaluating' | 'completed'>('lobby');
  phaseRef.current = phase;
  const messagesRef = useRef<Message[]>([]);
  messagesRef.current = messages;
  const currentQuestionRef = useRef<string>('');
  currentQuestionRef.current = currentQuestion;
  const transcriptTextRef = useRef<string>('');
  transcriptTextRef.current = transcriptText;
  const typedAnswerRef = useRef<string>('');
  typedAnswerRef.current = typedAnswer;

  // 1. Fetch Resume & JD from Storage or Firestore
  useEffect(() => {
    const loadInterviewContext = async () => {
      let loadedResume = '';
      let loadedJd = '';
      try {
        loadedResume = sessionStorage.getItem(`one_on_one_resume_${interviewId}`) || '';
        loadedJd = sessionStorage.getItem(`one_on_one_jd_${interviewId}`) || '';
      } catch (e) {
        console.warn('SessionStorage read error', e);
      }

      if (!loadedResume && interviewId) {
        try {
          const docRef = doc(db, 'interviews', interviewId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            loadedResume = data.resumeTextContent || '';
            loadedJd = data.description || '';
            setResumeFileName(data.resumeFileName || '');
          }
        } catch (err) {
          console.error('Failed to load interview context from Firestore:', err);
        }
      }

      if (!loadedResume && userProfile?.resumeTextContent) {
        loadedResume = userProfile.resumeTextContent;
        setResumeFileName(userProfile.resumeFileName || 'Profile Resume');
      }

      setResumeText(loadedResume);
      setJobDescription(loadedJd || `Technical interview at ${company} for ${role}.`);
    };

    loadInterviewContext();
  }, [interviewId, userProfile, company, role]);

  // PDF Text Extraction Helper
  const extractPdfText = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }
    return fullText;
  };

  const handleLobbyResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsingResume(true);
    setResumeFileName(file.name);
    try {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        const text = await extractPdfText(file);
        setResumeText(text);
        messageBox.showSuccess(`Resume "${file.name}" attached successfully!`);
      } else {
        const text = await file.text();
        setResumeText(text);
        messageBox.showSuccess(`Resume "${file.name}" loaded!`);
      }
    } catch (err) {
      console.error('Failed to parse resume:', err);
      messageBox.showError('Could not read PDF. Please ensure file is accessible.');
    } finally {
      setParsingResume(false);
    }
  };

  // 2. Initialize Camera & Microphone Stream
  useEffect(() => {
    const initMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: 'user' },
          audio: true,
        });
        setStream(mediaStream);
        if (lobbyVideoRef.current) {
          lobbyVideoRef.current.srcObject = mediaStream;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        // Setup audio analysis for live mic volume indicator
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
            if (!analyserRef.current || isMutedRef.current) {
              setMicVolume(0);
              return;
            }
            analyserRef.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
              sum += dataArray[i];
            }
            const average = sum / bufferLength;
            setMicVolume(Math.min(100, Math.round(average * 2.2)));
            micAnimFrameRef.current = requestAnimationFrame(updateVolume);
          };
          micAnimFrameRef.current = requestAnimationFrame(updateVolume);
        }
      } catch (err) {
        console.error('Camera/Mic permission denied:', err);
        messageBox.showError('Could not access camera/mic. You can continue using text chat.');
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
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      speak.stop();
    };
  }, []);

  // Update video element when stream or phase changes
  useEffect(() => {
    if (stream) {
      if (phase === 'lobby' && lobbyVideoRef.current) {
        lobbyVideoRef.current.srcObject = stream;
      } else if (phase === 'active' && videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }
  }, [stream, phase]);

  // Voice Command Detection Helper
  const checkVoiceCommands = (text: string): 'repeat' | 'end' | null => {
    const clean = text.toLowerCase().trim();
    if (
      clean.includes('repeat question') || 
      clean.includes('repeat the question') || 
      clean.includes('could you repeat') || 
      clean.includes('can you repeat') || 
      clean.includes('say that again') || 
      clean.includes('repeat please') || 
      clean === 'pardon' ||
      clean === 'repeat'
    ) {
      return 'repeat';
    }
    if (
      clean.includes('end interview') || 
      clean.includes('end the interview') || 
      clean.includes('finish interview') || 
      clean.includes('stop interview') || 
      clean.includes('i want to end') || 
      clean.includes('wrap up interview') ||
      clean.includes('terminate interview')
    ) {
      return 'end';
    }
    return null;
  };

  // Reset Silence / Auto-submit Timer
  const resetSilenceTimer = () => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setAutoSubmitCountdown(null);

    if (isSpeakingRef.current || phaseRef.current !== 'active') return;

    let seconds = 3;
    setAutoSubmitCountdown(seconds);

    countdownIntervalRef.current = setInterval(() => {
      seconds -= 1;
      if (seconds <= 0) {
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        setAutoSubmitCountdown(null);
      } else {
        setAutoSubmitCountdown(seconds);
      }
    }, 1000);

    silenceTimerRef.current = setTimeout(() => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      setAutoSubmitCountdown(null);
      handleSubmitAnswer();
    }, 3000);
  };

  const clearSilenceTimer = () => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setAutoSubmitCountdown(null);
  };

  const startMediaRecording = () => {
    if (!stream) return;
    try {
      audioChunksRef.current = [];
      const audioTracks = stream.getAudioTracks();
      if (!audioTracks || audioTracks.length === 0) return;

      const audioOnlyStream = new MediaStream(audioTracks);
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : '';

      const recorder = mimeType ? new MediaRecorder(audioOnlyStream, { mimeType }) : new MediaRecorder(audioOnlyStream);
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };
      recorder.start(400);
      mediaRecorderRef.current = recorder;
    } catch (e) {
      console.warn('MediaRecorder error:', e);
    }
  };

  const stopMediaRecording = (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const recorder = mediaRecorderRef.current;
      if (!recorder || recorder.state === 'inactive') {
        if (audioChunksRef.current.length > 0) {
          resolve(new Blob(audioChunksRef.current, { type: 'audio/webm' }));
        } else {
          resolve(null);
        }
        return;
      }

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        resolve(audioBlob);
      };
      try {
        recorder.stop();
      } catch (e) {
        resolve(null);
      }
    });
  };

  const startListening = () => {
    startMediaRecording();
    if (isMutedRef.current || isSpeakingRef.current) return;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(true);
      }
    }
  };

  const stopListening = () => {
    clearSilenceTimer();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
      } catch (err) {
        // Ignore
      }
    }
  };

  // 3. Setup Speech Recognition Lifecycle (Continuous, persistent listening)
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
      setSpeechNetworkError(false);
      consecutiveErrorsRef.current = 0;
    };

    recognition.onresult = (event: any) => {
      consecutiveErrorsRef.current = 0;
      setSpeechNetworkError(false);

      // If user speaks while AI is talking, gracefully interrupt AI speech
      if (isSpeakingRef.current) {
        speak.stop();
        isSpeakingRef.current = false;
        setStatusMessage('Listening to your answer...');
      }

      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      const combinedRecent = (final || interim).trim();

      // Check for voice commands
      const command = checkVoiceCommands(combinedRecent);
      if (command === 'repeat') {
        setDetectedVoiceCommand('Repeat Question');
        clearSilenceTimer();
        handleVoiceRepeatQuestion();
        return;
      }
      if (command === 'end') {
        setDetectedVoiceCommand('End Interview');
        clearSilenceTimer();
        handleVoiceEndInterview();
        return;
      }

      if (final) {
        setTranscriptText((prev) => {
          const space = prev.endsWith(' ') || prev === '' ? '' : ' ';
          return prev + space + final;
        });
      }
      setInterimTranscript(interim);

      const currentFullText = (transcriptTextRef.current + ' ' + final + ' ' + interim).trim();
      if (currentFullText.length > 5) {
        resetSilenceTimer();
      }
    };

    recognition.onerror = (event: any) => {
      const err = event.error;
      // Normal speech pauses / silence are ignored
      if (err === 'no-speech' || err === 'audio-capture') {
        return;
      }
      console.warn('Speech recognition status:', err);

      if (err === 'network' || err === 'service-not-allowed') {
        consecutiveErrorsRef.current += 1;
        if (consecutiveErrorsRef.current >= 4) {
          setSpeechNetworkError(true);
          console.info('Switched speech backup to AssemblyAI Cloud STT.');
        }
      } else if (err === 'not-allowed') {
        consecutiveErrorsRef.current = 99;
        setSpeechNetworkError(true);
        messageBox.showError('Microphone permission blocked. Please allow mic or use text chat.');
      }
    };

    recognition.onend = () => {
      // Seamlessly keep recognition alive whenever in active interview round
      if (phaseRef.current === 'active' && !isMutedRef.current && !isSpeakingRef.current && consecutiveErrorsRef.current < 4) {
        if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = setTimeout(() => {
          if (phaseRef.current === 'active' && !isMutedRef.current && !isSpeakingRef.current && consecutiveErrorsRef.current < 4) {
            try {
              recognitionRef.current?.start();
              setIsListening(true);
            } catch (e) {
              // Ignore if already starting
            }
          }
        }, 100);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, []);

  // Voice Command Handlers
  const handleVoiceRepeatQuestion = async () => {
    const questionToRepeat = currentQuestionRef.current;
    if (!questionToRepeat) return;

    setStatusMessage('Repeating question...');
    isSpeakingRef.current = true;
    speak.stop();

    const repeatPhrase = `Sure! Let me repeat the question: ${questionToRepeat}`;
    await speak(repeatPhrase, {
      onEnd: () => {
        isSpeakingRef.current = false;
        setStatusMessage('Listening to your answer...');
        startListening();
        setDetectedVoiceCommand(null);
      },
      onError: () => {
        isSpeakingRef.current = false;
        setStatusMessage('Listening to your answer...');
        startListening();
        setDetectedVoiceCommand(null);
      }
    });
  };

  const handleVoiceEndInterview = async () => {
    isSpeakingRef.current = true;
    speak.stop();
    stopListening();
    clearSilenceTimer();

    const farewell = `Understood. Thank you for your time today! Ending the interview and compiling your technical evaluation report now.`;
    await speak(farewell, {
      onEnd: () => {
        isSpeakingRef.current = false;
        handleFinishInterview(messagesRef.current);
      },
      onError: () => {
        isSpeakingRef.current = false;
        handleFinishInterview(messagesRef.current);
      }
    });
  };

  // 4. Start Interview Round from Lobby
  const handleJoinMeeting = async () => {
    setPhase('active');
    setStatusMessage('AI Interviewer is joining and reviewing your resume...');

    const candidateName = userProfile?.fullname || user?.displayName || 'Candidate';
    const resumeSummaryPrompt = resumeText 
      ? `Candidate Resume Summary:\n${resumeText.slice(0, 1500)}` 
      : `(No resume uploaded. Candidate is applying as a ${role})`;

    try {
      const initialSystemPrompt = `You are a polite, highly empathetic, and professional technical interviewer from ${company} conducting a ${difficulty}-level 1-on-1 technical interview for the role of ${role}.
Target Job Context: ${jobDescription}
${resumeSummaryPrompt}

Instructions:
1. Warmly welcome the candidate (${candidateName}) to the ${company} interview.
2. Acknowledge that you have their resume/profile ready.
3. Ask the opening question: Ask them to briefly introduce themselves and highlight their key technical projects or areas of expertise from their background.
4. Keep the greeting and opening question concise, friendly, and under 3 sentences total.
5. CRITICAL: Output ONLY the final plain spoken greeting directly to the candidate. Do NOT output your thoughts, planning, or reasoning tags (<think>...</think>).`;

      const openingText = await bedrockGenerateText(
        initialSystemPrompt,
        "Please welcome the candidate and ask your opening interview question now.",
        'questions',
        0.6
      );
      const cleanOpening = openingText.trim() || `Hello ${candidateName}, welcome to your ${difficulty}-level interview for ${role} at ${company}! I've reviewed your background. To kick things off, could you tell me about yourself and your proudest project?`;

      setCurrentQuestion(cleanOpening);
      const firstMessage: Message = {
        role: 'assistant',
        content: cleanOpening,
        timestamp: new Date(),
      };
      setMessages([firstMessage]);
      setCurrentQuestionIndex(1);

      // Speak Greeting Out Loud
      setStatusMessage('AI is speaking...');
      isSpeakingRef.current = true;
      await speak(cleanOpening, {
        onEnd: () => {
          isSpeakingRef.current = false;
          setStatusMessage('Listening to your answer...');
          startListening();
        },
        onError: () => {
          isSpeakingRef.current = false;
          setStatusMessage('Listening to your answer...');
          startListening();
        }
      });
    } catch (err) {
      console.error('Failed to generate opening greeting:', err);
      const fallback = `Hello ${candidateName}, welcome to your ${difficulty} technical interview at ${company} for the ${role} position. To start off, please tell me about yourself and the core technologies you work with.`;
      setCurrentQuestion(fallback);
      setMessages([{ role: 'assistant', content: fallback, timestamp: new Date() }]);
      setCurrentQuestionIndex(1);
      isSpeakingRef.current = true;
      await speak(fallback, {
        onEnd: () => {
          isSpeakingRef.current = false;
          setStatusMessage('Listening to your answer...');
          startListening();
        },
        onError: () => {
          isSpeakingRef.current = false;
          setStatusMessage('Listening to your answer...');
          startListening();
        }
      });
    }
  };

  // 5. Timer Logic
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

  // Scroll Chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, transcriptText, interimTranscript]);

  // Mute / Unmute
  const toggleMute = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuted;
        setIsMuted(!isMuted);
        if (!isMuted) {
          stopListening();
        } else {
          if (!isSpeakingRef.current) {
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

  // Submit Answer & Trigger Contextual Cross-Question
  const handleSubmitAnswer = async () => {
    clearSilenceTimer();
    stopListening();
    speak.stop();
    isSpeakingRef.current = false;

    // Combine spoken speech and typed text cleanly
    const typed = typedAnswer.trim();
    let spoken = (transcriptText + ' ' + interimTranscript).trim();

    // If local SpeechRecognition was empty or failed, transcribe via AssemblyAI
    if (!typed && !spoken) {
      try {
        setStatusMessage('Transcribing speech via AssemblyAI...');
        const audioBlob = await stopMediaRecording();
        if (audioBlob && audioBlob.size > 1500) {
          const aiTranscript = await transcribeAudioBlobWithAssemblyAI(audioBlob);
          if (aiTranscript && aiTranscript.trim()) {
            spoken = aiTranscript.trim();
          }
        }
      } catch (err) {
        console.warn('AssemblyAI transcription fallback:', err);
      }
    }

    let finalAnswer = '';
    if (typed && spoken && !typed.includes(spoken) && !spoken.includes(typed)) {
      finalAnswer = `${spoken}\n${typed}`;
    } else if (typed) {
      finalAnswer = typed;
    } else {
      finalAnswer = spoken;
    }

    if (!finalAnswer) {
      messageBox.showError('Please speak or type your answer before submitting.');
      return;
    }

    // Reset inputs
    setTranscriptText('');
    setInterimTranscript('');
    setTypedAnswer('');
    audioChunksRef.current = [];

    // Append user answer to messages
    const updatedMessages: Message[] = [
      ...messagesRef.current,
      { role: 'user', content: finalAnswer, timestamp: new Date() },
    ];
    setMessages(updatedMessages);

    // AI Contextual Cross-Questioning with Emotion & Compliments
    setStatusMessage('AI is analyzing your response...');
    try {
      const resumeContext = resumeText 
        ? `Candidate Resume Details:\n${resumeText.slice(0, 2000)}` 
        : `Role Applied: ${role}`;

      const questionNum = currentQuestionIndex + 1;
      let stageDirective = "Probe deeper into the technical architecture, libraries, or design decisions mentioned in the candidate's last answer.";
      if (timeLeft < 90) {
        stageDirective = "We are in the final minute of the interview. Ask a concise closing question about what technical challenge or architecture they are most excited to tackle next.";
      } else if (questionNum === 2) {
        stageDirective = "Probe deeply into the core technical stack, libraries, or architecture decisions they just described.";
      } else if (questionNum === 3 || questionNum === 4) {
        stageDirective = "Ask an edge-case or failure-handling scenario (e.g. concurrency race conditions, database deadlocks, network timeouts, cache invalidation).";
      } else if (questionNum >= 5) {
        stageDirective = "Ask about architectural trade-offs (e.g. why they chose that design pattern over alternatives, and how they would scale it by 100x).";
      }

      const systemPrompt = `You are an elite, articulate, and empathetic Senior Principal Technical Interviewer from ${company} interviewing for the role of ${role} (${difficulty} level).
Job Context: ${jobDescription}
${resumeContext}

Current Interview Progress: Question ${questionNum}
Focus For This Turn: ${stageDirective}

Conversational Guidelines:
1. AUTHENTIC EMOTION & COMPLIMENT: Start with a natural, varied 1-sentence reaction to their specific response (e.g. "I really like how you reasoned through that state synchronization.", "That's a very pragmatic way to isolate failure domains.", "Solid breakdown of your caching strategy."). Do not use the exact same praise every time.
2. SHARP CROSS-QUESTION: Ask ONE direct, insightful technical cross-question probing into the practical implementation, edge case, or trade-off from their answer or resume.
3. CONVERSATIONAL BREVITY: Keep the total spoken text to 2 sentences maximum so it sounds natural over voice.
4. ABSOLUTE RULE: Output ONLY the plain conversational words. Never output <think> tags, markdown symbols, asterisks, or role prefixes like "Interviewer:".`;

      const historyForAI = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const nextQuestionResponse = await bedrockChat(systemPrompt, historyForAI, 'questions', 0.65);
      const cleanQuestion = nextQuestionResponse.trim();

      setCurrentQuestion(cleanQuestion);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: cleanQuestion, timestamp: new Date() },
      ]);
      setCurrentQuestionIndex((prev) => prev + 1);

      setStatusMessage('AI is speaking...');
      isSpeakingRef.current = true;
      await speak(cleanQuestion, {
        onEnd: () => {
          isSpeakingRef.current = false;
          setStatusMessage('Listening to your answer...');
          startListening();
        },
        onError: () => {
          isSpeakingRef.current = false;
          setStatusMessage('Listening to your answer...');
          startListening();
        }
      });
    } catch (err) {
      console.error('Failed to generate next cross-question:', err);
      const fallback = `That's a solid point! Let's explore further: How would you handle scalability bottlenecks and error recovery in that architecture?`;
      setCurrentQuestion(fallback);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: fallback, timestamp: new Date() },
      ]);
      setCurrentQuestionIndex((prev) => prev + 1);
      isSpeakingRef.current = true;
      await speak(fallback, {
        onEnd: () => {
          isSpeakingRef.current = false;
          startListening();
        },
        onError: () => {
          isSpeakingRef.current = false;
          startListening();
        }
      });
    }
  };

  // Finish Interview & Run AI Report Generation
  const handleFinishInterview = async (finalMessages: Message[]) => {
    setPhase('evaluating');
    setStatusMessage('Compiling transcripts and generating your comprehensive technical report...');
    clearSilenceTimer();
    speak.stop();
    stopListening();
    isSpeakingRef.current = false;

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    try {
      const finalQuestions: string[] = [];
      const finalTranscripts: string[] = [];

      for (let i = 0; i < finalMessages.length; i++) {
        if (finalMessages[i].role === 'assistant') {
          finalQuestions.push(finalMessages[i].content);
        } else {
          finalTranscripts.push(finalMessages[i].content);
        }
      }

      while (finalTranscripts.length < finalQuestions.length) {
        finalTranscripts.push('(No answer provided)');
      }

      const transcriptBlocks = finalQuestions.map((q, idx) => {
        return `[Question ${idx + 1}]: ${q}\n[Candidate Answer]: ${finalTranscripts[idx] || '(No response)'}\n`;
      }).join('\n');

      const evaluationPrompt = `You are the Lead Technical Interview Evaluator at ${company}.
Evaluate this ${difficulty}-level One-on-One Technical Interview for the role of "${role}".

Candidate Name: ${userProfile?.fullname || 'Candidate'}
Target Company: ${company}
Difficulty: ${difficulty}
${resumeText ? `Candidate Resume Content:\n${resumeText.slice(0, 1500)}` : ''}

Full Interview Transcript:
${transcriptBlocks}

Provide a detailed, professional evaluation in strictly the following Markdown sections:

### 1. Executive Summary
Provide a concise 3-4 sentence executive overview of the candidate's performance, technical grasp, and conversational confidence.

### 2. Technical Competency & Depth
Evaluate the candidate's depth of knowledge across the topics discussed, cross-questioning handling, and problem-solving reasoning.

### 3. Communication & Articulation
Assess clarity, structured thinking, response pacing, and poise.

### 4. Resume & Project Alignment
Score how well their answers backed up the skills, tools, and experiences listed in their resume/background.

### 5. Key Strengths
- Bullet point key positive aspects observed.

### 6. Areas for Improvement
- Actionable, constructive steps for leveling up technical explanations and design decisions.

### 7. Numerical Scores
At the very end of your response, provide numerical ratings strictly formatted as:
Overall Score: [0-100]
Technical Score: [0-100]
Communication Score: [0-100]
Resume Alignment Score: [0-100]`;

      const feedbackRaw = await bedrockGenerateText(
        `You are an expert technical hiring manager at ${company}. Provide a fair, structured, and constructive candidate assessment.`,
        evaluationPrompt,
        'report',
        0.2,
        1500
      );

      const overallMatch = feedbackRaw.match(/Overall Score:\s*(\d+)/i);
      const overallScoreNum = overallMatch ? parseInt(overallMatch[1], 10) : 75;

      const techMatch = feedbackRaw.match(/Technical Score:\s*(\d+)/i);
      const qnaScoreNum = techMatch ? parseInt(techMatch[1], 10) : 78;

      const resumeMatch = feedbackRaw.match(/Resume Alignment Score:\s*(\d+)/i);
      const resumeScoreNum = resumeMatch ? parseInt(resumeMatch[1], 10) : 80;

      const candidateInfo = {
        name: userProfile?.fullname || user?.displayName || 'Candidate',
        email: user?.email || '',
        phone: userProfile?.phone || '',
        education: userProfile?.education || '',
        experience: userProfile?.experience || '',
        skills: userProfile?.skills || []
      };

      const attemptData = {
        questions: finalQuestions,
        transcripts: finalTranscripts,
        answers: finalTranscripts,
        feedback: feedbackRaw,
        score: `${overallScoreNum}/100`,
        resumeScore: `${resumeScoreNum}/100`,
        qnaScore: `${qnaScoreNum}/100`,
        candidateInfo,
        status: 'Completed',
        submittedAt: new Date(),
        candidateUID: user?.uid || null,
        interviewId: interviewId,
        isMock: true,
        meta: { company, difficulty, isOneOnOne: true, role }
      };

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

  const handleTimeOver = () => {
    messageBox.showError('Time is up! Compiling your interview feedback report...');
    handleFinishInterview(messagesRef.current);
  };

  const handleEndCall = () => {
    messageBox.showConfirm(
      'Are you sure you want to end the interview now? We will evaluate you based on the questions answered so far.',
      () => handleFinishInterview(messagesRef.current)
    );
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // -------------------------------------------------------------
  // LOBBY VIEW: Pre-Interview Check & Resume Preview
  // -------------------------------------------------------------
  if (phase === 'lobby') {
    return (
      <div className="min-h-screen bg-[#0d0f12] text-white flex flex-col items-center justify-center p-4 md:p-8 font-sans">
        <div className="w-full max-w-4xl bg-[#16181d] rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-0.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold uppercase tracking-wider">
                  Pre-Meeting Lobby
                </span>
                <span className="text-xs text-gray-400 font-medium">Ready to Join</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                {company} Technical Interview
              </h1>
              <p className="text-gray-400 text-sm mt-0.5">
                Role: <span className="text-gray-200 font-semibold">{role}</span> • Level: <span className="text-gray-200 font-semibold">{difficulty}</span> • Duration: <span className="text-gray-200 font-semibold">{durationParam} Mins</span>
              </p>
            </div>

            <button
              onClick={handleJoinMeeting}
              className="px-8 py-4 bg-gradient-to-r from-primary to-blue-600 hover:to-primary text-white rounded-2xl font-bold text-base shadow-xl shadow-primary/20 transition-all hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap self-start md:self-auto"
            >
              <span>Join Live Interview</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left: Camera & Microphone Preview */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                <Video size={16} className="text-primary" /> Camera & Audio Check
              </h3>
              <div className="relative aspect-video bg-[#0f1013] rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center shadow-inner">
                <video
                  ref={lobbyVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover transition-opacity ${isCamOff ? 'opacity-0' : 'opacity-100'}`}
                />
                {isCamOff && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 text-sm">
                    <VideoOff size={32} className="mb-2 text-gray-500" />
                    <span>Camera is turned off</span>
                  </div>
                )}
                
                {/* Floating controls on preview */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <button
                    onClick={toggleMute}
                    className={`p-2.5 rounded-full transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                  <button
                    onClick={toggleCamera}
                    className={`p-2.5 rounded-full transition-all ${isCamOff ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                    title={isCamOff ? 'Turn on camera' : 'Turn off camera'}
                  >
                    {isCamOff ? <VideoOff size={16} /> : <Video size={16} />}
                  </button>
                </div>
              </div>

              {/* Mic Level Visualizer */}
              <div className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/5 text-xs text-gray-400">
                <Mic size={14} className={micVolume > 10 ? "text-green-400 animate-pulse" : "text-gray-500"} />
                <span>Microphone Level:</span>
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-75"
                    style={{ width: `${Math.min(100, micVolume)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Right: Resume Status & Voice Controls Info */}
            <div className="space-y-6">
              
              {/* Resume Card */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText size={16} className="text-primary" />
                    Resume Input
                  </span>
                  {resumeText ? (
                    <span className="px-2.5 py-0.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold rounded-full flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      Attached ({resumeText.trim().split(/\s+/).length} words)
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 bg-yellow-500/10 text-yellow-400 text-xs font-bold rounded-full">
                      Optional
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {resumeText 
                    ? `The AI has parsed your resume and will tailor deep cross-questions based on your projects, languages, and technical experience.`
                    : `Upload your resume so the AI can ask personalized questions directly referencing your skills and projects.`}
                </p>

                <div className="flex items-center gap-3">
                  <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer text-xs font-semibold transition-all">
                    <Sparkles size={14} className="text-primary" />
                    <span>{parsingResume ? 'Parsing PDF...' : resumeFileName ? `Change (${resumeFileName})` : 'Upload Resume PDF'}</span>
                    <input
                      type="file"
                      accept=".pdf,.txt,.doc,.docx"
                      className="hidden"
                      onChange={handleLobbyResumeUpload}
                      disabled={parsingResume}
                    />
                  </label>
                </div>
              </div>

              {/* Voice Command & Control Features */}
              <div className="p-5 rounded-2xl bg-blue-500/[0.04] border border-blue-500/20 space-y-3">
                <span className="text-sm font-bold text-blue-400 flex items-center gap-2">
                  <Volume2 size={16} />
                  Intelligent Voice Controls & Features
                </span>
                <ul className="text-xs text-gray-300 space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-primary shrink-0">🎙️ Say "Repeat question":</span>
                    <span>AI repeats the current question instantly without advancing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-red-400 shrink-0">🛑 Say "End interview":</span>
                    <span>AI concludes the meeting and prepares your performance report.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-green-400 shrink-0">⚡ Auto-Answer Detection:</span>
                    <span>Detects when you finish speaking with automatic 3s submission.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-yellow-400 shrink-0">💬 Dynamic Empathy:</span>
                    <span>AI acknowledges and compliments your answers before cross-questioning.</span>
                  </li>
                </ul>
              </div>

              {/* Join Action */}
              <button
                onClick={handleJoinMeeting}
                className="w-full py-4 bg-gradient-to-r from-primary to-blue-600 hover:to-primary text-white rounded-2xl font-bold text-base shadow-xl shadow-primary/20 transition-all hover:scale-102 flex items-center justify-center gap-2"
              >
                <span>Ready — Enter Live Interview</span>
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // EVALUATING / COMPLETED STATE
  // -------------------------------------------------------------
  if (phase === 'evaluating') {
    return (
      <div className="min-h-screen bg-[#08080c] flex flex-col items-center justify-center p-6 text-white font-sans">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-blue-500/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-primary border-r-primary/50 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <HelpCircle className="absolute inset-0 m-auto text-4xl text-primary animate-pulse" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Interview Completed
        </h2>
        <p className="text-gray-400 text-center text-sm md:text-base max-w-md animate-pulse">
          {statusMessage}
        </p>
      </div>
    );
  }

  // -------------------------------------------------------------
  // ACTIVE MEETING VIEW (Google Meet Style)
  // -------------------------------------------------------------
  return (
    <div className="h-screen max-h-screen bg-[#111] text-white flex flex-col font-sans overflow-hidden">
      
      {/* Top Header Bar */}
      <header className="h-16 px-6 bg-[#1a1c20] border-b border-[#2d3135] flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            1-on-1 Round
          </div>
          <h1 className="text-sm md:text-base font-bold text-gray-200 truncate max-w-xs md:max-w-md">
            {company} Interview — {role} ({difficulty})
          </h1>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          {/* Active Voice Command Toast */}
          {detectedVoiceCommand && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-xs text-primary font-bold animate-bounce">
              <Volume2 size={14} />
              Command: {detectedVoiceCommand}
            </div>
          )}

          {/* Status badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#2d3135] rounded-full text-xs text-gray-300 font-medium">
            <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : isSpeakingRef.current ? 'bg-blue-500 animate-ping' : 'bg-gray-400'}`}></span>
            {statusMessage}
          </div>

          {/* Time Remaining Pill */}
          <div className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-inner ${timeLeft < 60 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-[#292d32] text-gray-200 border border-[#3e444b]'}`}>
            <Clock size={14} />
            {formatTime(timeLeft)}
          </div>
        </div>
      </header>

      {/* Main Container: Video Area + Chat Panel */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Left Side: Video Screens Area */}
        <div className="flex-1 p-3 md:p-6 bg-[#111] flex flex-col justify-center items-center overflow-hidden min-h-0 relative">
          <div className="w-full max-w-5xl h-full flex flex-col md:flex-row gap-4 md:gap-6 items-stretch justify-center relative">
            
            {/* Box 1: AI Interviewer Avatar Screen */}
            <div className="flex-1 bg-[#1f2023] rounded-3xl border border-[#2d3135] relative overflow-hidden flex flex-col items-center justify-center p-6 shadow-xl aspect-video md:aspect-auto">
              <div className="absolute top-4 left-4 bg-black/40 px-3 py-1 rounded-full text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <span>AI Interviewer ({company})</span>
                {statusMessage.includes('speaking') && <Volume2 size={12} className="text-primary animate-pulse" />}
              </div>

              {/* Glowing Interactive Waveform / Avatar */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className={`w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary via-indigo-600 to-blue-500 flex items-center justify-center shadow-2xl relative transition-transform duration-300 ${statusMessage.includes('speaking') ? 'scale-105 shadow-primary/30 ring-4 ring-primary/20' : ''}`}>
                  {statusMessage.includes('speaking') && (
                    <>
                      <div className="absolute -inset-4 border-2 border-primary/40 rounded-full animate-ping"></div>
                      <div className="absolute -inset-8 border border-primary/20 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                    </>
                  )}
                  {statusMessage.includes('analyzing') ? (
                    <div className="w-16 h-16 border-4 border-t-white border-white/20 rounded-full animate-spin"></div>
                  ) : (
                    <div className="text-4xl font-black tracking-tight text-white select-none">AI</div>
                  )}
                </div>

                <div className="text-center">
                  <h3 className="font-bold text-base md:text-lg text-white">AI Technical Recruiter</h3>
                  <p className="text-[10px] md:text-xs text-gray-400 mt-1 uppercase font-bold tracking-widest">
                    {statusMessage.includes('speaking') ? 'Speaking...' : statusMessage.includes('analyzing') ? 'Cross-Questioning...' : 'Listening'}
                  </p>
                </div>
              </div>

              {/* Subtitles Overlay inside AI Card */}
              {currentQuestion && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 max-h-[90px] overflow-y-auto text-xs text-center text-gray-200">
                  <span className="font-bold text-primary mr-1">Current Question:</span>
                  "{currentQuestion}"
                </div>
              )}
            </div>

            {/* Box 2: Candidate Live Camera View */}
            <div className="absolute bottom-4 right-4 w-32 h-44 md:relative md:bottom-0 md:right-0 md:w-auto md:h-auto md:flex-1 bg-[#1f2023] rounded-2xl md:rounded-3xl border border-white/10 md:border-[#2d3135] overflow-hidden flex items-center justify-center shadow-2xl md:shadow-xl aspect-video md:aspect-auto z-20">
              <div className="absolute top-4 left-4 bg-black/40 px-3 py-1 rounded-full text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <span>You</span>
                {isMuted && <MicOff size={12} className="text-red-500" />}
              </div>

              {/* Active mic input indicator inside candidate box */}
              {!isMuted && micVolume > 0 && (
                <div className="absolute top-4 right-4 flex items-end gap-0.5 h-4 px-2 py-1 bg-black/40 rounded-full">
                  <div className="w-0.75 bg-green-400 rounded-full transition-all" style={{ height: `${Math.max(20, micVolume * 0.8)}%` }}></div>
                  <div className="w-0.75 bg-green-400 rounded-full transition-all" style={{ height: `${Math.max(35, micVolume * 1.2)}%` }}></div>
                  <div className="w-0.75 bg-green-400 rounded-full transition-all" style={{ height: `${Math.max(15, micVolume * 0.6)}%` }}></div>
                </div>
              )}

              {/* Auto-Submit Countdown Floating Pill */}
              {autoSubmitCountdown !== null && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg animate-pulse z-30 whitespace-nowrap">
                  <span>Auto-submitting in {autoSubmitCountdown}s</span>
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

              {/* Floating Closed Captions inside Self Box */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 min-h-[65px] max-h-[110px] overflow-y-auto text-xs text-gray-200 shadow-2xl z-30">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${!isMuted && micVolume > 0 ? 'bg-green-500 animate-ping' : 'bg-green-400'}`}></span>
                    <span>Live Voice Transcript:</span>
                  </p>
                  {autoSubmitCountdown !== null && (
                    <span className="text-yellow-400 font-bold bg-yellow-500/20 px-2 py-0.5 rounded-full text-[10px] animate-pulse">
                      Submitting in {autoSubmitCountdown}s
                    </span>
                  )}
                </div>
                <p className="leading-relaxed font-medium">
                  {transcriptText && <span className="text-white">{transcriptText} </span>}
                  {interimTranscript && <span className="text-green-300 animate-pulse">{interimTranscript}</span>}
                  {!transcriptText && !interimTranscript && (
                    <span className="text-gray-400 italic">
                      {!isMuted ? '🎙️ Listening... Speak your technical explanation or answer' : 'Microphone is muted'}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Voice Command Hint Bar */}
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-400 bg-white/[0.02] px-4 py-1.5 rounded-full border border-white/5">
            <span className="flex items-center gap-1 font-medium">
              <span className="text-primary font-bold">🎙️ Voice Shortcuts:</span> Say <span className="text-white font-semibold">"Repeat question"</span> to hear again • Say <span className="text-red-400 font-semibold">"End interview"</span> to finish
            </span>
          </div>

          {/* Mobile-Only User Subtitles Overlay */}
          {(isListening || transcriptText || interimTranscript) && (
            <div className="md:hidden absolute bottom-24 left-4 right-4 bg-black/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 z-30 text-center text-xs text-gray-200 shadow-2xl">
              <span className="font-bold text-green-400 block mb-0.5 text-[9px] uppercase tracking-wider">You:</span>
              <span className="italic">
                {transcriptText}
                <span className="text-green-400">{interimTranscript}</span>
                {!transcriptText && !interimTranscript && "Listening..."}
              </span>
            </div>
          )}
        </div>

        {/* Right Side: Google Meet Chat Panel */}
        {isSidebarOpen && (
          <aside className="w-full lg:w-[420px] lg:max-w-[420px] bg-[#1a1c20] border-t lg:border-t-0 lg:border-l border-[#2d3135] flex flex-col h-full overflow-hidden shrink-0 absolute inset-0 z-40 lg:relative lg:inset-auto lg:z-0">
            
            {/* Header */}
            <div className="px-4 py-4 border-b border-[#2d3135] flex items-center justify-between shrink-0">
              <span className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <MessageSquare size={16} className="text-primary" />
                Live Transcript & Meeting Chat
              </span>
              <div className="flex items-center gap-2">
                {resumeText && (
                  <span className="px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold rounded-md flex items-center gap-1">
                    <CheckCircle2 size={10} /> Resume Active
                  </span>
                )}
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
              <div className="p-3.5 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-xs text-blue-300 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <ShieldCheck size={14} className="text-blue-400" />
                  Context-Aware 1-on-1 Interview
                </p>
                <p className="text-[11px] leading-relaxed text-blue-200/80">
                  The AI adapts questions based on your resume and previous answers. Speak naturally — answers auto-submit after a 3s pause.
                </p>
              </div>

              {messages.map((m, idx) => (
                <div key={idx} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-1.5 mb-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider ${m.role === 'user' ? 'justify-end' : ''}`}>
                    <span>{m.role === 'user' ? 'You' : `Interviewer (${company})`}</span>
                    <span>•</span>
                    <span>{m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className={`p-3.5 rounded-2xl max-w-[88%] text-xs md:text-sm font-medium leading-relaxed ${m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-[#292d32] text-gray-200 rounded-tl-none border border-[#3e444b]'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Type Answer Fallback Input & Submission */}
            <div className="p-4 border-t border-[#2d3135] bg-[#1a1c20] space-y-3 shrink-0">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-green-400 font-medium">
                  <span className={`w-2 h-2 rounded-full ${!isMuted ? 'bg-green-500 animate-ping' : 'bg-gray-500'}`}></span>
                  {!isMuted ? 'Voice & Mic Active' : 'Microphone Muted'}
                </span>
                {autoSubmitCountdown !== null && (
                  <span className="text-yellow-400 font-bold">
                    Submitting in {autoSubmitCountdown}s
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <textarea
                  rows={2}
                  placeholder={!isMuted ? "Speak your answer or type here..." : "Type your technical answer here and press Enter to submit..."}
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
                  title="Submit Answer (or press Enter)"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Meeting Toolbar */}
      <footer className="h-20 bg-[#1a1c20] border-t border-[#2d3135] flex items-center justify-between px-6 shrink-0 z-10">
        
        {/* Left indicators */}
        <div className="hidden md:flex items-center gap-3 text-xs text-gray-400 font-bold">
          <button
            onClick={handleVoiceRepeatQuestion}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-gray-200 transition-all text-xs font-semibold"
            title="Repeat Question"
          >
            <RotateCcw size={14} className="text-primary" />
            <span>Repeat Question</span>
          </button>
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

          {/* Done Answering / Submit Button */}
          <button
            onClick={handleSubmitAnswer}
            className="px-6 h-12 bg-gradient-to-r from-primary to-blue-600 hover:from-primary hover:to-blue-700 text-white text-sm font-bold rounded-full flex items-center gap-2 shadow-xl hover:shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            title="Done Speaking / Submit Answer"
          >
            <span>Done Answering</span>
            <Send size={14} />
          </button>

          {/* End Call Button */}
          <button
            onClick={handleEndCall}
            className="w-14 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-lg hover:shadow-red-600/20 active:scale-95"
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
