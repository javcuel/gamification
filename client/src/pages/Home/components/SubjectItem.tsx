import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Subject } from '../api/subject';
import { ROUTES } from '../../../constants/routes';

interface SubjectProps {
  subject: Subject;
}

const SubjectItem: React.FC<SubjectProps> = ({ subject }) => {
  if (!subject.isVisible) return null;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.GAME_SELECTOR(subject.id));
  };

  const subjectClassName = subject.isOpen
    ? 'image-container'
    : 'image-container-disabled';

  return (
    <div className={subjectClassName} onClick={() => handleClick()}>
      <img
        className="button-img"
        src={subject.img || 'images/no_image.jpg'}
        alt={subject.name}
      ></img>
      <div className="image-overlay">
        <p>{subject.name}</p>
      </div>
    </div>
  );
};

export default SubjectItem;
