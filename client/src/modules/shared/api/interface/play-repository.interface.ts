import { PlayProgress, PlayCreate } from '../domain/play';

export interface IPlayRepository {
	getProgress(gameId: number): Promise<PlayProgress[]>;
	savePlay(gameSessionId: number, play: PlayCreate): Promise<void>;
}