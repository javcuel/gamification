import { motion } from 'framer-motion';
import React from 'react';

import '../styles/Success.css';

interface SuccessMessageProps {
  message: string;
}

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
