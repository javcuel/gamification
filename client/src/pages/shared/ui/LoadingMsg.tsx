import { motion } from 'framer-motion';
import React from 'react';

import '../styles/LoadingMsg.css';

interface LoadingMessageProps {
  message?: string;
}

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
