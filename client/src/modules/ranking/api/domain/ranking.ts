/**
 * Class representing a Ranking inside the App.
 *
 * @class
 */
export class Ranking {
  /**
   * Creates a new Ranking instance.
   *
   * @param {string} userName - User Name
   * @param {string} userGroup - User group name
   * @param {string} userCompletedSubjects - Completed subjects of the user
   * @param {string} userTotalScore - Total score of the user
   */
  constructor(
    public userName: string,
    public userGroup: string,
    public userCompletedSubjects: number,
    public userTotalScore: number
  ) {}
}
