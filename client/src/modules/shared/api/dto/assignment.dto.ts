/**
 * Interface representing the user data returned when fetching group members.
 */
export interface GroupUserDTO {
	IDUser: number;
	Name: string;
	UserType: string;
}

/**
 * Interface representing the payload expected by the backend to create an assignment.
 */
export interface AssignmentCreateDTO {
	UserName: string;
	IDGroup: number;
}