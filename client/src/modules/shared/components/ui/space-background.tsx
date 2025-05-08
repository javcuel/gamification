import React from 'react';
import '../../styles/space-background.css';

/**
 * SpaceBackground is a component that renders an animated space-themed background.
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
