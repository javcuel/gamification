import React, { useState } from 'react';
import { RANKING_TYPES } from '../../../constants/ranking-types';
import Dropdown from '../../shared/components/ui/Dropdown';
import LoadingMsg from '../../shared/components/ui/loading-msg';
import Toast from '../../shared/components/ui/toast';
import useRankings from '../hooks/use-ranking';
import useRankingGames from '../hooks/use-ranking-games';
import '../styles/ranking.css';
import useRankingSubjects from '../hooks/use-ranking-subjects';

const DEFAULT_RANKING = RANKING_TYPES.PLAYERS;
const DEFAULT_GAME = 0;
const DEFAULT_SUBJECT = 0; 

const RankingTable: React.FC = () => {
	const [rankingType, setRankingType] = useState<string>(DEFAULT_RANKING);
	const [selectedGame, setSelectedGame] = useState<number>(DEFAULT_GAME);
    const [selectedSubject, setSelectedSubject] = useState<number>(DEFAULT_SUBJECT);

	const { rankings, error, loading } = useRankings(selectedSubject, rankingType, selectedGame);
	const { games, error: gamesError, loading: gamesLoading } = useRankingGames(selectedSubject);
    const { subjects, error: subjectsError, loading: subjectsLoading } = useRankingSubjects();

	const getPodiumClass = (index: number) => {
		if (index === 0) return 'podium1';
		if (index === 1) return 'podium2';
		if (index === 2) return 'podium3';
		return '';
	};

    const formatTime = (totalSeconds: number) => {
        if (!totalSeconds) return "00:00.000";
        const mins = Math.floor(totalSeconds / 60);
        const secs = Math.floor(totalSeconds % 60);
        const ms = Math.round((totalSeconds - Math.floor(totalSeconds)) * 1000);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    };

	return (
		<div className='container'>
            {/* ZONA DE FILTROS / DESPLEGABLES */}
			<div className='row mb-3 align-items-end'>
                {/* 1. Selector de Asignatura */}
                <div className='col-md-4'>
					<label>Select Subject</label>
					{subjectsLoading ? (
						<LoadingMsg message='Loading subjects...' />
					) : subjectsError ? (
						<Toast type='error' message={subjectsError} />
					) : (
						<Dropdown
							options={subjects.map(s => s.name)}
							placeholder='Select Subject'
							onChange={subjectName => {
								const selected = subjects.find(s => s.name === subjectName);
								if (selected) {
									setSelectedSubject(selected.id);
									setSelectedGame(DEFAULT_GAME); 
								}
							}}
						/>
					)}
				</div>

                {/* 2. Selector de Tipo de Ranking */}
				<div className='col-md-4'>
					<label>Select ranking</label>
					<Dropdown
						options={Object.values(RANKING_TYPES)}
						placeholder='Select ranking'
						onChange={setRankingType}
					/>
				</div>

                {/* 3. Selector de Juego (Solo si es ranking por juego) */}
				{(rankingType === RANKING_TYPES.PLAYERS_BY_GAME ||
					rankingType === RANKING_TYPES.GROUPS_BY_GAME) && (
					<div className='col-md-4'>
						<label>Select game</label>
						{gamesLoading ? (
							<LoadingMsg message='Loading games...' />
						) : gamesError ? (
							<Toast type='error' message={gamesError} />
						) : selectedSubject !== 0 && games.length === 0 ? (
                            /* NUEVO: Aviso si la asignatura no tiene juegos vinculados */
                            <div className="alert alert-warning py-2 mb-0" style={{ fontSize: '0.9rem' }}>
                                No games linked to this subject.
                            </div>
                        ) : (
							<Dropdown
								options={games.map(g => g.name)}
								placeholder='Select game'
								onChange={gameName => {
									const selected = games.find(g => g.name === gameName);
									if (selected) setSelectedGame(selected.id);
								}}
							/>
						)}
					</div>
				)}
			</div>

            {/* AVISOS DE CARGA Y ERRORES GLOBALES */}
			{selectedSubject === 0 && <div className="alert alert-info">Please select a subject to view rankings.</div>}
            {selectedSubject !== 0 && loading && <LoadingMsg message='Loading Rankings...' />}
			{error && <Toast type='error' message={error} />}

            {/* TABLA DE RANKING */}
            {selectedSubject !== 0 && !loading && (
                <div className='row'>
                    <div className='col'>
                        <div className='table-responsive-wrapper'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Position</th>
                                        {rankingType === RANKING_TYPES.GROUPS ||
                                        rankingType === RANKING_TYPES.GROUPS_BY_GAME ? (
                                            <th>Group Name</th>
                                        ) : (
                                            <th>Name</th>
                                        )}
                                        <th>Points</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* NUEVO: Controlamos si hay datos en el ranking o está vacío */}
                                    {rankings.length > 0 ? (
                                        rankings.slice(0, 10).map((entry, index) => (
                                            <tr key={index} className={`table-row ${getPodiumClass(index)}`}>
                                                <td>
                                                    {index === 0 ? ' 1 🥇' : index === 1 ? ' 2 🥈' : index === 2 ? ' 3 🥉' : index + 1}
                                                </td>

                                                {rankingType === RANKING_TYPES.GROUPS ||
                                                rankingType === RANKING_TYPES.GROUPS_BY_GAME ? (
                                                    <td>{entry.userGroup || 'N/A'}</td>
                                                ) : (
                                                    <td>{entry.userName || 'N/A'}</td>
                                                )}
                                                <td>{entry.userTotalScore || 0}</td>
                                                <td>{formatTime(entry.userTotalTime)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        /* NUEVO: Fila para cuando no hay rankings */
                                        <tr>
                                            <td colSpan={4} className="text-center text-muted py-4">
                                                No ranking data available for this selection yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
		</div>
	);
};

export default RankingTable;