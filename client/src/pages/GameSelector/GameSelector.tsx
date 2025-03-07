import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import SpaceBackground from '../../components/SpaceBackground';
import GameGrid from './components/GameGrid';

const GameSelector: React.FC = () => {
  return (
    <div className="container-fluid" style={{ height: '100vh' }}>
      <SpaceBackground />

      <div className="row">
        <div className="col">
          <NavBar webName="Gamispace" />
        </div>
      </div>

      <div className="row custom-flex-center " style={{ marginTop: '20%' }}>
        <div className="col">
          <GameGrid />
        </div>
      </div>
    </div>
  );
};

export default GameSelector;
