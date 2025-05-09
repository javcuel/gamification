import { Game, GameCreate, GameUpdate } from '../domain/game';

import HttpClient from '../../../../api/http-client';
import { API_URLS } from '../../../../constants/apiUrls';
import { IGameRepository } from '../interface/game-repository.interface';
import { GameMapper } from '../mapper/game.mapper';

class GameRepository implements IGameRepository {
  async getAll(subjectId: number): Promise<Game[]> {
    try {
      const data = await HttpClient.get(API_URLS.GET_GAMES(subjectId));
      return data.map(GameMapper.toDomain);
    } catch (error) {
      console.error('Error fetching games', error);
      throw new Error('Failed to fetch games');
    }
  }

  async create(data: GameCreate): Promise<void> {
    const requestDTO = GameMapper.toCreateDTO(data);

    try {
      await HttpClient.post(API_URLS.CREATE_GAME, requestDTO);
    } catch (error) {
      console.error('Error creating new game:', error);
      throw new Error('Failed to create new game');
    }
  }

  async update(id: number, data: GameUpdate): Promise<void> {
    const requestDTO = GameMapper.toUpdateDTO(data);

    try {
      await HttpClient.put(API_URLS.UPDATE_GAME(id), requestDTO);
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
