import React, { useState } from 'react';
import Button from '../../shared/ui/Button';
import Dropdown from '../../shared/ui/Dropdown';
import Input from '../../shared/ui/Input';
import '../styles/AdminAddCard.css';

const AdminAddGameTab: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');
  const [group, setGroup] = useState<string>('');

  const handleSubmit = async () => {
    /*  e.preventDefault(); */
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
        value={passwd}
        onChange={(e) => setPasswd(e.target.value)}
      />
      <Input
        placeholder="Max Score"
        type="text"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
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
      <Button text="Add Game" onClick={handleSubmit} />
      {/* {error && <div className="text-danger mt-3">{error}</div>}
        {success && (
          <div className="text-success mt-3">Game added successfully!</div>
        )} */}
    </form>
  );
};

export default AdminAddGameTab;
