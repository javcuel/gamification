import { useState } from 'react';
import { GameCreate } from '../../../shared/api/domain/game';
import { gameRepository } from '../../../shared/api/repository/game.repository';

/**
 * useCreateGame hook
 *
 * Handles the creation of a new game through the repository.
 * - Manages request state: loading, success, and error.
 * - Exposes a function to initiate the creation process.
 *
 * @returns An object containing:
 * - `createGame`: Function to create a new game with provided data
 * - `error`: Error message if creation fails
 * - `success`: Boolean flag indicating if creation succeeded
 * - `loading`: Boolean flag for the request state
 */
const useCreateGame = () => {
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState<boolean>(true);

	/**
	 * createGame
	 *
	 * Asynchronously creates a new game by calling the repository method.
	 * Updates success or error state based on the response.
	 *
	 * @param data - The game data to be sent for creation
	 */
	const createGame = async (data: GameCreate) => {
	setError(null);
	setSuccess(false);

	try {
		// 1. Instanciamos un nuevo objeto FormData
		const formData = new FormData();
		
		// 2. Añadimos las propiedades de GameCreate al FormData
		formData.append('name', data.name);
		formData.append('img', data.img);

		// 3. Pasamos el formData al repositorio en lugar de "data"
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
