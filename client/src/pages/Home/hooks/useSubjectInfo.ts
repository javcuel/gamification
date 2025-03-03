import { useEffect, useState } from 'react';
import { Subject } from '../../../entities/subject';
import { fetchSubjects } from '../adapters/api/subjectInfoService';

const useSubjectInfo = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlanets = async () => {
      try {
        const data = await fetchSubjects();
        setSubjects(data);
      } catch (error) {
        setError('Failed to load Subjects');
      }
    };

    loadPlanets();
  }, []);

  return { subjects, error };
};

export default useSubjectInfo;
