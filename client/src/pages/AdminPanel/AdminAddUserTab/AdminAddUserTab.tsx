import React, { useState } from 'react';
import useAddUser from './hooks/useAddUser';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const AdminAddUserTab: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');
  const [type, setType] = useState('U');
  const [group, setGroup] = useState<string>('');
  const { addUser, loading, error, success } = useAddUser();

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswd(e.target.value);
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroup(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addUser({ name, passwd, type, group });
  };

  //TODO: PONER CONSTANTES EN MAYUSCULAS PARA LOS TIPOS DE USUARIOS
  return (
    <div className="container-fluid" style={{ height: '100%' }}>
      <div
        className="container-fluid d-flex flex-column"
        style={{ height: '100%' }}
      >
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Input
                placeholder="New User"
                type="text"
                value={name}
                onChange={handleUserChange}
              />
            </div>

            <div className="mb-3 ">
              <Input
                placeholder="User password"
                type="text"
                value={passwd}
                onChange={handlePasswdChange}
              />
            </div>

            <div className="mb-3">
              <Input
                placeholder="User group"
                type="text"
                value={group}
                onChange={handleGroupChange}
              />
            </div>

            {/* <div className="mb-3 w-100">
        <label htmlFor="role" className="form-label">
          Role
        </label>
        <select
          id="role"
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="U">User</option>
          <option value="P">Tester</option>
          <option value="D">Developer</option>
          <option value="A">Administrator</option>
        </select>
      </div> */}

            <div className="mb-3">
              <Button text="Add User" />
            </div>

            {error && <div className="text-danger mt-3">{error}</div>}
            {success && (
              <div className="text-success mt-3">User added successfully!</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddUserTab;
