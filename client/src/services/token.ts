import { jwtDecode } from 'jwt-decode';
import { ROLES } from '../constants/roles';
import roleService from './role-service';

/**
 * Class representing a user Token data
 *
 * @class
 */
export class Token {
	/**
	 * Creates a new Token instance.
	 *
	 * @param {number} id - User id
	 * @param {string} name - User password
	 * @param {string} role - User role
	 */
	constructor(
		public id: number,
		public name: string,
		public role: (typeof ROLES)[keyof typeof ROLES]
	) {}
}

/**
 * Interface representing token data in the backend.
 *
 * @interface
 */
interface TokenDTO {
	IDUser: number;
	Name: string;
	UserType: string;
}

export const decodeToken = (token: string): Token | null => {
	try {
		const decoded: TokenDTO = jwtDecode(token);
		if (roleService.isValidRole(decoded.UserType)) {
			return new Token(decoded.IDUser, decoded.Name, decoded.UserType);
		}
		return null;
	} catch (error) {
		console.error('Error decoding token:', error);
		return null;
	}
};
