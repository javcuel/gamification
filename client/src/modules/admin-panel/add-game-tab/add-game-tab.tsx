import React, { useState } from 'react';
import { Game } from '../../shared/api/domain/game';
import Button from '../../shared/components/ui/button';
import Dropdown from '../../shared/components/ui/dropdown';
import ErrorMsg from '../../shared/components/ui/error-msg';
import Input from '../../shared/components/ui/input';
import SuccessMsg from '../../shared/components/ui/success-msg';
import useAddGame from './hooks/use-add-game';

const AddGameTab: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [idSubject, setIdSubject] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const [maxScore, setMaxScore] = useState<string>('');

  const { addGame, error, success } = useAddGame();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newGame = new Game(
      0,
      Number(idSubject),
      img,
      name,
      Number(maxScore),
      true,
      true,
      0,
      0,
      true,
      true
    );

    await addGame(newGame);

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
