import { useEffect, useState } from 'react';
import { Subject } from '../../../shared/api/domain/subject';
import { subjectRepository } from '../../../shared/api/repository/subject.repository';

const useSubjectsTab = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);

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
      }
    };

    loadSubjects();
  }, []);

  return { subjects, setSubjects, error };
};

export default useSubjectsTab;
