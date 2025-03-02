import { useEffect, useState } from "react";
import { User } from "../../../../entities/user";
import {
  deleteUser as deleteUserService,
  fetchUsers,
} from "../../adapters/api/userService";
/** TODO: Esto igual separarlo en dos hooks, uno que haga el fetch de los usuarios y otro que haga el delete */

/**
 * Custom Hook: useUsers
 * Fetches and manages the state of users.
 */
const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      }
    };

    loadUsers();
  }, []);

  const deleteUser = async (userId: number) => {
    try {
      await deleteUserService(userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete user");
    }
  };

  return { users, error, deleteUser };
};

export default useUsers;
