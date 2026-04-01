import { Game, GameCreate, GameUpdate } from '../domain/game';

import {
	GameCreateDTO,
	GameDTO,
	GameUpdateDTO,
	GameUpdateOpenDTO,
	GameUpdateVisibleDTO
} from '../dto/game.dto';

/**
 * Utility class responsible for mapping between domain models and DTOs
 * for Game-related data. This ensures a clear separation between
 * internal models and external representations.
 */
export class GameMapper {
	/**
	 * Maps a GameDTO to the Game domain model.
	 * @param dto - The data transfer object containing raw game data.
	 * @returns A domain Game instance constructed from the DTO.
	 */
	static toDomain(dto: GameDTO): Game {
		return new Game(
			dto.IDGame,
			dto.IDSubject,
			dto.UrlImagen,
			dto.Nombre,
			dto.PuntuacionMaxima,
			dto.Abierto,
			dto.Visible,
			dto.Posicion,
			dto.IDUser,
			dto.Nuevo,
			dto.Subido
		);
	}

	/**
	 * Maps a Game domain model to a GameDTO.
	 * @param game - The domain model representing a game.
	 * @returns A GameDTO containing the serialised game data.
	 */
	static toDTO(game: Game): GameDTO {
		return {
			IDGame: game.id,
			IDSubject: game.idSubject,
			UrlImagen: game.img,
			Nombre: game.name,
			PuntuacionMaxima: game.maxScore,
			Abierto: game.isOpen,
			Visible: game.isVisible,
			Posicion: game.position,
			IDUser: game.idUser,
			Nuevo: game.isNew,
			Subido: game.uploaded
		};
	}

	/**
	 * Maps a GameCreate structure to a GameCreateDTO.
	 * @param gameCreate - The data required to create a game in domain format.
	 * @returns A DTO suitable for sending to an API or data layer.
	 */
	static toCreateDTO(gameCreate: GameCreate): GameCreateDTO {
		return {
			IDSubject: gameCreate.idSubject,
			Nombre: gameCreate.name,
			UrlImagen: gameCreate.img,
			PuntuacionMaxima: gameCreate.maxScore
		};
	}

	/**
	 * Maps a GameUpdate structure to a GameUpdateDTO.
	 * @param gameUpdate - The data used to update an existing game.
	 * @returns A DTO suitable for update operations at the persistence layer.
	 */
	static toUpdateDTO(gameUpdate: GameUpdate): GameUpdateDTO {
		return {
			IDSubject: gameUpdate.idSubject,
			Nombre: gameUpdate.name,
			UrlImagen: gameUpdate.img,
			PuntuacionMaxima: gameUpdate.maxScore
		};
	}

	/**
	 * Converts a boolean state into a GameUpdateOpenDTO format.
	 * @param newState - The new 'open' state of the game.
	 * @returns A DTO containing the updated open state.
	 */
	static toUpdateOpenDTO(newState: boolean): GameUpdateOpenDTO {
		return {
			Abierto: newState
		};
	}

	/**
	 * Converts a boolean state into a GameUpdateVisibleDTO format.
	 * @param newState - The new 'visible' state of the game.
	 * @returns A DTO containing the updated visibility state.
	 */
	static toUpdateVisibleDTO(newState: boolean): GameUpdateVisibleDTO {
		return {
			Visible: newState
		};
	}
}
