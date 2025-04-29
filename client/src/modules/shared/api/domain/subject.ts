/**
 * Class representing a Subject inside the App.
 *
 * @class
 */
export class Subject {
  /**
   * Creates a new Subject instance.
   *
   * @param {number} id - Subject identifier
   * @param {string} name - Subject name
   * @param {string} img - Subject image
   * @param {string} imgBackground - Subject background image
   * @param {number} position - Subject position
   * @param {boolean} isOpen - Open state of the subject
   * @param {boolean} isVisible - Visible state of the subject
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
