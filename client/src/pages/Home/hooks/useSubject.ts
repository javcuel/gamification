import { useEffect, useState } from 'react';

import { Subject, SubjectApi } from '../../../api/subject';

const useSubject = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const data = await SubjectApi.getAll();
        setSubjects(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    loadSubjects();
  }, []);

  return { subjects, error };
};

export default useSubject;
