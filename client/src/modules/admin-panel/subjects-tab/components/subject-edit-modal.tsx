import React, { useState } from 'react';
import { z } from 'zod';
import { SubjectUpdate } from '../../../shared/api/domain/subject';
import Button from '../../../shared/components/ui/Button';
import Input from '../../../shared/components/ui/Input';
import Toast from '../../../shared/components/ui/toast';
import '../../styles/edit-modal.css';

interface SubjectEditModalProps {
	data: { name: string; img: string; imgBackground: string }; 
	onClose: () => void;
	onSave: (data: SubjectUpdate) => void;
}

const SubjectEditModal: React.FC<SubjectEditModalProps> = ({
	data,
	onClose,
	onSave
}) => {
	const [name, setName] = useState(data.name);
	const [img, setImg] = useState(data.img);
	const [imgBackground, setImgBackground] = useState(data.imgBackground);

	// Archivos
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [bgImageFile, setBgImageFile] = useState<File | null>(null);

	// Toggles
	const [useImageUrl, setUseImageUrl] = useState<boolean>(true);
	const [useBgImageUrl, setUseBgImageUrl] = useState<boolean>(true);

	const [validationError, setValidationError] = useState<string | null>(null);

	const updateSubjectSchema = z.object({
		name: z.string().min(1, 'Subject name is required'),
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setValidationError(null);

		const validationResult = updateSubjectSchema.safeParse({ name });

		if (!validationResult.success) {
			const firstError = validationResult.error.errors[0]?.message || 'Unknown error';
			setValidationError(firstError);
			return;
		}

		if (useImageUrl && img.trim() === '') {
			setValidationError('Introduce una URL válida para el icono o sube un archivo');
			return;
		}
		if (!useImageUrl && !imageFile) {
			setValidationError('Selecciona un archivo para el icono o usa la opción URL');
			return;
		}

		if (useBgImageUrl && imgBackground.trim() === '') {
			setValidationError('Introduce una URL válida para el fondo o sube un archivo');
			return;
		}
		if (!useBgImageUrl && !bgImageFile) {
			setValidationError('Selecciona un archivo para el fondo o usa la opción URL');
			return;
		}

		// Instanciamos el objeto de dominio limpio
		const updatedSubject = new SubjectUpdate(
			name,
			useImageUrl ? img : '',
			useBgImageUrl ? imgBackground : '',
			useImageUrl ? null : imageFile,
			useBgImageUrl ? null : bgImageFile
		);

		onSave(updatedSubject);
		onClose();
	};

	return (
		<div className='modal-overlay'>
			<div className='modal-content' style={{ maxWidth: '400px' }}>
				<h3 className='text-center mb-3'>Edit Subject</h3>

				<form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
					<Input placeholder='Name' type='text' value={name} onChange={e => setName(e.target.value)} />

					{/* ICONO */}
					<div className="w-100 d-flex flex-column gap-2">
						<div className="d-flex justify-content-between align-items-center mb-1">
							<label className="text-start mb-0" style={{ color: 'white', fontSize: '0.9rem' }}>Subject Icon</label>
							<button type="button" className="btn btn-sm btn-outline-light" style={{ fontSize: '0.8rem', padding: '2px 8px' }} onClick={() => setUseImageUrl(!useImageUrl)}>
								{useImageUrl ? 'Subir Archivo' : 'Usar URL'}
							</button>
						</div>
						{useImageUrl ? (
							<Input placeholder='Image URL' type='text' value={img} onChange={e => setImg(e.target.value)} />
						) : (
							<input type="file" accept="image/*" className="form-control" onChange={e => setImageFile(e.target.files?.[0] || null)} />
						)}
					</div>

					{/* FONDO */}
					<div className="w-100 d-flex flex-column gap-2">
						<div className="d-flex justify-content-between align-items-center mb-1">
							<label className="text-start mb-0" style={{ color: 'white', fontSize: '0.9rem' }}>Background Image</label>
							<button type="button" className="btn btn-sm btn-outline-light" style={{ fontSize: '0.8rem', padding: '2px 8px' }} onClick={() => setUseBgImageUrl(!useBgImageUrl)}>
								{useBgImageUrl ? 'Subir Archivo' : 'Usar URL'}
							</button>
						</div>
						{useBgImageUrl ? (
							<Input placeholder='Background Image URL' type='text' value={imgBackground} onChange={e => setImgBackground(e.target.value)} />
						) : (
							<input type="file" accept="image/*" className="form-control" onChange={e => setBgImageFile(e.target.files?.[0] || null)} />
						)}
					</div>

					<div className='d-flex justify-content-between mt-3'>
						<Button text='Cancel' onClick={onClose} />
						<Button text='Save' />
					</div>
					{validationError && <Toast type='error' message={validationError} />}
				</form>
			</div>
		</div>
	);
};

export default SubjectEditModal;