import { API_URLS } from '../constants/apiUrls';
import httpClient from './httpClient';

/**
 * Class representing a Game.
 *
 * @class
 * @implements {IGame}
 */
export class Game implements IGame {
  /**
   * Creates a new Game instance.
   *
   * @param {number} id - The Unique identifier of the game.
   * @param {number} idSubject - The ID of the subject to which the game belongs.
   * @param {string} img - The URL of the game's image.
   * @param {string} name - The name of the game.
   * @param {number} maxScore - The maximum score achievable in the game.
   * @param {boolean} isOpen - Indicates whether the game is accessible.
   * @param {boolean} isVisible - Indicates whether the game is visible to users.
   * @param {number} position - The position of the game in a list or UI.
   * @param {number} idUser - The ID of the user who uploaded or owns the game.
   * @param {boolean} isNew - Indicates if the game is new.
   * @param {boolean} uploaded - Indicates if the game has been uploaded successfully.
   */
  constructor(
    public id: number,
    public idSubject: number,
    public img: string,
    public name: string,
    public maxScore: number,
    public isOpen: boolean,
    public isVisible: boolean,
    public position: number,
    public idUser: number,
    public isNew: boolean,
    public uploaded: boolean
  ) {}
}

/**
 * Interface representing the structure of a Game object.
 *
 * This interface defines the properties of a game that will be used across the application.
 *
 * @interface
 */
interface IGame {
  id: number;
  idSubject: number;
  img: string;
  name: string;
  maxScore: number;
  isOpen: boolean;
  isVisible: boolean;
  position: number;
  idUser: number;
  isNew: boolean;
  uploaded: boolean;
}

/**
 * Interface for the API response when fetching games.
 *
 * This interface maps the API response fields to the Game model.
 *
 * @interface
 */
interface GameApiResponse {
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
 * Interface representing payload for updating the open state of a game.
 *
 * @interface
 */
export interface GameApiOpenStatePayload {
  gameId: number;
  isOpen: boolean;
}

/**
 * Interface representing payload for updating the visible state of a game.
 *
 * @interface
 */
export interface GameApiVisibleStatePayload {
  gameId: number;
  isVisible: boolean;
}

/**
 * Interface representing payload for creating a new game.
 *
 * @interface
 */
export interface GameApiPayload {
  idSubject: number;
  name: string;
  img: string;
  maxScore: number;
}

export const GameApi = {
  getAll: async (subjectId: number): Promise<Game[]> => {
    try {
      const data = await httpClient.get(API_URLS.GET_GAMES(subjectId));

      return data.map(
        (game: GameApiResponse) =>
          new Game(
            game.IDMinijuego,
            game.IDMundo,
            game.UrlImagen,
            game.Nombre,
            game.PuntuacionMaxima,
            game.Abierto,
            game.Visible,
            game.Posicion,
            game.IDUsuario,
            game.Nuevo,
            game.Subido
          )
      );
    } catch (error) {
      console.error(`Error fetching games for subject ID: ${subjectId}`, error);
      throw new Error('Failed to fetch games');
    }
  },

  getById: async (gameId: number): Promise<Game> => {
    try {
      const data = await httpClient.get(API_URLS.GET_GAME(gameId));

      return data.map(
        (game: GameApiResponse) =>
          new Game(
            game.IDMinijuego,
            game.IDMundo,
            game.UrlImagen,
            game.Nombre,
            game.PuntuacionMaxima,
            game.Abierto,
            game.Visible,
            game.Posicion,
            game.IDUsuario,
            game.Nuevo,
            game.Subido
          )
      );
    } catch (error) {
      console.error(`Error fetching game for game ID: ${gameId}`, error);
      throw new Error('Failed to fetch game');
    }
  },

  updateOpenState: async (payload: GameApiOpenStatePayload): Promise<void> => {
    try {
      await httpClient.put(API_URLS.UPDATE_GAME_OPEN(payload.gameId), {
        isOpen: payload.isOpen,
      });
    } catch (error) {
      console.error(
        `Error updating open state for game (ID: ${payload.gameId}):`,
        error
      );
      throw new Error('Failed to update the game open state');
    }
  },

  updateVisibleState: async (
    payload: GameApiVisibleStatePayload
  ): Promise<void> => {
    try {
      await httpClient.put(API_URLS.UPDATE_GAME_VISIBLE(payload.gameId), {
        isVisible: payload.isVisible,
      });
    } catch (error) {
      console.error(
        `Error updating visible state for game (ID: ${payload.gameId}):`,
        error
      );
      throw new Error('Failed to update the game visible state');
    }
  },

  delete: async (gameId: number): Promise<void> => {
    try {
      await httpClient.delete(API_URLS.DELETE_GAME(gameId));
    } catch (error) {
      console.error(`Error deleting game (ID: ${gameId}):`, error);
      throw new Error('Failed to delete game');
    }
  },

  create: async (payload: GameApiPayload): Promise<void> => {
    try {
      await httpClient.post(API_URLS.CREATE_GAME, payload);
    } catch (error) {
      console.error('Error creating new game:', error);
      throw new Error('Failed to create new game');
    }
  },
};
