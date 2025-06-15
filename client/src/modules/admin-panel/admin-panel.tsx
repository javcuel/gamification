import React from 'react';
import NavBar from '../shared/components/navbar/navbar';
import AdminLayout from './admin-layout';

/**
 * AdminPanel component
 *
 * Main container for the administration panel.
 * - Displays a navigation bar with the application's name.
 * - Centres the administrative layout component within the viewport.
 * - Uses a flexible and full-height layout to ensure consistent structure and responsiveness.
 *
 * @returns A React element representing the admin panel screen.
 */
const AdminPanel: React.FC = () => {
	return (
		<div className='container-fluid min-vh-100 d-flex flex-column'>
			<NavBar webName='Gamispace' />
			<div className='flex-grow-1 d-flex align-items-center justify-content-center'>
				<AdminLayout />
			</div>
		</div>
	);
};

export default AdminPanel;
