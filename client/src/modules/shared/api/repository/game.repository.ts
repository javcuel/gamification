import HttpClient from '../../../../api/http-client';
import { API_URLS } from '../../../../constants/apiUrls';
import { Game, GameCreate, GameUpdate } from '../domain/game';
import { IGameRepository } from '../interface/game-repository.interface';
import { GameMapper } from '../mapper/game.mapper';

/**
 * Implementation of the IGameRepository interface.
 * Handles communication with the backend API for game-related operations.
 */
class GameRepository implements IGameRepository {
	/**
	 * Retrieves all games from the backend.
	 * @returns A promise resolving to an array of Game domain objects.
	 */
	async getAll(): Promise<Game[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_GAMES);
			return data.map(GameMapper.toDomain);
		} catch (error) {
			console.error('Error fetching games', error);
			throw new Error('Failed to fetch games');
		}
	}

	/**
	 * Retrieves a specific game by its ID.
	 * @param id - The ID of the game to fetch.
	 * @returns A promise resolving to a Game domain object.
	 */
	async getById(id: number): Promise<Game> {
		try {
            // USAR LA CONSTANTE EN VEZ DEL STRING MANUAL
			const data = await HttpClient.get(API_URLS.GET_GAME(id)); 
			return GameMapper.toDomain(data);
		} catch (error) {
			console.error(`Error fetching game (ID: ${id})`, error);
			throw new Error('Failed to fetch game');
		}
	}

	/**
	 * Retrieves games associated with a specific subject ID.
	 * @param subjectId - The ID of the subject.
	 * @returns A promise resolving to an array of Game domain objects.
	 */
	async getLinkedGamesById(subjectId: number): Promise<Game[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_LINKED_GAMES_BY_ID(subjectId));
			return data.map(GameMapper.toDomain);
		} catch (error) {
			console.error('Error fetching games', error);
			throw new Error('Failed to fetch games');
		}
	}
	/**
	 * Retrieves games NOT associated with a specific subject ID.
	 * @param subjectId - The ID of the subject.
	 * @returns A promise resolving to an array of Game domain objects.
	 */
	async getUnlinkedGamesById(subjectId: number): Promise<Game[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_UNLINKED_GAMES_BY_ID(subjectId));
			return data.map(GameMapper.toDomain);
		} catch (error) {
			console.error('Error fetching games', error);
			throw new Error('Failed to fetch games');
		}
	}


	/**
	 * Crea un nuevo juego enviando los datos y los archivos al backend.
	 * Se encarga de transformar el modelo de dominio en un FormData válido para HTTP.
	 * * @param gameData - Instancia del modelo de dominio con la información y archivos
	 */
	async create(gameData: GameCreate): Promise<void> {
		try {
			// 1. El Repositorio asume la responsabilidad de empaquetar para HTTP
			const formData = new FormData();
			
			formData.append('name', gameData.name);
			formData.append('img', gameData.img);

			// Adjuntamos el archivo .zip si existe
			if (gameData.gameFile) {
				formData.append('gameFile', gameData.gameFile);
			}

			// Adjuntamos la imagen física si el usuario decidió subirla en vez de URL
			if (gameData.imageFile) {
				formData.append('imageFile', gameData.imageFile);
			}

			// 2. Enviamos la petición
			await HttpClient.post(API_URLS.CREATE_GAME, formData);
		} catch (error) {
			console.error('Error creating game', error);
			throw new Error('Failed to create game');
		}
	}

	/**
	 * Sends a request to update an existing game.
	 * @param id - The ID of the game to be updated.
	 * @param data - The GameUpdate structure with updated values.
	 */
	async update(id: number, data: GameUpdate): Promise<void> {
		const requestDTO = GameMapper.toUpdateDTO(data);

		try {
			await HttpClient.put(API_URLS.UPDATE_GAME(id), requestDTO);
		} catch (error) {
			console.error(`Error updating game (ID: ${id}):`, error);
			throw new Error('Failed to update game');
		}
	}

	/**
	 * Updates the 'open' state of a specific game.
	 * @param id - The ID of the game to modify.
	 * @param newState - The new boolean value for the 'open' state.
	 */
	async updateOpen(id: number, newState: boolean): Promise<void> {
		const requestDTO = GameMapper.toUpdateOpenDTO(newState);

		try {
			await HttpClient.put(API_URLS.UPDATE_GAME_OPEN(id), requestDTO);
		} catch (error) {
			console.error(`Error updating game (ID: ${id}):`, error);
			throw new Error('Failed to update open state.');
		}
	}

	/**
	 * Updates the 'visible' state of a specific game.
	 * @param id - The ID of the game to modify.
	 * @param newState - The new boolean value for the 'visible' state.
	 */
	async updateVisible(id: number, newState: boolean): Promise<void> {
		const requestDTO = GameMapper.toUpdateVisibleDTO(newState);

		try {
			await HttpClient.put(API_URLS.UPDATE_GAME_VISIBLE(id), requestDTO);
		} catch (error) {
			console.error(`Error updating game (ID: ${id}):`, error);
			throw new Error('Failed to update visible state.');
		}
	}

	/**
	 * Deletes a game by its ID.
	 * @param id - The ID of the game to delete.
	 */
	async delete(id: number): Promise<void> {
		try {
			await HttpClient.delete(API_URLS.DELETE_GAME(id));
		} catch (error) {
			console.error(`Error deleting game (ID: ${id}):`, error);
			throw new Error('Failed to delete game');
		}
	}
}

// Exporting a singleton instance of the repository for use across the application.
export const gameRepository = new GameRepository();
