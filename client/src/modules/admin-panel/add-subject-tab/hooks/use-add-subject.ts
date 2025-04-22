import { useState } from 'react';
import { SubjectApi, SubjectApiPayload } from '../../../../basura/subject';

const useAddSubject = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addSubject = async (payload: SubjectApiPayload) => {
    setError(null);
    setSuccess(false);

    try {
      await SubjectApi.create(payload);
      setSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return { addSubject, error, success };
};

export default useAddSubject;
