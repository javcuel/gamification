import { useState } from 'react';
import { updateSubjectOpenState } from '../../../api/subject';

const useToggleSubjectOpenState = (
  subjectId: number,
  initialState: boolean
) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const toggleOpenState = async () => {
    setLoading(true);
    try {
      const newState = !isOpen;
      const payload = { subjectId, isOpen: newState };
      await updateSubjectOpenState(payload);
      setIsOpen(newState);
    } catch (error) {
      console.error('Error toggling subject open state:', error);
    } finally {
      setLoading(false);
    }
  };

  return [isOpen, toggleOpenState, loading] as const;
};

export default useToggleSubjectOpenState;
