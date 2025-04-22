import { useState } from 'react';

import { UserApi, UserApiPayload } from '../../../../api/user';

const useAddUser = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addUser = async (payload: UserApiPayload) => {
    setError(null);
    setSuccess(false);

    try {
      await UserApi.create(payload);
      setSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return { addUser, error, success };
};

export default useAddUser;
