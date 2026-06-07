import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button'; // Make sure this path correctly points to your Button component
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
  ArrowRight
} from 'lucide-react';

export default function StudentDashboard() {
  const { user, logout } = useAuth();

  const studentName = user?.name || 'Student';
  const matricleNumber = user?.email || 'Matricle Number';

  const [level, setLevel] = useState('Undergraduate - Year 4');
  const [selectedCourse, setSelectedCourse] = useState('Introduction to Artificial Intelligence (CSC 405)');

  // Simple loading states to demonstrate your button spin mechanics
  const [isFiltering, setIsFiltering] = useState(false);
  const [isCheckingSystem, setIsCheckingSystem] = useState(false);

  const handleApplyFilters = () => {
    setIsFiltering(true);
    setTimeout(() => setIsFiltering(false), 1000); // Mock processing delay
  };

  const handleSystemCheck = () => {
    setIsCheckingSystem(true);
    setTimeout(() => setIsCheckingSystem(false), 1500); // Mock system diagnostics delay
  };

  const upcomingExams = [
    {
      id: 1,
      month: 'JUN',
      day: '15',
      title: 'Distributed Systems (CS 411)',
      location: 'Main Auditorium • 09:00 AM',
      badge: '8 Days Left',
      badgeStyle: 'bg-blue-50 text-blue-600 border border-blue-100'
    },
    {
      id: 2,
      month: 'JUN',
      day: '20',
      title: 'Introduction to Artificial Intelligence (CSC 405)',
      location: 'Online Proctoring Environment • 02:00 PM',
      badge: 'Upcoming',
      badgeStyle: 'bg-gray-50 text-gray-500 border border-gray-100'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col">
      
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

          {/* Clean implementation using your generic outline button config for Sign Out */}
          <Button 
            variant="outline" 
            onClick={logout}
            className="w-full text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 py-3 rounded-xl"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
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
                <option>Distributed Systems (CS 411)</option>
                <option>Software Engineering (CSC 404)</option>
                <option>Introduction to Artificial Intelligence (CSC 405)</option>
                <option>Languages and Grammars (CSC 402)</option>
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
            
            {/* Card 1: Schedule Exam (Using variant="link") */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm flex flex-col justify-between items-center space-y-6 hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 transition-all group-hover:scale-105">
                <Calendar size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-800">Schedule Exam</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-[220px]">Pick a convenient date and time slot for your next proctored test session.</p>
              </div>
              <Button variant="link" icon={<ArrowRight size={14} />} className="pt-2">
                Book Now
              </Button>
            </div>

            {/* Card 2: Enter Exam Code (Using variant="linkSuccess") */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm flex flex-col justify-between items-center space-y-6 hover:shadow-md transition-all group">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 transition-all group-hover:scale-105">
                <Key size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-800">Enter Exam Code</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-[220px]">Have a direct session code? Enter it here to jump straight into your examination.</p>
              </div>
              <Button variant="linkSuccess" icon={<ArrowRight size={14} />} className="pt-2">
                Join Session
              </Button>
            </div>

            {/* Card 3: View Results (Using variant="linkWarning") */}
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

          {/* 6. FOOTER SPLIT TIMELINE AND SYSTEM HEALTH CHECK LAYER */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                <h3 className="text-sm font-bold text-slate-800">Upcoming Exams</h3>
                <Button variant="link" className="p-0 text-xs">View All</Button>
              </div>

              <div className="space-y-3">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-slate-200/80 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
                        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider leading-none">{exam.month}</span>
                        <span className="text-base font-black text-slate-800 leading-none mt-1">{exam.day}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">{exam.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{exam.location}</p>
                      </div>
                    </div>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${exam.badgeStyle}`}>
                      {exam.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick System Check Action Banner Panel */}
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
    </div>
  );
}