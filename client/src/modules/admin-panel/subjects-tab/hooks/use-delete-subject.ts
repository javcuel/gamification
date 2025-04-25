import { useState } from 'react';
import { subjectRepository } from '../../../shared/api/repository/subject.repository';

const useDeleteSubject = (onDeleteSuccess: (id: number) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteSubject = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await subjectRepository.delete(id);
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
