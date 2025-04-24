import { useState } from 'react';
import { SubjectApi } from '../../../basura/subject';
import { Subject } from '../../shared/api/domain/subject';

const useToggleSubjectVisibleState = (subject: Subject) => {
  const [isVisible, setIsVisible] = useState(subject.isVisible);
  const [error, setError] = useState<string | null>(null);

  const toggleVisibleState = async () => {
    try {
      const newState = !isVisible;

      const payload: Subject = {
        ...subject,
        isVisible: newState,
      };

      await SubjectApi.update(subject.id, payload);
      setIsVisible(newState);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return { isVisible, error, toggleVisibleState };
};

export default useToggleSubjectVisibleState;
