import React, { useState } from 'react';
import { RANKING_TYPES } from '../../../constants/ranking-types';
import Dropdown from '../../shared/components/ui/dropdown';
import LoadingMsg from '../../shared/components/ui/loading-msg';
import Toast from '../../shared/components/ui/toast';
import useRankings from '../hooks/use-ranking';
import useRankingGames from '../hooks/use-ranking-games';
import '../styles/ranking.css';

const DEFAULT_RANKING = RANKING_TYPES.PLAYERS;
const DEFAULT_GAME = 0;

/**
 * RankingTable component
 *
 * Displays a ranking table based on the selected ranking type and optionally a selected game.
 * - Allows switching between different ranking types via a dropdown.
 * - For rankings by game, allows selecting a specific game.
 * - Fetches and displays the top 10 ranking entries with podium styling.
 * - Handles loading and error states for both rankings and games.
 * @component
 *
 * @returns {JSX.Element}
 */
const RankingTable: React.FC = () => {
	const [rankingType, setRankingType] = useState<string>(DEFAULT_RANKING);
	const [selectedGame, setSelectedGame] = useState<number>(DEFAULT_GAME);

	const { rankings, error, loading } = useRankings(rankingType, selectedGame);
	const { games, error: gamesError, loading: gamesLoading } = useRankingGames();

	/**
	 * getPodiumClass
	 *
	 * Returns a specific CSS class name to visually distinguish the top 3 positions.
	 *
	 * @param index - The ranking index (starting at 0)
	 * @returns A string representing the CSS class for the podium position
	 */
	const getPodiumClass = (index: number) => {
		if (index === 0) return 'podium1';
		if (index === 1) return 'podium2';
		if (index === 2) return 'podium3';
		return '';
	};

	return (
		<div className='container'>
			<div className='row mb-3'>
				<div className='col-md-6'>
					<label>Select ranking</label>
					<Dropdown
						options={Object.values(RANKING_TYPES)}
						placeholder='Select ranking'
						onChange={setRankingType}
					/>
				</div>

				{(rankingType === RANKING_TYPES.PLAYERS_BY_GAME ||
					rankingType === RANKING_TYPES.GROUPS_BY_GAME) && (
					<div className='col-md-6'>
						<label>Select game</label>
						{gamesLoading ? (
							<LoadingMsg message='Loading games...' />
						) : gamesError ? (
							<Toast type='error' message={gamesError} />
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

			{loading && <LoadingMsg message='Loading Rankings...' />}
			{error && <Toast type='error' message={error} />}

			<div className='row'>
				<div className='col'>
					<div className='table-responsive-wrapper'>
						<table className='table'>
							<thead>
								<tr>
									<th>Position</th>
									{rankingType === RANKING_TYPES.GROUPS ||
									rankingType === RANKING_TYPES.GROUPS_BY_GAME ? (
										<th>Group</th>
									) : (
										<>
											<th>Name</th>
											<th>Group</th>
										</>
									)}
									<th>
										<span>Completed Subjects</span>
									</th>
									<th>
										<span>Points</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{rankings.slice(0, 10).map((entry, index) => (
									<tr
										key={index}
										className={`table-row ${getPodiumClass(index)}`}
									>
										<td>
											{index === 0
												? ' 1 🥇'
												: index === 1
													? ' 2 🥈'
													: index === 2
														? ' 3 🥉'
														: index + 1}
										</td>

										{rankingType === RANKING_TYPES.GROUPS ||
										rankingType === RANKING_TYPES.GROUPS_BY_GAME ? (
											<td>{entry.userGroup || 'N/A'}</td>
										) : (
											<>
												<td>{entry.userName || 'N/A'}</td>
												<td>{entry.userGroup || 'N/A'}</td>
											</>
										)}
										<td>{entry.userCompletedSubjects || 0}</td>
										<td>{entry.userTotalScore || 0}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RankingTable;
