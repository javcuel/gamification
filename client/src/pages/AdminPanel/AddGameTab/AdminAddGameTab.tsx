import React, { useState } from 'react';
import Button from '../../shared/ui/Button';
import Dropdown from '../../shared/ui/Dropdown';
import Input from '../../shared/ui/Input';
import ErrorMsg from '../../shared/ui/ErrorMsg';
import SuccessMsg from '../../shared/ui/SuccessMsg';
import useAddGame from './hooks/useAddGame';

import '../styles/AdminAddCard.css';

const AdminAddGameTab: React.FC = () => {
  const [idSubject, setIdSubject] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const [maxScore, setMaxScore] = useState<number>(0);

  const { addGame, error, success } = useAddGame();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      idSubject,
      name,
      img,
      maxScore,
    };

    await addGame(payload);

    setIdSubject(0);
    setName('');
    setImg('');
    setMaxScore(0);
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
        options={[
          'Programming',
          'Computación',
          'Fundamentos',
          'Fundamentos',
          'Fundamentos',
          'Fundamentos',
          'Fundamentos',
          'Fundamentos',
          'Fundamentos',
          'Fundamentos',
          'Fundamentos',
          'Fundamentos',
          'Fundamentos',
          'Fundamentos',
          'Fundamentos',
          'sadaksjdkajsdkajsdkajslkdjaskldjklasjdlkas',
          'd',
        ]}
        placeholder="1"
      />
      <Button text="Add Game" />
      {error && <ErrorMsg message={error}></ErrorMsg>}
      {success && <SuccessMsg message={'Game created'}></SuccessMsg>}
    </form>
  );
};

export default AdminAddGameTab;
