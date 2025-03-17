import React from 'react';

import NavBar from '../../components/NavBar/NavBar';
import SpaceBackground from '../../components/SpaceBackground';
import RankingTable from './components/RankingTable';

const Ranking: React.FC = () => {
  return (
    <div className="container-fluid" style={{ height: '100vh' }}>
      <SpaceBackground />
      <div
        className="container-fluid d-flex flex-column"
        style={{ height: '100vh' }}
      >
        <div style={{ height: '5vh' }}>
          <NavBar webName="Gamispace" />
        </div>
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <RankingTable />
        </div>
      </div>
    </div>
  );
};

export default Ranking;
