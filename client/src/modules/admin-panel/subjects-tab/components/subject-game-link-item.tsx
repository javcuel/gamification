import React, { useState, useEffect } from 'react';
import { Game } from '../../../shared/api/domain/game';
import Button from '../../../shared/components/ui/Button';
import useContentActions from '../hooks/use-content-actions';

interface SubjectGameLinkItemProps {
    game: Game;
    onActionClick: () => void; 
    disabled?: boolean;
    actionType: 'delete' | 'edit' | 'add'; 
    buttonText: string;
    subjectId?: number; 
}

const SubjectGameLinkItem: React.FC<SubjectGameLinkItemProps> = ({
    game,
    onActionClick,
    disabled,
    actionType,
    buttonText,
    subjectId
}) => {
    // 1. Mantenemos el estado local
    const [teacherOpen, setTeacherOpen] = useState(game.teacherIsOpen ?? false);
    const [teacherVisible, setTeacherVisible] = useState(game.teacherIsVisible ?? false);

    const { updateLocalOpen, updateLocalVisible, loading } = useContentActions();

    // 2. ¡CRUCIAL!: Sincronizar el estado cuando el juego cambie (por ejemplo, al vincularse)
    useEffect(() => {
        setTeacherOpen(game.teacherIsOpen ?? false);
        setTeacherVisible(game.teacherIsVisible ?? false);
    }, [game.teacherIsOpen, game.teacherIsVisible, game.id]);

    const isLinked = actionType === 'delete';
    const actualSubjectId = subjectId || game.idSubject;

    // 3. MEJORA: Usamos el estado global (isOpen/isVisible) como respaldo si no hay datos de Admin específicos
    const isAdminOpenLocked = (game.adminIsOpen ?? game.isOpen) === false;
    const isAdminVisibleLocked = (game.adminIsVisible ?? game.isVisible) === false;
    const isLockedByAdmin = isAdminOpenLocked || isAdminVisibleLocked;

    const handleToggleOpen = async () => {
        // Verificamos que tengamos un subjectId válido antes de proceder
        if (isAdminOpenLocked || !actualSubjectId) {
            console.warn("Acción abortada: falta subjectId o el admin ha bloqueado el juego.");
            return; 
        }
        try {
            await updateLocalOpen(actualSubjectId, game.id, !teacherOpen);
            setTeacherOpen(!teacherOpen);
        } catch (e) {
            console.error("Error al cambiar estado abierto:", e);
        }
    };

    const handleToggleVisible = async () => {
        if (isAdminVisibleLocked || !actualSubjectId) {
            console.warn("Acción abortada: falta subjectId o el admin ha bloqueado la visibilidad.");
            return; 
        }
        try {
            await updateLocalVisible(actualSubjectId, game.id, !teacherVisible);
            setTeacherVisible(!teacherVisible);
        } catch (e) {
            console.error("Error al cambiar visibilidad:", e);
        }
    };

    return (
        <div className='d-flex justify-content-between align-items-center p-2 mb-2 border rounded subject-game-item-row'>
            <div className="d-flex align-items-center">
                <span>{game.name}</span>
                {isLinked && isLockedByAdmin && (
                    <span className="badge bg-danger ms-2" style={{ fontSize: '0.65rem' }}>
                        Bloqueado por Admin
                    </span>
                )}
            </div>
            
            <div className="d-flex gap-2">
                {isLinked && (
                    <>
                        <div 
                            title={isAdminOpenLocked ? "Bloqueado globalmente por el Administrador" : "Abrir/Cerrar juego en esta asignatura"}
                            style={{ 
                                opacity: isAdminOpenLocked ? 0.4 : 1, 
                                filter: isAdminOpenLocked ? 'grayscale(100%)' : 'none',
                                cursor: isAdminOpenLocked ? 'not-allowed' : 'default'
                            }}
                        >
                            <Button 
                                type={teacherOpen ? 'unlock' : 'lock'} 
                                onClick={handleToggleOpen}
                                disabled={loading || isAdminOpenLocked || !actualSubjectId}
                            />
                        </div>
                        
                        <div 
                            title={isAdminVisibleLocked ? "Ocultado globalmente por el Administrador" : "Mostrar/Ocultar juego en esta asignatura"}
                            style={{ 
                                opacity: isAdminVisibleLocked ? 0.4 : 1, 
                                filter: isAdminVisibleLocked ? 'grayscale(100%)' : 'none',
                                cursor: isAdminVisibleLocked ? 'not-allowed' : 'default'
                            }}
                        >
                            <Button 
                                type={teacherVisible ? 'visible' : 'hidden'} 
                                onClick={handleToggleVisible}
                                disabled={loading || isAdminVisibleLocked || !actualSubjectId}
                            />
                        </div>
                    </>
                )}

                <Button 
                    type={actionType} 
                    text={buttonText}
                    onClick={onActionClick} 
                    disabled={disabled || loading}
                />
            </div>
        </div>
    );
};

export default SubjectGameLinkItem;