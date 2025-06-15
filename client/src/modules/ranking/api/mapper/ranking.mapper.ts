import { Ranking } from '../domain/ranking';

import { RankingDTO } from '../dto/ranking.dto';

/**
 * Mapper class responsible for converting between Ranking domain models
 * and their corresponding Data Transfer Object (DTO) representations.
 */
export class RankingMapper {
	/**
	 * Converts a UserDTO to a User domain model.
	 * @param dto - The DTO containing ranking data.
	 * @returns A User domain instance.
	 */
	static toDomain(dto: RankingDTO): Ranking {
		return new Ranking(
			dto.Nombre,
			dto.Grupo,
			dto.TotalEstrellas,
			dto.TotalPuntos
		);
	}

	/**
	 * Converts a User domain model to a UserDTO.
	 * @param ranking - The User domain object.
	 * @returns A DTO representing the ranking for external use.
	 */
	static toDTO(subject: Ranking): RankingDTO {
		return {
			Nombre: subject.userName,
			Grupo: subject.userGroup,
			TotalEstrellas: subject.userCompletedSubjects,
			TotalPuntos: subject.userTotalScore
		};
	}
}
