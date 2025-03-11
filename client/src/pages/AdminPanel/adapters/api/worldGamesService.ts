import httpClient from '../../../../adapters/api/httpClient';
import { Game } from '../../../../entities/game';
import { World } from '../../../../entities/world';

/**
 * Fetches all worlds and their associated games from the API.
 * Transforms API response keys to match frontend expectations.
 * @returns {Promise<World[]>} A promise resolving to the transformed worlds array.
 */
export const fetchWorlds = async (): Promise<World[]> => {
  try {
    const apiResponse = await httpClient.get('/worlds/');
    return apiResponse.map((world: any) => ({
      id: world.IDMundo,
      name: world.Nombre,
      imgWorldUrl: world.UrlImgMundo,
      imgBackgroundUrl: world.UrlImgDentro,
      position: world.Posicion,
      isOpen: world.Abierto === 1,
      isVisible: world.Visible === 1,
      games: [],
    }));
  } catch (error) {
    console.error('Error fetching worlds and games:', error);
    throw new Error('Failed to fetch worlds and games');
  }
};

/**
 * Fetches all games for a specific world.
 * @async
 * @function fetchGamesByWorld
 * @param {number} worldId - The ID of the world to fetch games for.
 * @returns {Promise<Game[]>} A promise that resolves to a list of games.
 */
export const fetchGamesByWorld = async (worldId: number): Promise<Game[]> => {
  try {
    const apiResponse = await httpClient.get(`/games/${worldId}`);
    return apiResponse.map((game: any) => ({
      id: game.IDMinijuego,
      idWorld: game.IDMundo,
      imgUrl: game.UrlImagen,
      name: game.Nombre,
      maxScore: game.PuntuacionMaxima,
      isOpen: game.Abierto === 1,
      isVisible: game.Visible === 1,
      position: game.Posicion,
    }));
  } catch (error) {
    console.error(`Error fetching games for world ID: ${worldId}`, error);
    throw new Error('Failed to fetch games');
  }
};

/**
 * Updates the "open" state of a world.
 * @param {number} worldId - The ID of the world to update.
 * @param {boolean} isOpen - The new open state (true = open, false = locked).
 * @returns {Promise<void>} A promise that resolves when the update is successful.
 */
export const updateWorldOpenState = async (
  worldId: number,
  isOpen: boolean
): Promise<void> => {
  try {
    await httpClient.put(`/worlds/${worldId}/open`, { isOpen });
  } catch (error) {
    console.error(
      `Error updating open state for world (ID: ${worldId}):`,
      error
    );
    throw new Error('Failed to update the world open state.');
  }
};

/**
 * Updates the "visible" state of a world.
 * @param {number} worldId - The ID of the world to update.
 * @param {boolean} isVisible - The new visible state (true = visible, false = invisible).
 * @returns {Promise<void>} A promise that resolves when the update is successful.
 */
export const updateWorldVisibleState = async (
  worldId: number,
  isVisible: boolean
): Promise<void> => {
  try {
    await httpClient.put(`/worlds/${worldId}/visible`, { isVisible });
  } catch (error) {
    console.error(
      `Error updating visible state for world (ID: ${worldId}):`,
      error
    );
    throw new Error('Failed to update the world visible state.');
  }
};

/**
 * Updates the "open" state of a game.
 * @param {number} gameId - The ID of the game to update.
 * @param {boolean} isOpen - The new open state (true = open, false = locked).
 * @returns {Promise<void>} A promise that resolves when the update is successful.
 */
export const updateGameOpenState = async (
  gameId: number,
  isOpen: boolean
): Promise<void> => {
  try {
    await httpClient.put(`/games/${gameId}/open`, { isOpen });
  } catch (error) {
    console.error(`Error updating open state for game (ID: ${gameId}):`, error);
    throw new Error('Failed to update the game open state.');
  }
};

/**
 * Updates the "visible" state of a game.
 * @param {number} gameId - The ID of the game to update.
 * @param {boolean} isVisible - The new visible state (true = visible, false = invisible).
 * @returns {Promise<void>} A promise that resolves when the update is successful.
 */
export const updateGameVisibleState = async (
  gameId: number,
  isVisible: boolean
): Promise<void> => {
  try {
    await httpClient.put(`/games/${gameId}/visible`, { isVisible });
  } catch (error) {
    console.error(
      `Error updating visible state for game (ID: ${gameId}):`,
      error
    );
    throw new Error('Failed to update the game visible state.');
  }
};

/**
 * Sends a request to add a new world.
 * @param {FormData} formData - The form data containing world details and images.
 * @returns {Promise<void>} Resolves if the request is successful.
 * @throws {Error} If the request fails.
 */
export const addWorld = async (formData: FormData): Promise<void> => {
  try {
    await httpClient.post('/worlds/add', formData, {
      'Content-Type': 'multipart/form-data',
    });
  } catch (error) {
    console.error('Error adding world:', error);
    throw new Error('Failed to add world.');
  }
};

export const deleteWorld = async (worldId: number): Promise<void> => {
  try {
    await httpClient.delete(`/worlds/${worldId}/delete`);
  } catch (error) {
    console.error(`Error deleting world (ID: ${worldId}):`, error);
    throw new Error('Failed to delete world.');
  }
};
