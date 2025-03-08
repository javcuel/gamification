import { motion } from 'framer-motion';
import '../../styles/WavesText.css';

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
          animate={{ y: [-5, 5, -5] }} // Movimiento arriba y abajo más fluido
          transition={{
            duration: 1.8, // Ajusta la velocidad
            repeat: Infinity,
            repeatType: 'reverse', // Hace que la animación se devuelva suavemente
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
