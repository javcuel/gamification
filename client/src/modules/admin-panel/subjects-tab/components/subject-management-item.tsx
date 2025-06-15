import React, { useState } from 'react';
import { Subject, SubjectUpdate } from '../../../shared/api/domain/subject';
import Button from '../../../shared/components/ui/button';
import Toast from '../../../shared/components/ui/toast';
import useDeleteSubject from '../hooks/use-delete-subject';
import useExpandSubject from '../hooks/use-expand-subject';
import useToggleSubjectOpenState from '../hooks/use-toggle-subject-open-state';
import useToggleSubjectVisibleState from '../hooks/use-toggle-subject-visible-state';
import useUpdateSubject from '../hooks/use-update-subject';
import '../styles/subject-management-item.css';
import GameManagementItem from './game-management-item';
import SubjectEditModal from './subject-edit-modal';

interface SubjectiItemProps {
	subject: Subject;
	onSubjectDeleted: (subjectId: number) => void;
}

const SubjectManagementItem: React.FC<SubjectiItemProps> = ({
	subject,
	onSubjectDeleted
}) => {
	const [isEditing, setIsEditing] = useState(false);

	// Expand Subject and show games.
	const {
		games,
		setGames,
		isExpanded,
		error: expandError,
		loading,
		toggleExpand
	} = useExpandSubject(subject.id);

	// Update Subject data.
	const {
		updateSubject,
		loading: updateLoading,
		error: updateError
	} = useUpdateSubject(() => {
		setIsEditing(false);
	});

	// Update Open Subject State.
	const {
		isOpen,
		error: openError,
		toggleOpenState
	} = useToggleSubjectOpenState(subject);

	// Update Visible Subject State.
	const {
		isVisible,
		error: visibleError,
		toggleVisibleState
	} = useToggleSubjectVisibleState(subject);

	// Delete subject.
	const {
		deleteSubject,
		loading: deleteLoading,
		error: deleteError
	} = useDeleteSubject(onSubjectDeleted);

	// Handles update subject
	const handleSaveSubject = (updatedData: SubjectUpdate) => {
		const updatedSubject = new SubjectUpdate(
			updatedData.name,
			updatedData.img,
			updatedData.imgBackground
		);
		updateSubject(subject.id, updatedSubject);
	};

	// Handles edit modal
	const handleEditClick = () => {
		setIsEditing(true);
	};

	// Handles subject deletion
	const handleDeleteClick = () => {
		if (window.confirm('Are you sure you want to delete this subject?')) {
			deleteSubject(subject.id);
		}
	};
	// Handles Game deletion

	const handleGameDeleted = (gameId: number) => {
		setGames(prev => prev.filter(game => game.id !== gameId));
	};

	return (
		<div className='subject-management-item'>
			<div className='subject-item-header d-flex justify-content-between align-items-center'>
				<div
					className='subject-item-left d-flex align-items-center'
					onClick={toggleExpand}
				>
					<img
						src={subject.img}
						onError={e => {
							e.currentTarget.src = '/images/default_subject_image.png';
						}}
						alt={subject.name}
						className='subject-management-item-image me-3'
					/>
					<span>{subject.name}</span>
				</div>
				<div className='subject-item-buttons'>
					<Button type={isOpen ? 'unlock' : 'lock'} onClick={toggleOpenState} />
					<Button
						type={isVisible ? 'visible' : 'hidden'}
						onClick={toggleVisibleState}
					/>
					<Button type='edit' onClick={handleEditClick} />
					<Button
						type='delete'
						onClick={handleDeleteClick}
						disabled={deleteLoading}
					/>
				</div>
			</div>

			{visibleError && <Toast type='error' message={visibleError} />}
			{openError && <Toast type='error' message={openError} />}
			{updateError && <Toast type='error' message={updateError} />}
			{deleteError && <Toast type='error' message={deleteError} />}
			{expandError && <Toast type='error' message={expandError} />}

			{loading && <div>Loading games...</div>}
			{updateLoading && <div>Loading update...</div>}

			<div
				className={`subject-expand-container ${isExpanded ? 'expanded' : ''}`}
			>
				{games.map(game => (
					<GameManagementItem
						key={game.id}
						game={game}
						onGameDeleted={handleGameDeleted}
					/>
				))}
			</div>
			{isEditing && (
				<SubjectEditModal
					data={{
						name: subject.name,
						img: subject.img,
						imgBackground: subject.imgBackground
					}}
					onClose={() => setIsEditing(false)}
					onSave={handleSaveSubject}
				/>
			)}
		</div>
	);
};

export default SubjectManagementItem;
