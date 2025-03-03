import React from 'react';
import { Game } from '../../../entities/game';

interface GameProps {
  game: Game;
  /* onClick: () => void; */
}
const handleClick = () => {
  console.log('CLikc en juego');
};

const GameItem: React.FC<GameProps> = ({ game }) => {
  //TODO: COMPROBAR SI SE ESTAN OBTIENDO LOS OBJECTOS NO VISIBLES DE LA BASE DE DATOS, SI NO SE OBTIENEN ESTO ES UNREACHEABLE CODE.
  /*  if(!subject.isVisible){
    return null;
  } */

  const gameClassName = game.isOpen
    ? 'image-container'
    : 'image-container-disabled';

  //TODO: IMAGEN PROVISIONAL, SUSTITUIR POR GAME.IMG
  return (
    <div className={gameClassName}>
      <img
        className="button-img"
        src={'/images/imagesGames/apuntados.png'}
        alt={game.name}
        onClick={() => handleClick()}
      ></img>
      <div className="image-overlay">
        <p>{game.name}</p>
      </div>
    </div>
  );
};

export default GameItem;
