import { useState } from 'react';
import { GameApi } from '../../../api/game';

const useToggleGameOpenState = (gameId: number, initialState: boolean) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const [error, setError] = useState<string | null>(null);

  //TODO: SI SE USA PAYLOAD PARA LOS ESTAODS DE OPEN Y VISIBLE, TIPARLO CON APIOPENSTATEPAYLOADS.
  const toggleOpenState = async () => {
    try {
      const newState = !isOpen;
      const payload = { gameId, isOpen: newState };

      await GameApi.updateOpenState(payload);
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

export default useToggleGameOpenState;
