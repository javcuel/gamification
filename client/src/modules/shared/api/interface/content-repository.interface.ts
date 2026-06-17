export interface IContentRepository {
	link(subjectId: number, gameId: number): Promise<void>;
	unlink(subjectId: number, gameId: number): Promise<void>;
	updateOpen(subjectId: number, gameId: number, isOpen: boolean): Promise<void>;
	updateVisible(subjectId: number, gameId: number, isVisible: boolean): Promise<void>;
}