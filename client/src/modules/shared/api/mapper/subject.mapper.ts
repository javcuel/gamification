import { Subject } from '../domain/subject';
import { SubjectDTO, SubjectUpdateOpenDTO, SubjectUpdateVisibleDTO } from '../dto/subject.dto';
import { API_URLS } from '../../../../constants/apiUrls';

export class SubjectMapper {
	/**
	* Helper to ensure that local images point to the backend port
	* and not to the React development server port.
	*/
	private static getFullImageUrl(path: string): string {
		if (!path) return '';
		
		// If the user manually entered an external URL, we respect it.
		if (path.startsWith('http')) return path;
		
		// We use application's native constant 
		return `${API_URLS.SERVER_URL}${path}`;
	}

	static toDomain(dto: SubjectDTO): Subject {
		return new Subject(
			dto.IDSubject,
			dto.Name,
			SubjectMapper.getFullImageUrl(dto.UrlImgSubject), 
			SubjectMapper.getFullImageUrl(dto.UrlImgInside),
			dto.Position,
			dto.Open === 1,
			dto.Visible === 1
		);
	}

	static toUpdateOpenDTO(isOpen: boolean): SubjectUpdateOpenDTO {
		return {
			Open: isOpen ? 1 : 0
		};
	}

	static toUpdateVisibleDTO(isVisible: boolean): SubjectUpdateVisibleDTO {
		return {
			Visible: isVisible ? 1 : 0
		};
	}
}