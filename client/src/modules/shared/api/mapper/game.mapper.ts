import { Game, GameCreate, GameUpdate } from '../domain/game';
import { 
	GameDTO, 
	GameCreateDTO, 
	GameUpdateDTO, 
	GameUpdateOpenDTO, 
	GameUpdateVisibleDTO 
} from '../dto/game.dto';
import { API_URLS } from '../../../../constants/apiUrls';

export class GameMapper {
	/**
	* Helper to ensure local images point to the backend
	* and respect external internet URLs.
	*/
	private static getFullImageUrl(path: string): string {
		if (!path) return '';
		if (path.startsWith('http')) return path;
		
		return `${API_URLS.SERVER_URL}${path}`;
	}

	static toDomain(dto: GameDTO): Game {
		return new Game(
			dto.IDGame,
			GameMapper.getFullImageUrl(dto.UrlImage),
			dto.Name,
			!!dto.Open,
			!!dto.Visible,
			dto.AdminOpen !== undefined ? !!dto.AdminOpen : undefined,
			dto.AdminVisible !== undefined ? !!dto.AdminVisible : undefined,
			dto.TeacherOpen !== undefined ? !!dto.TeacherOpen : undefined,
			dto.TeacherVisible !== undefined ? !!dto.TeacherVisible : undefined
		);
	}

	static toCreateDTO(gameCreate: GameCreate): GameCreateDTO {
		return {
			Name: gameCreate.name,
			UrlImage: gameCreate.img
		};
	}

	static toUpdateDTO(gameUpdate: GameUpdate): GameUpdateDTO {
		return {
			Name: gameUpdate.name,
			UrlImage: gameUpdate.img
		};
	}

	static toUpdateOpenDTO(newState: boolean): GameUpdateOpenDTO {
		return {
			Open: newState ? 1 : 0
		};
	}

	static toUpdateVisibleDTO(newState: boolean): GameUpdateVisibleDTO {
		return {
			Visible: newState ? 1 : 0
		};
	}
}