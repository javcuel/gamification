import { useState } from 'react';
import { SubjectApi } from '../../../api/subject';

const useToggleSubjectOpenState = (
  subjectId: number,
  initialState: boolean
) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const [error, setError] = useState<string | null>(null);

  const toggleOpenState = async () => {
    try {
      const newState = !isOpen;
      const payload = { subjectId, isOpen: newState };

      await SubjectApi.updateOpenState(payload);
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
