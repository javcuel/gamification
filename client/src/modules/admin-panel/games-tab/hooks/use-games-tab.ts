import { useEffect, useState } from 'react';
import { Game } from '../../../shared/api/domain/game'; 
import { gameRepository } from '../../../shared/api/repository/game.repository'; 

const useGamesTab = () => {
	const [games, setGames] = useState<Game[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadGames = async () => {
			try {
				const data = await gameRepository.getAll();
				setGames(data);
			} catch (error: unknown) {
				setError(error instanceof Error ? error.message : 'An unknown error occurred');
			}
		};
		loadGames();
	}, []);

	return { games, setGames,error };
};

export default useGamesTab;