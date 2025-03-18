import { SizeProp } from '@fortawesome/fontawesome-svg-core'; // Importar SizeProp
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface StarIconProps {
  color?: string;
  size?: SizeProp;
  className?: string;
}

const StarIcon: React.FC<StarIconProps> = ({
  color = '#5865f2',
  size = '1x',
  className = '',
}) => {
  return (
    <FontAwesomeIcon
      icon={faStar}
      style={{ color }}
      size={size}
      className={className}
    />
  );
};

export default StarIcon;
