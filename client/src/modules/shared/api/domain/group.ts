/**
 * Class representing a Subject Group inside the App.
 */
export class SubjectGroup {
	constructor(
		public id: number,
		public name: string,
		public subjectId: number,
		public isTeacherGroup: boolean
	) {}
}

/**
 * Class representing the payload to create a new Subject Group.
 */
export class SubjectGroupCreate {
	constructor(
		public name: string,
		public subjectId: number
	) {}
}