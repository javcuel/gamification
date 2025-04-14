import React from 'react';
import ErrorMsg from '../../shared/ui/ErrorMsg';
import useUsers from './hooks/useUsers';
import UserManagementItem from './UserManagementItem';
import UserEditModal from '../AddUserTab/UserEditModal';
import Button from '../../../pages/shared/ui/Button';
import { useState } from 'react';

const UsersTab: React.FC = () => {
  const { users, error, deleteUser } = useUsers();
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div>
      {error && <ErrorMsg message={error}></ErrorMsg>}

      <div className="row m-auto">
        {users.map((user) => (
          <div key={user.id} className="col-md-4 mt-3">
            <UserManagementItem user={user} onDelete={deleteUser} />
          </div>
        ))}
      </div>

      {showEdit && (
        <UserEditModal
          data={{
            name: 'John Doe',
            passwd: 'xsdasd',
            role: 'TEACHER',
            group: 'A1',
          }}
          onClose={() => setShowEdit(false)}
          onSave={(data) => {
            console.log('Saved user:', data);
            setShowEdit(false);
          }}
        />
      )}

      <Button text="Editar" onClick={() => setShowEdit(true)} />
    </div>
  );
};

export default UsersTab;
