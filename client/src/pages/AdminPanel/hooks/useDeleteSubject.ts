import { useState } from 'react';
import { deleteSubject } from '../../../api/subject';

const useDeleteSubject = (onDeleteSuccess: (subjectId: number) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteSubject = async (subjectId: number) => {
    setLoading(true);
    setError(null);

    try {
      await deleteSubject(subjectId);
      onDeleteSuccess(subjectId);
    } catch (err: any) {
      console.error(`Error deleting subject (ID: ${subjectId}):`, err);
      setError(err.message || 'Failed to delete the subject.');
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteSubject, loading, error };
};

export default useDeleteSubject;
