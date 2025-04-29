import { Theme } from '../domain/theme';

import { API_URLS } from '../../constants/apiUrls';
import HttpClient from '../http-client';
import { IThemeRepository } from '../interface/theme-repository.interface';
import { ThemeMapper } from '../mapper/theme.mapper';

export class ThemeRepository implements IThemeRepository {
  async get(): Promise<Theme> {
    try {
      const data = await HttpClient.get(API_URLS.GET_THEME);
      return ThemeMapper.toDomain(data);
    } catch (error) {
      console.error('Error fetching theme', error);
      throw new Error('Failed to fetch theme');
    }
  }

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

export const themeRepository = new ThemeRepository();
