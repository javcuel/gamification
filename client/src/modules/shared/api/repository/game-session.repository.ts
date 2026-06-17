import HttpClient from '../http-client';
import { API_URLS } from '../../../../constants/apiUrls';
import { GameSessionCreateResponseDTO } from '../dto/game-session.dto';
import { IGameSessionRepository } from '../interface/game-session-repository.interface';
import { GameSessionStart } from '../domain/game-session';
import { GameSessionMapper } from '../mapper/game-session.mapper';

class GameSessionRepository implements IGameSessionRepository {
    async start(sessionData: GameSessionStart): Promise<number> {
        const requestDTO = GameSessionMapper.toStartDTO(sessionData);
        try {
            const response: GameSessionCreateResponseDTO = await HttpClient.post(
                API_URLS.CREATE_GAME_SESSION, 
                requestDTO
            );
            return response.IDGameSession;
        } catch (error) {
            console.error('Error starting game session:', error);
            throw new Error('Failed to start game session');
        }
    }

    async end(gameSessionId: number): Promise<void> {
        try {
            await HttpClient.put(API_URLS.CLOSE_GAME_SESSION(gameSessionId), {});
        } catch (error) {
            console.error('Error ending game session:', error);
            throw new Error('Failed to end game session');
        }
    }
}

export const gameSessionRepository = new GameSessionRepository();