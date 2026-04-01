import React from 'react';
import Toast from '../../shared/components/ui/toast';
import useGamesTab from './hooks/use-games-tab';
import GameManagementItem from './components/game-management-item';

const GamesTab: React.FC = () => {
    const { games, setGames, error } = useGamesTab();

    // Esta es la función que TypeScript te está pidiendo
    const handleGameDeleted = (gameId: number) => {
        setGames(prev => prev.filter(game => game.id !== gameId));
    };

    return (
        <div className='row m-auto'>
            {games.map(game => (
                <div key={game.id} className='col-md-4 mt-3'>
                    <GameManagementItem 
                        game={game} 
                        onGameDeleted={handleGameDeleted} // ¡Aquí se soluciona el error!
                    />
                </div>
            ))}
        </div>
    );
};
export default GamesTab;