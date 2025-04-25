import { motion } from 'framer-motion';
import React from 'react';

import '../../styles/waves-text.css';

interface WavesTextProps {
  text: string;
}

/**
 * A component that animates text in a wave-like motion.
 * Each character of the provided text will animate with a vertical movement
 * to create a wave effect. The animation is achieved using the `framer-motion` library.
 *
 * @component
 * @example
 * // Example usage:
 * <WavesText text="Waves Effect!" />
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.text - The text to display with the wave animation.
 *
 * @returns {JSX.Element} A div element containing animated text.
 */
const WavesText: React.FC<WavesTextProps> = ({ text }) => {
  return (
    <div className="waves-title">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 0 }}
          animate={char !== ' ' ? { y: [-5, 5, -5] } : {}} // No anima los espacios
          transition={
            char !== ' '
              ? {
                  duration: 1.8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: index * 0.1,
                }
              : {}
          }
          style={{ display: 'inline-block', whiteSpace: 'pre' }} // Mantiene los espacios
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default WavesText;
