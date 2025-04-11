import React from 'react';

import NavBar from '../shared/NavBar/NavBar';
import RankingTable from './components/RankingTable';

const Ranking: React.FC = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <NavBar webName="Gamispace" />
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <RankingTable />
      </div>
    </div>
  );
};

export default Ranking;
