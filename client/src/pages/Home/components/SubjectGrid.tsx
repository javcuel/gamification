import React from 'react';
import useSubject from '../hooks/useSubject';
import SubjectItem from './SubjectItem';

const SubjectGrid: React.FC = () => {
  const { subjects, error } = useSubject();

  return (
    <div className="container">
      <div className="row">
        {error && <div className="alert custom-alert">{error}</div>}
      </div>

      <div className="row custom-flex-center text-center">
        {subjects
          .filter((subject) => subject.isVisible)
          .map((subject, index) => (
            <div className="col-auto" key={index}>
              <SubjectItem subject={subject} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SubjectGrid;
