import { Theme } from '../domain/theme';

import { ThemeCreateDTO, ThemeDTO } from '../dto/theme.dto';

/**
 * Mapper class responsible for converting between Theme domain models
 * and their corresponding Data Transfer Object (DTO) representations.
 */
export class ThemeMapper {
	/**
	 * Converts a ThemeDTO to a Theme domain model.
	 * @param dto - The DTO containing uheme data.
	 * @returns A Theme domain instance.
	 */
	static toDomain(dto: ThemeDTO): Theme {
		return new Theme(
			dto.id,
			dto.primary_color,
			dto.secondary_color,
			dto.text_color,
			dto.points_icon,
			dto.completed_subjects_icon
		);
	}

	/**
	 * Converts a Theme domain model to a ThemeDTO.
	 * @param theme - The Theme domain object.
	 * @returns A DTO representing the theme for external use.
	 */
	static toDTO(theme: Theme): ThemeDTO {
		return {
			id: theme.id,
			primary_color: theme.primary,
			secondary_color: theme.secondary,
			text_color: theme.text,
			points_icon: theme.pointsIcon,
			completed_subjects_icon: theme.completedSubjectsIcon
		};
	}

	/**
	 * Maps a ThemeCreate structure to a ThemeCreateDTO.
	 * @param theme - The data required to create a new theme.
	 * @returns A DTO formatted for theme creation.
	 */
	static toCreateDTO(theme: Theme): ThemeCreateDTO {
		return {
			primary_color: theme.primary,
			secondary_color: theme.secondary,
			text_color: theme.text,
			points_icon: theme.pointsIcon,
			completed_subjects_icon: theme.completedSubjectsIcon
		};
	}
}
