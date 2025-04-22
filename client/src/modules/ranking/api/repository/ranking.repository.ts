import { Ranking } from '../domain/ranking';

import httpClient from '../../../../api/httpClient';
import { API_URLS } from '../../../../constants/apiUrls';
import { IRankingRepository } from '../interface/ranking-repository.interface';
import { RankingMapper } from '../mapper/ranking.mapper';

export class RankingRepository implements IRankingRepository {
  async getPlayers(): Promise<Ranking[]> {
    try {
      const data = await httpClient.get(API_URLS.GET_P_RANKING);
      return data.map(RankingMapper.toDomain);
    } catch (error) {
      console.error('Error fetching players ranking', error);
      throw new Error('Error to fetch players ranking');
    }
  }

  async getGroups(): Promise<Ranking[]> {
    try {
      const data = await httpClient.get(API_URLS.GET_G_RANKING);
      return data.map(RankingMapper.toDomain);
    } catch (error) {
      console.error('Error fetching groups ranking', error);
      throw new Error('Error to fetch groups ranking');
    }
  }

  async getPlayersByGame(gameId: number): Promise<Ranking[]> {
    try {
      const data = await httpClient.get(API_URLS.GET_PG_RANKING(gameId));
      return data.map(RankingMapper.toDomain);
    } catch (error) {
      console.error('Error fetching players by game ranking', error);
      throw new Error('Error to fetch players by game ranking');
    }
  }

  async getGroupsByGame(gameId: number): Promise<Ranking[]> {
    try {
      const data = await httpClient.get(API_URLS.GET_GG_RANKING(gameId));
      return data.map(RankingMapper.toDomain);
    } catch (error) {
      console.error('Error fetching groups by game ranking', error);
      throw new Error('Error to fetch gruops by game ranking');
    }
  }
}

export const rankingRepository = new RankingRepository();
