import React from 'react';

function Sidebar({ 
  portalName = "EduPortal", 
  portalSubtext = "Academic Management",
  menuItems = [], 
  activeTab = "", 
  onTabChange,
  actionButtonText,
  onActionClick
}) {
  return (
    <div className="w-64 h-screen bg-white border-r border-slate-100 flex flex-col justify-between p-4 sticky top-0">
      
      {/* Top Branding Section */}
      <div>
        <div className="flex items-center gap-3 px-2 py-4 mb-6">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.174L10.72 14.177a3.375 3.375 0 003.56 0l6.46-4.003m-16.48 0A3.373 3.373 0 013 7.5V10.5M4.26 10.174L11.24 14.5a3.375 3.375 0 003.52 0l6.98-4.326M4.26 10.174L3 7.5m0 0L10.72 2.72a3.375 3.375 0 013.56 0L21 7.5m0 0v3.5M21 7.5l-3.04 1.882" />
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-secondary text-base leading-tight">{portalName}</h2>
            <p className="text-xs text-secondary-text font-medium">{portalSubtext}</p>
          </div>
        </div>

        {/* Dynamic Navigation Menu Links */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange && onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 relative group
                  ${isActive 
                    ? 'text-primary bg-tertiary-blue' 
                    : 'text-secondary-text hover:text-secondary hover:bg-tertiary-gray'
                  }`}
              >
                {/* Active left border indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-r-md" />
                )}
                
                <span className={`transition-colors duration-200 ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-secondary-text'}`}>
                  {item.icon}
                </span>
                
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions Section */}
      <div className="space-y-4">
        {actionButtonText && (
          <button 
            onClick={onActionClick}
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2 text-sm transition-all duration-200 active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/xl" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {actionButtonText}
          </button>
        )}

        <hr className="border-slate-100" />

        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-secondary-text hover:text-secondary hover:bg-tertiary-gray rounded-xl transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.767a1.123 1.123 0 00-.417 1.03c.004.074.006.148.006.222 0 .074-.002.148-.006.222a1.123 1.123 0 00.417 1.03l1.003.767a1.125 1.125 0 01.26 1.43l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.216-.456a1.125 1.125 0 00-1.07.124c-.073.044-.146.087-.22.128-.332.183-.582.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281a1.125 1.125 0 00-.646-.87c-.074-.04-.148-.083-.22-.127a1.124 1.124 0 00-1.074-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.003-.767a1.122 1.122 0 00.417-1.03a3.47 3.47 0 01-.006-.222c0-.074.002-.149.006-.222a1.122 1.122 0 00-.417-1.03l-1.003-.767a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.041.146-.084.218-.128.333-.183.582-.495.645-.869l.214-1.28z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
          
          {/* Hardcoded logout button successfully removed from here to prevent duplicate actions */}
        </div>
      </div>

    </div>
  );
}

export default Sidebar;