import React from 'react';
import NavBar from '../shared/NavBar/NavBar';
import SpaceBackground from '../shared/ui/SpaceBackground';
import GameGrid from './components/GameGrid';

const GameSelector: React.FC = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <SpaceBackground />
      <NavBar webName="Gamispace" />
      <GameGrid />
    </div>
  );
};

export default GameSelector;
