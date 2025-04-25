import { Theme } from '../domain/theme';

export interface IThemeRepository {
  get(): Promise<Theme>;
  create(data: Theme): Promise<void>;
}
