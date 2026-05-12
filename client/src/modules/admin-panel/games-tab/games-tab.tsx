import React from 'react';
import Toast from '../../shared/components/ui/toast';
import useGamesTab from './hooks/use-games-tab';
import GameManagementItem from './components/game-management-item';

const GamesTab: React.FC = () => {
    // Extraemos reloadGames
    const { games, setGames, error, reloadGames } = useGamesTab(); 

    const handleGameDeleted = (gameId: number) => {
        setGames(prev => prev.filter(game => game.id !== gameId));
    };

    return (
        <div className='row m-auto'>
            {games.map(game => (
                <div key={game.id} className='col-md-4 mt-3'>
                    <GameManagementItem 
                        game={game} 
                        onGameDeleted={handleGameDeleted}
                        onGameUpdated={reloadGames} // <-- NUEVO: Le pasamos la recarga
                    />
                </div>
            ))}
        </div>
    );
};
export default GamesTab;