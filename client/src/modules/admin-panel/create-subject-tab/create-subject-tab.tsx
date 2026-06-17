import React, { useState } from 'react';
import { SubjectCreate } from '../../shared/api/domain/subject';
import Button from '../../shared/components/ui/Button';
import Input from '../../shared/components/ui/Input';
import Toast from '../../shared/components/ui/toast';
import useCreateSubject from './hooks/use-create-subject';

import { z } from 'zod';
import '../styles/admin-add-card.css';

const CreateSubjectTab: React.FC = () => {
	const [name, setName] = useState<string>('');
	const [img, setImg] = useState<string>('');
	const [imgBackground, setImgBackground] = useState<string>('');

	const [imageFile, setImageFile] = useState<File | null>(null);
	const [bgImageFile, setBgImageFile] = useState<File | null>(null);

	const [useImageUrl, setUseImageUrl] = useState<boolean>(true);
	const [useBgImageUrl, setUseBgImageUrl] = useState<boolean>(true);

	const [validationError, setValidationError] = useState<string | null>(null);

	const { createSubject, error, success } = useCreateSubject();

	const createSubjectSchema = z.object({
		name: z.string().min(1, 'Subject name is required'),
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setValidationError(null);

		const parsedData = createSubjectSchema.safeParse({ name });

		if (!parsedData.success) {
			const firstError = parsedData.error.errors[0]?.message || 'Unknown error';
			setValidationError(firstError);
			return;
		}

		if (useImageUrl && img.trim() === '') {
			setValidationError('Enter a valid URL for the icon or upload a file');
			return;
		}
		if (!useImageUrl && !imageFile) {
			setValidationError('Select a file for the icon or use the URL option.');
			return;
		}

		if (useBgImageUrl && imgBackground.trim() === '') {
			setValidationError('Enter a valid URL for the background or upload a file');
			return;
		}
		if (!useBgImageUrl && !bgImageFile) {
			setValidationError('Select a background file or use the URL option');
			return;
		}

		const newSubject = new SubjectCreate(
			name,
			useImageUrl ? img : '',
			useBgImageUrl ? imgBackground : '',
			useImageUrl ? undefined : (imageFile || undefined),
			useBgImageUrl ? undefined : (bgImageFile || undefined)
		);

		await createSubject(newSubject);

		// Clean up states if successful
		if (!error) {
			setName('');
			setImg('');
			setImgBackground('');
			setImageFile(null);
			setBgImageFile(null);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='d-flex flex-column align-items-center justify-content-center gap-3 mx-auto'
			style={{ width: '100%' }}
		>
			<h3 className='text-center mb-4'>Create Subject</h3>

			<Input placeholder='Subject Name' type='text' value={name} onChange={e => setName(e.target.value)} />

			{/* ICON IMAGE SECTION */}
			<div className="w-100 d-flex flex-column gap-2" style={{ maxWidth: '300px' }}>
				<div className="d-flex justify-content-between align-items-center mb-1">
					<label className="text-start mb-0" style={{ color: 'white', fontSize: '0.9rem' }}>
						Subject Icon
					</label>
					<button
						type="button"
						className="btn btn-sm btn-outline-light"
						style={{ fontSize: '0.8rem', padding: '2px 8px' }}
						onClick={() => setUseImageUrl(!useImageUrl)}
					>
						{useImageUrl ? 'Subir Archivo' : 'Usar URL'}
					</button>
				</div>
				{useImageUrl ? (
					<Input placeholder='Subject Img URL' type='text' value={img} onChange={e => setImg(e.target.value)} />
				) : (
					<input type="file" accept="image/*" className="form-control" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
				)}
			</div>

			{/* BACKGROUND IMAGE SECTION */}
			<div className="w-100 d-flex flex-column gap-2" style={{ maxWidth: '300px' }}>
				<div className="d-flex justify-content-between align-items-center mb-1">
					<label className="text-start mb-0" style={{ color: 'white', fontSize: '0.9rem' }}>
						Background Image
					</label>
					<button
						type="button"
						className="btn btn-sm btn-outline-light"
						style={{ fontSize: '0.8rem', padding: '2px 8px' }}
						onClick={() => setUseBgImageUrl(!useBgImageUrl)}
					>
						{useBgImageUrl ? 'Subir Archivo' : 'Usar URL'}
					</button>
				</div>
				{useBgImageUrl ? (
					<Input placeholder='Background Img URL' type='text' value={imgBackground} onChange={e => setImgBackground(e.target.value)} />
				) : (
					<input type="file" accept="image/*" className="form-control" onChange={(e) => setBgImageFile(e.target.files?.[0] || null)} />
				)}
			</div>

			<Button text='Create' />

			{validationError && <Toast type='error' message={validationError} />}
			{error && <Toast type='error' message={error} />}
			{success && <Toast type='success' message='Subject created successfully' />}
		</form>
	);
};

export default CreateSubjectTab;