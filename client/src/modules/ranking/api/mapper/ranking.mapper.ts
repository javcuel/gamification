import { Ranking } from '../domain/ranking';
import { RankingDTO } from '../dto/ranking.dto';

export class RankingMapper {
	static toDomain(dto: RankingDTO): Ranking {
		return new Ranking(
			dto.Name || '',
			dto.Grupo || '',
			Number(dto.TotalTime) || 0, // Ajustado aquí
			Number(dto.TotalScore) || 0 // Ajustado aquí
		);
	}

	static toDTO(ranking: Ranking): RankingDTO {
		return {
			Name: ranking.userName,
			Grupo: ranking.userGroup,
			TotalTime: ranking.userTotalTime,
			TotalScore: ranking.userTotalScore
		};
	}
}