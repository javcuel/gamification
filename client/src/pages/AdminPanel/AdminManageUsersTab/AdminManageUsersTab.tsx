import React from "react";
import useUsers from "./hooks/useUsers";
import UserItem from "./UserItem";

/**
 * ManageUsersTab Component
 * Displays a list of users with options to modify or delete.
 */
const AdminManageUsersTab: React.FC = () => {
  const { users, error, deleteUser } = useUsers();

  return (
    <div>
      {error && <div className="text-danger">{error}</div>}

      <div className="row m-auto">
        {users.map((user) => (
          <div key={user.id} className="col-md-4 mt-3">
            <UserItem user={user} onDelete={deleteUser} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminManageUsersTab;
