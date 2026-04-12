/**
 * Interface representing the subject data in the backend.
 *
 * @interface
 */
export interface SubjectDTO {
	IDSubject: number;
	Name: string;
	UrlImgMundo: string;
	UrlImgDentro: string;
	Posicion: number;
	Abierto: boolean;
	Visible: boolean;
}

/**
 * Interface representing payload for creating a new subject.
 *
 * @interface
 */
export interface SubjectCreateDTO {
	Name: string;
	UrlImgMundo: string;
	UrlImgDentro: string;
}

/**
 * Interface representing payload for updating a subject.
 *
 * @interface
 */
export interface SubjectUpdateDTO {
	Name: string;
	UrlImgMundo: string;
	UrlImgDentro: string;
}

/**
 * Interface representing payload for updating a subject open state.
 *
 * @interface
 */
export interface SubjectUpdateOpenDTO {
	Abierto: boolean;
}

/**
 * Interface representing payload for updating a subject visible state.
 *
 * @interface
 */
export interface SubjectUpdateVisibleDTO {
	Visible: boolean;
}
