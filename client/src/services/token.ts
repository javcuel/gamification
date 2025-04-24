import { jwtDecode } from 'jwt-decode';
import roleService from './role-service';

export interface Token {
  id: number;
  name: string;
  role: string;
}

//TODO AQUI SE EL ESTA PASANDO UN STRING Y NO UN TOKEN NO SE SI ESTO ES ASI
export const decodeToken = (token: string): Token | null => {
  try {
    const decoded: Token = jwtDecode(token);
    if (roleService.isValidRole(decoded.role)) {
      return {
        id: decoded.id,
        name: decoded.name,
        role: decoded.role,
      };
    }
    return null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
