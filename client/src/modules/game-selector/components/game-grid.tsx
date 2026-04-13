import React from 'react';
import { useParams } from 'react-router-dom';

import Toast from '../../shared/components/ui/toast';
import LoadingMsg from '../../shared/components/ui/loading-msg';
import useGameSelector from '../hooks/use-game-selector';
import GameItem from './game-item';

const GameGrid: React.FC = () => {
	const { subjectId } = useParams<{ subjectId: string }>();
	const { games, error, loading } = useGameSelector(Number(subjectId));

	return (
		<div className='container'>
			{loading ? (
				<div className='row custom-flex-center text-center'>
					<LoadingMsg message='Loading Games...' />
				</div>
			) : (
				<div className='row custom-flex-center text-center'>
					{error && <Toast type='error' message={error} />}

					{games
						.filter(game => game.isVisible)
						.map((game, index) => (
							<div className='col-auto' key={index}>
                                {/* AQUÍ LE PASAMOS EL SUBJECT ID AL HIJO */}
								<GameItem game={game} subjectId={Number(subjectId)} />
							</div>
						))}
				</div>
			)}
		</div>
	);
};

export default GameGrid;