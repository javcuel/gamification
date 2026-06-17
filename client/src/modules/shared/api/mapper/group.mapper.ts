import { SubjectGroup, SubjectGroupCreate } from '../domain/group';
import { SubjectGroupDTO, SubjectGroupCreateDTO } from '../dto/group.dto';

export class GroupMapper {
	/**
	 * Converts a SubjectGroupDTO from the backend to a SubjectGroup domain model.
	 */
	static toDomain(dto: SubjectGroupDTO): SubjectGroup {
		return new SubjectGroup(
			dto.IDGroup,
			dto.Name,
			dto.IDSubject,
			dto.IsTeacherGroup === 1 // Transform MySQL's tinyint to boolean
		);
	}

	/**
	 * Converts a SubjectGroupCreate domain model to a SubjectGroupCreateDTO.
	 */
	static toCreateDTO(group: SubjectGroupCreate): SubjectGroupCreateDTO {
		return {
			Name: group.name,
			IDSubject: group.subjectId
		};
	}
}