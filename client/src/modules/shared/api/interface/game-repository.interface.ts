import { Game, GameCreate, GameUpdate } from '../domain/game';

export interface IGameRepository {
  getAll(idSubject: number): Promise<Game[]>;
  create(data: GameCreate): Promise<void>;
  update(id: number, data: GameUpdate): Promise<void>;
  updateOpen(id: number, newState: boolean): Promise<void>;
  updateVisible(id: number, newState: boolean): Promise<void>;
  delete(id: number): Promise<void>;
}
