import { PlayerRankingEntry, GroupRankingEntry } from '../domain/ranking';

export interface IRankingRepository {
	getPlayersBySubject(subjectId: number): Promise<PlayerRankingEntry[]>;
	getGroupsBySubject(subjectId: number): Promise<GroupRankingEntry[]>;
	getPlayersByGame(subjectId: number, gameId: number): Promise<PlayerRankingEntry[]>;
	getGroupsByGame(subjectId: number, gameId: number): Promise<GroupRankingEntry[]>;
}