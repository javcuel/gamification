import React from 'react';
import { Game } from '../../shared/api/domain/game';

interface GameIframeProps {
    selectedGame: Game;
}

const Iframe = React.forwardRef<HTMLIFrameElement, GameIframeProps>(({ selectedGame }, ref) => {
    // Apuntamos al servidor de Express (Backend) que sirve la carpeta de juegos
    const backendUrl = 'http://localhost:5000';
    
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