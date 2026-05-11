import { Game, GameCreate, GameUpdate } from '../domain/game';

/**
 * Interface defining the contract for any Game repository implementation.
 */
export interface IGameRepository {
	/**
	 * Retrieves all games.
	 */
	getAll(): Promise<Game[]>;

	/**
	 * Retrieves a specific game by its ID.
	 */
	getById(id: number): Promise<Game>;

	/**
	 * Creates a new game entry.
	 */
	create(data: GameCreate): Promise<void>;

	/**
	 * Updates an existing game with new data.
	 */
	update(id: number, data: GameUpdate): Promise<void>;

	/**
	 * Updates the 'open' state of a specific game.
	 */
	updateOpen(id: number, newState: boolean): Promise<void>;

	/**
	 * Updates the 'visible' state of a specific game.
	 */
	updateVisible(id: number, newState: boolean): Promise<void>;

	/**
	 * Deletes a game by its ID.
	 */
	delete(id: number): Promise<void>;
}