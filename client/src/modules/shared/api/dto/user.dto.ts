/**
 * Interface representing the user data in the backend.
 *
 * @interface
 */
export interface UserDTO {
	IDUser: number;
	UserType: string;
	Name: string;
	Password: string;
	RealName?: string; // Añadido para reemplazar al antiguo Grupo
}

/**
 * Interface representing payload for creating a new user.
 *
 * @interface
 */
export interface UserCreateDTO {
	Name: string;
	UserType: string;
	Password: string;
	RealName?: string; // Añadido para reemplazar al antiguo Grupo
}

/**
 * Interface representing payload for updating a user.
 *
 * @interface
 */
export interface UserUpdateDTO {
	UserType: string;
	Name: string;
	Password: string;
	RealName?: string; // Añadido para reemplazar al antiguo Grupo
}

/**
 * Interface representing payload for user login.
 *
 * @interface
 */
export interface UserLoginDTO {
	Name: string;
	Password: string;
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