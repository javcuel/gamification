import React from 'react';
import ErrorMsg from '../../shared/ui/ErrorMsg';
import useUsers from './hooks/useUsers';
import UserManagementItem from './UserManagementItem';

const UsersTab: React.FC = () => {
  const { users, error, deleteUser } = useUsers();

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
    </div>
  );
};

export default UsersTab;
