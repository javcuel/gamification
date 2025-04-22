import { useEffect, useState } from 'react';
import { User, UserApi } from '../../../../api/user';
/** TODO: Esto igual separarlo en dos hooks, uno que haga el fetch de los usuarios y otro que haga el delete */

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await UserApi.getAll();
        setUsers(fetchedUsers);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    loadUsers();
  }, []);

  const deleteUser = async (userId: number) => {
    try {
      await UserApi.delete(userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return { users, error, deleteUser };
};

export default useUsers;
