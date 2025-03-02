import React from "react";
import useWorldInfo from "../hooks/useWorldInfo";

import WorldGridItem from "./WorldGridItem";

const WorldGrid: React.FC = () => {
  const { worlds, error } = useWorldInfo();

  return (
    <div className="container mx-auto">
      {/* Error messagge */}
      <div className="row">
        {error && <div className="alert custom-alert">{error}</div>}
      </div>

      {/* Game List */}
      <div className="row">
        {worlds
          .filter((world) => world.isVisible)
          .map((world, index) => (
            <WorldGridItem key={index} world={world} />
          ))}
      </div>
    </div>
  );
};

export default WorldGrid;
