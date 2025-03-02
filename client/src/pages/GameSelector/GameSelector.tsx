import NavBar from "../../components/NavBar/NavBar";
import SpaceBackground from "../../components/SpaceBackground";
import GameGrid from "./components/GameGrid";
import GameIframe from "./components/GameIframe";
import useFetchGames from "./hooks/useFetchGames";
import useSelectedGame from "./hooks/useSelectedGame";

const GameSelector: React.FC = () => {
  const { games, error } = useFetchGames();
  const { selectedGame, loadGame } = useSelectedGame();

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      {/* Space Background */}
      <SpaceBackground />

      {/* NavBar*/}
      <div className="row">
        <div className="col-12 grid-element">
          <NavBar />
        </div>
      </div>

      {/* Game Grid*/}
      <div className="row custom-overflow">
        <div className="col-12 grid-element">
          <GameGrid games={games} onGameSelect={loadGame} />
        </div>
      </div>

      {/* Iframe */}
      <div className="row">
        {selectedGame && <GameIframe selectedGame={selectedGame} />}
      </div>
    </div>
  );
};

export default GameSelector;
