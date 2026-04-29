import { useState } from 'react';
import { gameRepository } from '../../../shared/api/repository/game.repository';

const useCreateGame = () => {
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState<boolean>(true);

    // Cambiamos GameCreate por FormData
	const createGame = async (formData: FormData) => {
		setError(null);
		setSuccess(false);

		try {
            // Usaremos una nueva función en el repositorio
			await gameRepository.create(formData);
			setSuccess(true);
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

	return { createGame, error, success, loading };
};

export default useCreateGame;