import { motion } from 'framer-motion';
import React from 'react';

import '../../styles/loading-msg.css';

/**
 * Props for the Loading Message component.
 *
 * @property {string} message - Loading message to display.
 */
interface LoadingMessageProps {
  message: string;
}

/**
 * LoadingMsg is a functional component that takes in an loading message string and displays it with an animated translate effect.
 * It uses `motion.div` from Framer Motion to animate the message when rendered.
 */
const LoadingMsg: React.FC<LoadingMessageProps> = ({
  message = 'Cargando...',
}) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [10, -10, 10, -10, 10] }}
      transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
      className="loading-msg"
    >
      🔄 {message}
    </motion.div>
  );
};

export default LoadingMsg;
