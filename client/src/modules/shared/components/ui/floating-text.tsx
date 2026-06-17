import React from 'react';
import { animated, useSpring } from 'react-spring';

import '../../styles/floating-text.css';

/**
 * Props for the Floating Text component.
 *
 * @property {string} text - Text to display.
 */
interface FloatingTexProps {
	text: string;
}

/**
 * FloatingText is a functional component that animates text with a floating effect.
 * The text smoothly moves up and down using the `react-spring` library,
 * creating a floating animation that repeats indefinitely.
 */
const FloatingText: React.FC<FloatingTexProps> = ({ text }) => {
	const springStyles = useSpring({
		from: { transform: 'translateY(0px)' },
		to: { transform: 'translateY(-20px)' },
		reset: true,
		reverse: true,
		config: { tension: 50, friction: 20 },
		loop: { reverse: true }
	});

	return (
		<animated.h1 className='floating-title' style={springStyles}>
			{text}
		</animated.h1>
	);
};

export default FloatingText;
