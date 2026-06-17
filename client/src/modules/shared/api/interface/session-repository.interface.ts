import { Session } from '../domain/session';

/**
 * Interface for the SessionRepository.
 * Defines the contract for session-related API operations.
 */
export interface ISessionRepository {
    /**
     * Creates a new session in the database.
     * @returns A promise resolving to the generated IDSession.
     */
    create(idUser: number): Promise<number>;

    /**
     * Updates the logout time for a specific session.
     * @param id - The ID of the session to close.
     */
    close(id: number): Promise<void>;

    /**
     * Retrieves all recorded sessions.
     * @returns A promise resolving to an array of Session domain objects.
     */
    getAll(): Promise<Session[]>;
}