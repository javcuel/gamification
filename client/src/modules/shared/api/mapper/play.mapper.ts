import { PlayProgress, PlayCreate } from '../domain/play';
import { PlayProgressDTO, PlayCreateDTO } from '../dto/play.dto';

export class PlayMapper {
	static toProgressDomain(dto: PlayProgressDTO): PlayProgress {
		return new PlayProgress(
			dto.level,
			dto.score,
			dto.time,
			// We convert to a real boolean regardless of whether MySQL sends 1 or true
			dto.completed === 1 || dto.completed === true 
		);
	}

	static toCreateDTO(play: PlayCreate): PlayCreateDTO {
		return {
			level: play.level,
			score: play.score,
			time: play.time,
			completed: play.completed
		};
	}
}