import { Game, GameCreate, GameUpdate } from '../domain/game';

import {
	GameCreateDTO,
	GameDTO,
	GameUpdateDTO,
	GameUpdateOpenDTO,
	GameUpdateVisibleDTO
} from '../dto/game.dto';

import { API_URLS } from '../../../../constants/apiUrls';

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
		// --- LÓGICA DE RUTAS ---
		let finalImageUrl = dto.UrlImagen;
		
		if (finalImageUrl && finalImageUrl.startsWith('/images/')) {
			finalImageUrl = `${API_URLS.SERVER_URL}${finalImageUrl}`;
		}
		// -----------------------------

		return new Game(
        dto.IDGame,
        finalImageUrl, 
        dto.Name,
        !!dto.Abierto,
        !!dto.Visible,
        (dto as any).AdminAbierto !== undefined ? !!(dto as any).AdminAbierto : undefined,
        (dto as any).AdminVisible !== undefined ? !!(dto as any).AdminVisible : undefined,
        (dto as any).TeacherAbierto !== undefined ? !!(dto as any).TeacherAbierto : undefined,
        (dto as any).TeacherVisible !== undefined ? !!(dto as any).TeacherVisible : undefined
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
			UrlImagen: game.img,
			Name: game.name,
			Abierto: game.isOpen,
			Visible: game.isVisible,
		};
	}

	/**
	 * Maps a GameCreate structure to a GameCreateDTO.
	 * @param gameCreate - The data required to create a game in domain format.
	 * @returns A DTO suitable for sending to an API or data layer.
	 */
	static toCreateDTO(gameCreate: GameCreate): GameCreateDTO {
		return {
			// IDSubject: gameCreate.idSubject,
			Name: gameCreate.name,
			UrlImagen: gameCreate.img
		};
	}

	/**
	 * Maps a GameUpdate structure to a GameUpdateDTO.
	 * @param gameUpdate - The data used to update an existing game.
	 * @returns A DTO suitable for update operations at the persistence layer.
	 */
	static toUpdateDTO(gameUpdate: GameUpdate): GameUpdateDTO {
		return {
			// IDSubject: gameUpdate.idSubject,
			Name: gameUpdate.name,
			UrlImagen: gameUpdate.img
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
