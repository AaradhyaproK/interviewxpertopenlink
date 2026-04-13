import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useMessageBox } from '../components/MessageBox';
import { Star, Send, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import { ThemeProvider } from '../context/ThemeContext';

const SubmitReviewContent: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userType, setUserType] = useState<'candidate' | 'recruiter'>('candidate');
  const [loading, setLoading] = useState(false);
  const messageBox = useMessageBox();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      messageBox.showError('Please provide a star rating.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        name,
        email,
        contact,
        review,
        rating,
        userType,
        approved: false, // All reviews require manual approval from Firestore
        createdAt: serverTimestamp(),
      });
      messageBox.showSuccess('Thank you! Your review has been submitted for approval.');
      navigate('/'); // Navigate to home after submission
    } catch (error) {
      console.error('Error submitting review:', error);
      messageBox.showError('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0C10] text-slate-900 dark:text-white font-sans relative overflow-hidden flex flex-col transition-colors duration-300">
      <Navbar />

      {/* Background Effects - Optimized for performance */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[#0B0C10] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"></div>
      <div className="hidden lg:block absolute -top-1/4 left-0 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[150px] pointer-events-none animate-blob"></div>
      <div className="hidden lg:block absolute -bottom-1/4 right-0 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[150px] pointer-events-none animate-blob animation-delay-2000"></div>

      <main className="flex-1 w-full flex items-center justify-center px-4 relative z-10 pt-24 pb-12">
        <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="relative bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 p-8 shadow-2xl dark:shadow-black/20 backdrop-blur-xl">
            <Link to="/reviews" className="absolute top-4 left-4 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors font-medium">
              <ArrowLeft size={16} />
              Back to Reviews
            </Link>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Share Your Experience</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">We'd love to hear what you think about InterviewXpert.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">I am a...</label>
                <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setUserType('candidate')} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border ${userType === 'candidate' ? 'bg-primary/10 border-primary text-primary ring-1 ring-primary' : 'bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
                        Candidate
                    </button>
                    <button type="button" onClick={() => setUserType('recruiter')} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border ${userType === 'recruiter' ? 'bg-primary/10 border-primary text-primary ring-1 ring-primary' : 'bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
                        Recruiter / Professional
                    </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" />
                <input type="email" placeholder="Your Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" />
              </div>
              <input type="tel" placeholder="Contact Number (Optional)" value={contact} onChange={(e) => setContact(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" />
              <textarea placeholder="Write your review here..." required rows={5} value={review} onChange={(e) => setReview(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" />
              <div className="text-center space-y-3 pt-4 border-t border-gray-100 dark:border-white/5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Rating</label>
                <div className="flex justify-center items-center gap-2" onMouseLeave={() => setHoverRating(0)}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={36}
                      className="cursor-pointer transition-all text-gray-300 dark:text-gray-600 hover:!text-yellow-400"
                      onMouseEnter={() => setHoverRating(star)}
                      onClick={() => setRating(star)}
                      fill={(hoverRating || rating) >= star ? '#FFC107' : 'none'}
                      stroke={(hoverRating || rating) >= star ? '#FFC107' : 'currentColor'}
                    />
                  ))}
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? <i className="fas fa-spinner fa-spin"></i> : <Send size={18} />}
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

const SubmitReview: React.FC = () => {
  return (
    <ThemeProvider>
      <SubmitReviewContent />
    </ThemeProvider>
  );
};

export default SubmitReview;