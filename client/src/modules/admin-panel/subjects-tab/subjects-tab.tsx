import React from 'react';
import Toast from '../../shared/components/ui/toast';
import SubjectManagementItem from './components/subject-management-item';
import useSubjectsTab from './hooks/use-subjects-tab';

/**
 * SubjectsTab component
 *
 * Displays a list of subject management items, allowing admins to manage subjects
 * such as updating or deleting them. Fetches subjects from the backend and handles
 * UI feedback for errors and deletion.
 */
const SubjectsTab: React.FC = () => {
	const { subjects, setSubjects, error } = useSubjectsTab();

	/**
	 * handleSubjectDeleted
	 *
	 * Removes a subject from the local state after it has been deleted.
	 *
	 * @param subjectId - The ID of the subject to remove
	 */
	const handleSubjectDeleted = (subjectId: number) => {
		setSubjects(prev => prev.filter(subject => subject.id !== subjectId));
	};

	return (
		<div>
			{/* Display error message if loading subjects failed */}
			{error && <Toast type='error' message={error} />}

			{/* Render a SubjectManagementItem for each subject */}
			{subjects.map(subject => (
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
