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
	 * Sends a request to create a new game.
	 * @param data - The GameCreate structure containing new game data.
	 */
	async create(data: GameCreate): Promise<void> {
		const requestDTO = GameMapper.toCreateDTO(data);

		try {
			await HttpClient.post(API_URLS.CREATE_GAME, requestDTO); // Here: Debug
		} catch (error) {
			console.error('Error creating new game:', error);
			throw new Error('Failed to create new game');
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
