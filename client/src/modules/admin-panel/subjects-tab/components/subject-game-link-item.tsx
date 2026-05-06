import React from 'react';
import { Game } from '../../../shared/api/domain/game';
import Button from '../../../shared/components/ui/Button';

interface SubjectGameLinkItemProps {
    game: Game;
    onActionClick: () => void; 
    disabled?: boolean;
    actionType: 'delete' | 'edit' | 'add'; 
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