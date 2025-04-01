import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';
import { login, logout } from '../api/user';
import { decodeToken, Token } from '../services/token';

interface IAuthContext {
  isAuthenticated: boolean;
  user: Token | null;
  error: string | null;
  isLoading: boolean;
  loginRequest: (
    name: string,
    passwd: string
  ) => Promise<{ success: boolean; role?: string; message?: string }>;
  logoutRequest: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<Token | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = token ? decodeToken(token) : null;

    if (decoded) {
      setIsAuthenticated(true);
      setUser(decoded);
    } else {
      logout(navigate);
    }

    setIsLoading(false);
  }, [navigate]);

  const loginRequest = async (
    name: string,
    passwd: string
  ): Promise<{ success: boolean; role?: string }> => {
    const authData = { name, passwd };
    const result = await login(authData);

    if (result.success && result.token) {
      localStorage.setItem('token', result.token);
      const decoded = decodeToken(result.token);

      if (decoded) {
        setIsAuthenticated(true);
        setError(null);
        setUser(decoded);
        return { success: true, role: decoded.role };
      }
    }

    setError(result.message || 'Login failed');
    return { success: false };
  };

  const logoutRequest = () => {
    logout(navigate);
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        error,
        isLoading,
        loginRequest,
        logoutRequest,
      }}
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
