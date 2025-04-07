import React from 'react';

import NavBar from '../shared/NavBar/NavBar';
import SpaceBackground from '../shared/ui/SpaceBackground';
import RankingTable from './components/RankingTable';

const Ranking: React.FC = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <SpaceBackground />
      <NavBar webName="Gamispace" />
      <RankingTable />
    </div>
  );
};

export default Ranking;
