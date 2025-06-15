import { ROLES } from '../constants/roles';
import { ROUTES } from '../constants/routes';

/**
 * ROLES_MAP
 *
 * Defines the roles allowed to access each route.
 * Static and dynamic routes are included, with dynamic segments
 * represented as parameter placeholders (e.g. ':gameId').
 */
const ROLES_MAP: Record<string, string[]> = {
	[ROUTES.HOME]: [
		ROLES.PLAYER,
		ROLES.TEACHER,
		ROLES.GUEST,
		ROLES.DEV,
		ROLES.ADMIN
	],

	[ROUTES.RANKING]: [
		ROLES.PLAYER,
		ROLES.TEACHER,
		ROLES.GUEST,
		ROLES.DEV,
		ROLES.ADMIN
	],

	// Dynamic routes are stored using placeholder parameters to support role checking
	[ROUTES.GAME_SELECTOR(':subjectId')]: [
		ROLES.PLAYER,
		ROLES.TEACHER,
		ROLES.GUEST,
		ROLES.DEV,
		ROLES.ADMIN
	],

	[ROUTES.PLAY(':gameId')]: [
		ROLES.PLAYER,
		ROLES.TEACHER,
		ROLES.GUEST,
		ROLES.DEV,
		ROLES.ADMIN
	],

	[ROUTES.DEV_PANEL]: [ROLES.DEV],

	[ROUTES.ADMIN_PANEL]: [ROLES.ADMIN]
};

/**
 * roleService
 *
 * Service object for role-based access logic.
 * Provides utility methods to:
 * - Get allowed roles for a given route path.
 * - Validate if a given role exists in the application.
 */
const roleService = {
	/**
	 * getAllowedRolesForRoute
	 *
	 * Returns the list of allowed roles for a specified route path.
	 * Handles both static and dynamic route matching by normalising the path.
	 *
	 * @param path - The route path to check (e.g., "/Play/123")
	 * @returns An array of role strings allowed to access the path
	 */
	getAllowedRolesForRoute: (path: string): string[] => {
		// Normalise the path by matching the beginning of the route before parameter replacement
		const normalizedPath = Object.keys(ROLES_MAP).find(key =>
			path.startsWith(key.replace(/:\w+/, ''))
		);

		return normalizedPath ? ROLES_MAP[normalizedPath] : [];
	},

	/**
	 * isValidRole
	 *
	 * Checks whether a given role is one of the predefined roles.
	 *
	 * @param role - The role to validate
	 * @returns `true` if the role is valid, otherwise `false`
	 */
	isValidRole: (role: string): boolean => {
		return Object.values(ROLES).includes(role);
	}
};

export default roleService;
