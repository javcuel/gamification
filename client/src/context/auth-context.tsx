import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserLogin } from '../modules/shared/api/domain/user';
import { userRepository } from '../modules/shared/api/repository/user.repository';
import { sessionRepository } from '../modules/shared/api/repository/session.repository'; 
import { decodeToken, Token } from '../services/token';
import StorageService from '../services/storage-service'; 

interface IAuthContext {
    isAuthenticated: boolean;
    user: Token | null;
    error: string | null;
    isLoading: boolean;
    loginRequest: (name: string, passwd: string) => Promise<{ success: boolean; role?: string; message?: string }>;
    logoutRequest: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<Token | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 2. Usamos StorageService
        const token = StorageService.getItem('token');
        if (token) {
            const decoded = decodeToken(token);
            if (decoded) {
                setIsAuthenticated(true);
                setUser(decoded);
            }
        }
        setIsLoading(false);
    }, []);

    const loginRequest = async (name: string, passwd: string) => {
        const result = await userRepository.login({ name: name, passwd: passwd }); 

        if (result.success && result.token) {
            const decoded = decodeToken(result.token);
            if (decoded) {
                // 3. Usamos StorageService
                StorageService.setItem('token', result.token);
                setIsAuthenticated(true);
                setUser(decoded);

                try {
                    const userId = decoded.id; 

                    if (userId) {
                        const sessionId = await sessionRepository.create(userId);
                        // 4. Usamos StorageService
                        StorageService.setItem('sessionId', sessionId.toString());
                    }
                    
                    return { success: true, role: decoded.role };
                } catch (sessionError) {
                    console.error("Session creation failed", sessionError);
                    return { success: true, role: decoded.role };
                }
            }
        }
        setError(result.message || 'Login failed');
        return { success: false };
    };

    const logoutRequest = async () => {
        // 5. Usamos StorageService
        const sessionId = StorageService.getItem('sessionId');
        
        if (sessionId) {
            try {
                await sessionRepository.close(Number(sessionId));
            } catch (err) {
                console.error("Error closing database session", err);
            }
        }

        // 6. Usamos StorageService para limpiar
        StorageService.removeItem('token');
        StorageService.removeItem('sessionId');
        
        userRepository.logout(navigate);
        setIsAuthenticated(false);
        setUser(null);
        setError(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, error, isLoading, loginRequest, logoutRequest }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};