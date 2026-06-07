import React from 'react';

function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  isLoading = false, 
  disabled = false,
  className = '',
  icon
}) {
  // Base uniform styles matching the UI theme in schedle exam_3.jpg
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variant mappings
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm focus:ring-blue-500 text-sm px-5 py-2.5',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm focus:ring-emerald-500 text-sm px-5 py-2.5',
    outline: 'bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm focus:ring-slate-500 text-sm px-4 py-2',
    link: 'text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline group inline-flex items-center gap-1',
    linkSuccess: 'text-emerald-600 hover:text-emerald-700 font-semibold text-sm hover:underline group inline-flex items-center gap-1',
    linkWarning: 'text-amber-600 hover:text-amber-700 font-semibold text-sm hover:underline group inline-flex items-center gap-1',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <>
          {/* SVG Loading Spinner */}
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        <>
          {children}
          {icon && <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
        </>
      )}
    </button>
  );
}

export default Button;