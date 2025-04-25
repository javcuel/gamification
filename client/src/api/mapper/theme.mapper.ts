import { Theme } from '../domain/theme';

import { ThemeCreateDTO, ThemeDTO } from '../dto/theme.dto';

export class ThemeMapper {
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

  static toDTO(theme: Theme): ThemeDTO {
    return {
      id: theme.id,
      primary_color: theme.primary,
      secondary_color: theme.secondary,
      text_color: theme.text,
      points_icon: theme.pointsIcon,
      completed_subjects_icon: theme.completedSubjectsIcon,
    };
  }

  static toCreateDTO(theme: Theme): ThemeCreateDTO {
    return {
      primary_color: theme.primary,
      secondary_color: theme.secondary,
      text_color: theme.text,
      points_icon: theme.pointsIcon,
      completed_subjects_icon: theme.completedSubjectsIcon,
    };
  }
}
