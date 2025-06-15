import React from 'react';
import Toast from '../../shared/components/ui/toast';
import useUsersTab from './hooks/use-users-tab';
import UserManagementItem from './user-management-item';

/**
 * UsersTab is a component used to display and manage a list of users.
 *
 * It renders a list of user cards, each represented by the UserManagementItem component.
 * It also handles deletion feedback and error display.
 */
const UsersTab: React.FC = () => {
	const { users, setUsers, error } = useUsersTab();

	/**
	 * Handles removal of a user from local state after deletion.
	 *
	 * @param userId - ID of the user to remove.
	 */
	const handleUserDeleted = (userId: number) => {
		setUsers(prev => prev.filter(user => user.id !== userId));
	};

	return (
		<div>
			{/* Display error message if data fetching fails */}
			{error && <Toast type='error' message={error} />}

			{/* Render the list of users in a responsive grid */}
			<div className='row m-auto'>
				{users.map(user => (
					<div key={user.id} className='col-md-4 mt-3'>
						<UserManagementItem user={user} onDelete={handleUserDeleted} />
					</div>
				))}
			</div>
		</div>
	);
};

export default UsersTab;
