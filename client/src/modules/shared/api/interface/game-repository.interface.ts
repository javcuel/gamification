import { Game, GameCreate, GameUpdate } from '../domain/game';

export interface IGameRepository {
	getAll(): Promise<Game[]>;
	getById(id: number): Promise<Game>;
	getBySubject(subjectId: number): Promise<Game[]>;
	getAvailableForSubject(subjectId: number): Promise<Game[]>;
	create(gameData: GameCreate): Promise<void>;
	update(id: number, gameData: GameUpdate): Promise<void>;
	updateOpen(id: number, newState: boolean): Promise<void>;
	updateVisible(id: number, newState: boolean): Promise<void>;
	delete(id: number): Promise<void>;
}