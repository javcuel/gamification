import { useEffect, useState } from 'react';
import { Game } from '../../../shared/api/domain/game'; 
import { gameRepository } from '../../../shared/api/repository/game.repository'; 

const useGamesTab = () => {
	const [games, setGames] = useState<Game[]>([]);
	const [error, setError] = useState<string | null>(null);

	// 1. Sacamos la función FUERA del useEffect
	const loadGames = async () => {
		try {
			const data = await gameRepository.getAll();
			setGames(data);
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : 'An unknown error occurred');
		}
	};

	// 2. El useEffect ahora solo la llama
	useEffect(() => {
		loadGames();
	}, []);

	// 3. Ahora el return sí encuentra loadGames
	return { games, setGames, error, reloadGames: loadGames };
};

export default useGamesTab;