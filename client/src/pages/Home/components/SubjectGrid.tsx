import React from 'react';
import useSubjectInfo from '../hooks/useSubjectInfo';
import SubjectItem from './SubjectItem';

const SubjectGrid: React.FC = () => {
  const { subjects, error } = useSubjectInfo();

  /*TODO: EL FILTER DE SUBKECT EN BASE A SI ES VISIBLE O NO IGUAL NOS LO PODRIAMOS AHORRAR
  SI HACEMOS QUE EL ENDPOINT DEVUELVA DIRECTAMENTE SOLO LAS ASIGNATURAS QUE SEAN VISIBLES??*/

  return (
    <div className="container  ">
      <div className="row">
        {error && <div className="alert custom-alert">{error}</div>}
      </div>

      <div className="row  custom-flex-center text-center">
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
