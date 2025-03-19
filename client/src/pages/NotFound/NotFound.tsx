import React from 'react';

import SpaceBackground from '../shared/ui/SpaceBackground';
import FloatingText from '../shared/ui/FloatingText';
import WavesText from '../shared/ui/WavesText';

/**
 * The NotFound component renders a page indicating that the requested resource
 * could not be found. It displays a "Not-Found" wave-effect text, a floating
 * "This page doesn't exist" message, and a space-themed background.
 *
 * @component
 * @example
 * // Example usage:
 * <NotFound />
 *
 * @returns {JSX.Element} A 404 error page with space background, wave-effect text, and a floating message.
 */
const NotFound: React.FC = () => {
  return (
    <div className="container min-vh-100 custom-flex-center text-center">
      <SpaceBackground />
      <div className="container">
        <div className="row">
          <WavesText text="Not-Found" />
        </div>
        <div className="row">
          <FloatingText text="This page doesn't exist" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
