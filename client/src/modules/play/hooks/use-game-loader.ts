// client/src/modules/play/hooks/use-play.ts
import { useEffect, useState } from 'react';
import { Game } from '../../shared/api/domain/game';
import { gameRepository } from '../../shared/api/repository/game.repository'; // Importar el repo real

const usePlay = (gameId: number) => {
	const [game, setGame] = useState<Game>();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadGame = async (id: number) => {
			try {
				// 1. Llamada real al repositorio para obtener los datos del juego
				const data = await gameRepository.getById(id); 
				setGame(data);
			} catch (err: unknown) {
				setError(err instanceof Error ? err.message : 'Error al cargar el juego');
			}
		};

		if (gameId) loadGame(gameId);
	}, [gameId]);

	return { game, error };
};

export default usePlay;