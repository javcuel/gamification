import {
  faEye,
  faEyeSlash,
  faLock,
  faPencilAlt,
  faTimes,
  faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Subject } from '../../../api/subject';
import useDeleteSubject from '../hooks/useDeleteSubject';
import useExpandSubject from '../hooks/useExpandSubject';
import useToggleSubjectOpenState from '../hooks/useToggleSubjectOpenState';
import useToggleSubjectVisibleState from '../hooks/useToggleSubjectVisibleState';

import ErrorMsg from '../../../pages/shared/ui/ErrorMsg';
import GameManagementItem from './GameManagementItem';

import '../styles/SubjectManagementItem.css';

interface SubjectiItemProps {
  subject: Subject;
  onSubjectDeleted: (subjectId: number) => void;
}

const SubjectManagementItem: React.FC<SubjectiItemProps> = ({
  subject,
  onSubjectDeleted,
}) => {
  const {
    games,
    isExpanded,
    error: expandError,
    loading,
    toggleExpand,
  } = useExpandSubject(subject.id);

  const {
    isOpen,
    error: openError,
    toggleOpenState,
  } = useToggleSubjectOpenState(subject.id, subject.isOpen);

  const {
    isVisible,
    error: visibleError,
    toggleVisibleState,
  } = useToggleSubjectVisibleState(subject.id, subject.isVisible);

  const {
    handleDeleteSubject,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteSubject(onSubjectDeleted);

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      handleDeleteSubject(subject.id);
    }
  };

  return (
    <div className="subject-management-item">
      <div className="d-flex justify-content-between align-items-center">
        <div onClick={toggleExpand}>
          {/* TODO: Replace with actual subject.imgsubjectUrl */}
          <img
            src={'images/no_image.jpg'}
            alt={subject.name}
            width="15%"
            className="subject-management-item-image me-3"
          />
          {subject.name}
        </div>
        <div>
          <button
            className="subject-management-item-button"
            onClick={toggleOpenState}
          >
            <FontAwesomeIcon icon={isOpen ? faUnlock : faLock} />
          </button>

          <button
            className="subject-management-item-button"
            onClick={toggleVisibleState}
          >
            <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} />
          </button>

          <button className="subject-management-item-button">
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>

          <button
            className="subject-management-item-button"
            onClick={handleDeleteClick}
            disabled={deleteLoading}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>

      {visibleError && <ErrorMsg message={visibleError} />}
      {openError && <ErrorMsg message={openError} />}
      {deleteError && <ErrorMsg message={deleteError} />}
      {expandError && <ErrorMsg message={expandError} />}
      {loading && <div>Loading games...</div>}

      {isExpanded &&
        games.map((game) => <GameManagementItem key={game.id} game={game} />)}
    </div>
  );
};

export default SubjectManagementItem;
