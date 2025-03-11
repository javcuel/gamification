/**
 * roleService
 *
 * This service handles the logic for role-based access control (RBAC) in the application.
 * It provides methods for retrieving the allowed roles for specific routes.
 * This service is responsible for centralizing role-related authorization logic,
 * making it easier to manage and extend roles in the future without modifying route definitions.
 *
 * @module roleService
 */

/**
 * This function returns the allowed roles for a given route.
 *
 * @param {string} path - The path of the route for which we want to get allowed roles.
 * @returns {string[]} An array of role identifiers (e.g., "A", "D", "P") that are allowed to access the route.
 *
 * @example
 * const rolesForAdminPanel = roleService.getAllowedRolesForRoute("/AdminPanel");
 * console.log(rolesForAdminPanel); // Output: ["A"]
 */
const roleService = {
  getAllowedRolesForRoute: (path: string) => {
    const rolesMap: { [key: string]: string[] } = {
      '/AdminPanel': ['A'],
      '/DevPanel': ['D'],
      '/GameSelector': ['D', 'P', 'U'],
      '/Home': ['D', 'P', 'U'],
      '/Ranking': ['P', 'U'],
    };
    return rolesMap[path] || [];
  },

  /**
   * This function checks if a given role is valid across all defined roles.
   *
   * @param {string} role - The role identifier to validate (e.g., "A", "D", "P").
   * @returns {boolean} True if the role is valid, false otherwise.
   *
   * @example
   * const isValid = roleService.isValidRole("A");
   * console.log(isValid); // Output: true
   */
  isValidRole: (role: string): boolean => {
    const validRoles = ['A', 'D', 'P', 'U']; // Define all valid roles here.
    return validRoles.includes(role);
  },
};

export default roleService;
