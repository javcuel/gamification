import { useEffect, useState } from 'react';
import { User } from '../../../shared/api/domain/user';
import { userRepository } from '../../../shared/api/repository/user.repository';

const useUsersTab = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await userRepository.getAll();
        setUsers(data);
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

  return { users, setUsers, error };
};

export default useUsersTab;
