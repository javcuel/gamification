import HttpClient from '../http-client';
import { API_URLS } from '../../../../constants/apiUrls';
import { Game, GameCreate, GameUpdate } from '../domain/game';
import { IGameRepository } from '../interface/game-repository.interface';
import { GameMapper } from '../mapper/game.mapper';

class GameRepository implements IGameRepository {
	async getAll(): Promise<Game[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_GAMES);
			return data.map(GameMapper.toDomain);
		} catch (error) {
			console.error('Error fetching games', error);
			throw new Error('Failed to fetch games');
		}
	}

	async getById(id: number): Promise<Game> {
		try {
			const data = await HttpClient.get(`${API_URLS.GET_GAMES}/${id}`);
			return GameMapper.toDomain(data);
		} catch (error) {
			console.error(`Error fetching game with ID ${id}`, error);
			throw new Error('Failed to fetch game');
		}
	}

	async getBySubject(subjectId: number): Promise<Game[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_LINKED_GAMES_BY_ID(subjectId));
			return data.map(GameMapper.toDomain);
		} catch (error) {
			console.error(`Error fetching games for subject ${subjectId}`, error);
			throw new Error('Failed to fetch games for subject');
		}
	}

	async getAvailableForSubject(subjectId: number): Promise<Game[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_UNLINKED_GAMES_BY_ID(subjectId));
			return data.map(GameMapper.toDomain);
		} catch (error) {
			console.error(`Error fetching available games for subject ${subjectId}`, error);
			throw new Error('Failed to fetch available games');
		}
	}

	async create(gameData: GameCreate): Promise<void> {
		try {
			const formData = new FormData();
			formData.append('name', gameData.name);
			formData.append('img', gameData.img);

			// Strict verification of local files (images)
			if (gameData.imageFile !== null && gameData.imageFile !== undefined) {
				formData.append('imageFile', gameData.imageFile);
			}

			// Strict verification of local files (game in zip format)
			if (gameData.gameFile !== null && gameData.gameFile !== undefined) {
				formData.append('gameFile', gameData.gameFile);
			}

			await HttpClient.post(API_URLS.CREATE_GAME, formData);
		} catch (error) {
			console.error('Error creating game:', error);
			throw new Error('Failed to create game');
		}
	}

	async update(id: number, gameData: GameUpdate): Promise<void> {
		try {
			const formData = new FormData();
			formData.append('name', gameData.name);
			formData.append('img', gameData.img);

			// Strict verification of local files (images)
			if (gameData.imageFile !== null && gameData.imageFile !== undefined) {
				formData.append('imageFile', gameData.imageFile);
			}

			// Strict verification of local files (game in zip format)
			if (gameData.gameFile !== null && gameData.gameFile !== undefined) {
				formData.append('gameFile', gameData.gameFile);
			}

			await HttpClient.put(API_URLS.UPDATE_GAME(id), formData);
		} catch (error) {
			console.error(`Error updating game (ID: ${id}):`, error);
			throw new Error('Failed to update game');
		}
	}

	async updateOpen(id: number, newState: boolean): Promise<void> {
		const requestDTO = GameMapper.toUpdateOpenDTO(newState);
		try {
			await HttpClient.put(API_URLS.UPDATE_GAME_OPEN(id), requestDTO);
		} catch (error) {
			console.error(`Error updating game (ID: ${id}):`, error);
			throw new Error('Failed to update open state.');
		}
	}

	async updateVisible(id: number, newState: boolean): Promise<void> {
		const requestDTO = GameMapper.toUpdateVisibleDTO(newState);
		try {
			await HttpClient.put(API_URLS.UPDATE_GAME_VISIBLE(id), requestDTO);
		} catch (error) {
			console.error(`Error updating game (ID: ${id}):`, error);
			throw new Error('Failed to update visible state.');
		}
	}

	async delete(id: number): Promise<void> {
		try {
			await HttpClient.delete(API_URLS.DELETE_GAME(id));
		} catch (error) {
			console.error(`Error deleting game (ID: ${id}):`, error);
			throw new Error('Failed to delete game');
		}
	}
}

export const gameRepository = new GameRepository();