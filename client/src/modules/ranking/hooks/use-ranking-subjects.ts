import { useEffect, useState } from 'react';
import { Subject } from '../../shared/api/domain/subject';
import { subjectRepository } from '../../shared/api/repository/subject.repository';
import { useAuth } from '../../../context/auth-context'; 

const useRankingSubjects = () => {
	const [subjects, setSubjects] = useState<Subject[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
    
    // We get the logged-in user from AuthContext
    const { user } = useAuth();

	useEffect(() => {
		const loadSubjects = async () => {
            if (!user) return;

			setLoading(true);
			try {
                let fetchedSubjects;

                if (user.role === 'P' || user.role === 'T') {
                    fetchedSubjects = await subjectRepository.getByUser(user.id);
                } else {
                    fetchedSubjects = await subjectRepository.getAll();
                }

				setSubjects(fetchedSubjects);
			} catch (err) {
				if (err instanceof Error) setError(err.message);
				else setError('An unknown error occurred');
			} finally {
				setLoading(false);
			}
		};

		loadSubjects();
	}, [user]); 

	return { subjects, error, loading };
};

export default useRankingSubjects;