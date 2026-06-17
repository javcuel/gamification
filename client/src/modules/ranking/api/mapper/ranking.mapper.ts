import { PlayerRankingEntry, GroupRankingEntry } from '../domain/ranking';
import { PlayerRankingDTO, GroupRankingDTO } from '../dto/ranking.dto';

export class RankingMapper {
	static toPlayerDomain(dto: PlayerRankingDTO): PlayerRankingEntry {
		return new PlayerRankingEntry(
			dto.Name,
			Number(dto.TotalScore) || 0,
			Number(dto.TotalTime) || 0,
			dto.IDUser
		);
	}

	static toGroupDomain(dto: GroupRankingDTO): GroupRankingEntry {
		return new GroupRankingEntry(
			dto.Group, 
			Number(dto.TotalScore) || 0,
			Number(dto.TotalTime) || 0,
			dto.IDGroup
		);
	}
}