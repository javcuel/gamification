import { motion } from 'framer-motion';
import React from 'react';

import '../../styles/success-msg.css';

/**
 * @property {string} message - Message to display.
 */
interface SuccessMessageProps {
  message: string;
}

/**
 * SuccessMsg is a functional component that takes in an success message string and displays it with an animated shake effect.
 * It uses `motion.div` from Framer Motion to animate the message when rendered.
 */
const SuccessMsg: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{
        x: [0, -5, 5, -5, 5, 0],
      }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="success-msg"
    >
      ✅ {message}
    </motion.div>
  );
};

export default SuccessMsg;
