import { Game } from '../../../../entities/game';

export const fetchGames = async (): Promise<Game[]> => {
  return [
    {
      id: 94,
      idSubject: 1,
      img: 'images/imagesGames/apuntados.png',
      name: 'Apuntados',
      maxScore: 2000,
      isOpen: true,
      isVisible: true,
      position: 1,
    },
    {
      id: 94,
      idSubject: 1,
      img: 'images/imagesGames/apilados.png',
      name: 'Apuntados',
      maxScore: 2000,
      isOpen: true,
      isVisible: true,
      position: 1,
    },
    {
      id: 94,
      idSubject: 1,
      img: 'images/imagesGames/cafeteria.png',
      name: 'Apuntados',
      maxScore: 2000,
      isOpen: true,
      isVisible: true,
      position: 1,
    },
    {
      id: 94,
      idSubject: 1,
      img: 'images/imagesGames/caidaDatos.png',
      name: 'Apuntados',
      maxScore: 2000,
      isOpen: false,
      isVisible: true,
      position: 1,
    },
  ];
};
