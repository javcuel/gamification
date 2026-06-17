import React from 'react';
import Toast from '../../shared/components/ui/toast';
import useUsersTab from './hooks/use-users-tab';
import UserManagementItem from './user-management-item';

/**
 * UsersTab is a component used to display and manage a list of users.
 */
const UsersTab: React.FC = () => {
	// Extract the reloadUsers function
	const { users, setUsers, error, reloadUsers } = useUsersTab();

	const handleUserDeleted = (userId: number) => {
		setUsers(prev => prev.filter(user => user.id !== userId));
	};

	return (
		<div>
			{error && <Toast type='error' message={error} />}

			<div className='row m-auto'>
				{users.map(user => (
					<div key={user.id} className='col-md-4 mt-3'>
						<UserManagementItem 
							user={user} 
							onDelete={handleUserDeleted} 
							onUserUpdated={reloadUsers} // Pass the reload function
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default UsersTab;