import React from 'react';

import NavBar from '../shared/components/NavBar/NavBar';
import RankingTable from './components/ranking-table';

/**
 * Ranking component
 *
 * Main container for the ranking view.
 * - Displays a navigation bar with the application name.
 * - Centres the ranking table vertically and horizontally within the viewport.
 * - Uses a fluid and flexible layout to ensure responsiveness and full-height display.
 *
 * @component
 *
 * @returns  {JSX.Element}
 */
const Ranking: React.FC = () => {
	return (
		<div className='container-fluid min-vh-100 d-flex flex-column'>
			<NavBar webName='Gamispace' />
			<div className='flex-grow-1 d-flex align-items-center justify-content-center'>
				<RankingTable />
			</div>
		</div>
	);
};

export default Ranking;
