import { Ranking } from '../domain/ranking';

/**
 * Interface defining the contract for any Ranking repository implementation.
 * Repositories adhering to this interface should handle all data operations
 * related to Game entities.
 */
export interface IRankingRepository {
	/**
	 * Retrieves all rankings associated to the players.
	 * @returns A promise resolving to an array of Ranking entities.
	 */
	getPlayers(): Promise<Ranking[]>;

	/**
	 * Retrieves all rankings associated to the players.
	 * @returns A promise resolving to an array of Ranking entities.
	 */
	getGroups(): Promise<Ranking[]>;

	/**
	 * Retrieves all rankings associated to the players by game.
	 * @param gameId - The ID of the game for which rankings are to be fetched.
	 * @returns A promise resolving to an array of Ranking entities.
	 */
	getPlayersByGame(gameId: number): Promise<Ranking[]>;

	/**
	 * Retrieves all rankings associated to the groups by game.
	 * @param gameId - The ID of the game for which rankings are to be fetched.
	 * @returns A promise resolving to an array of Ranking entities.
	 */
	getGroupsByGame(gameId: number): Promise<Ranking[]>;
}
