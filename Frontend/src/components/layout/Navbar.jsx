import React from 'react';

// Destructure onLogout along with the user prop
export default function Navbar({ user, onLogout }) { 
  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name[0].toUpperCase();
  };

  return (
    <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-bold text-secondary">Lecturer Panel</h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications Icon Button */}
        <div className="flex items-center gap-4 text-slate-400 border-r border-slate-100 pr-4">
          <button className="p-2 hover:text-secondary hover:bg-tertiary-gray rounded-xl transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>
        </div>

        {/* Profile Card & Logout Mechanism */}
        <div className="flex items-center gap-5">
          <div className="text-right">
            <h3 className="text-sm font-bold text-secondary leading-tight">{user?.name || "Anonymous User"}</h3>
            <p className="text-xs font-semibold text-primary mt-0.5">{user?.role || "Guest"}</p>
          </div>
          
          <div className="w-10 h-10 rounded-full border-2 border-slate-50 overflow-hidden flex items-center justify-center bg-blue-50 text-primary font-bold text-sm shadow-inner">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span>{getInitials(user?.name)}</span>
            )}
          </div>

          {/* Actionable Logout Button */}
          <button 
            onClick={onLogout}
            className="text-xs font-bold text-slate-500 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 px-3 py-2 rounded-xl border border-slate-200/60 transition-all active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}