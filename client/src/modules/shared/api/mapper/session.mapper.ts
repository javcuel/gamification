import { Session } from '../domain/session';
import { SessionDTO } from '../dto/session.dto'; 

export class SessionMapper {
    static toDomain(dto: SessionDTO): Session { 
        return new Session(
            dto.IDSession,
            dto.IDUser,           // <--- AÑADIDO (mapea de IDUser a idUser)
            new Date(dto.LoginTime),
            dto.LogoutTime ? new Date(dto.LogoutTime) : undefined
        );
    }
}