import { useState } from 'react';
import { Subject } from '../../../shared/api/domain/subject';
import { subjectRepository } from '../../../shared/api/repository/subject.repository';

const useToggleSubjectOpenState = (subject: Subject) => {
  const [isOpen, setIsOpen] = useState(subject.isOpen);
  const [error, setError] = useState<string | null>(null);

  const toggleOpenState = async () => {
    try {
      const newState = !isOpen;

      await subjectRepository.updateOpen(subject.id, newState);
      setIsOpen(newState);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return { isOpen, error, toggleOpenState };
};

export default useToggleSubjectOpenState;
