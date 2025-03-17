import React from 'react';
import { RouteObject } from 'react-router-dom';

import ProtectedRoute from '../components/Routes/ProtectedRoute';
import { ROUTES } from '../constants/routes';
import AdminPanel from '../pages/AdminPanel/AdminPanel';
import DevPanel from '../pages/DevPanel/DevPanel';
import GameSelector from '../pages/GameSelector/GameSelector';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';
import Ranking from '../pages/Ranking/Ranking';
import roleService from '../services/roleService';

void React;

//TODO: Separar los imports de librerias externas de los de arch¡ivos internos
// Como se hace arriba
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
        allowedRoles={roleService.getAllowedRolesForRoute('/GameSelector')}
      >
        <GameSelector />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.PLAY(':gameId'),
    element: (
      <ProtectedRoute
        allowedRoles={roleService.getAllowedRolesForRoute('/Play')}
      >
        <GameSelector />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.ADMIN_PANEL,
    element: (
      <ProtectedRoute
        allowedRoles={roleService.getAllowedRolesForRoute('/AdminPanel')}
      >
        <AdminPanel />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.DEV_PANEL,
    element: (
      <ProtectedRoute
        allowedRoles={roleService.getAllowedRolesForRoute('/DevPanel')}
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
