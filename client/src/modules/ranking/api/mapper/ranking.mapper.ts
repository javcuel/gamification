import { Ranking } from '../domain/ranking';

import { RankingDTO } from '../dto/ranking.dto';

export class RankingMapper {
  static toDomain(dto: RankingDTO): Ranking {
    return new Ranking(
      dto.Nombre,
      dto.Grupo,
      dto.TotalEstrellas,
      dto.TotalPuntos
    );
  }

  static toDTO(subject: Ranking): RankingDTO {
    return {
      Nombre: subject.userName,
      Grupo: subject.userGroup,
      TotalEstrellas: subject.userCompletedSubjects,
      TotalPuntos: subject.userTotalScore,
    };
  }
}
