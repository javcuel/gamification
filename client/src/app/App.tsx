import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from './Routes';

/**
 * AppRoutes Component
 * @component
 * @description Handles the routing logic for the application.
 * It uses `useRoutes` from React Router to dynamically render routes based on the configuration.
 * @returns {React.ReactElement | null} The routing element to be rendered.
 */
const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

/**
 * App Component
 * @component
 * @description Serves as the root component of the application.
 * It wraps the entire application with `BrowserRouter` to enable routing functionality.
 * @returns {JSX.Element} The root component including all routes.
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
