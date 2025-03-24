import { useState } from 'react';
import { updateSubjectVisibleState } from '../../../api/subject';

const useToggleSubjectVisibleState = (
  subjectId: number,
  initialState: boolean
) => {
  const [isVisible, setIsVisible] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const toggleVisibleState = async () => {
    setLoading(true);
    try {
      const newState = !isVisible;
      const payload = { subjectId, isVisible: newState };
      await updateSubjectVisibleState(payload);
      setIsVisible(newState);
    } catch (error) {
      console.error('Error toggling subject open state:', error);
    } finally {
      setLoading(false);
    }
  };

  return [isVisible, toggleVisibleState, loading] as const;
};

export default useToggleSubjectVisibleState;
