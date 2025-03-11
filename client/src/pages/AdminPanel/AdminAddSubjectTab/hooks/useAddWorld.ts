import { useState } from 'react';
import { addWorld as addWorldService } from '../../adapters/api/worldGamesService';

const useAddWorld = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addWorld = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await addWorldService(formData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to add world.');
    } finally {
      setIsLoading(false);
    }
  };

  return { addWorld, isLoading, error, success };
};

export default useAddWorld;
