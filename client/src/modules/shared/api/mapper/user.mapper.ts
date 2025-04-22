import { User } from '../domain/user';

import { UserDTO, UserRequestDTO, UserRequestLoginDTO } from '../dto/user.dto';

export class UserMapper {
  static toDomain(dto: UserDTO): User {
    return new User(
      dto.IDUsuario,
      dto.Nombre,
      dto.Contrasena,
      dto.TipoUsuario,
      dto.Puntuacion,
      dto.Completado
    );
  }

  static toDTO(user: User): UserDTO {
    return {
      IDUsuario: user.id,
      Nombre: user.name,
      Contrasena: user.passwd,
      TipoUsuario: user.role,
      Puntuacion: user.totalScore,
      Completado: user.completedSubjects,
    };
  }

  static toRequestDTO(user: User): UserRequestDTO {
    return {
      Nombre: user.name,
      Contrasena: user.passwd,
      TipoUsuario: user.role,
    };
  }

  static toRequestLoginDTO(user: User): UserRequestLoginDTO {
    return {
      Nombre: user.name,
      Contrasena: user.passwd,
    };
  }
}
