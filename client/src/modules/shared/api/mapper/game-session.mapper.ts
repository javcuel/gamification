import { GameSession, GameSessionStart } from '../domain/game-session';
import { GameSessionDTO, GameSessionStartDTO } from '../dto/game-session.dto';

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

    static toStartDTO(domain: GameSessionStart): GameSessionStartDTO {
        return {
            IDSession: domain.sessionId,
            IDGame: domain.gameId,
            IDSubject: domain.subjectId
        };
    }
}