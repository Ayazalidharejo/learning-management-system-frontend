
import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated, loading, userRole } = useContext(AuthContext);
  const location = useLocation();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user is on the correct dashboard based on role
  const path = location.pathname;
  
  if (userRole === 'student' && !path.includes('/dashboard/student')) {
    return <Navigate to="/dashboard/student" replace />;
  }
  
  if (userRole === 'admin' && !path.includes('/dashboard/admin')) {
    return <Navigate to="/dashboard/admin" replace />;
  }
  
  if (userRole === 'superadmin' && !path.includes('/dashboard/superadmin')) {
    return <Navigate to="/dashboard/superadmin" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;