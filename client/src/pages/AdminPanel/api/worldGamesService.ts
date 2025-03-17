import httpClient from '../../../api/httpClient';
import { Game } from '../../GameSelector/api/game';
import { Subject } from '../../Home/api/subject';
import { API_URLS } from '../../../constants/apiUrls';

interface SubjectApiOpenStatePayload {
  subjectId: number;
  isOpen: boolean;
}

interface SubjectApiVisibleStatePayload {
  subjectId: number;
  isVisible: boolean;
}

//TODO: IMPORTAR ESTO DE SUBJECTS API -----------------------------------------------------
export const fetchSubjects = async (): Promise<Subject[]> => {
  try {
    const apiResponse = await httpClient.get('/worlds/');
    return apiResponse.map((world: any) => ({
      id: world.IDMundo,
      name: world.Nombre,
      imgWorldUrl: world.UrlImgMundo,
      imgBackgroundUrl: world.UrlImgDentro,
      position: world.Posicion,
      isOpen: world.Abierto === 1,
      isVisible: world.Visible === 1,
      games: [],
    }));
  } catch (error) {
    console.error('Error fetching worlds and games:', error);
    throw new Error('Failed to fetch worlds and games');
  }
}; // -------------------------------------------------------------------------------

//TODO: IMPORTAR ESTO DE GAMESELECTOR API ------------------------------------------------------------
export const fetchGamesByWorld = async (worldId: number): Promise<Game[]> => {
  try {
    const apiResponse = await httpClient.get(`/games/${worldId}`);
    return apiResponse.map((game: any) => ({
      id: game.IDMinijuego,
      idWorld: game.IDMundo,
      imgUrl: game.UrlImagen,
      name: game.Nombre,
      maxScore: game.PuntuacionMaxima,
      isOpen: game.Abierto === 1,
      isVisible: game.Visible === 1,
      position: game.Posicion,
    }));
  } catch (error) {
    console.error(`Error fetching games for world ID: ${worldId}`, error);
    throw new Error('Failed to fetch games');
  }
}; // --------------------------------------------------------------------------------------------------

export const updateSubjectOpenState = async (
  payload: SubjectApiOpenStatePayload
): Promise<void> => {
  try {
    await httpClient.put(API_URLS.UPDATE_SUBJECT_OPEN(payload.subjectId), {
      isOpen: payload.isOpen,
    });
  } catch (error) {
    console.error(
      `Error updating open state for world (ID: ${payload.subjectId}):`,
      error
    );
    throw new Error('Failed to update the world open state.');
  }
};

export const updateWorldVisibleState = async (
  payload: SubjectApiVisibleStatePayload
): Promise<void> => {
  try {
    await httpClient.put(API_URLS.UPDATE_SUBJECT_VISIBLE(payload.subjectId), {
      isVisible: payload.isVisible,
    });
  } catch (error) {
    console.error(
      `Error updating visible state for world (ID: ${payload.subjectId}):`,
      error
    );
    throw new Error('Failed to update the world visible state.');
  }
};

export const updateGameOpenState = async (
  gameId: number,
  isOpen: boolean
): Promise<void> => {
  try {
    await httpClient.put(`/games/${gameId}/open`, { isOpen });
  } catch (error) {
    console.error(`Error updating open state for game (ID: ${gameId}):`, error);
    throw new Error('Failed to update the game open state.');
  }
};

export const updateGameVisibleState = async (
  gameId: number,
  isVisible: boolean
): Promise<void> => {
  try {
    await httpClient.put(`/games/${gameId}/visible`, { isVisible });
  } catch (error) {
    console.error(
      `Error updating visible state for game (ID: ${gameId}):`,
      error
    );
    throw new Error('Failed to update the game visible state.');
  }
};

export const addWorld = async (formData: FormData): Promise<void> => {
  try {
    await httpClient.post('/worlds/add', formData, {
      'Content-Type': 'multipart/form-data',
    });
  } catch (error) {
    console.error('Error adding world:', error);
    throw new Error('Failed to add world.');
  }
};

export const deleteWorld = async (worldId: number): Promise<void> => {
  try {
    await httpClient.delete(`/worlds/${worldId}/delete`);
  } catch (error) {
    console.error(`Error deleting world (ID: ${worldId}):`, error);
    throw new Error('Failed to delete world.');
  }
};
