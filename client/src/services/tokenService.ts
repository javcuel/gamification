import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../types/DecodedToken';
import roleService from './roleService';

/**
 * TokenService
 * @description Handles JWT decoding and validation logic.
 */
const TokenService = {
  /**
   * Decodes and validates a JWT token.
   * @param {string} token - The JWT token to decode.
   * @returns {DecodedToken | null} The decoded token if valid, or null if invalid.
   */
  decodeAndValidateToken: (token: string): DecodedToken | null => {
    try {
      const decoded: any = jwtDecode(token);
      if (roleService.isValidRole(decoded.userType)) {
        return {
          userName: decoded.userName,
          userType: decoded.userType,
        };
      }
      return null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },
};

export default TokenService;
