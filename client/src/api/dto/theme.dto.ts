/**
 * Interface representing the theme data in the backend.
 *
 * @interface
 */
export interface ThemeDTO {
  id: number;
  primary_color: string;
  secondary_color: string;
  text_color: string;
  points_icon: string;
  completed_subjects_icon: string;
}

/**
 * Interface representing payload for creating a new theme.
 *
 * @interface
 */
export interface ThemeCreateDTO {
  primary_color: string;
  secondary_color: string;
  text_color: string;
  points_icon: string;
  completed_subjects_icon: string;
}
