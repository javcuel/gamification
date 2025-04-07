import { useEffect, useState } from 'react';
import { Game } from '../../../api/game';

const useGame = (subjectId: number) => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        /*  const data = await GameApi.getAll(subjectId); */

        const data = [
          {
            id: 1,
            idSubject: 1,
            img: '',
            name: 'Juego',
            maxScore: 8000,
            isOpen: true,
            isVisible: true,
            position: 1,
            idUser: 2,
            isNew: true,
            uploaded: true,
          },
          {
            id: 1,
            idSubject: 1,
            img: '',
            name: 'Juego',
            maxScore: 8000,
            isOpen: true,
            isVisible: true,
            position: 1,
            idUser: 2,
            isNew: true,
            uploaded: true,
          },
          {
            id: 1,
            idSubject: 1,
            img: '',
            name: 'Juego',
            maxScore: 8000,
            isOpen: true,
            isVisible: true,
            position: 1,
            idUser: 2,
            isNew: true,
            uploaded: true,
          },
          {
            id: 1,
            idSubject: 1,
            img: '',
            name: 'Juego',
            maxScore: 8000,
            isOpen: true,
            isVisible: true,
            position: 1,
            idUser: 2,
            isNew: true,
            uploaded: true,
          },
          {
            id: 1,
            idSubject: 1,
            img: '',
            name: 'Juego',
            maxScore: 8000,
            isOpen: true,
            isVisible: true,
            position: 1,
            idUser: 2,
            isNew: true,
            uploaded: true,
          },

          {
            id: 1,
            idSubject: 1,
            img: '',
            name: 'Juego',
            maxScore: 8000,
            isOpen: true,
            isVisible: true,
            position: 1,
            idUser: 2,
            isNew: true,
            uploaded: true,
          },
          {
            id: 1,
            idSubject: 1,
            img: '',
            name: 'Juego',
            maxScore: 8000,
            isOpen: true,
            isVisible: true,
            position: 1,
            idUser: 2,
            isNew: true,
            uploaded: true,
          },
          {
            id: 1,
            idSubject: 1,
            img: '',
            name: 'Juego',
            maxScore: 8000,
            isOpen: true,
            isVisible: true,
            position: 1,
            idUser: 2,
            isNew: true,
            uploaded: true,
          },
          {
            id: 1,
            idSubject: 1,
            img: '',
            name: 'Juego',
            maxScore: 8000,
            isOpen: true,
            isVisible: true,
            position: 1,
            idUser: 2,
            isNew: true,
            uploaded: true,
          },
          {
            id: 1,
            idSubject: 1,
            img: '',
            name: 'Juego',
            maxScore: 8000,
            isOpen: true,
            isVisible: true,
            position: 1,
            idUser: 2,
            isNew: true,
            uploaded: true,
          },
          {
            id: 1,
            idSubject: 1,
            img: '',
            name: 'Juego',
            maxScore: 8000,
            isOpen: true,
            isVisible: true,
            position: 1,
            idUser: 2,
            isNew: true,
            uploaded: true,
          },
          {
            id: 1,
            idSubject: 1,
            img: '',
            name: 'Juego',
            maxScore: 8000,
            isOpen: true,
            isVisible: true,
            position: 1,
            idUser: 2,
            isNew: true,
            uploaded: true,
          },
          {
            id: 1,
            idSubject: 1,
            img: '',
            name: 'Juego',
            maxScore: 8000,
            isOpen: true,
            isVisible: true,
            position: 1,
            idUser: 2,
            isNew: true,
            uploaded: true,
          },
          {
            id: 1,
            idSubject: 1,
            img: '',
            name: 'Juego',
            maxScore: 8000,
            isOpen: true,
            isVisible: true,
            position: 1,
            idUser: 2,
            isNew: true,
            uploaded: true,
          },
        ];
        setGames(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    loadGames();
  }, [subjectId]);

  return { games, error };
};

export default useGame;
