import React, { useState } from 'react';
import { ROLES } from '../../../constants/roles';
import Button from '../../shared/components/ui/button';
import Dropdown from '../../shared/components/ui/dropdown';
import Toast from '../../shared/components/ui/toast';
import Input from '../../shared/components/ui/input';

import '../styles/admin-add-card.css';
import useCreateUser from './hooks/use-create-user';
import { User } from '../../shared/api/domain/user';
import LoadingMsg from '../../shared/components/ui/loading-msg';
import { z } from 'zod';

const CreateUserTab: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');
  const [role, setRole] = useState(ROLES.PLAYER);
  const [group, setGroup] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const { createUser, error, success, loading } = useCreateUser();

  //TODO: A ver como metes aqui la validación del rol XD.
  const createUserSchema = z.object({
    name: z.string().min(1, 'User name is required'),
    passwd: z.string().min(1, 'User password is required'),
    group: z.string().min(1, 'User group is required'),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    setValidationError(null);
    const validationResult = createUserSchema.safeParse({
      name,
      passwd,
      group,
    });

    if (!validationResult.success) {
      const firstError =
        validationResult.error.errors[0]?.message || 'Unknown error';
      setValidationError(firstError);
      return;
    }

    // Submit
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

      {error && <Toast type="error" message={error} />}
      {validationError && <Toast type="error" message={validationError} />}
      {success && <Toast type="success" message={'User created'} />}
      {loading && <LoadingMsg message="Creating new user..." />}
    </form>
  );
};

export default CreateUserTab;
