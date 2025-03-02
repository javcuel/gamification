import React from 'react';
import { World } from '../../../entities/world';
import '../styles/world-card.css';
import LockedButton from './LockedButton';
import { Subject } from '../../../entities/subject';

interface SubjectProps {
  subject: Subject;
}

const WorldGridItem: React.FC<SubjectProps> = ({ subject }) => {
  //TODO: COMPROBAR SI SE ESTAN OBTIENDO LOS OBJECTOS NO VISIBLES DE LA BASE DE DATOS, SI NO SE OBTIENEN ESTO ES UNREACHEABLE CODE.
  /*  if(!subject.isVisible){
    return null;
  } */

  return (
    <div className="col d-flex align-items-stretch">
      {' '}
      <div className="card text-center custom-world-card">
        {/*TODO: IMAGEN PROVISIONAL HASTA QUE SE OBTENGA CORRECTAMENTE LA IMAGEN DE LA BD 
      src={world.imgWorldUrl}*/}
        <img
          src={'src/assets/images/imagesPlanets/purple_planet.png'}
          className="card-img-top"
          alt={world.name}
        />
        <div className="card-body">
          <h5 className="card-title">{world.name}</h5>
          <hr />
          {world.isOpen ? (
            <a
              href="/GameSelector"
              className="btn custom-button"
              style={{
                pointerEvents: 'auto',
                opacity: 1,
              }}
            >
              ¡Let's Go!
            </a>
          ) : (
            <LockedButton label="Locked" />
          )}
        </div>
      </div>
    </div>
  );
};

export default WorldGridItem;
