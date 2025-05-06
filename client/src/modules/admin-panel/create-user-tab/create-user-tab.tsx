import React, { useState } from 'react';
import { ROLES } from '../../../constants/roles';
import Button from '../../shared/components/ui/button';
import Dropdown from '../../shared/components/ui/dropdown';
import ErrorMsg from '../../shared/components/ui/error-msg';
import Input from '../../shared/components/ui/input';
import SuccessMsg from '../../shared/components/ui/success-msg';
import '../styles/admin-add-card.css';
import useCreateUser from './hooks/use-create-user';
import { User } from '../../shared/api/domain/user';
import LoadingMsg from '../../shared/components/ui/loading-msg';

const CreateUserTab: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');
  const [role, setRole] = useState(ROLES.PLAYER);
  const [group, setGroup] = useState<string>('');
  const { createUser, error, success, loading } = useCreateUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = new User(0, group, role, name, passwd);

    await createUser(newUser);

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
      <h3 className="text-center mb-4">Create User</h3>
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
        options={Object.keys(ROLES)}
        placeholder="User Role"
        onChange={(value) => setRole(value)}
      />
      <Input
        placeholder="Upload CSV"
        type="text"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      />
      <Button text="Create" />

      {error && <ErrorMsg message={error}></ErrorMsg>}
      {success && <SuccessMsg message={'User created'}></SuccessMsg>}
      {loading && <LoadingMsg message="Creating new user..."></LoadingMsg>}
    </form>
  );
};

export default CreateUserTab;
