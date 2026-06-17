/**
 * Interface representing the group data as received from the backend.
 */
export interface SubjectGroupDTO {
	IDGroup: number;
	Name: string;
	IDSubject: number;
	IsTeacherGroup?: number; // Optional because the backend does not return it during creation
}

/**
 * Interface representing the payload expected by the backend to create a group.
 */
export interface SubjectGroupCreateDTO {
	Name: string;
	IDSubject: number;
}