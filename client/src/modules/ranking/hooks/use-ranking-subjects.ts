import { useEffect, useState } from 'react';
import { Subject } from '../../shared/api/domain/subject';
import { subjectRepository } from '../../shared/api/repository/subject.repository';
// IMPORTANTE: Asegúrate de que la ruta de importación coincida con donde tienes tu auth-context
import { useAuth } from '../../../context/auth-context'; 

const useRankingSubjects = () => {
	const [subjects, setSubjects] = useState<Subject[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
    
    // Obtenemos el usuario logueado desde tu AuthContext
    const { user } = useAuth();

	useEffect(() => {
		const loadSubjects = async () => {
            // Si por algún motivo aún no hay usuario cargado en el contexto, esperamos
            if (!user) return;

			setLoading(true);
			try {
                let fetchedSubjects;

                // Verificamos si es un Player ('P') o un Teacher 'T'
                if (user.role === 'P' || user.role === 'T') {
                    // Si es player, pedimos solo sus asignaturas pasándole su ID
                    fetchedSubjects = await subjectRepository.getByUser(user.id);
                } else {
                    // Si es cualquier otro rol (Admin, Teacher, Dev...), pedimos todas
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
	}, [user]); // Añadimos 'user' a las dependencias para que se ejecute cuando cargue la sesión

	return { subjects, error, loading };
};

export default useRankingSubjects;