import { useState } from 'react';
import { Subject } from '../../../shared/api/domain/subject';
import { subjectRepository } from '../../../shared/api/repository/subject.repository';

const useUpdateSubject = (onUpdateSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateSubject = async (id: number, data: Subject) => {
    setLoading(true);
    setError(null);

    try {
      await subjectRepository.update(id, data);
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

  return { updateSubject, loading, error };
};

export default useUpdateSubject;
