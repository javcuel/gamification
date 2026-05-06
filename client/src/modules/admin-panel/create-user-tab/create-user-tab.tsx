import React, { useState } from 'react';
import { ROLES } from '../../../constants/roles';
import Button from '../../shared/components/ui/Button';
import Dropdown from '../../shared/components/ui/Dropdown';
import Input from '../../shared/components/ui/Input';
import Toast from '../../shared/components/ui/toast';

import { z } from 'zod';
import { User } from '../../shared/api/domain/user';
import '../styles/admin-add-card.css';
import useCreateUser from './hooks/use-create-user';

const CreateUserTab: React.FC = () => {
	const [name, setName] = useState<string>('');
	const [passwd, setPasswd] = useState<string>('');
	const [role, setRole] = useState(ROLES.PLAYER);
	// 1. Cambiamos group por realName
	const [realName, setRealName] = useState<string>(''); 
	const [validationError, setValidationError] = useState<string | null>(null);

	const { createUser, error, success } = useCreateUser();

	const createUserSchema = z.object({
		name: z.string().min(1, 'User name is required'),
		passwd: z.string().min(1, 'User password is required'),
		// 2. Validamos realName en lugar de group (opcional o requerido, según prefieras)
		realName: z.string().optional(), 
		role: z.enum(Object.values(ROLES) as [string, ...string[]], {
			errorMap: () => ({ message: 'Invalid role selected' })
		})
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setValidationError(null);

		const validationResult = createUserSchema.safeParse({
			name,
			passwd,
			realName, // 3. Pasamos realName a la validación
			role
		});

		if (!validationResult.success) {
			const firstError =
				validationResult.error.errors[0]?.message || 'Unknown error';
			setValidationError(firstError);
			return;
		}

        // 4. ATENCIÓN: Asegúrate de que la clase User esté actualizada en 'domain/user.ts' 
        // para aceptar realName en su constructor si es necesario enviarlo.
		const newUser = new User(0, role, name, passwd, realName);

		await createUser(newUser);

		setName('');
		setPasswd('');
		setRole(ROLES.PLAYER);
		setRealName(''); // 5. Limpiamos el nuevo estado
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='d-flex flex-column align-items-center justify-content-center gap-3 mx-auto'
			style={{ width: '100%' }}
		>
			<h3 className='text-center mb-4'>Create User</h3>

			<Input
				placeholder='New User'
				type='text'
				value={name}
				onChange={e => setName(e.target.value)}
			/>

			<Input
				placeholder='User Password'
				type='password'
				value={passwd}
				onChange={e => setPasswd(e.target.value)}
			/>

			{/* 6. Cambiamos el Input visual para que pida el Real Name */}
			<Input
				placeholder='Real Name'
				type='text'
				value={realName}
				onChange={e => setRealName(e.target.value)}
			/>

			<Dropdown
				options={Object.values(ROLES)}
				placeholder='User Role'
				onChange={value => setRole(value)}
			/>

			<Button text='Create' />

			{error && <Toast type='error' message={error} />}
			{validationError && <Toast type='error' message={validationError} />}
			{success && <Toast type='success' message={'User created'} />}
		</form>
	);
};

export default CreateUserTab;