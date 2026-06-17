import HttpClient from '../http-client';
import { API_URLS } from '../../../../constants/apiUrls';
import { IContentRepository } from '../interface/content-repository.interface';
import { ContentMapper } from '../mapper/content.mapper';

class ContentRepository implements IContentRepository {
	async link(subjectId: number, gameId: number): Promise<void> {
		try {
			await HttpClient.post(API_URLS.LINK_GAME_TO_SUBJECT(subjectId, gameId), {});
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

	async updateOpen(subjectId: number, gameId: number, isOpen: boolean): Promise<void> {
		const requestDTO = ContentMapper.toUpdateOpenDTO(isOpen);
		try {
			await HttpClient.put(API_URLS.UPDATE_RELATION_OPEN(subjectId, gameId), requestDTO);
		} catch (error) {
			console.error(`Error updating open state for game ${gameId} in subject ${subjectId}:`, error);
			throw new Error('Failed to update local open state');
		}
	}

	async updateVisible(subjectId: number, gameId: number, isVisible: boolean): Promise<void> {
		const requestDTO = ContentMapper.toUpdateVisibleDTO(isVisible);
		try {
			await HttpClient.put(API_URLS.UPDATE_RELATION_VISIBLE(subjectId, gameId), requestDTO);
		} catch (error) {
			console.error(`Error updating visible state for game ${gameId} in subject ${subjectId}:`, error);
			throw new Error('Failed to update local visible state');
		}
	}
}

export const contentRepository = new ContentRepository();