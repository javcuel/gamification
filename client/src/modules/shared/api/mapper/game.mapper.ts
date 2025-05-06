import { Game, GameCreate, GameUpdate } from '../domain/game';

import {
  GameCreateDTO,
  GameDTO,
  GameUpdateDTO,
  GameUpdateOpenDTO,
  GameUpdateVisibleDTO,
} from '../dto/game.dto';

export class GameMapper {
  static toDomain(dto: GameDTO): Game {
    return new Game(
      dto.IDMinijuego,
      dto.IDMundo,
      dto.UrlImagen,
      dto.Nombre,
      dto.PuntuacionMaxima,
      dto.Abierto,
      dto.Visible,
      dto.Posicion,
      dto.IDUsuario,
      dto.Nuevo,
      dto.Subido
    );
  }

  static toDTO(game: Game): GameDTO {
    return {
      IDMinijuego: game.id,
      IDMundo: game.idSubject,
      UrlImagen: game.img,
      Nombre: game.name,
      PuntuacionMaxima: game.maxScore,
      Abierto: game.isOpen,
      Visible: game.isVisible,
      Posicion: game.position,
      IDUsuario: game.idUser,
      Nuevo: game.isNew,
      Subido: game.uploaded,
    };
  }

  static toCreateDTO(gameCreate: GameCreate): GameCreateDTO {
    return {
      IDMundo: gameCreate.idSubject,
      Nombre: gameCreate.name,
      UrlImagen: gameCreate.img,
      PuntuacionMaxima: gameCreate.maxScore,
    };
  }

  static toUpdateDTO(gameUpdate: GameUpdate): GameUpdateDTO {
    return {
      IDMundo: gameUpdate.idSubject,
      Nombre: gameUpdate.name,
      UrlImagen: gameUpdate.img,
      PuntuacionMaxima: gameUpdate.maxScore,
    };
  }

  static toUpdateOpenDTO(newState: boolean): GameUpdateOpenDTO {
    return {
      Abierto: newState,
    };
  }
  static toUpdateVisibleDTO(newState: boolean): GameUpdateVisibleDTO {
    return {
      Visible: newState,
    };
  }
}
