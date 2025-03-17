// IconoEstrella.tsx
import { SizeProp } from '@fortawesome/fontawesome-svg-core'; // Importar SizeProp
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface BoltIconProps {
  color?: string;
  size?: SizeProp;
  className?: string;
}

const BoltIcon: React.FC<BoltIconProps> = ({
  color = '#5865f2',
  size = '1x',
  className = '',
}) => {
  return (
    <FontAwesomeIcon
      icon={faBolt}
      style={{ color }}
      size={size}
      className={className}
    />
  );
};

export default BoltIcon;
