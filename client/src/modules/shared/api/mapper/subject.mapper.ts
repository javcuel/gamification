import { Subject, SubjectCreate, SubjectUpdate } from '../domain/subject';

import {
  SubjectCreateDTO,
  SubjectDTO,
  SubjectUpdateDTO,
  SubjectUpdateOpenDTO,
  SubjectUpdateVisibleDTO,
} from '../dto/subject.dto';

export class SubjectMapper {
  static toDomain(dto: SubjectDTO): Subject {
    return new Subject(
      dto.IDMundo,
      dto.Nombre,
      dto.UrlImgMundo,
      dto.UrlImgDentro,
      dto.Posicion,
      dto.Abierto,
      dto.Visible
    );
  }

  static toDTO(subject: Subject): SubjectDTO {
    return {
      IDMundo: subject.id,
      Nombre: subject.name,
      UrlImgMundo: subject.img,
      UrlImgDentro: subject.imgBackground,
      Posicion: subject.position,
      Abierto: subject.isOpen,
      Visible: subject.isVisible,
    };
  }

  static toCreateDTO(subjectCreate: SubjectCreate): SubjectCreateDTO {
    return {
      Nombre: subjectCreate.name,
      UrlImgMundo: subjectCreate.img,
      UrlImgDentro: subjectCreate.imgBackground,
    };
  }

  static toUpdateDTO(subjectUpdate: SubjectUpdate): SubjectUpdateDTO {
    return {
      Nombre: subjectUpdate.name,
      UrlImgMundo: subjectUpdate.img,
      UrlImgDentro: subjectUpdate.imgBackground,
    };
  }

  static toUpdateOpenDTO(newState: boolean): SubjectUpdateOpenDTO {
    return {
      Abierto: newState,
    };
  }
  static toUpdateVisibleDTO(newState: boolean): SubjectUpdateVisibleDTO {
    return {
      Visible: newState,
    };
  }
}
