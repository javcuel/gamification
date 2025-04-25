import { useState } from 'react';
import { Subject } from '../../../shared/api/domain/subject';
import { subjectRepository } from '../../../shared/api/repository/subject.repository';

const useUpdateSubject = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateSubject = async (subject: Subject) => {
    try {
      setLoading(true);
      setError(null);

      await subjectRepository.update(subject.id, subject);

      onSuccess?.();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ha ocurrido un error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    updateSubject,
    loading,
    error,
  };
};

export default useUpdateSubject;
