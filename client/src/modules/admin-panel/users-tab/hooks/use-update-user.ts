import { useState } from 'react';
import { UserUpdate } from '../../../shared/api/domain/user';
import { userRepository } from '../../../shared/api/repository/user.repository';

const useUpdateUser = (onUpdateSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (id: number, data: UserUpdate) => {
    setLoading(true);
    setError(null);

    try {
      await userRepository.update(id, data);
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};

export default useUpdateUser;
