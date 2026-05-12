import React from 'react';
import { Game } from '../../shared/api/domain/game';
import { API_URLS } from '../../../constants/apiUrls'; // <-- AÑADIR IMPORT

interface GameIframeProps {
    selectedGame: Game;
}

const Iframe = React.forwardRef<HTMLIFrameElement, GameIframeProps>(({ selectedGame }, ref) => {
    // CAMBIO: Usamos la URL oficial del servidor
    const backendUrl = API_URLS.SERVER_URL; 
    
    return (
        <div className='mt-3'>
            <h2 className='text-center'>Playing: {selectedGame.name}</h2>
            <iframe
                ref={ref}
                className='container custom-flex-center'
                title={selectedGame.name}
                src={`${backendUrl}/games/${selectedGame.id}/index.html`}
                width='70%'
                height='700px'
                style={{ border: 'none' }}
            />
        </div>
    );
});

export default Iframe;