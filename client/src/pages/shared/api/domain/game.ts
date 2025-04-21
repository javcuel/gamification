/**
 * Class representing a Game inside the App.
 *
 * @class
 */
export class Game {
  /**
   * Creates a new Game instance.
   *
   * @param {number} id
   * @param {number} idSubject
   * @param {string} img
   * @param {number} maxScore
   * @param {boolean} isOpen
   * @param {boolean} isVisible
   * @param {number} position
   * @param {number} idUser
   * @param {boolean} isNew
   * @param {boolean} uploaded
   */
  constructor(
    public id: number,
    public idSubject: number,
    public img: string,
    public name: string,
    public maxScore: number,
    public isOpen: boolean,
    public isVisible: boolean,
    public position: number,
    public idUser: number,
    public isNew: boolean,
    public uploaded: boolean
  ) {}
}
