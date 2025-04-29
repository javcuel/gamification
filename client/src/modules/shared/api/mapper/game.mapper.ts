import { Game } from '../domain/game';

import { GameDTO, GameCreateDTO, GameUpdateDTO } from '../dto/game.dto';

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

  static toCreateDTO(game: Game): GameCreateDTO {
    return {
      IDMundo: game.idSubject,
      Nombre: game.name,
      UrlImagen: game.img,
      PuntuacionMaxima: game.maxScore,
    };
  }

  static toUpdateDTO(game: Game): GameUpdateDTO {
    return {
      IDMinijuego: game.id,
      IDMundo: game.idSubject,
      Nombre: game.name,
      UrlImagen: game.img,
      PuntuacionMaxima: game.maxScore,
    };
  }
}
