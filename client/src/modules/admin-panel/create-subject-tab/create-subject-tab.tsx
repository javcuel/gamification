import React, { useState } from 'react';
import { SubjectCreate } from '../../shared/api/domain/subject';
import Button from '../../shared/components/ui/Button';
import Input from '../../shared/components/ui/Input';
import Toast from '../../shared/components/ui/toast';
import useCreateSubject from './hooks/use-create-subject';

import { z } from 'zod';
import '../styles/admin-add-card.css';

/**
 * CreateSubjectTab component
 *
 * Provides a form interface for creating a new subject.
 * - Validates input fields using Zod schema.
 * - Uses a custom hook to handle the creation logic.
 * - Displays validation, error, and success messages accordingly.
 */
const CreateSubjectTab: React.FC = () => {
	const [name, setName] = useState<string>('');
	const [img, setImg] = useState<string>('');
	const [imgBackground, setImgBackground] = useState<string>('');
	const [validationError, setValidationError] = useState<string | null>(null);

	const { createSubject, error, success } = useCreateSubject();

	/**
	 * Schema for subject form validation.
	 * Ensures all fields are non-empty strings.
	 */
	const createSubjectSchema = z.object({
		name: z.string().min(1, 'Subject name is required'),
		img: z.string().min(1, 'Subject image is required'),
		imgBackground: z.string().min(1, 'Subject background image is required')
	});

	/**
	 * handleSubmit
	 *
	 * Validates form data and submits a new subject if validation passes.
	 * Clears input fields after successful creation.
	 *
	 * @param e - React form event
	 */
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setValidationError(null);

		const validationResult = createSubjectSchema.safeParse({
			name,
			img,
			imgBackground
		});

		if (!validationResult.success) {
			const firstError =
				validationResult.error.errors[0]?.message || 'Unknown error';
			setValidationError(firstError);
			return;
		}

		const newSubject = new SubjectCreate(name, img, imgBackground);
		await createSubject(newSubject);

		setName('');
		setImg('');
		setImgBackground('');
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='d-flex flex-column align-items-center justify-content-center gap-3 mx-auto'
			style={{ width: '100%' }}
		>
			<h3 className='text-center mb-4'>Create Subject</h3>

			{/* Input for subject name */}
			<Input
				placeholder='Subject Name'
				type='text'
				value={name}
				onChange={e => setName(e.target.value)}
			/>

			{/* Input for subject image */}
			<Input
				placeholder='Subject Img'
				type='text'
				value={img}
				onChange={e => setImg(e.target.value)}
			/>

			{/* Input for subject background image */}
			<Input
				placeholder='Subject Back Img'
				type='text'
				value={imgBackground}
				onChange={e => setImgBackground(e.target.value)}
			/>

			{/* Submit button */}
			<Button text='Create' />

			{/* Feedback messages */}
			{error && <Toast type='error' message={error} />}
			{validationError && <Toast type='error' message={validationError} />}
			{success && <Toast type='success' message={'Subject created!'} />}
		</form>
	);
};

export default CreateSubjectTab;
