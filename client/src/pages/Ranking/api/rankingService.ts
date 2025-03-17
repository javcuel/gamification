import httpClient from '../../../api/httpClient';
import { API_URLS } from '../../../constants/apiUrls';

export interface Ranking {
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

// Players General Ranking
export const fetchRankingPlayers = async (): Promise<Ranking[]> => {
  try {
    const data = await httpClient.get(API_URLS.GET_P_RANKING);

    return data.map((ranking: RankingApiResponse) => ({
      userName: ranking.Nombre,
      userGroup: ranking.Grupo,
      totalStars: ranking.TotalEstrellas,
      totalScore: ranking.TotalPuntos,
    }));
  } catch (error) {
    console.error('Error fetching ranking', error);
    throw new Error('Error to fetch ranking');
  }
};

// Groups General Ranking
export const fetchRankingGroups = async (): Promise<Ranking[]> => {
  try {
    const apiResponse = await httpClient.get(API_URLS.GET_G_RANKING);

    return apiResponse.map((ranking: RankingApiResponse) => ({
      userName: ranking.Nombre,
      userGroup: ranking.Grupo,
      totalStars: ranking.TotalEstrellas,
      totalScore: ranking.TotalPuntos,
    }));
  } catch (error) {
    console.error('Error fetching ranking', error);
    throw new Error('Error to fetch ranking');
  }
};

// Players by Game Ranking
export const fetchRankingPlayersByGame = async (
  gameId: number
): Promise<Ranking[]> => {
  try {
    const apiResponse = await httpClient.get(API_URLS.GET_PG_RANKING(gameId));

    return apiResponse.map((ranking: RankingApiResponse) => ({
      userName: ranking.Nombre,
      userGroup: ranking.Grupo,
      totalStars: ranking.TotalEstrellas,
      totalScore: ranking.TotalPuntos,
    }));
  } catch (error) {
    console.error('Error fetching ranking', error);
    throw new Error('Error to fetch ranking');
  }
};

// Groups by Game Ranking
export const fetchRankingGroupsByGame = async (
  gameId: number
): Promise<Ranking[]> => {
  try {
    const apiResponse = await httpClient.get(API_URLS.GET_GG_RANKING(gameId));

    return apiResponse.map((ranking: RankingApiResponse) => ({
      userName: ranking.Nombre,
      userGroup: ranking.Grupo,
      totalStars: ranking.TotalEstrellas,
      totalScore: ranking.TotalPuntos,
    }));
  } catch (error) {
    console.error('Error fetching ranking', error);
    throw new Error('Error to fetch ranking');
  }
};
