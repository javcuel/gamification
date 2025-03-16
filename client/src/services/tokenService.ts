import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../types/DecodedToken';
import roleService from './roleService';

const TokenService = {
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
