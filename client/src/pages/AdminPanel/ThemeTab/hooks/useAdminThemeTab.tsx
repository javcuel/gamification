import { useState } from 'react';

import { ThemeApi, ThemeApiPayload } from '../../../../api/theme';

const useAdminThemeTab = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addTheme = async (payload: ThemeApiPayload) => {
    setError(null);
    setSuccess(false);

    try {
      await ThemeApi.create(payload);
      setSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };
  return { addTheme, error, success };
};

export default useAdminThemeTab;
