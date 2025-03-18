import httpClient from '../../../api/httpClient';
import { API_URLS } from '../../../constants/apiUrls';

interface SubjectApiOpenStatePayload {
  subjectId: number;
  isOpen: boolean;
}

interface SubjectApiVisibleStatePayload {
  subjectId: number;
  isVisible: boolean;
}

interface SubjectApiPayload {
  name: string;
  img: string;
  imgBackground: string;
}

export interface Subject {
  id: number;
  name: string;
  img: string;
  imgBackground: string;
  position: number;
  isOpen: boolean;
  isVisible: boolean;
}

interface SubjectApiResponse {
  IDMundo: number;
  Nombre: string;
  UrlImgMundo: string;
  UrlImgDentro: string;
  Abierto: boolean;
  Visible: boolean;
  Posicion: number;
}

export const fetchSubjects = async (): Promise<Subject[]> => {
  try {
    const data = await httpClient.get(API_URLS.GET_SUBJECTS);

    return data.map((subject: SubjectApiResponse) => ({
      id: subject.IDMundo,
      name: subject.Nombre,
      img: subject.UrlImgMundo,
      imgBackground: subject.UrlImgDentro,
      isOpen: subject.Abierto,
      isVisible: subject.Visible,
      position: subject.Posicion,
    }));
  } catch (error) {
    console.error('Error fetching subjects', error);
    throw new Error('Error to fetch subjects');
  }
};

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
