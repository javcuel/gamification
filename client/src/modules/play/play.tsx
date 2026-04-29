// client/src/modules/play/play.tsx
import React, { useEffect, useRef } from 'react'; // Se añade useRef aquí
import { useParams } from 'react-router-dom';

import NavBar from '../shared/components/NavBar/NavBar';
import Toast from '../shared/components/ui/toast';
import Iframe from './components/iframe';
import useGameLoader from './hooks/use-game-loader';

// Importamos los repositorios necesarios
import { gameSessionRepository } from '../shared/api/repository/game-session.repository';
import { playRepository } from '../shared/api/repository/play.repository';


const Play: React.FC = () => {
	const { gameId } = useParams<{ gameId: string }>();
	const data = useGameLoader(Number(gameId));
	
	// Referencia para comunicarnos con el ventana del iframe
	const iframeRef = useRef<HTMLIFrameElement>(null);

	// --- FASE 3: Comunicación con el Puente (IntegrationApi.js) ---
	useEffect(() => {
		const handleMessage = async (event: MessageEvent) => {
			// Verificamos que el mensaje provenga de nuestra API de integración
			const { type, payload } = event.data;

			// CASO A: El juego solicita el progreso del jugador
			if (type === 'GAMISPACE_REQUEST_PROGRESS') {
				try {
					const progress = await playRepository.getProgress(Number(gameId));
					// Enviamos la respuesta de vuelta al iframe
					iframeRef.current?.contentWindow?.postMessage({
						type: 'GAMISPACE_RECEIVE_PROGRESS',
						payload: progress
					}, '*');
				} catch (error) {
					console.error("Error al recuperar progreso para el juego:", error);
				}
			}

			// CASO B: El juego envía datos de un nivel terminado para guardar
			if (type === 'GAMISPACE_SAVE_PLAY') {
				const sessionId = sessionStorage.getItem('activeGameSessionId');
				if (sessionId) {
					try {
						await playRepository.savePlay(Number(sessionId), payload);
						// Confirmamos al juego que el guardado fue exitoso
						iframeRef.current?.contentWindow?.postMessage({
							type: 'GAMISPACE_PLAY_SAVED_SUCCESS'
						}, '*');
					} catch (error) {
						console.error("Error al guardar la partida:", error);
					}
				}
			}
		};

		window.addEventListener('message', handleMessage);
		return () => window.removeEventListener('message', handleMessage);
	}, [gameId]);


	// --- Lógica existente de gestión de sesión (Beacon y Cierre) ---
	useEffect(() => {
		const mountTime = Date.now();

		const handleBeforeUnload = () => {
			const id = sessionStorage.getItem('activeGameSessionId');
			if (id) {
				const url = `http://localhost:5000/api/game-sessions/${id}/close-beacon`;
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
					ref={iframeRef} // Pasamos la referencia al componente Iframe
					selectedGame={data.game} 
				/>
			) : (
				<div className='mt-5'>
					{data.error ? (
						<Toast type='error' message={data.error} />
					) : (
						<p className='text-center'>Cargando juego...</p>
					)}
				</div>
			)}
		</div>
	);
};

export default Play;