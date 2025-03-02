import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useStarToggle from "../hooks/useStarToggle";
import "../styles/game-grid-item.css";
import { Game } from "../types/game";

interface GameGridItemProps {
  game: Game;
  onClick: () => void;
}

const GameGridItem: React.FC<GameGridItemProps> = ({ game, onClick }) => {
  const { activeStar, toggleStar } = useStarToggle();

  return (
    <div className="col d-flex align-items-stretch">
      <div
        className="card text-center custom-game-card"
        style={{ minHeight: "300px" }}
      >
        {/* Game Img */}
        <img
          src={game.gameImg}
          className="card-img-top mx-auto"
          alt={game.gameName}
          style={{ width: "50%", height: "auto" }}
        />

        <div className="card-body d-flex flex-column justify-content-between">
          {/* Game Name */}
          <h5 className="card-title">{game.gameName}</h5>

          {/* Star Icon */}
          <FontAwesomeIcon
            icon={activeStar ? faStarSolid : faStarRegular}
            style={{
              color: activeStar ? "#5865f2" : "#5f6370",
              cursor: "pointer",
            }}
            onClick={toggleStar}
          />

          <hr />
          {/* Game Desc */}
          <p className="card-text">{game.gameDesc}</p>
          <hr />

          {/* Game Button*/}
          <button
            className="btn btn-secondary custom-button mt-auto"
            onClick={onClick}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameGridItem;
