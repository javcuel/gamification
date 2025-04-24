import React from 'react';
import ErrorMsg from '../../shared/components/ui/error-msg';
import useUsers from './hooks/use-users-tab';
import UserManagementItem from './user-management-item';

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
