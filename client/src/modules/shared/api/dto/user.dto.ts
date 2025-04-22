/**
 * Interface representing the user data in the backend.
 *
 * @interface
 */
export interface UserDTO {
  IDUsuario: number;
  Nombre: string;
  Contrasena: string;
  TipoUsuario: string;
  Puntuacion: number;
  Completado: number;
}

/**
 * Interface representing payload for creating a new user.
 *
 * @interface
 */
export interface UserRequestDTO {
  Nombre: string;
  Contrasena: string;
  TipoUsuario: string;
}

/**
 * Interface representing payload for user login.
 *
 * @interface
 */
export interface UserRequestLoginDTO {
  Nombre: string;
  Contrasena: string;
}
