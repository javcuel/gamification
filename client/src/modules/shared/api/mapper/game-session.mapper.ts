import { GameSession } from '../domain/game-session';
import { GameSessionDTO } from '../dto/game-session.dto';

export class GameSessionMapper {
    static toDomain(dto: GameSessionDTO): GameSession {
        return new GameSession(
            dto.IDGameSession,
            dto.IDSession,
            dto.IDGame,
            new Date(dto.GameStartTime),
            dto.GameEndTime ? new Date(dto.GameEndTime) : undefined
        );
    }
}