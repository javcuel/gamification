import React from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '../constants/routes';
import { useAuth } from '../context/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

/**
 * ProtectedRoute component that handles authentication and authorization
 * for rendering child components. It ensures that the user is authenticated
 * and has one of the allowed roles before rendering the child components.
 * If the user is not authenticated or their role is not allowed, they are redirected
 * to the login page.
 *
 * @component
 * @example
 * // Example usage
 * <ProtectedRoute allowedRoles={['admin', 'moderator']}>
 *   <Dashboard />
 * </ProtectedRoute>
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The child components to render if the route is accessible.
 * @param {string[]} props.allowedRoles - An array of roles allowed to access the route.
 *
 * @returns {React.ReactNode} The child components if authenticated and authorized, or a redirect if not.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Authentication is loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  // Current user rol not allowed
  if (!user || !allowedRoles.includes(user.role!)) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  // If all OK, render children
  return <>{children}</>;
};

export default ProtectedRoute;
