import { Theme } from '../domain/theme';
import { ThemeDTO } from '../dto/theme.dto';

export class ThemeMapper {
	static toDomain(dto: ThemeDTO): Theme {
		return new Theme(
			dto.primary_color,
			dto.secondary_color,
			dto.text_color,
			dto.points_icon,
			dto.completed_subjects_icon
		);
	}

	static toCreateDTO(theme: Theme): ThemeDTO {
		return {
			primary_color: theme.primaryColor,
			secondary_color: theme.secondaryColor,
			text_color: theme.textColor,
			points_icon: theme.pointsIcon,
			completed_subjects_icon: theme.completedSubjectsIcon
		};
	}
}