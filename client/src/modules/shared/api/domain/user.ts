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
   * @param {number} id - User identifier
   * @param {string} name - User name
   * @param {string} role - User role
   * @param {string} totalScore - User total score
   * @param {number} completedSubjects - User completed subjects
   */
  constructor(
    public id: number,
    public group: string,
    public role: (typeof ROLES)[keyof typeof ROLES],
    public name: string,
    public passwd: string
  ) {}
}

/**
 * Class representing a User inside the App.
 *
 * @class
 */
export class UserScore {
  /**
   * Creates a new UserScore instance.
   *
   * @param {string} totalScore - User total score
   * @param {number} completedSubjects - User completed subjects
   */
  constructor(
    public totalScore: number,
    public completedSubjects: number
  ) {}
}

/**
 * Class representing a User inside the App.
 *
 * @class
 */
export class UserLogin {
  /**
   * Creates a new User instance.
   *
   * @param {string} name - User name
   * @param {string} passwd - User password
   */
  constructor(
    public name: string,
    public passwd: string
  ) {}
}
