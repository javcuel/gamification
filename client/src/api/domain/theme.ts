/**
 * Class representing a Theme inside the App.
 *
 * @class
 */
export class Theme {
  /**
   * Creates a new Subject instance.
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
