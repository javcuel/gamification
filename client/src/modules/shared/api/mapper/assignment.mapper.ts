import { GroupUser, AssignmentCreate } from '../domain/assignment';
import { GroupUserDTO, AssignmentCreateDTO } from '../dto/assignment.dto';

export class AssignmentMapper {
	/**
	 * Converts a GroupUserDTO from the backend to a GroupUser domain model.
	 */
	static toDomain(dto: GroupUserDTO): GroupUser {
		return new GroupUser(
			dto.IDUser,
			dto.Name,
			dto.UserType
		);
	}

	/**
	 * Converts an AssignmentCreate domain model to an AssignmentCreateDTO.
	 */
	static toCreateDTO(assignment: AssignmentCreate): AssignmentCreateDTO {
		return {
			UserName: assignment.userName,
			IDGroup: assignment.groupId
		};
	}
}