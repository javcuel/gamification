import { Theme } from '../domain/theme';

import { API_URLS } from '../../constants/apiUrls';
import HttpClient from '../http-client';
import { IThemeRepository } from '../interface/theme-repository.interface';
import { ThemeMapper } from '../mapper/theme.mapper';

/**
 * Implementation of the IThemeRepository interface.
 * Responsible for handling API communication for theme-related operations.
 */
class ThemeRepository implements IThemeRepository {
	/**
	 * Retrieves theme.
	 * @returns A promise resolving to an Theme entity.
	 */
	async get(): Promise<Theme> {
		try {
			const data = await HttpClient.get(API_URLS.GET_THEME);
			return ThemeMapper.toDomain(data);
		} catch (error) {
			console.error('Error fetching theme', error);
			throw new Error('Failed to fetch theme');
		}
	}

	/**
	 * Creates a new theme entry.
	 * @param data - The data required to create a new theme.
	 * @returns A promise that resolves when the operation is complete.
	 */
	async create(data: Theme): Promise<void> {
		const requestDTO = ThemeMapper.toCreateDTO(data);

		try {
			await HttpClient.post(API_URLS.CREATE_THEME, requestDTO);
		} catch (error) {
			console.error('Error creating new theme:', error);
			throw new Error('Failed to create new theme');
		}
	}
}

// Exporting a singleton instance of the ThemeRepository for use across the application.
export const themeRepository = new ThemeRepository();
