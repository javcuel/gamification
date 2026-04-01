import { Subject, SubjectCreate, SubjectUpdate } from '../domain/subject';

import {
	SubjectCreateDTO,
	SubjectDTO,
	SubjectUpdateDTO,
	SubjectUpdateOpenDTO,
	SubjectUpdateVisibleDTO
} from '../dto/subject.dto';

/**
 * Utility class responsible for mapping between Subject domain models
 * and their corresponding Data Transfer Object (DTO) representations.
 */
export class SubjectMapper {
	/**
	 * Converts a SubjectDTO to a Subject domain model.
	 * @param dto - The data transfer object containing subject data.
	 * @returns A Subject domain object.
	 */
	static toDomain(dto: SubjectDTO): Subject {
		return new Subject(
			dto.IDSubject,
			dto.Nombre,
			dto.UrlImgMundo,
			dto.UrlImgDentro,
			dto.Posicion,
			dto.Abierto,
			dto.Visible
		);
	}

	/**
	 * Converts a Subject domain model to a SubjectDTO.
	 * @param subject - The domain model representing a subject.
	 * @returns A SubjectDTO formatted for external use.
	 */
	static toDTO(subject: Subject): SubjectDTO {
		return {
			IDSubject: subject.id,
			Nombre: subject.name,
			UrlImgMundo: subject.img,
			UrlImgDentro: subject.imgBackground,
			Posicion: subject.position,
			Abierto: subject.isOpen,
			Visible: subject.isVisible
		};
	}

	/**
	 * Maps a SubjectCreate structure to a SubjectCreateDTO.
	 * @param subjectCreate - The domain data required to create a subject.
	 * @returns A SubjectCreateDTO for transmission or persistence.
	 */
	static toCreateDTO(subjectCreate: SubjectCreate): SubjectCreateDTO {
		return {
			Nombre: subjectCreate.name,
			UrlImgMundo: subjectCreate.img,
			UrlImgDentro: subjectCreate.imgBackground
		};
	}

	/**
	 * Maps a SubjectUpdate structure to a SubjectUpdateDTO.
	 * @param subjectUpdate - The updated subject data.
	 * @returns A SubjectUpdateDTO suitable for update operations.
	 */
	static toUpdateDTO(subjectUpdate: SubjectUpdate): SubjectUpdateDTO {
		return {
			Nombre: subjectUpdate.name,
			UrlImgMundo: subjectUpdate.img,
			UrlImgDentro: subjectUpdate.imgBackground
		};
	}

	/**
	 * Converts a boolean to a SubjectUpdateOpenDTO format.
	 * @param newState - The new open state of the subject.
	 * @returns A DTO representing the updated open status.
	 */
	static toUpdateOpenDTO(newState: boolean): SubjectUpdateOpenDTO {
		return {
			Abierto: newState
		};
	}

	/**
	 * Converts a boolean to a SubjectUpdateVisibleDTO format.
	 * @param newState - The new visibility state of the subject.
	 * @returns A DTO representing the updated visibility status.
	 */
	static toUpdateVisibleDTO(newState: boolean): SubjectUpdateVisibleDTO {
		return {
			Visible: newState
		};
	}
}
