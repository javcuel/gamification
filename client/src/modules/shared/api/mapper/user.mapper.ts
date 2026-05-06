import {
	User,
	UserCreate,
	UserLogin,
	UserScore,
	UserUpdate
} from '../domain/user';

import {
	UserCreateDTO,
	UserDTO,
	UserLoginDTO,
	UserScoreDTO,
	UserUpdateDTO
} from '../dto/user.dto';

/**
 * Mapper class responsible for converting between User domain models
 * and their corresponding Data Transfer Object (DTO) representations.
 */
export class UserMapper {
	/**
	 * Converts a UserDTO to a User domain model.
	 * @param dto - The DTO containing user data.
	 * @returns A User domain instance.
	 */
	static toDomain(dto: UserDTO): User {
		return new User(
			dto.IDUser,
			dto.UserType,
			dto.Name,
			dto.Password,
			dto.RealName // Añadimos la lectura del RealName que nos manda el backend
		);
	}

	/**
	 * Converts a User domain model to a UserDTO.
	 * @param user - The User domain object.
	 * @returns A DTO representing the user for external use.
	 */
	static toDTO(user: User): UserDTO {
		return {
			IDUser: user.id,
			UserType: user.role,
			Name: user.name,
			Password: user.passwd,
			RealName: user.realName // Mapeamos realName hacia la API
		};
	}

	/**
	 * Maps a UserCreate structure to a UserCreateDTO.
	 * @param user - The data required to create a new user.
	 * @returns A DTO formatted for user creation.
	 */
	static toCreateDTO(user: UserCreate): UserCreateDTO {
		return {
			Name: user.name,
			UserType: user.role,
			Password: user.passwd,
			RealName: user.realName // Mapeamos realName hacia la API al crear
		};
	}

	/**
	 * Maps a UserUpdate structure to a UserUpdateDTO.
	 * @param user - The updated user data.
	 * @returns A DTO suitable for update operations.
	 */
	static toUpdateDTO(user: UserUpdate): UserUpdateDTO {
		return {
			Name: user.name,
			UserType: user.role,
			Password: user.passwd,
			RealName: user.realName // Mapeamos realName hacia la API al actualizar
		};
	}

	/**
	 * Maps a UserLogin structure to a UserLoginDTO.
	 * @param user - The login credentials of the user.
	 * @returns A DTO containing login information.
	 */
	static toLoginDTO(user: UserLogin): UserLoginDTO {
		return {
			Name: user.name,
			Password: user.passwd
		};
	}

	/**
	 * Converts a UserScoreDTO to a UserScore domain model.
	 * @param dto - The DTO representing score data.
	 * @returns A UserScore domain object.
	 */
	static toScoreDomain(dto: UserScoreDTO): UserScore {
		return new UserScore(dto.Puntuacion, dto.Completado);
	}

	/**
	 * Converts a UserScore domain model to a UserScoreDTO.
	 * @param user - The user's score data.
	 * @returns A DTO representing the score and completion data.
	 */
	static toScoreDTO(user: UserScore): UserScoreDTO {
		return {
			Puntuacion: user.totalScore,
			Completado: user.completedSubjects
		};
	}
}