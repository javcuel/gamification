import React from 'react';
import { Game } from '../../shared/api/domain/game';
import { API_URLS } from '../../../constants/apiUrls';

interface GameIframeProps {
    selectedGame: Game;
}

const Iframe = React.forwardRef<HTMLIFrameElement, GameIframeProps>(({ selectedGame }, ref) => {
    // Usamos las variables centralizadas para armar la ruta: .../api/game-files/144/index.html
    const gameUrl = `${API_URLS.BASE_URL}${API_URLS.GAME_FILES}/${selectedGame.id}/index.html`;
    
    return (
        <div className='mt-3'>
            <h2 className='text-center'>Playing: {selectedGame.name}</h2>
            <iframe
                ref={ref}
                className='container custom-flex-center'
                title={selectedGame.name}
                src={gameUrl}
                width='70%'
                height='700px'
                style={{ border: 'none' }}
            />
        </div>
    );
});

export default Iframe;