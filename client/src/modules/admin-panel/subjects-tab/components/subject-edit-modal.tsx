import React, { useState } from 'react';
import { z } from 'zod';
import { SubjectUpdate } from '../../../shared/api/domain/subject';
import Button from '../../../shared/components/ui/Button';
import Input from '../../../shared/components/ui/Input';
import Toast from '../../../shared/components/ui/toast';
import '../../styles/edit-modal.css';

interface SubjectEditModalProps {
	data: SubjectUpdate;
	onClose: () => void;
	onSave: (data: SubjectUpdate) => void;
}

/**
 * SubjectEditModal component
 *
 * Renders a modal interface to update subject details.
 * - Allows editing of subject name, image, and background image.
 * - Validates form fields using Zod schema before submitting.
 * - Displays validation error messages when applicable.
 *
 * @param data - The current subject data used to prefill the form
 * @param onClose - Callback to close the modal without saving
 * @param onSave - Callback invoked with updated data when saving
 */
const SubjectEditModal: React.FC<SubjectEditModalProps> = ({
	data,
	onClose,
	onSave
}) => {
	const [name, setName] = useState(data.name);
	const [img, setImg] = useState(data.img);
	const [imgBackground, setImgBackground] = useState(data.imgBackground);
	const [validationError, setValidationError] = useState<string | null>(null);

	/**
	 * Zod schema to validate the subject update fields.
	 */
	const updateSubjectSchema = z.object({
		name: z.string().min(1, 'Subject name is required'),
		img: z.string().min(1, 'Subject image is required'),
		imgBackground: z.string().min(1, 'Subject background image is required')
	});

	/**
	 * handleSubmit
	 *
	 * Validates form fields and invokes onSave with updated data if valid.
	 * Closes the modal after successful submission.
	 *
	 * @param e - React form submit event
	 */
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		setValidationError(null);

		const validationResult = updateSubjectSchema.safeParse({
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

		onSave({ name, img, imgBackground });
		onClose();
	};

	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<h3 className='text-center mb-3'>Edit Subject</h3>

				{/* Form to update subject fields */}
				<form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
					{/* Input: Subject name */}
					<Input
						placeholder='Name'
						type='text'
						value={name}
						onChange={e => setName(e.target.value)}
					/>

					{/* Input: Subject image URL */}
					<Input
						placeholder='Image'
						type='text'
						value={img}
						onChange={e => setImg(e.target.value)}
					/>

					{/* Input: Background image URL */}
					<Input
						placeholder='Background Image'
						type='text'
						value={imgBackground}
						onChange={e => setImgBackground(e.target.value)}
					/>

					{/* Action buttons and validation feedback */}
					<div className='d-flex justify-content-between mt-3'>
						<Button text='Cancel' onClick={onClose} />
						<Button text='Save' />
						{validationError && (
							<Toast type='error' message={validationError} />
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default SubjectEditModal;
