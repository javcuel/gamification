import { Theme } from '../domain/theme';

/**
 * Interface defining the contract for any Theme repository implementation.
 * Repositories adhering to this interface should handle all data operations
 * related to Theme entities.
 */
export interface IThemeRepository {
	/**
	 * Retrieves theme.
	 * @returns A promise resolving to an Theme entity.
	 */
	get(): Promise<Theme>;

	/**
	 * Creates a new theme entry.
	 * @param data - The data required to create a new theme.
	 * @returns A promise that resolves when the operation is complete.
	 */
	create(data: Theme): Promise<void>;
}
