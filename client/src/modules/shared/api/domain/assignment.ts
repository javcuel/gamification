/**
 * Class representing a User simplified for the Group context.
 */
export class GroupUser {
	constructor(
		public id: number,
		public name: string,
		public role: string
	) {}
}

/**
 * Class representing the payload to assign a user to a group.
 */
export class AssignmentCreate {
	constructor(
		public userName: string,
		public groupId: number
	) {}
}