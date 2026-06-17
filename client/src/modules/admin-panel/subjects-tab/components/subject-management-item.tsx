import React, { useState } from 'react';
import { Subject, SubjectUpdate } from '../../../shared/api/domain/subject';
import Button from '../../../shared/components/ui/Button';
import Toast from '../../../shared/components/ui/toast';
import useDeleteSubject from '../hooks/use-delete-subject';
import useExpandLinked from '../hooks/use-expand-linked-games';
import useExpandUnlinked from '../hooks/use-expand-unlinked-games';
import useContentActions from '../hooks/use-content-actions';
import useToggleSubjectOpenState from '../hooks/use-toggle-subject-open-state';
import useToggleSubjectVisibleState from '../hooks/use-toggle-subject-visible-state';
import useUpdateSubject from '../hooks/use-update-subject';
import '../styles/subject-management-item.css';
import SubjectEditModal from './subject-edit-modal';
import SubjectGameLinkItem from './subject-game-link-item';
import SubjectGroupSection from './subject-group-section';

interface SubjectiItemProps {
	subject: Subject;
	onSubjectDeleted: (subjectId: number) => void;
	onSubjectUpdated: () => void; 
}

const SubjectManagementItem: React.FC<SubjectiItemProps> = ({
	subject,
	onSubjectDeleted,
	onSubjectUpdated 
}) => {
	const [isEditing, setIsEditing] = useState(false);
	

	const [showGamesMenu, setShowGamesMenu] = useState(false);
	const [isGroupsExpanded, setIsGroupsExpanded] = useState(false);


	const {
		linkedGames,
		setLinkedGames,
		isExpanded,
		error: expandError,
		loading: loadingLinked,
		toggleExpand
	} = useExpandLinked(subject.id);


	const {
		unlinkedGames,
		setUnlinkedGames,
		isAdding,
		loading: loadingUnlinked,
		error: availableError,
		toggleAddMode
	} = useExpandUnlinked(subject.id);


	const { updateSubject, loading: updateLoading, error: updateError } = useUpdateSubject(() => {
		setIsEditing(false);
		onSubjectUpdated();
	});
	
	const { isOpen, error: openError, toggleOpenState } = useToggleSubjectOpenState(subject);
	const { isVisible, error: visibleError, toggleVisibleState } = useToggleSubjectVisibleState(subject);
	const { deleteSubject, loading: deleteLoading, error: deleteError } = useDeleteSubject(onSubjectDeleted);

	const handleSaveSubject = (updatedData: SubjectUpdate) => {
		
		const dataToUpdate = new SubjectUpdate(
			updatedData.name, 
			updatedData.img, 
			updatedData.imgBackground, 
			updatedData.imageFile, 
			updatedData.bgImageFile
		);
		
		updateSubject(subject.id, dataToUpdate);
	};

	const handleDeleteClick = () => {
		if (window.confirm('Are you sure you want to delete this subject?')) {
			deleteSubject(subject.id);
		}
	};

	const { linkGame, unlinkGame, loading: contentLoading, error: contentError } = useContentActions({
		onLinkSuccess: (gameId) => {
			const movedGame = unlinkedGames.find(g => g.id === gameId);
			if (movedGame) {
				setLinkedGames(prev => [...prev, movedGame]);
				setUnlinkedGames(prev => prev.filter(g => g.id !== gameId));
			}
		},
		onUnlinkSuccess: (gameId) => {
			const movedGame = linkedGames.find(g => g.id === gameId);
			if (movedGame) {
				setUnlinkedGames(prev => [...prev, movedGame]);
				setLinkedGames(prev => prev.filter(g => g.id !== gameId));
			}
		}
	});

    const handleGameUnlinked = (gameId: number) => {
        if (window.confirm('Are you sure you want to unlink this game?')) {
            unlinkGame(subject.id, gameId);
        }
	}
	
	const handleGameLinked = (gameId: number) => {
		if (window.confirm('Are you sure you want to link this game?')) {
			linkGame(subject.id, gameId);
		}
	};

	const handleToggleGroups = () => {
		const willShow = !isGroupsExpanded;
		setIsGroupsExpanded(willShow);
		if (willShow) setShowGamesMenu(false);
	};

	const handleToggleGamesMenu = () => {
		const willShow = !showGamesMenu;
		setShowGamesMenu(willShow);
		if (willShow) {
			setIsGroupsExpanded(false);
			if (!isExpanded && !isAdding) {
				toggleExpand();
			}
		}
	};

	return (
		<div className='subject-management-item'>
			<div className='subject-item-header d-flex justify-content-between align-items-center'>
				<div className='subject-item-left d-flex align-items-center'>
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
				
				<div className='subject-item-buttons d-flex flex-nowrap gap-2 align-items-center'>
					<Button text="Participants" onClick={handleToggleGroups} />
					<Button text="Games" onClick={handleToggleGamesMenu} />
					<Button type={isOpen ? 'unlock' : 'lock'} onClick={toggleOpenState} />
					<Button type={isVisible ? 'visible' : 'hidden'} onClick={toggleVisibleState} />
					<Button type='edit' onClick={() => setIsEditing(true)} />
					<Button type='delete' onClick={handleDeleteClick} disabled={deleteLoading} />
				</div>
			</div>

			{(visibleError || openError || updateError || deleteError || expandError || availableError || contentError) && (
				<Toast type='error' message={contentError || expandError || availableError || "Operation error"} />
			)}

			{(loadingLinked || loadingUnlinked || contentLoading) && (
                <div className="p-2 text-info small">Processing...</div>
            )}
			
			{/* GAMES SECTION */}
			<div className={`subject-expand-container ${showGamesMenu ? 'expanded' : ''}`}>
				{showGamesMenu && (
					<div className="p-3 border-top bg-light bg-opacity-10">
						
						{/* Game Tabs */}
						<div className="d-flex gap-2 mb-3">
							<button 
								className={`btn btn-sm ${isExpanded ? 'btn-primary' : 'btn-outline-primary'}`}
								onClick={() => {
									if (!isExpanded) toggleExpand();
									if (isAdding) toggleAddMode();
								}}
							>
								Linked games
							</button>
							<button 
								className={`btn btn-sm ${isAdding ? 'btn-primary' : 'btn-outline-primary'}`}
								onClick={() => {
									if (!isAdding) toggleAddMode();
									if (isExpanded) toggleExpand();
								}}
							>
								Not linked games
							</button>
						</div>

						{/* Linked list */}
						{isExpanded && (
							<div className="games-list">
								{linkedGames.length > 0 ? (
									linkedGames.map(game => (
										<SubjectGameLinkItem
											key={game.id}
											game={game}
											actionType="delete"
											buttonText="Unlink"
											disabled={contentLoading}
											onActionClick={() => handleGameUnlinked(game.id)}
                                            subjectId={subject.id} 
										/>
									))
								) : (
									!loadingLinked && <div className="p-2 text-muted small">This subject does not have linked games.</div>
								)}
							</div>
						)}

						{/* Unlinked list */}
						{isAdding && (
							<div className="games-list">
								{unlinkedGames.map(game => (
									<SubjectGameLinkItem
										key={game.id}
										game={game}
										actionType="add"
										buttonText="Link"
										disabled={contentLoading}
										onActionClick={() => handleGameLinked(game.id)}
                                        subjectId={subject.id} 
									/>
								))}
								{unlinkedGames.length === 0 && !loadingUnlinked && (
									<div className="p-2 text-muted small italic">There are no more available games for this subject</div>
								)}
							</div>
						)}
					</div>
				)}
			</div>
			
			{/* Participants section */}
			<div className={`subject-expand-container ${isGroupsExpanded ? 'expanded' : ''}`}>
				{isGroupsExpanded && (
					<div className="p-3 border-top bg-light bg-opacity-10">
						<SubjectGroupSection subjectId={subject.id} />
					</div>
				)}
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