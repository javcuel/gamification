import HttpClient from '../../../shared/api/http-client';
import { API_URLS } from '../../../../constants/apiUrls';
import { IRankingRepository } from '../interface/ranking-repository.interface';
import { PlayerRankingEntry, GroupRankingEntry } from '../domain/ranking';
import { RankingMapper } from '../mapper/ranking.mapper';

class RankingRepository implements IRankingRepository {
	/**
	 * Fetches the leaderboard of students for an entire subject.
	 */
	async getPlayersBySubject(subjectId: number): Promise<PlayerRankingEntry[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_SUBJECT_PLAYERS_RANKING(subjectId));
			return data.map(RankingMapper.toPlayerDomain);
		} catch (error) {
			console.error(`Error fetching player ranking for subject ${subjectId}:`, error);
			throw new Error('Failed to fetch player ranking');
		}
	}

	/**
	 * Fetches the leaderboard of groups for an entire subject.
	 */
	async getGroupsBySubject(subjectId: number): Promise<GroupRankingEntry[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_SUBJECT_GROUPS_RANKING(subjectId));
			return data.map(RankingMapper.toGroupDomain);
		} catch (error) {
			console.error(`Error fetching group ranking for subject ${subjectId}:`, error);
			throw new Error('Failed to fetch group ranking');
		}
	}

	/**
	 * Fetches the leaderboard of students for a specific game within a subject.
	 */
	async getPlayersByGame(subjectId: number, gameId: number): Promise<PlayerRankingEntry[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_GAME_PLAYERS_RANKING(subjectId, gameId));
			return data.map(RankingMapper.toPlayerDomain);
		} catch (error) {
			console.error(`Error fetching player ranking for game ${gameId} in subject ${subjectId}:`, error);
			throw new Error('Failed to fetch game ranking for players');
		}
	}

	/**
	 * Fetches the leaderboard of groups for a specific game within a subject.
	 */
	async getGroupsByGame(subjectId: number, gameId: number): Promise<GroupRankingEntry[]> {
		try {
			const data = await HttpClient.get(API_URLS.GET_GAME_GROUPS_RANKING(subjectId, gameId));
			return data.map(RankingMapper.toGroupDomain);
		} catch (error) {
			console.error(`Error fetching group ranking for game ${gameId} in subject ${subjectId}:`, error);
			throw new Error('Failed to fetch game ranking for groups');
		}
	}
}

export const rankingRepository = new RankingRepository();