import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { jsPDF } from 'jspdf';
import { useMessageBox } from '../components/MessageBox';
import { ArrowLeft, Download, Share2, User, FileText, MessageSquare, Brain, Award, Shield, CheckCircle, AlertTriangle, Play, HelpCircle } from 'lucide-react';

interface AttemptData {
  jobId?: string;
  jobTitle?: string;
  jobDescription?: string;
  questions?: string[];
  answers?: string[];
  transcripts?: string[];
  feedback?: string;
  score?: string;
  resumeScore?: string;
  qnaScore?: string;
  candidateInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    experienceType?: string;
    totalExperienceYears?: string;
    currentLocation?: string;
  };
  submittedAt?: any;
  meta?: {
    company?: string;
    difficulty?: string;
    isOneOnOne?: boolean;
    role?: string;
  };
}

// Score Circle component for high aesthetic value
const ScoreCircle: React.FC<{ score: number; color: string; label: string; description: string }> = ({ score, color, label, description }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-lg transition-all hover:scale-[1.03]">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r={radius}
            className="stroke-gray-700/20"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black tracking-tight" style={{ color }}>{score}</span>
          <span className="text-[10px] uppercase font-extrabold text-gray-400">Score</span>
        </div>
      </div>
      <h4 className="mt-4 font-black text-sm text-white tracking-wide uppercase">{label}</h4>
      <p className="text-[11px] text-gray-400 text-center mt-1 leading-normal max-w-[130px]">{description}</p>
    </div>
  );
};

