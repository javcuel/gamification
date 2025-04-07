import React, { useState } from 'react';
import { RANKING_TYPES } from '../../../constants/rankingTypes';
import Dropdown from '../../shared/ui/Dropdown'; // Importamos el componente Dropdown
import ErrorMsg from '../../shared/ui/ErrorMsg';
import useRankings from '../hooks/useRankings';
import '../styles/ranking.css';

const DEFAULT_RANKING = RANKING_TYPES.PLAYERS;
const DEFAULT_GAME = 0;

const RankingTable: React.FC = () => {
  const [rankingType, setRankingType] = useState<string>(DEFAULT_RANKING);
  const [selectedGame, setSelectedGame] = useState<number>(DEFAULT_GAME);

  const { rankings, error } = useRankings(rankingType, selectedGame);

  // Opciones de juegos disponibles (esto lo adaptas a tu backend o fuente de datos)
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
    <div className="container mt-5">
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Select ranking</label>
          <Dropdown
            options={Object.values(RANKING_TYPES)}
            placeholder="Select ranking"
            onChange={setRankingType}
            value={rankingType} // Aquí pasamos el valor seleccionado
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
                if (selected) setSelectedGame(selected.id); // Establecemos el ID del juego
              }}
              value={gameOptions.find((g) => g.id === selectedGame)?.name || ''} // Mostramos el nombre del juego seleccionado
            />
          </div>
        )}
      </div>

      {error && <ErrorMsg message={error} />}

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
