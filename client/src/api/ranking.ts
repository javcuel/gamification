import httpClient from './httpClient';
import { API_URLS } from '../constants/apiUrls';

export class Ranking implements IRanking {
  constructor(
    public userName: string,
    public userGroup: string,
    public userCompletedSubjects: number,
    public userTotalScore: number
  ) {}
}

export interface IRanking {
  userName: string;
  userGroup: string;
  userCompletedSubjects: number;
  userTotalScore: number;
}

interface RankingApiResponse {
  Nombre: string;
  Grupo: string;
  TotalEstrellas: number;
  TotalPuntos: number;
}

const mapRankingResponse = (data: RankingApiResponse[]): Ranking[] => {
  return data.map(
    (ranking: RankingApiResponse) =>
      new Ranking(
        ranking.Nombre,
        ranking.Grupo,
        ranking.TotalEstrellas,
        ranking.TotalPuntos
      )
  );
};

export const RankingApi = {
  getPlayers: async (): Promise<Ranking[]> => {
    try {
      const data = await httpClient.get(API_URLS.GET_P_RANKING);

      return mapRankingResponse(data);
    } catch (error) {
      console.error('Error fetching players ranking', error);
      throw new Error('Error to fetch players ranking');
    }
  },

  // Groups General Ranking
  getGroups: async (): Promise<Ranking[]> => {
    try {
      const data = await httpClient.get(API_URLS.GET_G_RANKING);

      return mapRankingResponse(data);
    } catch (error) {
      console.error('Error fetching groups ranking', error);
      throw new Error('Error to fetch groups ranking');
    }
  },

  // Players by Game Ranking
  getPlayersByGame: async (gameId: number): Promise<Ranking[]> => {
    try {
      const data = await httpClient.get(API_URLS.GET_PG_RANKING(gameId));

      return mapRankingResponse(data);
    } catch (error) {
      console.error('Error fetching players by game ranking', error);
      throw new Error('Error to fetch players by game ranking');
    }
  },

  // Groups by Game Ranking
  getGroupsByGame: async (gameId: number): Promise<Ranking[]> => {
    try {
      const data = await httpClient.get(API_URLS.GET_GG_RANKING(gameId));

      return mapRankingResponse(data);
    } catch (error) {
      console.error('Error fetching groups by game ranking', error);
      throw new Error('Error to fetch gruops by game ranking');
    }
  },
};
