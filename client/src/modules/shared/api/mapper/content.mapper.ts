import { ContentUpdateOpenDTO, ContentUpdateVisibleDTO } from '../dto/content.dto';

export class ContentMapper {
	static toUpdateOpenDTO(isOpen: boolean): ContentUpdateOpenDTO {
		return {
			Open: isOpen ? 1 : 0
		};
	}

	static toUpdateVisibleDTO(isVisible: boolean): ContentUpdateVisibleDTO {
		return {
			Visible: isVisible ? 1 : 0
		};
	}
}