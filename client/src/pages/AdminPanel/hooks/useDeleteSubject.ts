import { useState } from 'react';
import { SubjectApi } from '../../../api/subject';

const useDeleteSubject = (onDeleteSuccess: (id: number) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteSubject = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await SubjectApi.delete(id);
      onDeleteSuccess(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return { deleteSubject, loading, error };
};

export default useDeleteSubject;
