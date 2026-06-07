import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // 1. If not logged in, drop back to landing login portal
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 2. Validate explicit database role matches
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}