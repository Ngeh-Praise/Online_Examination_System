import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import LoginPortal from './pages/Login';
import LecturerDashboard from './pages/LecturerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import StudentDashboard from './pages/StudentDashboard'; // Import your newly created dashboard component

function App() {
  return (
    <AuthProvider>
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

          {/* Secure Student Dashboard */}
          <Route 
            path="/student" 
            element={
              <ProtectedRoute allowedRoles={['Student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Fallback route for admin dashboard coming next */}
          <Route path="/admin" element={
            <div className="p-8 text-center font-bold text-slate-500">Admin Dashboard Path</div>
          } />

          {/* Redirect any unknown URL inputs to Login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;