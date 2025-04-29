import { useState } from 'react';
import { userRepository } from '../../../shared/api/repository/user.repository';

const useDeleteUser = (onDeleteSuccess: (id: number) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUser = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await userRepository.delete(id);
      onDeleteSuccess(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return { deleteUser, loading, error };
};

export default useDeleteUser;
