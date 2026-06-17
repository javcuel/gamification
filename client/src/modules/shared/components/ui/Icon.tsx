import React from 'react';

import '../../styles/Icon.css';

/**
 * Props for the Icon component.
 *
 * @property {string} img - URL of the image to be used as the icon source.
 * @property {string} [alt] - Alternative text for the image, used for accessibility.
 * @property {number} [size] - Optional size (in pixels) to control both width and height of the icon.
 */
interface IconProps {
	img: string;
	alt?: string;
	size?: number;
}

/**
 * Icon is a functional component that renders a icon from an given image.
 */
const Icon: React.FC<IconProps> = ({ img, alt = '', size = 24 }) => {
	return (
		<img
			className='icon'
			src={img}
			onError={e => {
				e.currentTarget.src = '/images/default_icon_image.png';
			}}
			alt={alt}
			width={size}
			height={size}
		/>
	);
};

export default Icon;
