import React, { useState } from 'react';
import { User, UserUpdate } from '../../shared/api/domain/user';
import Button from '../../shared/components/ui/Button';
import UserEditModal from './components/user-edit-modal';
import UseDeleteUser from './hooks/use-delete-user';
import UseUpdateUser from './hooks/use-update-user';

import Toast from '../../shared/components/ui/toast';
import './styles/user-management-item.css';

interface UserManagementItemProps {
	user: User;
	onDelete: (userId: number) => void;
}

/**
 * UserManagementItem Component
 * Represents a single user in the list.
 */
const UserManagementItem: React.FC<UserManagementItemProps> = ({
	user,
	onDelete
}) => {
	const [isEditing, setIsEditing] = useState(false);

	// Update User data.
	const {
		updateUser,
		loading: updateLoading,
		error: updateError
	} = UseUpdateUser(() => {
		setIsEditing(false);
	});

	// Delete user.
	const {
		deleteUser,
		loading: deleteLoading,
		error: deleteError
	} = UseDeleteUser(onDelete);

	// Handles update user
	const handleSaveUser = (updatedData: UserUpdate) => {
		const updatedUser = new UserUpdate(
			updatedData.group,
			updatedData.role,
			updatedData.name,
			updatedData.passwd
		);
		updateUser(user.id, updatedUser);
	};

	// Handles edit modal
	const handleEditClick = () => {
		setIsEditing(true);
	};

	// Handles user deletion
	const handleDeleteClick = () => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			deleteUser(user.id);
		}
	};

	return (
		<li className='user-management-item'>
			<div>
				<strong>{user.name}</strong> - {user.role}
			</div>
			<div className='user-management-item-buttons'>
				<Button type='edit' onClick={handleEditClick} />

				<Button
					type='delete'
					onClick={handleDeleteClick}
					disabled={deleteLoading}
				/>
			</div>
			{isEditing && (
				<UserEditModal
					data={{
						group: user.group,
						role: user.role,
						name: user.name,
						passwd: user.passwd
					}}
					onClose={() => setIsEditing(false)}
					onSave={handleSaveUser}
				/>
			)}

			{updateError && <Toast type='error' message={updateError} />}
			{deleteError && <Toast type='error' message={deleteError} />}

			{updateLoading && <div>Loading update...</div>}
		</li>
	);
};

export default UserManagementItem;
