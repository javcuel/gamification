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

import GameItem from './GameItem';

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
    error: ExpandError,
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
    <div className="custom-admin-panel-subject-item">
      <div className="d-flex justify-content-between align-items-center">
        <div onClick={toggleExpand} style={{ cursor: 'pointer' }}>
          {/* TODO: Replace with actual subject.imgsubjectUrl */}
          <img
            src={'src/assets/images/imagesPlanets/purple_planet.png'}
            alt={subject.name}
            width="60"
            className="me-3"
          />
          <strong>{subject.name}</strong>
        </div>
        <div>
          <button className={'btn custom-button m-1'} onClick={toggleOpenState}>
            <FontAwesomeIcon icon={isOpen ? faUnlock : faLock} />
          </button>

          <button
            className={'btn custom-button m-1'}
            onClick={toggleVisibleState}
          >
            <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} />
          </button>

          <button className="btn custom-button m-1">
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>

          <button
            className="btn custom-button m-1"
            onClick={handleDeleteClick}
            disabled={deleteLoading}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>

      {visibleError && <div className="text-danger">{visibleError}</div>}
      {openError && <div className="text-danger">{openError}</div>}
      {deleteError && <div className="text-danger">{deleteError}</div>}

      {ExpandError && <div className="text-danger">{ExpandError}</div>}

      {loading && <div>Loading games...</div>}

      {isExpanded &&
        games.map((game) => <GameItem key={game.id} game={game} />)}
    </div>
  );
};

export default SubjectManagementItem;
