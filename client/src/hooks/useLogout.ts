import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Custom Hook: useLogout
 * @description Handles user logout by clearing authentication and navigating to the Login page.
 * @returns {() => void} A function to trigger logout.
 */
const useLogout = () => {
  const { logout } = useAuth(); // Clears authentication state
  const navigate = useNavigate();

  /**
   * Handles the logout process.
   * - Calls the `logout` function from AuthContext.
   * - Redirects to the Login page.
   */
  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to Login
  };

  return handleLogout;
};

export default useLogout;
