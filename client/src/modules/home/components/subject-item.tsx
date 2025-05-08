import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../../constants/routes';
import { Subject } from '../../shared/api/domain/subject';

import '../styles/subject-item.css';

/**
 * @property {Subject} subject - The subject to display.
 */
interface SubjectProps {
  subject: Subject;
}

/**
 * SubjectItem is a functional component that renders an individual subject item, which includes an image
 * and its name. If the subject is visible and open, the item is clickable, and navigating
 * to the `GAME_SELECTOR` route for the given subject ID occurs upon click.
 */
const SubjectItem: React.FC<SubjectProps> = ({ subject }) => {
  if (!subject.isVisible) return null;

  const navigate = useNavigate();

  const handleClick = () => {
    if (subject.isOpen) navigate(ROUTES.GAME_SELECTOR(subject.id));
  };

  const subjectClassName = subject.isOpen
    ? 'subject-item'
    : 'subject-item-disabled';

  return (
    <div className={subjectClassName} onClick={() => handleClick()}>
      <img
        className="subject-item-img"
        src={subject.img}
        onError={(e) => {
          e.currentTarget.src = '/images/default_subject_image.png';
        }}
        alt={subject.name}
      ></img>
      <div className="subject-item-img-overlay">
        <p>{subject.isOpen ? subject.name : '🔒Closed!'}</p>
      </div>
    </div>
  );
};

export default SubjectItem;
