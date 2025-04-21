import { Game } from '../domain/game';

import httpClient from '../../../../api/httpClient';
import { API_URLS } from '../../../../constants/apiUrls';
import { IGameRepository } from '../interface/game-repository.interface';
import { GameMapper } from '../mapper/game.mapper';

export class GameRepository implements IGameRepository {
  async getAll(idSubject: number): Promise<Game[]> {
    try {
      const data = await httpClient.get(API_URLS.GET_GAMES(idSubject));
      return data.map(GameMapper.toDomain);
    } catch (error) {
      console.error('Error fetching games', error);
      throw new Error('Failed to fetch games');
    }
  }

  async create(data: Game): Promise<void> {
    const requestDTO = GameMapper.toRequestDTO(data);

    try {
      await httpClient.post(API_URLS.CREATE_GAME, requestDTO);
    } catch (error) {
      console.error('Error creating new game:', error);
      throw new Error('Failed to create new game');
    }
  }

  async update(id: number, data: Game): Promise<void> {
    const requestDTO = GameMapper.toRequestDTO(data);

    try {
      await httpClient.put(API_URLS.UPDATE_GAME(id), requestDTO);
    } catch (error) {
      console.error(`Error updating game (ID: ${id}):`, error);
      throw new Error('Failed to update game');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await httpClient.delete(API_URLS.DELETE_GAME(id));
    } catch (error) {
      console.error(`Error deleting game (ID: ${id}):`, error);
      throw new Error('Failed to delete game');
    }
  }
}

export const gameRepository = new GameRepository();
