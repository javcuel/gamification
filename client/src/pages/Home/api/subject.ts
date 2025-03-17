import httpClient from '../../../api/httpClient';
import { API_URLS } from '../../../constants/apiUrls';

export interface Subject {
  id: number;
  name: string;
  img: string;
  imgBackground: string;
  position: number;
  isOpen: boolean;
  isVisible: boolean;
}

interface SubjectApiResponse {
  IDMundo: number;
  Nombre: string;
  UrlImgMundo: string;
  UrlImgDentro: string;
  Abierto: boolean;
  Visible: boolean;
  Posicion: number;
}

export const fetchSubjects = async (): Promise<Subject[]> => {
  try {
    const data = await httpClient.get(API_URLS.GET_SUBJECTS);

    return data.map((subject: SubjectApiResponse) => ({
      id: subject.IDMundo,
      name: subject.Nombre,
      img: subject.UrlImgMundo,
      imgBackground: subject.UrlImgDentro,
      isOpen: subject.Abierto,
      isVisible: subject.Visible,
      position: subject.Posicion,
    }));
  } catch (error) {
    console.error('Error fetching subjects', error);
    throw new Error('Error to fetch subjects');
  }
};
