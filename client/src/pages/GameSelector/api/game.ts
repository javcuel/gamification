import httpClient from '../../../adapters/api/httpClient';

export interface Game {
  id: number;
  idSubject: number;
  img: string;
  name: string;
  maxScore: number;
  isOpen: boolean;
  isVisible: boolean;
  position: number;
  idUser: number;
  new: boolean;
  uploaded: boolean;
}

interface GameApiResponse {
  IDMinijuego: number;
  IDMundo: number;
  UrlImagen: string;
  Nombre: string;
  PuntuacionMaxima: number;
  Abierto: boolean;
  Visible: boolean;
  Posicion: number;
  IDUsuario: number;
  Nuevo: boolean;
  Subido: boolean;
}

export const fetchGames = async (subjectId: number): Promise<Game[]> => {
  try {
    const data = await httpClient.get(`/games/${subjectId}`);

    return data.map((game: GameApiResponse) => ({
      id: game.IDMinijuego,
      idSubject: game.IDMundo,
      img: game.UrlImagen,
      name: game.Nombre,
      maxScore: game.PuntuacionMaxima,
      isOpen: game.Abierto,
      isVisible: game.Visible,
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
