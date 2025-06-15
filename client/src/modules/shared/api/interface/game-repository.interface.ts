import { Game, GameCreate, GameUpdate } from '../domain/game';

/**
 * Interface defining the contract for any Game repository implementation.
 * Repositories adhering to this interface should handle all data operations
 * related to Game entities.
 */
export interface IGameRepository {
	/**
	 * Retrieves all games associated with a specific subject.
	 * @param idSubject - The ID of the subject for which games are to be fetched.
	 * @returns A promise resolving to an array of Game entities.
	 */
	getAll(idSubject: number): Promise<Game[]>;

	/**
	 * Creates a new game entry.
	 * @param data - The data required to create a new game.
	 * @returns A promise that resolves when the operation is complete.
	 */
	create(data: GameCreate): Promise<void>;

	/**
	 * Updates an existing game with new data.
	 * @param id - The ID of the game to be updated.
	 * @param data - The updated game data.
	 * @returns A promise that resolves when the update is complete.
	 */
	update(id: number, data: GameUpdate): Promise<void>;

	/**
	 * Updates the 'open' state of a specific game.
	 * @param id - The ID of the game to be modified.
	 * @param newState - The new boolean state representing whether the game is open.
	 * @returns A promise that resolves when the state has been updated.
	 */
	updateOpen(id: number, newState: boolean): Promise<void>;

	/**
	 * Updates the 'visible' state of a specific game.
	 * @param id - The ID of the game to be modified.
	 * @param newState - The new boolean state representing visibility.
	 * @returns A promise that resolves when the visibility has been updated.
	 */
	updateVisible(id: number, newState: boolean): Promise<void>;

	/**
	 * Deletes a game by its ID.
	 * @param id - The ID of the game to delete.
	 * @returns A promise that resolves when the game has been deleted.
	 */
	delete(id: number): Promise<void>;
}
