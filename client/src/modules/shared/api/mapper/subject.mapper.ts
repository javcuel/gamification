import { Subject } from '../domain/subject';

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

  static toCreateDTO(subject: Subject): SubjectCreateDTO {
    return {
      Nombre: subject.name,
      UrlImgMundo: subject.img,
      UrlImgDentro: subject.imgBackground,
    };
  }

  static toUpdateDTO(subject: Subject): SubjectUpdateDTO {
    return {
      IDMundo: subject.id,
      Nombre: subject.name,
      UrlImgMundo: subject.img,
      UrlImgDentro: subject.imgBackground,
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
