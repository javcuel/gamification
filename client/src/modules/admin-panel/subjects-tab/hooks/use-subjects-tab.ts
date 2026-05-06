import { useEffect, useState } from 'react';
import { Subject } from '../../../shared/api/domain/subject';
import { subjectRepository } from '../../../shared/api/repository/subject.repository';
import { useAuth } from '../../../../context/auth-context';

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

    // OBTENEMOS EL USUARIO
    const { user } = useAuth();

	useEffect(() => {
		const loadSubjects = async () => {
            // Prevenimos la llamada si el contexto aún no ha cargado al usuario
            if (!user) return;

			try {
                let data;
                
                // LÓGICA DE RAMIFICACIÓN
                if (user.role === 'T') {
                    // Ahora usamos el endpoint específico de gestión para profesores
                    data = await subjectRepository.getByTeacher(user.id);
                } else {
                    // Si es ADMIN o DEV, carga absolutamente todo el catálogo
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

		loadSubjects();
	}, [user]); // Añadimos 'user' a las dependencias

	return { subjects, setSubjects, error };
};

export default useSubjectsTab;