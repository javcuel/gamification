import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode; // The component(s) to render if the user is authenticated
}

/**
 * PrivateRoute Component
 * @component
 * @description Protects routes that require user authentication.
 * Redirects unauthenticated users to the login page (`/`).
 * Shows a loading state while authentication status is being determined.
 *
 * @param {PrivateRouteProps} props - Props for the PrivateRoute component.
 * @returns {JSX.Element} The children components if authenticated, otherwise a redirect or loading state.
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth(); // Get authentication state and loading status from the AuthContext

  /**
   * Loading State
   * @description Displays a loading indicator while authentication status is being checked.
   * This prevents rendering the route content prematurely.
   */
  if (isLoading) {
    return <div>Loading...</div>;
  }

  /**
   * Redirect
   * @description If the user is not authenticated, redirects them to the login page.
   */
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  /**
   * Authenticated State
   * @description Renders the child components if the user is authenticated.
   */
  return <>{children}</>;
};

export default PrivateRoute;
