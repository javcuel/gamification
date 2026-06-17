import { GameSessionStart } from '../domain/game-session';

export interface IGameSessionRepository {
    start(sessionData: GameSessionStart): Promise<number>;
    end(gameSessionId: number): Promise<void>;
}