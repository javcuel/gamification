import { ROLES } from '../constants/roles';
import { ROUTES } from '../constants/routes';

// Allowed roles for each route
const ROLES_MAP: Record<string, string[]> = {
  [ROUTES.HOME]: [
    ROLES.PLAYER,
    ROLES.TEACHER,
    ROLES.GUEST,
    ROLES.DEV,
    ROLES.ADMIN,
  ],

  [ROUTES.RANKING]: [
    ROLES.PLAYER,
    ROLES.TEACHER,
    ROLES.GUEST,
    ROLES.DEV,
    ROLES.ADMIN,
  ],

  [ROUTES.GAME_SELECTOR(':subjectId')]: [
    ROLES.PLAYER,
    ROLES.TEACHER,
    ROLES.GUEST,
    ROLES.DEV,
    ROLES.ADMIN,
  ],

  [ROUTES.PLAY(':gameId')]: [
    ROLES.PLAYER,
    ROLES.TEACHER,
    ROLES.GUEST,
    ROLES.DEV,
    ROLES.ADMIN,
  ],

  [ROUTES.DEV_PANEL]: [ROLES.DEV],

  [ROUTES.ADMIN_PANEL]: [ROLES.ADMIN],
};

const roleService = {
  getAllowedRolesForRoute: (path: string): string[] => {
    // Normalize dynamic routes
    const normalizedPath = Object.keys(ROLES_MAP).find((key) =>
      path.startsWith(key.replace(/:\w+/, ''))
    );

    return normalizedPath ? ROLES_MAP[normalizedPath] : [];
  },

  isValidRole: (role: string): boolean => {
    return Object.values(ROLES).includes(role);
  },
};

export default roleService;
