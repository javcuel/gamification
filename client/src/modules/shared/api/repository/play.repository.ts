import HttpClient from '../http-client';
import { API_URLS } from '../../../../constants/apiUrls';
import { IPlayRepository } from '../interface/play-repository.interface';
import { PlayProgress, PlayCreate } from '../domain/play';
import { PlayMapper } from '../mapper/play.mapper';

class PlayRepository implements IPlayRepository {
	async getProgress(gameId: number): Promise<PlayProgress[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_GAME_PROGRESS(gameId));
			return data.map(PlayMapper.toProgressDomain);
		} catch (error) {
			console.error(`Error obtaining game progress ${gameId}:`, error);
			throw new Error('Progress could not be obtained');
		}
	}

	async savePlay(gameSessionId: number, play: PlayCreate): Promise<void> {
		const requestDTO = PlayMapper.toCreateDTO(play);
		try {
			await HttpClient.post(API_URLS.SAVE_PLAY(gameSessionId), requestDTO);
		} catch (error) {
			console.error('Error saving the play:', error);
			throw new Error('The play could not be saved.');
		}
	}
}

export const playRepository = new PlayRepository();