import React, { useState } from 'react';
import Button from '../../shared/ui/Button';
import Dropdown from '../../shared/ui/Dropdown';
import Input from '../../shared/ui/Input';
import '../styles/AdminAddCard.css';
import useAddUser from './hooks/useAddUser';
import ErrorMsg from '../../shared/ui/ErrorMsg';
import SuccessMsg from '../../shared/ui/SuccessMsg';
import { ROLES } from '../../../constants/roles';

const AdminAddUserTab: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');
  const [role, setRole] = useState(ROLES.PLAYER);
  const [group, setGroup] = useState<string>('');
  const { addUser, error, success } = useAddUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      passwd,
      role,
      group,
    };

    await addUser(payload);

    setName('');
    setPasswd('');
    setRole('');
    setGroup('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column align-items-center justify-content-center gap-3 mx-auto"
      style={{ width: '100%' }}
    >
      <h3 className="text-center mb-4">Add User</h3>
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
      <Dropdown options={Object.keys(ROLES)} placeholder="User Role" />
      <Input
        placeholder="Upload CSV"
        type="text"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      />
      <Button text="Add User" />

      {error && <ErrorMsg message={error}></ErrorMsg>}
      {success && <SuccessMsg message={'User created'}></SuccessMsg>}
    </form>
  );
};

export default AdminAddUserTab;
