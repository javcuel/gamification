import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

/**
 * RoleBasedRoute Component
 * Assumes authentication has already been verified.
 * Checks if the user has one of the allowed roles.
 */
const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.userType!)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;
