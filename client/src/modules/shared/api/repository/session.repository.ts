import HttpClient from '../../../../api/http-client';
import { API_URLS } from '../../../../constants/apiUrls';
import { Session } from '../domain/session';
import { SessionCreateResponseDTO, SessionDTO } from '../dto/session.dto';
import { SessionMapper } from '../mapper/session.mapper';
import { ISessionRepository } from '../interface/session-repository.interface';

/**
 * Implementation of the ISessionRepository interface.
 * Handles API communication for session tracking.
 */
class SessionRepository implements ISessionRepository {
    /**
     * Registers a new session (Login).
     * @returns The newly created IDSession.
     */
    async create(): Promise<number> {
        try {
            // We use the Specific DTO for the create response
            const response: SessionCreateResponseDTO = await HttpClient.post(API_URLS.CREATE_SESSION, {});
            return response.IDSession;
        } catch (error) {
            console.error('Error creating session:', error);
            throw new Error('Failed to create session');
        }
    }

    /**
     * Closes an existing session (Logout).
     * @param id - The IDSession to update.
     */
    async close(id: number): Promise<void> {
        try {
            await HttpClient.put(API_URLS.CLOSE_SESSION(id), {});
        } catch (error) {
            console.error(`Error closing session (ID: ${id}):`, error);
            throw new Error('Failed to close session');
        }
    }

    /**
     * Fetches the full session history.
     * @returns Array of Domain Session objects.
     */
    async getAll(): Promise<Session[]> {
        try {
            const data: SessionDTO[] = await HttpClient.get(API_URLS.GET_SESSIONS);
            return data.map(SessionMapper.toDomain);
        } catch (error) {
            console.error('Error fetching sessions:', error);
            throw new Error('Failed to fetch sessions');
        }
    }
}

export const sessionRepository = new SessionRepository();