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
 * Fetches the theme and maps it into `Theme` instances.
 *
 * This function performs an HTTP GET request to retrieve the theme and transforms the API response
 * into a Theme object that can be used throughout the application.
 *
 * @async
 * @function
 * @returns {Promise<Theme>} A promise that resolves to a "Theme" object.
 * @throws {Error} If an error occurs while fetching the theme, an error is thrown.
 *
 * @example
 * const theme = await fetchTheme();
 */
export const fetchTheme = async (): Promise<Theme> => {
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
};

/**
 * Creates a new theme by sending a POST request to the API.
 *
 * @async
 * @function
 * @param {Theme} newTheme - The theme object to be created, which contains the following properties:
 *   - `id` (number): The unique identifier for the theme.
 *   - `primary` (string): The primary color of the app.
 *   - `secondary` (string): The secondary color of the app.
 *   - `text` (string): The text color of the app.
 *   - `pointsIcon` (string): The URL of the theme's points icon image.
 *   - `completedSubjectsIcon` (string): The URL of the theme's completed subjects icon image.
 * @returns {Promise<void>} A promise that resolves when the theme is successfully created.
 * @throws {Error} Throws an error if the theme creation fails.
 *
 * @example
 * const newTheme: Theme = new Theme(
 *   1,
 *   "#FF5733",   // Primary color
 *   "#33FF57",   // Secondary color
 *   "#FFFFFF",   // Text color
 *   "https://example.com/points-icon.png", // Points icon URL
 *   "https://example.com/completed-icon.png" // Completed subjects icon URL
 * );
 *
 * createTheme(newTheme)
 *   .then(() => console.log("Theme created successfully"))
 *   .catch(error => console.error(error));
 */
export const createTheme = async (newTheme: Theme): Promise<void> => {
  try {
    await httpClient.post(API_URLS.CREATE_THEME, newTheme);
  } catch (error) {
    console.error('Error creating theme:  ', error);
    throw new Error('Error to create new theme');
  }
};
