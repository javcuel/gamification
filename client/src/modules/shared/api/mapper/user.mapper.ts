import { User } from '../domain/user';

import {
  UserDTO,
  UserCreateDTO,
  UserUpdateDTO,
  UserLoginDTO,
} from '../dto/user.dto';

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

  static toCreateDTO(user: User): UserCreateDTO {
    return {
      Nombre: user.name,
      Contrasena: user.passwd,
      TipoUsuario: user.role,
    };
  }

  static toUpdateDTO(user: User): UserUpdateDTO {
    return {
      IDUsuario: user.id,
      Nombre: user.name,
      Contrasena: user.passwd,
      TipoUsuario: user.role,
    };
  }

  static toLoginDTO(user: User): UserLoginDTO {
    return {
      Nombre: user.name,
      Contrasena: user.passwd,
    };
  }
}
