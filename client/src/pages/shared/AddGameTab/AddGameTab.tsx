import React, { useState } from 'react';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import Input from '../ui/Input';
import useAddGame from './hooks/useAddGame';
import ErrorMsg from '../../shared/ui/ErrorMsg';
import SuccessMsg from '../../shared/ui/SuccessMsg';

const AddGameTab: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [idSubject, setIdSubject] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const [maxScore, setMaxScore] = useState<string>('');

  const { addGame, error, success } = useAddGame();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      idSubject: Number(idSubject),
      name,
      img,
      maxScore: Number(maxScore),
    };

    await addGame(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column align-items-center justify-content-center gap-3 mx-auto"
      style={{ width: '100%' }}
    >
      <h3 className="text-center mb-4">Add Game</h3>

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
      <Button text="Add Game" />

      {error && <ErrorMsg message={error}></ErrorMsg>}
      {success && <SuccessMsg message={'Subject created'}></SuccessMsg>}
    </form>
  );
};

export default AddGameTab;
