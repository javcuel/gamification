import { Ranking } from '../domain/ranking';

export interface IRankingRepository {
  getPlayers(): Promise<Ranking[]>;
  getGroups(): Promise<Ranking[]>;
  getPlayersByGame(gameId: number): Promise<Ranking[]>;
  getGroupsByGame(gameId: number): Promise<Ranking[]>;
}
