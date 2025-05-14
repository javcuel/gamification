import React from 'react';
import Toast from '../../shared/components/ui/toast';
import SubjectManagementItem from './components/subject-management-item';
import useSubjectsTab from './hooks/use-subjects-tab';

const SubjectsTab: React.FC = () => {
  const { subjects, setSubjects, error } = useSubjectsTab();

  const handleSubjectDeleted = (subjectId: number) => {
    setSubjects((prev) => prev.filter((subject) => subject.id !== subjectId));
  };

  return (
    <div>
      {error && <Toast type="error" message={error}></Toast>}
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
