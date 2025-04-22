import React from 'react';

import '../styles/icon.css';

interface IconProps {
  img: string;
  alt?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ img, alt = '', size = 24 }) => {
  return (
    <img src={img} alt={alt} width={size} height={size} className="icon" />
  );
};

export default Icon;
