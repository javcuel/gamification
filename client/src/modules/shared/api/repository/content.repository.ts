import HttpClient from '../../../../api/http-client';
import { API_URLS } from '../../../../constants/apiUrls';

/**
 * Implementation of the Content Repository.
 * Handles the many-to-many relationship between Subjects (subjects) and Games (games).
 */
class ContentRepository {
    async link(subjectId: number, gameId: number): Promise<void> {
         try {
            await HttpClient.post(API_URLS.LINK_GAME_TO_SUBJECT, { subjectId, gameId });
        } catch (error) {
            console.error(`Error linking game ${gameId} to subject ${subjectId}:`, error);
            throw new Error('Failed to link game to subject');
        }
    }

    async unlink(subjectId: number, gameId: number): Promise<void> {
        try {
            await HttpClient.delete(API_URLS.UNLINK_GAME_FROM_SUBJECT(subjectId, gameId));
        } catch (error) {
            console.error(`Error unlinking game ${gameId} from subject ${subjectId}:`, error);
            throw new Error('Failed to unlink game from subject');
        }
    }

    // NUEVO: Modificar estado Abierto (Candado Local del Profesor)
    async updateOpen(subjectId: number, gameId: number, isOpen: boolean): Promise<void> {
        try {
            await HttpClient.put(`/content/${subjectId}/${gameId}/open`, { Abierto: isOpen });
        } catch (error) {
            console.error(`Error updating open state for game ${gameId} in subject ${subjectId}:`, error);
            throw new Error('Failed to update local open state');
        }
    }

    // NUEVO: Modificar estado Visible (Candado Local del Profesor)
    async updateVisible(subjectId: number, gameId: number, isVisible: boolean): Promise<void> {
        try {
            await HttpClient.put(`/content/${subjectId}/${gameId}/visible`, { Visible: isVisible });
        } catch (error) {
            console.error(`Error updating visible state for game ${gameId} in subject ${subjectId}:`, error);
            throw new Error('Failed to update local visible state');
        }
    }
}

export const contentRepository = new ContentRepository();