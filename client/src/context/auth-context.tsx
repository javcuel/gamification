import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState
} from 'react';

import { useNavigate } from 'react-router-dom';
import { UserLogin } from '../modules/shared/api/domain/user';
import { userRepository } from '../modules/shared/api/repository/user.repository';
import { decodeToken, Token } from '../services/token';

/**
 * IAuthContext interface
 *
 * Defines the shape of the authentication context, which includes:
 * - Authentication status
 * - User token information
 * - Loading and error states
 * - Login and logout functions
 */
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

// Create a context to hold authentication state and logic
const AuthContext = createContext<IAuthContext | undefined>(undefined);

/**
 * AuthProvider component
 *
 * Provides authentication context to its children. It manages:
 * - Storing and decoding tokens
 * - Managing user state
 * - Executing login and logout requests
 *
 * @param children - React child nodes that should have access to auth context
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children
}) => {
	const navigate = useNavigate();

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<Token | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	/**
	 * useEffect hook
	 *
	 * Runs on initial render to check for a stored token. If a valid token is found,
	 * it decodes it and updates the authentication state accordingly.
	 * Otherwise, it triggers logout to clean up any stale session.
	 */
	useEffect(() => {
		const token = localStorage.getItem('token');
		const decoded = token ? decodeToken(token) : null;

		if (decoded) {
			setIsAuthenticated(true);
			setUser(decoded);
		} else {
			userRepository.logout(navigate);
		}

		setIsLoading(false);
	}, [navigate]);

	/**
	 * loginRequest function
	 *
	 * Handles user login:
	 * - Sends credentials to the server
	 * - Stores the token on success
	 * - Updates user and authentication state
	 *
	 * @param name - Username
	 * @param passwd - Password
	 * @returns A result object indicating success and user role if successful
	 */
	const loginRequest = async (
		name: string,
		passwd: string
	): Promise<{ success: boolean; role?: string }> => {
		const user = new UserLogin(name, passwd);

		const result = await userRepository.login(user);

		if (result.success && result.token) {
			localStorage.setItem('token', result.token);
			const decoded = decodeToken(result.token);
			console.log(decoded);
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

	/**
	 * logoutRequest function
	 *
	 * Logs the user out by:
	 * - Calling the repository logout method
	 * - Clearing authentication and user state
	 */
	const logoutRequest = () => {
		userRepository.logout(navigate);
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
				logoutRequest
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

/**
 * useAuth hook
 *
 * Custom hook to access the authentication context.
 * Ensures it is used within a valid AuthProvider boundary.
 *
 * @throws Error if used outside of an AuthProvider
 * @returns The authentication context object
 */
export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};
