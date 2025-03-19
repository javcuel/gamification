import httpClient from '../../../api/httpClient';
import { API_URLS } from '../../../constants/apiUrls';

/**
 * Class representing a Subject.
 *
 * The `Subject` class models a subject object with properties such as name, image URLs, position, visibility, and status.
 *
 * @class
 * @implements {ISubject}
 */
export class Subject implements ISubject {
  /**
   * Creates an instance of the Subject class.
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
  Abierto: boolean;
  Visible: boolean;
  Posicion: number;
}

/**
 * Fetches the list of subjects from the API and maps them into `Subject` instances.
 *
 * This function performs an HTTP GET request to retrieve the subjects and transforms the API response
 * into a list of `Subject` objects that can be used throughout the application.
 *
 * @returns {Promise<Subject[]>} A promise that resolves to an array of `Subject` objects.
 *
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
