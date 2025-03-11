import React from 'react';
import WorldItem from '../components/WorldItem';
import useWorlds from './hooks/useWorlds';

/**
 * AdminWorldGamesTab Component
 * Displays a list of worlds with collapsible rows showing associated games.
 */
const AdminWorldGamesTab: React.FC = () => {
  const { worlds, setWorlds, error } = useWorlds();

  const handleWorldDeleted = (worldId: number) => {
    setWorlds((prev) => prev.filter((world) => world.id !== worldId));
  };

  return (
    <div>
      {error && <div className="text-danger">{error}</div>}
      {worlds.map((world) => (
        <WorldItem
          key={world.id}
          world={world}
          onWorldDeleted={handleWorldDeleted}
        />
      ))}
    </div>
  );
};

export default AdminWorldGamesTab;
