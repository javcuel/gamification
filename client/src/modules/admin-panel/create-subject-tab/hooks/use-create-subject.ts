import { useState } from 'react';
import { SubjectCreate } from '../../../shared/api/domain/subject';
import { subjectRepository } from '../../../shared/api/repository/subject.repository';

const useCreateSubject = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const createSubject = async (data: SubjectCreate) => {
    setError(null);
    setSuccess(false);

    try {
      await subjectRepository.create(data);
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

  return { createSubject, error, success, loading };
};

export default useCreateSubject;
