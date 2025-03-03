import httpClient from '../../../../adapters/api/httpClient';
import { Game } from '../../../../entities/game';

export const fetchGames = async (subjectId: number): Promise<Game[]> => {
  try {
    const apiResponse = await httpClient.get(`/games/${subjectId}`);
    return apiResponse.map((game: any) => ({
      id: game.IDMinijuego,
      idSubject: game.IDMundo,
      img: game.UrlImagen,
      name: game.Nombre,
      maxScore: game.PuntuacionMaxima,
      isOpen: game.Abierto === 1,
      isVisible: game.Visible === 1,
      position: game.Posicion,
      userId: game.IDUsuario,
      isNew: game.Nuevo,
      isUploaded: game.Subido,
    }));
  } catch (error) {
    console.error(`Error fetching games for subject ID: ${subjectId}`, error);
    throw new Error('Failed to fetch games');
  }
};
/*   return [
    {
      id: 94,
      idSubject: 1,
      img: 'images/imagesGames/apuntados.png',
      name: 'Apuntados',
      maxScore: 2000,
      isOpen: true,
      isVisible: true,
      position: 1,
    },
    {
      id: 94,
      idSubject: 1,
      img: 'images/imagesGames/apilados.png',
      name: 'Apuntados',
      maxScore: 2000,
      isOpen: true,
      isVisible: true,
      position: 1,
    },
    {
      id: 94,
      idSubject: 1,
      img: 'images/imagesGames/cafeteria.png',
      name: 'Apuntados',
      maxScore: 2000,
      isOpen: true,
      isVisible: true,
      position: 1,
    },
    {
      id: 94,
      idSubject: 1,
      img: 'images/imagesGames/caidaDatos.png',
      name: 'Apuntados',
      maxScore: 2000,
      isOpen: false,
      isVisible: true,
      position: 1,
    },
  ]; */
