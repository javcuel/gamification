import HttpClient from '../../../../api/http-client';
import { API_URLS } from '../../../../constants/apiUrls';
import { Game } from '../domain/game'; // Asegúrate de importar tu interfaz de Game

/**
 * Implementation of the Content Repository.
 * Handles the many-to-many relationship between Subjects (subjects) and Games (games).
 */
class ContentRepository {
    /**
     * Links a game to a subject by creating an entry in the 'content' table.
     * @param subjectId - The ID of the subject (IDSubject).
     * @param gameId - The ID of the game (IDGame).
     */
    async link(subjectId: number, gameId: number): Promise<void> {
         try {
            await HttpClient.post(API_URLS.LINK_GAME_TO_SUBJECT, {
                subjectId,
                gameId
            });
        } catch (error) {
            console.error(`Error linking game ${gameId} to subject ${subjectId}:`, error);
            throw new Error('Failed to link game to subject');
        }
    }

    /**
     * Unlinks a game from a subject by removing the entry from the 'content' table.
     * @param subjectId - The ID of the subject.
     * @param gameId - The ID of the game.
     */
    async unlink(subjectId: number, gameId: number): Promise<void> {
        try {
            await HttpClient.delete(API_URLS.UNLINK_GAME_FROM_SUBJECT(subjectId, gameId));
        } catch (error) {
            console.error(`Error unlinking game ${gameId} from subject ${subjectId}:`, error);
            throw new Error('Failed to unlink game from subject');
        }
    }
}

// Exporting a singleton instance for consistency with user, game, and subject repositories.
export const contentRepository = new ContentRepository();