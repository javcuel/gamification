import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserLogin } from '../modules/shared/api/domain/user';
import { userRepository } from '../modules/shared/api/repository/user.repository';
// IMPORTANTE: Importamos el repositorio de sesiones
import { sessionRepository } from '../modules/shared/api/repository/session.repository'; 
import { decodeToken, Token } from '../services/token';

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

    // Al cargar la app, verificamos si hay token y si hay una sesión activa
    useEffect(() => {
        const token = localStorage.getItem('token');
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
        const userLogin = new UserLogin(name, passwd);
        const result = await userRepository.login(userLogin);

        if (result.success && result.token) {
            localStorage.setItem('token', result.token);
            const decoded = decodeToken(result.token);
            
            if (decoded) {
                try {
                    // --- Lógica de Sesión Inyectada ---
                    // Tras el login exitoso, creamos la entrada en la tabla 'session'
                    const sessionId = await sessionRepository.create();
                    // Guardamos el IDSession en localStorage para recuperarlo en el logout
                    localStorage.setItem('sessionId', sessionId.toString());
                    // ----------------------------------

                    setIsAuthenticated(true);
                    setError(null);
                    setUser(decoded);
                    return { success: true, role: decoded.role };
                } catch (sessionError) {
                    // Si falla la creación de sesión, podríamos decidir si abortar el login
                    console.error("Session creation failed", sessionError);
                }
            }
        }
        setError(result.message || 'Login failed');
        return { success: false };
    };

    const logoutRequest = async () => {
        // Recuperamos el ID de la sesión antes de limpiar el storage
        const sessionId = localStorage.getItem('sessionId');
        
        if (sessionId) {
            try {
                // Notificamos al backend para que actualice LogoutTime = NOW()
                await sessionRepository.close(Number(sessionId));
            } catch (err) {
                console.error("Error closing database session", err);
            }
        }

        // Limpieza de seguridad
        localStorage.removeItem('token');
        localStorage.removeItem('sessionId');
        
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