import { useEffect, useState } from 'react';
import { Game } from '../../shared/api/domain/game';
import { gameRepository } from '../../shared/api/repository/game.repository'; 

const usePlay = (gameId: number) => {
	const [game, setGame] = useState<Game>();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadGame = async (id: number) => {
			try {
				const data = await gameRepository.getById(id); 
				setGame(data);
			} catch (err: unknown) {
				setError(err instanceof Error ? err.message : 'Error loading game');
			}
		};

		if (gameId) loadGame(gameId);
	}, [gameId]);

	return { game, error };
};

export default usePlay;