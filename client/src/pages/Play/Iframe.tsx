import React from 'react';
import { Game } from '../../api/game';

interface GameIframeProps {
  selectedGame: Game;
}

const Iframe: React.FC<GameIframeProps> = ({ selectedGame }) => {
  return (
    <div className="mt-3">
      <h2 className="text-center">Playing: {selectedGame.name}</h2>
      <iframe
        className="container custom-flex-center"
        title={selectedGame.name}
        src={`src/juegos/${selectedGame.id}/index.html`} // Cargar el juego usando su ID
        width="70%"
        height="700px"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default Iframe;
