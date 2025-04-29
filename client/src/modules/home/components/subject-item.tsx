import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Subject } from '../../shared/api/domain/subject';
import { ROUTES } from '../../../constants/routes';

import '../../shared/styles/subject-item.css';

interface SubjectProps {
  subject: Subject;
}

/**
 * The SubjectItem component renders an individual subject item, which includes an image
 * and its name. If the subject is visible and open, the item is clickable, and navigating
 * to the `GAME_SELECTOR` route for the given subject ID occurs upon click.
 *
 * @component
 *
 * @param {SubjectProps} props - The properties for the SubjectItem component.
 * @param {Subject} props.subject - The subject to be displayed.
 *
 * @returns {JSX.Element|null} A clickable subject item if visible, otherwise null.
 */
const SubjectItem: React.FC<SubjectProps> = ({ subject }) => {
  if (!subject.isVisible) return null;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.GAME_SELECTOR(subject.id));
  };

  const subjectClassName = subject.isOpen
    ? 'subject-item'
    : 'subject-item-disabled';

  return (
    <div className={subjectClassName} onClick={() => handleClick()}>
      <img
        className="subject-item-img"
        src={subject.img || '/images/no_image.jpg'}
        alt={subject.name}
      ></img>
      <div className="subject-item-img-overlay">
        <p>{subject.isOpen ? subject.name : '🔒'}</p>
      </div>
    </div>
  );
};

export default SubjectItem;
