import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPortal() {
  const [role, setRole] = useState('student'); // internal tabs use lowercase 'student' | 'lecturer' | 'admin'
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Normalize role string to match SQLite database casing ('Student', 'Lecturer', 'Admin')
    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identity: userId,
          password: password,
          role: formattedRole
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Success! data contains: { message, role, user: { id, name, email/matricleNumber } }
        login({
          id: data.user.id,
          name: data.user.name,
          role: data.role, // 'Lecturer', 'Student', or 'Admin'
          email: data.user.email || null,
          matricleNumber: data.user.matricleNumber || null
        });

        console.log("Authentication successful! Profile synced.");

        // Route dynamically based on the verified role coming from your server
        if (data.role === 'Lecturer') {
          navigate('/lecturer');
        } else if (data.role === 'Student') {
          navigate('/student');
        } else {
          navigate('/admin');
        }
      } else {
        // Capture SQLite database mismatches or invalid fields
        alert(data.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (error) {
      console.error('Node engine connection failure context:', error);
      alert('Cannot reach the local backend server on port 5000. Is your Node server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-tertiary-gray text-slate-700 flex flex-col justify-between font-sans selection:bg-primary selection:text-white">
      
      <header className="w-full bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
          </svg>
          <span className="font-bold text-secondary text-base tracking-tight">EduExam Pro</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full shadow-xl border border-slate-100/60 p-8 md:p-10 transition-all duration-300">
          
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-slate-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.174L10.72 14.177a3.375 3.375 0 003.56 0l6.46-4.003m-16.48 0A3.373 3.373 0 013 7.5V10.5M4.26 10.174L11.24 14.5a3.375 3.375 0 003.52 0l6.98-4.326M4.26 10.174L3 7.5m0 0L10.72 2.72a3.375 3.375 0 013.56 0L21 7.5m0 0v3.5M21 7.5l-3.04 1.882" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-secondary tracking-tight">EduExam Pro</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Academic Excellence Portal</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-center text-xs font-bold text-slate-500 mb-2.5">Access Role</label>
              <div className="grid grid-cols-3 bg-slate-50 border border-slate-100 p-1.5 rounded-xl gap-1">
                {['student', 'lecturer', 'admin'].map((roleType) => (
                  <button
                    key={roleType}
                    type="button"
                    onClick={() => setRole(roleType)}
                    className={`py-2 text-xs font-semibold rounded-lg capitalize transition-all duration-200 ${
                      role === roleType
                        ? 'bg-white text-primary shadow-sm border border-slate-100'
                        : 'text-slate-500 hover:text-secondary'
                    }`}
                  >
                    {roleType}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary mb-1.5">
                {role === 'student' ? 'Matricule Number' : 'Email Address'}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </span>
                <input
                  type="text"
                  required
                  placeholder={role === 'student' ? 'e.g. FE21A044' : 'e.g. lecturer@ubuea.cm'}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full text-sm pl-10 pr-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl outline-none focus:bg-white focus:border-primary/80 focus:ring-4 focus:ring-primary/5 placeholder:text-slate-400 font-medium transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-sm pl-10 pr-10 py-3 bg-slate-50 border border-slate-200/80 rounded-xl outline-none focus:bg-white focus:border-primary/80 focus:ring-4 focus:ring-primary/5 placeholder:text-slate-300 font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-primary/10 flex items-center justify-center gap-2 text-sm transition-all duration-200 active:scale-[0.99] mt-2"
            >
              {loading ? 'Verifying...' : 'Login'}
              {!loading && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
              )}
            </button>

            <div className="text-center pt-2">
              <button type="button" className="text-xs text-primary font-semibold hover:underline">
                Forgot Password?
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-6 space-y-4">
          <p className="text-xs text-slate-500 font-medium">
            Trouble logging in? Contact your faculty coordinator.
          </p>
          <div className="inline-flex items-center gap-1.5 bg-white border border-slate-100 shadow-sm px-4 py-2 rounded-full text-[11px] font-semibold text-slate-600">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"></span>
            Secure Proctoring Environment Active
          </div>
        </div>
      </main>

      <footer className="w-full bg-white border-t border-slate-100 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
        <div>
          © {new Date().getFullYear()} University Examination Portal. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}