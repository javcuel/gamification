import { useState } from "react";
import { Game } from "../types/game";

const useSelectedGame = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const loadGame = (game: Game) => {
    setSelectedGame(game);
  };

  return { selectedGame, loadGame };
};

export default useSelectedGame;
