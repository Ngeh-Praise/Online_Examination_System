import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button'; 
import ExamCard from '../components/ExamCard'; // Imported our clean child component
import axios from 'axios'; 
import { 
  BookOpen, 
  Layers, 
  HelpCircle, 
  History, 
  Settings, 
  LogOut, 
  Bell, 
  HelpCircle as QuestionIcon,
  Calendar, 
  Key, 
  TrendingUp, 
  CheckCircle,
  SlidersHorizontal,
  ArrowRight,
  X,
  Clock,
  Info,
  Copy,
  Check
} from 'lucide-react';

export default function StudentDashboard() {
  const { user, logout } = useAuth();

  const studentName = user?.name || 'Student';
  const matricleNumber = user?.email || 'Matricle Number';

  // State filters
  const [level, setLevel] = useState('Undergraduate - Year 4');
  const [selectedCourse, setSelectedCourse] = useState('Introduction to Artificial Intelligence (CSC 405)');

  // Component UI States
  const [isFiltering, setIsFiltering] = useState(false);
  const [isCheckingSystem, setIsCheckingSystem] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  
  // Dynamic API Data Storage
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [isLoadingExams, setIsLoadingExams] = useState(true);

  // Booking Modal Form Fields
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  
  // Direct Access Join Session State
  const [directExamCode, setDirectExamCode] = useState('');
  const [isJoiningSession, setIsJoiningSession] = useState(false);

  // Post-Booking Success Panel Display
  const [generatedExamCode, setGeneratedExamCode] = useState('');

  // ✅ FIXED: Single, flattened top-level hook with clean verification checks
  useEffect(() => {
    const fetchUpcomingExams = async () => {
      const activeUserId = user?.user_id || user?.id;
      if (!activeUserId) return;

      try {
        setIsLoadingExams(true);
        const response = await axios.get(`http://localhost:5000/api/student/upcoming-exams?userId=${activeUserId}`);
        setUpcomingExams(response.data || []);
      } catch (error) {
        console.error("Error fetching dynamic exams database rows:", error);
      } finally {
        setIsLoadingExams(false);
      }
    };

    fetchUpcomingExams();
  }, [user]);

  const handleApplyFilters = () => {
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 1000);
  };

  const handleSystemCheck = () => {
    setIsCheckingSystem(true);
    setTimeout(() => setIsCheckingSystem(false), 1500);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDirectJoinSession = (e) => {
    e.preventDefault();
    if (!directExamCode.trim()) {
      alert("Please enter a valid session access key.");
      return;
    }
    setIsJoiningSession(true);
    setTimeout(() => {
      setIsJoiningSession(false);
      alert(`Verifying dynamic slot for key: ${directExamCode}`);
    }, 1200);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) {
      alert('Please fill out all operational scheduling fields.');
      return;
    }

    try {
      setIsSubmittingBooking(true);

      const payload = {
        userId: user?.user_id || user?.id,
        level: level,
        courseTitle: selectedCourse,
        date: bookingDate,
        timeSlot: bookingTime
      };

      const response = await axios.post('http://localhost:5000/api/student/schedule', payload);
      
      // 💡 THE FIX: Safely parse backend's "bookingDetails" payload
      if (response.data && response.data.bookingDetails) {
        const details = response.data.bookingDetails;
        
        // Map backend's camelCase variables to your dashboard layout expectation
        const formattedNewExamItem = {
          id: details.examId,
          title: selectedCourse,
          date: bookingDate,
          time: bookingTime,
          exam_code: details.examCode
        };

        // 1. Prepend the new exam card into your active list immediately
        setUpcomingExams(prevExams => [formattedNewExamItem, ...prevExams]);
        
        // 2. Set this string to swap your modal interface to the Success State View
        setGeneratedExamCode(details.examCode);
        
      } else {
        // Fallback catch-all in case schema shape shifts
        alert("Booking processed, but confirmation structure layout mismatched.");
      }

    } catch (error) {
      console.error("Error processing database exam booking:", error);
      alert(error.response?.data?.error || "Failed to secure a proctored booking slot. Please check network routes.");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setGeneratedExamCode('');
    setBookingDate('');
    setBookingTime('');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col relative">
      
      {/* 1. TOP NAVIGATION BAR */}
      <header className="bg-white border-b border-slate-100 h-16 px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AcademicPortal
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <a href="#home" className="text-blue-600 border-b-2 border-blue-600 pb-5 pt-5 px-1 font-semibold transition-all">Home</a>
          <a href="#courses" className="hover:text-slate-900 pb-5 pt-5 px-1 transition-all">Courses</a>
          <a href="#calendar" className="hover:text-slate-900 pb-5 pt-5 px-1 transition-all">Calendar</a>
          <a href="#archive" className="hover:text-slate-900 pb-5 pt-5 px-1 transition-all">Archive</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-slate-600 relative rounded-full hover:bg-slate-50 transition-all">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-all">
            <QuestionIcon size={20} />
          </button>
          
          <div className="h-8 w-px bg-slate-200 mx-1"></div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 leading-none">{studentName}</p>
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-1">{matricleNumber}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 overflow-hidden flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
              {studentName.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        
        {/* 2. LEFT SIDEBAR NAVIGATION */}
        <aside className="w-64 bg-white border-r border-slate-100 p-4 flex flex-col justify-between hidden lg:flex">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-4 rounded-xl border border-blue-100/50 flex items-start gap-3">
              <div className="bg-blue-600 p-2 rounded-lg text-white mt-0.5">
                <BookOpen size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 leading-tight">Final Examination</h4>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Fall Semester 2026</p>
              </div>
            </div>

            <nav className="space-y-1">
              <a href="#current" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-blue-600 bg-blue-50/70 rounded-xl border-l-4 border-blue-600 transition-all">
                <Layers size={18} />
                <span>Current Exam</span>
              </a>
              <a href="#flagged" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all">
                <HelpCircle size={18} />
                <span>Flagged Questions</span>
              </a>
              <a href="#performance" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all">
                <History size={18} />
                <span>Performance History</span>
              </a>
              <a href="#settings" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all">
                <Settings size={18} />
                <span>Settings</span>
              </a>
            </nav>
          </div>

          <Button 
            variant="outline" 
            onClick={logout}
            className="w-full text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 py-3 rounded-xl"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </aside>

        {/* 3. MAIN CONTENT WORKSPACE */}
        <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-8">
          
          <div>
            <h2 className="text-xl font-bold text-slate-900">Welcome, {studentName.split(' ')[0]}</h2>
            <p className="text-sm text-slate-400 mt-1">Ready for your academic session? Select your course to proceed.</p>
          </div>

          {/* 4. DROPDOWN SEARCH FILTERS BAR */}
          <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-5 space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Select Level</label>
              <select 
                value={level} 
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-slate-50/80 border border-slate-200/70 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700"
              >
                <option>Undergraduate - Year 3</option>
                <option>Undergraduate - Year 4</option>
                <option>Postgraduate - Master</option>
              </select>
            </div>

            <div className="md:col-span-5 space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Select Course</label>
              <select 
                value={selectedCourse} 
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full bg-slate-50/80 border border-slate-200/70 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700"
              >
                <option value="Distributed Systems (CS 411)">Distributed Systems (CS 411)</option>
                <option value="Software Engineering (CSC 404)">Software Engineering (CSC 404)</option>
                <option value="Introduction to Artificial Intelligence (CSC 405)">Introduction to Artificial Intelligence (CSC 405)</option>
                <option value="Languages and Grammars (CSC 402)">Languages and Grammars (CSC 402)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <Button 
                variant="primary" 
                onClick={handleApplyFilters} 
                isLoading={isFiltering}
                className="w-full py-2.5 rounded-xl text-sm"
              >
                {!isFiltering && <SlidersHorizontal size={16} className="mr-2" />}
                Apply Filters
              </Button>
            </div>
          </section>

          {/* 5. ACTION TILES CARD MATRIX */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm flex flex-col justify-between items-center space-y-6 hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 transition-all group-hover:scale-105">
                <Calendar size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-800">Schedule Exam</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-[220px]">Pick a convenient date and time slot for your next proctored test session.</p>
              </div>
              <Button 
                variant="link" 
                onClick={() => setIsBookingModalOpen(true)} 
                icon={<ArrowRight size={14} />} 
                className="pt-2"
              >
                Book Now
              </Button>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm flex flex-col justify-between items-center space-y-4 hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 transition-all group-hover:scale-105">
                <Key size={24} />
              </div>
              <div className="space-y-2 w-full px-2">
                <h3 className="text-base font-bold text-slate-800">Enter Exam Code</h3>
                <form onSubmit={handleDirectJoinSession} className="flex gap-2 mt-2">
                  <input 
                    type="text"
                    placeholder="e.g. EXM-405-XYZ"
                    value={directExamCode}
                    onChange={(e) => setDirectExamCode(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono font-bold tracking-wider text-center flex-1 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700"
                  />
                </form>
              </div>
              <Button 
                variant="linkSuccess" 
                onClick={handleDirectJoinSession}
                isLoading={isJoiningSession}
                icon={!isJoiningSession && <ArrowRight size={14} />} 
                className="pt-1"
              >
                Join Session
              </Button>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm flex flex-col justify-between items-center space-y-6 hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 transition-all group-hover:scale-105">
                <TrendingUp size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-800">View Results</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-[220px]">Check your grades, download performance analytics and review past feedback.</p>
              </div>
              <Button variant="linkWarning" icon={<ArrowRight size={14} />} className="pt-2">
                Performance Hub
              </Button>
            </div>

          </section>

          {/* 6. DYNAMIC BACKEND TIMELINE LIST VIEW */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Upcoming Scheduled Exams</h3>
                <Button variant="link" className="p-0 text-xs">View All</Button>
              </div>

              <div className="space-y-3">
                {isLoadingExams ? (
                  <div className="text-center py-8 text-slate-400 font-medium text-xs flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Reading from Academic Database...
                  </div>
                ) : upcomingExams.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs font-medium border border-dashed border-slate-200 rounded-xl">
                    No examination slots booked yet. Click "Book Now" above to secure a proctored test session.
                  </div>
                ) : (
                  upcomingExams.map((exam) => (
                    <ExamCard key={exam.id || exam.booking_id} exam={exam} />
                  ))
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-md lg:col-span-4 relative overflow-hidden flex flex-col justify-between min-h-[190px]">
              <div className="absolute right-[-15px] bottom-[-15px] text-white/5 pointer-events-none">
                <CheckCircle size={140} strokeWidth={1} />
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="text-base font-bold">Exam Ready?</h3>
                <p className="text-xs text-blue-100/90 leading-relaxed max-w-[245px]">
                  Ensure your camera and microphone are working correctly before starting any session.
                </p>
              </div>
              
              <div className="relative z-10 pt-4">
                <button 
                  onClick={handleSystemCheck}
                  disabled={isCheckingSystem}
                  className="w-full bg-white disabled:opacity-70 hover:bg-slate-50 text-blue-600 font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {isCheckingSystem ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Checking hardware...
                    </>
                  ) : (
                    "Run System Check"
                  )}
                </button>
              </div>
            </div>

          </section>

        </main>
      </div>

      {/* 7. DYNAMIC DIALOG LAYOUT: OPERATIONAL MODAL */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 transition-all">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden flex flex-col">
            
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-800">
                <Calendar size={18} className="text-blue-600" />
                <h3 className="font-bold text-sm">
                  {generatedExamCode ? "Examination Code Generated" : "Schedule Proctored Session"}
                </h3>
              </div>
              <button 
                onClick={closeBookingModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {generatedExamCode ? (
              <div className="p-6 text-center space-y-6">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={28} />
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-sm">Booking Confirmed Successfully!</h4>
                  <p className="text-xs text-slate-400 px-4">
                    Your proctored test seat is locked in for <strong className="text-slate-600">{selectedCourse}</strong>.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 max-w-xs mx-auto space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Unique Session Access Key</span>
                  <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-mono font-black text-base text-blue-600 tracking-wider">
                    <span>{generatedExamCode}</span>
                    <button 
                      type="button"
                      onClick={() => handleCopyCode(generatedExamCode)}
                      className="text-slate-400 hover:text-blue-600 p-1 rounded-lg transition-all"
                      title="Copy code to clipboard"
                    >
                      {copiedCode ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-amber-600 font-medium bg-amber-50 border border-amber-100 p-3 rounded-xl max-w-xs mx-auto">
                  Keep this code safe! You will need to input it on the dashboard to begin your proctored test session.
                </p>

                <div className="pt-2">
                  <Button variant="primary" onClick={closeBookingModal} className="w-full max-w-xs rounded-xl py-2.5 text-xs">
                    Return to Dashboard
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                
                <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 flex items-start gap-2.5 text-blue-700">
                  <Info size={16} className="mt-0.5 shrink-0" />
                  <div className="text-[11px] font-medium leading-relaxed">
                    <p>Scheduling an exam locks your course track selection (<span className="font-bold">{selectedCourse}</span>).</p>
                    <p className="mt-1 font-semibold text-blue-800">⏱️ Session Duration: 90 Minutes (Strict Countdown)</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Choose Date</label>
                  <input 
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                    min="2026-06-07" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Available Time Slot</label>
                  <div className="relative">
                    <select 
                      value={bookingTime} 
                      onChange={(e) => setBookingTime(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 pl-8 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                    >
                      <option value="">Select a time slot...</option>
                      <option value="09:00 AM - 10:30 AM">Morning Session — 09:00 AM to 10:30 AM</option>
                      <option value="12:00 PM - 01:30 PM">Midday Session — 12:00 PM to 01:30 PM</option>
                      <option value="03:00 PM - 04:30 PM">Afternoon Session — 03:00 PM to 04:30 PM</option>
                    </select>
                    <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={closeBookingModal}
                    disabled={isSubmittingBooking}
                    className="rounded-xl py-2 px-4 text-xs"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="success" 
                    isLoading={isSubmittingBooking}
                    className="rounded-xl py-2 px-5 text-xs"
                  >
                    Confirm Booking
                  </Button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}