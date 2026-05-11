import React, { useState } from 'react';
import { z } from 'zod';
import { GameCreate } from '../../shared/api/domain/game'; // Importación añadida
import Button from '../../shared/components/ui/Button';
import Input from '../../shared/components/ui/Input';
import Toast from '../../shared/components/ui/toast';
import useCreateGame from './hooks/use-create-game';

const CreateGameTab: React.FC = () => {
	const [name, setName] = useState<string>('');
	const [img, setImg] = useState<string>('');
    
	// CORRECCIÓN 1: Estados nombrados correctamente para coincidir con la lógica
	const [gameFile, setGameFile] = useState<File | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [useImageUrl, setUseImageUrl] = useState<boolean>(true); // Interruptor URL/Archivo
    
	const [validationError, setValidationError] = useState<string | null>(null);

	const { createGame, error, success } = useCreateGame();

	// CORRECCIÓN 2: Relajamos zod porque la URL (img) no es obligatoria si subes un archivo
	const createGameSchema = z.object({
		name: z.string().min(1, 'Game name is required')
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setValidationError(null);

		// 1. Validación de texto (Zod)
		const parsedData = createGameSchema.safeParse({ name });

		if (!parsedData.success) {
			const firstError = parsedData.error.errors[0]?.message || 'Unknown error';
			setValidationError(firstError);
			return;
		}

		// 2. Validación manual del archivo .zip
		if (!gameFile) {
			setValidationError('El archivo .zip del juego es obligatorio');
			return;
		}

		// 3. Validación manual de la imagen (según el modo)
		if (useImageUrl && img.trim() === '') {
			setValidationError('Introduce una URL de imagen válida o cambia a subir archivo');
			return;
		}

		if (!useImageUrl && !imageFile) {
			setValidationError('Selecciona un archivo de imagen o cambia a usar URL');
			return;
		}

		// 4. CREAMOS EL MODELO DE DOMINIO PURO
		// Se lo pasamos al hook, y el repositorio se encargará del FormData
		const newGame = new GameCreate(
			name,
			useImageUrl ? img : '', // Si sube archivo, la URL de texto va vacía
			gameFile,
			useImageUrl ? null : imageFile
		);

		await createGame(newGame);

		// Limpiamos todo tras éxito
		if (!error) {
			setName('');
			setImg('');
			setGameFile(null);
			setImageFile(null);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='d-flex flex-column align-items-center justify-content-center gap-3 mx-auto'
			style={{ width: '100%' }}
		>
			<h3 className='text-center mb-4'>Create Game</h3>

			<Input placeholder='New Game' type='text' value={name} onChange={e => setName(e.target.value)} />

			{/* CORRECCIÓN 3: Interfaz visual para alternar Imagen URL vs Archivo */}
			<div className="w-100 d-flex flex-column gap-2" style={{ maxWidth: '300px' }}>
				<div className="d-flex justify-content-between align-items-center mb-1">
					<label className="text-start mb-0" style={{ color: 'white', fontSize: '0.9rem' }}>
						Game Image
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
					<Input 
						placeholder='Game Img URL' 
						type='text' 
						value={img} 
						onChange={e => setImg(e.target.value)} 
					/>
				) : (
					<input
						type="file"
						accept="image/*"
						className="form-control"
						onChange={(e) => setImageFile(e.target.files?.[0] || null)}
					/>
				)}
			</div>

			{/* INPUT DE ARCHIVO .ZIP */}
			<div className="w-100 d-flex flex-column gap-2" style={{ maxWidth: '300px' }}>
				<label htmlFor="gameFile" className="text-start mb-0" style={{ color: 'white', fontSize: '0.9rem' }}>
					Game File (.zip)
				</label>
				<input 
					id="gameFile"
					type="file" 
					accept=".zip" 
					className="form-control" 
					onChange={(e) => setGameFile(e.target.files?.[0] || null)} 
				/>
			</div>

			<Button text='Create'/>
			
			{validationError && <Toast type='error' message={validationError} />}
			{error && <Toast type='error' message={error} />}
			{success && <Toast type='success' message='Game created successfully' />}
		</form>
	);
};

export default CreateGameTab;