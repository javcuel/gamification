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
export interface GameRequestDTO {
  IDMundo: number;
  Nombre: string;
  UrlImagen: string;
  PuntuacionMaxima: number;
}

/**
 * Interface representing payload for updating the open state of a game.
 *
 * @interface
 */
export interface GameApiOpenStateRequestDTO {
  IDMinijuego: number;
  Abierto: boolean;
}

/**
 * Interface representing payload for updating the visible state of a game.
 *
 * @interface
 */
export interface GameApiVisibleStateRequestDTO {
  IDMinijuego: number;
  Visible: boolean;
}
