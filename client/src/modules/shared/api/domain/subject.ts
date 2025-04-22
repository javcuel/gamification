/**
 * Class representing a Subject inside the App.
 *
 * @class
 */
export class Subject {
  /**
   * Creates a new Subject instance.
   *
   * @param {number} id
   * @param {string} name
   * @param {string} img
   * @param {string} imgBackground
   * @param {number} position
   * @param {boolean} isOpen
   * @param {boolean} isVisible
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
