/**
 * Class representing a Ranking inside the App.
 *
 * @class
 */
export class Ranking {
  /**
   * Creates a new Ranking instance.
   *
   * @param {number} userName
   * @param {string} userGroup
   * @param {string} userCompletedSubjects
   * @param {string} userTotalScore
   */
  constructor(
    public userName: string,
    public userGroup: string,
    public userCompletedSubjects: number,
    public userTotalScore: number
  ) {}
}
