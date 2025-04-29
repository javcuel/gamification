import { jwtDecode } from 'jwt-decode';
import roleService from './role-service';

export class Token {
  constructor(
    public id: number,
    public name: string,
    public role: string
  ) {}
}
export interface TokenDTO {
  IDUsuario: number;
  Nombre: string;
  TipoUsuario: string;
}

export const decodeToken = (token: string): Token | null => {
  try {
    const decoded: TokenDTO = jwtDecode(token);
    if (roleService.isValidRole(decoded.TipoUsuario)) {
      return new Token(decoded.IDUsuario, decoded.Nombre, decoded.TipoUsuario);
    }
    return null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
