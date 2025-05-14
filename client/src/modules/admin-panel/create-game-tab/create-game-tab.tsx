import React, { useState } from 'react';
import { GameCreate } from '../../shared/api/domain/game';
import Button from '../../shared/components/ui/button';
import Dropdown from '../../shared/components/ui/dropdown';
import Toast from '../../shared/components/ui/toast';
import Input from '../../shared/components/ui/input';
import useCreateGame from './hooks/use-create-game';
import LoadingMsg from '../../shared/components/ui/loading-msg';
import { z } from 'zod';

const CreateGameTab: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [idSubject, setIdSubject] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const [maxScore, setMaxScore] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const { createGame, error, success, loading } = useCreateGame();

  const createGameSchema = z.object({
    name: z.string().min(1, 'Game name is required'),
    img: z.string().min(1, 'Game image is required'),
    maxscore: z.number().min(1, 'Max score must be a positive number'),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    setValidationError(null);
    const validationResult = createGameSchema.safeParse([name, img, maxScore]);

    if (!validationResult.success) {
      const firstError =
        validationResult.error.errors[0]?.message || 'Unknown error';
      setValidationError(firstError);
      return;
    }

    // Submit
    const newGame = new GameCreate(
      Number(idSubject),
      img,
      name,
      Number(maxScore)
    );

    await createGame(newGame);

    setName('');
    setIdSubject('');
    setImg('');
    setMaxScore('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column align-items-center justify-content-center gap-3 mx-auto"
      style={{ width: '100%' }}
    >
      <h3 className="text-center mb-4">Create Game</h3>

      <Input
        placeholder="New Game"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Game Img"
        type="password"
        value={img}
        onChange={(e) => setImg(e.target.value)}
      />
      <Input
        placeholder="Max Score"
        type="text"
        value={maxScore}
        onChange={(e) => setMaxScore(e.target.value)}
      />
      <Dropdown
        options={['Option 1', 'Option 2', 'Option 3']}
        placeholder="Subject"
        onChange={(value) => setIdSubject(value)}
      />
      <Button text="Create" />

      {error && <Toast type="error" message={error} />}
      {validationError && <Toast type="error" message={validationError} />}
      {success && <Toast type="success" message={'Subject created'} />}
      {loading && <LoadingMsg message="Creating new game..." />}
    </form>
  );
};

export default CreateGameTab;
