import {
  User,
  UserCreate,
  UserLogin,
  UserScore,
  UserUpdate,
} from '../domain/user';

import {
  UserCreateDTO,
  UserDTO,
  UserLoginDTO,
  UserScoreDTO,
  UserUpdateDTO,
} from '../dto/user.dto';

export class UserMapper {
  static toDomain(dto: UserDTO): User {
    return new User(
      dto.IDUsuario,
      dto.Grupo,
      dto.TipoUsuario,
      dto.Nombre,
      dto.Contrasena
    );
  }

  static toDTO(user: User): UserDTO {
    return {
      IDUsuario: user.id,
      Grupo: user.group,
      TipoUsuario: user.role,
      Nombre: user.name,
      Contrasena: user.passwd,
    };
  }

  static toCreateDTO(user: UserCreate): UserCreateDTO {
    return {
      Nombre: user.name,
      Grupo: user.group,
      TipoUsuario: user.role,
      Contrasena: user.passwd,
    };
  }

  static toUpdateDTO(user: UserUpdate): UserUpdateDTO {
    return {
      Nombre: user.name,
      Grupo: user.group,
      TipoUsuario: user.role,
      Contrasena: user.passwd,
    };
  }

  static toLoginDTO(user: UserLogin): UserLoginDTO {
    return {
      Nombre: user.name,
      Contrasena: user.passwd,
    };
  }

  static toScoreDomain(dto: UserScoreDTO): UserScore {
    return new UserScore(dto.Puntuacion, dto.Completado);
  }

  static toScoreDTO(user: UserScore): UserScoreDTO {
    return {
      Puntuacion: user.totalScore,
      Completado: user.completedSubjects,
    };
  }
}
