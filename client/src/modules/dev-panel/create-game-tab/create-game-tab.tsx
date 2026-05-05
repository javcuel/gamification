import React, { useState } from 'react';
import { z } from 'zod';
import Button from '../../shared/components/ui/Button';
import Dropdown from '../../shared/components/ui/Dropdown';
import Input from '../../shared/components/ui/Input';
import Toast from '../../shared/components/ui/toast';
import useCreateGame from './hooks/use-create-game';

const CreateGameTab: React.FC = () => {
	const [name, setName] = useState<string>('');
	const [idSubject, setIdSubject] = useState<string>('');
	const [img, setImg] = useState<string>('');
    const [file, setFile] = useState<File | null>(null); // NUEVO ESTADO
	const [validationError, setValidationError] = useState<string | null>(null);

	const { createGame, error, success } = useCreateGame();

	const createGameSchema = z.object({
		name: z.string().min(1, 'Game name is required'),
		img: z.string().min(1, 'Game image is required'),
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setValidationError(null);

        // Validación manual del archivo
        if (!file) {
            setValidationError('El archivo .zip del juego es obligatorio');
            return;
        }

		const parsedData = createGameSchema.safeParse({
			name,
			img
		});

		if (!parsedData.success) {
			const firstError = parsedData.error.errors[0]?.message || 'Unknown error';
			setValidationError(firstError);
			return;
		}

        // CREAMOS EL FORMDATA PARA ENVIAR ARCHIVO + TEXTOS
        const formData = new FormData();
        formData.append('name', name);
        formData.append('img', img);
        formData.append('gameFile', file); // El nombre 'gameFile' debe coincidir con el del upload.single() de Node

		await createGame(formData);

        // Limpiamos todo tras éxito
        if (!error) {
            setName('');
            setIdSubject('');
            setImg('');
            setFile(null);
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
			<Input placeholder='Game Img URL' type='text' value={img} onChange={e => setImg(e.target.value)} />
			<Dropdown options={['Option 1', 'Option 2', 'Option 3']} placeholder='Subject' onChange={value => setIdSubject(value)} />

            {/* NUEVO INPUT DE ARCHIVO .ZIP */}
            <div className="w-100 d-flex flex-column gap-2" style={{ maxWidth: '300px' }}>
                <label htmlFor="gameFile" className="text-start mb-0" style={{ color: 'white', fontSize: '0.9rem' }}>
                    Game File (.zip)
                </label>
                <input 
                    id="gameFile"
                    type="file" 
                    accept=".zip" 
                    className="form-control" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)} 
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