import React, { useState } from 'react';
import { ROLES } from '../../../constants/roles';
import Button from '../../shared/components/ui/button';
import Dropdown from '../../shared/components/ui/dropdown';
import Input from '../../shared/components/ui/input';
import Toast from '../../shared/components/ui/toast';

import { z } from 'zod';
import { User } from '../../shared/api/domain/user';
import '../styles/admin-add-card.css';
import useCreateUser from './hooks/use-create-user';

/**
 * CreateUserTab component
 *
 * Renders a form to create a new user.
 * - Validates user input using Zod.
 * - Sends user data to the backend via a custom hook.
 * - Displays error or success messages depending on the result.
 */
const CreateUserTab: React.FC = () => {
	const [name, setName] = useState<string>('');
	const [passwd, setPasswd] = useState<string>('');
	const [role, setRole] = useState(ROLES.PLAYER);
	const [group, setGroup] = useState<string>('');
	const [validationError, setValidationError] = useState<string | null>(null);

	const { createUser, error, success } = useCreateUser();

	/**
	 * Zod schema for user form validation.
	 * - Validates name, password, group, and role.
	 */
	const createUserSchema = z.object({
		name: z.string().min(1, 'User name is required'),
		passwd: z.string().min(1, 'User password is required'),
		group: z.string().min(1, 'User group is required'),
		role: z.enum(Object.values(ROLES) as [string, ...string[]], {
			errorMap: () => ({ message: 'Invalid role selected' })
		})
	});

	/**
	 * Handles form submission:
	 * - Validates fields.
	 * - Creates a User instance.
	 * - Triggers the user creation process.
	 *
	 * @param e - React form submit event
	 */
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setValidationError(null);

		const validationResult = createUserSchema.safeParse({
			name,
			passwd,
			group,
			role
		});

		if (!validationResult.success) {
			const firstError =
				validationResult.error.errors[0]?.message || 'Unknown error';
			setValidationError(firstError);
			return;
		}

		const newUser = new User(0, group, role, name, passwd);

		await createUser(newUser);

		setName('');
		setPasswd('');
		setRole(ROLES.PLAYER);
		setGroup('');
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='d-flex flex-column align-items-center justify-content-center gap-3 mx-auto'
			style={{ width: '100%' }}
		>
			<h3 className='text-center mb-4'>Create User</h3>

			{/* Input for user name */}
			<Input
				placeholder='New User'
				type='text'
				value={name}
				onChange={e => setName(e.target.value)}
			/>

			{/* Input for user password */}
			<Input
				placeholder='User Password'
				type='password'
				value={passwd}
				onChange={e => setPasswd(e.target.value)}
			/>

			{/* Input for user group */}
			<Input
				placeholder='User Group'
				type='text'
				value={group}
				onChange={e => setGroup(e.target.value)}
			/>

			{/* Dropdown for selecting user role */}
			<Dropdown
				options={Object.values(ROLES)}
				placeholder='User Role'
				onChange={value => setRole(value)}
			/>

			{/* Submit button */}
			<Button text='Create' />

			{/* Feedback messages */}
			{error && <Toast type='error' message={error} />}
			{validationError && <Toast type='error' message={validationError} />}
			{success && <Toast type='success' message={'User created'} />}
		</form>
	);
};

export default CreateUserTab;
