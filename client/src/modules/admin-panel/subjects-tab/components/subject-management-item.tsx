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
}

const SubjectManagementItem: React.FC<SubjectiItemProps> = ({
	subject,
	onSubjectDeleted
}) => {
	const [isEditing, setIsEditing] = useState(false);
	
	// Estado maestro para la nueva sección unificada de juegos
	const [showGamesMenu, setShowGamesMenu] = useState(false);
	const [isGroupsExpanded, setIsGroupsExpanded] = useState(false);

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

	// Comportamiento tipo acordeón para no tener todo abierto a la vez
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
			// Si no hay ninguna pestaña interna abierta, abrimos "Asociados" por defecto
			if (!isExpanded && !isAdding) {
				toggleExpand();
			}
		}
	};

	return (
		<div className='subject-management-item'>
			<div className='subject-item-header d-flex justify-content-between align-items-center'>
				{/* Quitamos el onClick de aquí para que la imagen no despliegue nada */}
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
				
				{/* Añadimos d-flex flex-nowrap gap-2 para forzar los botones en 1 sola fila */}
				<div className='subject-item-buttons d-flex flex-nowrap gap-2 align-items-center'>
					<Button text="Alumnado" onClick={handleToggleGroups} />
					<Button text="Juegos" onClick={handleToggleGamesMenu} />
					<Button type={isOpen ? 'unlock' : 'lock'} onClick={toggleOpenState} />
					<Button type={isVisible ? 'visible' : 'hidden'} onClick={toggleVisibleState} />
					<Button type='edit' onClick={() => setIsEditing(true)} />
					<Button type='delete' onClick={handleDeleteClick} disabled={deleteLoading} />
				</div>
			</div>

			{/* Renderizado de errores combinados */}
			{(visibleError || openError || updateError || deleteError || expandError || availableError || contentError) && (
				<Toast type='error' message={contentError || expandError || availableError || "Error en la operación"} />
			)}

            {/* Indicadores de carga de datos y de acciones */}
			{(loadingLinked || loadingUnlinked || contentLoading) && (
                <div className="p-2 text-info small">Procesando...</div>
            )}
			
			{/* NUEVA SECCIÓN UNIFICADA DE JUEGOS */}
			<div className={`subject-expand-container ${showGamesMenu ? 'expanded' : ''}`}>
				{showGamesMenu && (
					<div className="p-3 border-top bg-light bg-opacity-10">
						
						{/* Pestañas de Juegos */}
						<div className="d-flex gap-2 mb-3">
							<button 
								className={`btn btn-sm ${isExpanded ? 'btn-primary' : 'btn-outline-primary'}`}
								onClick={() => {
									if (!isExpanded) toggleExpand();
									if (isAdding) toggleAddMode();
								}}
							>
								Juegos Asociados
							</button>
							<button 
								className={`btn btn-sm ${isAdding ? 'btn-primary' : 'btn-outline-primary'}`}
								onClick={() => {
									if (!isAdding) toggleAddMode();
									if (isExpanded) toggleExpand();
								}}
							>
								Juegos No Asociados
							</button>
						</div>

						{/* Lista de Asociados */}
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
										/>
									))
								) : (
									!loadingLinked && <div className="p-2 text-muted small">Esta asignatura no tiene juegos asociados.</div>
								)}
							</div>
						)}

						{/* Lista de NO Asociados */}
						{isAdding && (
							<div className="games-list">
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
				)}
			</div>
			
			{/* Sección de GRUPOS (Alumnado) */}
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