import React, { useState } from 'react';
import useAddUser from './hooks/useAddUser';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Dropdown from '../../../components/ui/DropDown';
import '../styles/AdminAddCard.css';

const AdminAddUserTab: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');
  const [type, setType] = useState('U');
  const [group, setGroup] = useState<string>('');
  const { addUser, loading, error, success } = useAddUser();

  const handleSubmit = async () => {
    /*  e.preventDefault(); */
    await addUser({ name, passwd, type, group });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '70vh' }}
    >
      <div className="card input-card" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Add User</h3>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <Input
            placeholder="New User"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="User Password"
            type="password"
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
          />
          <Input
            placeholder="User Group"
            type="text"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
          <Dropdown
            options={['Option 1', 'Option 2', 'Option 3']}
            selected={type || undefined}
            onSelect={(option) => setType(option)}
            placeholder="User Type"
          />
          <Input
            placeholder="Upload CSV"
            type="text"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
          <Button text="Add User" onClick={handleSubmit} />
        </form>

        {/* {error && <div className="text-danger mt-3">{error}</div>}
        {success && (
          <div className="text-success mt-3">User added successfully!</div>
        )} */}
      </div>
    </div>
  );
};

export default AdminAddUserTab;
