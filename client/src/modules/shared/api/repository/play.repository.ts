// client/src/modules/shared/api/repository/play.repository.ts
import HttpClient from '../../../../api/http-client';
import { API_URLS } from '../../../../constants/apiUrls';

class PlayRepository {
	async getProgress(gameId: number) {
		try {
            // USAR LA CONSTANTE
			return await HttpClient.get(API_URLS.GET_GAME_PROGRESS(gameId));
		} catch (error) {
			console.error(`Error obteniendo progreso del juego ${gameId}:`, error);
			throw new Error('No se pudo obtener el progreso');
		}
	}

	async savePlay(gameSessionId: number, payload: { level: number; score: number; time: number; completed: boolean }) {
		try {
            // USAR LA CONSTANTE
			const response = await HttpClient.post(API_URLS.SAVE_PLAY(gameSessionId), payload);
			return response;
		} catch (error) {
			console.error('Error guardando la partida:', error);
			throw new Error('No se pudo guardar la partida');
		}
	}
}

export const playRepository = new PlayRepository();