/**
 * Interface representing the subject data in the backend.
 *
 * @interface
 */
export interface SubjectDTO {
  IDMundo: number;
  Nombre: string;
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
export interface SubjectRequestDTO {
  Nombre: string;
  UrlImgMundo: string;
  UrlImgDentro: string;
}

/**
 * Interface representing payload for updating the open state of a subject.
 *
 * @interface
 */
export interface SubjectOpenStateRequestDTO {
  IDMundo: number;
  Abierto: boolean;
}

/**
 * Interface representing payload for updating the visible state of a subject.
 *
 * @interface
 */
export interface SubjectVisibleStateRequestDTO {
  IDMundo: number;
  Visible: boolean;
}
