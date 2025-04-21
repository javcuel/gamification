import { useEffect, useState } from 'react';

import { Subject } from '../api/domain/subject';
import { subjectRepository } from '../api/repository/subject.repository';

const useSubject = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const data = await subjectRepository.getAll();
        setSubjects(data);
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

    loadSubjects();
  }, []);

  return { subjects, error, loading };
};

export default useSubject;
