import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // 1. Import it here
import LoginPortal from './pages/Login';
import LecturerDashboard from './pages/LecturerDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider> {/* 2. Wrap the entire Router tree */}
      <Router>
        <Routes>
          {/* Public Portal Route */}
          <Route path="/" element={<LoginPortal />} />

          {/* Secure Lecturer Dashboard */}
          <Route 
            path="/lecturer" 
            element={
              <ProtectedRoute allowedRoles={['Lecturer']}>
                <LecturerDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Fallback routes for components coming next */}
          <Route path="/admin" element={
            <div className="p-8 text-center font-bold text-slate-500">Admin Dashboard Path</div>
          } />
          
          <Route path="/student" element={
            <div className="p-8 text-center font-bold text-slate-500">Student Dashboard Path</div>
          } />

          {/* Redirect any unknown URL inputs to Login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider> /* 3. Close the provider context block */
  );
}

export default App;