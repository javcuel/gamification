import React from 'react';

import NavBar from '../shared/components/NavBar/NavBar';
import SubjectGrid from './components/SubjectGrid';

/**
 * The Home component renders the main page of the application.
 * It displays a space-themed background, a navigation bar at the top,
 * and a grid of subjects (via the SubjectGrid component) in the center.
 *
 * @component
 * @example
 * // Example usage:
 * <Home />
 *
 * @returns {JSX.Element} The home page, which includes the space background,
 * the navigation bar, and the subject grid.
 */
const Home: React.FC = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <NavBar webName="Gamispace" />
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <SubjectGrid />
      </div>
    </div>
  );
};

export default Home;
