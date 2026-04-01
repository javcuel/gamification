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


interface SubjectiItemProps {
	subject: Subject;
	onSubjectDeleted: (subjectId: number) => void;
}

const SubjectManagementItem: React.FC<SubjectiItemProps> = ({
	subject,
	onSubjectDeleted
}) => {
	const [isEditing, setIsEditing] = useState(false);

	// 1. Juegos vinculados (Linked)
	const {
		linkedGames,
		setLinkedGames,
		isExpanded,
		error: expandError,
		loading: loadingLinked,
		toggleExpand
	} = useExpandLinked(subject.id);

	// 2. Juegos NO vinculados (Unlinked)
	const {
		unlinkedGames,
		setUnlinkedGames,
		isAdding,
		loading: loadingUnlinked,
		error: availableError,
		toggleAddMode
	} = useExpandUnlinked(subject.id);

	// Hooks de gestión de asignatura
	const { updateSubject, loading: updateLoading, error: updateError } = useUpdateSubject(() => setIsEditing(false));
	const { isOpen, error: openError, toggleOpenState } = useToggleSubjectOpenState(subject);
	const { isVisible, error: visibleError, toggleVisibleState } = useToggleSubjectVisibleState(subject);
	const { deleteSubject, loading: deleteLoading, error: deleteError } = useDeleteSubject(onSubjectDeleted);

	const handleSaveSubject = (updatedData: SubjectUpdate) => {
		updateSubject(subject.id, new SubjectUpdate(updatedData.name, updatedData.img, updatedData.imgBackground));
	};

	const handleDeleteClick = () => {
		if (window.confirm('Are you sure you want to delete this subject?')) {
			deleteSubject(subject.id);
		}
	};

	// 3. Acciones de Contenido (Link/Unlink)
	const { linkGame, unlinkGame, loading: contentLoading, error: contentError } = useContentActions({
		onLinkSuccess: (gameId) => {
			// Movemos el juego de 'disponibles' a 'vinculados' localmente
			const movedGame = unlinkedGames.find(g => g.id === gameId);
			if (movedGame) {
				setLinkedGames(prev => [...prev, movedGame]);
				setUnlinkedGames(prev => prev.filter(g => g.id !== gameId));
			}
		},
		onUnlinkSuccess: (gameId) => {
			// Movemos el juego de 'vinculados' a 'disponibles' localmente
			const movedGame = linkedGames.find(g => g.id === gameId);
			if (movedGame) {
				setUnlinkedGames(prev => [...prev, movedGame]);
				setLinkedGames(prev => prev.filter(g => g.id !== gameId));
			}
		}
	});

    const handleGameUnlinked = (gameId: number) => {
        if (window.confirm('Are you sure you want to unlink this game?')) {
            unlinkGame(subject.id, gameId); //
        }
	}
	const handleGameLinked = (gameId: number) => {
		if (window.confirm('Are you sure you want to link this game?')) {
			linkGame(subject.id, gameId); //
		}
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
                    {/* Botón para gestionar vinculación (icono visible/ojo según tu código) */}
					<Button 
						type='visible' 
						onClick={toggleAddMode} 
					/>
					<Button type={isOpen ? 'unlock' : 'lock'} onClick={toggleOpenState} />
					<Button
						type={isVisible ? 'visible' : 'hidden'}
						onClick={toggleVisibleState}
					/>
					<Button type='edit' onClick={() => setIsEditing(true)} />
					<Button
						type='delete'
						onClick={handleDeleteClick}
						disabled={deleteLoading}
					/>
				</div>
			</div>

			{/* Renderizado de errores combinados */}
			{(visibleError || openError || updateError || deleteError || expandError || availableError || contentError) && (
				<Toast 
                    type='error' 
                    message={contentError || expandError || availableError || "Error en la operación"} 
                />
			)}

            {/* Indicadores de carga de datos y de acciones */}
			{(loadingLinked || loadingUnlinked || contentLoading) && (
                <div className="p-2 text-info small">Procesando...</div>
            )}
			
			{/* Sección de juegos NO VINCULADOS (Unlinked) */}
			<div className={`subject-expand-container ${isAdding ? 'expanded' : ''}`}>
				{isAdding && (
					<div className="p-3 border-bottom">
						<small className="text-muted d-block mb-3 fw-bold text-uppercase" style={{ fontSize: '0.7rem' }}>
                            Juegos disponibles para vincular
                        </small>
						{unlinkedGames.map(game => (
							<SubjectGameLinkItem
								key={game.id}
								game={game}
								actionType="edit"
								buttonText="Link"
                                disabled={contentLoading}
								onActionClick={() => handleGameLinked(game.id)}
							/>
						))}
						{unlinkedGames.length === 0 && !loadingUnlinked && (
							<div className="p-2 text-muted small italic">No hay más juegos disponibles para esta asignatura.</div>
						)}
					</div>
				)}
			</div>

			{/* Sección de juegos VINCULADOS (Linked) */}
			<div className={`subject-expand-container ${isExpanded ? 'expanded' : ''}`}>
                {isExpanded && (
                    <div className="p-2">
                        {linkedGames.length > 0 ? (
                            linkedGames.map(game => (
                                <SubjectGameLinkItem
                                    key={game.id}
                                    game={game}
                                    actionType="delete"
                                    buttonText="Unlink"
                                    disabled={contentLoading}
                                    onActionClick={() => handleGameUnlinked(game.id)}
                                />
                            ))
                        ) : (
                            !loadingLinked && <div className="p-2 text-muted small">Esta asignatura no tiene juegos asociados.</div>
                        )}
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