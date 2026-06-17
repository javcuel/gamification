import { useEffect, useState } from 'react';

import { Subject } from '../../shared/api/domain/subject';
import { subjectRepository } from '../../shared/api/repository/subject.repository';
import { useAuth } from '../../../context/auth-context'; 


const useSubject = () => {
	const [subjects, setSubjects] = useState<Subject[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	
	const { user } = useAuth();

	useEffect(() => {
		const loadSubjects = async () => {
			if (!user) return;

			setLoading(true);
			try {
				let data;
				if (user.role === 'P' || user.role === 'T') {
					data = await subjectRepository.getByUser(user.id);
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
			} finally {
				setLoading(false);
			}
		};

		loadSubjects();
	}, [user]);

	return { subjects, error, loading };
};

export default useSubject;