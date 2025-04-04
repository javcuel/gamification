import React from 'react';
import SubjectItem from '../components/SubjectItem';
import useSubjects from './hooks/useSubjects';
import ErrorMsg from '../../shared/ui/ErrorMsg';

const SubjectsTab: React.FC = () => {
  const { subjects, setSubjects, error } = useSubjects();

  const handleSubjectDeleted = (subjectId: number) => {
    setSubjects((prev) => prev.filter((subject) => subject.id !== subjectId));
  };

  return (
    <div>
      {error && <ErrorMsg message={error}></ErrorMsg>}
      {subjects.map((subject) => (
        <SubjectItem
          key={subject.id}
          subject={subject}
          onSubjectDeleted={handleSubjectDeleted}
        />
      ))}
    </div>
  );
};

export default SubjectsTab;
