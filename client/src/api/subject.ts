import { API_URLS } from '../constants/apiUrls';
import httpClient from './httpClient';

/**
 * Class representing a Subject.
 *
 * @class
 * @implements {ISubject}
 */
export class Subject implements ISubject {
  /**
   * Creates a new Subject instance.
   *
   * @param {number} id - The unique identifier for the subject.
   * @param {string} name - The name of the subject.
   * @param {string} img - The URL of the subject's main image.
   * @param {string} imgBackground - The URL of the subject's background image.
   * @param {number} position - The position or ranking of the subject.
   * @param {boolean} isOpen - Indicates if the subject is open.
   * @param {boolean} isVisible - Indicates if the subject is visible.
   */
  constructor(
    public id: number,
    public name: string,
    public img: string,
    public imgBackground: string,
    public position: number,
    public isOpen: boolean,
    public isVisible: boolean
  ) {}
}

/**
 * Interface representing the structure of a Subject object.
 *
 * This interface defines the properties of a subject that will be used across the application.
 *
 * @interface
 */
interface ISubject {
  id: number;
  name: string;
  img: string;
  imgBackground: string;
  position: number;
  isOpen: boolean;
  isVisible: boolean;
}

/**
 * Interface for the API response when fetching subjects.
 *
 * This interface maps the API response fields to the Subject model.
 *
 * @interface
 */
interface SubjectApiResponse {
  IDMundo: number;
  Nombre: string;
  UrlImgMundo: string;
  UrlImgDentro: string;
  Posicion: number;
  Abierto: boolean;
  Visible: boolean;
}

/**
 * Interface representing payload for updating the open state of a subject.
 *
 * @interface
 */
interface SubjectApiOpenStatePayload {
  subjectId: number;
  isOpen: boolean;
}

/**
 * Interface representing payload for updating the visible state of a subject.
 *
 * @interface
 */
interface SubjectApiVisibleStatePayload {
  subjectId: number;
  isVisible: boolean;
}

/**
 * Interface representing payload for creating a new subject.
 *
 * @interface
 */
interface SubjectApiPayload {
  id: number;
  name: string;
  img: string;
  imgBackground: string;
}

/**
 * Fetches the list of subjects from the API and maps them into `Subject` instances.
 *
 * This function performs an HTTP GET request to retrieve the subjects and transforms the API response
 * into a list of `Subject` objects that can be used throughout the application.
 *
 * @async
 * @function
 * @returns {Promise<Subject[]>} A promise that resolves to an array of `Subject` objects.
 * @throws {Error} If an error occurs while fetching the subjects, an error is thrown.
 *
 * @example
 * const subjects = await fetchSubjects();
 */
export const fetchSubjects = async (): Promise<Subject[]> => {
  try {
    const data = await httpClient.get(API_URLS.GET_SUBJECTS);

    return data.map(
      (subject: SubjectApiResponse) =>
        new Subject(
          subject.IDMundo,
          subject.Nombre,
          subject.UrlImgMundo,
          subject.UrlImgDentro,
          subject.Posicion,
          subject.Abierto,
          subject.Visible
        )
    );
  } catch (error) {
    console.error('Error fetching subjects', error);
    throw new Error('Error to fetch subjects');
  }
};

/**
 * Updates the open state of a Subject.
 *
 * This function performs an HTTP PUT request to update de open/closed state of a Subject.
 *
 * @async
 * @function
 * @param {SubjectApiOpenStatePayload} payload - The payload object containing:
 *   - `subjectId` (number): The unique identifier of the Subject to be updated.
 *   - `isOpen` (boolean): The new open state of the Subject.
 * @returns {Promise<void>} A promise that resolves when the Subject open state is successfully updated.
 * @throws {Error} Throws an error if the open state update fails.
 *
 * @example
 * const payload: SubjectApiOpenStatePayload = {
 *   subjectId: 123,
 *   isOpen: true
 * };
 *
 * updateSubjectOpenState(payload)
 *   .then(() => console.log("Subject open state updated"))
 *   .catch(error => console.error(error));
 */
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

/**
 * Updates the visible state of a Subject.
 *
 * This function performs an HTTP PUT request to update de visible/hidden state of a Subject.
 *
 * @async
 * @function
 * @param {SubjectApiVisibleStatePayload} payload - The payload object containing:
 *   - `subjectId` (number): The unique identifier of the Subject to be updated.
 *   - `isVisible` (boolean): The new visible state of the Subject.
 * @returns {Promise<void>} A promise that resolves when the Subject visible state is successfully updated.
 * @throws {Error} Throws an error if the visible state update fails.
 *
 * @example
 * const payload: SubjectApiVisibleStatePayload = {
 *   subjectId: 123,
 *   isVisible: true
 * };
 *
 * updateSubjectVisibleState(payload)
 *   .then(() => console.log("Subject visible state updated"))
 *   .catch(error => console.error(error));
 */
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
