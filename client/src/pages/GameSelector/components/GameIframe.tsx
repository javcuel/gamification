import React from 'react';
import { Game } from '../types/game';

interface GameIframeProps {
  selectedGame: Game;
}

const GameIframe: React.FC<GameIframeProps> = ({ selectedGame }) => {
  return (
    <div className="mt-3">
      <h2 className="text-center">Playing: {selectedGame.gameName}</h2>
      <iframe
        className="container custom-flex-center"
        title={selectedGame.gameName}
        src={`src/juegos/${selectedGame.gameId}/index.html`} // Cargar el juego usando su ID
        width="70%"
        height="700px"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default GameIframe;
