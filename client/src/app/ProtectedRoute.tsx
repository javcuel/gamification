import React from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '../constants/routes';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  console.log('uer type', user?.userType);
  console.log(allowedRoles);
  // Authentication is loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  // Current user rol not allowed
  if (!user || !allowedRoles.includes(user.userType!)) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  // If all OK, render children
  return <>{children}</>;
};

export default ProtectedRoute;
