import { useEffect, useState } from 'react';
import { Subject } from '../../shared/api/domain/subject';
import { subjectRepository } from '../../shared/api/repository/subject.repository';

/**
 * useRankingSubjects hook
 *
 * Custom hook to fetch all available subjects for use in the ranking dropdown.
 */
const useRankingSubjects = () => {
	const [subjects, setSubjects] = useState<Subject[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const loadSubjects = async () => {
			try {
                // Suponiendo que tu repositorio tiene este método (casi seguro que sí)
				const fetchedSubjects = await subjectRepository.getAll();
				setSubjects(fetchedSubjects);
			} catch (err) {
				if (err instanceof Error) setError(err.message);
				else setError('An unknown error occurred');
			} finally {
				setLoading(false);
			}
		};

		loadSubjects();
	}, []);

	return { subjects, error, loading };
};

export default useRankingSubjects;