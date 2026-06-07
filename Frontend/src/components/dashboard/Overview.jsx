import React from 'react';

export default function Overview({ stats, courses, onUploadClick, onCaClick, user }) {
  const activeStudentsCount = stats?.activeStudents ?? 0;
  const overallGradingPercentage = stats?.overallGrading ?? 0;
  const pendingExamsCount = stats?.pendingExams ?? 0;
  const runningCourses = courses && courses.length > 0 ? courses : [];

  // DYNAMIC COMPONENT RESOLUTION: Falls back safely if context is flushing state
  const currentLecturerName = user?.name || "Lecturer";

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div>
        {/* DYNAMIC FIX: Displays Prof. Kingsley or Dr. Smith perfectly depending on user login identity */}
        <h2 className="text-2xl font-bold text-slate-800">Welcome back, {currentLecturerName}</h2>
        <p className="text-slate-500 text-sm mt-1">Here is what is happening across your courses and examinations today.</p>
      </div>

      {/* Analytics Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Active Students */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Students</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-2">{activeStudentsCount}</h3>
            <p className="text-xs text-green-600 font-semibold mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block animate-pulse"></span>
              Inside exam environment
            </p>
          </div>
          <div className="p-4 bg-blue-50 text-indigo-600 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
          </div>
        </div>

        {/* Card 2: Overall Grading */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Grading</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-2">{overallGradingPercentage}%</h3>
            <div className="w-28 bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${overallGradingPercentage}%` }}></div>
            </div>
          </div>
          <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
          </div>
        </div>

        {/* Card 3: Pending Exams */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Exams</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-2">
              {pendingExamsCount < 10 ? `0${pendingExamsCount}` : pendingExamsCount}
            </h3>
            <p className="text-xs text-amber-600 font-semibold mt-2">Awaiting department approval</p>
          </div>
          <div className="p-4 bg-amber-50 text-amber-600 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
      </div>

      {/* Primary Quick Actions Container Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* ACTION: Upload Exam Questions */}
        <div 
          onClick={onUploadClick}
          className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-2xl text-white shadow-md shadow-indigo-100 flex flex-col justify-between h-44 group cursor-pointer hover:scale-[1.01] transition-transform duration-200"
        >
          <div>
            <h4 className="font-bold text-lg">Upload Exam Questions</h4>
            <p className="text-indigo-100 text-xs mt-1 max-w-sm">Drop your document or source draft here. The text engine will instantly convert it to secure system data fields.</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs bg-white/20 px-3 py-1.5 rounded-lg font-semibold backdrop-blur-sm">Supports PDF, DOCX</span>
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-indigo-600 shadow-sm group-hover:translate-x-1 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" /></svg>
            </div>
          </div>
        </div>

        {/* ACTION: Sync CA Grades Card */}
        <div 
          onClick={onCaClick}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-44 hover:border-slate-200 transition-all cursor-pointer group"
        >
          <div>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.25 2.25 0 0110.5 2.25h4.5a2.25 2.25 0 012.23 1.966m-5.8 0A48.474 48.474 0 006.518 4.3C5.388 4.423 4.5 5.387 4.5 6.52V19.5a2.25 2.25 0 002.25 2.25h1.5" /></svg>
            </div>
            <h4 className="font-bold text-slate-800 text-base">Update CA Marks</h4>
            <p className="text-slate-400 text-xs mt-1">Directly sync or import external student continuous assessment sheets.</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-indigo-600 group-hover:underline">Open Ledger →</span>
          </div>
        </div>

      </div>

      {/* Courses Visual Stream Progress Tracker */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 text-base">Active Courses Tracking</h3>
          <button className="text-xs font-bold text-indigo-600 hover:underline">View All Courses</button>
        </div>

        <div className="space-y-4">
          {runningCourses.map((course) => {
            // SAFE EXTRACTION: Normalize field keys to match SQLite dataset responses
            const currentId = course.id || course.course_id;
            const currentTitle = course.name || course.title;

            return (
              <div key={currentId || course.code} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    {/* VISUAL UPDATE: Appends the Course tracking Database ID next to the code label */}
                    <span className="text-[10px] font-extrabold bg-indigo-50 text-indigo-600 border border-indigo-100 px-1.5 py-0.5 rounded">ID: {currentId}</span>
                    <span className="text-xs font-bold bg-white text-slate-500 border border-slate-100 px-2 py-1 rounded-md">{course.code}</span>
                  </div>
                  {/* DISPLAY FIX: Shows dynamic course title */}
                  <h5 className="font-semibold text-slate-800 text-sm mt-1.5">{currentTitle}</h5>
                  <p className="text-xs text-slate-400 mt-0.5">{course.enrolled || course.enrolled_count || 0} Students Enrolled</p>
                </div>

                <div className="flex items-center gap-6 min-w-[200px]">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                      <span>Grading Status</span>
                      <span>{course.progress ?? course.progress_percentage ?? 0}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${(course.progress ?? course.progress_percentage ?? 0) === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`} 
                        style={{ width: `${course.progress ?? course.progress_percentage ?? 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                    course.status === 'Completed' 
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                      : course.status === 'Exam Ongoing'
                  }: 'bg-amber-50 border-amber-100 text-amber-600'
                      : 'bg-blue-50 border-blue-100 text-indigo-600'
                  }`}>
                    {course.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}