import { motion } from 'framer-motion';
import React from 'react';

import '../../styles/error-msg.css';

/**
 * @property {string} message - Message to display.
 */
interface ErrorMessageProps {
  message: string;
}

/**
 * ErrorMsg is a functional component that takes in an error message string and displays it with an animated shake effect.
 * It uses `motion.div` from Framer Motion to animate the message when rendered.
 */
const ErrorMsg: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{
        x: [0, -5, 5, -5, 5, 0],
      }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="error-msg"
    >
      ❌ {message}
    </motion.div>
  );
};

export default ErrorMsg;
