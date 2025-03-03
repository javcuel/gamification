import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Subject } from '../../../entities/subject';

interface SubjectProps {
  subject: Subject;
  /* onClick: () => void; */
}

const SubjectItem: React.FC<SubjectProps> = ({ subject }) => {
  //TODO: COMPROBAR SI SE ESTAN OBTIENDO LOS OBJECTOS NO VISIBLES DE LA BASE DE DATOS, SI NO SE OBTIENEN ESTO ES UNREACHEABLE CODE.
  /*  if(!subject.isVisible){
    return null;
  } */

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/GameSelector/${subject.id}`);
  };

  const subjectClassName = subject.isOpen
    ? 'image-container'
    : 'image-container-disabled';
  //TODO: IMAGEN PROVISIONAL, SUSTITUIR POR SUBJECT.IMG
  return (
    <div className={subjectClassName}>
      <img
        className="button-img"
        src={'images/imagesPlanets/purple_planet.png'}
        alt={subject.name}
        onClick={() => handleClick()}
      ></img>
      <div className="image-overlay">
        <p>{subject.name}</p>
      </div>
    </div>
  );
};

export default SubjectItem;
