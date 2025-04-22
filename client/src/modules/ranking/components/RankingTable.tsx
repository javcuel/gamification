import React, { useState } from 'react';
import { RANKING_TYPES } from '../../../constants/ranking-types';
import Dropdown from '../../shared/components/ui/Dropdown';
import ErrorMsg from '../../shared/components/ui/ErrorMsg';
import LoadingMsg from '../../shared/components/ui/LoadingMsg';
import useRankings from '../hooks/useRankings';
import '../styles/ranking.css';

const DEFAULT_RANKING = RANKING_TYPES.PLAYERS;
const DEFAULT_GAME = 0;

const RankingTable: React.FC = () => {
  const [rankingType, setRankingType] = useState<string>(DEFAULT_RANKING);
  const [selectedGame, setSelectedGame] = useState<number>(DEFAULT_GAME);

  const { rankings, error, loading } = useRankings(rankingType, selectedGame);

  // TODO: Opciones de juegos disponibles (esto lo adaptas a tu backend o fuente de datos)
  const gameOptions = [
    { id: 120, name: 'Apilas' },
    { id: 94, name: 'Apuntados' },
    { id: 127, name: 'Cafetería' },
    { id: 109, name: 'Caída de Datos' },
    { id: 129, name: 'Estructura2' },
    { id: 110, name: 'Fiesta Recursiva' },
    { id: 130, name: 'Mars Miners' },
  ];

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Select ranking</label>
          <Dropdown
            options={Object.values(RANKING_TYPES)}
            placeholder="Select ranking"
            onChange={setRankingType}
          />
        </div>

        {(rankingType === RANKING_TYPES.PLAYERS_BY_GAME ||
          rankingType === RANKING_TYPES.GROUPS_BY_GAME) && (
          <div className="col-md-6">
            <label>Select game</label>
            <Dropdown
              options={gameOptions.map((g) => g.name)}
              placeholder="Select game"
              onChange={(gameName) => {
                const selected = gameOptions.find((g) => g.name === gameName);
                if (selected) setSelectedGame(selected.id);
              }}
            />
          </div>
        )}
      </div>

      {loading && <LoadingMsg message="Loading Rankings..." />}
      {error && <ErrorMsg message={error} />}

      <div className="row">
        <div className="col">
          <div className="table-responsive-wrapper">
            <table className="table">
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
                  <tr key={index} className="table-row">
                    <td
                      className={
                        index === 0
                          ? 'podium1'
                          : index === 1
                            ? 'podium2'
                            : index === 2
                              ? 'podium3'
                              : ''
                      }
                    >
                      {index < 3 ? '' : index + 1}
                    </td>
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
    </div>
  );
};

export default RankingTable;
