/**
 * Class representing a Game inside the App.
 *
 * @class
 */
export class Game {
  /**
   * Creates a new Game instance.
   *
   * @param {number} id - Game identifier
   * @param {number} idSubject - Identifier of the subject to which the game belongs
   * @param {string} img - Game image
   * @param {number} maxScore - Max Score obtainable in the game
   * @param {boolean} isOpen - Open state of the game
   * @param {boolean} isVisible - Visible state of the game
   * @param {number} position - Game position
   * @param {number} idUser - Id of the user that uploaded the game
   * @param {boolean} isNew - State that shows if the game is new
   * @param {boolean} uploaded - State thta show if the game is uploaded
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
