import HttpClient from '../../../../api/http-client';
import { API_URLS } from '../../../../constants/apiUrls';
import { GameSessionCreateResponseDTO } from '../dto/game-session.dto';

class GameSessionRepository {
    /**
     * Registra el inicio de un juego.
     * @param idSession - ID de la sesión de login activa.
     * @param idGame - ID del juego que se va a jugar.
     * @param idSubject - ID de la asignatura desde donde se accede.
     */
    async start(idSession: number, idGame: number, idSubject: number): Promise<number> {
        try {
            const response: GameSessionCreateResponseDTO = await HttpClient.post(
                '/game-sessions', 
                // Añadimos IDSubject al payload
                { IDSession: idSession, IDGame: idGame, IDSubject: idSubject }
            );
            return response.IDGameSession;
        } catch (error) {
            console.error('Error starting game session:', error);
            throw new Error('Failed to start game session');
        }
    }

    /**
     * Finaliza la sesión de juego actual.
     * @param idGameSession - ID de la sesión de juego a cerrar.
     */
    async end(idGameSession: number): Promise<void> {
        try {
            await HttpClient.put(`/game-sessions/${idGameSession}`, {});
        } catch (error) {
            console.error('Error ending game session:', error);
        }
    }
}

export const gameSessionRepository = new GameSessionRepository();