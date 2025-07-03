import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    return <Navigate to={`/login/${role}`} replace />;
  }

  try {
    const parsedUser = JSON.parse(user);
    if (parsedUser.role !== role) {
      return <Navigate to={`/login/${role}`} replace />;
    }
  } catch (e) {
    return <Navigate to={`/login/${role}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
