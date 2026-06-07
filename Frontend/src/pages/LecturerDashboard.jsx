import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import Overview from '../components/dashboard/Overview';

export default function LecturerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ activeStudents: 0, overallGrading: 75, pendingExams: 0 });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // MODAL STATE CONTROLS
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCaModalOpen, setIsCaModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true });
      return;
    }

    const targetedLecturerId = user.id || user.user_id;

    if (!targetedLecturerId) {
      console.error("❌ Context identity mapping failed. User object values:", user);
      setLoading(false);
      return;
    }

    const loadDashboardContent = async () => {
      try {
        const statsRes = await fetch(`http://localhost:5000/api/lecturer/overview-stats?id=${targetedLecturerId}`);
        const statsData = await statsRes.json();

        const coursesRes = await fetch(`http://localhost:5000/api/lecturer/courses?id=${targetedLecturerId}`);
        const coursesData = await coursesRes.json();

        if (statsRes.ok) setStats(statsData);
        
        if (coursesRes.ok) {
          setCourses(Array.isArray(coursesData) ? coursesData : []);
        } else {
          console.warn("⚠️ Backend non-200 payload received for courses:", coursesData);
          setCourses([]);
        }

      } catch (error) {
        console.error("❌ Failed to stream data to Lecturer Dashboard:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardContent();
  }, [user, navigate]);

  const handleLogoutAction = () => {
    logout();
    navigate('/', { replace: true });
  };

  const lecturerLinks = [
    { id: 'overview', label: 'Overview', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 20.25v-2.25z" /></svg> },
    { id: 'courses', label: 'My Courses', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg> },
    { id: 'exams', label: 'Exams', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
    { id: 'marking', label: 'Marking', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg> }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex w-full font-sans">
      <Sidebar 
        portalName="EduPortal"
        portalSubtext="Academic Management"
        menuItems={lecturerLinks}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId)}
      />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar 
          user={{ 
            name: user?.name || "Lecturer", 
            role: user?.role || "Lecturer", 
            avatar: "" 
          }} 
          onLogout={handleLogoutAction} 
        />

        <main className="flex-1 p-8 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-24 text-slate-400 space-y-3">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="font-medium text-sm animate-pulse">Loading data metrics...</p>
            </div>
          ) : activeTab === 'overview' ? (
            <Overview 
              stats={stats} 
              courses={courses} 
              onUploadClick={() => setIsUploadModalOpen(true)}
              onCaClick={() => setIsCaModalOpen(true)}
            />
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-slate-100 shadow-sm text-center text-slate-400 max-w-2xl mx-auto mt-12">
              <div className="w-16 h-16 bg-slate-50 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span className="capitalize font-bold text-slate-700 text-lg block mb-1">{activeTab} Work Window</span>
              <p className="text-sm text-slate-400">Screen dashboard component interface logic currently rendering implementation parameters.</p>
            </div>
          )}
        </main>
      </div>

      {/* MODALS */}
      {isUploadModalOpen && (
        <UploadQuestionsModal onClose={() => setIsUploadModalOpen(false)} courses={courses} />
      )}

      {isCaModalOpen && (
        <UpdateCaModal onClose={() => setIsCaModalOpen(false)} courses={courses} />
      )}
    </div>
  );
}

function UploadQuestionsModal({ onClose, courses }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  const handleUploadSubmit = async () => {
    if (!selectedCourse || !selectedFile) {
      alert("Please select a course and choose a blueprint file.");
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("course_id", selectedCourse);
    formData.append("document", selectedFile);

    try {
      const res = await fetch("http://localhost:5000/api/lecturer/bulk-upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Success! ${data.questions_extracted || 0} questions processed and saved successfully.`);
        onClose();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to upload the file.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Bulk Upload Assessment Questions</h3>
            <p className="text-xs text-slate-400 mt-0.5">Parse multiple choice questions directly into the system.</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="space-y-4 flex-1">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Course</label>
            <select 
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl text-slate-700 outline-none text-sm font-medium shadow-inner"
            >
              <option value="">-- Select Course --</option>
              {Array.isArray(courses) && courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.code} - {course.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Assessment Document (.pdf / .docx)</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-slate-50 p-6 rounded-2xl cursor-pointer group shadow-inner">
              <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="hidden" />
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center border border-slate-100 text-slate-400 group-hover:text-indigo-500 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>
              </div>
              <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-800">
                {selectedFile ? selectedFile.name : "Select or drag file asset"}
              </span>
              <span className="text-xs text-slate-400 mt-1">Accepts standard .pdf or .docx files</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
          <button onClick={onClose} disabled={isSubmitting} className="px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700 bg-slate-50 rounded-xl">
            Cancel
          </button>
          <button 
            onClick={handleUploadSubmit}
            disabled={isSubmitting} 
            className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-xl shadow-lg shadow-indigo-600/10 flex items-center gap-2"
          >
            {isSubmitting ? "Uploading Document..." : "Upload Questions"}
          </button>
        </div>
      </div>
    </div>
  );
}

function UpdateCaModal({ onClose, courses }) {
  const [courseId, setCourseId] = useState("");
  const [matricule, setMatricule] = useState("");
  const [caScore, setCaScore] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCaSubmit = async () => {
    if (!courseId || !matricule || caScore === "") {
      alert("All fields are mandatory.");
      return;
    }
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:5000/api/lecturer/update-ca", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course_id: courseId, matricule, ca_score: caScore })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Continuous Assessment updated successfully!");
        onClose();
      } else {
        alert(`Failed: ${data.error}`);
      }
    } catch (e) {
      console.error(e);
      alert("Network transactional error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100 flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Continuous Assessment Update</h3>
            <p className="text-xs text-slate-400 mt-0.5">Directly update Continuous Assessment rows for students.</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="space-y-4 flex-1">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Select Course</label>
            <select 
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl text-slate-700 outline-none text-sm font-medium shadow-inner"
            >
              <option value="">-- Select Course --</option>
              {Array.isArray(courses) && courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.code} - {course.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Student Matricule</label>
            <input 
              type="text" 
              placeholder="e.g. FE22A390" 
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl text-slate-700 outline-none text-sm font-medium shadow-inner placeholder-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Assessment Score (0 - 30)</label>
            <input 
              type="number" 
              max="30" 
              min="0" 
              placeholder="0.00" 
              value={caScore}
              onChange={(e) => setCaScore(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl text-slate-700 outline-none text-sm font-medium shadow-inner placeholder-slate-300"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
          <button onClick={onClose} disabled={isSubmitting} className="px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700 bg-slate-50 rounded-xl">
            Cancel
          </button>
          <button 
            onClick={handleCaSubmit}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 rounded-xl shadow-lg shadow-emerald-600/10"
          >
            {isSubmitting ? "Saving changes..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}