import React from 'react';
import { Calendar } from 'lucide-react';

export default function ExamCard({ exam }) {
  // Extract date segments dynamically for custom visual calendar blocks
  const eventDate = new Date(exam.date || exam.exam_date);
  const monthsList = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const monthText = isNaN(eventDate.getTime()) ? 'JUN' : monthsList[eventDate.getMonth()];
  const dayText = isNaN(eventDate.getTime()) ? '15' : String(eventDate.getDate()).padStart(2, '0');

  return (
    <div className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
      <div className="flex items-center gap-4">
        {/* Visual Calendar Date Block */}
        <div className="w-12 h-12 bg-white border border-slate-200/80 rounded-xl flex flex-col items-center justify-center text-center shadow-sm shrink-0">
          <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider leading-none">
            {monthText}
          </span>
          <span className="text-base font-black text-slate-800 leading-none mt-1">
            {dayText}
          </span>
        </div>

        {/* Exam Information Details */}
        <div>
          <h4 className="text-sm font-bold text-slate-800">
            {exam.course_title || exam.title}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center flex-wrap gap-1.5">
            <span>Online Proctoring Environment • {exam.time_slot || exam.time}</span>
            {exam.exam_code && (
              <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wide">
                Code: {exam.exam_code}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Status Badge */}
      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
        Confirmed
      </span>
    </div>
  );
}