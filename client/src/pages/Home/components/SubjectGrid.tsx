import React from 'react';

import ErrorMsg from '../../shared/ui/ErrorMsg';
import LoadingMsg from '../../shared/ui/LoadingMsg';
import useSubject from '../hooks/useSubject';
import SubjectItem from './SubjectItem';

/**
 * The SubjectGrid component renders a grid of subjects by using the `SubjectItem` component
 * for each visible subject. It retrieves the list of subjects through the custom hook `useSubject`,
 * and handles any errors by displaying an alert message if an error occurs.
 *
 * @component
 * @example
 * // Example usage:
 * <SubjectGrid />
 *
 * @returns {JSX.Element} A grid of subjects with visible subjects displayed as individual
 * `SubjectItem` components. If an error occurs, an alert message is shown.
 */
const SubjectGrid: React.FC = () => {
  const { subjects, error, loading } = useSubject();

  return (
    <div className="container">
      {loading ? (
        <div className="row custom-flex-center text-center">
          <LoadingMsg message="Loading Subjects..." />
        </div>
      ) : (
        <div className="row custom-flex-center text-center">
          {error && <ErrorMsg message={error} />}

          {subjects
            .filter((subject) => subject.isVisible)
            .map((subject, index) => (
              <div className="col-auto" key={index}>
                <SubjectItem subject={subject} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SubjectGrid;
