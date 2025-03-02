import React from "react";
import { Game } from "../types/game";
import GameGridItem from "./GameGridItem";

interface GameGridListProps {
  games: Game[];
  onGameSelect: (game: Game) => void;
}

const GameGrid: React.FC<GameGridListProps> = ({ games, onGameSelect }) => {
  return (
    <div className="row">
      {games.map((game) => (
        <GameGridItem
          key={game.gameId}
          game={game}
          onClick={() => onGameSelect(game)} // Llama a onGameSelect al hacer clic en el juego
        />
      ))}
    </div>
  );
};

export default GameGrid;
