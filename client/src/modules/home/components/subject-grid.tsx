import React from 'react';

import ErrorMsg from '../../shared/components/ui/error-msg';
import LoadingMsg from '../../shared/components/ui/loading-msg';
import useSubject from '../hooks/use-home';
import SubjectItem from './subject-item';

/**
 * The SubjectGrid component renders a grid of subjects by using the `SubjectItem` component
 * for each visible subject.
 *
 * @component
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
