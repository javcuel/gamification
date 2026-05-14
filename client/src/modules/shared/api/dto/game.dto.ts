/**
 * Interface representing the game data in the backend.
 *
 * @interface
 */
export interface GameDTO {
	IDGame: number;
	UrlImagen: string;
	Name: string;
	Abierto: boolean;
	Visible: boolean;

}

/**
 * Interface representing payload for creating a new game.
 *
 * @interface
 */
export interface GameCreateDTO {
	Name: string;
	UrlImagen: string;
}

/**
 * Interface representing payload for updating a game.
 *
 * @interface
 */
export interface GameUpdateDTO {
	Name: string;
	UrlImagen: string;
}

/**
 * Interface representing payload for updating a game open state.
 *
 * @interface
 */
export interface GameUpdateOpenDTO {
	Abierto: boolean;
}

/**
 * Interface representing payload for updating a game visible state.
 *
 * @interface
 */
export interface GameUpdateVisibleDTO {
	Visible: boolean;
}
