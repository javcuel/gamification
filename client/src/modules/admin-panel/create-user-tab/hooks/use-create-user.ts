import { useState } from 'react';
import { User } from '../../../shared/api/domain/user';
import { userRepository } from '../../../shared/api/repository/user.repository';

const useCreateUser = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const createUser = async (data: User) => {
    setError(null);
    setSuccess(false);

    try {
      await userRepository.create(data);
      setSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { createUser, error, success, loading };
};

export default useCreateUser;
