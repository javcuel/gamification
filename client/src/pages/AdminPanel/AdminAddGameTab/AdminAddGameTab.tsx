import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Dropdown from '../../../components/ui/DropDown';
import '../styles/AdminAddCard.css';

const AdminAddGameTab: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');
  const [subject, setSubject] = useState('1');
  const [group, setGroup] = useState<string>('');

  const handleSubmit = async () => {
    /*  e.preventDefault(); */
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '70vh' }}
    >
      <div className="card input-card" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Add Game</h3>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
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
            options={['Option 1', 'Option 2', 'Option 3']}
            selected={subject || undefined}
            onSelect={(option) => setSubject(option)}
            placeholder="Subject"
          />
          <Button text="Add Game" onClick={handleSubmit} />
        </form>

        {/* {error && <div className="text-danger mt-3">{error}</div>}
        {success && (
          <div className="text-success mt-3">Game added successfully!</div>
        )} */}
      </div>
    </div>
  );
};

export default AdminAddGameTab;
