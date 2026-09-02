import React from 'react';
import { Game } from '../../shared/api/domain/game';
import { API_URLS } from '../../../constants/apiUrls';

interface GameIframeProps {
    selectedGame: Game;
    // Exposes the native load event to notify when the game environment is fully mounted
    onLoad?: () => void; 
}
const Iframe = React.forwardRef<HTMLIFrameElement, GameIframeProps>(({ selectedGame, onLoad }, ref) => {
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
                onLoad={onLoad} // Triggers the ready signal once the HTML document finishes loading
            />
        </div>
    );
});

export default Iframe;