import React from 'react';

import WavesText from '../shared/components/ui/waves-text';

/**
 * The NotFound component renders a page indicating that the requested resource
 * could not be found. It displays a "Not-Found This page doesn't exists" message, and a space-themed background.
 *
 * @component
 *
 * @returns {JSX.Element} A 404 error page.
 */
const NotFound: React.FC = () => {
  return (
    <div className="container min-vh-100 custom-flex-center text-center">
      <div className="container">
        <div className="row">
          <WavesText text="404 - Not Found" />
        </div>
        <div className="row">
          <WavesText text="This page doesn't exist" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
