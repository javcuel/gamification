import { useEffect, useState } from 'react';
import { fetchSubjects, Subject } from '../../../../api/subject';

const useSubjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const data = await fetchSubjects();
        setSubjects(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load subjects and games');
      }
    };

    loadSubjects();
  }, []);

  return { subjects, setSubjects, error };
};

export default useSubjects;
