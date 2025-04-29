/**
 * Interface representing the user data in the backend.
 *
 * @interface
 */
export interface UserDTO {
  IDUsuario: number;
  Grupo: string;
  TipoUsuario: string;
  Nombre: string;
  Contrasena: string;
}

/**
 * Interface representing payload for creating a new user.
 *
 * @interface
 */
export interface UserCreateDTO {
  Nombre: string;
  Grupo: string;
  TipoUsuario: string;
  Contrasena: string;
}

/**
 * Interface representing payload for updating a user.
 *
 * @interface
 */
export interface UserUpdateDTO {
  IDUsuario: number;
  Grupo: string;
  TipoUsuario: string;
  Nombre: string;
  Contrasena: string;
}

/**
 * Interface representing payload for user login.
 *
 * @interface
 */
export interface UserLoginDTO {
  Nombre: string;
  Contrasena: string;
}

/**
 * Interface representing the user score data in the backend.
 *
 * @interface
 */
export interface UserScoreDTO {
  Puntuacion: number;
  Completado: number;
}

/**
 * Interface representing the user login data in the backend
 *
 * @interface
 */
export interface UserLoginDTO {
  Nombre: string;
  Contrasena: string;
}
