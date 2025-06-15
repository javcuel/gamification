import React, { useState } from 'react';
import { ROLES } from '../../../../constants/roles';
import { UserUpdate } from '../../../shared/api/domain/user';
import Button from '../../../shared/components/ui/button';
import Dropdown from '../../../shared/components/ui/dropdown';
import Input from '../../../shared/components/ui/input';
import '../../styles/edit-modal.css';

interface UserEditModalProps {
	data: UserUpdate;
	onClose: () => void;
	onSave: (data: UserUpdate) => void;
}

/**
 * UserEditModal component
 *
 * Renders a modal interface for editing a user's information.
 * Allows updating user name, password, role, and group.
 */
const UserEditModal: React.FC<UserEditModalProps> = ({
	data,
	onClose,
	onSave
}) => {
	// State for editable fields
	const [name, setName] = useState(data.name);
	const [passwd, setPasswd] = useState(data.passwd);
	const [role, setRole] = useState(data.role);
	const [group, setGroup] = useState(data.group);

	/**
	 * Handles form submission and invokes the onSave callback with updated data.
	 *
	 * @param e - Form event
	 */
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave({ name, passwd, role, group });
		onClose();
	};

	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<h3 className='text-center mb-3'>Edit User</h3>
				<form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
					{/* Name input */}
					<Input
						placeholder='Name'
						type='text'
						value={name}
						onChange={e => setName(e.target.value)}
					/>

					{/* Password input */}
					<Input
						placeholder='Passwd'
						type='password'
						value={passwd}
						onChange={e => setPasswd(e.target.value)}
					/>

					{/* Role dropdown selection */}
					<Dropdown
						options={Object.keys(ROLES)}
						placeholder='Role'
						onChange={value => setRole(value)}
					/>

					{/* Group input */}
					<Input
						placeholder='Group'
						type='text'
						value={group}
						onChange={e => setGroup(e.target.value)}
					/>

					{/* Action buttons */}
					<div className='d-flex justify-content-between mt-3'>
						<Button text='Cancel' onClick={onClose} />
						<Button text='Save' />
					</div>
				</form>
			</div>
		</div>
	);
};

export default UserEditModal;
