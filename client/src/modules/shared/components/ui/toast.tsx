import { motion } from 'framer-motion';
import React from 'react';

import '../../styles/toast.css';

/**
 * Props for the Success Message component.
 *
 * @property {string} type - Type of the toast : success or error
 * @property {string} message - Message to display.
 */
interface ToastProps {
  type?: 'success' | 'error';
  message: string;
}

/**
 * Toast is a reusable UI component that displays a temporary message
 * with a shake animation to draw user attention. It supports different
 * message types (e.g., success, error) and conditionally shows an icon
 * based on the type.
 */
const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : '';
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: [0, -5, 5, -5, 5, 0] }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="toast"
    >
      {emoji} {message}
    </motion.div>
  );
};

export default Toast;
