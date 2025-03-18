import { motion } from 'framer-motion';
import React from 'react';
import '../styles/WavesText.css';

interface WavesTextProps {
  text: string;
}

const WavesText: React.FC<WavesTextProps> = ({ text }) => {
  return (
    <div className="waves-title">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 0 }}
          animate={{ y: [-5, 5, -5] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: index * 0.1,
          }}
          style={{ display: 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default WavesText;
