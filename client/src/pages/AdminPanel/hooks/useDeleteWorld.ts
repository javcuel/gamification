import { useState } from 'react';
import { deleteWorld } from '../api/worldGamesService';

const useDeleteWorld = (onDeleteSuccess: (worldId: number) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteWorld = async (worldId: number) => {
    setLoading(true);
    setError(null);

    try {
      await deleteWorld(worldId); // Calls service to delete the world
      onDeleteSuccess(worldId); // Notifies the parent component of the world's deletion
    } catch (err: any) {
      console.error(`Error deleting world (ID: ${worldId}):`, err);
      setError(err.message || 'Failed to delete the world.');
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteWorld, loading, error };
};

export default useDeleteWorld;
