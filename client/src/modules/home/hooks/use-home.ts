import { useEffect, useState } from 'react';

import { Subject } from '../../shared/api/domain/subject';
import { subjectRepository } from '../../shared/api/repository/subject.repository';
// IMPORTANTE: Asegúrate de que esta ruta coincida con la ubicación de tu auth-context
import { useAuth } from '../../../context/auth-context'; 


const useSubject = () => {
	const [subjects, setSubjects] = useState<Subject[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	
	// Extraemos el usuario del contexto
	const { user } = useAuth();

	useEffect(() => {
		const loadSubjects = async () => {
			// Si no hay usuario cargado en el contexto aún, esperamos
			if (!user) return;

			setLoading(true);
			try {
				let data;
				// Verificamos si es Player ('P') o Teacher ('T')
				if (user.role === 'P' || user.role === 'T') {
					data = await subjectRepository.getByUser(user.id);
				} else {
					// Admin ('A') o Dev ('D') ven todas
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
	}, [user]); // Añadimos 'user' como dependencia

	return { subjects, error, loading };
};

export default useSubject;