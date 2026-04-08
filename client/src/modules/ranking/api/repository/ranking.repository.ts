import { Ranking } from '../domain/ranking';
import HttpClient from '../../../../api/http-client';
import { RankingMapper } from '../mapper/ranking.mapper';

class RankingRepository {
	async getPlayers(subjectId: number): Promise<Ranking[]> {
        // IMPORTANTE: Asegúrate de que empieza por /api/rankings/
		const data = await HttpClient.get(`/rankings/p/${subjectId}`);
		return data.map(RankingMapper.toDomain);
	}

	async getGroups(subjectId: number): Promise<Ranking[]> {
		const data = await HttpClient.get(`/rankings/g/${subjectId}`);
		return data.map(RankingMapper.toDomain);
	}

	async getPlayersByGame(subjectId: number, gameId: number): Promise<Ranking[]> {
		const data = await HttpClient.get(`/rankings/pg/${subjectId}/${gameId}`);
		return data.map(RankingMapper.toDomain);
	}

	async getGroupsByGame(subjectId: number, gameId: number): Promise<Ranking[]> {
		const data = await HttpClient.get(`/rankings/gg/${subjectId}/${gameId}`);
		return data.map(RankingMapper.toDomain);
	}
}
export const rankingRepository = new RankingRepository();