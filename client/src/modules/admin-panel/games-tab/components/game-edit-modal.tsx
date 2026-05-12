import React, { useState } from 'react';
import { z } from 'zod';
import { GameUpdate } from '../../../shared/api/domain/game';
import Button from '../../../shared/components/ui/Button';
import Input from '../../../shared/components/ui/Input';
import Toast from '../../../shared/components/ui/toast';
import '../../styles/edit-modal.css';

interface GameEditModalProps {
	data: { name: string; img: string };
	onClose: () => void;
	onSave: (data: GameUpdate) => void;
}

const GameEditModal: React.FC<GameEditModalProps> = ({
	data,
	onClose,
	onSave
}) => {
	const [name, setName] = useState(data.name);
	const [img, setImg] = useState(data.img);
	
	// Nuevos estados
	const [gameFile, setGameFile] = useState<File | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	// Si data.img viene de "/images/", asumimos que es una URL válida para empezar, 
	// pero le damos al usuario la opción de cambiarla.
	const [useImageUrl, setUseImageUrl] = useState<boolean>(true);
	
	const [validationError, setValidationError] = useState<string | null>(null);

	// Nombre corregido
	const updateGameSchema = z.object({
		name: z.string().min(1, 'Game name is required'),
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setValidationError(null);

		const validationResult = updateGameSchema.safeParse({ name });

		if (!validationResult.success) {
			const firstError = validationResult.error.errors[0]?.message || 'Unknown error';
			setValidationError(firstError);
			return;
		}

		// Validaciones de imagen
		if (useImageUrl && img.trim() === '') {
			setValidationError('Introduce una URL de imagen válida o cambia a subir archivo');
			return;
		}

		if (!useImageUrl && !imageFile) {
			setValidationError('Selecciona un archivo de imagen o cambia a usar URL');
			return;
		}

		// CORRECCIÓN: Instanciamos el objeto de dominio correctamente
		const updatedGame = new GameUpdate(
			name,
			useImageUrl ? img : '',
			gameFile, // Opcional (si es null, el backend no toca el zip)
			useImageUrl ? null : imageFile // Opcional
		);

		onSave(updatedGame);
		onClose();
	};

	return (
		<div className='modal-overlay'>
			<div className='modal-content' style={{ maxWidth: '400px' }}>
				<h3 className='text-center mb-3'>Edit Game</h3>

				<form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
					<Input placeholder='Name' type='text' value={name} onChange={e => setName(e.target.value)} />

					{/* SECCIÓN IMAGEN */}
					<div className="w-100 d-flex flex-column gap-2">
						<div className="d-flex justify-content-between align-items-center mb-1">
							<label className="text-start mb-0" style={{ color: 'white', fontSize: '0.9rem' }}>Game Image</label>
							<button type="button" className="btn btn-sm btn-outline-light" style={{ fontSize: '0.8rem', padding: '2px 8px' }} onClick={() => setUseImageUrl(!useImageUrl)}>
								{useImageUrl ? 'Subir Archivo' : 'Usar URL'}
							</button>
						</div>

						{useImageUrl ? (
							<Input placeholder='Game Img URL' type='text' value={img} onChange={e => setImg(e.target.value)} />
						) : (
							<input type="file" accept="image/*" className="form-control" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
						)}
					</div>

					{/* SECCIÓN JUEGO OPCIONAL */}
					<div className="w-100 d-flex flex-column gap-2">
						<label className="text-start mb-0" style={{ color: 'white', fontSize: '0.9rem' }}>
							Update Game File (.zip) <small className="text-muted">(Optional)</small>
						</label>
						<input type="file" accept=".zip" className="form-control" onChange={(e) => setGameFile(e.target.files?.[0] || null)} />
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

export default GameEditModal;