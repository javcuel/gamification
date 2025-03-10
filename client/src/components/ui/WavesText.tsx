import { motion } from 'framer-motion';
import '../../styles/WavesText.css';
import React from 'react';

interface WavesTextProps {
  text: string;
  size?: string; // Permite valores como "2rem", "24px" o números (automáticamente en px)
}

const WavesText: React.FC<WavesTextProps> = ({ text, size = '4vw' }) => {
  return (
    <div className="waves-title" style={{ fontSize: size }}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 0 }}
          animate={{ y: [-5, 5, -5] }} // Movimiento arriba y abajo más fluido
          transition={{
            duration: 1.8, // Ajusta la velocidad
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: index * 0.1, // Ajusta el desfase del efecto ola
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
