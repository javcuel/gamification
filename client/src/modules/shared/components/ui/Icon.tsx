import React from 'react';

import '../../styles/icon.css';

interface IconProps {
  img: string;
  alt?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ img, alt = '', size = 24 }) => {
  return (
    <img
      className="icon"
      src={img}
      onError={(e) => {
        e.currentTarget.src = '/images/default_icon_image.png';
      }}
      alt={alt}
      width={size}
      height={size}
    />
  );
};

export default Icon;
