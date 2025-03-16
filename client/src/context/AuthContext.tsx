import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import AuthApi from '../api/auth';
import TokenService from '../services/tokenService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { userName: string; userType: string } | null;
  error: string | null;
  isLoading: boolean;
  login: (
    userName: string,
    userPasswd: string
  ) => Promise<{ success: boolean; userType?: string; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{
    userName: string;
    userType: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = token ? TokenService.decodeAndValidateToken(token) : null;

    if (decoded) {
      setIsAuthenticated(true);
      setUser(decoded);
    } else {
      logout();
    }

    setIsLoading(false);
  }, []);

  const login = async (
    userName: string,
    userPasswd: string
  ): Promise<{ success: boolean; userType?: string }> => {
    const authData = { userName, userPasswd };

    const result = await AuthApi.loginRequest(authData);

    if (result.success && result.token) {
      localStorage.setItem('token', result.token);
      const decoded = TokenService.decodeAndValidateToken(result.token);

      console.log(decoded);
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

  const logout = () => {
    AuthApi.logoutRequest();
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, error, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
