import React from 'react';
import Toast from '../../shared/components/ui/toast';
import useUsersTab from './hooks/use-users-tab';
import UserManagementItem from './user-management-item';

const UsersTab: React.FC = () => {
  const { users, setUsers, error } = useUsersTab();

  const handleUserDeleted = (userId: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  return (
    <div>
      {error && <Toast type="error" message={error} />}

      <div className="row m-auto">
        {users.map((user) => (
          <div key={user.id} className="col-md-4 mt-3">
            <UserManagementItem user={user} onDelete={handleUserDeleted} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersTab;
