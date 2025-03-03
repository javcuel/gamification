import { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../components/Routes/ProtectedRoute';
import AdminPanel from '../pages/AdminPanel/AdminPanel';
import DevPanel from '../pages/DevPanel/DevPanel';
import GameSelector from '../pages/GameSelector/GameSelector';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';
import Ranking from '../pages/Ranking/Ranking';
import roleService from '../services/roleService';

/**
 * Route Configuration
 * @description Defines the routing structure for the application.
 * Each route specifies the path and the component to render.
 * Some routes are protected by role-based access or require authentication.
 *
 * @type {RouteObject[]}
 * @property {string} path - The path for the route.
 * @property {JSX.Element} element - The component or route guard to render.
 * @property {RoleBasedRoute} RoleBasedRoute - Guards routes based on user roles.
 * @property {PrivateRoute} PrivateRoute - Guards routes requiring authentication.
 *
 * Role Definitions:
 * - A: Admin
 * - D: Developer
 * - P: Test Player
 * - U: Normal User
 *
 */
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Login />,
    /**
     * Default route
     * Accesible to all useres
     */
  },
  {
    path: '/Home',
    element: (
      /* <ProtectedRoute
        allowedRoles={roleService.getAllowedRolesForRoute("/Home")}
      > */
      <Home />
      /*  </ProtectedRoute> */
    ),
    /**
     * Home Route
     * @protected
     * Requires authentication via `PrivateRoute`.
     * Accessible to authenticated users of all roles.
     */
  },
  {
    path: '/Ranking',
    element: (
      /* <ProtectedRoute
        allowedRoles={roleService.getAllowedRolesForRoute('/Ranking')}
      > */
      <Ranking />
      /* </ProtectedRoute> */
    ),
    /**
     * Ranking Route
     * @protected
     * Requires authentication via `PrivateRoute`.
     * Accessible to authenticated users of all roles.
     */
  },
  {
    path: '/GameSelector',
    element: (
      /* <ProtectedRoute
        allowedRoles={roleService.getAllowedRolesForRoute('/GameSelector')}
      > */
      <GameSelector />
      /*  </ProtectedRoute> */
    ),
    /**
     * GameSelector Route
     * @protected
     * Role-based access control via `RoleBasedRoute`.
     * Allowed Roles: "Developer" (D), "Player" (P), "User" (U).
     */
  },
  {
    path: '/AdminPanel',
    element: (
      <ProtectedRoute
        allowedRoles={roleService.getAllowedRolesForRoute('/AdminPanel')}
      >
        <AdminPanel />
      </ProtectedRoute>
    ),
    /**
     * AdminPanel Route
     * @protected
     * Role-based access control via `RoleBasedRoute`.
     * Allowed Role: "Admin" (A).
     */
  },
  {
    path: '/DevPanel',
    element: (
      <ProtectedRoute
        allowedRoles={roleService.getAllowedRolesForRoute('/DevPanel')}
      >
        <DevPanel />
      </ProtectedRoute>
    ),
    /**
     * DevPanel Route
     * @protected
     * Role-based access control via `RoleBasedRoute`.
     * Allowed Role: "Developer" (D).
     */
  },
  {
    path: '*',
    element: <NotFound />,
    // Matches all undefined routes
  },
];

export default routes;
