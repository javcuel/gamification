import { useState } from 'react';
import { createUser } from '../../api/userService';

interface AddUserPayload {
  name: string;
  passwd: string;
  type: string;
  group: string;
}

const useAddUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addUser = async (payload: AddUserPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await createUser(payload);
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message || 'Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  return { addUser, loading, error, success };
};

export default useAddUser;
