import React, { useState } from 'react';
import { z } from 'zod';
import { GameCreate } from '../../shared/api/domain/game'; 
import Button from '../../shared/components/ui/Button';
import Input from '../../shared/components/ui/Input';
import Toast from '../../shared/components/ui/toast';
import useCreateGame from './hooks/use-create-game';
import LoadingMsg from '../../shared/components/ui/loading-msg';

const CreateGameTab: React.FC = () => {
	const [name, setName] = useState<string>('');
	const [img, setImg] = useState<string>('');
    

	const [gameFile, setGameFile] = useState<File | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [useImageUrl, setUseImageUrl] = useState<boolean>(true);
    
	const [validationError, setValidationError] = useState<string | null>(null);

	const { createGame, error, success, loading } = useCreateGame();

	const createGameSchema = z.object({
		name: z.string().min(1, 'Game name is required')
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setValidationError(null);

		// Text Validation (Zod)
		const parsedData = createGameSchema.safeParse({ name });

		if (!parsedData.success) {
			const firstError = parsedData.error.errors[0]?.message || 'Unknown error';
			setValidationError(firstError);
			return;
		}

		// Manual validation of the .zip file
		if (!gameFile) {
			setValidationError('The .zip file is required');
			return;
		}

		// Manual image validation (depending on the mode)
		if (useImageUrl && img.trim() === '') {
			setValidationError('Enter a valid image URL or switch to uploading a file');
			return;
		}

		if (!useImageUrl && !imageFile) {
			setValidationError('Select an image file or switch to using a URL');
			return;
		}

		const newGame = new GameCreate(
			name,
			useImageUrl ? img : '', // If you upload a file, the text URL will be empty
			gameFile,
			useImageUrl ? null : imageFile
		);

		await createGame(newGame);

		// We clean everything after success
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

			{/* INPUT .ZIP FILE */}
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

			{loading ? (
				<LoadingMsg message="Loading game..." />
			) : (
				<Button text='Create'/>
			)}

			{validationError && <Toast type='error' message={validationError} />}
			{error && <Toast type='error' message={error} />}
			{success && <Toast type='success' message='Game created successfully' />}
		</form>
	);
};

export default CreateGameTab;