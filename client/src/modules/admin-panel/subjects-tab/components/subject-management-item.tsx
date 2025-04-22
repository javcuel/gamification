import {
  faEye,
  faEyeSlash,
  faLock,
  faPencilAlt,
  faTimes,
  faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Subject } from '../../../../basura/subject';
import useDeleteSubject from '../../hooks/use-delete-subject';
import useExpandSubject from '../../hooks/use-expand-subject';
import useToggleSubjectOpenState from '../../hooks/use-toggle-subject-open-state';
import useToggleSubjectVisibleState from '../../hooks/use-toggle-subject-visible-state';
import useUpdateSubject from '../hooks/use-edit-subject';

import ErrorMsg from '../../../shared/components/ui/ErrorMsg';
import GameManagementItem from './game-management-item';
import SubjectEditModal from './subject-edit-modal';

import '../../styles/SubjectManagementItem.css';

interface SubjectiItemProps {
  subject: Subject;
  onSubjectDeleted: (subjectId: number) => void;
}

const SubjectManagementItem: React.FC<SubjectiItemProps> = ({
  subject,
  onSubjectDeleted,
}) => {
  const [isEditing, setIsEditing] = useState(false);

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
    updateSubject,
    loading: updateLoading,
    error: updateError,
  } = useUpdateSubject(() => {
    setIsEditing(false); // o también podrías refetchear la lista
  });

  const {
    deleteSubject,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteSubject(onSubjectDeleted);

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      deleteSubject(subject.id);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveSubject = (updatedData: {
    name: string;
    img: string;
    imgBackground: string;
  }) => {
    updateSubject(subject.id, updatedData);
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

          <button
            className="subject-management-item-button"
            onClick={handleEditClick}
          >
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
      {updateError && <ErrorMsg message={updateError} />}
      {deleteError && <ErrorMsg message={deleteError} />}
      {expandError && <ErrorMsg message={expandError} />}

      {loading && <div>Loading games...</div>}
      {updateLoading && <div>Loading update...</div>}

      <div
        className={`subject-expand-container ${isExpanded ? 'expanded' : ''}`}
      >
        {games.map((game) => (
          <GameManagementItem key={game.id} game={game} />
        ))}
      </div>
      {isEditing && (
        <SubjectEditModal
          data={{
            name: subject.name,
            img: subject.img,
            imgBackground: subject.imgBackground,
          }}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveSubject}
        />
      )}
    </div>
  );
};

export default SubjectManagementItem;
