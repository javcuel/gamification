import React from 'react';

import '../styles/space-background.css';

/**
 * A component that renders a space-themed background with stars and a moving effect.
 * It uses CSS classes to create a dynamic background with stars that appear to move,
 * giving the illusion of a moving universe.
 *
 * @component
 * @example
 * // Example usage:
 * <SpaceBackground />
 *
 * @returns {JSX.Element} A `div` element representing the space background with stars.
 */
const SpaceBackground: React.FC = () => {
  return (
    <div className="universe-background">
      <div className="background"></div>
      <div className="stars"></div>
      <div className="fast-stars"></div>
    </div>
  );
};

export default SpaceBackground;
