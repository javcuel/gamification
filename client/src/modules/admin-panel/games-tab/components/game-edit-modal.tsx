import React, { useState } from 'react';
import { z } from 'zod';
import { GameUpdate } from '../../../shared/api/domain/game';
import Button from '../../../shared/components/ui/Button';
import Dropdown from '../../../shared/components/ui/Dropdown';
import Input from '../../../shared/components/ui/Input';
import Toast from '../../../shared/components/ui/toast';
import '../../styles/edit-modal.css';
import useSubjectsTab from '../../subjects-tab/hooks/use-subjects-tab';

interface GameEditModalProps {
	data: GameUpdate;
	onClose: () => void;
	onSave: (data: GameUpdate) => void;
}

/**
 * GameEditModal component
 *
 * Modal interface to edit a game's details.
 * - Validates input using Zod before applying changes.
 * - Allows updating the name, image, max score, and subject.
 * - Fetches available subjects dynamically for the dropdown.
 *
 * @param data - The current game data to prefill the form
 * @param onClose - Callback to close the modal
 * @param onSave - Callback triggered with the updated game data upon saving
 */
const GameEditModal: React.FC<GameEditModalProps> = ({
	data,
	onClose,
	onSave
}) => {
	// const [idSubject, setIdSubject] = useState(data.idSubject); out
	const [name, setName] = useState(data.name);
	const [img, setImg] = useState(data.img);
	const [maxScore, setMaxScore] = useState<string>(String(data.maxScore));
	const [validationError, setValidationError] = useState<string | null>(null);

	const { subjects, error: subjectsError } = useSubjectsTab();

	/**
	 * Zod schema to validate the form fields for updating a game.
	 */
	const updateGameSchema = z.object({
		name: z.string().min(1, 'Game name is required'),
		img: z.string().min(1, 'Game image is required'),
		maxScore: z.number().min(1, 'Max score must be a positive number')
	});

	/**
	 * handleSubmit
	 *
	 * Validates and prepares the updated game data, then calls onSave and closes the modal.
	 *
	 * @param e - React form event
	 */
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		setValidationError(null);

		const parsedScore = parseFloat(maxScore);
		if (isNaN(parsedScore)) {
			setValidationError('Max score must be a valid number');
			return;
		}

		const validationResult = updateGameSchema.safeParse({
			name,
			img,
			maxScore: parsedScore
		});

		if (!validationResult.success) {
			const firstError =
				validationResult.error.errors[0]?.message || 'Unknown error';
			setValidationError(firstError);
			return;
		}

		// onSave({ idSubject, name, img, maxScore: parsedScore }); out
		onSave({name, img, maxScore: parsedScore });
		onClose();
	};

	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<h3 className='text-center mb-3'>Edit Game</h3>

				{/* Form to update game fields */}
				<form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
					{/* Input: Game name */}
					<Input
						placeholder='Name'
						type='text'
						value={name}
						onChange={e => setName(e.target.value)}
					/>

					{/* Input: Game image URL */}
					<Input
						placeholder='Image'
						type='text'
						value={img}
						onChange={e => setImg(e.target.value)}
					/>

					{/* Input: Game max score */}
					<Input
						placeholder='Max Score'
						type='text'
						value={maxScore}
						onChange={e => setMaxScore(e.target.value)}
					/>
					
					{/* Dropdown: Subject selection */}
					{/*
					<Dropdown
						options={subjects.map(s => s.name)}
						placeholder='Select Subject'
						onChange={selectedName => {
							const selected = subjects.find(s => s.name === selectedName);
							if (selected) setIdSubject(selected.id);
						}}
					/>*/}

					{/* Form controls and feedback */}
					<div className='d-flex justify-content-between mt-3'>
						<Button text='Cancel' onClick={onClose} />
						<Button text='Save' />
					</div>

					{/* Error messages */}
					{subjectsError && <Toast type='error' message={subjectsError} />}
					{validationError && <Toast type='error' message={validationError} />}
				</form>
			</div>
		</div>
	);
};

export default GameEditModal;
