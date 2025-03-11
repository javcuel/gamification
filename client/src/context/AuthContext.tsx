import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AuthService from '../adapters/api/authService';
import TokenService from '../services/tokenService';

interface AuthContextType {
  isAuthenticated: boolean; // Tracks if the user is logged in
  user: { userName: string; userType: string } | null; // User info
  error: string | null; // Error message for login failures
  isLoading: boolean; // Whether authentication state is being initialized
  login: (
    userName: string,
    userPasswd: string
  ) => Promise<{ success: boolean; userType?: string; message?: string }>; // Login function
  logout: () => void; // Logout function
}

// Create a React Context for authentication
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider Component
 * @component
 * Provides authentication state and functions to the application via React Context.
 * Wraps the application to make authentication globally accessible.
 *
 * @param {ReactNode} children - The child components wrapped by the provider.
 * @returns {JSX.Element} The provider wrapping its children.
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{
    userName: string;
    userType: string; //TODO: Esto hay que cambiarlo por lo de validROles??
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Tracks initialization of authentication state

  /**
   * Effect: Initializes authentication state on app load.
   * - Checks for a token in localStorage.
   * - Decodes and validates the token.
   * - Updates authentication state if the token is valid.
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = token ? TokenService.decodeAndValidateToken(token) : null;

    if (decoded) {
      setIsAuthenticated(true);
      setUser(decoded);
    } else {
      logout(); // Clear invalid tokens
    }

    setIsLoading(false);
  }, []);

  /**
   * Login Function
   * Handles user login by sending credentials to the API and decoding the returned token.
   *
   * @param {string} userName - Username entered by the user.
   * @param {string} userPasswd - Password entered by the user.
   * @returns {Promise<boolean>} Whether the login was successful.
   */
  const login = async (
    userName: string,
    userPasswd: string
  ): Promise<{ success: boolean; userType?: string }> => {
    const result = await AuthService.loginRequest(userName, userPasswd);

    if (result.success && result.token) {
      localStorage.setItem('token', result.token);
      const decoded = TokenService.decodeAndValidateToken(result.token);

      if (decoded) {
        setIsAuthenticated(true);
        setError(null);
        setUser(decoded);
        return { success: true, userType: decoded.userType };
      }
    }

    setError(result.message || 'Login failed');
    return { success: false };
  };

  /**
   * Logout Function
   * Clears user authentication state and removes the token.
   */
  const logout = () => {
    AuthService.logoutRequest();
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
  };

  /**
   * Provides authentication state and methods to child components.
   */
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, error, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom Hook: useAuth
 * Provides access to the authentication context and its methods.
 * Ensures the hook is used within an `AuthProvider` context, otherwise throws an error.
 *
 * @returns {AuthContextType} The current authentication state and methods.
 * @throws {Error} Throws an error if used outside an `AuthProvider`.
 *
 * @example
 * // Inside a functional component:
 * const { isAuthenticated, login, logout } = useAuth();
 *
 * if (isAuthenticated) {
 *   console.log("User is logged in!");
 * } else {
 *   console.log("User is not logged in.");
 * }
 *
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
