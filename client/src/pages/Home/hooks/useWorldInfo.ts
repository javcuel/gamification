import { useEffect, useState } from "react";
import { World } from "../../../entities/world";
import { fetchWorlds } from "../adapters/api/worldInfoService";

const useWorldInfo = () => {
  const [worlds, setWorlds] = useState<World[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlanets = async () => {
      try {
        const data = await fetchWorlds();
        setWorlds(data);
      } catch (error) {
        setError("Failed to load worlds");
      }
    };

    loadPlanets();
  }, []);

  return { worlds, error };
};

export default useWorldInfo;
