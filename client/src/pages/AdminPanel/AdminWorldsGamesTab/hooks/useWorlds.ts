import { useEffect, useState } from "react";
import { World } from "../../../../entities/world";
import { fetchWorlds } from "../../adapters/api/worldGamesService";

const useWorlds = () => {
  const [worlds, setWorlds] = useState<World[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWorlds = async () => {
      try {
        const data = await fetchWorlds();
        setWorlds(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load worlds and games");
      }
    };

    loadWorlds();
  }, []);

  return { worlds, setWorlds, error }; // Include setWorlds
};

export default useWorlds;
