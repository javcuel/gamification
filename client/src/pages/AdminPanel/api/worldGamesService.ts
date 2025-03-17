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

interface GameApiOpenStatePayload {
  gameId: number;
  isOpen: boolean;
}

interface GameApiVisibleStatePayload {
  gameId: number;
  isVisible: boolean;
}

interface SubjectApiPayload {
  name: string;
  img: string;
  imgBackground: string;
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
      `Error updating open state for subject (ID: ${payload.subjectId}):`,
      error
    );
    throw new Error('Failed to update the subject open state.');
  }
};

export const updateSubjectVisibleState = async (
  payload: SubjectApiVisibleStatePayload
): Promise<void> => {
  try {
    await httpClient.put(API_URLS.UPDATE_SUBJECT_VISIBLE(payload.subjectId), {
      isVisible: payload.isVisible,
    });
  } catch (error) {
    console.error(
      `Error updating visible state for subject (ID: ${payload.subjectId}):`,
      error
    );
    throw new Error('Failed to update the subject visible state.');
  }
};

export const updateGameOpenState = async (
  payload: GameApiOpenStatePayload
): Promise<void> => {
  try {
    await httpClient.put(API_URLS.UPDATE_GAME_OPEN(payload.gameId), {
      isOpen: payload.isOpen,
    });
  } catch (error) {
    console.error(
      `Error updating open state for game (ID: ${payload.gameId}):`,
      error
    );
    throw new Error('Failed to update the game open state.');
  }
};

export const updateGameVisibleState = async (
  payload: GameApiVisibleStatePayload
): Promise<void> => {
  try {
    await httpClient.put(API_URLS.UPDATE_GAME_VISIBLE(payload.gameId), {
      isVisible: payload.isVisible,
    });
  } catch (error) {
    console.error(
      `Error updating visible state for game (ID: ${payload.gameId}):`,
      error
    );
    throw new Error('Failed to update the game visible state.');
  }
};

export const createSubject = async (
  payload: SubjectApiPayload
): Promise<void> => {
  try {
    await httpClient.post(API_URLS.CREATE_SUBJECT, payload);
  } catch (error) {
    console.error('Error adding subject:', error);
    throw new Error('Failed to add subject.');
  }
};

export const deleteSubject = async (subjectId: number): Promise<void> => {
  try {
    await httpClient.delete(API_URLS.DELETE_SUBJECT(subjectId));
  } catch (error) {
    console.error(`Error deleting subject (ID: ${subjectId}):`, error);
    throw new Error('Failed to delete subject.');
  }
};
