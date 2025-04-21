import { Game } from '../domain/game';

export interface IGameRepository {
  getAll(idSubject: number): Promise<Game[]>;
  create(data: Game): Promise<void>;
  update(id: number, data: Game): Promise<void>;
  delete(id: number): Promise<void>;
}
