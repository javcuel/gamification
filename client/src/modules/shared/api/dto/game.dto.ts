/**
 * Interface representing the game data in the backend.
 *
 * @interface
 */
export interface GameDTO {
  IDMinijuego: number;
  IDMundo: number;
  UrlImagen: string;
  Nombre: string;
  PuntuacionMaxima: number;
  Abierto: boolean;
  Visible: boolean;
  Posicion: number;
  IDUsuario: number;
  Nuevo: boolean;
  Subido: boolean;
}

/**
 * Interface representing payload for creating a new game.
 *
 * @interface
 */
export interface GameCreateDTO {
  IDMundo: number;
  Nombre: string;
  UrlImagen: string;
  PuntuacionMaxima: number;
}

/**
 * Interface representing payload for updating a game.
 *
 * @interface
 */
export interface GameUpdateDTO {
  IDMinijuego: number;
  IDMundo: number;
  Nombre: string;
  UrlImagen: string;
  PuntuacionMaxima: number;
}
