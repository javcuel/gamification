import { useEffect, useState } from 'react';
import { Subject } from '../../../shared/api/domain/subject';
import { subjectRepository } from '../../../shared/api/repository/subject.repository';

/**
 * useSubjectsTab hook
 *
 * Fetches the list of all subjects from the repository when the component mounts.
 * - Handles loading and error state.
 * - Provides both the list and setter for external updates if needed.
 *
 * @returns An object containing:
 * - `subjects`: Array of fetched subjects
 * - `setSubjects`: Setter for the subjects array
 * - `error`: Error message if fetching fails
 */
const useSubjectsTab = () => {
	const [subjects, setSubjects] = useState<Subject[]>([]);
	const [error, setError] = useState<string | null>(null);

	/**
	 * Fetch subjects on component mount and update local state.
	 */
	useEffect(() => {
		const loadSubjects = async () => {
			try {
				const data = await subjectRepository.getAll();
				setSubjects(data);
			} catch (error: unknown) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError('An unknown error occurred');
				}
			}
		};

		loadSubjects();
	}, []);

	return { subjects, setSubjects, error };
};

export default useSubjectsTab;
