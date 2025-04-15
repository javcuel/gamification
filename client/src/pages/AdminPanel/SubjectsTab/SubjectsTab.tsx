import React from 'react';
import ErrorMsg from '../../shared/ui/ErrorMsg';
import SubjectManagementItem from './components/SubjectManagementItem';
import useSubjectsTab from './hooks/useSubjectsTab';

const SubjectsTab: React.FC = () => {
  const { subjects, setSubjects, error } = useSubjectsTab();

  const handleSubjectDeleted = (subjectId: number) => {
    setSubjects((prev) => prev.filter((subject) => subject.id !== subjectId));
  };

  return (
    <div>
      {error && <ErrorMsg message={error}></ErrorMsg>}
      {subjects.map((subject) => (
        <SubjectManagementItem
          key={subject.id}
          subject={subject}
          onSubjectDeleted={handleSubjectDeleted}
        />
      ))}
    </div>
  );
};

export default SubjectsTab;
