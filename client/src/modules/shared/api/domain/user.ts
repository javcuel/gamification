import { ROLES } from '../../../../constants/roles';

/**
 * Class representing a User inside the App.
 *
 * @class
 */
export class User {
  /**
   * Creates a new User instance.
   *
   * @param {number} id
   * @param {string} name
   * @param {string} role
   * @param {string} totalScore
   * @param {number} completedSubjects
   */
  constructor(
    public id: number,
    public name: string,
    public passwd: string,
    public role: (typeof ROLES)[keyof typeof ROLES],
    public totalScore: number,
    public completedSubjects: number
  ) {}
}
