import React, { useState } from 'react';
import { z } from 'zod';
import { GameCreate } from '../../shared/api/domain/game';
import Button from '../../shared/components/ui/Button';
import Dropdown from '../../shared/components/ui/Dropdown';
import Input from '../../shared/components/ui/Input';
import Toast from '../../shared/components/ui/toast';
import useCreateGame from './hooks/use-create-game';

/**
 * CreateGameTab component
 *
 * Form component used to create a new game.
 * - Validates user input using Zod before submission.
 * - Uses a custom hook to handle the game creation request.
 * - Displays error and success messages based on the result.
 */
const CreateGameTab: React.FC = () => {
	const [name, setName] = useState<string>('');
	// const [idSubject, setIdSubject] = useState<string>(''); out
	const [img, setImg] = useState<string>('');
	const [validationError, setValidationError] = useState<string | null>(null);

	const { createGame, error, success } = useCreateGame();

	/**
	 * Schema used to validate game creation input fields.
	 * Ensures name, image, and max score are present and valid.
	 */
	const createGameSchema = z.object({
		name: z.string().min(1, 'Game name is required'),
		img: z.string().min(1, 'Game image is required'),
	});

	/**
	 * Handles form submission.
	 * - Validates inputs.
	 * - Constructs the GameCreate object.
	 * - Submits the data through the `createGame` hook.
	 * - Clears input fields on success.
	 *
	 * @param e - React form event
	 */
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setValidationError(null);

		const validationResult = createGameSchema.safeParse({
			name,
			img
		});

		if (!validationResult.success) {
			const firstError =
				validationResult.error.errors[0]?.message || 'Unknown error';
			setValidationError(firstError);
			return;
		}

		const newGame = new GameCreate(
			// Number(idSubject), out
			name,
			img
		);

		await createGame(newGame); // Here: Debug

		setName('');
		// setIdSubject(''); out
		setImg('');
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='d-flex flex-column align-items-center justify-content-center gap-3 mx-auto'
			style={{ width: '100%' }}
		>
			<h3 className='text-center mb-4'>Create Game</h3>

			{/* Input field for game name */}
			<Input
				placeholder='New Game'
				type='text'
				value={name}
				onChange={e => setName(e.target.value)}
			/>

			{/* Input field for game image URL */}
			<Input
				placeholder='Game Img'
				type='text'
				value={img}
				onChange={e => setImg(e.target.value)}
			/>

			{/* Dropdown for subject selection */}
			
			{/*<Dropdown
				options={['Option 1', 'Option 2', 'Option 3']}
				placeholder='Subject'
				onChange={value => setIdSubject(value)} out
			/>*/}

			{/* Submit button */}
			<Button text='Create' />

			{/* Error and success messages */}
			{error && <Toast type='error' message={error} />}
			{validationError && <Toast type='error' message={validationError} />}
			{success && <Toast type='success' message={'Subject created'} />}
		</form>
	);
};

export default CreateGameTab;
