import httpClient from '../api/httpClient';
import { API_URLS } from '../constants/apiUrls';

/**
 * Class representing a Theme.
 *
 * @class
 * @implements {ITheme}
 */
export class Theme implements ITheme {
  /**
   * Creates a new Theme instance.
   *
   * @param {number} id - The unique identifier for the theme.
   * @param {string} primary - The primary color of the app.
   * @param {string} secondary - The secondary color of the app.
   * @param {string} text - The text color of the app.
   * @param {string} pointsIcon - The URL of the themes's points icon image.
   * @param {string} completedSubjectsIcon - The URL of the themes's completed subjects icon image.
   */
  constructor(
    public id: number,
    public primary: string,
    public secondary: string,
    public text: string,
    public pointsIcon: string,
    public completedSubjectsIcon: string
  ) {}
}

/**
 * Interface representing the structure of a Theme object.
 *
 * This interface defines the properties of a theme that will be used across the application.
 *
 * @interface
 */
interface ITheme {
  id: number;
  primary: string;
  secondary: string;
  text: string;
  pointsIcon: string;
  completedSubjectsIcon: string;
}

/**
 * Interface for the API response when fetching theme.
 *
 * This interface maps the API response fields to the Theme model.
 *
 * @interface
 */
interface ThemeApiResponse {
  id: number;
  primary: string;
  secondary: string;
  text: string;
  pointsIcon: string;
  completedSubjectsIcon: string;
}

/**
 * Interface representing payload for new Theme
 *
 * @interface
 */
interface ThemeApiPayload {
  primary: string;
  secondary: string;
  text: string;
  pointsIcon: string;
  completedSubjectsIcon: string;
}
export const ThemeApi = {
  get: async (): Promise<Theme> => {
    try {
      const data = await httpClient.get(API_URLS.GET_THEME);

      return data.map(
        (theme: ThemeApiResponse) =>
          new Theme(
            theme.id,
            theme.primary,
            theme.secondary,
            theme.text,
            theme.pointsIcon,
            theme.completedSubjectsIcon
          )
      );
    } catch (error) {
      console.error('Error fetching theme', error);
      throw new Error('Error to fetch theme');
    }
  },

  create: async (payload: ThemeApiPayload): Promise<void> => {
    try {
      await httpClient.post(API_URLS.CREATE_THEME, payload);
    } catch (error) {
      console.error('Error creating new theme:  ', error);
      throw new Error('Error to create new theme');
    }
  },
};
