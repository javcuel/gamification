import React, { useEffect } from 'react'; //
import { useParams } from 'react-router-dom'; //

import NavBar from '../shared/components/NavBar/NavBar'; //
import Toast from '../shared/components/ui/toast'; //
import Iframe from './components/iframe'; //
import usePlay from './hooks/use-play'; //
// Importamos el repositorio para poder cerrar la sesión
import { gameSessionRepository } from '../shared/api/repository/game-session.repository';


const Play: React.FC = () => {
	const { gameId } = useParams<{ gameId: string }>(); //
	const data = usePlay(Number(gameId)); //

	useEffect(() => {
    // Registramos el momento exacto del montaje
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
        // CALCULAMOS EL TIEMPO TRANSCURRIDO
        const timeElapsed = Date.now() - mountTime;

        // Si ha pasado menos de 1 segundo, es probablemente el StrictMode de React
        // y no queremos cerrar la sesión todavía.
        if (id && timeElapsed > 1000) {
            gameSessionRepository.end(Number(id)).then(() => {
                sessionStorage.removeItem('activeGameSessionId');
            });
        } else {
            console.log("Cierre ignorado: posible re-renderizado de desarrollo o tiempo insuficiente.");
        }
    };
}, []);

	return (
		<div className='container-fluid min-vh-100 d-flex flex-column'>
			<NavBar webName='Gamispace' />
			{data.game ? (
				<Iframe selectedGame={data.game} />
			) : (
				<Toast type='error' message={'No game founded'} />
			)}
		</div>
	);
};

export default Play;