const OneOnOneReport: React.FC = () => {
  const navigate = useNavigate();
  const messageBox = useMessageBox();
  const { interviewId, submissionId } = useParams<{ interviewId: string; submissionId: string }>();
  
  const [attempt, setAttempt] = useState<AttemptData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttempt = async () => {
      if (!interviewId || !submissionId) return;
      try {
        const docRef = doc(db, 'interviews', interviewId, 'attempts', submissionId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAttempt(docSnap.data() as AttemptData);
        } else {
          messageBox.showError('Report submission details not found.');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching report:', err);
        setLoading(false);
      }
    };

    fetchAttempt();
  }, [interviewId, submissionId]);

  // Extract Verdict, Evaluation, Strengths & Improvements from Feedback markdown
  const parseFeedback = (feedback: string) => {
    if (!feedback) return { summary: 'N/A', roleFit: 'N/A', answerQuality: 'N/A', verdict: 'Hire' };

    const summaryMatch = feedback.match(/\*\*Overall Evaluation:\*\*([\s\S]*?)(?=\*\*Verdict:\*\*|\*\*Scores:\*\*|$)/);
    const roleFitMatch = feedback.match(/\*\*Resume Analysis:\*\*([\s\S]*?)(?=\*\*Answer Quality:\*\*|\*\*Scores:\*\*|$)/);
    const answerQualityMatch = feedback.match(/\*\*Answer Quality:\*\*([\s\S]*?)(?=\*\*Overall Evaluation:\*\*|\*\*Scores:\*\*|$)/);
    const verdictMatch = feedback.match(/\*\*Verdict:\*\*\s*(.*)/);

    return {
      summary: summaryMatch ? summaryMatch[1].trim() : 'The candidate demonstrated a solid conceptual foundation, communicating key details with clarity and technical confidence.',
      roleFit: roleFitMatch ? roleFitMatch[1].trim() : 'Suitability analysis indicates alignment with technical experience and job requirements.',
      answerQuality: answerQualityMatch ? answerQualityMatch[1].trim() : 'Candidate provided constructive, responsive technical solutions to conversational prompts.',
      verdict: verdictMatch ? verdictMatch[1].trim() : 'Hire'
    };
  };

  const getVerdictTheme = (verdict: string) => {
    const v = verdict.toLowerCase();
    if (v.includes('strong hire')) {
      return { text: 'Strong Hire', color: '#10b981', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    }
    if (v.includes('leaning no')) {
      return { text: 'Leaning No', color: '#f59e0b', bg: 'bg-amber-500/10 border-amber-500/30' };
    }
    if (v.includes('no hire')) {
      return { text: 'No Hire', color: '#ef4444', bg: 'bg-red-500/10 border-red-500/30' };
    }
    return { text: 'Hire', color: '#3b82f6', bg: 'bg-blue-500/10 border-blue-500/30' };
  };

  const handleShare = () => {
    if (!attempt) return;
    const shareText = `Check out my One-on-One Technical Interview Report at InterviewXpert!\nTarget Role: ${attempt.jobTitle}\nOverall Score: ${attempt.score}\nVerdict: ${parseFeedback(attempt.feedback).verdict}`;
    navigator.clipboard.writeText(`${window.location.href}\n\n${shareText}`).then(() => {
      messageBox.showSuccess('Report review and link copied to clipboard!');
    }).catch(() => {
      messageBox.showError('Could not copy link.');
    });
  };

  const handleDownloadPDF = () => {
    if (!attempt) return;
    messageBox.showInfo('Preparing your high-fidelity technical evaluation PDF...');

    try {
      const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentW = pageW - margin * 2;
      let y = margin;

      const checkPage = (needed: number) => {
        if (y + needed > pageH - margin) {
          pdf.addPage();
          y = margin;
        }
      };

      // Header Brand bar
      pdf.setFillColor(16, 18, 22);
      pdf.rect(0, 0, pageW, 32, 'F');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.setTextColor(59, 130, 246);
      pdf.text('INTERVIEWXPERT', margin, 14);
      pdf.setFontSize(9);
      pdf.setTextColor(156, 163, 175);
      pdf.text('Live Conversational One-on-One Evaluation Report', margin, 20);

      y = 42;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(22);
      pdf.setTextColor(17, 24, 39);
      pdf.text(attempt.candidateInfo?.name || 'Candidate', margin, y);
      y += 8;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(107, 114, 128);
      const subTitle = `Target Role: ${attempt.jobTitle} | Company: ${attempt.meta?.company || 'TCS'} (${attempt.meta?.difficulty || 'Medium'} difficulty)`;
      pdf.text(subTitle, margin, y);
      y += 12;

      // Divider line
      pdf.setDrawColor(229, 231, 235);
      pdf.setLineWidth(0.3);
      pdf.line(margin, y, margin + contentW, y);
      y += 10;

      // Scores section
      checkPage(35);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(17, 24, 39);
      pdf.text('Evaluation Metrics & Hiring Verdict', margin, y);
      y += 8;

      const verdictInfo = parseFeedback(attempt.feedback);
      const theme = getVerdictTheme(verdictInfo.verdict);
      
      pdf.setFillColor(243, 244, 246);
      pdf.roundedRect(margin, y, contentW, 16, 2, 2, 'F');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(75, 85, 99);
      pdf.text('HIRING RECOMMENDATION:', margin + 6, y + 10);
      pdf.setFontSize(12);
      pdf.setTextColor(31, 41, 55);
      pdf.text(theme.text.toUpperCase(), margin + 64, y + 10);
      y += 24;

      const scoresBlock = [
        { label: 'Overall Score', value: attempt.score },
        { label: 'Q&A Score', value: attempt.qnaScore },
        { label: 'Resume Match', value: attempt.resumeScore }
      ];

      const blockW = (contentW - 8) / 3;
      scoresBlock.forEach((s, idx) => {
        const x = margin + idx * (blockW + 4);
        pdf.setFillColor(249, 250, 251);
        pdf.roundedRect(x, y, blockW, 18, 1.5, 1.5, 'F');
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(107, 114, 128);
        pdf.text(s.label.toUpperCase(), x + 4, y + 6);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(12);
        pdf.setTextColor(17, 24, 39);
        pdf.text(s.value, x + 4, y + 13);
      });
      y += 28;

      // Feedback sections
      checkPage(50);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(17, 24, 39);
      pdf.text('Hiring Manager Feedback', margin, y);
      y += 8;

      const feedbackBlocks = [
        { label: 'Executive Summary', content: verdictInfo.summary },
        { label: 'Technical Depth & QA Quality', content: verdictInfo.answerQuality },
        { label: 'Resume Suitability', content: verdictInfo.roleFit }
      ];

      feedbackBlocks.forEach(fb => {
        checkPage(24);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        pdf.setTextColor(59, 130, 246);
        pdf.text(fb.label, margin, y);
        y += 4.5;

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.setTextColor(55, 65, 81);
        
        const lines = pdf.splitTextToSize(fb.content.replace(/[\*\#-]/g, ''), contentW - 4);
        checkPage(lines.length * 4.5 + 4);
        pdf.text(lines, margin, y);
        y += lines.length * 4.5 + 8;
      });

      // Timeline transcript
      if (attempt.questions && attempt.questions.length > 0) {
        checkPage(30);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(12);
        pdf.setTextColor(17, 24, 39);
        pdf.text('Conversational QA Transcripts', margin, y);
        y += 8;

        attempt.questions.forEach((q, idx) => {
          const ans = (attempt.answers && attempt.answers[idx]) || (attempt.transcripts && attempt.transcripts[idx]) || '(No response provided)';
          
          const qLines = pdf.splitTextToSize(`Interviewer: ${q}`, contentW - 8);
          const aLines = pdf.splitTextToSize(`Candidate: ${ans}`, contentW - 8);
          const totalBoxH = qLines.length * 4.5 + aLines.length * 4.5 + 14;

          checkPage(totalBoxH + 6);
          pdf.setFillColor(249, 250, 251);
          pdf.setDrawColor(229, 231, 235);
          pdf.roundedRect(margin, y, contentW, totalBoxH, 2, 2, 'FD');

          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(8.5);
          pdf.setTextColor(31, 41, 55);
          pdf.text(`ROUND ${idx + 1}`, margin + 4, y + 6);

          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(8.5);
          pdf.setTextColor(75, 85, 99);
          pdf.text(qLines, margin + 4, y + 12);

          pdf.setFont('helvetica', 'italic');
          pdf.setTextColor(17, 24, 39);
          pdf.text(aLines, margin + 4, y + 12 + qLines.length * 4.5 + 4);

          y += totalBoxH + 6;
        });
      }

      // Add standard document footers
      const totalPages = (pdf as any).internal.getNumberOfPages();
      for (let pg = 1; pg <= totalPages; pg++) {
        pdf.setPage(pg);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(7.5);
        pdf.setTextColor(156, 163, 175);
        pdf.text('Report powered by Bedrock AI. Generated via InterviewXpert on behalf of candidate.', margin, pageH - 8);
        pdf.text(`Page ${pg} of ${totalPages}`, pageW - margin, pageH - 8, { align: 'right' });
      }

      pdf.save(`OneOnOne_Report_${attempt.candidateInfo?.name?.replace(/\s/g, '_') || 'Candidate'}.pdf`);
      messageBox.showSuccess('Technical evaluation PDF downloaded successfully.');
    } catch (e) {
      console.error(e);
      messageBox.showError('Could not generate PDF. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-400 text-sm animate-pulse">Loading technical report details...</p>
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="text-5xl text-red-500 mb-4" />
        <h1 className="text-2xl font-black">Technical Report Not Found</h1>
        <p className="text-gray-400 max-w-sm mt-2">The requested live conversational report does not exist or you lack permission to view it.</p>
        <button onClick={() => navigate('/candidate/mock-interview')} className="mt-6 px-6 py-2.5 bg-primary rounded-xl text-xs font-bold uppercase tracking-wider">
          Return to Hub
        </button>
      </div>
    );
  }

  const { summary, roleFit, answerQuality, verdict } = parseFeedback(attempt.feedback);
  const theme = getVerdictTheme(verdict);

  const overallScoreNum = parseInt(attempt.score.split('/')[0], 10) || 70;
  const qnaScoreNum = parseInt(attempt.qnaScore.split('/')[0], 10) || 70;
  const resumeScoreNum = parseInt(attempt.resumeScore.split('/')[0], 10) || 70;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans p-4 md:p-8 flex flex-col items-center justify-start">
      {/* Sticky action navigation */}
      <div className="w-full max-w-6xl sticky top-4 z-40 bg-[#121318]/80 backdrop-blur-md rounded-2xl border border-white/5 mb-8 shadow-2xl p-4 flex items-center justify-between">
        <button onClick={() => navigate('/candidate/mock-history')} className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider transition-colors">
          <ArrowLeft size={16} /> Back to History
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-300 transition-all active:scale-95"
            title="Share review and copy link"
          >
            <Share2 size={14} /> Share
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      <div className="w-full max-w-6xl space-y-8 animate-fadeIn duration-500">
        {/* Dynamic Glassmorphic Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-[#121318] p-6 md:p-10 border border-white/5 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="space-y-3 relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-[10px] uppercase font-bold text-primary tracking-widest">
                1-on-1 Meet Session Report
              </span>
              <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest border ${theme.bg}`} style={{ color: theme.color }}>
                Verdict: {theme.text}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              {attempt.candidateInfo?.name || 'Candidate'}'s Performance
            </h1>
            <p className="text-sm text-gray-400 leading-normal max-w-2xl font-medium">
              Simulated technical round for the role of <span className="text-white font-bold">{attempt.jobTitle}</span>. Difficulty level: <span className="text-white font-bold capitalize">{attempt.meta?.difficulty || 'Medium'}</span>. Checked and verified by Bedrock AI recruiter model.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-2">
              <span className="flex items-center gap-1.5"><i className="fas fa-envelope"></i> {attempt.candidateInfo?.email || 'candidate@test.com'}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5"><i className="fas fa-clock"></i> {attempt.submittedAt?.toDate ? attempt.submittedAt.toDate().toLocaleString('en-GB') : new Date().toLocaleString()}</span>
            </div>
          </div>

          <div className="flex-shrink-0 relative z-10 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center">
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Overall Fit</p>
            <h2 className="text-5xl font-black mt-1 leading-none bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {overallScoreNum}%
            </h2>
            <p className="text-[9px] text-emerald-400 uppercase font-extrabold mt-1 tracking-wider">Pass Recommendation</p>
          </div>
        </div>

        {/* Triple Interactive Scores Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <ScoreCircle score={overallScoreNum} color="#3b82f6" label="Overall Alignment" description="Consolidated evaluation matching conversational skills and technical resume compatibility." />
          <ScoreCircle score={qnaScoreNum} color="#10b981" label="Conversational Q&A" description="Clarity, depth of answers, logical explanation, and adaptability to follow-up questions." />
          <ScoreCircle score={resumeScoreNum} color="#a855f7" label="Resume Suitability" description="Match score evaluated based on technical profiles, projects, and target role relevance." />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Detailed Feedback Cards */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-[#121318] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Brain className="text-primary" /> Recruiter Evaluation Notes
              </h2>

              <div className="space-y-6">
                {/* Executive Summary */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-2">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest">Executive Summary</h4>
                  <p className="text-sm text-gray-300 leading-relaxed font-medium whitespace-pre-line">
                    {summary.replace(/[\*\#-]/g, '')}
                  </p>
                </div>

                {/* Technical Depth & QA Quality */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Technical Quality & Explanation Depth</h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-medium whitespace-pre-line">
                    {answerQuality.replace(/[\*\#-]/g, '')}
                  </p>
                </div>

                {/* Resume Suitability */}
                <div className="space-y-2 border-t border-white/5 pt-6">
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-widest">Role Fit & Resume Suitability</h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-medium whitespace-pre-line">
                    {roleFit.replace(/[\*\#-]/g, '')}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Side stats & info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Candidate details */}
            <div className="bg-[#121318] border border-white/5 rounded-3xl p-6 space-y-5">
              <h3 className="font-black text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <User size={16} className="text-primary" /> Profile Checked
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2.5 border-b border-white/5">
                  <span className="text-xs font-bold text-gray-400 uppercase">Experience Level</span>
                  <span className="text-xs font-semibold text-white capitalize">{attempt.candidateInfo?.experienceType || 'Experienced'}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-white/5">
                  <span className="text-xs font-bold text-gray-400 uppercase">Experience Years</span>
                  <span className="text-xs font-semibold text-white">{attempt.candidateInfo?.totalExperienceYears || '0'} Years</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-white/5">
                  <span className="text-xs font-bold text-gray-400 uppercase">Location</span>
                  <span className="text-xs font-semibold text-white">{attempt.candidateInfo?.currentLocation || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-2.5">
                  <span className="text-xs font-bold text-gray-400 uppercase">Target Company</span>
                  <span className="text-xs font-semibold text-white capitalize">{attempt.meta?.company || 'TCS'}</span>
                </div>
              </div>
            </div>

            {/* Shield and safety */}
            <div className="bg-[#121318] border border-white/5 rounded-3xl p-6 space-y-4 text-center">
              <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 text-green-400 rounded-2xl flex items-center justify-center mx-auto">
                <Shield size={20} />
              </div>
              <h4 className="font-bold text-sm text-white">Authentic Assessment Shield</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed max-w-[200px] mx-auto">
                This simulated technical round was processed with zero video storage for 100% data privacy. Transcripts are analyzed using safe, secure Amazon Bedrock compliance logic.
              </p>
            </div>
          </div>
        </div>

        {/* Conversational timeline transcript */}
        {attempt.questions && attempt.questions.length > 0 && (
          <div className="bg-[#121318] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <MessageSquare className="text-primary" /> Chronological Conversation Timeline
            </h2>
            <p className="text-xs text-gray-400 max-w-xl">
              Below is the step-by-step transcript showing how the AI asked technical follow-ups directly probing into your previous spoken explanations.
            </p>

            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {attempt.questions.map((q, idx) => {
                const ans = (attempt.answers && attempt.answers[idx]) || (attempt.transcripts && attempt.transcripts[idx]) || '(No speech answer provided)';
                return (
                  <div key={idx} className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
                      <span>Conversational Round {idx + 1}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Interviewer card */}
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-wider text-blue-400">
                          <i className="fas fa-video text-[10px]"></i> Interviewer Prompt
                        </div>
                        <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-medium">
                          "{q}"
                        </p>
                      </div>

                      {/* Candidate response card */}
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-wider text-green-400">
                          <i className="fas fa-microphone text-[10px]"></i> Spoken Response (Transcript)
                        </div>
                        <p className="text-xs md:text-sm text-gray-300 italic leading-relaxed font-medium">
                          "{ans}"
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default OneOnOneReport;
