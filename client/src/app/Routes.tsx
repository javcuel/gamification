import React from 'react';
import { RouteObject } from 'react-router-dom';

import { ROUTES } from '../constants/routes';
import AdminPanel from '../pages/AdminPanel/AdminPanel';
import DevPanel from '../pages/DevPanel/DevPanel';
import GameSelector from '../pages/GameSelector/GameSelector';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';
import Ranking from '../pages/Ranking/Ranking';
import roleService from '../services/roleService';
import ProtectedRoute from './ProtectedRoute';

void React;

const routes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <Login />,
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
        <GameSelector />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.ADMIN_PANEL,
    element: (
      <ProtectedRoute
        allowedRoles={roleService.getAllowedRolesForRoute(ROUTES.ADMIN_PANEL)}
      >
        <AdminPanel />
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
