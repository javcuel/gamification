import { useEffect, useState } from 'react';
import { Subject } from '../../../shared/api/domain/subject';
import { subjectRepository } from '../../../shared/api/repository/subject.repository';
import { useAuth } from '../../../../context/auth-context';

const useSubjectsTab = () => {
	const [subjects, setSubjects] = useState<Subject[]>([]);
	const [error, setError] = useState<string | null>(null);
	const { user } = useAuth();

	const loadSubjects = async () => {
		if (!user) return;
		try {
			let data;
			if (user.role === 'T') {
				data = await subjectRepository.getByTeacher(user.id);
			} else {
				data = await subjectRepository.getAll();
			}
			setSubjects(data);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('An unknown error occurred');
			}
		}
	};

	useEffect(() => {
		loadSubjects();
	}, [user]);

	return { subjects, setSubjects, error, reloadSubjects: loadSubjects };
};

export default useSubjectsTab;