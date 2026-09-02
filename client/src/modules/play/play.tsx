import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../shared/components/NavBar/NavBar';
import Toast from '../shared/components/ui/toast';
import Iframe from './components/iframe';
import useGameLoader from './hooks/use-game-loader';
import { gameSessionRepository } from '../shared/api/repository/game-session.repository';
import { playRepository } from '../shared/api/repository/play.repository';
import { PlayCreate } from '../shared/api/domain/play';
import { API_URLS } from '../../constants/apiUrls';

const Play: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const data = useGameLoader(Number(gameId));
    
    // Reference for communicating with the iframe window
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // INVERSION OF CONTROL: Triggers the 'GAMISPACE_PLATFORM_READY' signal once the engine's DOM is 100% mounted.
    // This is the key piece that wakes up games that have loaded faster than the platform,
    // guaranteeing they never request progress data before the web environment is fully prepared.
    const handleIframeLoad = () => {
        iframeRef.current?.contentWindow?.postMessage({
            type: 'GAMISPACE_PLATFORM_READY'
        }, '*');
    };

    // Communication with the WebBridge (IntegrationApi.js) ---
    useEffect(() => {
        const handleMessage = async (event: MessageEvent) => {
            // We verify that the message comes from our integration API
            const { type, payload } = event.data;

            // CASE A: The game requests the player's progress
            if (type === 'GAMISPACE_REQUEST_PROGRESS') {
                try {
                    const progress = await playRepository.getProgress(Number(gameId));
                    // We send the response back to the iframe
                    iframeRef.current?.contentWindow?.postMessage({
                        type: 'GAMISPACE_RECEIVE_PROGRESS',
                        payload: progress
                    }, '*');
                } catch (error) {
                    console.error("Error retrieving game progress:", error);
                }
            }

            // CASE B: The game sends data from a completed level to save
            if (type === 'GAMISPACE_SAVE_PLAY') {
                const sessionId = sessionStorage.getItem('activeGameSessionId');
                if (sessionId) {
                    try {
                        // Strict mapping to the domain DTO
                        const playData: PlayCreate = {
                            level: Number(payload.level),
                            score: Number(payload.score),
                            time: Number(payload.time),
                            completed: Boolean(payload.completed)
                        };

                        // The typed and secure object is sent to the repository
                        await playRepository.savePlay(Number(sessionId), playData);
                        
                        // We confirm to the game that the save was successful
                        iframeRef.current?.contentWindow?.postMessage({
                            type: 'GAMISPACE_PLAY_SAVED_SUCCESS'
                        }, '*');
                    } catch (error) {
                        console.error("Error saving the game:", error);
                    }
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [gameId]);


    // --- Existing session management logic (Beacon and Closure) ---
    useEffect(() => {
        const mountTime = Date.now();

        const handleBeforeUnload = () => {
            const id = sessionStorage.getItem('activeGameSessionId');
            if (id) {
                const url = `${API_URLS.BASE_URL}${API_URLS.CLOSE_SESSION_BEACON(id)}`;
                navigator.sendBeacon(url);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            
            const id = sessionStorage.getItem('activeGameSessionId');
            const timeElapsed = Date.now() - mountTime;

            if (id && timeElapsed > 1000) {
                gameSessionRepository.end(Number(id)).then(() => {
                    sessionStorage.removeItem('activeGameSessionId');
                });
            }
        };
    }, []);

    return (
        <div className='container-fluid min-vh-100 d-flex flex-column'>
            <NavBar webName='Gamispace' />
            {data.game ? (
                <Iframe 
                    ref={iframeRef} 
                    selectedGame={data.game}
                    onLoad={handleIframeLoad} 
                />
            ) : (
                <div className='mt-5'>
                    {data.error ? (
                        <Toast type='error' message={data.error} />
                    ) : (
                        <p className='text-center'>Loading game...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Play;