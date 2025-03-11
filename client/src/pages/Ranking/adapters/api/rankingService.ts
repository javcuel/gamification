import httpClient from '../../../../adapters/api/httpClient';
/*:TODO: Tienes que cambiar el nombre de las funciones, por que las iniciasles JG hacen referencia a nombre españoles y no en ingles*/
// Mirar a ver tambien si hace falta un tipo ranking fila
export const fetchRankingJG = async () => {
  try {
    const apiResponse = await httpClient.get('/ranking/jg');

    return apiResponse.map((ranking: any) => ({
      userName: ranking.Nombre,
      userGroup: ranking.Grupo,
      totalStars: ranking.TotalEstrellas,
      totalScore: ranking.TotalPuntos,
    }));
  } catch (error) {
    console.error('An error occurred while fetching JG ranking:', error);
    throw error;
  }
};

export const fetchRankingGG = async () => {
  try {
    const apiResponse = await httpClient.get('/ranking/gg');

    return apiResponse.map((ranking: any) => ({
      userName: ranking.Nombre,
      userGroup: ranking.Grupo,
      totalStars: ranking.TotalEstrellas,
      totalScore: ranking.TotalPuntos,
    }));
  } catch (error) {
    console.error('An error occurred while fetching GG ranking:', error);
    throw error;
  }
};

//const response = await httpClient.get(`ranking/JJ?game=${gameId}`);
export const fetchRankingJJ = async (gameId: number) => {
  try {
    const apiResponse = await httpClient.get(`/ranking/jj/${gameId}`);

    return apiResponse.map((ranking: any) => ({
      userName: ranking.Nombre,
      userGroup: ranking.Grupo,
      totalStars: ranking.TotalEstrellas,
      totalScore: ranking.TotalPuntos,
    }));
  } catch (error) {
    console.error('An error occurred while fetching JJ ranking:', error);
    throw error;
  }
};

//const response = await httpClient.get(`/ranking/GJ?game=${gameId}`);
export const fetchRankingGJ = async (gameId: number) => {
  try {
    const apiResponse = await httpClient.get(`/ranking/gj/${gameId}`);

    return apiResponse.map((ranking: any) => ({
      userName: ranking.Nombre,
      userGroup: ranking.Grupo,
      totalStars: ranking.TotalEstrellas,
      totalScore: ranking.TotalPuntos,
    }));
  } catch (error) {
    console.error('An error occurred while fetching GJ ranking:', error);
    throw error;
  }
};
