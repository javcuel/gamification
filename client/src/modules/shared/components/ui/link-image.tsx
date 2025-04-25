import React from 'react';

import '../../styles/link-image.css';

type LinkImageProps = {
  src: string;
  alt: string;
  url: string;
  width?: string | number;
  height?: string | number;
};

/**
 * A component that renders an image inside a link (`<a>` element).
 * The image will be clickable and will open the provided URL in a new tab.
 *
 * @component
 * @example
 * // Example usage:
 * <LinkImage
 *   src="https://example.com/image.jpg"
 *   alt="Example Image"
 *   url="https://example.com"
 *   width={100}
 *   height={100}
 * />
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.src - The source URL of the image.
 * @param {string} props.alt - The alt text for the image.
 * @param {string} props.url - The URL to navigate to when the image is clicked.
 * @param {string | number} [props.width] - The width of the image (optional).
 * @param {string | number} [props.height] - The height of the image (optional).
 *
 * @returns {JSX.Element} A clickable image element inside a link.
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
