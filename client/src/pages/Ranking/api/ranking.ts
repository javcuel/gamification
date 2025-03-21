import httpClient from '../../../api/httpClient';
import { API_URLS } from '../../../constants/apiUrls';

//TODO: HACER AQUI LO DE CLASS
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

const mapRankingResponse = (data: RankingApiResponse[]): Ranking[] => {
  return data.map((ranking) => ({
    userName: ranking.Nombre,
    userGroup: ranking.Grupo,
    userCompletedSubjects: ranking.TotalEstrellas,
    userTotalScore: ranking.TotalPuntos,
  }));
};

// Players General Ranking
export const fetchRankingPlayers = async (): Promise<Ranking[]> => {
  try {
    const data = await httpClient.get(API_URLS.GET_P_RANKING);

    return mapRankingResponse(data);
  } catch (error) {
    console.error('Error fetching ranking', error);
    throw new Error('Error to fetch ranking');
  }
};

// Groups General Ranking
export const fetchRankingGroups = async (): Promise<Ranking[]> => {
  try {
    const data = await httpClient.get(API_URLS.GET_G_RANKING);

    return mapRankingResponse(data);
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
    const data = await httpClient.get(API_URLS.GET_PG_RANKING(gameId));

    return mapRankingResponse(data);
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
    const data = await httpClient.get(API_URLS.GET_GG_RANKING(gameId));

    return mapRankingResponse(data);
  } catch (error) {
    console.error('Error fetching ranking', error);
    throw new Error('Error to fetch ranking');
  }
};
