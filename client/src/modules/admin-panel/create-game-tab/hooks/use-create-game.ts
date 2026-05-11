import { useState } from 'react';
import { GameCreate } from '../../../shared/api/domain/game';
import { gameRepository } from '../../../shared/api/repository/game.repository';

const useCreateGame = () => {
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState<boolean>(true);

	// El hook vuelve a recibir el modelo puro del dominio
	const createGame = async (data: GameCreate) => {
		setError(null);
		setSuccess(false);

		try {
			// Le pasamos el objeto limpio al repositorio. 
            // El repositorio se encargará de convertirlo a FormData.
			await gameRepository.create(data);
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