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
export interface SubjectCreateDTO {
  Nombre: string;
  UrlImgMundo: string;
  UrlImgDentro: string;
}

/**
 * Interface representing payload for updating a new subject.
 *
 * @interface
 */
export interface SubjectUpdateDTO {
  IDMundo: number;
  Nombre: string;
  UrlImgMundo: string;
  UrlImgDentro: string;
}
