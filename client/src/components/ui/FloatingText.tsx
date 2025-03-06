import { animated, useSpring } from 'react-spring';
import '../../styles/FloatingText.css'; // O puedes agregar el estilo directamente en este archivo

const FloatingText = () => {
  // Animación de flotación (movimiento sutil)
  const springStyles = useSpring({
    from: { transform: 'translateY(0px)' }, // Posición inicial
    to: { transform: 'translateY(-20px)' }, // Posición final (lo subimos un poco)
    reset: true, // Reinicia la animación
    reverse: true, // Invertir la animación después de completarse
    config: { tension: 50, friction: 20 }, // Ajustamos la configuración para que sea más fluido
    loop: { reverse: true }, // Bucle continuo con reversa
  });

  return (
    <animated.h1 className="floating-title" style={springStyles}>
      Gamispace
    </animated.h1>
  );
};

export default FloatingText;
