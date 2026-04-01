import { Session } from '../domain/session';
import { SessionDTO } from '../dto/session.dto'; 

export class SessionMapper {
    /**
     * Maps the API DTO to the Session Domain Class
     */
    static toDomain(dto: SessionDTO): Session { 
        return new Session(
            dto.IDSession,
            new Date(dto.LoginTime),
            dto.LogoutTime ? new Date(dto.LogoutTime) : undefined
        );
    }
}