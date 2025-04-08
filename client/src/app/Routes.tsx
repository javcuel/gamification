import React from 'react';
import { RouteObject } from 'react-router-dom';

import { ROUTES } from '../constants/routes';
import AdminPrueba from '../pages/AdminPanel/AdminPrueba';
import DevPanel from '../pages/DevPanel/DevPanel';
import GameSelector from '../pages/GameSelector/GameSelector';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';
import Play from '../pages/Play/Play';
import Ranking from '../pages/Ranking/Ranking';
import roleService from '../services/roleService';
import ProtectedRoute from './ProtectedRoute';

void React;

/**
 * Array of route configurations for the application.
 * This defines the paths, associated components, and any necessary
 * authorization through the ProtectedRoute component.
 * The routes are protected based on the roles retrieved from `roleService`.
 *
 * @constant
 * @type {RouteObject[]}
 *
 * @example
 * // Example usage:
 * // A route that allows access to Home page only for users with allowed roles.
 * {
 *   path: ROUTES.HOME,
 *   element: (
 *     <ProtectedRoute allowedRoles={roleService.getAllowedRolesForRoute(ROUTES.HOME)}>
 *       <Home />
 *     </ProtectedRoute>
 *   ),
 * }
 */
const routes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <AdminPrueba />,
  },
  {
    path: ROUTES.HOME,
    element: (
      <ProtectedRoute
        allowedRoles={roleService.getAllowedRolesForRoute(ROUTES.HOME)}
      >
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.RANKING,
    element: (
      <ProtectedRoute
        allowedRoles={roleService.getAllowedRolesForRoute(ROUTES.RANKING)}
      >
        <Ranking />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.GAME_SELECTOR(':subjectId'),
    element: (
      <ProtectedRoute
        allowedRoles={roleService.getAllowedRolesForRoute(
          ROUTES.GAME_SELECTOR(':subjectId')
        )}
      >
        <GameSelector />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.PLAY(':gameId'),
    element: (
      <ProtectedRoute
        allowedRoles={roleService.getAllowedRolesForRoute(
          ROUTES.PLAY(':gameId')
        )}
      >
        <Play />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.ADMIN_PANEL,
    element: (
      <ProtectedRoute
        allowedRoles={roleService.getAllowedRolesForRoute(ROUTES.ADMIN_PANEL)}
      >
        <AdminPrueba />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.DEV_PANEL,
    element: (
      <ProtectedRoute
        allowedRoles={roleService.getAllowedRolesForRoute(ROUTES.DEV_PANEL)}
      >
        <DevPanel />
      </ProtectedRoute>
    ),
  },
  {
    // Matches all undefined routes
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
