import httpClient from '../../../api/httpClient';

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
    const data = await httpClient.get('/subjects/');

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

/* import axios from 'axios';

// Main entity type
export interface Subject {
  id: number;
  name: string;
  img: string;
  imgBackground: string;
  position: number;
  isOpen: boolean;
  isVisible: boolean;
}

// Type for create/update
export interface SubjectRequestDTO {
  name: string;
  img: string;
  imgBackground: string;
  position: number;
  isOpen: boolean;
  isVisible: boolean;
}

const API_URL = '/api/Subjects';

// Service object to manage subjects
// Provides methods for CRUD operations and search
export const SubjectApi = {
  getById: (id: number) => axios.get<Subject>(`${API_URL}/${id}`),

  getAll: () => axios.get<Subject[]>(API_URL),

  create: (data: SubjectRequestDTO) => axios.post<Subject>(API_URL, data),

  update: (id: number, data: SubjectRequestDTO) =>
    axios.put<Subject>(`${API_URL}/${id}`, data),

  delete: (id: number) => axios.delete(`${API_URL}/${id}`),
}; */
