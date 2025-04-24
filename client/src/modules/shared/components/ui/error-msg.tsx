import { motion } from 'framer-motion';
import React from 'react';

import '../styles/error-msg.css';

interface ErrorMessageProps {
  message: string;
}

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
