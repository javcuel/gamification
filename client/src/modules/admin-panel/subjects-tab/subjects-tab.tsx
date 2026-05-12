import React from 'react';
import Toast from '../../shared/components/ui/toast';
import SubjectManagementItem from './components/subject-management-item';
import useSubjectsTab from './hooks/use-subjects-tab';

const SubjectsTab: React.FC = () => {
	// Extraemos reloadSubjects
	const { subjects, setSubjects, error, reloadSubjects } = useSubjectsTab();

	const handleSubjectDeleted = (subjectId: number) => {
		setSubjects(prev => prev.filter(subject => subject.id !== subjectId));
	};

	return (
		<div>
			{error && <Toast type='error' message={error} />}
			{subjects.map(subject => (
				<SubjectManagementItem
					key={subject.id}
					subject={subject}
					onSubjectDeleted={handleSubjectDeleted}
					onSubjectUpdated={reloadSubjects} // <-- NUEVO: Le pasamos la recarga
				/>
			))}
		</div>
	);
};
export default SubjectsTab;
