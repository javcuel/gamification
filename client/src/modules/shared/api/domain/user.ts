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
	 * @param {string} role - User role
	 * @param {string} name - User name
	 * @param {string} passwd - User password
	 * @param {string} [realName] - User real name (optional)
	 */
	constructor(
		public id: number,
		public role: (typeof ROLES)[keyof typeof ROLES],
		public name: string,
		public passwd: string,
		public realName?: string // Añadido aquí al final (opcional)
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

export class UserUpdate {
	constructor(
		public realName: string | undefined, // Cambiado de group a realName
		public role: (typeof ROLES)[keyof typeof ROLES],
		public name: string,
		public passwd: string
	) {}
}

/**
 * Class representing a User creation payload inside the App.
 *
 * @class
 */
export class UserCreate {
	/**
	 * Creates a new UserCreate instance.
	 *
	 * @param {string} realName - User real name
	 * @param {string} role - Subject role
	 * @param {string} name - Subject name
	 * @param {string} passwd - Subject passwd
	 */
	constructor(
		public realName: string | undefined, // Cambiado de group a realName
		public role: (typeof ROLES)[keyof typeof ROLES],
		public name: string,
		public passwd: string
	) {}
}