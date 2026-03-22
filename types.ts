export interface Interview {
    id: string;
    title: string;
    description: string;
    duration: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    questions: Question[];
    candidateId?: string;
    recruiterId: string;
    scheduledAt: any; 
    status: 'Pending' | 'Invited' | 'Completed' | 'Cancelled';
    accessCode: string;
    report?: InterviewReport;
    createdAt: any;
    updatedAt: any;
  }
  
  export interface Question {
    id: string;
    text: string;
    type: 'Code' | 'Theory';
    expectedOutput?: string;
    constraints?: string[];
  }
  
  export interface InterviewReport {
    id: string;
    interviewId: string;
    candidateId: string;
    score: number;
    feedback: string;
    codeAnalysis: CodeAnalysis[];
    recordingUrl?: string; // URL to the video recording of the interview
    completedAt: any;
  }
  
  export interface CodeAnalysis {
    questionId: string;
    language: string;
    code: string;
    output: string[];
    executionTime: number;
    pass: boolean; // Did the code pass all test cases?
  }
  
  export interface UserProfile {
    uid: string;
    email: string;
    role: 'candidate' | 'recruiter' | 'admin';
    name: string;
    photoURL?: string;
    company?: string;
    skills?: string[];
    experience?: number;
    resumeUrl?: string;
  }
  
  export interface Job {
    id: string;
    recruiterId: string;
    title: string;
    description: string;
    requirements: string[];
    location: string;
    salary: number;
    postedAt: any;
  }
  
  export interface Application {
    id: string;
    jobId: string;
    candidateId: string;
    status: 'Applied' | 'Shortlisted' | 'Rejected' | 'Hired';
    appliedAt: any;
  }
  
  export interface Test {
    id: string;
    title: string;
    description: string;
    duration: number;
    questions: TestQuestion[];
    recruiterId: string;
    accessCode: string;
    createdAt: any;
  }
  
  export interface TestQuestion {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number; 
  }
  
  export interface TestResult {
    id: string;
    testId: string;
    candidateId: string;
    score: number;
    answers: number[];
    completedAt: any;
  }
  