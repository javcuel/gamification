import { useState } from 'react';
import { Game } from '../../../api/game';

//TODO: QUE HACE ESTE FICHERO?
const useSelectedGame = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const loadGame = (game: Game) => {
    setSelectedGame(game);
  };

  return { selectedGame, loadGame };
};

export default useSelectedGame;
