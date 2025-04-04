import { useState } from 'react';
import { SubjectApi } from '../../../api/subject';

const useDeleteSubject = (onDeleteSuccess: (subjectId: number) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteSubject = async (subjectId: number) => {
    setLoading(true);
    setError(null);

    try {
      await SubjectApi.delete(subjectId);
      onDeleteSuccess(subjectId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return { handleDeleteSubject, loading, error };
};

export default useDeleteSubject;
