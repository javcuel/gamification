import React, { useState } from "react";
import BoltIcon from "../../../components/ui/BoltIcon";
import StarIcon from "../../../components/ui/StarIcon";
import useRankings from "../hooks/useRankings";
import "../styles/ranking.css";
/* TODO: Entiendo que el la tabla del ranking deberá coger los nombres de losjuegos de la BD*/

const RankingTable: React.FC = () => {
  const [rankingType, setRankingType] = useState<string>("JG");
  const [selectedGame, setSelectedGame] = useState<number>(0);

  const { rankings, error } = useRankings(rankingType, selectedGame);

  return (
    <div className="container mt-5">
      {/* Dropdowns for ranking selection */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Select ranking</label>
          <select
            className="form-control custom-dropdown"
            value={rankingType}
            onChange={(e) => setRankingType(e.target.value)}
          >
            <option value="JG">General - User</option>
            <option value="GG">General - Group</option>
            <option value="JJ">Game - User</option>
            <option value="GJ">Game- Group</option>
          </select>
        </div>

        {/* Dropdown for selecting specific game, enabled only for JJ and GJ */}
        {(rankingType === "JJ" || rankingType === "GJ") && (
          <div className="col-md-6">
            <label>Select game</label>
            <select
              className="form-control custom-dropdown"
              value={selectedGame || ""}
              onChange={(e) => setSelectedGame(Number(e.target.value))}
            >
              <option value={120}>Apilas</option>
              <option value={94}>Apuntados</option>
              <option value={127}>Cafetería</option>
              <option value={109}>Caída de Datos</option>
              <option value={129}>Estructura2</option>
              <option value={110}>Fiesta Recursiva</option>
              <option value={130}>Mars Miners</option>
            </select>
          </div>
        )}
      </div>

      {/* Display error message if there is an error */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Ranking Table */}
      <div className="row">
        <div className="col">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Position</th>
                {rankingType === "GG" || rankingType === "GJ" ? (
                  <th>Group</th>
                ) : (
                  <>
                    <th>Name</th>
                    <th>Group</th>
                  </>
                )}
                <th>
                  <span>
                    Stars
                    <StarIcon className="ms-2" />
                  </span>
                </th>

                <th>
                  <span>
                    Points
                    <BoltIcon className="ms-2" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rankings.slice(0, 10).map((entry, index) => (
                <tr key={index} className="custom-table-row">
                  <td>{index + 1}</td>
                  {rankingType === "GG" || rankingType === "GJ" ? (
                    <td>{entry.userGroup || "N/A"}</td>
                  ) : (
                    <>
                      <td>{entry.userName || "N/A"}</td>
                      <td>{entry.userGroup || "N/A"}</td>
                    </>
                  )}
                  <td>{entry.totalStars || 0}</td>
                  <td>{entry.totalScore || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RankingTable;
