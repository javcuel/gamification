import React, { useEffect, useRef } from 'react';
import '../styles/SpaceBackground.css';

const SpaceBackground: React.FC = () => {
  const ufoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveUFO = () => {
      const ufo = ufoRef.current;
      if (!ufo) return;

      const x = Math.random() * (window.innerWidth - 40);
      const y = Math.random() * (window.innerHeight - 20);

      ufo.style.left = `${x}px`;
      ufo.style.top = `${y}px`;
    };

    let timeoutId: NodeJS.Timeout;

    const startRandomMovement = () => {
      moveUFO();

      const delay = Math.random() * (8000 - 5000) + 5000; // entre 5000 y 8000 ms
      timeoutId = setTimeout(startRandomMovement, delay);
    };

    startRandomMovement(); // inicia el bucle

    return () => clearTimeout(timeoutId); // cleanup
  }, []);

  return (
    <div className="universe-background">
      <div className="background"></div>
      <div className="stars"></div>
      <div className="fast-stars"></div>

      {/* UFO */}
      <div ref={ufoRef} className="ufo"></div>
    </div>
  );
};

export default SpaceBackground;
