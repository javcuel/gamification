import httpClient from '../../../../adapters/api/httpClient';
import { Subject } from '../../../../entities/subject';

export const fetchSubjects = async (): Promise<Subject[]> => {
  try {
    const apiResponse = await httpClient.get('/subjects/');
    return apiResponse.map((subject: any) => ({
      id: subject.IDMundo,
      name: subject.Nombre,
      img: subject.UrlImgMundo,
      imgBackground: subject.UrlImgDentro,
      isOpen: subject.Abierto,
      isVisible: subject.Visible,
      position: subject.Posicion,
    }));
  } catch (error) {
    console.error('Error fetching subjects data');
    throw new Error('Error fetching subjects data');
  }
  /* try {
    return [
      {
        id: 1,
        name: 'Matemáticas',
        img: 'images/imagesPlanets/purple_planet.png',
        imgBackground: '',
        isOpen: false,
        isVisible: true,
        position: 1,
      },
      {
        id: 1,
        name: 'Matemáticas',
        img: 'images/imagesPlanets/purple_planet.png',
        imgBackground: '',
        isOpen: true,
        isVisible: true,
        position: 1,
      },
      {
        id: 1,
        name: 'Matemáticas',
        img: 'images/imagesPlanets/purple_planet.png',
        imgBackground: '',
        isOpen: true,
        isVisible: true,
        position: 1,
      },
      {
        id: 1,
        name: 'Matemáticas',
        img: 'images/imagesPlanets/purple_planet.png',
        imgBackground: '',
        isOpen: false,
        isVisible: true,
        position: 1,
      },
      {
        id: 1,
        name: 'Matemáticas',
        img: 'images/imagesPlanets/purple_planet.png',
        imgBackground: '',
        isOpen: true,
        isVisible: true,
        position: 1,
      },
    ];
  } catch (error) {
    console.error('Error fetching subjects data');
    throw new Error('Error fetching subjects data');
  } */
};
