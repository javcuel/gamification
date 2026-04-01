import React from 'react';
import { Game } from '../../../shared/api/domain/game';
import Button from '../../../shared/components/ui/Button';

interface SubjectGameLinkItemProps {
    game: Game;
    // Nombre genérico para la acción
    onActionClick: () => void; 
    disabled?: boolean;
    // Nuevas props para controlar la estética y el propósito
    actionType: 'delete' | 'edit'; 
    buttonText: string;
}

const SubjectGameLinkItem: React.FC<SubjectGameLinkItemProps> = ({
    game,
    onActionClick,
    disabled,
    actionType,
    buttonText
}) => {
    return (
        // Eliminamos bg-white y shadow-sm. 
        // Ahora usará el fondo natural del contenedor o uno definido en tu CSS.
        <div className='d-flex justify-content-between align-items-center p-2 mb-2 border rounded subject-game-item-row'>
            <span>{game.name}</span>
            <Button 
                type={actionType} 
                text={buttonText}
                onClick={onActionClick} 
                disabled={disabled}
            />
        </div>
    );
};

export default SubjectGameLinkItem;