import React from 'react';

import '../../styles/link-image.css';

/**
 * Props for the LinkImage component.
 *
 * @property {string} src - The source URL of the image.
 * @property {string} alt - Alternative text for the image, used for accessibility.
 * @property {string} url - The URL to navigate to when the image is clicked.
 * @property {string | number} [width] - The width of the image. Can be a string (e.g., '100px') or a number (e.g., 100).
 * @property {string | number} [height] - The height of the image. Can be a string (e.g., '100px') or a number (e.g., 100).
 */
interface LinkImageProps {
  src: string;
  alt: string;
  url: string;
  width?: string | number;
  height?: string | number;
}

/**
 * LinkImage is a functional component that renders an image inside a link (`<a>` element).
 * The image will be clickable and will open the provided URL in a new tab.
 */
const LinkImage: React.FC<LinkImageProps> = ({
  src,
  alt,
  url,
  width,
  height,
}) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img
        className="link-image"
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </a>
  );
};

export default LinkImage;
