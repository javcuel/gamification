/**
 * Class representing the relation between a Subject and a Game (Content).
 */
export class SubjectGameRelation {
	constructor(
		public subjectId: number,
		public gameId: number,
		public isOpen: boolean,
		public isVisible: boolean
	) {}
}