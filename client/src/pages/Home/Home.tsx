import React from 'react';

import NavBar from '../shared/NavBar/NavBar';
import SpaceBackground from '../shared/ui/SpaceBackground';
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
    <div className="container-fluid" style={{ height: '100vh' }}>
      <SpaceBackground />
      <div
        className="container-fluid d-flex flex-column"
        style={{ height: '100vh' }}
      >
        <div style={{ height: '5vh' }}>
          <NavBar webName="Gamispace" />
        </div>
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <SubjectGrid />
        </div>
      </div>
    </div>
  );
};

export default Home;
