import React from 'react';
import SubjectItem from '../components/SubjectItem';
import useSubjects from './hooks/useSubjects';

const AdminSubjectGamesTab: React.FC = () => {
  const { subjects, setSubjects, error } = useSubjects();

  const handleSubjectDeleted = (worldId: number) => {
    setSubjects((prev) => prev.filter((world) => world.id !== worldId));
  };

  return (
    <div>
      {error && <div className="text-danger">{error}</div>}
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

export default AdminSubjectGamesTab;
