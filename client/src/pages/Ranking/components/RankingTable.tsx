import React, { useState } from 'react';

import { RANKING_TYPES } from '../../../constants/rankingTypes';
import useRankings from '../hooks/useRankings';
import '../styles/ranking.css';

const DEFAULT_RANKING = RANKING_TYPES.PLAYERS;
const DEFAULT_GAME = 0;

const RankingTable: React.FC = () => {
  const [rankingType, setRankingType] = useState<string>(DEFAULT_RANKING);
  const [selectedGame, setSelectedGame] = useState<number>(DEFAULT_GAME);

  const { rankings, error } = useRankings(rankingType, selectedGame);
  //const games = fetchGames();

  return (
    <div className="container mt-5">
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Select ranking</label>
          <select
            className="form-control "
            value={rankingType}
            onChange={(e) => setRankingType(e.target.value)}
          >
            <option value={RANKING_TYPES.PLAYERS}>General - User</option>
            <option value={RANKING_TYPES.GROUPS}>General - Group</option>
            <option value={RANKING_TYPES.PLAYERS_BY_GAME}>Game - User</option>
            <option value={RANKING_TYPES.GROUPS_BY_GAME}>Game- Group</option>
          </select>
        </div>

        {/* Dropdown for selecting specific game, enabled only for JJ and GJ */}
        {(rankingType === RANKING_TYPES.PLAYERS_BY_GAME ||
          rankingType === RANKING_TYPES.GROUPS_BY_GAME) && (
          <div className="col-md-6">
            <label>Select game</label>

            {/*   <select
              className="form-control"
              value={selectedGame || ''}
              onChange={(e) => setSelectedGame(Number(e.target.value))}
            >
              <option value={120}>Apilas</option>
              <option value={94}>Apuntados</option>
              <option value={127}>Cafetería</option>
              <option value={109}>Caída de Datos</option>
              <option value={129}>Estructura2</option>
              <option value={110}>Fiesta Recursiva</option>
              <option value={130}>Mars Miners</option>
            </select> */}
          </div>
        )}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        <div className="col">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Position</th>
                {rankingType === RANKING_TYPES.GROUPS ||
                rankingType === RANKING_TYPES.GROUPS_BY_GAME ? (
                  <th>Group</th>
                ) : (
                  <>
                    <th>Name</th>
                    <th>Group</th>
                  </>
                )}
                <th>
                  <span>Completed Subjects</span>
                </th>

                <th>
                  <span>Points</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rankings.slice(0, 10).map((entry, index) => (
                <tr key={index} className="custom-table-row">
                  <td>{index + 1}</td>
                  {rankingType === RANKING_TYPES.GROUPS ||
                  rankingType === RANKING_TYPES.GROUPS_BY_GAME ? (
                    <td>{entry.userGroup || 'N/A'}</td>
                  ) : (
                    <>
                      <td>{entry.userName || 'N/A'}</td>
                      <td>{entry.userGroup || 'N/A'}</td>
                    </>
                  )}
                  <td>{entry.userCompletedSubjects || 0}</td>
                  <td>{entry.userTotalScore || 0}</td>
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
