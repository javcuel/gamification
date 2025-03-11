import { useEffect, useState } from 'react';
import { Subject, fetchSubjects } from '../api/subject';

const useSubject = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSubjects = async () => {
      const data = await fetchSubjects().catch(() => {
        setError('Failed to load Subjects');
      });
      if (data) setSubjects(data);
    };

    loadSubjects();
  }, []);

  return { subjects, error };
};

export default useSubject;
